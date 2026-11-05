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

  const response = NextResponse.redirect(new URL(data.signedUrl), 307);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
