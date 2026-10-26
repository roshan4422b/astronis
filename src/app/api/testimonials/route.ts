import { TESTIMONIAL_AGREEMENT_VERSION } from "@/lib/testimonial-consent";
import { consumeEmailVerification, verificationFailure } from "@/lib/form-verification.server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    get("identityPublicationConsent") !== "yes" ||
    !["written", "video"].includes(format) ||
    ["name", "email", "company", "designation", "phone", "service"].some(
      (k) => get(k).length > 200,
    ) ||
    get("message").length > 180
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
  if (photo instanceof File && photo.size && get("photoPublicationConsent") !== "yes")
    return Response.json(
      { message: "Please authorise publication of the submitted photograph or remove it." },
      { status: 400 },
    );
  const verificationResponse = verificationFailure(
    await consumeEmailVerification(get("email"), get("emailVerificationToken")),
  );
  if (verificationResponse) return verificationResponse;
  const webhook = process.env.TESTIMONIAL_WEBHOOK_URL;
  const hasMedia =
    (video instanceof File && video.size > 0) ||
    (photo instanceof File && photo.size > 0);
  if (hasMedia && !webhook)
    return Response.json(
      {
        message:
          "Media submissions are not configured yet. Please remove attachments or try again later.",
      },
      { status: 503 },
    );
  if (webhook) {
    try {
      if (new URL(webhook).protocol !== "https:") throw new Error("HTTPS required");
    } catch {
      console.error("[testimonials] Webhook URL is invalid or does not use HTTPS.");
      return Response.json(
        { message: "Testimonial delivery is not configured correctly. Please try again later." },
        { status: 503 },
      );
    }
  }
  data.set("status", "pending-review");
  const consentAcceptedAt = new Date().toISOString();
  data.set("submittedAt", consentAcceptedAt);
  data.set("consent", "yes");
  data.set("consentAcceptedAt", consentAcceptedAt);
  data.set("agreementVersion", TESTIMONIAL_AGREEMENT_VERSION);
  data.set("publicationChannel", "website");
  data.set("materialType", format === "video" ? "video" : "written-testimonial");
  data.set("photoPublicationConsent", get("photoPublicationConsent") === "yes" ? "yes" : "no");
  data.set("identityPublicationConsent", get("identityPublicationConsent"));
  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return Response.json({ message: "Testimonial submission is not configured yet. Please try again later." }, { status: 503 });
  const submissionId = crypto.randomUUID();
  const testimonial = {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    designation: get("designation"),
    service: get("service"),
    format,
    text: get("message"),
    excerpt: get("message").slice(0, 240),
    consent: true,
    identityPublicationConsent: get("identityPublicationConsent") === "yes",
    consentAcceptedAt,
    agreementVersion: TESTIMONIAL_AGREEMENT_VERSION,
    photoPublicationConsent: get("photoPublicationConsent") === "yes",
    mediaSubmitted: Boolean((video instanceof File && video.size) || (photo instanceof File && photo.size)),
  };
  const { error: persistenceError } = await supabase.from("cms_content").insert({
    collection: "testimonials",
    slug: `submission-${submissionId}`,
    status: "pending",
    data: testimonial,
  });
  if (persistenceError)
    return Response.json({ message: "We could not save your testimonial for review. Please try again." }, { status: 503 });
  try {
    if (!webhook)
      return Response.json({
        message: "Thank you. Your testimonial has been submitted for review. It will only be published after approval.",
      });
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
    console.error("[testimonials] Submission saved, but webhook delivery failed.");
    return Response.json({
      message:
        "Your testimonial was saved for review, but we could not confirm delivery of its media or notification. Please contact advisory@astronisglobal.com before resubmitting.",
    }, { status: 503 });
  }
}
