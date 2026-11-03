import ExcelJS from "exceljs";
import type { Writable } from "node:stream";

export const enquiryExportPageSize = 500;

export type EnquiryExportRecord = {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  form_type: string | null;
  status: string | null;
  internal_notes: string | null;
  data: Record<string, unknown> | null;
  created_at: string | null;
  updated_at: string | null;
};

export async function* paginateEnquiries(
  fetchPage: (offset: number, pageSize: number) => Promise<EnquiryExportRecord[]>,
  firstPage?: EnquiryExportRecord[],
): AsyncGenerator<EnquiryExportRecord> {
  let offset = 0;
  let page = firstPage;

  while (true) {
    page ??= await fetchPage(offset, enquiryExportPageSize);
    for (const record of page) yield record;
    if (page.length < enquiryExportPageSize) return;
    offset += page.length;
    page = undefined;
  }
}

function text(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

function excelDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date;
}

export async function writeEnquiryWorkbook(
  stream: Writable,
  enquiries: AsyncIterable<EnquiryExportRecord>,
) {
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
    stream,
    useStyles: true,
  });
  workbook.creator = "Astronis Global";
  workbook.subject = "Contact enquiries";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Enquiries");
  worksheet.columns = [
    { header: "Enquiry ID", key: "id", width: 40 },
    { header: "Name", key: "name", width: 26 },
    { header: "Email", key: "email", width: 34 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "Company / Organisation", key: "company", width: 32 },
    { header: "Subject / Service", key: "subject", width: 34 },
    { header: "Message / Enquiry Details", key: "message", width: 70 },
    { header: "Submission Date & Time", key: "submittedAt", width: 25 },
    { header: "Status", key: "status", width: 18 },
    { header: "Source / Form Type", key: "source", width: 24 },
    { header: "Internal Notes", key: "internalNotes", width: 50 },
    { header: "Additional Stored Details (JSON)", key: "additionalDetails", width: 70 },
    { header: "Last Updated", key: "updatedAt", width: 25 },
  ];
  const header = worksheet.getRow(1);
  header.height = 24;
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF071C4F" } };
  header.alignment = { vertical: "middle", wrapText: true };
  header.commit();

  for await (const enquiry of enquiries) {
    const data = enquiry.data && typeof enquiry.data === "object" ? enquiry.data : {};
    const row = worksheet.addRow({
      id: text(enquiry.id),
      name: text(enquiry.name),
      email: text(enquiry.email),
      phone: text(data.phone),
      company: text(enquiry.company),
      subject: text(enquiry.subject),
      message: text(enquiry.message),
      submittedAt: excelDate(enquiry.created_at),
      status: text(enquiry.status),
      source: text(enquiry.form_type),
      internalNotes: text(enquiry.internal_notes),
      additionalDetails: JSON.stringify(data),
      updatedAt: excelDate(enquiry.updated_at),
    });
    row.getCell(8).numFmt = "dd mmm yyyy hh:mm";
    row.getCell(13).numFmt = "dd mmm yyyy hh:mm";
    row.alignment = { vertical: "top", wrapText: true };
    row.commit();
  }

  await worksheet.commit();
  await workbook.commit();
}

export function enquiryExportFilename(id?: string, date = new Date()) {
  if (id) {
    const safeId = id.replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 80) || "record";
    return `enquiry-${safeId}.xlsx`;
  }
  return `astronis-enquiries-${date.toISOString().slice(0, 10)}.xlsx`;
}

export function matchesEnquirySearch(record: EnquiryExportRecord, query: string) {
  if (!query) return true;
  const haystack = `${record.name ?? ""} ${record.email ?? ""} ${record.subject ?? ""}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}
