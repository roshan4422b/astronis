export const enquiryStatuses = [
  "New",
  "In Progress",
  "Responded",
  "Closed",
  "Interested",
  "Not Interested",
  "Follow-up",
] as const;

export type EnquiryStatus = (typeof enquiryStatuses)[number];

export function isEnquiryStatus(value: unknown): value is EnquiryStatus {
  return enquiryStatuses.some((status) => status === value);
}

export function isValidFollowUpDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function enquiryUpdateSchemaMessage(
  code: string | undefined,
  message: string | undefined,
  status: EnquiryStatus | undefined,
) {
  const missingFollowUpColumn = (code === "42703" || code === "PGRST204")
    && Boolean(message?.toLowerCase().includes("follow_up_date"));
  const newStatus = status === "Interested" || status === "Not Interested" || status === "Follow-up";
  if (missingFollowUpColumn || (code === "23514" && newStatus)) {
    return "The enquiry database needs the latest migration before this status can be saved.";
  }
  return null;
}
