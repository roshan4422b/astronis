export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { message: "This request is not permitted." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 24 * 1024 * 1024)
    return Response.json(
      {
        message:
          "Your upload is too large. Please use a video under 20 MB and a photo under 3 MB.",
      },
      { status: 413 },
    );
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json(
      { message: "Please submit a valid testimonial." },
      { status: 400 },
    );
  }
  const get = (k: string) => String(data.get(k) || "").trim();
  const format = get("format");
  if (
    get("website") ||
    get("name").length < 2 ||
    !/^\S+@\S+\.\S+$/.test(get("email")) ||
    !get("company") ||
    !get("service") ||
    get("consent") !== "yes" ||
    !["written", "video"].includes(format) ||
    ["name", "email", "company", "designation", "phone", "service"].some(
      (k) => get(k).length > 200,
    ) ||
    get("message").length > 5000
  )
    return Response.json(
      {
        message:
          "Please complete the required fields and provide publication consent.",
      },
      { status: 400 },
    );
  if (format === "written" && get("message").length < 20)
    return Response.json(
      { message: "Please write a testimonial of at least 20 characters." },
      { status: 400 },
    );
  const video = data.get("video"),
    photo = data.get("photo");
  if (
    format === "video" &&
    (!(video instanceof File) ||
      !video.size ||
      video.size > 20 * 1024 * 1024 ||
      !["video/mp4", "video/webm", "video/quicktime"].includes(
        video.type.split(";")[0],
      ))
  )
    return Response.json(
      { message: "Please submit an MP4, WebM or MOV video under 20 MB." },
      { status: 400 },
    );
  if (
    photo instanceof File &&
    photo.size &&
    (photo.size > 3 * 1024 * 1024 ||
      !["image/jpeg", "image/png"].includes(photo.type))
  )
    return Response.json(
      { message: "Please use a JPG or PNG photograph under 3 MB." },
      { status: 400 },
    );
  const webhook = process.env.TESTIMONIAL_WEBHOOK_URL;
  if (!webhook)
    return Response.json(
      {
        message:
          "Online submissions are not available yet. Please email advisory@astronisglobal.com to share your experience. Your testimonial has not been submitted.",
      },
      { status: 503 },
    );
  data.set("status", "pending-review");
  data.set("submittedAt", new Date().toISOString());
  try {
    if (new URL(webhook).protocol !== "https:")
      throw new Error("HTTPS required");
    const result = await fetch(webhook, {
      method: "POST",
      headers: process.env.TESTIMONIAL_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.TESTIMONIAL_WEBHOOK_TOKEN}` }
        : {},
      body: data,
      signal: AbortSignal.timeout(20000),
    });
    if (!result.ok) throw new Error("Delivery failed");
    return Response.json({
      message:
        "Thank you. Your testimonial has been submitted for review. It will only be published after approval.",
    });
  } catch {
    return Response.json(
      {
        message:
          "We could not deliver your testimonial. Please try again or contact our team.",
      },
      { status: 502 },
    );
  }
}
