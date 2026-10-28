import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getSourceContentRecords } from "@/lib/cms/source-content";

export const adminRememberCookie = "astronis-admin-remember";
const persistentSessionAge = 60 * 60 * 24 * 30;

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function createSupabaseServerClient(options: { rememberMe?: boolean } = {}) {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();
  const rememberMe = options.rememberMe ?? cookieStore.get(adminRememberCookie)?.value === "1";
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      ...(rememberMe ? { cookieOptions: { maxAge: persistentSessionAge } } : {}),
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (values) => {
          try {
            values.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server components cannot mutate cookies; middleware/API routes can refresh them.
          }
        },
      },
    },
  );
}

export async function getAuthorizedAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { configured: false as const, supabase: null, user: null };
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { configured: true as const, supabase, user: null };
  const { data: admin, error: adminError } = await supabase
    .from("cms_admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (adminError || !admin) return { configured: true as const, supabase, user: null };
  return { configured: true as const, supabase, user };
}

export type PublishedCmsContent = {
  slug: string;
  data: Record<string, unknown>;
};

function logCmsRpcError(
  operation: string,
  error: {
    code?: string;
    message?: string;
    details?: string;
    hint?: string;
  } | string,
) {
  const diagnostic = typeof error === "string" ? { code: error } : error;
  console.error(`[cms] ${operation} RPC failed`, {
    code: diagnostic.code || "unknown",
    message: diagnostic.message || "No error message provided.",
    ...(diagnostic.details ? { details: diagnostic.details } : {}),
    ...(diagnostic.hint ? { hint: diagnostic.hint } : {}),
  });
}

function metadataText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function safeCanonical(value: unknown, fallbackPath?: string) {
  const canonical = metadataText(value);
  if (canonical.startsWith("/") && !canonical.startsWith("//") && !/[\s\\]/.test(canonical)) {
    return canonical;
  }
  try {
    const url = new URL(canonical);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    // Use the route's canonical path when the optional CMS value is invalid.
  }
  return fallbackPath;
}

export function getPublishedContentMetadata(
  record: PublishedCmsContent,
  fallbackPath?: string,
): Metadata {
  const { data } = record;
  const title = metadataText(data.seoTitle) || metadataText(data.title);
  const description = metadataText(data.seoDescription) || metadataText(data.description);
  const canonical = safeCanonical(data.canonicalUrl, fallbackPath);
  const ogTitle = metadataText(data.ogTitle);
  const ogDescription = metadataText(data.ogDescription);
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(ogTitle || ogDescription
      ? { openGraph: { ...(ogTitle ? { title: ogTitle } : {}), ...(ogDescription ? { description: ogDescription } : {}) } }
      : {}),
    robots: {
      index: data.robotsIndex !== false,
      follow: data.robotsFollow !== false,
    },
  };
}

const publicCollections = new Set([
  "services",
  "industries",
  "professionals",
  "global-presence",
  "technology",
  "insights",
]);

export async function getPublishedContent(collection: string): Promise<PublishedCmsContent[]> {
  if (!publicCollections.has(collection)) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("cms_public_content", {
    requested_collection: collection,
  });
  if (error) {
    logCmsRpcError("cms_public_content", error);
    return [];
  }
  if (!Array.isArray(data)) {
    logCmsRpcError("cms_public_content", "invalid_response");
    return [];
  }
  const sourceSlugs = new Set(getSourceContentRecords(collection).map((record) => record.slug));
  return data.filter((record): record is PublishedCmsContent =>
    record !== null &&
    typeof record === "object" &&
    typeof record.slug === "string" &&
    record.data !== null &&
    typeof record.data === "object" &&
    !Array.isArray(record.data),
  ).map((record) => ({
    ...record,
    data: {
      ...record.data,
      ...(record.data.sourceDefined === true || sourceSlugs.has(record.slug) ? { sourceDefined: true } : {}),
    },
  }));
}

