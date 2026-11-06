import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { getSourceContentRecords } from "@/lib/cms/source-content";
import { sendTestimonialModerationEmail } from "@/lib/testimonial-notifications.server";
import {
  isSupportedTestimonialVideoUrl,
  isTestimonialMediaPath,
  testimonialMediaBucket,
} from "@/lib/testimonial-media";
import {
  checkTestimonialMediaReferences,
  signTestimonialMedia,
} from "@/lib/testimonial-media.server";

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
  notification_status?: string;
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
  if (collection === "insights") revalidatePath("/insights-events");
  if (["services", "industries", "professionals", "global-presence", "technology", "insights"].includes(collection)) {
    const listings: Record<string, string> = {
      services: "/services", industries: "/industries", professionals: "/professionals",
      "global-presence": "/global-presence", technology: "/technology-and-digital-solutions", insights: "/insights",
    };
    revalidatePath(listings[collection]);
  }
  if (collection === "testimonials") {
    revalidatePath("/");
    revalidatePath("/testimonials");
    revalidatePath("/insights-events");
  }
}
function publicPageData(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => pageDataFields.has(key)));
}

async function hydrateTestimonialMedia<T extends { collection?: string; data?: Record<string, unknown> }>(
  supabase: NonNullable<Awaited<ReturnType<typeof getAuthorizedAdmin>>["supabase"]>,
  record: T,
) {
  if (record.collection !== "testimonials" || !record.data) return record;
  const imagePath = typeof record.data.imagePath === "string" ? record.data.imagePath : "";
  const videoPath = typeof record.data.videoPath === "string" ? record.data.videoPath : "";
  const signedUrls = await signTestimonialMedia(supabase, [imagePath, videoPath]);
  return {
    ...record,
    data: {
      ...record.data,
      imageUrl: imagePath ? signedUrls.get(imagePath) || "" : typeof record.data.imageUrl === "string" ? record.data.imageUrl : "",
      videoUrl: videoPath
        ? signedUrls.get(videoPath) || ""
        : typeof record.data.videoUrl === "string" && isSupportedTestimonialVideoUrl(record.data.videoUrl)
          ? record.data.videoUrl
          : "",
    },
  };
}

async function cleanupUnreferencedTestimonialMedia(
  supabase: NonNullable<Awaited<ReturnType<typeof getAuthorizedAdmin>>["supabase"]>,
  paths: string[],
  excludingId?: string,
) {
  for (const path of [...new Set(paths.filter(isTestimonialMediaPath))]) {
    const references = await checkTestimonialMediaReferences(supabase, path, excludingId);
    if (references.error) {
      console.error("[admin-testimonials] Could not verify whether media is shared.", {
        code: references.error.code || "unknown",
      });
      continue;
    }
    if (references.referenced) continue;
    const { error } = await supabase.storage.from(testimonialMediaBucket).remove([path]);
    if (error) {
      console.error("[admin-testimonials] Could not remove unreferenced private media.", {
        code: error.name || "unknown",
      });
    }
  }
}

