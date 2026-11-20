import ExcelJS from "exceljs";

export type TestimonialExportRecord = {
  id: string;
  status: string;
  data: Record<string, unknown> | null;
  created_at: string | null;
};

export type TestimonialExportRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  designation: string;
  service: string;
  text: string;
  rating: number | "";
  format: string;
  approvalStatus: "Pending" | "Approved" | "Rejected" | "Archived";
  consentStatus: "Granted" | "Not granted";
  date: string;
  decisionAt: string;
  rejectionReason: string;
  hasImage: boolean;
};

export type TestimonialExportFilters = {
  status?: string;
  search?: string;
  type?: string;
  consent?: string;
};

function text(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function excelText(value: string) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function excelDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date;
}

export function mapTestimonialExportRecord(record: TestimonialExportRecord): TestimonialExportRow {
  const data = record.data && typeof record.data === "object" ? record.data : {};
  const approvalStatus = record.status === "published" || record.status === "approved"
    ? "Approved"
    : record.status === "rejected"
      ? "Rejected"
      : record.status === "archived"
        ? "Archived"
        : "Pending";
  return {
    id: record.id,
    name: text(data.name),
    email: text(data.email),
    phone: text(data.phone),
    title: text(data.title),
    company: text(data.company),
    designation: text(data.designation),
    service: text(data.service),
    text: text(data.text),
    rating: typeof data.rating === "number" && Number.isFinite(data.rating) ? data.rating : "",
    format: text(data.format),
    approvalStatus,
    consentStatus: data.consent === true && data.identityPublicationConsent === true ? "Granted" : "Not granted",
    date: record.created_at || "",
    decisionAt: text(data.moderationDecisionAt),
    rejectionReason: text(data.moderationReason),
    hasImage: Boolean(data.imagePath || data.imageUrl),
  };
}

export function matchesTestimonialExportFilters(
  testimonial: TestimonialExportRow,
  filters: TestimonialExportFilters,
) {
  const statusMatches = !filters.status
    || (filters.status === "Published" ? testimonial.approvalStatus === "Approved" : testimonial.approvalStatus === filters.status);
  const query = filters.search?.trim().toLowerCase() || "";
  const searchMatches = !query
    || `${testimonial.name} ${testimonial.email} ${testimonial.company} ${testimonial.text}`.toLowerCase().includes(query);
  const typeMatches = !filters.type
    || (filters.type === "Text testimonials" && testimonial.format !== "video")
    || (filters.type === "Video testimonials" && testimonial.format === "video")
    || (filters.type === "Image / media" && testimonial.hasImage);
  const consentMatches = !filters.consent || testimonial.consentStatus === filters.consent;
  return statusMatches && searchMatches && typeMatches && consentMatches;
}

export async function writeTestimonialWorkbook(testimonials: TestimonialExportRow[]) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Astronis Global";
  workbook.subject = "Testimonials";
  workbook.created = new Date();
  const worksheet = workbook.addWorksheet("Testimonials");
  worksheet.columns = [
    { header: "Testimonial ID", key: "id", width: 40 },
    { header: "Name", key: "name", width: 26 },
    { header: "Email", key: "email", width: 34 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "Company", key: "company", width: 30 },
    { header: "Designation", key: "designation", width: 24 },
    { header: "Service", key: "service", width: 24 },
    { header: "Title", key: "title", width: 30 },
    { header: "Testimonial", key: "text", width: 70 },
    { header: "Rating", key: "rating", width: 12 },
    { header: "Type", key: "format", width: 16 },
    { header: "Publication Status", key: "approvalStatus", width: 20 },
    { header: "Consent Status", key: "consentStatus", width: 18 },
    { header: "Submission Date", key: "date", width: 24 },
    { header: "Decision Date", key: "decisionAt", width: 24 },
    { header: "Rejection Reason", key: "rejectionReason", width: 45 },
  ];
  const header = worksheet.getRow(1);
  header.height = 24;
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071C4F" } };
  header.alignment = { vertical: "middle", wrapText: true };
  for (const testimonial of testimonials) {
    const row = worksheet.addRow({
      ...testimonial,
      id: excelText(testimonial.id),
      name: excelText(testimonial.name),
      email: excelText(testimonial.email),
      phone: excelText(testimonial.phone),
      company: excelText(testimonial.company),
      designation: excelText(testimonial.designation),
      service: excelText(testimonial.service),
      title: excelText(testimonial.title),
      text: excelText(testimonial.text),
      format: excelText(testimonial.format),
      approvalStatus: excelText(testimonial.approvalStatus),
      consentStatus: excelText(testimonial.consentStatus),
      date: excelDate(testimonial.date),
      decisionAt: excelDate(testimonial.decisionAt),
      rejectionReason: excelText(testimonial.rejectionReason),
    });
    row.getCell(14).numFmt = "dd mmm yyyy hh:mm";
    row.getCell(15).numFmt = "dd mmm yyyy hh:mm";
    row.alignment = { vertical: "top", wrapText: true };
  }
  return workbook.xlsx.writeBuffer();
}

export function testimonialExportFilename(date = new Date()) {
  return `astronis-testimonials-${date.toISOString().slice(0, 10)}.xlsx`;
}
