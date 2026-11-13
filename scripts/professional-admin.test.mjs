import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  categories,
  engagementOptions,
  engagementTypes,
  getProfessionalExpertiseCategory,
  hierarchiesFor,
  positionsFor,
  professionalExpertiseOptions,
} from "../src/data/professional-application-taxonomy.ts";

test("Corporate Advisory hierarchy and applied positions match the approved pathway", async () => {
  const expected = [
    ["AG-01", "Global Leadership", ["Partner & Global Head - Corporate Advisory"]],
    ["AG-03", "Practice Leadership", ["Partner / Practice Head - Corporate Advisory"]],
    ["AG-04", "Director", ["Director - Corporate Advisory", "Regional Director - Corporate Advisory"]],
    ["AG-05", "Principal", ["Principal Consultant - Corporate Advisory"]],
    ["AG-06", "Senior Advisory", ["Senior Advisor - Corporate Advisory"]],
    ["AG-07", "Management", ["Manager - Corporate Advisory"]],
    ["AG-08", "Professional / Specialist", [
      "Corporate Consultant - M&A and Structuring",
      "Corporate Restructuring Advisor",
      "Corporate Governance Advisor",
      "Startup & Emerging Business Advisor",
      "FDI & Cross-Border Transaction Advisor",
      "Corporate Due Diligence Consultant",
    ]],
    ["AG-09", "Associate Track", ["Senior Associate - Corporate Advisory", "Associate - Corporate Advisory"]],
    ["AG-10", "Entry / Analyst Track", ["Analyst - Corporate Advisory"]],
  ];

  assert.deepEqual(
    hierarchiesFor("CA").map(({ code, label }) => [code, label]),
    expected.map(([code, label]) => [code, label]),
  );
  assert.deepEqual(
    expected.map(([code]) => positionsFor("CA", code).map(({ label }) => label)),
    expected.map(([, , positionLabels]) => positionLabels),
  );

  const form = await readFile(new URL("../src/app/professionals/submit-profile/professional-application-form.tsx", import.meta.url), "utf8");
  assert.match(form, /\{item\.label\} \(\{item\.code\}\)/);
  assert.match(form, /<option key=\{item\.value\} value=\{item\.value\}>\{item\.label\} \(\{item\.code\}\)/);
  assert.match(form, /roleOptions\.map\(\(item\) => <option key=\{item\.code\} value=\{item\.code\}>\{positionDisplayLabel\(item, marketCountry\?\.label\)\}/);
});

test("Regulatory Advisory hierarchy and applied positions match the approved pathway", () => {
  const expected = [
    ["AG-01", "Global Leadership", ["Partner & Global Head - Regulatory Advisory"]],
    ["AG-03", "Practice Leadership", ["Partner - Regulatory & Compliance"]],
    ["AG-04", "Director", ["Director - Regulatory Advisory"]],
    ["AG-05", "Principal", ["Principal - Regulatory Affairs"]],
    ["AG-06", "Senior Advisory", ["Senior Regulatory Advisor"]],
    ["AG-07", "Management", ["Manager - Regulatory Compliance"]],
    ["AG-08", "Professional / Specialist", [
      "Regulatory Affairs Consultant",
      "Regulatory Compliance Consultant",
      "Banking & NBFC Regulatory Advisor",
      "FEMA & Foreign Exchange Advisor",
      "FinTech Regulatory Advisor",
      "SEBI & Capital Markets Regulatory Consultant",
      "RBI Regulatory Consultant",
      "GST & Indirect Tax Consultant",
      "MSME Regulatory Advisor",
      "Licensing & Registration Consultant",
      "FSSAI & Consumer Regulatory Consultant",
      "ESG & Sustainability Advisor",
      "Risk & Compliance Advisor",
    ]],
    ["AG-09", "Associate Track", ["Senior Associate - Regulatory Advisory", "Associate - Regulatory Advisory"]],
    ["AG-10", "Entry / Analyst Track", ["Regulatory Analyst"]],
  ];

  assert.deepEqual(
    hierarchiesFor("RA").map(({ code, label }) => [code, label]),
    expected.map(([code, label]) => [code, label]),
  );
  assert.deepEqual(
    expected.map(([code]) => positionsFor("RA", code).map(({ label }) => label)),
    expected.map(([, , positionLabels]) => positionLabels),
  );
});

test("Legal Advisory separates the AG-08 professional and counsel tracks", async () => {
  const expected = [
    ["AG-01", "Global Leadership", ["Partner & Global Head - Legal Advisory"]],
    ["AG-02", "Senior Leadership", ["Senior Partner", "Executive Partner - Legal"]],
    ["AG-03", "Practice Leadership", [
      "Partner - Legal Advisory",
      "Partner - Litigation & Dispute Resolution",
      "Partner - Corporate & Commercial Law",
    ]],
    ["AG-04", "Director", ["Director - Legal Advisory"]],
    ["AG-05", "Principal", ["Principal Attorney"]],
    ["AG-06", "Senior Advisory", ["Senior Legal Advisor"]],
    ["AG-08", "Professional / Specialist", ["Legal Advisor - Legal Metrology & FSSAI"]],
    ["AG-08", "Counsel / Specialist", [
      "Counsel - Arbitration & ADR",
      "Counsel - Corporate & Commercial Litigation",
      "Counsel - Banking & Finance",
      "Counsel - Insolvency & Restructuring",
      "Counsel - Intellectual Property",
      "Counsel - Employment & Labour",
      "Counsel - Real Estate & RERA",
      "Counsel - Tax & GST Litigation",
      "Counsel - White Collar & Investigations",
      "Counsel - Competition & Regulatory Law",
      "Counsel - International & Cross-Border Matters",
    ]],
    ["AG-09P", "Associate Track - Principal", ["Principal Associate"]],
    ["AG-09S", "Associate Track - Senior", ["Senior Associate"]],
    ["AG-09A", "Associate Track", ["Associate"]],
    ["AG-10", "Entry / Analyst Track", ["Junior Associate"]],
  ];
  const hierarchyOptions = hierarchiesFor("LA");

  assert.deepEqual(
    hierarchyOptions.map(({ code, label }) => [code, label]),
    expected.map(([code, label]) => [code, label]),
  );
  assert.equal(new Set(hierarchyOptions.map(({ value }) => value)).size, hierarchyOptions.length);
  assert.deepEqual(
    expected.map(([code, label]) => {
      const hierarchy = hierarchyOptions.find((option) => option.code === code && option.label === label);
      assert.ok(hierarchy, `Missing Legal Advisory hierarchy ${code} ${label}`);
      return positionsFor("LA", hierarchy.value).map(({ label: positionLabel }) => positionLabel);
    }),
    expected.map(([, , positionLabels]) => positionLabels),
  );

  const route = await readFile(new URL("../src/app/api/professional-application/route.ts", import.meta.url), "utf8");
  assert.match(route, /item\.code === hierarchyCode && item\.label === hierarchyData\?\.label/);
  assert.match(route, /positionsFor\(categoryCode, hierarchy\.value\)/);
});

test("Business Advisory hierarchy and applied positions match the approved pathway", () => {
  const expected = [
    ["AG-01", "Global Leadership", ["Partner & Global Head - Business Advisory"]],
    ["AG-03", "Practice Leadership", ["Partner - Business Advisory"]],
    ["AG-04", "Director", ["Director - Business Advisory"]],
    ["AG-05", "Principal", ["Principal - Strategy & Business Advisory"]],
    ["AG-06", "Senior Advisory", ["Senior Business Advisor"]],
    ["AG-07", "Management", ["Manager - Business Advisory"]],
    ["AG-08", "Professional / Specialist", [
      "Business Strategy Consultant",
      "Management Consultant",
      "Business Transformation Consultant",
      "International Business Advisor",
      "Investment & Transaction Consultant",
      "MSME, Startup & Growth Advisor",
      "Financial & Business Restructuring Consultant",
      "Risk Advisory Consultant",
      "Forensic & Investigation Consultant",
      "HR & Organisation Consultant",
      "Technology & Digital Transformation Consultant",
      "ESG & Sustainability Consultant",
    ]],
    ["AG-09", "Associate Track", ["Senior Associate - Business Advisory", "Associate - Business Advisory"]],
    ["AG-10", "Entry / Analyst Track", ["Business Analyst"]],
  ];
  const hierarchyOptions = hierarchiesFor("BA");

  assert.deepEqual(
    hierarchyOptions.map(({ code, label }) => [code, label]),
    expected.map(([code, label]) => [code, label]),
  );
  assert.deepEqual(
    expected.map(([code, label]) => {
      const hierarchy = hierarchyOptions.find((option) => option.code === code && option.label === label);
      assert.ok(hierarchy, `Missing Business Advisory hierarchy ${code} ${label}`);
      return positionsFor("BA", hierarchy.value).map(({ label: positionLabel }) => positionLabel);
    }),
    expected.map(([, , positionLabels]) => positionLabels),
  );
});

test("Global Network hierarchy separates GN-02 director tracks and preserves country-specific roles", () => {
  const expected = [
    ["GN-01", "Global Network Leadership", ["Head - Global Markets & Relationships"]],
    ["GN-02", "Director", ["Director - International Business", "Director - Cross-Border Advisory"]],
    ["GN-02", "Regional Leadership", [
      "Regional Director - Asia Pacific",
      "Regional Director - Middle East & Africa",
      "Regional Director - Europe",
      "Regional Director - Americas",
    ]],
    ["GN-03", "Country Leadership", ["Country Head - [Country]"]],
    ["GN-04", "International Advisory", ["International Business Advisor", "Cross-Border Advisor"]],
    ["GN-05", "Independent Network", ["Independent Country Advisor - Professional", "International Associate - [Country]"]],
  ];
  const hierarchyOptions = hierarchiesFor("GN");

  assert.deepEqual(
    hierarchyOptions.map(({ code, label }) => [code, label]),
    expected.map(([code, label]) => [code, label]),
  );
  assert.equal(new Set(hierarchyOptions.map(({ value }) => value)).size, hierarchyOptions.length);
  assert.deepEqual(
    expected.map(([code, label]) => {
      const hierarchy = hierarchyOptions.find((option) => option.code === code && option.label === label);
      assert.ok(hierarchy, `Missing Global Network hierarchy ${code} ${label}`);
      return positionsFor("GN", hierarchy.value).map(({ label: positionLabel }) => positionLabel);
    }),
    expected.map(([, , positionLabels]) => positionLabels),
  );
  assert.deepEqual(
    positionsFor("GN", hierarchyOptions.find(({ code }) => code === "GN-03").value).map(({ dynamicCountry }) => dynamicCountry),
    [true],
  );
  assert.equal(
    positionsFor("GN", hierarchyOptions.find(({ code, label }) => code === "GN-05" && label === "Independent Network").value)
      .find(({ label }) => label === "International Associate - [Country]")?.dynamicCountry,
    true,
  );
});

test("engagement options expose ET-01 through ET-07 and gate ET-08 on recruitment", async () => {
  assert.deepEqual(engagementTypes.map(({ code, label }) => [code, label]), [
    ["ET-01", "Full-Time Professional"],
    ["ET-02", "Part-Time Professional"],
    ["ET-03", "Retainer / Consultant"],
    ["ET-04", "Independent Consultant"],
    ["ET-05", "International Associate"],
    ["ET-06", "Independent Country Advisor"],
    ["ET-07", "Of Counsel / Specialist Counsel - where applicable"],
    ["ET-08", "Intern / Trainee - when recruitment is opened"],
  ]);
  const codesFor = (options) => options.map(({ code }) => code);

  assert.deepEqual(codesFor(engagementOptions()), ["ET-01", "ET-02", "ET-03", "ET-04", "ET-05", "ET-06", "ET-07"]);
  assert.deepEqual(codesFor(engagementOptions(true)), ["ET-01", "ET-02", "ET-03", "ET-04", "ET-05", "ET-06", "ET-07", "ET-08"]);

  const form = await readFile(new URL("../src/app/professionals/submit-profile/professional-application-form.tsx", import.meta.url), "utf8");
  assert.match(form, /\{item\.code\} · \{item\.label\}/);
  assert.match(form, /ET-01 through ET-07 are available for all pathways/);
  const route = await readFile(new URL("../src/app/api/professional-application/route.ts", import.meta.url), "utf8");
  assert.match(route, /engagementOptions\(process\.env\.PROFESSIONAL_INTERN_RECRUITMENT_OPEN === "true"\)/);
});

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
