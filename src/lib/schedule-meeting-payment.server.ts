import "server-only";

import type { RazorpayEntity } from "@/lib/razorpay.server";

export type ScheduleMeetingData = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  service: string;
  team: string;
  turnover: string;
  date: string;
  time: string;
  timezone: string;
  mode: string;
};

export type MeetingBookingRow = Omit<ScheduleMeetingData, "date" | "time" | "mode"> & {
  id: string;
  booking_reference: string;
  idempotency_key: string;
  preferred_date: string;
  preferred_time: string;
  meeting_mode: string;
  booking_status: "pending_payment" | "confirmed";
  payment_status: "pending" | "failed" | "paid";
  amount: number;
  currency: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
};

const clean = (value: unknown, max = 240) => String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validTeams = new Set(["Just me", "2–10", "11–50", "51–200", "201–500", "500+"]);
const validTurnovers = new Set(["Pre-revenue", "Below ₹10 lakh", "₹10 lakh–₹50 lakh", "₹50 lakh–₹1 crore", "₹1 crore–₹10 crore", "₹10 crore–₹50 crore", "Above ₹50 crore", "Prefer not to disclose"]);
const validModes = new Set(["Video Meeting", "Phone Call", "In-Person Meeting"]);
const validZones = new Set(["Asia/Kolkata", "Asia/Dubai", "Europe/London", "America/New_York"]);
const validMeetingTimes = new Set(Array.from({ length: 21 }, (_, index) => {
  const minutes = 9 * 60 + 30 + index * 30;
  const hour24 = Math.floor(minutes / 60);
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minutes % 60 === 0 ? "00" : "30"} ${hour24 < 12 ? "AM" : "PM"}`;
}));

export function parseScheduleMeetingData(raw: Record<string, unknown>, validServices: ReadonlySet<string>): ScheduleMeetingData | null {
  const data = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 254).toLowerCase(),
    phone: clean(raw.phone, 24),
    organisation: clean(raw.organisation, 160),
    service: clean(raw.service, 120),
    team: clean(raw.team, 32),
    turnover: clean(raw.turnover, 64),
    date: clean(raw.date, 10),
    time: clean(raw.time, 16),
    timezone: clean(raw.timezone, 40),
    mode: clean(raw.mode, 32),
  };
  const dateValue = new Date(`${data.date}T12:00:00Z`);
  const today = new Date().toISOString().slice(0, 10);
  if (data.name.length < 2 || !emailPattern.test(data.email) || !/^\+\d{7,18}$/.test(data.phone) ||
      !data.organisation || !validServices.has(data.service) || !validTeams.has(data.team) ||
      !validTurnovers.has(data.turnover) || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      Number.isNaN(dateValue.getTime()) || dateValue.toISOString().slice(0, 10) !== data.date ||
      dateValue.getUTCDay() === 0 || dateValue.getUTCDay() === 6 || data.date < today ||
      !validMeetingTimes.has(data.time) || !validZones.has(data.timezone) || !validModes.has(data.mode)) return null;
  return data;
}

export function sameMeetingSubmission(existing: MeetingBookingRow, next: ScheduleMeetingData) {
  return existing.name === next.name &&
    existing.email === next.email &&
    existing.phone === next.phone &&
    existing.organisation === next.organisation &&
    existing.service === next.service &&
    existing.team === next.team &&
    existing.turnover === next.turnover &&
    existing.preferred_date === next.date &&
    existing.preferred_time === next.time &&
    existing.timezone === next.timezone &&
    existing.meeting_mode === next.mode;
}

export function paymentTransactionDetails(payment: RazorpayEntity, verifiedAt: string) {
  const clean = (value: string | undefined, max: number) =>
    (value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
  return {
    status: clean(payment.status, 32),
    method: clean(payment.method, 32),
    bank: clean(payment.bank, 64),
    cardNetwork: clean(payment.card?.network, 32),
    cardLast4: clean(payment.card?.last4, 4),
    errorCode: clean(payment.error_code, 64),
    errorDescription: clean(payment.error_description, 500),
    amount: payment.amount,
    currency: payment.currency,
    verifiedAt,
  };
}