export async function getUnpublishedSourceContentSlugs(collection: string): Promise<Set<string>> {
  if (!publicCollections.has(collection)) return new Set<string>();

  const supabase = await createSupabaseServerClient();
  if (!supabase) return new Set<string>();
  const { data, error } = await supabase.rpc("cms_unpublished_source_content_slugs", {
    requested_collection: collection,
  });
  if (error) {
    logCmsRpcError("cms_unpublished_source_content_slugs", error);
    return new Set<string>();
  }
  if (!Array.isArray(data)) {
    logCmsRpcError("cms_unpublished_source_content_slugs", "invalid_response");
    return new Set<string>();
  }
  return new Set(
    data.flatMap((record) =>
      record && typeof record === "object" && "slug" in record && typeof record.slug === "string"
        ? [record.slug]
        : [],
    ),
  );
}

export type PublicCmsTestimonial = {
  slug: string;
  name: string;
  company: string;
  designation: string;
  service: string;
  testimonial_text: string;
};

export async function getPublicTestimonials(): Promise<PublicCmsTestimonial[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase.rpc("cms_public_testimonials");
  if (error) {
    logCmsRpcError("cms_public_testimonials", error);
    return [];
  }
  if (!Array.isArray(data)) {
    logCmsRpcError("cms_public_testimonials", "invalid_response");
    return [];
  }
  return data.filter((record): record is PublicCmsTestimonial =>
    record !== null &&
    typeof record === "object" &&
    typeof record.slug === "string" &&
    typeof record.name === "string" &&
    typeof record.company === "string" &&
    typeof record.designation === "string" &&
    typeof record.service === "string" &&
    typeof record.testimonial_text === "string",
  );
}

export type PublishedCmsPage = {
  slug: string;
  data: Record<string, unknown>;
};

const publicPageFields = [
  "title",
  "category",
  "description",
  "content",
  "featuredImage",
  "seoTitle",
  "seoDescription",
  "ogTitle",
  "ogDescription",
  "canonicalUrl",
  "robotsIndex",
  "robotsFollow",
] as const;

export async function getPublishedCmsPage(path: string): Promise<PublishedCmsPage | null> {
  const normalizedPath = path === "/" ? "/" : `/${path.split("/").filter(Boolean).join("/")}`;
  if (!/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/?)*$/.test(normalizedPath)) return null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("cms_published_page", {
    requested_path: normalizedPath,
  });
  if (error) {
    logCmsRpcError("cms_published_page", error);
    return null;
  }
  if (!Array.isArray(data) || !data.length) return null;

  const row = data[0] as { slug?: unknown; data?: unknown };
  if (
    typeof row.slug !== "string" ||
    !row.data ||
    typeof row.data !== "object" ||
    Array.isArray(row.data)
  ) return null;

  const sourceData = row.data as Record<string, unknown>;
  const publicData = Object.fromEntries(
    publicPageFields
      .filter((field) => Object.hasOwn(sourceData, field))
      .map((field) => [field, sourceData[field]]),
  );
  return { slug: row.slug, data: publicData };
}

export async function getSourceTestimonialSlugs(): Promise<Set<string>> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return new Set<string>();
  const { data, error } = await supabase.rpc("cms_source_testimonial_slugs");
  if (error) {
    logCmsRpcError("cms_source_testimonial_slugs", error);
    return new Set<string>();
  }
  if (!Array.isArray(data)) {
    logCmsRpcError("cms_source_testimonial_slugs", "invalid_response");
    return new Set<string>();
  }
  const slugs = new Set<string>();
  for (const record of data) {
    if (
      record &&
      typeof record === "object" &&
      "slug" in record &&
      typeof record.slug === "string"
    ) {
      slugs.add(record.slug);
    }
  }
  return slugs;
}

export async function getPublishedPageMetadata(path: string): Promise<Metadata | null> {
  const record = await getPublishedCmsPage(path);
  if (!record) return null;
  const metadata = getPublishedContentMetadata({ slug: record.slug, data: record.data });
  const title = metadataText(record.data.seoTitle) || metadataText(record.data.title);
  return {
    ...metadata,
    ...(title ? { title: { absolute: title } } : {}),
  };
}
