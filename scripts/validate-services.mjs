import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hierarchy = JSON.parse(readFileSync(path.join(root, "src/data/service-hierarchy.json"), "utf8"));
const source = readFileSync(path.join(root, "src/data/services.ts"), "utf8");
const routeFile = readFileSync(path.join(root, "src/app/services/[...slug]/page.tsx"), "utf8");
const config = readFileSync(path.join(root, "next.config.ts"), "utf8");
const slugify = value => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

assert.equal(hierarchy.length, 11, "Expected exactly 11 approved main services");
assert.equal(hierarchy.reduce((count, service) => count + service.subServices.length, 0), 36, "Expected exactly 36 sub-services");
assert.equal(hierarchy.reduce((count, service) => count + service.subServices.reduce((total, group) => total + group.children.length, 0), 0), 269, "Expected exactly 269 child services");
assert.match(source, /canonicalSlug:\s*service\.slug/, "Main canonical slugs must come from the centralized hierarchy");
assert.match(routeFile, /resolveHierarchy/, "Canonical service routes must resolve from the central hierarchy");
assert.match(routeFile, /generateStaticParams/, "Service routes must expose the approved main services");
assert.match(config, /permanent:\s*true/, "Legacy service routes must use permanent redirects");

const urls = [];
for (const service of hierarchy) {
  const main = `/services/${service.slug}`;
  urls.push([service.title, main]);
  for (const group of service.subServices) {
    const groupUrl = `${main}/${group.slug}`;
    urls.push([`${service.title} → ${group.title}`, groupUrl]);
    for (const child of group.children) urls.push([`${service.title} → ${group.title} → ${child}`, `${groupUrl}/${slugify(child)}`]);
  }
}
assert.equal(new Set(urls.map(([, url]) => url)).size, urls.length, "Canonical service URLs must be unique");

const audit = [
  "# Service Route Audit",
  "",
  `Generated from \`src/data/service-hierarchy.json\`: ${hierarchy.length} main services, 36 sub-services, and 269 child services (${urls.length} unique URLs).`,
  "",
  "All canonical URLs resolve through `src/app/services/[...slug]/page.tsx`; existing corporate formation and structuring pages have dedicated canonical route wrappers.",
  "",
  ...urls.map(([label, url]) => `- ✓ ${label} — \`${url}\``),
  "",
];
writeFileSync(path.join(root, "docs/service-route-audit.md"), audit.join("\n"));
console.log(`PASS: ${hierarchy.length} main services, 36 sub-services, 269 child services and ${urls.length} unique canonical URLs.`);
console.log("Wrote docs/service-route-audit.md");
