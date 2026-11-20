import { NextResponse } from "next/server";
import { isValidVerificationEmail, sendMailtrapTransactionalEmail } from "@/lib/form-verification.server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { isSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { id } = await context.params;
  if (!id.trim() || id.length > 200) return NextResponse.json({ error: "Invalid enquiry ID." }, { status: 400 });

  let body: { subject?: unknown; message?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const subject = typeof body.subject === "string" ? body.subject.replace(/[\r\n]+/g, " ").trim().slice(0, 200) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 10000) : "";
  if (!subject || !message) return NextResponse.json({ error: "Enter an email subject and message." }, { status: 400 });

  const { data: enquiry, error: enquiryError } = await auth.supabase
    .from("cms_enquiries")
    .select("id, name, email")
    .eq("id", id)
    .maybeSingle();
  if (enquiryError) {
    console.error("[admin-enquiry-email] Could not load recipient.", { code: enquiryError.code || "unknown" });
    return NextResponse.json({ error: "Could not load the enquiry recipient." }, { status: 500 });
  }
  if (!enquiry) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  if (!enquiry.email || !isValidVerificationEmail(enquiry.email)) {
    return NextResponse.json({ error: "This enquiry does not have a valid email address." }, { status: 422 });
  }

  try {
    await sendMailtrapTransactionalEmail(enquiry.email, subject, message);
  } catch (error) {
    const configurationError = error instanceof Error && error.message.startsWith("Required server configuration is missing:");
    console.error("[admin-enquiry-email] Delivery failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
      configurationError,
    });
    return NextResponse.json(
      { error: configurationError ? "Transactional email is not configured on the server." : "Email could not be delivered. Check the email provider configuration and try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
