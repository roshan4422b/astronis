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
        if (!otp) result = "expired";
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
    return Response.json({
      success: body.get("response") === "valid-captcha" || body.get("response") === "foreign-host-token",
      hostname: body.get("response") === "foreign-host-token" ? "untrusted.example" : "astronis.test",
    });
  }
  throw new Error(`Unexpected network request: ${url}`);
};

const {
  consumeFormVerification,
  sendEmailOtp,
  verifyEmailOtp,
  verifyTurnstile,
} = await import("../src/lib/form-verification.server.ts");

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

test("rejects invalid CAPTCHA and missing email proof at the form submission boundary", async () => {
  entries.clear();
  assert.equal(await verifyTurnstile("invalid-captcha", request), false);
  assert.equal(await verifyTurnstile("foreign-host-token", request), false);
  const invalidCaptcha = await consumeFormVerification(request, email, "invalid-captcha", "proof");
  assert.equal(invalidCaptcha.ok, false);
  if (!invalidCaptcha.ok) assert.equal(invalidCaptcha.message, "Please complete the CAPTCHA verification and try again.");

  const missingProof = await consumeFormVerification(request, email, "valid-captcha", "");
  assert.equal(missingProof.ok, false);
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
