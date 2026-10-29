/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const initialMigration = fs.readFileSync(path.join(root, "supabase/migrations/202610230001_cms.sql"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase/migrations/202610230002_cms_public_pages.sql"), "utf8");
const permissionMigration = fs.readFileSync(path.join(root, "supabase/migrations/202610260001_cms_content_anon_permissions.sql"), "utf8");
const server = fs.readFileSync(path.join(root, "src/lib/supabase/server.ts"), "utf8");
const homeTestimonials = fs.readFileSync(path.join(root, "src/app/home/testimonials.tsx"), "utf8");
const testimonialPage = fs.readFileSync(path.join(root, "src/app/testimonials/page.tsx"), "utf8");
const testimonialForm = fs.readFileSync(path.join(root, "src/app/testimonials/testimonial-form.tsx"), "utf8");
const testimonialRoute = fs.readFileSync(path.join(root, "src/app/api/testimonials/route.ts"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "src/app/sitemap.ts"), "utf8");

function functionSql(name) {
  const start = migration.indexOf(`create or replace function public.${name}`);
  assert.notEqual(start, -1, `Missing function ${name}`);
  const end = migration.indexOf("$$;", start);
  assert.notEqual(end, -1, `Unterminated function ${name}`);
  return migration.slice(start, end + 3);
}

function projectedKeys(sql, branch) {
  const match = sql.match(branch);
  assert.ok(match, `Missing projection ${branch}`);
  return [...match[1].matchAll(/^\s*'([^']+)',/gm)].map((entry) => entry[1]);
}

assert.match(migration, /revoke select on table public\.cms_content from public, anon;/);
assert.match(migration, /create policy "CMS admins read content"\s+on public\.cms_content\s+for select to authenticated using \(\(select public\.is_cms_admin\(\)\)\)/);
assert.doesNotMatch(migration, /for select to anon/);
assert.match(migration, /grant insert on table public\.cms_content to anon, authenticated;/);

const contentFunction = functionSql("cms_public_content(requested_collection text)");
assert.match(contentFunction, /security definer\s+set search_path = ''/);
assert.match(contentFunction, /content\.status = 'published'/);
assert.match(contentFunction, /content\.collection in \('services', 'industries', 'professionals', 'global-presence', 'technology', 'insights'\)/);
assert.doesNotMatch(contentFunction, /'data'\s*,\s*content\.data|'metadata'|'created_by'/);
const commonFields = [
  "title", "category", "description", "content", "featuredImage", "seoTitle", "seoDescription",
  "ogTitle", "ogDescription", "canonicalUrl", "robotsIndex", "robotsFollow",
];
const projectionFields = {
  services: [...commonFields, "sourceDefined"],
  industries: commonFields,
  professionals: [...commonFields, "designation", "expertise", "education", "enrolment", "sourceDefined"],
  "global-presence": commonFields,
  technology: commonFields,
  insights: [...commonFields, "author"],
};
for (const [collection, expected] of Object.entries(projectionFields)) {
  const branch = new RegExp(`when '${collection}' then pg_catalog\\.jsonb_build_object\\(([\\s\\S]*?)\\n\\s*\\)`);
  assert.deepEqual(projectedKeys(contentFunction, branch), expected, `Unexpected ${collection} projection fields`);
}
assert.match(migration, /revoke all on function public\.cms_public_content\(text\) from public, anon, authenticated;\s*grant execute on function public\.cms_public_content\(text\) to anon, authenticated;/);

const pageFunction = functionSql("cms_published_page(requested_path text)");
assert.match(pageFunction, /security definer\s+set search_path = ''/);
assert.match(pageFunction, /content\.collection = 'pages'[\s\S]*?content\.status = 'published'/);
assert.deepEqual(projectedKeys(pageFunction, /pg_catalog\.jsonb_build_object\(([\s\S]*?)\n\s*\) as data/), [
  "title", "category", "description", "content", "featuredImage", "seoTitle", "seoDescription", "ogTitle", "ogDescription", "canonicalUrl", "robotsIndex", "robotsFollow",
]);

const testimonialFunction = functionSql("cms_public_testimonials()");
assert.match(testimonialFunction, /returns table \([\s\S]*?testimonial_text text\s*\)/);
assert.match(testimonialFunction, /content\.collection = 'testimonials'[\s\S]*?content\.status = 'published'/);
assert.match(testimonialFunction, /content\.data->'consent' = 'true'::jsonb[\s\S]*?content\.data->'identityPublicationConsent' = 'true'::jsonb/);
assert.doesNotMatch(testimonialFunction, /data->>'(?:consent|identityPublicationConsent)'/);
assert.doesNotMatch(testimonialFunction, /videoUrl|duration|metadata|created_by/);
const acceptsConsent = (value) => value === true;
for (const value of ["true", 1, 0, null, undefined, false, {}, []]) assert.equal(acceptsConsent(value), false);
assert.equal(acceptsConsent(true), true);
assert.match(migration, /data->'consent' is distinct from 'true'::jsonb[\s\S]*?data->'identityPublicationConsent' is distinct from 'true'::jsonb/);
assert.match(migration, /data->'consent' = 'true'::jsonb[\s\S]*?data->'identityPublicationConsent' = 'true'::jsonb/);

const sourceSlugsFunction = functionSql("cms_source_testimonial_slugs()");
assert.match(sourceSlugsFunction, /security definer\s+set search_path = ''/);
assert.match(sourceSlugsFunction, /content\.collection = 'testimonials'[\s\S]*?content\.data->'sourceDefined' = 'true'::jsonb[\s\S]*?content\.status <> 'published'/);
assert.match(sourceSlugsFunction, /returns table \(slug text\)/);
assert.doesNotMatch(sourceSlugsFunction, /returns table \([^)]*jsonb|returns table \([^)]*metadata|returns table \([^)]*created_by/);

for (const name of ["cms_published_page(requested_path text)", "cms_public_content(requested_collection text)", "cms_public_testimonials()", "cms_source_testimonial_slugs()"]) {
  const functionName = name.slice(0, name.indexOf("("));
  assert.match(migration, new RegExp(`revoke all on function public\\.${functionName}\\([\\s\\S]*?\\) from public, anon, authenticated;\\s*grant execute on function public\\.${functionName}\\(`));
}

assert.match(migration, /drop function if exists public\.cms_source_content_statuses\(text\)/);
assert.doesNotMatch(migration, /cms_source_content_statuses\(requested_collection text\)/);
assert.match(migration, /revoke all on function public\.is_cms_admin\(\) from public, anon, authenticated;\s*grant execute on function public\.is_cms_admin\(\) to anon, authenticated;/);
assert.match(initialMigration, /create or replace function public\.is_cms_admin\(\)[\s\S]*?security definer\s+set search_path = ''/);
assert.match(permissionMigration, /revoke all privileges on table public\.cms_content from public, anon;/);
assert.match(permissionMigration, /grant insert on table public\.cms_content to anon;/);
assert.doesNotMatch(permissionMigration, /grant\s+(?:select|update|delete|truncate|references|trigger)[\s\S]*?\bto anon\b/i);
assert.match(permissionMigration, /create policy "Public testimonial submissions"[\s\S]*?status = 'pending'[\s\S]*?data->'consent' = 'true'::jsonb[\s\S]*?data->'identityPublicationConsent' = 'true'::jsonb[\s\S]*?data->>'format' = 'video'[\s\S]*?data->'mediaSubmitted' = 'true'::jsonb/);

assert.match(server, /const publicCollections = new Set\([\s\S]*?"insights"[\s\S]*?\);/);
assert.match(server, /if \(!publicCollections\.has\(collection\)\) return \[\];/);
assert.match(server, /rpc\("cms_public_content",\s*\{\s*requested_collection: collection/);
assert.doesNotMatch(server, /from\("cms_content"\)/);
assert.match(server, /rpc\("cms_public_testimonials"\)/);
assert.match(server, /rpc\("cms_source_testimonial_slugs"\)/);

const publicReaders = [
  ["src/app/services/page.tsx", "services"],
  ["src/app/services/[...slug]/page.tsx", "services"],
  ["src/app/industries/page.tsx", "industries"],
  ["src/app/industries/[slug]/page.tsx", "industries"],
  ["src/app/professionals/page.tsx", "professionals"],
  ["src/app/professionals/[slug]/page.tsx", "professionals"],
  ["src/app/global-presence/page.tsx", "global-presence"],
  ["src/app/global-presence/[slug]/page.tsx", "global-presence"],
  ["src/app/technology-and-digital-solutions/page.tsx", "technology"],
  ["src/app/technology-and-digital-solutions/[slug]/page.tsx", "technology"],
  ["src/app/insights/page.tsx", "insights"],
  ["src/app/insights/[slug]/page.tsx", "insights"],
];
for (const [file, collection] of publicReaders) {
  assert.match(fs.readFileSync(path.join(root, file), "utf8"), new RegExp(`getPublishedContent\\("${collection}"\\)`), `${file} must use the scoped reader`);
}
assert.match(testimonialForm, /name="identityPublicationConsent"[\s\S]*?type="checkbox"[\s\S]*?required/);
assert.match(testimonialRoute, /get\("identityPublicationConsent"\)\s*!==\s*"yes"/);
assert.match(testimonialRoute, /identityPublicationConsent:\s*get\("identityPublicationConsent"\)\s*===\s*"yes"/);
assert.match(testimonialRoute, /consumeEmailVerification\(get\("email"\),\s*get\("emailVerificationToken"\)\)/);
assert.doesNotMatch(testimonialRoute, /consumeFormVerification|captchaToken/);
assert.match(server, /function safeCanonical/);
assert.match(server, /openGraph:[\s\S]*?ogTitle/);
assert.match(server, /robots:\s*\{\s*index:\s*data\.robotsIndex/);
for (const collection of ["services", "industries", "professionals", "global-presence", "technology", "insights"]) {
  assert.match(sitemap, new RegExp(`\\["${collection}",`), `Published ${collection} must be included in the sitemap`);
}
for (const reader of [homeTestimonials, testimonialPage]) {
  assert.match(reader, /getPublicTestimonials\(\)/);
  assert.match(reader, /getSourceTestimonialSlugs\(\)/);
  assert.doesNotMatch(reader, /getPublishedContent\("testimonials"\)/);
}

console.log("PASS: no anonymous table reads, scoped public projections, published-only filters, strict consent, grants, and public-reader wiring.");