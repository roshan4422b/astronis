import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  createVerifiedTestimonialEmailProof,
  isVerifiedTestimonialEmail,
} = await import("../src/lib/form-verification.server.ts");
const { getFormVerification } = await import("../src/lib/form-verification.client.ts");
const {
  isSupportedTestimonialVideoUrl,
  isTestimonialMediaPath,
} = await import("../src/lib/testimonial-media.ts");

test("public testimonial persistence is OTP-gated and unavailable to anonymous database inserts", async () => {
  const [route, form, otpComponent, sendOtpRoute, verifyOtpRoute, migration] = await Promise.all([
    readFile(new URL("../src/app/api/testimonials/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/testimonials/testimonial-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/_components/email-otp-verification.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/verification/send-enquiry-otp/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/verification/verify-otp/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/202611020001_testimonial_media_notifications.sql", import.meta.url), "utf8"),
  ]);
  const verificationCheck = route.indexOf("await consumeEmailVerification(");
  const insert = route.indexOf('serviceClient.from("cms_content").insert(');

  assert.ok(verificationCheck >= 0);
  assert.ok(insert > verificationCheck);
  assert.match(route, /serviceClient = getTestimonialMediaService\(\)/);
  assert.match(route, /await consumeEmailVerification\(get\("email"\), get\("emailVerificationToken"\)\)/);
  assert.doesNotMatch(route, /consumeFormVerification|captchaToken/);
  assert.match(form, /<EmailOtpVerification captchaDisplayOnly onVerificationChange=\{setEmailVerified\} \/>/);
  assert.match(form, /disabled=\{busy \|\| recording \|\| !emailVerified \|\| !formValid\}/);
  assert.doesNotMatch(form, /captchaToken/);
  assert.match(route, /missingConfiguration/);
  assert.match(route, /"NEXT_PUBLIC_SUPABASE_URL"/);
  assert.match(route, /"SUPABASE_SERVICE_ROLE_KEY"/);
  assert.match(form, /submissionInFlight\.current/);
  assert.match(form, /new FormData\(form\)/);
  assert.match(form, /request\.open\("POST", new URL\("\/api\/testimonials", window\.location\.origin\)\.toString\(\)\)/);
  assert.match(otpComponent, /fetch\(new URL\("\/api\/verification\/send-enquiry-otp", window\.location\.origin\)/);
  assert.match(otpComponent, /fetch\(new URL\("\/api\/verification\/verify-otp", window\.location\.origin\)/);
  assert.match(route, /origin !== new URL\(request\.url\)\.origin/);
  assert.match(sendOtpRoute, /origin !== new URL\(request\.url\)\.origin/);
  assert.match(verifyOtpRoute, /origin !== new URL\(request\.url\)\.origin/);
  assert.match(route, /data\.set\("status", "pending-review"\)/);
  assert.match(route, /serviceClient\.from\("cms_content"\)\.insert\(\{\s*collection: "testimonials"/);
  assert.match(route, /emailVerified: true/);
  assert.doesNotMatch(route, /request\.json\(\)/);
  assert.match(migration, /drop policy if exists "Public testimonial submissions" on public\.cms_content;/i);
  assert.match(migration, /revoke insert on table public\.cms_content from public,\s*anon;/i);
  assert.match(migration, /grant insert on table public\.cms_content to service_role;/i);
  assert.doesNotMatch(migration, /grant insert on table public\.cms_content to (?:public|anon|authenticated)\b/i);
  assert.doesNotMatch(migration, /revoke\s+(?:all|insert)\s+on table public\.cms_content from[^;]*\bauthenticated\b/i);
  assert.doesNotMatch(migration, /drop policy[^;]*"Admins manage content"/i);
  assert.doesNotMatch(migration, /create policy "Public testimonial submissions"/i);
});

test("testimonial ratings and public approved-state projection stay aligned", async () => {
  const [form, submission, page, home, server, migration] = await Promise.all([
    readFile(new URL("../src/app/testimonials/testimonial-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/testimonials/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/testimonials/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/home/testimonials.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/supabase/server.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/202611030001_testimonial_approval_ratings.sql", import.meta.url), "utf8"),
  ]);
  assert.match(form, /<select name="rating" required defaultValue="5">/);
  assert.match(submission, /!\/\^\[1-5\]\$\/\.test\(get\("rating"\)\)/);
  assert.match(submission, /rating: Number\(get\("rating"\)\)/);
  assert.match(submission, /status: "pending"/);
  assert.match(submission, /Thank you for sharing your experience with Astronis Global\. Your testimonial has been submitted successfully and is awaiting review by our team\./);
  assert.match(page, /rating: item\.rating/);
  assert.match(home, /rating: item\.rating/);
  assert.match(server, /rating: typeof record\.rating === "number"/);
  assert.match(migration, /content\.status in \('approved', 'published'\)/);
  assert.match(migration, /rating integer/);
  assert.match(migration, /content\.data->'consent' = 'true'::jsonb/);
  assert.match(migration, /content\.data->'identityPublicationConsent' = 'true'::jsonb/);
});

test("testimonial decisions require authorized transitions and idempotent email notification", async () => {
  const [adminRoute, notifier, retryRoute, adminUi] = await Promise.all([
    readFile(new URL("../src/app/api/admin/data/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/testimonial-notifications.server.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/testimonials/[id]/notification/retry/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/admin/_components/admin-engagement.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(adminRoute, /const auth = await getAuthorizedAdmin\(\)/);
  assert.match(adminRoute, /currentStatus === "pending" && \(nextStatus === "approved" \|\| nextStatus === "rejected"\)/);
  assert.match(adminRoute, /A rejection reason between 3 and 1000 characters is required/);
  assert.match(adminRoute, /moderationDecisionAt: new Date\(\)\.toISOString\(\)/);
  assert.match(adminRoute, /moderationDecisionBy: auth\.user\.id/);
  assert.match(adminRoute, /\.eq\("status", existingRecord\.status\)/);
  assert.match(notifier, /isVerifiedTestimonialEmail\(email/);
  assert.match(notifier, /\.insert\(\{[\s\S]*delivery_status: "sending"/);
  assert.match(notifier, /\.eq\("delivery_status", "failed"\)/);
  assert.match(notifier, /Your Testimonial Has Been Approved – Astronis Global/);
  assert.match(notifier, /Update Regarding Your Testimonial – Astronis Global/);
  assert.match(retryRoute, /getAuthorizedAdmin\(\)/);
  assert.match(retryRoute, /Only a failed notification can be retried/);
  assert.match(adminUi, /Reason for rejection/);
  assert.match(adminUi, /Retry email notification/);
});

test("reports missing testimonial Supabase service configuration without exposing credentials", async () => {
  const [service, route] = await Promise.all([
    readFile(new URL("../src/lib/supabase/service.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/testimonials/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(service, /import "server-only"/);
  assert.match(service, /process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(service, /process\.env\.SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(service, /if \(!url \|\| !serviceRoleKey\) return null/);
  assert.doesNotMatch(service, /console\.(?:log|error|warn)\([^)]*serviceRoleKey/);
  assert.doesNotMatch(service, /NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(route, /Secure testimonial submission is not configured\. Please try again later\./);
  assert.match(route, /missingConfiguration/);
  assert.match(route, /"NEXT_PUBLIC_SUPABASE_URL"/);
  assert.match(route, /"SUPABASE_SERVICE_ROLE_KEY"/);
  assert.ok(route.indexOf("if (!serviceClient)") < route.indexOf("await consumeEmailVerification("));
  assert.match(route, /await consumeEmailVerification\(get\("email"\), get\("emailVerificationToken"\)\)/);
});

test("keeps Turnstile visible but non-blocking in testimonial forms", async () => {
  const [widget, form, sendRoute, verifyRoute] = await Promise.all([
    readFile(new URL("../src/components/TurnstileWidget.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/testimonials/testimonial-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/verification/send-enquiry-otp/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/verification/verify-otp/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(widget, /"expired-callback": \(\) => \{\s*reportError\("The CAPTCHA expired\.[\s\S]*?window\.turnstile\?\.reset\(idRef\.current\)/);
  assert.match(form, /<EmailOtpVerification captchaDisplayOnly onVerificationChange=\{setEmailVerified\} \/>/);
  assert.doesNotMatch(form, /captchaToken|CAPTCHA expired/);
  const verification = await readFile(new URL("../src/app/_components/email-otp-verification.tsx", import.meta.url), "utf8");
  assert.match(verification, /captchaDisplayOnly \? \(\) => \{\} : updateCaptchaToken/);
  assert.match(verification, /captchaDisplayOnly \? undefined : setStatus/);
  assert.match(verification, /!captchaDisplayOnly && <input type="hidden" name="captchaToken"/);
  assert.match(verification, /const captchaRequiredForOtp = !captchaOptional && !captchaDisplayOnly/);
  assert.match(verification, /captchaRequiredForOtp && !captchaToken/);
  assert.match(verification, /disabled=\{busy \|\| cooldownLeft > 0 \|\| \(captchaRequiredForOtp && !captchaToken\)\}/);
  assert.match(verification, /fetch\(new URL\("\/api\/verification\/send-enquiry-otp", window\.location\.origin\)/);
  assert.match(verification, /JSON\.stringify\(\{ email: nextEmail \}\)/);
  assert.match(sendRoute, /await sendEmailOtp\(email\)/);
  assert.doesNotMatch(sendRoute, /verifyTurnstile|captchaToken/);
  assert.match(sendRoute, /emailOtpFailureResponse\(error\)/);
  assert.match(verification, /Enter a valid email address before requesting a verification code/);
  assert.match(verification, /finally \{\s*requestInFlight\.current = false;\s*setBusy\(false\);/);
  assert.match(verification, /fetch\(new URL\("\/api\/verification\/verify-otp", window\.location\.origin\)/);
  assert.match(verification, /JSON\.stringify\(\{ email, code \}\)/);
  assert.match(verifyRoute, /await verifyEmailOtp\(email, code\)/);
  assert.match(verifyRoute, /verificationToken: result\.proof/);

  const [globalEnquiryRoute, applicationRoute, meetingRoute] = await Promise.all([
    readFile(new URL("../src/app/api/global-enquiry/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/professional-application/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/schedule-meeting/route.ts", import.meta.url), "utf8"),
  ]);
  for (const route of [globalEnquiryRoute, applicationRoute, meetingRoute]) {
    assert.match(route, /consumeFormVerification\(/);
    assert.match(route, /verificationFailure\(/);
  }
});

test("protects source-defined CMS testimonials and shared media from deletion", async () => {
  const [adminRoute, mediaHelper] = await Promise.all([
    readFile(new URL("../src/app/api/admin/data/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/testimonial-media.server.ts", import.meta.url), "utf8"),
  ]);
  assert.match(adminRoute, /existing\.data\?\.sourceDefined === true\s*\|\|\s*getSourceContentRecords\(existing\.collection\)\.some\(\(record\) => record\.slug === existing\.slug\)/);
  assert.match(adminRoute, /if \(references\.referenced\) continue;/);
  assert.match(mediaHelper, /\.contains\("data", \{ \[field\]: path \}\)/);
});

test("binds moderation-email eligibility to an OTP-secret proof for the verified address", () => {
  const acceptedAt = "2026-11-02T10:00:00.000Z";
  const proof = createVerifiedTestimonialEmailProof(email, acceptedAt);
  assert.equal(isVerifiedTestimonialEmail(email.toUpperCase(), acceptedAt, proof), true);
  assert.equal(isVerifiedTestimonialEmail("other@example.com", acceptedAt, proof), false);
  assert.equal(isVerifiedTestimonialEmail(email, "2026-11-02T10:00:01.000Z", proof), false);
  assert.equal(isVerifiedTestimonialEmail(email, acceptedAt, "untrusted"), false);
});

test("accepts only safe testimonial storage paths and direct HTTPS video URLs", () => {
  assert.equal(
    isTestimonialMediaPath("testimonials/10000000-0000-4000-8000-000000000001/10000000-0000-4000-8000-000000000002.mp4"),
    true,
  );
  assert.equal(isTestimonialMediaPath("../../other/video.mp4"), false);
  assert.equal(isSupportedTestimonialVideoUrl("https://media.example/video.webm"), true);
  assert.equal(isSupportedTestimonialVideoUrl("javascript:alert(1)"), false);
  assert.equal(isSupportedTestimonialVideoUrl("https://example.com/watch"), false);
});

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
        assert.match(error.message, /UPSTASH_REDIS_REST_URL/);
        assert.equal(emailOtpFailureResponse(error).status, 503);
        assert.match(emailOtpFailureResponse(error).message, /UPSTASH_REDIS_REST_URL/);
        assert.match(emailOtpFailureResponse(error).message, /MAILTRAP_API_KEY/);
        assert.match(emailOtpFailureResponse(error).message, /EMAIL_OTP_SECRET/);
        assert.doesNotMatch(emailOtpFailureResponse(error).message, /test-token|test-only-signing-secret/);
        return true;
      },
    );
  } finally {
    process.env.UPSTASH_REDIS_REST_URL = saved.url;
    process.env.UPSTASH_REDIS_REST_TOKEN = saved.token;
    process.env.EMAIL_OTP_SECRET = saved.secret;
  }
});

test("reports missing Mailtrap configuration without attempting delivery", async () => {
  const saved = {
    apiKey: process.env.MAILTRAP_API_KEY,
    from: process.env.MAILTRAP_FROM_EMAIL,
  };
  entries.clear();
  delete process.env.MAILTRAP_API_KEY;
  delete process.env.MAILTRAP_FROM_EMAIL;
  try {
    await assert.rejects(
      sendEmailOtp(email),
      (error) => {
        assert.ok(error instanceof EmailOtpFailure);
        assert.equal(error.stage, "configuration");
        assert.match(emailOtpFailureResponse(error).message, /MAILTRAP_API_KEY, MAILTRAP_FROM_EMAIL/);
        return true;
      },
    );
  } finally {
    if (saved.apiKey === undefined) delete process.env.MAILTRAP_API_KEY;
    else process.env.MAILTRAP_API_KEY = saved.apiKey;
    if (saved.from === undefined) delete process.env.MAILTRAP_FROM_EMAIL;
    else process.env.MAILTRAP_FROM_EMAIL = saved.from;
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

test("rejects expired CAPTCHA without consuming email proof, then accepts a fresh token", async () => {
  entries.clear();
  deliver.code = "";
  await sendEmailOtp(email, deliver);
  const verified = await verifyEmailOtp(email, deliver.code);
  assert.equal(verified.ok, true);
  if (!verified.ok) return;

  const expired = await consumeFormVerification(request, email, "expired-captcha", verified.proof);
  assert.deepEqual(expired, {
    ok: false,
    status: 400,
    message: "Please complete the CAPTCHA verification and try again.",
  });
  const accepted = await consumeFormVerification(request, email, "valid-captcha", verified.proof);
  assert.equal(accepted.ok, true);
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
