import { TESTIMONIAL_AGREEMENT_VERSION } from "@/lib/testimonial-consent";
import {
  consumeEmailVerification,
  createVerifiedTestimonialEmailProof,
  verificationFailure,
} from "@/lib/form-verification.server";
import {
  testimonialImageMaxBytes,
  testimonialImageTypes,
  testimonialMediaBucket,
  testimonialVideoMaxBytes,
  testimonialVideoTypes,
} from "@/lib/testimonial-media";
import {
  getTestimonialMediaService,
  uploadTestimonialMedia,
} from "@/lib/testimonial-media.server";
import { SupabaseServiceConfigurationError } from "@/lib/supabase/service";

function hasValidMediaSignature(type: string, bytes: Uint8Array) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
  if (type === "image/webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (type === "image/avif") return String.fromCharCode(...bytes.slice(4, 12)).includes("ftypavif");
  if (type === "video/webm") return bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3;
  if (type === "video/mp4" || type === "video/quicktime") return String.fromCharCode(...bytes.slice(4, 8)) === "ftyp";
  return false;
}

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
    !/^[1-5]$/.test(get("rating")) ||
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
      video.size > testimonialVideoMaxBytes ||
      !testimonialVideoTypes.has(video.type.split(";")[0]))
  )
    return Response.json(
      { message: "Please submit an MP4, WebM or MOV video under 20 MB." },
      { status: 400 },
    );
  if (
    photo instanceof File &&
    photo.size &&
    (photo.size > testimonialImageMaxBytes ||
      !testimonialImageTypes.has(photo.type))
  )
    return Response.json(
      { message: "Please use a JPG, PNG, WebP or AVIF photograph under 3 MB." },
      { status: 400 },
    );
  if (photo instanceof File && photo.size && get("photoPublicationConsent") !== "yes")
    return Response.json(
      { message: "Please authorise publication of the submitted photograph or remove it." },
      { status: 400 },
    );
  const webhook = process.env.TESTIMONIAL_WEBHOOK_URL;
  let serviceClient: ReturnType<typeof getTestimonialMediaService>;
  try {
    serviceClient = getTestimonialMediaService();
  } catch (error) {
    console.error("[testimonials] Supabase service client initialization failed.",
      error instanceof SupabaseServiceConfigurationError
        ? { invalidConfiguration: error.variableName }
        : { error: error instanceof Error ? error.name : "UnknownError" },
    );
    const message = error instanceof SupabaseServiceConfigurationError
      ? "Secure testimonial submission has an invalid NEXT_PUBLIC_SUPABASE_URL configuration. Please contact the website team."
      : "Secure testimonial submission is not configured. Please try again later.";
    return Response.json(
      { message },
      { status: 503 },
    );
  }
  if (!serviceClient) {
    const missingConfiguration = [
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ? "NEXT_PUBLIC_SUPABASE_URL" : "",
      !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ? "SUPABASE_SERVICE_ROLE_KEY" : "",
    ].filter(Boolean);
    console.error("[testimonials] Supabase service client is unavailable.", {
      missingConfiguration,
    });
    const message = missingConfiguration.length
      ? `Secure testimonial submission is not configured. Missing server variable${missingConfiguration.length === 1 ? "" : "s"}: ${missingConfiguration.join(", ")}. Please contact the website team.`
      : "Secure testimonial submission is not configured. Please try again later.";
    return Response.json(
      { message },
      { status: 503 },
    );
  }
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
  const verificationResponse = verificationFailure(
    await consumeEmailVerification(get("email"), get("emailVerificationToken")),
  );
  if (verificationResponse) return verificationResponse;
  const submissionId = crypto.randomUUID();
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
  const emailVerificationProof = createVerifiedTestimonialEmailProof(get("email"), consentAcceptedAt);
  const uploadedPaths: string[] = [];
  let imagePath = "";
  let videoPath = "";
  const cleanupUploadedMedia = async () => {
    if (!uploadedPaths.length) return;
    const { error } = await serviceClient.storage.from(testimonialMediaBucket).remove(uploadedPaths);
    if (error) {
      console.error("[testimonials] Uploaded media cleanup failed.", {
        code: error.name || "unknown",
      });
    }
  };
  try {
    if (photo instanceof File && photo.size) {
      const photoType = photo.type.split(";")[0];
      if (!hasValidMediaSignature(photoType, new Uint8Array(await photo.arrayBuffer()))) {
        return Response.json({ message: "The photograph content does not match its file type." }, { status: 415 });
      }
      imagePath = await uploadTestimonialMedia(serviceClient, photo, submissionId);
      uploadedPaths.push(imagePath);
    }
    if (format === "video" && video instanceof File) {
      const videoType = video.type.split(";")[0];
      if (!hasValidMediaSignature(videoType, new Uint8Array(await video.arrayBuffer()))) {
        await cleanupUploadedMedia();
        return Response.json({ message: "The video content does not match its file type." }, { status: 415 });
      }
      videoPath = await uploadTestimonialMedia(serviceClient, video, submissionId);
      uploadedPaths.push(videoPath);
    }
  } catch (error) {
    await cleanupUploadedMedia();
    console.error("[testimonials] Private media upload failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return Response.json(
      { message: "We could not securely store your media. Please try again later." },
      { status: 503 },
    );
  }
  if (imagePath) data.set("imagePath", imagePath);
  if (videoPath) data.set("videoPath", videoPath);
  const videoSource = videoPath
    ? get("videoSource") === "recorded" ? "recorded" : "uploaded"
    : "";
  if (videoSource) data.set("videoSource", videoSource);
  const testimonial = {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    designation: get("designation"),
    service: get("service"),
    rating: Number(get("rating")),
    format,
    text: get("message"),
    excerpt: get("message").slice(0, 240),
    consent: true,
    identityPublicationConsent: get("identityPublicationConsent") === "yes",
    consentAcceptedAt,
    agreementVersion: TESTIMONIAL_AGREEMENT_VERSION,
    emailVerified: true,
    emailVerificationProof,
    photoPublicationConsent: get("photoPublicationConsent") === "yes",
    imagePath,
    videoPath,
    videoSource,
    mediaSubmitted: Boolean((video instanceof File && video.size) || (photo instanceof File && photo.size)),
  };
  const { error: persistenceError } = await serviceClient.from("cms_content").insert({
    collection: "testimonials",
    slug: `submission-${submissionId}`,
    status: "pending",
    data: testimonial,
  });
  if (persistenceError) {
    await cleanupUploadedMedia();
    const code = persistenceError.code || "unknown";
    console.error("[testimonials] CMS insert failed.", { code });
    const message = code === "42501"
      ? "The CMS database denied this submission. Please contact the website team to check its submission permissions."
      : code === "42P01" || code === "PGRST205"
        ? "The testimonial CMS is not available. Please contact the website team to check its database migrations."
        : code === "23514"
          ? "The CMS rejected this testimonial's fields. Please review the required fields and try again."
          : "We could not save your testimonial for review. Please try again later.";
    return Response.json({ message }, { status: 503 });
  }
  try {
    if (!webhook)
      return Response.json({
        submissionSaved: true,
          message: "Thank you for sharing your experience with Astronis Global. Your testimonial has been submitted successfully and is awaiting review by our team. You will receive an email notification once a decision has been made.",
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
      submissionSaved: true,
      message:
        "Thank you for sharing your experience with Astronis Global. Your testimonial has been submitted successfully and is awaiting review by our team. You will receive an email notification once a decision has been made.",
    });
  } catch {
    console.error("[testimonials] Submission saved, but webhook delivery failed.");
    return Response.json({
      submissionSaved: true,
      message:
        "Your testimonial was saved for review, but we could not confirm delivery of its attachment or notification. Please contact advisory@astronisglobal.com and do not submit it again.",
    });
  }
}
