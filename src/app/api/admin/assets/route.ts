import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import {
  testimonialImageMaxBytes,
  testimonialImageTypes,
  testimonialMediaBucket,
  testimonialVideoMaxBytes,
  testimonialVideoTypes,
} from "@/lib/testimonial-media";
import { checkTestimonialMediaReferences } from "@/lib/testimonial-media.server";

export const runtime = "nodejs";
const allowed = new Map([
  ["image/jpeg", new Set(["jpg", "jpeg"])],
  ["image/png", new Set(["png"])],
  ["image/webp", new Set(["webp"])],
  ["image/avif", new Set(["avif"])],
  ["application/pdf", new Set(["pdf"])],
]);

function hasValidSignature(type: string, bytes: Uint8Array) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
  if (type === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (type === "image/avif") return String.fromCharCode(...bytes.slice(4, 12)).includes("ftypavif");
  if (type === "application/pdf") return String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  if (type === "video/webm") return bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3;
  if (type === "video/mp4" || type === "video/quicktime") return String.fromCharCode(...bytes.slice(4, 8)) === "ftyp";
  return false;
}

export async function POST(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let form: FormData;
  try { form = await request.formData(); } catch { return NextResponse.json({ error: "A file upload is required." }, { status: 400 }); }
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "A file upload is required." }, { status: 400 });
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const visibility = form.get("visibility") === "private" ? "private" : "public";
  const testimonialUpload = form.get("purpose") === "testimonial";
  const contentType = file.type.split(";")[0];
  if (testimonialUpload && visibility !== "private") return NextResponse.json({ error: "Testimonial media must remain private." }, { status: 400 });
  if (testimonialUpload) {
    const isImage = testimonialImageTypes.has(contentType);
    const isVideo = testimonialVideoTypes.has(contentType);
    const maxBytes = isImage ? testimonialImageMaxBytes : isVideo ? testimonialVideoMaxBytes : 0;
    if (!maxBytes) return NextResponse.json({ error: "Upload a supported testimonial image or video." }, { status: 415 });
    if (!file.size || file.size > maxBytes) return NextResponse.json({ error: isImage ? "Testimonial images must be 3 MB or smaller." : "Testimonial videos must be 20 MB or smaller." }, { status: 413 });
    const validExtensions = contentType === "image/jpeg" ? ["jpg", "jpeg"]
      : contentType === "image/png" ? ["png"]
        : contentType === "image/webp" ? ["webp"]
          : contentType === "image/avif" ? ["avif"]
            : contentType === "video/mp4" ? ["mp4"]
              : contentType === "video/quicktime" ? ["mov"]
                : ["webm"];
    if (!validExtensions.includes(extension)) return NextResponse.json({ error: "The file extension does not match its media type." }, { status: 415 });
  } else {
    if (!file.size || file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Files must be smaller than 10 MB." }, { status: 413 });
    const extensions = allowed.get(contentType);
    if (!extensions?.has(extension)) return NextResponse.json({ error: "Unsupported file type. Upload JPG, PNG, WebP, AVIF, or PDF." }, { status: 415 });
    if (visibility === "private" && contentType !== "application/pdf") return NextResponse.json({ error: "Private assets currently support PDF documents only." }, { status: 415 });
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!hasValidSignature(contentType, bytes)) return NextResponse.json({ error: "The file content does not match its declared type." }, { status: 415 });
  const path = testimonialUpload
    ? `${auth.user.id}/testimonials/${crypto.randomUUID()}.${extension}`
    : `${auth.user.id}/${crypto.randomUUID()}.${extension}`;
  const bucket = testimonialUpload ? testimonialMediaBucket : visibility === "private" ? "cms-private-assets" : "cms-assets";
  const { error } = await auth.supabase.storage.from(bucket).upload(path, bytes, {
    contentType,
    cacheControl: "3600",
    upsert: false,
  });
  if (error) return NextResponse.json({ error: "Asset upload failed." }, { status: 500 });
  if (visibility === "private") {
    const { data, error: signedUrlError } = await auth.supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
    if (signedUrlError) {
      await auth.supabase.storage.from(bucket).remove([path]);
      return NextResponse.json({ error: "Private asset URL could not be created." }, { status: 500 });
    }
    return NextResponse.json({ path, url: data.signedUrl, visibility, bucket }, { status: 201 });
  }
  const { data } = auth.supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ path, url: data.publicUrl, visibility, bucket }, { status: 201 });
}

export async function DELETE(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let body: { path?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const path = typeof body.path === "string" ? body.path : "";
  const ownedPath = new RegExp(`^${auth.user.id}/testimonials/[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\\.(?:jpe?g|png|webp|avif|mp4|webm|mov)$`, "i");
  if (!ownedPath.test(path)) return NextResponse.json({ error: "This media file cannot be removed through this action." }, { status: 400 });

  const references = await checkTestimonialMediaReferences(auth.supabase, path);
  if (references.error) return NextResponse.json({ error: "Could not confirm whether this media file is in use." }, { status: 500 });
  if (references.referenced) {
    return NextResponse.json({ error: "This media file is still referenced by saved CMS content." }, { status: 409 });
  }
  const { error } = await auth.supabase.storage.from(testimonialMediaBucket).remove([path]);
  return error
    ? NextResponse.json({ error: "The unused media file could not be removed." }, { status: 500 })
    : NextResponse.json({ success: true });
}
