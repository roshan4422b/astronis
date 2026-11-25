import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { getEnquiryTrend, getPublishedInsightCategories } from "../src/app/admin/_components/admin-dashboard-analytics.ts";

test("dashboard analytics count enquiries in the last six calendar months", () => {
  const trend = getEnquiryTrend([
    { date: "2026-05-31T23:59:59.000Z" },
    { date: "2026-06-01T00:00:00.000Z" },
    { date: "2026-06-18T10:00:00.000Z" },
    { date: "2026-11-25T10:00:00.000Z" },
    { date: "2026-12-01T00:00:00.000Z" },
    { date: "invalid date" },
  ], new Date("2026-11-25T12:00:00.000Z"));

  assert.deepEqual(trend.map(({ label, year, count }) => ({ label, year, count })), [
    { label: "Jun", year: 2026, count: 2 },
    { label: "Jul", year: 2026, count: 0 },
    { label: "Aug", year: 2026, count: 0 },
    { label: "Sep", year: 2026, count: 0 },
    { label: "Oct", year: 2026, count: 0 },
    { label: "Nov", year: 2026, count: 1 },
  ]);
});

test("published insight categories exclude drafts and sort by live record count", () => {
  assert.deepEqual(getPublishedInsightCategories([
    { category: "Legal Updates", status: "Published" },
    { category: "Legal Updates", status: "Published" },
    { category: "Articles & Resources", status: "Published" },
    { category: "Legal Updates", status: "Draft" },
    { category: " ", status: "Published" },
  ]), [
    { category: "Legal Updates", count: 2 },
    { category: "Articles & Resources", count: 1 },
    { category: "Uncategorised", count: 1 },
  ]);
});

test("dashboard metric cards open only their selected management section", async () => {
  const [workspace, ui] = await Promise.all([
    readFile(new URL("../src/app/admin/_components/admin-workspace.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/admin/_components/admin-ui.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(workspace, /selectedSection === "enquiries"\s*\?\s*<EnquiriesManagement \/>/);
  assert.match(workspace, /selectedSection === "testimonials"\s*\?\s*<TestimonialsManagement \/>/);
  assert.match(workspace, /<CollectionPage section="insights"/);
  assert.match(workspace, /Back to dashboard/);
  assert.doesNotMatch(workspace, /Recent enquiries|Recent testimonials/);
  assert.match(ui, /admin-stat-card-action/);
  assert.match(workspace, /onClick=\{\(\) => setSelectedSection\("enquiries"\)\}/);
  assert.match(workspace, /onClick=\{\(\) => setSelectedSection\("testimonials"\)\}/);
  assert.match(workspace, /onClick=\{\(\) => setSelectedSection\("insights"\)\}/);
});

test("admin data loading reports API status instead of exposing JSON parser errors", async () => {
  const [state, route] = await Promise.all([
    readFile(new URL("../src/app/admin/_components/admin-state.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/data/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(state, /readAdminApiResponse\(contentResponse, "\/api\/admin\/data\?collection=all"\)/);
  assert.match(state, /readAdminApiResponse\(enquiryResponse, "\/api\/admin\/data\?collection=enquiries"\)/);
  assert.match(state, /const pathname = usePathname\(\);[\s\S]*?if \(pathname === "\/admin\/login"\) return;/);
  assert.match(state, /router\.replace\("\/admin\/login"\)/);
  assert.match(state, /returned a non-JSON response \(HTTP \$\{response\.status\}, \$\{contentType\}\)/);
  assert.match(state, /Redirected to \$\{redirectedTo\}/);
  assert.match(route, /export async function GET\(request: Request\) \{\s*try \{/);
  assert.match(route, /Could not load CMS data\. Check the local server logs for details\./);
});

test("admin font declarations are reduced consistently with a legible minimum", async () => {
  const paths = [
    "../src/app/admin/_components/admin.module.css",
    "../src/app/admin/_components/admin-settings.module.css",
    "../src/app/admin/_components/seo-management.module.css",
  ];
  const stylesheets = await Promise.all(paths.map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const declarations = stylesheets.flatMap((css) => [...css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px;/g)].map((match) => Number(match[1])));
  assert.ok(declarations.length > 150);
  assert.ok(declarations.includes(12));
  assert.ok(declarations.every((size) => size >= 8));
});

test("published CMS events use the existing insights collection and appear on the public hub", async () => {
  const [adminData, publicPage, publicHub, dataApi] = await Promise.all([
    readFile(new URL("../src/app/admin/admin-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/insights-events/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/insights-events/insights-events.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/data/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(adminData, /"Events"/);
  assert.match(publicPage, /getPublishedContent\("insights"\)/);
  assert.match(publicPage, /record\.data\.category === "Events"/);
  assert.match(publicHub, /title="Events"/);
  assert.match(publicHub, /href: `\/insights\/\$\{event\.slug\}`/);
  assert.match(dataApi, /if \(collection === "insights"\) revalidatePath\("\/insights-events"\)/);
});
