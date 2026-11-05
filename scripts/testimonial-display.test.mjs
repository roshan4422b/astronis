import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { getHomepageTestimonials } from "../src/lib/testimonial-display.ts";

test("homepage testimonials prioritize newest published records, fill to six, and never exceed six", () => {
  const published = Array.from({ length: 8 }, (_, index) => ({ id: `new-${index}` }));
  const existing = Array.from({ length: 6 }, (_, index) => ({ id: `existing-${index}` }));
  const result = getHomepageTestimonials(published, existing, new Set(["existing-0"]));

  assert.equal(result.length, 6);
  assert.deepEqual(result.map(({ id }) => id), [
    "new-0", "new-1", "new-2", "new-3", "new-4", "new-5",
  ]);
});

test("homepage testimonials fill missing slots without duplicating CMS records or suppressed source records", () => {
  const published = [{ id: "latest" }, { id: "source-record" }];
  const existing = [{ id: "source-record" }, { id: "existing-1" }, { id: "existing-2" }];
  const result = getHomepageTestimonials(published, existing, new Set(["source-record"]));

  assert.deepEqual(result.map(({ id }) => id), ["latest", "source-record", "existing-1", "existing-2"]);
});

test("admin testimonial video preview requests a fresh authenticated media URL", async () => {
  const [dialog, route] = await Promise.all([
    readFile(new URL("../src/app/admin/_components/admin-engagement.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/admin/testimonials/[id]/video/route.ts", import.meta.url), "utf8"),
  ]);

  assert.match(dialog, /\/api\/admin\/testimonials\/\$\{encodeURIComponent\(selected\.id\)\}\/video/);
  assert.match(route, /getAuthorizedAdmin\(\)/);
  assert.match(route, /\.eq\("collection", "testimonials"\)/);
  assert.match(route, /createSignedUrl\(videoPath, 15 \* 60\)/);
  assert.match(route, /Cache-Control", "private, no-store"/);
  assert.match(route, /isTestimonialMediaPath\(videoPath\)/);
});
