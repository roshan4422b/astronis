import assert from "node:assert/strict";
import { test } from "node:test";

process.env.UPSTASH_REDIS_REST_URL = "https://redis.test";
process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
process.env.EMAIL_OTP_SECRET = "test-only-signing-secret-with-at-least-32-characters";
process.env.TURNSTILE_SECRET_KEY = "test-turnstile-secret";

const entries = new Map();
const realNow = Date.now;

function entry(key) {
  const value = entries.get(key);
  if (value && value.expiresAt <= Date.now()) {
    entries.delete(key);
    return null;
  }
  return value ?? null;
}

function save(key, value, ttlSeconds, onlyIfMissing = false) {
  if (onlyIfMissing && entry(key)) return null;
  entries.set(key, { value, expiresAt: Date.now() + Number(ttlSeconds) * 1000 });
  return "OK";
}

globalThis.fetch = async (input, init = {}) => {
  const url = String(input);
  if (url.startsWith("https://redis.test")) {
    const command = JSON.parse(String(init.body));
    const name = String(command[0]).toUpperCase();
    let result;
    if (name === "SET") {
      result = save(command[1], command[2], command[4], command.includes("NX"));
    } else if (name === "TTL") {
      const value = entry(command[1]);
      result = value ? Math.max(0, Math.ceil((value.expiresAt - Date.now()) / 1000)) : -2;
    } else if (name === "DEL") {
      result = command.slice(1).reduce((deleted, key) => deleted + Number(entries.delete(key)), 0);
    } else if (name === "EVAL") {
      const keyCount = Number(command[2]);
      const keys = command.slice(3, 3 + keyCount);
      const args = command.slice(3 + keyCount);
      if (command[1].includes("record.digest")) {
        const otp = entry(keys[0]);
        if (!otp) result = entry(keys[2])?.value === args[0] ? "used" : "expired";
        else {
          const record = JSON.parse(otp.value);
          if (record.attempts >= Number(args[1])) result = "locked";
          else if (record.digest !== args[0]) {
            record.attempts += 1;
            const ttl = Math.max(1, (otp.expiresAt - Date.now()) / 1000);
            save(keys[0], JSON.stringify(record), ttl);
            result = record.attempts >= Number(args[1]) ? "locked" : "invalid";
          } else {
            entries.delete(keys[0]);
            save(keys[1], args[2], args[3], true);
            save(keys[2], args[0], args[4]);
            result = "verified";
          }
        }
      } else {
        const proof = entry(keys[0]);
        result = proof?.value === args[0] ? Number(entries.delete(keys[0])) : 0;
      }
    } else {
      throw new Error(`Unsupported fake Redis command: ${name}`);
    }
    return Response.json({ result });
  }
  if (url === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
    const body = new URLSearchParams(String(init.body));
    const token = body.get("response");
    return Response.json({
      success: token === "valid-captcha" || token === "foreign-host-token",
      hostname: token === "foreign-host-token" ? "untrusted.example" : "astronis.test",
      "error-codes": token === "invalid-captcha"
        ? ["invalid-input-response"]
        : token === "expired-captcha"
          ? ["timeout-or-duplicate"]
          : [],
    });
  }
  throw new Error(`Unexpected network request: ${url}`);
};

const {
  emailOtpFailureResponse,
  EmailOtpFailure,
  logEmailOtpFailure,
  consumeEmailVerification,
  consumeFormVerification,
  sendEmailOtp,
  verifyEmailOtp,
  verifyTurnstile,
} = await import("../src/lib/form-verification.server.ts");
const { getFormVerification } = await import("../src/lib/form-verification.client.ts");

