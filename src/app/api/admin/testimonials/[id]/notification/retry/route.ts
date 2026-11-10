import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { sendTestimonialModerationEmail } from "@/lib/testimonial-notifications.server";

export const runtime = "nodejs";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { id } = await context.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  }

  const { data: record, error } = await auth.supabase
    .from("cms_content")
    .select("id, collection, status, data")
    .eq("id", id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: "Could not load testimonial." }, { status: 500 });
  if (!record || record.collection !== "testimonials") {
    return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
  }
  if (record.status !== "approved" && record.status !== "published" && record.status !== "rejected") {
    return NextResponse.json({ error: "Only a decided testimonial notification can be retried." }, { status: 409 });
  }

  const eventStatus = record.status === "rejected" ? "rejected" : "published";
  const { data: delivery, error: deliveryError } = await auth.supabase
    .from("cms_testimonial_notification_deliveries")
    .select("delivery_status")
    .eq("testimonial_id", record.id)
    .eq("event_status", eventStatus)
    .maybeSingle();
  if (deliveryError) {
    const code = deliveryError.code || "unknown";
    console.error("[admin-testimonials] Notification retry status lookup failed.", {
      code,
    });
    if (code === "42P01" || code === "PGRST205") {
      const notificationStatus = await sendTestimonialModerationEmail(
        auth.supabase,
        record,
        record.status,
      );
      if (notificationStatus === "sent" || notificationStatus === "sent-unrecorded") {
        return NextResponse.json({ notificationStatus });
      }
    }
    const message = code === "42501"
      ? "This admin account cannot access testimonial notification storage. Check its RLS policy and grants."
      : code === "42P01" || code === "PGRST205"
        ? "The notification email could not be delivered because Mailtrap is unavailable or misconfigured."
        : "Could not load notification status. Check the notification migration and admin permissions.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
  if (delivery && delivery.delivery_status !== "failed") {
    return NextResponse.json(
      { error: delivery.delivery_status === "sent" ? "This notification was already sent." : "This notification is already being sent." },
      { status: 409 },
    );
  }

  const notificationStatus = await sendTestimonialModerationEmail(
    auth.supabase,
    record,
    record.status,
    delivery?.delivery_status === "failed" ? { retry: true } : {},
  );
  if (notificationStatus === "sent") return NextResponse.json({ notificationStatus });
  if (notificationStatus === "not-retryable" || notificationStatus === "duplicate") {
    return NextResponse.json({ error: "This notification is already being sent or has already been delivered." }, { status: 409 });
  }
  return NextResponse.json(
    {
      notificationStatus,
      error: notificationStatus === "skipped"
        ? "A verified recipient email is not available for this testimonial."
        : notificationStatus === "failed"
          ? "The notification could not be delivered. Check the notification migration, admin permissions, and Mailtrap configuration."
          : "The notification could not be delivered. The moderation decision was not changed.",
    },
    { status: 502 },
  );
}
