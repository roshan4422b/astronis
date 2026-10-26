import "server-only";

export const passwordRecoveryCookie = "astronis-password-recovery";

export function getApplicationBaseUrl() {
  const configuredUrl = process.env.APP_BASE_URL?.trim();
  const value = configuredUrl || (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000");
  if (!value) throw new Error("APP_BASE_URL must be configured in production.");

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("APP_BASE_URL must be a valid origin.");
  }

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    (process.env.NODE_ENV === "production" && url.protocol !== "https:")
  ) {
    throw new Error("APP_BASE_URL must be an origin, and production origins must use HTTPS.");
  }

  return url.origin;
}
