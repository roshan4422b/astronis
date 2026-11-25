import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PassThrough } from "node:stream";
import { test } from "node:test";
import ExcelJS from "exceljs";

const {
  enquiryExportFilename,
  enquiryExportPageSize,
  matchesEnquirySearch,
  paginateEnquiries,
  writeEnquiryWorkbook,
} = await import("../src/lib/admin/enquiry-export.ts");
const { displayEnquiryLabel } = await import("../src/lib/admin/enquiry-display.ts");
const { enquiryDateKey, enquiryFilterDateValue, enquiryUtcDayRange } = await import("../src/lib/admin/enquiry-date.ts");
const { createEnquiryReplyTemplate } = await import("../src/lib/admin/enquiry-email.ts");
const { enquiryStatuses, enquiryUpdateSchemaMessage, isValidFollowUpDate } = await import("../src/lib/admin/enquiry-status.ts");

function makeEnquiry(id, extra = {}) {
  return {
    id: String(id),
    name: `Contact ${id}`,
    email: `contact-${id}@example.test`,
    company: "Example Organisation",
    subject: "Corporate advisory",
    message: "Please contact me about an advisory service.",
    form_type: "website",
    status: "New",
    internal_notes: "",
    data: { phone: "+1 555 0100", city: "London" },
    created_at: "2026-11-02T10:15:00.000Z",
    updated_at: "2026-11-02T10:20:00.000Z",
    ...extra,
  };
}

async function workbookBytes(records) {
  const stream = new PassThrough();
  const chunks = [];
  stream.on("data", (chunk) => chunks.push(chunk));
  await writeEnquiryWorkbook(stream, records);
  return Buffer.concat(chunks);
}

test("paginates through the full enquiry dataset rather than stopping at a page limit", async () => {
  const records = Array.from({ length: enquiryExportPageSize * 2 + 17 }, (_, index) => makeEnquiry(index));
  const offsets = [];
  const stream = new PassThrough();
  const chunks = [];
  stream.on("data", (chunk) => chunks.push(chunk));
  const all = paginateEnquiries(async (offset, pageSize) => {
    offsets.push(offset);
    return records.slice(offset, offset + pageSize);
  });
  const bytesPromise = writeEnquiryWorkbook(stream, all).then(() => Buffer.concat(chunks));
  let count = 0;
  for await (const record of paginateEnquiries(async (offset, pageSize) => records.slice(offset, offset + pageSize))) {
    count += Number(typeof record.id === "string");
  }
  const bytes = await bytesPromise;
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(bytes);
  const sheet = workbook.getWorksheet("Enquiries");
  assert.ok(sheet);
  assert.equal(sheet.rowCount, records.length + 1);
  assert.equal(sheet.getRow(sheet.rowCount).getCell(1).value, String(records.length - 1));
  assert.equal(count, records.length);
  assert.deepEqual(offsets, [0, enquiryExportPageSize, enquiryExportPageSize * 2]);
});

test("writes a valid styled XLSX with full fields, date cells and formula-safe user text", async () => {
  const maliciousText = '=HYPERLINK("https://example.test","open")';
  const bytes = await workbookBytes((async function* () {
    yield makeEnquiry("single-1", { message: maliciousText });
  })());
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(bytes);
  const sheet = workbook.getWorksheet("Enquiries");
  assert.ok(sheet);
  assert.equal(sheet.rowCount, 2);
  assert.equal(sheet.getRow(1).getCell(1).value, "Enquiry ID");
  assert.equal(sheet.getRow(1).getCell(1).font?.bold, true);
  assert.equal(sheet.getRow(2).getCell(1).value, "single-1");
  assert.equal(sheet.getRow(2).getCell(4).value, "+1 555 0100");
  assert.equal(sheet.getRow(2).getCell(7).value, maliciousText);
  assert.equal(sheet.getRow(2).getCell(7).type, ExcelJS.ValueType.String);
  assert.equal(sheet.getRow(2).getCell(7).formula, undefined);
  assert.equal(sheet.getRow(2).getCell(8).value.toISOString(), "2026-11-02T10:15:00.000Z");
  assert.match(String(sheet.getRow(2).getCell(12).value), /"city":"London"/);
  assert.match(sheet.getRow(2).getCell(8).numFmt, /dd mmm yyyy/);
});

test("exports a single record workbook and uses safe date-based filenames", async () => {
  const record = makeEnquiry("record-7");
  const bytes = await workbookBytes((async function* () { yield record; })());
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(bytes);
  assert.equal(workbook.getWorksheet("Enquiries")?.rowCount, 2);
  assert.equal(enquiryExportFilename("record-7"), "enquiry-record-7.xlsx");
  assert.equal(enquiryExportFilename("../../record"), "enquiry-------record.xlsx");
  assert.equal(enquiryExportFilename(undefined, new Date("2026-11-02T23:00:00.000Z")), "astronis-enquiries-2026-11-02.xlsx");
});

