const allowedExtensions = new Set(["pdf", "doc", "docx", "jpg", "jpeg", "png"]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ message: "This request is not permitted." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 25 * 1024 * 1024) return Response.json({ message: "Your attachments exceed the 20 MB total limit." }, { status: 413 });

  let data: FormData;
  try { data = await request.formData(); }
  catch { return Response.json({ message: "Please submit a valid enquiry." }, { status: 400 }); }

  const value = (key: string) => String(data.get(key) || "").trim();
  const fields = {
    connectWith: value("connectWith"), professional: value("professional"), service: value("service"),
    industry: value("industry"), name: value("name"), company: value("company"), email: value("email"),
    countryCode: value("countryCode"), phone: value("phone"), location: value("location"),
    message: value("message"), preferredMode: value("preferredMode"),
    preferredDate: value("preferredDate"), preferredTime: value("preferredTime"),
  };
  if (value("website")) return Response.json({ message: "Unable to submit this enquiry." }, { status: 400 });
  if (!(["specific", "practice", "jurisdiction", "general"].includes(fields.connectWith)) ||
      (fields.connectWith === "specific" && !fields.professional) ||
      (fields.connectWith === "practice" && !fields.service) ||
      (fields.connectWith === "jurisdiction" && !fields.location) ||
      fields.name.length < 2 || !/^\S+@\S+\.\S+$/.test(fields.email) ||
      fields.phone.length < 7 || fields.message.length < 10 || fields.message.length > 1000 ||
      value("consent") !== "yes" || Object.values(fields).some(field => field.length > 1000)) {
    return Response.json({ message: "Please check the required fields and provide your consent." }, { status: 400 });
  }

  const documents = data.getAll("documents").filter((item): item is File => item instanceof File);
  const totalSize = documents.reduce((total, file) => total + file.size, 0);
  if (documents.length > 3 || totalSize > 20 * 1024 * 1024 || documents.some(file => file.size > 10 * 1024 * 1024 || !allowedExtensions.has(file.name.split(".").pop()?.toLowerCase() || ""))) {
    return Response.json({ message: "Add up to three PDF, DOC, DOCX, JPG or PNG files under 10 MB each and 20 MB total." }, { status: 400 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ message: "Online enquiries are not available yet. Please call +91 9311664455 or email advisory@astronisglobal.com. Your enquiry has not been sent." }, { status: 503 });

  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const attachments = await Promise.all(documents.map(async file => ({
      name: file.name.slice(0, 180), type: file.type || "application/octet-stream", size: file.size,
      contentBase64: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })));
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ kind: "professional-enquiry", ...fields, attachments, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ message: "Thank you. Your enquiry has been received. Our team will connect you with the right professional shortly." });
  } catch {
    return Response.json({ message: "We could not deliver your enquiry. Please try again or contact our team directly." }, { status: 502 });
  }
}
