import {
  emailOtpFailureResponse,
  isValidVerificationEmail,
  logEmailOtpFailure,
  sendEmailOtp,
} from "@/lib/form-verification.server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ message: "This request is not permitted." }, { status: 403 });
  }

  let body: { email?: unknown };
  try {
    body = (await request.json()) as { email?: unknown };
  } catch {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!isValidVerificationEmail(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const result = await sendEmailOtp(email);
    if (!result.ok) {
      return Response.json(
        { message: "Please wait before requesting another code.", retryAfter: result.retryAfter },
        { status: 429 },
      );
    }
    return Response.json({
      message: "A 6-digit verification code has been sent to your email address.",
      retryAfter: result.retryAfter,
    });
  } catch (error) {
    logEmailOtpFailure(error);
    const failure = emailOtpFailureResponse(error);
    return Response.json({ message: failure.message }, { status: failure.status });
  }
}