test("exports a saved follow-up date as a date cell", async () => {
  const bytes = await workbookBytes((async function* () {
    yield makeEnquiry("follow-up", { status: "Follow-up", follow_up_date: "2026-11-18" });
  })());
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(bytes);
  const cell = workbook.getWorksheet("Enquiries")?.getRow(2).getCell(14);
  assert.equal(cell?.value?.toISOString(), "2026-11-18T00:00:00.000Z");
  assert.match(cell?.numFmt || "", /dd mmm yyyy/);
});

test("applies admin enquiry label formatting", () => {
  assert.equal(displayEnquiryLabel("New Website Enquiry"), "Enquiry");
  assert.equal(displayEnquiryLabel("New Website Enquiry | Home"), "Enquiry | Home");
  assert.equal(displayEnquiryLabel(""), "Enquiry");
  assert.equal(displayEnquiryLabel("Website Enquiry | Home"), "Website Enquiry | Home");
});

test("validates follow-up status options and calendar dates", () => {
  assert.deepEqual(enquiryStatuses, ["New", "In Progress", "Responded", "Closed", "Interested", "Not Interested", "Follow-up"]);
  assert.equal(isValidFollowUpDate("2028-02-29"), true);
  assert.equal(isValidFollowUpDate("2027-02-29"), false);
  assert.equal(isValidFollowUpDate("2026-2-03"), false);
});

test("identifies database migrations required for enquiry status updates", () => {
  const message = "The enquiry database needs the latest migration before this status can be saved.";
  assert.equal(enquiryUpdateSchemaMessage("PGRST204", "follow_up_date column missing", "Responded"), message);
  assert.equal(enquiryUpdateSchemaMessage("23514", "status check constraint failed", "Interested"), message);
  assert.equal(enquiryUpdateSchemaMessage("23514", "status check constraint failed", "Responded"), null);
});

test("matches received dates and export filters using the same UTC day boundaries", () => {
  assert.equal(enquiryDateKey("2026-10-28T23:59:59.999Z"), "2026-10-28");
  assert.equal(enquiryFilterDateValue({ date: "2026-10-28T23:59:59.999Z", followUpDate: "2026-11-21" }, "Follow-up"), "2026-11-21");
  assert.equal(enquiryFilterDateValue({ date: "2026-10-28T23:59:59.999Z", followUpDate: "2026-11-21" }, "All statuses"), "2026-10-28");
  assert.equal(enquiryFilterDateValue({ date: "2026-10-28T23:59:59.999Z" }, "Follow-up"), "");
  assert.equal(enquiryDateKey("invalid"), "");
  assert.deepEqual(enquiryUtcDayRange("2028-02-29"), {
    start: "2028-02-29T00:00:00.000Z",
    end: "2028-03-01T00:00:00.000Z",
  });
  assert.equal(enquiryUtcDayRange("2027-02-29"), null);
});

test("creates an editable email reply acknowledging the enquiry", () => {
  const reply = createEnquiryReplyTemplate("Ankit Yadav", "Website enquiry");
  assert.equal(reply.subject, "Regarding your enquiry: Website enquiry");
  assert.match(reply.message, /Dear Ankit Yadav,/);
  assert.match(reply.message, /We have received your enquiry regarding "Website enquiry"/);
});

