import "server-only";

import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { MeetingBookingRow } from "@/lib/schedule-meeting-payment.server";

type DeliveryStatusColumn = "confirmation_email_status" | "internal_notification_status";
type DeliveryTimestampColumn = "confirmation_email_sent_at" | "internal_notification_sent_at";

async function sendBookingEmail(
  supabase: SupabaseClient,
  booking: MeetingBookingRow,
  resend: Resend,
  from: string,
  delivery: {
    statusColumn: DeliveryStatusColumn;
    timestampColumn: DeliveryTimestampColumn;
    recipient: string;
    subject: string;
    text: string;
    replyTo?: string;
  },
) {
  const { data: claim, error: claimError } = await supabase.from("cms_meeting_bookings")
    .update({ [delivery.statusColumn]: "sending" })
    .eq("id", booking.id)
    .in(delivery.statusColumn, ["pending", "failed"])
    .select("id")
    .maybeSingle();
  if (claimError) {
    console.error("[schedule-meeting] Could not claim booking email delivery.", {
      delivery: delivery.statusColumn,
      code: claimError.code || "unknown",
    });
    return;
  }
  if (!claim) return;

  try {
    const result = await resend.emails.send({
      from,
      to: [delivery.recipient],
      subject: delivery.subject,
      text: delivery.text,
      ...(delivery.replyTo ? { replyTo: delivery.replyTo } : {}),
    });
    if (result.error) throw new Error(result.error.message);
    const { error } = await supabase.from("cms_meeting_bookings")
      .update({
        [delivery.statusColumn]: "sent",
        [delivery.timestampColumn]: new Date().toISOString(),
      })
      .eq("id", booking.id)
      .eq(delivery.statusColumn, "sending");
    if (error) console.error("[schedule-meeting] Could not record booking email delivery.", { code: error.code || "unknown" });
  } catch (error) {
    console.error("[schedule-meeting] Booking email delivery failed.", {
      delivery: delivery.statusColumn,
      error: error instanceof Error ? error.name : "UnknownError",
    });
    const { error: updateError } = await supabase.from("cms_meeting_bookings")
      .update({ [delivery.statusColumn]: "failed" })
      .eq("id", booking.id)
      .eq(delivery.statusColumn, "sending");
    if (updateError) console.error("[schedule-meeting] Could not record booking email failure.", { code: updateError.code || "unknown" });
  }
}

export async function sendMeetingConfirmationEmail(
  supabase: SupabaseClient,
  booking: MeetingBookingRow,
  paymentId: string,
) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.error("[schedule-meeting] Booking emails skipped: Resend is not configured.");
    for (const column of ["confirmation_email_status", "internal_notification_status"] as const) {
      const { error } = await supabase.from("cms_meeting_bookings")
        .update({ [column]: "skipped" })
        .eq("id", booking.id)
        .in(column, ["pending", "failed"]);
      if (error) console.error("[schedule-meeting] Could not record skipped booking email.", {
        delivery: column,
        code: error.code || "unknown",
      });
    }
    return;
  }

  const amountFormat = new Intl.NumberFormat("en-IN", { style: "currency", currency: booking.currency });
  const fractionDigits = amountFormat.resolvedOptions().maximumFractionDigits ?? 2;
  const amount = amountFormat.format(booking.amount / (10 ** fractionDigits));
  const details = [
    `Booking reference: ${booking.booking_reference}`,
    `Customer name: ${booking.name}`,
    `Customer email: ${booking.email}`,
    `Mobile: ${booking.phone}`,
    `Organisation: ${booking.organisation}`,
    `Service required: ${booking.service}`,
    `Team size: ${booking.team}`,
    `Annual turnover: ${booking.turnover}`,
    `Meeting date: ${booking.preferred_date}`,
    `Meeting time: ${booking.preferred_time} (${booking.timezone})`,
    `Meeting mode: ${booking.meeting_mode}`,
    `Amount paid: ${amount}`,
    `Payment ID: ${paymentId}`,
  ];
  let resend: Resend;
  try {
    resend = new Resend(apiKey);
  } catch (error) {
    console.error("[schedule-meeting] Could not initialize booking email delivery.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    for (const column of ["confirmation_email_status", "internal_notification_status"] as const) {
      const { error: updateError } = await supabase.from("cms_meeting_bookings")
        .update({ [column]: "failed" })
        .eq("id", booking.id)
        .in(column, ["pending", "failed"]);
      if (updateError) console.error("[schedule-meeting] Could not record booking email failure.", {
        delivery: column,
        code: updateError.code || "unknown",
      });
    }
    return;
  }
  const receiptDetails = [
    `Booking reference: ${booking.booking_reference}`,
    `Meeting date: ${booking.preferred_date}`,
    `Meeting time: ${booking.preferred_time} (${booking.timezone})`,
    `Meeting mode: ${booking.meeting_mode}`,
    `Amount paid: ${amount}`,
    `Payment ID: ${paymentId}`,
  ];
  await sendBookingEmail(supabase, booking, resend, from, {
    statusColumn: "internal_notification_status",
    timestampColumn: "internal_notification_sent_at",
    recipient: "advisory@astronisglobal.com",
    subject: `Paid consultation booking ${booking.booking_reference} | ${booking.name}`,
    text: ["A consultation payment has been verified.", "", ...details].join("\n"),
    replyTo: booking.email,
  });
  await sendBookingEmail(supabase, booking, resend, from, {
    statusColumn: "confirmation_email_status",
    timestampColumn: "confirmation_email_sent_at",
    recipient: booking.email,
    subject: `Consultation confirmed · ${booking.booking_reference}`,
    text: [
      `Hello ${booking.name},`,
      "",
      "Your consultation payment has been verified and your booking is confirmed.",
      ...receiptDetails,
      "",
      "Our team will contact you if the preferred time needs adjustment.",
      "",
      "Astronis Global",
      "advisory@astronisglobal.com",
    ].join("\n"),
  });
}
