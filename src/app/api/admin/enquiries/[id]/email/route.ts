import { NextResponse } from "next/server";
import { isValidVerificationEmail, sendMailtrapTransactionalEmail } from "@/lib/form-verification.server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { isSameOriginRequest } from "@/lib/request-origin";
import { adminEmailAttachmentMaxRequestBytes } from "@/lib/admin/email-attachments";
import { parseAdminEmailAttachments } from "@/lib/admin/email-attachments.server";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { id } = await context.params;
  if (!id.trim() || id.length > 200) return NextResponse.json({ error: "Invalid enquiry ID." }, { status: 400 });

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > adminEmailAttachmentMaxRequestBytes) {
    return NextResponse.json({ error: "Attachments must total 4 MB or less." }, { status: 413 });
  }
  let form: FormData;
  try { form = await request.formData(); } catch { return NextResponse.json({ error: "Invalid email form data." }, { status: 400 }); }
  const subjectValue = form.get("subject");
  const messageValue = form.get("message");
  const subject = typeof subjectValue === "string" ? subjectValue.replace(/[\r\n]+/g, " ").trim().slice(0, 200) : "";
  const message = typeof messageValue === "string" ? messageValue.trim().slice(0, 10000) : "";
  if (!subject || !message) return NextResponse.json({ error: "Enter an email subject and message." }, { status: 400 });
  const attachmentResult = await parseAdminEmailAttachments(form);
  if (!attachmentResult.ok) return NextResponse.json({ error: attachmentResult.error }, { status: 400 });

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
    await sendMailtrapTransactionalEmail(enquiry.email, subject, message, attachmentResult.attachments);
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