export async function GET(request: Request) {
  try {
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
  if (error) {
    console.error("[admin-cms] Content query failed.", {
      collection: collection || "all",
      code: error.code || "unknown",
    });
    return errorResponse("Could not load content.", 500);
  }
  const merged = new Map<string, AdminContentRow>();
  for (const row of getSourceContentRecords(collection === "all" ? undefined : collection)) {
    merged.set(`${row.collection}:${row.slug}`, row);
  }
  for (const row of data ?? []) merged.set(`${row.collection}:${row.slug}`, row);
  const records = [...merged.values()].filter((row) => !status || row.status === status);
  const hydratedRecords = await Promise.all(records.map((record) => hydrateTestimonialMedia(auth.supabase!, record)));
  const testimonialRows = hydratedRecords.filter((record) => record.collection === "testimonials");
  const persistedTestimonials = testimonialRows.filter((record) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(record.id),
  );
  let warning: string | undefined;
  if (persistedTestimonials.length) {
    const { data: deliveries, error: deliveryError } = await auth.supabase
      .from("cms_testimonial_notification_deliveries")
      .select("testimonial_id, event_status, delivery_status")
      .in("testimonial_id", persistedTestimonials.map((record) => record.id));
    if (deliveryError) {
      const code = deliveryError.code || "unknown";
      console.error("[admin-testimonials] Notification status query failed.", {
        code,
      });
      const cause = code === "42P01" || code === "PGRST205"
        ? "The optional notification table is missing; emails can still be sent, while delivery status tracking is unavailable."
        : code === "42501"
          ? "The admin account lacks access to the notification table; check its admin RLS policy and grants."
          : "Check the testimonial notification migration and admin permissions.";
      warning = `Testimonials loaded, but email notification status is unavailable (${code}). ${cause}`;
    } else {
      const deliveryByEvent = new Map(
        (deliveries ?? []).map((delivery) => [`${delivery.testimonial_id}:${delivery.event_status}`, delivery.delivery_status]),
      );
      for (const record of persistedTestimonials) {
        const eventStatus = record.status === "rejected"
          ? "rejected"
          : record.status === "approved" || record.status === "published"
            ? "published"
            : "";
        if (eventStatus) record.notification_status = deliveryByEvent.get(`${record.id}:${eventStatus}`);
      }
    }
  }
  return NextResponse.json({ records: hydratedRecords, ...(warning ? { warning } : {}) });
  } catch (error) {
    console.error("[admin-cms] Data request failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return errorResponse("Could not load CMS data. Check the local server logs for details.", 500);
  }
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
    if (typeof body.status === "string" && body.status !== "pending") {
      return errorResponse("New testimonials must be submitted as pending for review.", 400);
    }
    const data = body.data && typeof body.data === "object" && !Array.isArray(body.data) ? body.data as Record<string, unknown> : {};
    const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
    const text = typeof data.text === "string" ? data.text.trim().slice(0, 5000) : "";
    const format = data.format === "video" ? "video" : "written";
    const imagePath = typeof data.imagePath === "string" ? data.imagePath.trim() : "";
    const videoPath = typeof data.videoPath === "string" ? data.videoPath.trim() : "";
    const videoUrl = typeof data.videoUrl === "string" ? data.videoUrl.trim() : "";
    const photoPublicationConsent = data.photoPublicationConsent === true;
    const createdAt = typeof data.date === "string" && !Number.isNaN(Date.parse(data.date)) ? new Date(data.date).toISOString() : undefined;
    if (
      name.length < 2 ||
      text.length > 5000 ||
      (format === "written" && text.length < 10) ||
      (format === "video" && !videoPath && !isSupportedTestimonialVideoUrl(videoUrl)) ||
      (imagePath && !isTestimonialMediaPath(imagePath)) ||
      (imagePath && !photoPublicationConsent) ||
      (videoPath && !isTestimonialMediaPath(videoPath)) ||
      (videoUrl && !isSupportedTestimonialVideoUrl(videoUrl)) ||
      (typeof data.email === "string" && data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) ||
      data.consent !== true ||
      data.identityPublicationConsent !== true
    ) {
      return errorResponse("A testimonial requires valid content, supported media, and verified publication consent for both the testimonial and contributor identity.", 400);
    }
    const payload = {
      ...data,
      name,
      text,
      format,
      imagePath,
      videoPath,
      videoUrl,
      videoSource: videoPath ? data.videoSource === "recorded" ? "recorded" : "uploaded" : videoUrl ? "url" : "",
      mediaSubmitted: Boolean(imagePath || videoPath || videoUrl),
      photoPublicationConsent,
      emailVerified: false,
      emailVerificationProof: "",
      excerpt: text.slice(0, 240),
      consent: true,
      identityPublicationConsent: true,
    };
    const { data: row, error } = await auth.supabase.from("cms_content").insert({
      collection: "testimonials", slug: `submission-${crypto.randomUUID()}`, status: "pending", data: payload,
      ...(createdAt ? { created_at: createdAt } : {}),
    }).select("id, collection, slug, status, data, metadata, created_at, updated_at").single();
    if (error) return errorResponse("Could not save testimonial.", 500);
    return NextResponse.json({ record: await hydrateTestimonialMedia(auth.supabase, row) }, { status: 201 });
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
    else if (typeof body.status === "string") return errorResponse("Invalid content status.", 400);
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
  const { data: existingRecord, error: existingError } = await auth.supabase
    .from("cms_content")
    .select("collection, slug, status, data")
    .eq("id", id)
    .maybeSingle();
  if (existingError) return errorResponse("Could not load the content record.", 500);
  if (!existingRecord) return errorResponse("Record not found.", 404);
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
      const format = data.format === "video" ? "video" : "written";
      const imagePath = typeof data.imagePath === "string" ? data.imagePath.trim() : "";
      const videoPath = typeof data.videoPath === "string" ? data.videoPath.trim() : "";
      const videoUrl = typeof data.videoUrl === "string" ? data.videoUrl.trim() : "";
      const photoPublicationConsent = data.photoPublicationConsent === true;
      const rating = Number(data.rating ?? 5);
      if (
        name.length < 2 ||
        text.length > 5000 ||
        (format === "written" && text.length < 10) ||
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5 ||
        (format === "video" && !videoPath && !isSupportedTestimonialVideoUrl(videoUrl)) ||
        (imagePath && !isTestimonialMediaPath(imagePath)) ||
        (imagePath && !photoPublicationConsent) ||
        (videoPath && !isTestimonialMediaPath(videoPath)) ||
        (submittedData.videoUrl !== undefined && videoUrl && !isSupportedTestimonialVideoUrl(videoUrl))
      ) {
        return errorResponse("A testimonial requires valid content and supported media.", 400);
      }
      const emailChanged = typeof submittedData.email === "string" &&
        submittedData.email.trim().toLowerCase() !== String(existingRecord.data.email || "").trim().toLowerCase();
      updates.data = {
        ...data,
        name,
        text,
        rating,
        format,
        imagePath,
        videoPath,
        videoUrl,
        videoSource: videoPath
          ? data.videoSource === "recorded" ? "recorded" : "uploaded"
          : videoUrl
            ? "url"
            : "",
        mediaSubmitted: Boolean(imagePath || videoPath || videoUrl),
        photoPublicationConsent,
        ...(emailChanged ? { emailVerified: false, emailVerificationProof: "" } : {}),
        excerpt: text.slice(0, 240),
      };
    } else {
      if (typeof data.title !== "string" || !data.title.trim()) return errorResponse("A title is required.", 400);
      updates.data = data;
    }
  }
  if (existingRecord?.collection !== "pages" && body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)) updates.metadata = body.metadata;
  if (!Object.keys(updates).length) return errorResponse("No valid updates provided.", 400);
  const testimonialDecisionChanged = existingRecord.collection === "testimonials" &&
    typeof updates.status === "string" &&
    updates.status !== existingRecord.status;
  if (testimonialDecisionChanged) {
    const currentStatus = existingRecord.status;
    const nextStatus = updates.status;
    const allowedTransition =
      currentStatus === "pending" && (nextStatus === "approved" || nextStatus === "published" || nextStatus === "rejected" || nextStatus === "archived") ||
      (currentStatus === "approved" || currentStatus === "published") && nextStatus === "archived" ||
      currentStatus === "rejected" && (nextStatus === "approved" || nextStatus === "published" || nextStatus === "archived") ||
      currentStatus === "archived" && (nextStatus === "approved" || nextStatus === "published");
    if (!allowedTransition) {
      return errorResponse("This testimonial status transition is not permitted.", 409);
    }
    if (nextStatus === "rejected") {
      const reason = typeof body.rejectionReason === "string" ? body.rejectionReason.trim() : "";
      if (reason.length < 3 || reason.length > 1000) {
        return errorResponse("A rejection reason between 3 and 1000 characters is required.", 400);
      }
    }
    if (nextStatus === "approved" || nextStatus === "published") {
      const data = (updates.data as Record<string, unknown> | undefined) ?? existingRecord.data;
      if (data.consent !== true || data.identityPublicationConsent !== true) {
        return errorResponse("Testimonial publication requires explicit publication and identity consent.", 403);
      }
    }
    if (nextStatus === "approved" || nextStatus === "published" || nextStatus === "rejected") {
      const data = (updates.data as Record<string, unknown> | undefined) ?? existingRecord.data;
      updates.data = {
        ...data,
        moderationDecisionAt: new Date().toISOString(),
        moderationDecisionBy: auth.user.id,
        moderationReason: nextStatus === "rejected"
          ? (body.rejectionReason as string).trim().slice(0, 1000)
          : "",
      };
    }
  }
  if (updates.status === "published" || updates.status === "approved") {
    if (existingRecord.collection === "testimonials" &&
      (existingRecord.data?.consent !== true || existingRecord.data?.identityPublicationConsent !== true) &&
      (!updates.data || (updates.data as Record<string, unknown>).consent !== true || (updates.data as Record<string, unknown>).identityPublicationConsent !== true)) {
      return errorResponse("Testimonial publication requires explicit publication and identity consent.", 403);
    }
  }
  let mutation = auth.supabase.from("cms_content").update(updates).eq("id", id);
  if (existingRecord.collection === "testimonials" && typeof updates.status === "string") {
    mutation = mutation.eq("status", existingRecord.status);
  }
  const { data: row, error } = await mutation
    .select("id, collection, slug, status, data, metadata, created_at, updated_at").maybeSingle();
  if (error) return errorResponse(error.code === "23505" ? "A record with this slug already exists in this section." : "Could not update content.", error.code === "23505" ? 409 : 500);
  if (!row) {
    return existingRecord.collection === "testimonials" && typeof updates.status === "string"
      ? errorResponse("This testimonial changed in another session. Refresh and try again.", 409)
      : errorResponse("Record not found.", 404);
  }
  if (row.collection === "testimonials" && existingRecord.status !== row.status) {
    const notificationStatus = row.status === "approved" || row.status === "published" || row.status === "rejected"
      ? await sendTestimonialModerationEmail(auth.supabase, row, row.status)
      : "skipped";
    if (updates.data && existingRecord.data) {
      const oldPaths = [existingRecord.data.imagePath, existingRecord.data.videoPath]
        .filter((path): path is string => typeof path === "string");
      const newPaths = [row.data.imagePath, row.data.videoPath]
        .filter((path): path is string => typeof path === "string");
      await cleanupUnreferencedTestimonialMedia(
        auth.supabase,
        oldPaths.filter((path) => !newPaths.includes(path)),
        row.id,
      );
    }
    revalidateContent(row.collection, row.slug, typeof row.data?.sourcePath === "string" ? row.data.sourcePath : undefined);
    return NextResponse.json({
      record: await hydrateTestimonialMedia(auth.supabase, row),
      notificationStatus,
    });
  }
  if (row.collection === "testimonials" && updates.data && existingRecord.data) {
    const oldPaths = [existingRecord.data.imagePath, existingRecord.data.videoPath]
      .filter((path): path is string => typeof path === "string");
    const newPaths = [row.data.imagePath, row.data.videoPath]
      .filter((path): path is string => typeof path === "string");
    await cleanupUnreferencedTestimonialMedia(
      auth.supabase,
      oldPaths.filter((path) => !newPaths.includes(path)),
      row.id,
    );
  }
  revalidateContent(row.collection, row.slug, typeof row.data?.sourcePath === "string" ? row.data.sourcePath : undefined);
  return NextResponse.json({ record: await hydrateTestimonialMedia(auth.supabase, row) });
}

