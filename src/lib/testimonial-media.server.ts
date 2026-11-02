import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { getSourceContentRecords } from "@/lib/cms/source-content";
import { testimonialMediaBucket } from "@/lib/testimonial-media";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export function getTestimonialMediaService() {
  return createSupabaseServiceClient();
}

export async function uploadTestimonialMedia(
  client: SupabaseClient,
  file: File,
  submissionId: string,
) {
  const contentType = file.type.split(";")[0];
  const extension = contentType === "image/jpeg"
    ? "jpg"
    : contentType === "image/png"
      ? "png"
      : contentType === "image/webp"
        ? "webp"
        : contentType === "image/avif"
          ? "avif"
          : contentType === "video/mp4"
            ? "mp4"
            : contentType === "video/quicktime"
              ? "mov"
              : "webm";
  const path = `testimonials/${submissionId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from(testimonialMediaBucket).upload(
    path,
    new Uint8Array(await file.arrayBuffer()),
    {
      contentType,
      cacheControl: "3600",
      upsert: false,
    },
  );
  if (error) throw error;
  return path;
}

export async function signTestimonialMedia(
  client: SupabaseClient,
  paths: string[],
) {
  const uniquePaths = [...new Set(paths.filter(Boolean))];
  if (!uniquePaths.length) return new Map<string, string>();
  const { data, error } = await client.storage
    .from(testimonialMediaBucket)
    .createSignedUrls(uniquePaths, 60 * 60);
  if (error) {
    console.error("[testimonials] Private media URL signing failed.", {
      code: error.name || "unknown",
    });
    return new Map<string, string>();
  }
  return new Map(
    (data ?? []).flatMap((asset) =>
      asset.path && asset.signedUrl ? [[asset.path, asset.signedUrl] as const] : [],
    ),
  );
}

export async function checkTestimonialMediaReferences(
  client: SupabaseClient,
  path: string,
  excludingId?: string,
) {
  const fields = ["imagePath", "videoPath", "imageUrl", "videoUrl", "featuredImage"];
  const references = await Promise.all(fields.map((field) => {
    let query = client.from("cms_content").select("id").contains("data", { [field]: path });
    if (excludingId) query = query.neq("id", excludingId);
    return query.limit(1);
  }));
  const error = references.find((result) => result.error)?.error;
  if (error) return { referenced: false, error };
  const sourceReferences = getSourceContentRecords().some((record) =>
    Object.values(record.data).some((value) => typeof value === "string" && value.includes(path)),
  );
  return {
    referenced: sourceReferences || references.some((result) => result.data?.length),
    error: null,
  };
}
