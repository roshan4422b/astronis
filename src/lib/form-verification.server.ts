import { createHash, createHmac, randomBytes, randomInt } from "node:crypto";
import { MailtrapClient } from "mailtrap";

const OTP_TTL_SECONDS = 300;
const OTP_COOLDOWN_SECONDS = 60;
const PROOF_TTL_SECONDS = 600;
const MAX_OTP_ATTEMPTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RedisResponse = { result?: unknown; error?: string };
type VerificationResult = { ok: true } | { ok: false; status: number; message: string };

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.EMAIL_OTP_SECRET;
  if (!url || !token || !secret || secret.length < 32) {
    throw new Error("Email verification storage or signing configuration is missing.");
  }
  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== "https:") {
    throw new Error("Email verification storage must use HTTPS.");
  }
  return { url: parsedUrl.toString().replace(/\/$/, ""), token, secret };
}

async function redisCommand<T>(command: unknown[]): Promise<T> {
  const { url, token } = getRedisConfig();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("Email verification storage request failed.");
  const payload = (await response.json()) as RedisResponse;
  if (payload.error) throw new Error("Email verification storage command failed.");
  return payload.result as T;
}

function digestEmail(email: string) {
  return createHash("sha256").update(email).digest("hex");
}

function digestOtp(email: string, code: string) {
  const { secret } = getRedisConfig();
  return createHmac("sha256", secret).update(`${email}:${code}`).digest("hex");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidVerificationEmail(email: string) {
  return email.length <= 254 && emailPattern.test(email);
}

async function sendOtpWithMailtrap(email: string, code: string) {
  const apiKey = process.env.MAILTRAP_API_KEY;
  const from = process.env.MAILTRAP_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Mailtrap email delivery is not configured.");
  const mailtrap = new MailtrapClient({ token: apiKey });
  await mailtrap.send({
    from: { name: "Astronis Global", email: from },
    to: [{ email }],
    subject: "Your Astronis Global verification code",
    text: `Your email verification code is ${code}. It expires in 5 minutes. If you did not request this code, you can ignore this email.`,
  });
}

export async function verifyTurnstile(token: string, request: Request): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("Cloudflare Turnstile is not configured.");
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("Cloudflare Turnstile verification request failed.");
  const result = (await response.json()) as { success?: boolean; hostname?: string };
  return result.success === true && result.hostname === new URL(request.url).hostname;
}

export async function sendEmailOtp(
  emailValue: string,
  deliverOtp: (email: string, code: string) => Promise<void> = sendOtpWithMailtrap,
) {
  const email = normalizeEmail(emailValue);
  const emailDigest = digestEmail(email);
  const otpKey = `astronis:email-otp:${emailDigest}`;
  const cooldownKey = `astronis:email-otp-cooldown:${emailDigest}`;
  const cooldown = await redisCommand<string | null>([
    "SET",
    cooldownKey,
    "1",
    "EX",
    OTP_COOLDOWN_SECONDS,
    "NX",
  ]);
  if (cooldown !== "OK") {
    const remaining = await redisCommand<number>(["TTL", cooldownKey]);
    return { ok: false as const, retryAfter: Math.max(1, remaining) };
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await redisCommand<string>([
    "SET",
    otpKey,
    JSON.stringify({ digest: digestOtp(email, code), attempts: 0 }),
    "EX",
    OTP_TTL_SECONDS,
  ]);

  try {
    await deliverOtp(email, code);
  } catch {
    await redisCommand<number>(["DEL", otpKey, cooldownKey]);
    throw new Error("Mailtrap could not deliver the verification code.");
  }

  return { ok: true as const, retryAfter: OTP_COOLDOWN_SECONDS };
}

const verifyOtpScript = `
local current = redis.call("GET", KEYS[1])
if not current then
  if redis.call("GET", KEYS[3]) == ARGV[1] then return "used" end
  return "expired"
end
local record = cjson.decode(current)
if record.attempts >= tonumber(ARGV[2]) then return "locked" end
if record.digest ~= ARGV[1] then
  record.attempts = record.attempts + 1
  local ttl = redis.call("PTTL", KEYS[1])
  if ttl <= 0 then return "expired" end
  redis.call("SET", KEYS[1], cjson.encode(record), "PX", ttl)
  if record.attempts >= tonumber(ARGV[2]) then return "locked" end
  return "invalid"
end
redis.call("DEL", KEYS[1])
redis.call("SET", KEYS[2], ARGV[3], "EX", ARGV[4], "NX")
redis.call("SET", KEYS[3], ARGV[1], "EX", ARGV[5])
return "verified"
`;

type OtpVerificationResult =
  | { ok: true; proof: string }
  | { ok: false; reason: "invalid" | "locked" | "expired" | "used" };

export async function verifyEmailOtp(emailValue: string, code: string): Promise<OtpVerificationResult> {
  const email = normalizeEmail(emailValue);
  const emailDigest = digestEmail(email);
  const proof = randomBytes(32).toString("base64url");
  const result = await redisCommand<string>([
    "EVAL",
    verifyOtpScript,
    "3",
    `astronis:email-otp:${emailDigest}`,
    `astronis:email-proof:${digestEmail(proof)}`,
    `astronis:email-otp-used:${emailDigest}`,
    digestOtp(email, code),
    String(MAX_OTP_ATTEMPTS),
    email,
    String(PROOF_TTL_SECONDS),
    String(OTP_TTL_SECONDS),
  ]);
  if (result === "verified") return { ok: true as const, proof };
  if (result === "invalid") return { ok: false as const, reason: "invalid" };
  if (result === "locked") return { ok: false as const, reason: "locked" };
  if (result === "used") return { ok: false as const, reason: "used" };
  return { ok: false as const, reason: "expired" };
}

const consumeProofScript = `
local email = redis.call("GET", KEYS[1])
if not email or email ~= ARGV[1] then return 0 end
return redis.call("DEL", KEYS[1])
`;

export async function consumeEmailVerification(
  emailValue: string,
  verificationToken: string,
): Promise<VerificationResult> {
  if (!verificationToken || verificationToken.length > 128) {
    return { ok: false, status: 400, message: "Please verify your email address before submitting." };
  }

  try {
    const consumed = await redisCommand<number>([
      "EVAL",
      consumeProofScript,
      "1",
      `astronis:email-proof:${digestEmail(verificationToken)}`,
      normalizeEmail(emailValue),
    ]);
    if (consumed !== 1) {
      return { ok: false, status: 400, message: "Please verify this email address before submitting." };
    }
  } catch {
    return { ok: false, status: 503, message: "Email verification is temporarily unavailable. Please try again." };
  }
  return { ok: true };
}

export async function consumeFormVerification(
  request: Request,
  emailValue: string,
  captchaToken: string,
  verificationToken: string,
): Promise<VerificationResult> {
  let captchaValid: boolean;
  try {
    captchaValid = await verifyTurnstile(captchaToken, request);
  } catch {
    return { ok: false, status: 503, message: "Verification is temporarily unavailable. Please try again." };
  }
  if (!captchaValid) {
    return { ok: false, status: 400, message: "Please complete the CAPTCHA verification and try again." };
  }
  return consumeEmailVerification(emailValue, verificationToken);
}

export function verificationFailure(result: VerificationResult) {
  return result.ok ? null : Response.json({ success: false, message: result.message }, { status: result.status });
}
