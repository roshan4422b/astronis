import { randomUUID } from "node:crypto";
import { services } from "@/data/services";
import { consumeFormVerification, verificationFailure } from "@/lib/form-verification.server";
import { isSameOriginRequest } from "@/lib/request-origin";
import { readRequestText } from "@/lib/request-body.server";
import { createRazorpayOrder, getRazorpayConfig, RazorpayConfigurationError } from "@/lib/razorpay.server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import {
  parseScheduleMeetingData,
  sameMeetingSubmission,
  type MeetingBookingRow,
} from "@/lib/schedule-meeting-payment.server";

export const runtime = "nodejs";

const error = (message: string, status = 400) => Response.json({ success: false, message }, { status });
const validIdempotencyKey = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

function orderResponse(booking: MeetingBookingRow, keyId: string) {
  return Response.json({
    success: true,
    status: booking.payment_status,
    keyId,
    amount: booking.amount,
    currency: booking.currency,
    orderId: booking.razorpay_order_id,
    bookingReference: booking.booking_reference,
    customerName: booking.name,
    ...(booking.payment_status === "paid" ? { paymentId: booking.razorpay_payment_id } : {}),
  }, { headers: { "Cache-Control": "no-store" } });
}

async function findBooking(supabase: NonNullable<ReturnType<typeof createSupabaseServiceClient>>, idempotencyKey: string) {
  const { data, error: queryError } = await supabase.from("cms_meeting_bookings")
    .select("*")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (queryError) {
    console.error("[schedule-meeting] Could not load booking.", { code: queryError.code || "unknown" });
    return { booking: null, failed: true };
  }
  return { booking: data as MeetingBookingRow | null, failed: false };
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return error("Request could not be processed.", 403);
  if (Number(request.headers.get("content-length") || 0) > 12_000) return error("Request is too large.", 413);

  let raw: Record<string, unknown>;
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) throw new Error();
    const text = await readRequestText(request, 12_000);
    if (text === null) return error("Request is too large.", 413);
    const body: unknown = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    raw = body as Record<string, unknown>;
  } catch {
    return error("Please review the form and try again.");
  }

  const data = parseScheduleMeetingData(raw, new Set(services.map((service) => service.title)));
  const idempotencyKey = String(raw.idempotencyKey || "").trim();
  if (!data || !validIdempotencyKey(idempotencyKey)) return error("Please review the meeting details and try again.");
  if (raw.consent !== true || raw.enquiryAgreementAccepted !== "yes" ||
      raw.enquiryAgreementId !== "enquiry-communication-consultation-consent") {
    return error("Please accept the consultation consent before continuing.");
  }

  let config;
  try {
    config = getRazorpayConfig();
  } catch (reason) {
    if (reason instanceof RazorpayConfigurationError) {
      return error("Online payment is not available yet. Please try again later.", 503);
    }
    throw reason;
  }
  const supabase = createSupabaseServiceClient();
  if (!supabase) return error("Booking storage is not configured. Please try again later.", 503);

  const initialLookup = await findBooking(supabase, idempotencyKey);
  if (initialLookup.failed) return error("We couldn't load your booking. Please try again.", 503);
  let booking = initialLookup.booking;
  if (booking && !sameMeetingSubmission(booking, data)) {
    return error("This booking reference is already associated with different details.", 409);
  }

  if (!booking) {
    const verificationResponse = verificationFailure(
      await consumeFormVerification(
        request,
        data.email,
        String(raw.captchaToken || "").slice(0, 2048),
        String(raw.emailVerificationToken || "").slice(0, 128),
      ),
    );
    if (verificationResponse) return verificationResponse;

    const id = randomUUID();
    const bookingReference = `AGM-${randomUUID().replace(/-/g, "").slice(0, 24).toUpperCase()}`;
    const { data: inserted, error: insertError } = await supabase.from("cms_meeting_bookings")
      .insert({
        id,
        booking_reference: bookingReference,
        idempotency_key: idempotencyKey,
        name: data.name,
        email: data.email,
        phone: data.phone,
        organisation: data.organisation,
        service: data.service,
        team: data.team,
        turnover: data.turnover,
        preferred_date: data.date,
        preferred_time: data.time,
        timezone: data.timezone,
        meeting_mode: data.mode,
        enquiry_agreement_id: "enquiry-communication-consultation-consent",
        consent_accepted_at: new Date().toISOString(),
        amount: config.amount,
        currency: config.currency,
      })
      .select("*")
      .single();

    if (insertError?.code === "23505") {
      const result = await findBooking(supabase, idempotencyKey);
      if (result.failed || !result.booking) return error("We couldn't save your booking. Please try again.", 503);
      if (!sameMeetingSubmission(result.booking, data)) return error("This booking reference is already associated with different details.", 409);
      booking = result.booking;
    } else if (insertError || !inserted) {
      console.error("[schedule-meeting] Booking persistence failed.", { code: insertError?.code || "unknown" });
      return error("We couldn't save your booking. Please try again.", 503);
    } else {
      booking = inserted as MeetingBookingRow;
    }
  }

  if (booking.payment_status === "paid") return orderResponse(booking, config.keyId);
  if (booking.razorpay_order_id) return orderResponse(booking, config.keyId);

  const lockStartedAt = new Date().toISOString();
  const lockExpiredAt = new Date(Date.now() - 2 * 60_000).toISOString();
  const { data: claim, error: claimError } = await supabase.from("cms_meeting_bookings")
    .update({ order_creation_started_at: lockStartedAt })
    .eq("id", booking.id)
    .is("razorpay_order_id", null)
    .or(`order_creation_started_at.is.null,order_creation_started_at.lt.${lockExpiredAt}`)
    .select("id")
    .maybeSingle();
  if (claimError) {
    console.error("[schedule-meeting] Could not reserve order creation.", { code: claimError.code || "unknown" });
    return error("We couldn't start payment. Please try again.", 503);
  }
  if (!claim) {
    const refreshed = await findBooking(supabase, idempotencyKey);
    if (refreshed.failed || !refreshed.booking) return error("We couldn't load your booking. Please try again.", 503);
    if (refreshed.booking.razorpay_order_id || refreshed.booking.payment_status === "paid") {
      return orderResponse(refreshed.booking, config.keyId);
    }
    return error("Your payment session is being prepared. Please retry in a moment.", 409);
  }

  try {
    const order = await createRazorpayOrder(config, booking.booking_reference, booking.amount, booking.currency);
    if (!/^order_[A-Za-z0-9]+$/.test(order.id) || order.amount !== booking.amount ||
        order.currency !== booking.currency || order.status !== "created") {
      throw new Error("Razorpay returned an order that does not match the saved booking.");
    }
    const { data: saved, error: saveError } = await supabase.from("cms_meeting_bookings")
      .update({ razorpay_order_id: order.id, order_creation_started_at: null })
      .eq("id", booking.id)
      .is("razorpay_order_id", null)
      .eq("order_creation_started_at", lockStartedAt)
      .select("*")
      .maybeSingle();
    if (saveError) {
      console.error("[schedule-meeting] Could not save Razorpay order.", { code: saveError.code || "unknown" });
      return error("We couldn't save your payment session. Please retry safely.", 503);
    }
    if (saved) return orderResponse(saved as MeetingBookingRow, config.keyId);

    const refreshed = await findBooking(supabase, idempotencyKey);
    if (!refreshed.failed && refreshed.booking?.razorpay_order_id) {
      return orderResponse(refreshed.booking, config.keyId);
    }
    return error("We couldn't save your payment session. Please retry safely.", 503);
  } catch (reason) {
    const { error: releaseError } = await supabase.from("cms_meeting_bookings")
      .update({ order_creation_started_at: null })
      .eq("id", booking.id)
      .eq("order_creation_started_at", lockStartedAt)
      .is("razorpay_order_id", null);
    if (releaseError) console.error("[schedule-meeting] Could not release order-creation reservation.", { code: releaseError.code || "unknown" });
    console.error("[schedule-meeting] Razorpay order creation failed.", {
      error: reason instanceof Error ? reason.name : "UnknownError",
    });
    return Response.json({
      success: false,
      message: "We couldn't start payment. Your details are saved; please retry.",
      bookingReference: booking.booking_reference,
    }, { status: 502 });
  }
}
