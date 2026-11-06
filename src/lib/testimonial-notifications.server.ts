import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { isVerifiedTestimonialEmail, sendMailtrapTransactionalEmail } from "@/lib/form-verification.server";

export type TestimonialDecisionStatus = "approved" | "published" | "rejected";
export type TestimonialNotificationStatus =
  | "sent"
  | "sent-unrecorded"
  | "failed"
  | "skipped"
  | "duplicate"
  | "not-retryable";

type TestimonialRecord = {
  id: string;
  collection: string;
  status?: string;
  data: Record<string, unknown>;
};

function ledgerStatus(status: TestimonialDecisionStatus) {
  return status === "rejected" ? "rejected" : "published";
}

function isMissingNotificationLedger(error: { code?: string } | null | undefined) {
  return error?.code === "42P01" || error?.code === "PGRST205";
}

export async function sendTestimonialModerationEmail(
  supabase: SupabaseClient,
  record: TestimonialRecord,
  status: TestimonialDecisionStatus,
  options: { retry?: boolean } = {},
): Promise<TestimonialNotificationStatus> {
  if (
    record.collection !== "testimonials" ||
    (status !== "approved" && status !== "published" && status !== "rejected")
  ) return "skipped";

  const email = typeof record.data.email === "string" ? record.data.email : "";
  if (!isVerifiedTestimonialEmail(email, record.data.consentAcceptedAt, record.data.emailVerificationProof)) {
    return "skipped";
  }

  const eventStatus = ledgerStatus(status);
  const ledger = supabase.from("cms_testimonial_notification_deliveries");
  let ledgerAvailable = true;
  if (options.retry) {
    const { data: claim, error } = await ledger
      .update({ delivery_status: "sending" })
      .eq("testimonial_id", record.id)
      .eq("event_status", eventStatus)
      .eq("delivery_status", "failed")
      .select("testimonial_id")
      .maybeSingle();
    if (error) {
      if (isMissingNotificationLedger(error)) {
        ledgerAvailable = false;
      } else {
      console.error("[admin-testimonials] Could not claim a notification retry.", { code: error.code || "unknown" });
      return "failed";
      }
    }
    if (ledgerAvailable && !claim) return "not-retryable";
  } else {
    const { data: claim, error } = await ledger
      .insert({
        testimonial_id: record.id,
        event_status: eventStatus,
        delivery_status: "sending",
      })
      .select("testimonial_id")
      .maybeSingle();
    if (error?.code === "23505") return "duplicate";
    if (error && isMissingNotificationLedger(error)) {
      ledgerAvailable = false;
    } else if (error || !claim) {
      console.error("[admin-testimonials] Could not claim a moderation email delivery.", {
        code: error?.code || "unknown",
      });
      return "failed";
    }
  }

  const customerName = typeof record.data.name === "string"
    ? record.data.name.replace(/[\r\n\x00-\x1f\x7f]/g, " ").trim().slice(0, 120)
    : "Customer";
  const approved = status !== "rejected";
  const subject = approved
    ? "Your Testimonial Has Been Approved – Astronis Global"
    : "Update Regarding Your Testimonial – Astronis Global";
  const reason = typeof record.data.moderationReason === "string"
    ? record.data.moderationReason.replace(/[\r\n\x00-\x1f\x7f]/g, " ").trim().slice(0, 1000)
    : "";
  const text = approved
    ? `Dear ${customerName || "Customer"},\n\nThank you for sharing your valuable experience with Astronis Global.\n\nWe are pleased to inform you that your testimonial has been reviewed and approved by our team. It is now eligible to be displayed on the Astronis Global website.\n\nWe sincerely appreciate your trust and support.\n\nWelcome to the Astronis Global community!\n\nBest Regards,\nTeam Astronis Global`
    : `Dear ${customerName || "Customer"},\n\nThank you for taking the time to share your experience with Astronis Global.\n\nAfter reviewing your submission, we regret to inform you that your testimonial could not be approved for publication at this time.\n\nReason: ${reason || "Please contact our team for further information."}\n\nWe appreciate your understanding and thank you for your interest in Astronis Global.\n\nBest Regards,\nTeam Astronis Global`;

  try {
    await sendMailtrapTransactionalEmail(email, subject, text);
  } catch (error) {
    console.error("[admin-testimonials] Moderation email delivery failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    if (ledgerAvailable) {
      const { error: updateError } = await ledger
        .update({ delivery_status: "failed" })
        .eq("testimonial_id", record.id)
        .eq("event_status", eventStatus)
        .eq("delivery_status", "sending");
      if (updateError) {
        console.error("[admin-testimonials] Could not record moderation email failure.", {
          code: updateError.code || "unknown",
        });
      }
    }
    return "failed";
  }

  if (!ledgerAvailable) return "sent-unrecorded";
  const { error: updateError } = await ledger
    .update({ delivery_status: "sent", sent_at: new Date().toISOString() })
    .eq("testimonial_id", record.id)
    .eq("event_status", eventStatus)
    .eq("delivery_status", "sending");
  if (updateError) {
    console.error("[admin-testimonials] Could not record moderation email delivery.", {
      code: updateError.code || "unknown",
    });
    return "sent-unrecorded";
  }
  return "sent";
}
