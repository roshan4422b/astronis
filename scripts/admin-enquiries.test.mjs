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
const { displayEnquiryLabel, getEnquiryPreviewPosition } = await import("../src/lib/admin/enquiry-display.ts");

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

test("applies admin enquiry label and keeps hover details within the viewport", () => {
  assert.equal(displayEnquiryLabel("New Website Enquiry"), "Enquiry");
  assert.equal(displayEnquiryLabel("New Website Enquiry | Home"), "Enquiry | Home");
  assert.equal(displayEnquiryLabel(""), "Enquiry");
  assert.equal(displayEnquiryLabel("Website Enquiry | Home"), "Website Enquiry | Home");
  assert.deepEqual(
    getEnquiryPreviewPosition(
      { left: 950, top: 740, bottom: 770 },
      { width: 380, height: 360 },
      { width: 1024, height: 768 },
    ),
    { left: 632, top: 372 },
  );
  assert.deepEqual(
    getEnquiryPreviewPosition(
      { left: 0, top: 20, bottom: 45 },
      { width: 380, height: 300 },
      { width: 1024, height: 768 },
    ),
    { left: 12, top: 53 },
  );
});

test("keeps all and filtered exports separate and protects export/detail APIs with admin authorization", async () => {
  const [management, exportRoute, detailRoute] = await Promise.all([
    readFile(new URL("../src/app/admin/_components/admin-engagement.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/enquiries/export/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/enquiries/[id]/route.ts", import.meta.url), "utf8"),
  ]);
  const styles = await readFile(new URL("../src/app/admin/_components/admin.module.css", import.meta.url), "utf8");
  assert.doesNotMatch(management, /Add New Enquiry/);
  assert.match(management, /Download Excel/);
  assert.match(management, /ignoring active filters/);
  assert.match(management, /scope: "filtered"/);
  assert.match(management, /scope=all/);
  assert.match(management, /export\?id=/);
  assert.match(management, /onMouseEnter=/);
  assert.match(management, /onFocus=/);
  assert.match(management, /onClick=\{\(event\) => openPreview/);
  assert.match(management, /createPortal\(/);
  assert.match(management, /Delete enquiry/);
  assert.match(management, /Permanently delete the enquiry/);
  assert.match(management, /method: "DELETE"/);
  assert.match(styles, /\.root :global\(\.admin-engagement-actions\)[\s\S]*?flex-wrap: nowrap;[\s\S]*?gap: 8px;/);
  for (const route of [exportRoute, detailRoute]) {
    const auth = route.indexOf("await getAuthorizedAdmin()");
    const databaseQuery = route.indexOf('.from("cms_enquiries")');
    assert.ok(auth >= 0);
    assert.ok(databaseQuery > auth);
    assert.match(route, /if \(!auth\.user \|\| !auth\.supabase\)/);
  }
  assert.match(exportRoute, /paginateEnquiries/);
  assert.match(exportRoute, /matchesEnquirySearch/);
  assert.match(exportRoute, /\.range\(offset, offset \+ pageSize - 1\)/);
  assert.match(exportRoute, /\.eq\("status", status\)/);
  assert.match(exportRoute, /\.gte\("created_at", start\.toISOString\(\)\)\.lt\("created_at", end\.toISOString\(\)\)/);
  const deleteRoute = detailRoute.slice(detailRoute.indexOf("export async function DELETE"));
  assert.match(deleteRoute, /await getAuthorizedAdmin\(\)/);
  assert.match(deleteRoute, /\.from\("cms_enquiries"\)\s*\.delete\(\)/);
  assert.match(deleteRoute, /if \(!auth\.user \|\| !auth\.supabase\)/);
});

test("matches the existing enquiry search fields without including unrelated fields", () => {
  const record = makeEnquiry("search", { message: "hidden message text" });
  assert.equal(matchesEnquirySearch(record, "contact-search"), true);
  assert.equal(matchesEnquirySearch(record, "Corporate advisory"), true);
  assert.equal(matchesEnquirySearch(record, "hidden message"), false);
});
