import {
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  getRazorpayConfig,
  RazorpayConfigurationError,
  verifyRazorpayWebhookSignature,
  type RazorpayEntity,
} from "@/lib/razorpay.server";
import { sendMeetingConfirmationEmail } from "@/lib/schedule-meeting-confirmation.server";
import { paymentTransactionDetails, type MeetingBookingRow } from "@/lib/schedule-meeting-payment.server";
import { readRequestText } from "@/lib/request-body.server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isPaymentEntity(value: unknown): value is RazorpayEntity {
  if (!isRecord(value)) return false;
  return typeof value.id === "string" &&
    typeof value.order_id === "string" &&
    typeof value.amount === "number" &&
    typeof value.currency === "string" &&
    typeof value.status === "string";
}

async function saveWebhookEvent(
  supabase: NonNullable<ReturnType<typeof createSupabaseServiceClient>>,
  eventId: string,
  eventType: string,
  bookingId: string | null,
) {
  const { error } = await supabase.from("cms_meeting_payment_events").insert({
    event_id: eventId,
    event_type: eventType,
    booking_id: bookingId,
  });
  if (error?.code === "23505") return true;
  if (error) console.error("[schedule-meeting] Could not persist webhook event.", { code: error.code || "unknown" });
  return !error;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 256_000) {
    return Response.json({ received: false }, { status: 413 });
  }
  let rawBody: string;
  try {
    const body = await readRequestText(request, 256_000);
    if (body === null) return Response.json({ received: false }, { status: 413 });
    rawBody = body;
  } catch {
    return Response.json({ received: false }, { status: 400 });
  }
  const signature = request.headers.get("x-razorpay-signature") || "";
  const eventId = request.headers.get("x-razorpay-event-id") || "";
  if (!eventId || eventId.length > 255 || /[\u0000-\u001f\u007f]/.test(eventId)) {
    return Response.json({ received: false }, { status: 400 });
  }

  let config;
  try {
    config = getRazorpayConfig();
  } catch (reason) {
    if (reason instanceof RazorpayConfigurationError) return Response.json({ received: false }, { status: 503 });
    throw reason;
  }
  if (!verifyRazorpayWebhookSignature(rawBody, signature, config.webhookSecret)) {
    return Response.json({ received: false }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ received: false }, { status: 400 });
  }
  if (!isRecord(payload) || typeof payload.event !== "string") {
    return Response.json({ received: false }, { status: 400 });
  }
  const eventType = payload.event;
  const paymentContainer = isRecord(payload.payload) && isRecord(payload.payload.payment)
    ? payload.payload.payment
    : null;
  const rawPayment = paymentContainer && isRecord(paymentContainer.entity) ? paymentContainer.entity : null;
  const paymentId = rawPayment && typeof rawPayment.id === "string" ? rawPayment.id : "";
  const orderId = rawPayment && typeof rawPayment.order_id === "string" ? rawPayment.order_id : "";

  const supabase = createSupabaseServiceClient();
  if (!supabase) return Response.json({ received: false }, { status: 503 });
  const { data: priorEvent, error: priorError } = await supabase.from("cms_meeting_payment_events")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();
  if (priorError) {
    console.error("[schedule-meeting] Could not check webhook event idempotency.", { code: priorError.code || "unknown" });
    return Response.json({ received: false }, { status: 503 });
  }
  if (priorEvent) return Response.json({ received: true });

  if (!["payment.captured", "payment.failed"].includes(eventType) || !paymentId || !orderId) {
    const saved = await saveWebhookEvent(supabase, eventId, eventType, null);
    return Response.json({ received: saved }, { status: saved ? 200 : 503 });
  }

  const { data: found, error: bookingError } = await supabase.from("cms_meeting_bookings")
    .select("*")
    .eq("razorpay_order_id", orderId)
    .maybeSingle();
  if (bookingError) {
    console.error("[schedule-meeting] Could not find booking for webhook.", { code: bookingError.code || "unknown" });
    return Response.json({ received: false }, { status: 503 });
  }
  if (!found) {
    const saved = await saveWebhookEvent(supabase, eventId, eventType, null);
    return Response.json({ received: saved }, { status: saved ? 200 : 503 });
  }
  let booking = found as MeetingBookingRow;

  let payment: RazorpayEntity;
  let order: RazorpayEntity;
  try {
    [payment, order] = await Promise.all([
      fetchRazorpayPayment(config, paymentId),
      fetchRazorpayOrder(config, orderId),
    ]);
  } catch (reason) {
    console.error("[schedule-meeting] Could not fetch Razorpay status for webhook.", {
      error: reason instanceof Error ? reason.name : "UnknownError",
    });
    return Response.json({ received: false }, { status: 502 });
  }
  if (!isPaymentEntity(payment) || payment.id !== paymentId || payment.order_id !== orderId ||
      order.id !== orderId || payment.amount !== booking.amount || order.amount !== booking.amount ||
      payment.currency !== booking.currency || order.currency !== booking.currency) {
    console.error("[schedule-meeting] Webhook payment did not match the saved booking.", {
      bookingReference: booking.booking_reference,
      orderId,
    });
    return Response.json({ received: false }, { status: 409 });
  }

  const verifiedAt = new Date().toISOString();
  if (payment.status === "captured" && order.status === "paid") {
    const { data: saved, error: updateError } = await supabase.from("cms_meeting_bookings")
      .update({
        booking_status: "confirmed",
        payment_status: "paid",
        razorpay_payment_id: paymentId,
        payment_details: paymentTransactionDetails(payment, verifiedAt),
        paid_at: verifiedAt,
      })
      .eq("id", booking.id)
      .eq("razorpay_order_id", orderId)
      .neq("payment_status", "paid")
      .select("*")
      .maybeSingle();
    if (updateError) {
      console.error("[schedule-meeting] Could not save webhook payment.", { code: updateError.code || "unknown" });
      return Response.json({ received: false }, { status: 503 });
    }
    if (saved) {
      booking = saved as MeetingBookingRow;
    } else {
      const { data: refreshed, error: refreshError } = await supabase.from("cms_meeting_bookings")
        .select("*")
        .eq("id", booking.id)
        .maybeSingle();
      if (refreshError || !refreshed || (refreshed as MeetingBookingRow).razorpay_payment_id !== paymentId) {
        return Response.json({ received: false }, { status: 503 });
      }
      booking = refreshed as MeetingBookingRow;
    }
    if (!await saveWebhookEvent(supabase, eventId, eventType, booking.id)) {
      return Response.json({ received: false }, { status: 503 });
    }
    await sendMeetingConfirmationEmail(supabase, booking, paymentId);
    return Response.json({ received: true });
  }

  if (payment.status === "failed") {
    const { error: updateError } = await supabase.from("cms_meeting_bookings")
      .update({
        payment_status: "failed",
        razorpay_payment_id: paymentId,
        payment_details: paymentTransactionDetails(payment, verifiedAt),
      })
      .eq("id", booking.id)
      .neq("payment_status", "paid");
    if (updateError) {
      console.error("[schedule-meeting] Could not save failed webhook payment.", { code: updateError.code || "unknown" });
      return Response.json({ received: false }, { status: 503 });
    }
  }

  const saved = await saveWebhookEvent(supabase, eventId, eventType, booking.id);
  return Response.json({ received: saved }, { status: saved ? 200 : 503 });
}
