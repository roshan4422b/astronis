import { NextResponse } from "next/server";
import { isValidVerificationEmail, sendMailtrapTransactionalEmail } from "@/lib/form-verification.server";
import { getSourceContentRecords } from "@/lib/cms/source-content";
import { isSameOriginRequest } from "@/lib/request-origin";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { adminEmailAttachmentMaxRequestBytes } from "@/lib/admin/email-attachments";
import { parseAdminEmailAttachments } from "@/lib/admin/email-attachments.server";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { id } = await context.params;
  const sourceRecord = getSourceContentRecords("professionals").find((record) => record.id === id);
  let email = "";
  if (sourceRecord) {
    email = typeof sourceRecord.data.email === "string" ? sourceRecord.data.email.trim() : "";
  } else {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: "Invalid professional id." }, { status: 400 });
    }
    const { data: professional, error: professionalError } = await auth.supabase
      .from("cms_content")
      .select("id, collection, data")
      .eq("id", id)
      .eq("collection", "professionals")
      .maybeSingle();
    if (professionalError) {
      console.error("[admin-professional-email] Could not load recipient.", { code: professionalError.code || "unknown" });
      return NextResponse.json({ error: "Could not load the professional recipient." }, { status: 500 });
    }
    if (!professional) return NextResponse.json({ error: "Professional not found." }, { status: 404 });
    const data = isRecord(professional.data) ? professional.data : {};
    email = typeof data.email === "string" ? data.email.trim() : "";
  }

  if (!isValidVerificationEmail(email)) {
    return NextResponse.json({ error: "This professional does not have a valid email address." }, { status: 422 });
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > adminEmailAttachmentMaxRequestBytes) {
    return NextResponse.json({ error: "Attachments must total 4 MB or less." }, { status: 413 });
  }
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid email form data." }, { status: 400 });
  }
  const subjectValue = form.get("subject");
  const messageValue = form.get("message");
  const subject = typeof subjectValue === "string" ? subjectValue.replace(/[\r\n]+/g, " ").trim().slice(0, 200) : "";
  const message = typeof messageValue === "string" ? messageValue.trim().slice(0, 10000) : "";
  if (!subject || !message) return NextResponse.json({ error: "Enter an email subject and message." }, { status: 400 });
  const attachmentResult = await parseAdminEmailAttachments(form);
  if (!attachmentResult.ok) return NextResponse.json({ error: attachmentResult.error }, { status: 400 });

  try {
    await sendMailtrapTransactionalEmail(email, subject, message, attachmentResult.attachments);
  } catch (error) {
    const configurationError = error instanceof Error && error.message.startsWith("Required server configuration is missing:");
    console.error("[admin-professional-email] Delivery failed.", {
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
