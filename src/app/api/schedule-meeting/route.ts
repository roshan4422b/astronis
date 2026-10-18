import { Resend } from "resend";
import { services } from "@/data/services";

export const runtime = "nodejs";

const clean = (value: unknown, max = 240) => String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validTeams = new Set(["Just me", "2–10", "11–50", "51–200", "201–500", "500+"]);
const validTurnovers = new Set(["Pre-revenue", "Below ₹10 lakh", "₹10 lakh–₹50 lakh", "₹50 lakh–₹1 crore", "₹1 crore–₹10 crore", "₹10 crore–₹50 crore", "Above ₹50 crore", "Prefer not to disclose"]);
const validModes = new Set(["Video Meeting", "Phone Call", "In-Person Meeting"]);
const validZones = new Set(["Asia/Kolkata", "Asia/Dubai", "Europe/London", "America/New_York"]);
const validServices = new Set(services.map((service) => service.title));
const isValidMeetingTime = (value: string) => {
  const match = /^(0?[1-9]|1[0-2]):(00|30) (AM|PM)$/.exec(value);
  if (!match) return false;
  let hour = Number(match[1]) % 12;
  if (match[3] === "PM") hour += 12;
  const minutesAfterMidnight = hour * 60 + Number(match[2]);
  return minutesAfterMidnight >= 9 * 60 + 30 && minutesAfterMidnight <= 19 * 60 + 30;
};
const error = (message: string, status = 400) => Response.json({ success: false, message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return error("Request could not be processed.", 403);
  if (Number(request.headers.get("content-length") || 0) > 12000) return error("Request is too large.", 413);
  let raw: Record<string, unknown>;
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) throw new Error();
    raw = await request.json();
  } catch { return error("Please review the form and try again."); }

  const name = clean(raw.name, 120);
  const email = clean(raw.email, 254).toLowerCase();
  const phone = clean(raw.phone, 24);
  const organisation = clean(raw.organisation, 160);
  const service = clean(raw.service, 120);
  const team = clean(raw.team, 32);
  const turnover = clean(raw.turnover, 64);
  const date = clean(raw.date, 10);
  const time = clean(raw.time, 16);
  const timezone = clean(raw.timezone, 40);
  const mode = clean(raw.mode, 32);
  const dateValue = new Date(`${date}T12:00:00Z`);
  const weekday = dateValue.getUTCDay();
  if (name.length < 2 || !emailPattern.test(email) || !/^\+\d{7,18}$/.test(phone) || !organisation || !validServices.has(service) || !validTeams.has(team) || !validTurnovers.has(turnover)) return error("Please provide valid contact and organisation details.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(dateValue.getTime()) || dateValue.toISOString().slice(0, 10) !== date || weekday === 0 || weekday === 6 || date < new Date().toISOString().slice(0, 10)) return error("Choose a valid future weekday.");
  if (!isValidMeetingTime(time) || !validZones.has(timezone) || !validModes.has(mode) || raw.consent !== true) return error("Please review your meeting preference and consent.");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return error("The consultation request service is not configured yet. Please contact advisory@astronisglobal.com.", 503);

  const reference = `AST-${new Date().toISOString().slice(2, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const text = [
    `Consultation request ${reference} (pending confirmation)`, `Name: ${name}`, `Mobile: ${phone}`, `Email: ${email}`,
    `Organisation: ${organisation}`, `Service required: ${service}`, `Team size: ${team}`, `Annual turnover: ${turnover}`,
    `Preferred date: ${date}`, `Preferred time: ${time} (${timezone})`, `Meeting mode: ${mode}`,
    "This is a requested preference, not a confirmed or reserved appointment.",
  ].join("\n");
  try {
    const resend = new Resend(apiKey);
    const internal = await resend.emails.send({ from, to: ["advisory@astronisglobal.com"], replyTo: email, subject: `Consultation request ${reference} | ${name}`, text });
    if (internal.error) throw new Error(internal.error.message);
    const customer = await resend.emails.send({ from, to: [email], subject: "Astronis has received your consultation request", text: `Hello ${name},\n\nWe have received your consultation request (${reference}). Your preferred date and time are not reserved yet. Our team will contact you to confirm availability.\n\nRequested date: ${date}\nRequested time: ${time} (${timezone})\nMeeting mode: ${mode}\n\nAstronis Global\nadvisory@astronisglobal.com` });
    if (customer.error) console.error("Customer request receipt email failed:", customer.error.message);
    return Response.json({ success: true, status: "pending", reference });
  } catch (reason) {
    console.error("Meeting request email failed:", reason instanceof Error ? reason.message : "Unknown provider error");
    return error("We couldn't send your request. Please try again or email advisory@astronisglobal.com.", 502);
  }
}
