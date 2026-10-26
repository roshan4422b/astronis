import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

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
  if (!file.size || file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Files must be smaller than 10 MB." }, { status: 413 });
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const visibility = form.get("visibility") === "private" ? "private" : "public";
  const extensions = allowed.get(file.type);
  if (!extensions?.has(extension)) return NextResponse.json({ error: "Unsupported file type. Upload JPG, PNG, WebP, AVIF, or PDF." }, { status: 415 });
  if (visibility === "private" && file.type !== "application/pdf") return NextResponse.json({ error: "Private assets currently support PDF documents only." }, { status: 415 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!hasValidSignature(file.type, bytes)) return NextResponse.json({ error: "The file content does not match its declared type." }, { status: 415 });
  const path = `${auth.user.id}/${crypto.randomUUID()}.${extension}`;
  const bucket = visibility === "private" ? "cms-private-assets" : "cms-assets";
  const { error } = await auth.supabase.storage.from(bucket).upload(path, bytes, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });
  if (error) return NextResponse.json({ error: "Asset upload failed." }, { status: 500 });
  if (visibility === "private") {
    const { data, error: signedUrlError } = await auth.supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
    if (signedUrlError) return NextResponse.json({ error: "Private asset URL could not be created." }, { status: 500 });
    return NextResponse.json({ path, url: data.signedUrl, visibility }, { status: 201 });
  }
  const { data } = auth.supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ path, url: data.publicUrl, visibility }, { status: 201 });
}
