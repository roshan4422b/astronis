import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { getSourceContentRecords } from "@/lib/cms/source-content";

export const runtime = "nodejs";
const collections = new Set(["pages", "services", "industries", "professionals", "global-presence", "technology", "insights", "testimonials", "seo"]);
const statuses = new Set(["draft", "published", "archived", "pending", "approved", "rejected"]);
const pageStatuses = new Set(["draft", "published", "archived"]);
const pageDataFields = new Set([
  "title", "category", "description", "content", "seoTitle", "seoDescription",
  "ogTitle", "ogDescription", "canonicalUrl", "robotsIndex", "robotsFollow",
  "featuredImage",
]);
const errorResponse = (message: string, status: number) => NextResponse.json({ error: message }, { status });
type AdminContentRow = {
  id: string;
  collection: string;
  slug: string;
  status: string;
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string | null;
  updated_at: string | null;
  source_defined?: boolean;
};
function revalidateContent(collection: string, slug: string, sourcePath?: string) {
  if (sourcePath) revalidatePath(sourcePath);
  const paths: Record<string, string> = {
    pages: `/${slug}`,
    services: `/services/${slug}`,
    industries: `/industries/${slug}`,
    professionals: `/professionals/${slug}`,
    "global-presence": `/global-presence/${slug}`,
    technology: `/technology-and-digital-solutions/${slug}`,
    insights: `/insights/${slug}`,
    testimonials: "/testimonials",
    seo: `/${slug.replace(/^\/+/, "")}`,
  };
  if (paths[collection]) revalidatePath(paths[collection]);
  if (["services", "industries", "professionals", "global-presence", "technology", "insights"].includes(collection)) {
    const listings: Record<string, string> = {
      services: "/services", industries: "/industries", professionals: "/professionals",
      "global-presence": "/global-presence", technology: "/technology-and-digital-solutions", insights: "/insights",
    };
    revalidatePath(listings[collection]);
  }
  if (collection === "testimonials") { revalidatePath("/"); revalidatePath("/insights-events"); }
}
function publicPageData(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => pageDataFields.has(key)));
}