test("filters, prints and exports enquiry views and protects admin APIs", async () => {
  const [management, exportRoute, detailRoute, emailRoute, migration] = await Promise.all([
    readFile(new URL("../src/app/admin/_components/admin-engagement.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/enquiries/export/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/enquiries/[id]/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/enquiries/[id]/email/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../supabase/migrations/202611200001_enquiry_followup_statuses.sql", import.meta.url), "utf8"),
  ]);
  const styles = await readFile(new URL("../src/app/admin/_components/admin.module.css", import.meta.url), "utf8");
  const enquiryManagement = management.slice(
    management.indexOf("export function EnquiriesManagement()"),
    management.indexOf("export function TestimonialsManagement()"),
  );
  assert.doesNotMatch(management, /Add New Enquiry/);
  assert.doesNotMatch(management, /Review and organise website enquiries in one place/);
  assert.match(management, /const enquiryPageSize = 50/);
  assert.match(management, /Send email to \$\{enquiry\.name\}/);
  assert.match(management, /\/email`/);
  assert.match(management, /Send Email/);
  assert.doesNotMatch(management, /mailto:\$\{enquiry\.email\}/);
  assert.match(management, /getWhatsAppUrl\(enquiry\.phone\)/);
  assert.match(enquiryManagement, /columns=\{\["Name", "Email", "Subject", "Received Date", "Status", "Actions"\]\}/);
  assert.match(enquiryManagement, /admin-enquiry-actions/);
  assert.doesNotMatch(enquiryManagement, />Dismiss</);
  assert.match(management, /Download Excel/);
  assert.match(management, /window\.print\(\)/);
  assert.match(enquiryManagement, /pressed=\{selectedStatusCard === status \|\| \(selectedStatusCard === null && statusFilter === status\)\}/);
  assert.match(enquiryManagement, /selectedStatusCard !== null/);
  assert.match(enquiryManagement, /Show all cards/);
  assert.match(enquiryManagement, /cardsCollapsed \? "Show cards" : "Hide cards"/);
  assert.match(enquiryManagement, /onClick=\{\(\) => selectStatusCard\(status\)\}/);
  assert.match(enquiryManagement, /window\.setTimeout\([\s\S]*?3000/);
  assert.match(management, /Enquiry status saved as \$\{status\}\./);
  assert.match(management, /statusFilter === "All statuses" \|\| enquiry\.status === statusFilter/);
  assert.match(management, /scope: "filtered"/);
  assert.match(management, /export\?id=/);
  assert.doesNotMatch(management, /openPreview|createPortal|onMouseEnter=\{\(event\) => openPreview/);
  assert.match(management, /View details for \$\{enquiry\.name\}/);
  assert.match(management, /Download Excel for \$\{enquiry\.name\}/);
  assert.match(management, /Delete enquiry from \$\{enquiry\.name\}/);
  assert.match(management, /Follow-up Date/);
  assert.match(management, /Save Follow-up Date/);
  assert.match(management, /Page Submitted/);
  assert.match(management, /Permanently delete the enquiry/);
  assert.match(management, /method: "DELETE"/);
  assert.match(styles, /\.root :global\(\.admin-engagement-actions\)[\s\S]*?flex-wrap: nowrap;[\s\S]*?gap: 8px;/);
  assert.match(styles, /@media print/);
  for (const route of [exportRoute, detailRoute, emailRoute]) {
    const auth = route.indexOf("await getAuthorizedAdmin()");
    const databaseQuery = route.indexOf('.from("cms_enquiries")');
    assert.ok(auth >= 0);
    assert.ok(databaseQuery > auth);
    assert.match(route, /if \(!auth\.user \|\| !auth\.supabase\)/);
  }
  assert.match(exportRoute, /paginateEnquiries/);
  assert.match(exportRoute, /matchesEnquirySearch/);
  assert.match(exportRoute, /enquiryStatuses/);
  assert.match(exportRoute, /\.range\(offset, offset \+ pageSize - 1\)/);
  assert.match(exportRoute, /\.eq\("status", status\)/);
  assert.match(exportRoute, /enquiryUtcDayRange\(date\)/);
  assert.match(exportRoute, /\.gte\("created_at", dateRange\.start\)\.lt\("created_at", dateRange\.end\)/);
  assert.match(exportRoute, /status === "Follow-up"[\s\S]*?\.eq\("follow_up_date", date\)/);
  const deleteRoute = detailRoute.slice(detailRoute.indexOf("export async function DELETE"));
  assert.match(deleteRoute, /await getAuthorizedAdmin\(\)/);
  assert.match(deleteRoute, /\.from\("cms_enquiries"\)\s*\.delete\(\)/);
  assert.match(deleteRoute, /if \(!auth\.user \|\| !auth\.supabase\)/);
  assert.match(detailRoute, /isValidFollowUpDate/);
  assert.match(detailRoute, /follow_up_date/);
  assert.match(emailRoute, /sendMailtrapTransactionalEmail\(enquiry\.email, subject, message\)/);
  assert.match(emailRoute, /\.select\("id, name, email"\)/);
  assert.match(emailRoute, /isSameOriginRequest/);
  assert.doesNotMatch(emailRoute, /body\.to|body\.email/);
  assert.match(migration, /follow_up_date date/);
  assert.match(migration, /'Interested', 'Not Interested', 'Follow-up'/);
});

test("matches the existing enquiry search fields without including unrelated fields", () => {
  const record = makeEnquiry("search", { message: "hidden message text" });
  assert.equal(matchesEnquirySearch(record, "contact-search"), true);
  assert.equal(matchesEnquirySearch(record, "Corporate advisory"), true);
  assert.equal(matchesEnquirySearch(record, "hidden message"), false);
});
