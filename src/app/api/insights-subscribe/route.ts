export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ message: "This request is not permitted." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 5000) return Response.json({ message: "Your request is too long." }, { status: 413 });
  let data: FormData;
  try { data = await request.formData(); }
  catch { return Response.json({ message: "Please submit a valid email address." }, { status: 400 }); }
  const email = String(data.get("email") || "").trim();
  const consent = String(data.get("consent") || "");
  if (email.length > 180 || !/^\S+@\S+\.\S+$/.test(email) || consent !== "yes") return Response.json({ message: "Please enter a valid email address and provide your consent." }, { status: 400 });
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ message: "Online update requests are not available yet. Please email advisory@astronisglobal.com. Your request has not been sent." }, { status: 503 });
  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ type: "insights-update-request", email, consent, submittedAt: new Date().toISOString() }), signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ message: "Thank you. Your request for updates has been received." });
  } catch {
    return Response.json({ message: "We could not send your request. Please try again or email our team." }, { status: 502 });
  }
}
