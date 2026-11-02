import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

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
