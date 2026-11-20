import { isSameOriginRequest } from "@/lib/request-origin";
import { readRequestText } from "@/lib/request-body.server";
import {
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  getRazorpayConfig,
  RazorpayConfigurationError,
  verifyRazorpayCheckoutSignature,
} from "@/lib/razorpay.server";
import { sendMeetingConfirmationEmail } from "@/lib/schedule-meeting-confirmation.server";
import { paymentTransactionDetails, type MeetingBookingRow } from "@/lib/schedule-meeting-payment.server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

const error = (message: string, status = 400) => Response.json({ success: false, message }, { status });
const paidResponse = (booking: MeetingBookingRow, paymentId: string) => Response.json({
  success: true,
  status: "paid",
  booking: {
    reference: booking.booking_reference,
    customerName: booking.name,
    date: booking.preferred_date,
    time: booking.preferred_time,
    timezone: booking.timezone,
    amount: booking.amount,
    currency: booking.currency,
    paymentId,
  },
});

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return error("Request could not be processed.", 403);
  if (Number(request.headers.get("content-length") || 0) > 4_000) return error("Request is too large.", 413);

  let body: Record<string, unknown>;
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) throw new Error();
    const text = await readRequestText(request, 4_000);
    if (text === null) return error("Request is too large.", 413);
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return error("Payment verification request is invalid.");
  }
  const orderId = String(body.razorpay_order_id || "");
  const paymentId = String(body.razorpay_payment_id || "");
  const signature = String(body.razorpay_signature || "");
  const bookingReference = String(body.bookingReference || "");
  if (!/^order_[A-Za-z0-9]+$/.test(orderId) || !/^pay_[A-Za-z0-9]+$/.test(paymentId) ||
      !/^[a-f\d]{64}$/i.test(signature) || !/^AGM-[A-F\d]{24}$/.test(bookingReference)) {
    return error("Payment verification details are invalid.");
  }

  let config;
  try {
    config = getRazorpayConfig();
  } catch (reason) {
    if (reason instanceof RazorpayConfigurationError) return error("Payment verification is unavailable.", 503);
    throw reason;
  }
  if (!verifyRazorpayCheckoutSignature(orderId, paymentId, signature, config.keySecret)) {
    return error("The payment signature could not be verified.", 400);
  }

  const supabase = createSupabaseServiceClient();
  if (!supabase) return error("Booking storage is not configured.", 503);
  const { data: found, error: lookupError } = await supabase.from("cms_meeting_bookings")
    .select("*")
    .eq("booking_reference", bookingReference)
    .eq("razorpay_order_id", orderId)
    .maybeSingle();
  if (lookupError) {
    console.error("[schedule-meeting] Could not load booking for payment verification.", { code: lookupError.code || "unknown" });
    return error("We couldn't load your booking. Please retry.", 503);
  }
  if (!found) return error("The booking for this payment could not be found.", 404);
  let booking = found as MeetingBookingRow;

  if (booking.payment_status === "paid") {
    if (booking.razorpay_payment_id !== paymentId) return error("This booking was already paid using a different transaction.", 409);
    await sendMeetingConfirmationEmail(supabase, booking, paymentId);
    return paidResponse(booking, paymentId);
  }

  let payment;
  let order;
  try {
    [payment, order] = await Promise.all([
      fetchRazorpayPayment(config, paymentId),
      fetchRazorpayOrder(config, orderId),
    ]);
  } catch (reason) {
    console.error("[schedule-meeting] Could not fetch Razorpay status for verification.", {
      error: reason instanceof Error ? reason.name : "UnknownError",
    });
    return error("We couldn't check payment status yet. Please retry in a moment.", 502);
  }
  if (payment.id !== paymentId || payment.order_id !== orderId || order.id !== orderId ||
      payment.amount !== booking.amount || order.amount !== booking.amount ||
      payment.currency !== booking.currency || order.currency !== booking.currency) {
    console.error("[schedule-meeting] Razorpay payment details did not match the saved booking.", {
      bookingReference,
      orderId,
    });
    return error("The payment does not match this booking.", 409);
  }

  if (payment.status === "captured" && order.status === "paid") {
    const paidAt = new Date().toISOString();
    const { data: saved, error: saveError } = await supabase.from("cms_meeting_bookings")
      .update({
        booking_status: "confirmed",
        payment_status: "paid",
        razorpay_payment_id: paymentId,
        payment_details: paymentTransactionDetails(payment, paidAt),
        paid_at: paidAt,
      })
      .eq("id", booking.id)
      .eq("razorpay_order_id", orderId)
      .neq("payment_status", "paid")
      .select("*")
      .maybeSingle();
    if (saveError) {
      console.error("[schedule-meeting] Could not save verified payment.", { code: saveError.code || "unknown" });
      return error("Payment was received, but confirmation is still processing. Please retry shortly.", 503);
    }
    if (saved) {
      booking = saved as MeetingBookingRow;
    } else {
      const { data: refreshed, error: refreshError } = await supabase.from("cms_meeting_bookings")
        .select("*")
        .eq("id", booking.id)
        .maybeSingle();
      if (refreshError || !refreshed || (refreshed as MeetingBookingRow).razorpay_payment_id !== paymentId) {
        return error("Payment was received, but confirmation is still processing. Please retry shortly.", 503);
      }
      booking = refreshed as MeetingBookingRow;
    }
    await sendMeetingConfirmationEmail(supabase, booking, paymentId);
    return paidResponse(booking, paymentId);
  }

  if (payment.status === "failed") {
    const { data: failedPayment, error: saveError } = await supabase.from("cms_meeting_bookings")
      .update({
        payment_status: "failed",
        razorpay_payment_id: paymentId,
        payment_details: paymentTransactionDetails(payment, new Date().toISOString()),
      })
      .eq("id", booking.id)
      .neq("payment_status", "paid")
      .select("payment_status")
      .maybeSingle();
    if (saveError) {
      console.error("[schedule-meeting] Could not save failed payment status.", { code: saveError.code || "unknown" });
      return error("We couldn't update payment status. Please retry.", 503);
    }
    if (!failedPayment) {
      const { data: current, error: currentError } = await supabase.from("cms_meeting_bookings")
        .select("*")
        .eq("id", booking.id)
        .maybeSingle();
      if (currentError || !current) return error("We couldn't load payment status. Please retry.", 503);
      booking = current as MeetingBookingRow;
      if (booking.payment_status === "paid" && booking.razorpay_payment_id) {
        await sendMeetingConfirmationEmail(supabase, booking, booking.razorpay_payment_id);
        return paidResponse(booking, booking.razorpay_payment_id);
      }
    }
    return Response.json({
      success: true,
      status: "failed",
      message: "The payment was not completed. Your meeting details are saved; you can safely retry.",
    });
  }

  return Response.json({
    success: true,
    status: "pending",
    message: "Payment is still processing. Please wait a moment and retry verification.",
  });
}
