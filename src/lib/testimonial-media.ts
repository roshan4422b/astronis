export const testimonialMediaBucket = "cms-private-assets";
export const testimonialImageMaxBytes = 3 * 1024 * 1024;
export const testimonialVideoMaxBytes = 20 * 1024 * 1024;

export const testimonialImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export const testimonialVideoTypes = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

export function isSupportedTestimonialVideoUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      /\.(mp4|webm|mov)$/i.test(url.pathname);
  } catch {
    return false;
  }
}

export function isTestimonialMediaPath(value: unknown) {
  if (typeof value !== "string") return false;
  return /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/testimonials\/[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpe?g|png|webp|avif|mp4|webm|mov)|testimonials\/[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpe?g|png|webp|avif|mp4|webm|mov))$/i.test(value);
}
