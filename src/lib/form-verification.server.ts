import { createHash, createHmac, randomBytes, randomInt } from "node:crypto";
import { MailtrapClient } from "mailtrap";

const OTP_TTL_SECONDS = 300;
const OTP_COOLDOWN_SECONDS = 60;
const PROOF_TTL_SECONDS = 600;
const MAX_OTP_ATTEMPTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RedisResponse = { result?: unknown; error?: string };
type VerificationResult = { ok: true } | { ok: false; status: number; message: string };
type EmailOtpFailureStage = "configuration" | "storage" | "provider";

class RedisStorageError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "RedisStorageError";
    this.status = status;
  }
}

export class EmailOtpFailure extends Error {
  readonly stage: EmailOtpFailureStage;

  constructor(
    stage: EmailOtpFailureStage,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "EmailOtpFailure";
    this.stage = stage;
  }
}

function redactEmailOtpDiagnostic(message: string) {
  let safeMessage = message
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .replace(/\b\d{6}\b/g, "[redacted]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/\b(authorization|token|secret|password)(\s*[:=]\s*)[^\s,;]+/gi, "$1$2[redacted]");

  for (const secret of [
    process.env.MAILTRAP_API_KEY,
    process.env.UPSTASH_REDIS_REST_TOKEN,
    process.env.EMAIL_OTP_SECRET,
    process.env.TURNSTILE_SECRET_KEY,
  ]) {
    if (secret) safeMessage = safeMessage.replaceAll(secret, "[redacted]");
  }

  return safeMessage.slice(0, 500);
}

function getFailureStatus(error: unknown) {
  if (typeof error !== "object" || error === null) return undefined;
  const value = error as { status?: unknown; statusCode?: unknown; response?: { status?: unknown } };
  const status = value.response?.status ?? value.status ?? value.statusCode;
  return typeof status === "number" ? status : undefined;
}

export function logEmailOtpFailure(error: unknown) {
  const details = error instanceof EmailOtpFailure
    ? error
    : new EmailOtpFailure("storage", "Unexpected OTP service failure.", { cause: error });
  const causes: Array<{ name: string; reason: string; providerStatus?: number }> = [];
  const collectCauses = (cause: unknown, depth = 0) => {
    if (cause === undefined || cause === null || depth >= 4 || causes.length >= 6) return;
    if (cause instanceof AggregateError) {
      causes.push({
        name: cause.name,
        reason: redactEmailOtpDiagnostic(cause.message),
      });
      for (const nested of cause.errors) collectCauses(nested, depth + 1);
      return;
    }
    if (cause instanceof Error) {
      causes.push({
        name: cause.name,
        reason: redactEmailOtpDiagnostic(cause.message),
        providerStatus: getFailureStatus(cause),
      });
      collectCauses(cause.cause, depth + 1);
      return;
    }
    causes.push({
      name: typeof cause,
      reason: redactEmailOtpDiagnostic(String(cause)),
      providerStatus: getFailureStatus(cause),
    });
  };
  collectCauses(details.cause);
  console.error("Email OTP request failed:", {
    stage: details.stage,
    error: redactEmailOtpDiagnostic(details.message),
    causes,
  });
}

export function emailOtpFailureResponse(error: unknown) {
  if (error instanceof EmailOtpFailure) {
    if (error.stage === "configuration") {
      return {
        status: 503,
        message: "Email delivery is not configured. Please contact the website administrator.",
      };
    }
    if (error.stage === "storage") {
      return {
        status: 503,
        message: "Email verification is temporarily unavailable. Please try again later.",
      };
    }
    return {
      status: 502,
      message: "We couldn't deliver the code through our email provider. Please try again later.",
    };
  }
  return {
    status: 503,
    message: "Email verification is temporarily unavailable. Please try again later.",
  };
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.EMAIL_OTP_SECRET;
  if (!url || !token || !secret || secret.length < 32) {
    throw new EmailOtpFailure(
      "configuration",
      "Required Upstash Redis REST or OTP signing configuration is missing.",
    );
  }
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch (error) {
    throw new EmailOtpFailure("configuration", "Upstash Redis REST URL is invalid.", { cause: error });
  }
  if (parsedUrl.protocol !== "https:") {
    throw new EmailOtpFailure("configuration", "Upstash Redis REST URL must use HTTPS.");
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
  if (!response.ok) {
    const responseText = await response.text();
    let providerReason = "";
    try {
      const payload = JSON.parse(responseText) as { error?: unknown };
      if (typeof payload.error === "string") providerReason = payload.error;
    } catch {
      providerReason = "";
    }
    throw new RedisStorageError(
      providerReason || "Upstash Redis REST request failed.",
      response.status,
    );
  }
  const payload = (await response.json()) as RedisResponse;
  if (payload.error) throw new RedisStorageError(payload.error);
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
  if (!apiKey || !from) {
    throw new EmailOtpFailure("configuration", "Mailtrap API credentials or sender address are missing.");
  }
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
  let cooldown: string | null;
  try {
    cooldown = await redisCommand<string | null>([
      "SET",
      cooldownKey,
      "1",
      "EX",
      OTP_COOLDOWN_SECONDS,
      "NX",
    ]);
  } catch (error) {
    if (error instanceof EmailOtpFailure) throw error;
    throw new EmailOtpFailure("storage", "Could not reserve an OTP request.", { cause: error });
  }
  if (cooldown !== "OK") {
    let remaining: number;
    try {
      remaining = await redisCommand<number>(["TTL", cooldownKey]);
    } catch (error) {
      throw new EmailOtpFailure("storage", "Could not read the OTP resend cooldown.", { cause: error });
    }
    return { ok: false as const, retryAfter: Math.max(1, remaining) };
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  try {
    await redisCommand<string>([
      "SET",
      otpKey,
      JSON.stringify({ digest: digestOtp(email, code), attempts: 0 }),
      "EX",
      OTP_TTL_SECONDS,
    ]);
  } catch (error) {
    throw new EmailOtpFailure("storage", "Could not persist the OTP challenge.", { cause: error });
  }

  try {
    await deliverOtp(email, code);
  } catch (error) {
    let deliveryError: unknown = error;
    try {
      await redisCommand<number>(["DEL", otpKey, cooldownKey]);
    } catch (cleanupError) {
      deliveryError = new AggregateError([error, cleanupError], "Email delivery and OTP cleanup failed.");
    }
    if (error instanceof EmailOtpFailure) throw error;
    throw new EmailOtpFailure("provider", "Mailtrap could not deliver the verification code.", { cause: deliveryError });
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
