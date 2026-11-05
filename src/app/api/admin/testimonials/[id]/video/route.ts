import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { getTestimonialMediaService } from "@/lib/testimonial-media.server";
import { isTestimonialMediaPath, testimonialMediaBucket } from "@/lib/testimonial-media";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { id } = await context.params;
  const { data: record, error: recordError } = await auth.supabase
    .from("cms_content")
    .select("data")
    .eq("id", id)
    .eq("collection", "testimonials")
    .maybeSingle();
  if (recordError) {
    console.error("[admin-testimonials] Video preview lookup failed.", {
      code: recordError.code || "unknown",
    });
    return NextResponse.json({ error: "Could not load testimonial video." }, { status: 500 });
  }
  if (!record) return NextResponse.json({ error: "Testimonial video was not found." }, { status: 404 });

  const videoPath = typeof record.data?.videoPath === "string" ? record.data.videoPath : "";
  if (!isTestimonialMediaPath(videoPath) || !/\.(?:mp4|webm|mov)$/i.test(videoPath)) {
    return NextResponse.json({ error: "Testimonial video was not found." }, { status: 404 });
  }

  const service = getTestimonialMediaService();
  if (!service) {
    return NextResponse.json({ error: "Private media service is not configured." }, { status: 503 });
  }

  const { data, error } = await service.storage
    .from(testimonialMediaBucket)
    .createSignedUrl(videoPath, 15 * 60);
  if (error || !data?.signedUrl) {
    console.error("[admin-testimonials] Video preview URL could not be created.", {
      code: error?.name || "unknown",
    });
    return NextResponse.json({ error: "Could not open testimonial video." }, { status: 500 });
  }
  try {
    const upstream = await fetch(data.signedUrl, {
      headers: {
        ...(typeof _request.headers.get("range") === "string"
          ? { Range: _request.headers.get("range") as string }
          : {}),
      },
      cache: "no-store",
    });
    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json(
        { error: "The uploaded video is unavailable in Storage." },
        { status: upstream.status === 404 ? 404 : 502 },
      );
    }
    const contentType = upstream.headers.get("content-type")
      || (videoPath.endsWith(".mov") ? "video/quicktime"
        : videoPath.endsWith(".webm") ? "video/webm"
          : "video/mp4");
    const response = new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Accept-Ranges": "bytes",
        "Cache-Control": "private, no-store",
        ...(upstream.headers.get("content-range")
          ? { "Content-Range": upstream.headers.get("content-range") as string }
          : {}),
        ...(upstream.headers.get("content-length")
          ? { "Content-Length": upstream.headers.get("content-length") as string }
          : {}),
      },
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Could not stream the uploaded video. Please try again." },
      { status: 502 },
    );
  }
}
