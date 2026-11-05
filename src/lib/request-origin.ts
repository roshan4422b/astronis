function firstHeaderValue(request: Request, name: string) {
  return request.headers.get(name)?.split(",")[0]?.trim();
}

function originForHost(protocol: string, host: string | null) {
  if (!host || (protocol !== "http:" && protocol !== "https:")) return null;
  try {
    const url = new URL(`${protocol}//${host}`);
    if (
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  let requestUrl: URL;
  let originUrl: URL;
  try {
    requestUrl = new URL(request.url);
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  if (originUrl.origin !== origin) return false;
  if (originUrl.origin === requestUrl.origin) return true;

  const forwardedProtocol = firstHeaderValue(request, "x-forwarded-proto");
  const protocols = new Set([requestUrl.protocol]);
  if (forwardedProtocol) protocols.add(`${forwardedProtocol.replace(/:$/, "")}:`);

  const hosts = new Set([
    request.headers.get("host"),
    firstHeaderValue(request, "x-forwarded-host"),
  ].filter((host): host is string => Boolean(host)));

  return [...protocols].some((protocol) =>
    [...hosts].some((host) => originForHost(protocol, host) === originUrl.origin),
  );
}
