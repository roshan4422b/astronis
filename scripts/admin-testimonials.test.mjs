import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ExcelJS from "exceljs";

const {
  mapTestimonialExportRecord,
  matchesTestimonialExportFilters,
  testimonialExportFilename,
  writeTestimonialWorkbook,
} = await import("../src/lib/admin/testimonial-export.ts");
const { getWhatsAppUrl } = await import("../src/lib/admin/whatsapp.ts");

test("builds WhatsApp links only for valid international numbers", () => {
  assert.equal(getWhatsAppUrl("+91 (98765) 43210"), "https://api.whatsapp.com/send?phone=919876543210");
  assert.equal(getWhatsAppUrl("0044 20 7946 0958"), "https://api.whatsapp.com/send?phone=442079460958");
  assert.equal(getWhatsAppUrl("91 98765 43210"), "https://api.whatsapp.com/send?phone=919876543210");
  assert.equal(
    getWhatsAppUrl("+91 98765 43210", "Hello there"),
    "https://api.whatsapp.com/send?phone=919876543210&text=Hello+there",
  );
  assert.equal(getWhatsAppUrl("9876543210"), "");
  assert.equal(getWhatsAppUrl("+1 23"), "");
  assert.equal(getWhatsAppUrl("+91 abc 9876543210"), "");
});

test("filters testimonial statuses and other active filters", () => {
  const pending = mapTestimonialExportRecord({
    id: "pending-1",
    status: "pending",
    created_at: "2026-11-20T10:00:00.000Z",
    data: {
      name: "Example Contributor",
      email: "example@example.test",
      company: "Example Company",
      text: "A useful testimonial",
      format: "video",
      videoPath: "testimonials/video.mp4",
      consent: true,
      identityPublicationConsent: true,
    },
  });
  const published = mapTestimonialExportRecord({
    id: "published-1",
    status: "published",
    created_at: "2026-11-19T10:00:00.000Z",
    data: { name: "Another Contributor", text: "Another useful testimonial" },
  });

  assert.equal(pending.approvalStatus, "Pending");
  assert.equal(pending.consentStatus, "Granted");
  assert.equal(matchesTestimonialExportFilters(pending, { status: "Pending", type: "Video testimonials", consent: "Granted" }), true);
  assert.equal(matchesTestimonialExportFilters(pending, { status: "Published" }), false);
  assert.equal(published.approvalStatus, "Approved");
  assert.equal(matchesTestimonialExportFilters(published, { status: "Published", search: "another contributor" }), true);
});

test("writes a styled workbook with testimonial status and safely stored text", async () => {
  const testimonial = mapTestimonialExportRecord({
    id: "record-1",
    status: "rejected",
    created_at: "2026-11-20T10:00:00.000Z",
    data: {
      name: "=HYPERLINK(\"https://example.test\")",
      text: "A testimonial",
      moderationReason: "Needs review",
    },
  });
  const workbookBytes = await writeTestimonialWorkbook([testimonial]);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(workbookBytes));
  const sheet = workbook.getWorksheet("Testimonials");
  assert.ok(sheet);
  assert.equal(sheet.getRow(1).getCell(1).value, "Testimonial ID");
  assert.equal(sheet.getRow(1).getCell(1).font?.bold, true);
  assert.equal(sheet.getRow(2).getCell(2).value, "'=HYPERLINK(\"https://example.test\")");
  assert.equal(sheet.getRow(2).getCell(12).value, "Rejected");
  assert.equal(sheet.getRow(2).getCell(16).value, "Needs review");
  assert.equal(testimonialExportFilename(new Date("2026-11-20T23:00:00.000Z")), "astronis-testimonials-2026-11-20.xlsx");
});

test("wires testimonial cards, exports, print filters, actions, and 50-row pagination", async () => {
  const [component, route, emailRoute, adminDataRoute] = await Promise.all([
    readFile(new URL("../src/app/admin/_components/admin-engagement.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/testimonials/export/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/testimonials/[id]/email/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/data/route.ts", import.meta.url), "utf8"),
  ]);
  const testimonials = component.slice(
    component.indexOf("export function TestimonialsManagement()"),
  );
  assert.doesNotMatch(testimonials, /Review and manage testimonial submissions before they are considered for publication/);
  assert.match(component, /const testimonialPageSize = 50/);
  assert.match(testimonials, /displayedTestimonials = printing \? filtered : filtered\.slice/);
  assert.match(testimonials, /selectedApprovalCard !== null/);
  assert.match(testimonials, /Show all cards/);
  assert.match(testimonials, /cardsCollapsed \? "Show cards" : "Hide cards"/);
  const testimonialHeadingActions = testimonials.slice(
    testimonials.indexOf('title="Testimonials"'),
    testimonials.indexOf('id="admin-testimonial-status-cards"'),
  );
  assert.match(testimonialHeadingActions, /Download Excel[\s\S]*Print[\s\S]*Hide cards/);
  assert.doesNotMatch(testimonials, /className="admin-testimonial-card-controls"/);
  assert.match(testimonials, /testimonialApprovalCardFilters\.map\(\(filter\) =>/);
  assert.match(testimonials, /onClick=\{\(\) => selectApprovalCard\(filter\)\}/);
  assert.match(testimonials, /Download Excel/);
  assert.match(testimonials, /setPrinting\(true\)/);
  assert.match(testimonials, /scope: "filtered"/);
  assert.match(testimonials, /Send email to \$\{testimonial\.name\}/);
  assert.match(testimonials, /Contact \$\{testimonial\.name\} on WhatsApp/);
  assert.match(testimonials, /onClick=\{\(\) => setEmailTestimonialId\(testimonial\.id\)\}/);
  assert.match(testimonials, /WhatsApp unavailable for \$\{testimonial\.name\}/);
  assert.doesNotMatch(testimonials, /openTestimonialContactEditor/);
  assert.match(testimonials, /getWhatsAppUrl\(\s*testimonial\.phone,/);
  assert.match(component, /recipientEmailEditable/);
  assert.match(component, /body: formData/);
  assert.match(testimonials, /setSelectedId\(saved\.id\)/);
  assert.match(testimonials, /item\.id === selected\.id \|\| item\.id === saved\.id/);
  assert.match(adminDataRoute, /!isValidOptionalEmail\(sourceData\.email\)/);
  assert.match(adminDataRoute, /!isValidOptionalEmail\(data\.email\)/);
  assert.match(testimonials, /TestimonialEmailDialog/);
  assert.match(component, /Open in email app/);
  assert.match(testimonials, /\/api\/admin\/testimonials\/\$\{encodeURIComponent\(id\)\}\/email/);
  assert.match(route, /await getAuthorizedAdmin\(\)/);
  assert.match(route, /matchesTestimonialExportFilters/);
  assert.match(route, /\.range\(offset, offset \+ pageSize - 1\)/);
  assert.match(route, /Content-Disposition/);
  assert.match(emailRoute, /isSameOriginRequest\(request\)/);
  assert.match(emailRoute, /getSourceContentRecords\("testimonials"\)/);
  assert.match(emailRoute, /recipientEmailValue/);
  assert.match(emailRoute, /\.eq\("collection", "testimonials"\)/);
  assert.match(emailRoute, /parseAdminEmailAttachments\(form\)/);
  assert.match(emailRoute, /sendMailtrapTransactionalEmail\(email, subject, message, attachmentResult\.attachments\)/);
});