export async function GET(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return errorResponse("Supabase is not configured.", 503);
  if (!auth.user || !auth.supabase) return errorResponse("Authentication required.", 401);
  const params = new URL(request.url).searchParams;
  const collection = params.get("collection") ?? "";
  const status = params.get("status") ?? "";
  if (collection === "enquiries") {
    let query = auth.supabase.from("cms_enquiries").select("*").order("created_at", { ascending: false }).limit(500);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    return error ? errorResponse("Could not load enquiries.", 500) : NextResponse.json({ records: data ?? [] });
  }
  if (collection === "settings") {
    const { data, error } = await auth.supabase.from("cms_settings").select("key, value, updated_at").order("key");
    return error ? errorResponse("Could not load settings.", 500) : NextResponse.json({ records: data ?? [] });
  }
  if (collection !== "all" && !collections.has(collection)) return errorResponse("Unknown content collection.", 400);
  let query = auth.supabase.from("cms_content").select("id, collection, slug, status, data, metadata, created_at, updated_at").order("updated_at", { ascending: false }).limit(1000);
  if (collection !== "all") query = query.eq("collection", collection);
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) return errorResponse("Could not load content.", 500);
  const merged = new Map<string, AdminContentRow>();
  for (const row of getSourceContentRecords(collection === "all" ? undefined : collection)) {
    merged.set(`${row.collection}:${row.slug}`, row);
  }
  for (const row of data ?? []) merged.set(`${row.collection}:${row.slug}`, row);
  const records = [...merged.values()].filter((row) => !status || row.status === status);
  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return errorResponse("Supabase is not configured.", 503);
  if (!auth.user || !auth.supabase) return errorResponse("Authentication required.", 401);
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return errorResponse("Invalid JSON.", 400); }
  const collection = typeof body.collection === "string" ? body.collection : "";
  const sourceDefined = body.sourceDefined === true;
  if (collection === "enquiries") {
    const data = body.data && typeof body.data === "object" && !Array.isArray(body.data) ? body.data as Record<string, unknown> : {};
    const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
    const email = typeof data.email === "string" ? data.email.trim().slice(0, 254) : "";
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return errorResponse("A valid name and email are required.", 400);
    const status = typeof body.status === "string" && ["New", "In Progress", "Responded", "Closed"].includes(body.status) ? body.status : "New";
    const createdAt = typeof data.date === "string" && !Number.isNaN(Date.parse(data.date)) ? new Date(data.date).toISOString() : undefined;
    const { data: row, error } = await auth.supabase.from("cms_enquiries").insert({
      name, email, company: typeof data.company === "string" ? data.company.slice(0, 200) : "",
      subject: typeof data.subject === "string" ? data.subject.slice(0, 300) : "",
      message: typeof data.message === "string" ? data.message.slice(0, 5000) : "",
      form_type: typeof data.formType === "string" ? data.formType.slice(0, 80) : "admin",
      status, internal_notes: typeof data.internalNotes === "string" ? data.internalNotes.slice(0, 5000) : "",
      data: { phone: typeof data.phone === "string" ? data.phone.slice(0, 80) : "" },
      ...(createdAt ? { created_at: createdAt } : {}),
    }).select("*").single();
    return error ? errorResponse("Could not save enquiry.", 500) : NextResponse.json({ record: row }, { status: 201 });
  }
  if (collection === "testimonials") {
    const data = body.data && typeof body.data === "object" && !Array.isArray(body.data) ? body.data as Record<string, unknown> : {};
    const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
    const text = typeof data.text === "string" ? data.text.trim().slice(0, 5000) : "";
    const createdAt = typeof data.date === "string" && !Number.isNaN(Date.parse(data.date)) ? new Date(data.date).toISOString() : undefined;
    if (name.length < 2 || text.length < 10 || data.consent !== true || data.identityPublicationConsent !== true) {
      return errorResponse("A testimonial requires verified publication consent for both the testimonial and contributor identity.", 400);
    }
    const payload = { ...data, name, text, excerpt: text.slice(0, 240), consent: true, identityPublicationConsent: true };
    const { data: row, error } = await auth.supabase.from("cms_content").insert({
      collection: "testimonials", slug: `submission-${crypto.randomUUID()}`, status: "pending", data: payload,
      ...(createdAt ? { created_at: createdAt } : {}),
    }).select("id, collection, slug, status, data, metadata, created_at, updated_at").single();
    return error ? errorResponse("Could not save testimonial.", 500) : NextResponse.json({ record: row }, { status: 201 });
  }
  if (!collections.has(collection) || !body.data || typeof body.data !== "object" || Array.isArray(body.data)) return errorResponse("Invalid content record.", 400);
  const data = body.data as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title.trim().slice(0, 240) : "";
  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase().slice(0, 180) : "";
  const allowedStatuses = collection === "pages" ? pageStatuses : statuses;
  const status = typeof body.status === "string" && allowedStatuses.has(body.status) ? body.status : "draft";
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return errorResponse("A title and valid unique slug are required.", 400);
  if (sourceDefined && !getSourceContentRecords(collection).some((record) => record.slug === slug)) {
    return errorResponse("This source-defined record is no longer available to migrate.", 409);
  }
  const sourceRecord = sourceDefined ? getSourceContentRecords(collection).find((record) => record.slug === slug) : undefined;
  const recordData = collection === "pages"
    ? {
      ...publicPageData(data),
      ...(sourceRecord ? { sourceDefined: true, sourcePath: sourceRecord.data.sourcePath } : {}),
    }
    : sourceDefined ? { ...data, sourceDefined: true } : data;
  const mutation = auth.supabase.from("cms_content");
  const { data: row, error } = await (sourceDefined
    ? mutation.upsert({ collection, slug, status, data: recordData, metadata: body.metadata && typeof body.metadata === "object" ? body.metadata : {}, created_by: auth.user.id }, { onConflict: "collection,slug" })
    : mutation.insert({ collection, slug, status, data: recordData, metadata: body.metadata && typeof body.metadata === "object" ? body.metadata : {}, created_by: auth.user.id }))
    .select("id, collection, slug, status, data, metadata, created_at, updated_at").single();
  if (error) return errorResponse(error.code === "23505" ? "A record with this slug already exists in this section." : "Could not save content.", error.code === "23505" ? 409 : 500);
  revalidateContent(collection, slug, typeof recordData.sourcePath === "string" ? recordData.sourcePath : undefined);
  return NextResponse.json({ record: row }, { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return errorResponse("Supabase is not configured.", 503);
  if (!auth.user || !auth.supabase) return errorResponse("Authentication required.", 401);
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return errorResponse("Invalid JSON.", 400); }
  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return errorResponse("Record id is required.", 400);
  const sourceRecord = getSourceContentRecords().find((record) => record.id === id);
  if (sourceRecord) {
    const updates: Record<string, unknown> = {};
    const allowedStatuses = sourceRecord.collection === "pages" ? pageStatuses : statuses;
    if (typeof body.status === "string" && allowedStatuses.has(body.status)) updates.status = body.status;
    if (body.data && typeof body.data === "object" && !Array.isArray(body.data)) updates.data = body.data;
    if (!Object.keys(updates).length) return errorResponse("No valid updates provided.", 400);
    const sourceData: Record<string, unknown> = sourceRecord.collection === "pages"
      ? {
        ...sourceRecord.data,
        ...publicPageData((updates.data as Record<string, unknown> | undefined) ?? {}),
        sourceDefined: true,
        sourcePath: sourceRecord.data.sourcePath,
      }
      : {
        ...sourceRecord.data,
        ...(updates.data as Record<string, unknown> | undefined),
        sourceDefined: true,
      };
    const status = typeof updates.status === "string" ? updates.status : sourceRecord.status;
    if (sourceRecord.collection === "testimonials" &&
      status === "published" &&
      (sourceData.consent !== true || sourceData.identityPublicationConsent !== true)) {
      return errorResponse("Testimonial publication requires explicit publication and identity consent.", 403);
    }
    const { data: row, error } = await auth.supabase.from("cms_content").upsert({
      collection: sourceRecord.collection,
      slug: sourceRecord.slug,
      status,
      data: sourceData,
      metadata: sourceRecord.metadata,
      created_by: auth.user.id,
    }, { onConflict: "collection,slug" })
      .select("id, collection, slug, status, data, metadata, created_at, updated_at").single();
    if (error) return errorResponse("Could not update source-defined content.", 500);
    revalidateContent(row.collection, row.slug, typeof sourceData.sourcePath === "string" ? sourceData.sourcePath : undefined);
    return NextResponse.json({ record: row });
  }
  const updates: Record<string, unknown> = {};
  const { data: existingRecord } = await auth.supabase.from("cms_content").select("collection, slug, data").eq("id", id).maybeSingle();
  if (typeof body.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)) {
    if (
      existingRecord?.collection === "pages" &&
      existingRecord.data?.sourceDefined === true &&
      body.slug !== existingRecord.slug
    ) return errorResponse("Source-defined page slugs cannot be changed.", 409);
    updates.slug = body.slug;
  }
  const allowedStatuses = existingRecord?.collection === "pages" ? pageStatuses : statuses;
  if (typeof body.status === "string" && allowedStatuses.has(body.status)) updates.status = body.status;
  if (body.data && typeof body.data === "object" && !Array.isArray(body.data)) {
    const submittedData = body.data as Record<string, unknown>;
    const data: Record<string, unknown> = existingRecord?.collection === "pages"
      ? {
        ...publicPageData(submittedData),
        ...(existingRecord.data?.sourceDefined === true && typeof existingRecord.data.sourcePath === "string"
          ? { sourceDefined: true, sourcePath: existingRecord.data.sourcePath }
          : {}),
      }
      : existingRecord?.collection === "testimonials"
        ? { ...existingRecord.data, ...submittedData }
        : submittedData;
    if (existingRecord?.collection === "testimonials") {
      const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
      const text = typeof data.text === "string" ? data.text.trim().slice(0, 5000) : "";
      if (name.length < 2 || text.length < 10) return errorResponse("A testimonial requires a valid name and at least 10 characters of text.", 400);
      updates.data = { ...data, name, text, excerpt: text.slice(0, 240) };
    } else {
      if (typeof data.title !== "string" || !data.title.trim()) return errorResponse("A title is required.", 400);
      updates.data = data;
    }
  }
  if (existingRecord?.collection !== "pages" && body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)) updates.metadata = body.metadata;
  if (!Object.keys(updates).length) return errorResponse("No valid updates provided.", 400);
  if (updates.status === "published" || updates.status === "approved") {
    const { data: existing } = await auth.supabase.from("cms_content").select("collection, data").eq("id", id).maybeSingle();
    if (existing?.collection === "testimonials" && updates.status === "approved") {
      return errorResponse("Use the published status to approve a testimonial.", 400);
    }
    if (existing?.collection === "testimonials" &&
      (existing.data?.consent !== true || existing.data?.identityPublicationConsent !== true) &&
      (!updates.data || (updates.data as Record<string, unknown>).consent !== true || (updates.data as Record<string, unknown>).identityPublicationConsent !== true)) {
      return errorResponse("Testimonial publication requires explicit publication and identity consent.", 403);
    }
  }
  const { data: row, error } = await auth.supabase.from("cms_content").update(updates).eq("id", id)
    .select("id, collection, slug, status, data, metadata, created_at, updated_at").maybeSingle();
  if (error) return errorResponse(error.code === "23505" ? "A record with this slug already exists in this section." : "Could not update content.", error.code === "23505" ? 409 : 500);
  if (row) revalidateContent(row.collection, row.slug, typeof row.data?.sourcePath === "string" ? row.data.sourcePath : undefined);
  return row ? NextResponse.json({ record: row }) : errorResponse("Record not found.", 404);
}

export async function DELETE(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return errorResponse("Supabase is not configured.", 503);
  if (!auth.user || !auth.supabase) return errorResponse("Authentication required.", 401);
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return errorResponse("Record id is required.", 400);
  const { data: existing } = await auth.supabase.from("cms_content").select("collection, slug").eq("id", id).maybeSingle();
  if (existing && getSourceContentRecords(existing.collection).some((record) => record.slug === existing.slug)) {
    return errorResponse("Source-defined website content cannot be deleted. Set its status to Archived to remove it from public views.", 409);
  }
  const { data, error } = await auth.supabase.from("cms_content").delete().eq("id", id).select("id").maybeSingle();
  if (error) return errorResponse("Could not delete content.", 500);
  if (existing) revalidateContent(existing.collection, existing.slug);
  return data ? NextResponse.json({ success: true }) : errorResponse("Record not found.", 404);
}
