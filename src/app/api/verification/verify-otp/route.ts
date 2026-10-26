import { isValidVerificationEmail, verifyEmailOtp } from "@/lib/form-verification.server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ message: "This request is not permitted." }, { status: 403 });
  }
  let body: { email?: unknown; code?: unknown };
  try {
    body = (await request.json()) as { email?: unknown; code?: unknown };
  } catch {
    return Response.json({ message: "Please enter the 6-digit verification code." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const code = String(body.code ?? "").trim();
  if (!isValidVerificationEmail(email) || !/^\d{6}$/.test(code)) {
    return Response.json({ message: "Please enter a valid email address and 6-digit code." }, { status: 400 });
  }

  try {
    const result = await verifyEmailOtp(email, code);
    if (!result.ok) {
      const messages = {
        invalid: "That code is incorrect. You have a maximum of 5 attempts.",
        locked: "The maximum number of attempts has been reached. Request a new code after the resend cooldown.",
        expired: "That code has expired. Please request a new code.",
        used: "That code has already been used. Request a new code.",
      };
      return Response.json({ message: messages[result.reason] }, { status: 400 });
    }
    return Response.json({ message: "Your email address is verified.", verificationToken: result.proof });
  } catch {
    console.error("Email OTP verification failed.");
    return Response.json({ message: "Email verification is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
