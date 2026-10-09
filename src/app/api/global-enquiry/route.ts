const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedExtensions = /\.(pdf|doc|docx|jpe?g|png)$/i;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ message: "This request is not permitted." }, { status: 403 });

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_FILE_SIZE + 100_000) return Response.json({ message: "Your attachment must be smaller than 10 MB." }, { status: 413 });

  let data: FormData;
  try { data = await request.formData(); }
  catch { return Response.json({ message: "Please submit a valid enquiry." }, { status: 400 }); }

  const field = (key: string) => String(data.get(key) || "").trim();
  const fields = {
    name: field("name"), company: field("company"), email: field("email"), phone: field("phone"),
    location: field("location"), jurisdiction: field("jurisdiction"), interest: field("interest"),
    service: field("service"), sector: field("sector"), timeline: field("timeline"),
    message: field("message"), consent: field("consent"), website: field("website"),
    communication: data.getAll("communication").map(String).filter(Boolean),
  };
  if (fields.website) return Response.json({ message: "Unable to submit this enquiry." }, { status: 400 });
  if (fields.name.length < 2 || !/^\S+@\S+\.\S+$/.test(fields.email) || !fields.company || !fields.phone || !fields.interest || fields.message.length < 10 || fields.consent !== "yes" || Object.values(fields).some((value) => typeof value === "string" && value.length > 5000)) {
    return Response.json({ message: "Please complete all required fields and provide your consent." }, { status: 400 });
  }

  const upload = data.get("attachment");
  let attachment: { name: string; mimeType: string; base64: string } | undefined;
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > MAX_FILE_SIZE || !allowedExtensions.test(upload.name)) return Response.json({ message: "Please upload a PDF, DOC, DOCX, JPG or PNG smaller than 10 MB." }, { status: 400 });
    attachment = { name: upload.name.slice(0, 160), mimeType: upload.type || "application/octet-stream", base64: Buffer.from(await upload.arrayBuffer()).toString("base64") };
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ success: false, message: "We couldn't submit your enquiry. Please try again." }, { status: 503 });
  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ ...fields, website: undefined, type: "global-enquiry", attachment, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ message: "Thank you. Your enquiry has been received. Our team will contact you shortly." });
  } catch {
    return Response.json({ message: "We could not deliver your enquiry. Please try again or contact our team directly." }, { status: 502 });
  }
}
