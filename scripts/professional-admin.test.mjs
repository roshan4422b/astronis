import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  categories,
  getProfessionalExpertiseCategory,
  professionalExpertiseOptions,
} from "../src/data/professional-application-taxonomy.ts";

test("professional expertise options contain only the five approved categories", () => {
  assert.deepEqual(
    categories.map(({ label, code }) => `${label} (${code})`),
    [
      "Corporate Advisory (CA)",
      "Regulatory Advisory (RA)",
      "Legal Advisory (LA)",
      "Business Advisory (BA)",
      "Global Network & International (GN)",
    ],
  );
  assert.deepEqual(professionalExpertiseOptions, [
    "Corporate Advisory (CA)",
    "Regulatory Advisory (RA)",
    "Legal Advisory (LA)",
    "Business Advisory (BA)",
    "Global Network & International (GN)",
  ]);
});

test("maps long legacy expertise descriptions to one approved category", () => {
  assert.equal(getProfessionalExpertiseCategory("Legal strategy, Regulatory, Business Advisory, Litigation-Corporate"), "Business Advisory (BA)");
  assert.equal(getProfessionalExpertiseCategory("Litigation – Civil Law, Family law", "Associate"), "Legal Advisory (LA)");
  assert.equal(getProfessionalExpertiseCategory("Regulatory, Licensing, IPR Advisory", "Regulatory / Licensing"), "Regulatory Advisory (RA)");
  assert.equal(getProfessionalExpertiseCategory("Licensing Advisory, Business acquisition", "Business Advisory"), "Business Advisory (BA)");
  assert.equal(getProfessionalExpertiseCategory(""), "");
});

test("professional editor and category filter share the approved expertise options", async () => {
  const source = await readFile(new URL("../src/app/admin/_components/admin-content-management.tsx", import.meta.url), "utf8");
  assert.match(source, /const expertiseOptions = professionalExpertiseOptions/);
  assert.match(source, /section === "professionals"\s*\?\s*expertiseOptions/);
  assert.match(source, /<select value=\{form\.expertise\}/);
  assert.match(source, /getProfessionalExpertiseCategory\(record\.expertise, record\.designation\) === categoryFilter/);
  assert.match(source, /getProfessionalExpertiseCategory\(record\.expertise, record\.designation\) \|\| "Not specified"/);
});

test("professional names open accessible profile details on hover, focus, and click", async () => {
  const source = await readFile(new URL("../src/app/admin/_components/admin-content-management.tsx", import.meta.url), "utf8");
  assert.match(source, /function ProfessionalNamePreview/);
  assert.match(source, /onMouseEnter=\{\(event\) => showPreview/);
  assert.match(source, /onFocus=\{\(event\) => showPreview/);
  assert.match(source, /onClick=\{\(event\) => showPreview/);
  assert.match(source, /createPortal\(/);
  assert.match(source, /record\.description \|\| record\.content/);
  assert.match(source, /Professional enrolment/);
});
