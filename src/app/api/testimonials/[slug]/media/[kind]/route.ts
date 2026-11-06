import { NextResponse } from "next/server";
import { getPublicTestimonials } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string; kind: string }> },
) {
  const { slug, kind } = await context.params;
  if (kind !== "image" && kind !== "video") {
    return NextResponse.json({ error: "Unsupported media type." }, { status: 404 });
  }

  const testimonial = (await getPublicTestimonials()).find((item) => item.slug === slug);
  if (!testimonial) {
    return NextResponse.json({ error: "Approved testimonial media was not found." }, { status: 404 });
  }
  const mediaUrl = kind === "image" ? testimonial.image_url : testimonial.video_url;
  if (!mediaUrl) {
    return NextResponse.json({ error: "Approved testimonial media was not found." }, { status: 404 });
  }

  try {
    const upstream = await fetch(mediaUrl, {
      headers: request.headers.get("range")
        ? { Range: request.headers.get("range") as string }
        : {},
      cache: "no-store",
    });
    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json(
        { error: "The approved testimonial media is unavailable." },
        { status: upstream.status === 404 ? 404 : 502 },
      );
    }
    const contentType = upstream.headers.get("content-type")
      || (kind === "video" ? "video/mp4" : "image/jpeg");
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Cache-Control": "private, max-age=300",
        ...(kind === "video" ? { "Accept-Ranges": "bytes" } : {}),
        ...(upstream.headers.get("content-range")
          ? { "Content-Range": upstream.headers.get("content-range") as string }
          : {}),
        ...(upstream.headers.get("content-length")
          ? { "Content-Length": upstream.headers.get("content-length") as string }
          : {}),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The approved testimonial media could not be loaded." },
      { status: 502 },
    );
  }
}
