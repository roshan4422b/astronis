import { persistPublicEnquiry } from "@/lib/cms/public-enquiries";
import { consumeEmailVerification, verificationFailure } from "@/lib/form-verification.server";

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
    enquiryAgreementAccepted: field("enquiryAgreementAccepted"), enquiryAgreementId: field("enquiryAgreementId"),
    communication: data.getAll("communication").map(String).filter(Boolean),
  };
  if (fields.website) return Response.json({ message: "Unable to submit this enquiry." }, { status: 400 });
  if (fields.name.length < 2 || fields.name.length > 120 || !/^\S+@\S+\.\S+$/.test(fields.email) || fields.email.length > 254 || !fields.company || !fields.phone || !fields.interest || fields.message.length < 10 || fields.consent !== "yes" || fields.enquiryAgreementAccepted !== "yes" || fields.enquiryAgreementId !== "enquiry-communication-consultation-consent" || Object.values(fields).some((value) => typeof value === "string" && value.length > 5000)) {
    return Response.json({ message: "Please complete all required fields and provide your consent." }, { status: 400 });
  }

  const upload = data.get("attachment");
  let attachment: { name: string; mimeType: string; base64: string } | undefined;
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > MAX_FILE_SIZE || !allowedExtensions.test(upload.name)) return Response.json({ message: "Please upload a PDF, DOC, DOCX, JPG or PNG smaller than 10 MB." }, { status: 400 });
    attachment = { name: upload.name.slice(0, 160), mimeType: upload.type || "application/octet-stream", base64: Buffer.from(await upload.arrayBuffer()).toString("base64") };
  }

  const verificationResponse = verificationFailure(
    await consumeEmailVerification(fields.email, field("emailVerificationToken")),
  );
  if (verificationResponse) return verificationResponse;

  const acceptanceTimestamp = new Date().toISOString();
  const enquiryReference = crypto.randomUUID();
  const persistedId = await persistPublicEnquiry({
    name: fields.name,
    email: fields.email,
    company: fields.company,
    subject: fields.interest || fields.service || "Global enquiry",
    message: fields.message,
    formType: "global-enquiry",
    data: {
      ...fields,
      consent: true,
      enquiryAgreementAccepted: true,
      enquiryAgreementAcceptedAt: acceptanceTimestamp,
      enquiryReference,
      attachment: attachment ? { name: attachment.name, mimeType: attachment.mimeType, size: upload instanceof File ? upload.size : 0 } : null,
    },
  });
  if (!persistedId) return Response.json({ success: false, message: "We couldn't save your enquiry. Please try again." }, { status: 503 });

  const savedMessage = attachment
    ? `Your enquiry details were saved, but the attachment was not received. Please contact advisory@astronisglobal.com and quote reference ${persistedId}.`
    : "Your enquiry has been received and saved. Our team will contact you shortly.";
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ message: savedMessage, reference: persistedId }, { status: 202 });
  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ ...fields, website: undefined, type: "global-enquiry", formType: "global-enquiry", enquiryReference, agreementAccepted: true, agreementId: "enquiry-communication-consultation-consent", agreementAcceptedAt: acceptanceTimestamp, attachment, submittedAt: acceptanceTimestamp }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ message: "Thank you. Your enquiry has been received. Our team will contact you shortly.", reference: persistedId });
  } catch {
    console.error("[cms] Global enquiry webhook delivery failed after CMS persistence");
    const message = attachment
      ? `Your enquiry details were saved, but the attachment could not be delivered. Please contact advisory@astronisglobal.com and quote reference ${persistedId}.`
      : "Your enquiry has been saved. Please do not submit it again; our team will follow up.";
    return Response.json({ message, reference: persistedId }, { status: 202 });
  }
}