test("classifies missing Upstash configuration without attempting a storage request", async () => {
  const saved = {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    secret: process.env.EMAIL_OTP_SECRET,
  };
  delete process.env.UPSTASH_REDIS_REST_URL;
  try {
    await assert.rejects(
      sendEmailOtp(email),
      (error) => {
        assert.ok(error instanceof EmailOtpFailure);
        assert.equal(error.stage, "configuration");
        assert.equal(emailOtpFailureResponse(error).status, 503);
        assert.match(emailOtpFailureResponse(error).message, /not configured/i);
        return true;
      },
    );
  } finally {
    process.env.UPSTASH_REDIS_REST_URL = saved.url;
    process.env.UPSTASH_REDIS_REST_TOKEN = saved.token;
    process.env.EMAIL_OTP_SECRET = saved.secret;
  }
});

const deliver = async (_email, code) => {
  deliver.code = code;
};
const request = new Request("https://astronis.test/api/enquiry", { method: "POST" });
const email = "person@example.com";

test("sends a 6-digit OTP and consumes the email proof once after CAPTCHA succeeds", async () => {
  entries.clear();
  deliver.code = "";
  const sent = await sendEmailOtp(email, deliver);
  assert.equal(sent.ok, true);
  assert.match(deliver.code, /^\d{6}$/);

  const verified = await verifyEmailOtp(email, deliver.code);
  assert.equal(verified.ok, true);

  const accepted = await consumeFormVerification(request, email, "valid-captcha", verified.proof);
  assert.equal(accepted.ok, true);
  const replay = await consumeFormVerification(request, email, "valid-captcha", verified.proof);
  assert.equal(replay.ok, false);
  if (!replay.ok) assert.equal(replay.message, "Please verify this email address before submitting.");
});

test("accepts email-bound OTP proof without CAPTCHA and rejects reuse or a different email", async () => {
  entries.clear();
  deliver.code = "";
  const sent = await sendEmailOtp(email, deliver);
  assert.equal(sent.ok, true);

  const verified = await verifyEmailOtp(email, deliver.code);
  assert.equal(verified.ok, true);
  if (!verified.ok) return;

  const wrongEmail = await consumeEmailVerification("other@example.com", verified.proof);
  assert.equal(wrongEmail.ok, false);
  const accepted = await consumeEmailVerification(email, verified.proof);
  assert.equal(accepted.ok, true);
  const replay = await consumeEmailVerification(email, verified.proof);
  assert.equal(replay.ok, false);

  const reusedCode = await verifyEmailOtp(email, deliver.code);
  assert.deepEqual(reusedCode, { ok: false, reason: "used" });
});

test("rejects invalid CAPTCHA and missing email proof at the form submission boundary", async () => {
  entries.clear();
  assert.equal(await verifyTurnstile("invalid-captcha", request), false);
  assert.equal(await verifyTurnstile("expired-captcha", request), false);
  assert.equal(await verifyTurnstile("foreign-host-token", request), false);
  const invalidCaptcha = await consumeFormVerification(request, email, "invalid-captcha", "proof");
  assert.equal(invalidCaptcha.ok, false);
  if (!invalidCaptcha.ok) assert.equal(invalidCaptcha.message, "Please complete the CAPTCHA verification and try again.");

  const missingProof = await consumeFormVerification(request, email, "valid-captcha", "");
  assert.equal(missingProof.ok, false);
});

test("checks Turnstile hostname against the forwarded public host", async () => {
  const proxiedRequest = new Request("https://internal.vercel.invalid/api/testimonials", {
    headers: { "x-forwarded-host": "astronis.test" },
  });
  assert.equal(await verifyTurnstile("valid-captcha", proxiedRequest), true);
});

test("uses the freshly fetched CAPTCHA token instead of a cached hidden-field token", () => {
  const form = {
    querySelector(selector) {
      if (selector === 'input[name="captchaToken"]') return { value: "stale-captcha" };
      if (selector === 'input[name="emailVerificationToken"]') return { value: "email-proof" };
      return null;
    },
  };
  assert.deepEqual(getFormVerification(form, "fresh-captcha"), {
    captchaToken: "fresh-captcha",
    emailVerificationToken: "email-proof",
  });
});

