import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { getSourceContentRecords } from "@/lib/cms/source-content";
import {
  mapTestimonialExportRecord,
  matchesTestimonialExportFilters,
  testimonialExportFilename,
  writeTestimonialWorkbook,
  type TestimonialExportRecord,
} from "@/lib/admin/testimonial-export";

export const runtime = "nodejs";

const pageSize = 500;
const allowedStatuses = new Set(["Pending", "Published", "Rejected", "Archived"]);
const allowedTypes = new Set(["Text testimonials", "Video testimonials", "Image / media"]);
const allowedConsent = new Set(["Granted", "Not granted"]);

function downloadHeaders(filename: string) {
  return {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  };
}

export async function GET(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const params = new URL(request.url).searchParams;
  const scope = params.get("scope") || "all";
  if (scope !== "all" && scope !== "filtered") {
    return NextResponse.json({ error: "Choose all testimonials or the active filters." }, { status: 400 });
  }
  const filters = {
    status: scope === "filtered" ? params.get("status") || "" : "",
    search: scope === "filtered" ? (params.get("search") || "").trim().slice(0, 200) : "",
    type: scope === "filtered" ? params.get("type") || "" : "",
    consent: scope === "filtered" ? params.get("consent") || "" : "",
  };
  if (filters.status && !allowedStatuses.has(filters.status)) return NextResponse.json({ error: "Invalid testimonial status filter." }, { status: 400 });
  if (filters.type && !allowedTypes.has(filters.type)) return NextResponse.json({ error: "Invalid testimonial type filter." }, { status: 400 });
  if (filters.consent && !allowedConsent.has(filters.consent)) return NextResponse.json({ error: "Invalid testimonial consent filter." }, { status: 400 });

  const records = new Map<string, TestimonialExportRecord>();
  for (const record of getSourceContentRecords("testimonials")) {
    records.set(`testimonials:${record.slug}`, record);
  }
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await auth.supabase
      .from("cms_content")
      .select("id, slug, status, data, created_at")
      .eq("collection", "testimonials")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, offset + pageSize - 1);
    if (error) {
      console.error("[admin-testimonials] Could not load testimonials for export.", { code: error.code || "unknown" });
      return NextResponse.json({ error: "Could not export testimonials." }, { status: 500 });
    }
    for (const record of data ?? []) records.set(`testimonials:${record.slug}`, record);
    if (!data || data.length < pageSize) break;
  }

  const testimonials = [...records.values()]
    .map(mapTestimonialExportRecord)
    .filter((testimonial) => matchesTestimonialExportFilters(testimonial, filters));
  try {
    const workbook = await writeTestimonialWorkbook(testimonials);
    const body = Readable.toWeb(Readable.from([workbook])) as ReadableStream<Uint8Array>;
    return new Response(body, {
      headers: downloadHeaders(testimonialExportFilename()),
    });
  } catch (error) {
    console.error("[admin-testimonials] Could not create testimonial workbook.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json({ error: "Could not create testimonial export." }, { status: 500 });
  }
}
