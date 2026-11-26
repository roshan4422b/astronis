import { NextResponse } from "next/server";
import { isValidVerificationEmail, sendMailtrapTransactionalEmail } from "@/lib/form-verification.server";
import { getSourceContentRecords } from "@/lib/cms/source-content";
import { isSameOriginRequest } from "@/lib/request-origin";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

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
  const isPersistedId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  const sourceTestimonial = getSourceContentRecords("testimonials").find((record) => record.id === id);
  if (!isPersistedId && !sourceTestimonial) {
    return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (!isRecord(payload)) return NextResponse.json({ error: "Invalid email details." }, { status: 400 });
  const subject = typeof payload.subject === "string" ? payload.subject.replace(/[\r\n]+/g, " ").trim().slice(0, 200) : "";
  const message = typeof payload.message === "string" ? payload.message.trim().slice(0, 10000) : "";
  if (!subject || !message) return NextResponse.json({ error: "Enter an email subject and message." }, { status: 400 });

  let testimonialData: Record<string, unknown>;
  if (isPersistedId) {
    const { data: testimonial, error: testimonialError } = await auth.supabase
      .from("cms_content")
      .select("id, collection, data")
      .eq("id", id)
      .eq("collection", "testimonials")
      .maybeSingle();
    if (testimonialError) {
      console.error("[admin-testimonial-email] Could not load recipient.", { code: testimonialError.code || "unknown" });
      return NextResponse.json({ error: "Could not load the testimonial recipient." }, { status: 500 });
    }
    if (!testimonial) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    testimonialData = isRecord(testimonial.data) ? testimonial.data : {};
  } else {
    testimonialData = { ...sourceTestimonial!.data };
  }

  const storedEmail = typeof testimonialData.email === "string" ? testimonialData.email.trim() : "";
  const requestedEmail = typeof payload.recipientEmail === "string" ? payload.recipientEmail.trim().slice(0, 254) : "";
  const email = requestedEmail || storedEmail;
  if (!isValidVerificationEmail(email)) {
    return NextResponse.json({ error: "This testimonial does not have a valid email address." }, { status: 422 });
  }

  if (email !== storedEmail) {
    if (isPersistedId) {
      const { error: updateError } = await auth.supabase
        .from("cms_content")
        .update({ data: { ...testimonialData, email } })
        .eq("id", id)
        .eq("collection", "testimonials");
      if (updateError) {
        console.error("[admin-testimonial-email] Could not save recipient email.", { code: updateError.code || "unknown" });
        return NextResponse.json({ error: "Could not save the testimonial email address." }, { status: 500 });
      }
    } else {
      const { error: upsertError } = await auth.supabase
        .from("cms_content")
        .upsert({
          collection: "testimonials",
          slug: sourceTestimonial!.slug,
          status: sourceTestimonial!.status,
          data: { ...testimonialData, email, sourceDefined: true },
          metadata: sourceTestimonial!.metadata,
          created_by: auth.user.id,
        }, { onConflict: "collection,slug" });
      if (upsertError) {
        console.error("[admin-testimonial-email] Could not save source recipient email.", { code: upsertError.code || "unknown" });
        return NextResponse.json({ error: "Could not save the testimonial email address." }, { status: 500 });
      }
    }
  }

  try {
    await sendMailtrapTransactionalEmail(email, subject, message);
  } catch (error) {
    const configurationError = error instanceof Error && error.message.startsWith("Required server configuration is missing:");
    console.error("[admin-testimonial-email] Delivery failed.", {
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