test("expires the server-side email verification proof", async () => {
  entries.clear();
  deliver.code = "";
  await sendEmailOtp(email, deliver);
  const verified = await verifyEmailOtp(email, deliver.code);
  assert.equal(verified.ok, true);
  if (!verified.ok) return;

  const start = Date.now();
  Date.now = () => start + 600_001;
  try {
    const result = await consumeEmailVerification(email, verified.proof);
    assert.equal(result.ok, false);
  } finally {
    Date.now = realNow;
  }
});

test("locks OTP verification after five incorrect attempts", async () => {
  entries.clear();
  deliver.code = "";
  await sendEmailOtp(email, deliver);
  const wrongCode = deliver.code === "000000" ? "000001" : "000000";
  for (let attempt = 1; attempt < 5; attempt += 1) {
    const result = await verifyEmailOtp(email, wrongCode);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.reason, "invalid");
  }
  const fifth = await verifyEmailOtp(email, wrongCode);
  assert.equal(fifth.ok, false);
  if (!fifth.ok) assert.equal(fifth.reason, "locked");
  const locked = await verifyEmailOtp(email, deliver.code);
  assert.equal(locked.ok, false);
  if (!locked.ok) assert.equal(locked.reason, "locked");
});

test("expires the OTP after five minutes", async () => {
  entries.clear();
  deliver.code = "";
  await sendEmailOtp(email, deliver);
  const start = Date.now();
  Date.now = () => start + 300_001;
  try {
    const result = await verifyEmailOtp(email, deliver.code);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.reason, "expired");
  } finally {
    Date.now = realNow;
  }
});

test("enforces resend cooldown and clears the cooldown after delivery failure", async () => {
  entries.clear();
  deliver.code = "";
  const first = await sendEmailOtp(email, deliver);
  assert.equal(first.ok, true);
  const coolingDown = await sendEmailOtp(email, deliver);
  assert.equal(coolingDown.ok, false);
  if (!coolingDown.ok) assert.equal(coolingDown.retryAfter, 60);

  entries.clear();
  await assert.rejects(
    sendEmailOtp(email, async () => {
      throw new Error("simulated Mailtrap delivery failure");
    }),
    /could not deliver/i,
  );
  const retry = await sendEmailOtp(email, deliver);
  assert.equal(retry.ok, true);
});

test("logs useful provider failure diagnostics without exposing email, OTP, or credentials", () => {
  const originalError = console.error;
  const output = [];
  console.error = (...args) => output.push(args);
  try {
    const failure = new EmailOtpFailure(
      "provider",
      "Mailtrap could not deliver the verification code.",
      { cause: new Error(`Unauthorized for ${email}: code 123456 token=private-token ${process.env.MAILTRAP_API_KEY}`) },
    );
    logEmailOtpFailure(failure);
    const serialized = JSON.stringify(output);
    assert.match(serialized, /provider/);
    assert.match(serialized, /Unauthorized/);
    assert.doesNotMatch(serialized, /person@example\.com|123456|private-token|test-turnstile-secret/);
    assert.equal(emailOtpFailureResponse(failure).status, 502);
    assert.match(emailOtpFailureResponse(failure).message, /email provider/i);
  } finally {
    console.error = originalError;
  }
});

test("retains Upstash HTTP status and a redacted provider error in server diagnostics", async () => {
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const output = [];
  globalThis.fetch = async () => Response.json({ error: "permission denied for person@example.com" }, { status: 401 });
  console.error = (...args) => output.push(args);
  try {
    await assert.rejects(
      sendEmailOtp(email),
      (error) => {
        assert.ok(error instanceof EmailOtpFailure);
        assert.equal(error.stage, "storage");
        logEmailOtpFailure(error);
        return true;
      },
    );
    const serialized = JSON.stringify(output);
    assert.match(serialized, /401/);
    assert.match(serialized, /permission denied/);
    assert.doesNotMatch(serialized, /person@example\.com|123456|test-token/);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
  }
});