export async function DELETE(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return errorResponse("Supabase is not configured.", 503);
  if (!auth.user || !auth.supabase) return errorResponse("Authentication required.", 401);
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return errorResponse("Record id is required.", 400);
  const { data: existing, error: existingError } = await auth.supabase
    .from("cms_content")
    .select("collection, slug, data")
    .eq("id", id)
    .maybeSingle();
  if (existingError) return errorResponse("Could not load the content record.", 500);
  if (!existing) return errorResponse("Record not found.", 404);
  if (
    existing.data?.sourceDefined === true ||
    getSourceContentRecords(existing.collection).some((record) => record.slug === existing.slug)
  ) {
    return errorResponse("Source-defined website content cannot be deleted. Set its status to Archived to remove it from public views.", 409);
  }
  const { data, error } = await auth.supabase.from("cms_content").delete().eq("id", id).select("id").maybeSingle();
  if (error) return errorResponse("Could not delete content.", 500);
  if (!data) return errorResponse("Record not found.", 404);
  if (existing.collection === "testimonials") {
    const paths = [existing.data.imagePath, existing.data.videoPath]
      .filter((path): path is string => typeof path === "string");
    await cleanupUnreferencedTestimonialMedia(auth.supabase, paths);
  }
  revalidateContent(existing.collection, existing.slug);
  return NextResponse.json({ success: true });
}
