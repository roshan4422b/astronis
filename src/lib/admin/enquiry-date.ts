export function enquiryDateKey(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function enquiryFilterDateValue(
  enquiry: { date: string; followUpDate?: string },
  status: string,
) {
  return enquiryDateKey(status === "Follow-up" ? enquiry.followUpDate || "" : enquiry.date);
}

export function enquiryUtcDayRange(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const start = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(start.getTime()) || start.toISOString().slice(0, 10) !== value) return null;
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}
