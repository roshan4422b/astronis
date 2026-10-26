import { persistPublicEnquiry } from "@/lib/cms/public-enquiries";

const allowedExtensions = new Set(["pdf", "doc", "docx", "jpg", "jpeg", "png"]);
const jurisdictionDocumentExtensions = new Set(["pdf", "doc", "docx"]);

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
    professionalType: value("professionalType"), collaborationInterest: value("collaborationInterest"),
    message: value("message"), preferredMode: value("preferredMode"),
    preferredDate: value("preferredDate"), preferredTime: value("preferredTime"),
  };
  const collaborationEnquiry = value("collaborationEnquiry") === "yes";
  const collaborateWithUs = value("collaborateWithUs") === "yes";
  const networkApplication = value("networkApplication") === "yes";
  const careerApplication = collaborateWithUs || networkApplication;
  const enquiryAgreementAccepted = value("enquiryAgreementAccepted");
  const enquiryAgreementId = value("enquiryAgreementId");
  if (value("website")) return Response.json({ message: "Unable to submit this enquiry." }, { status: 400 });
  if (enquiryAgreementAccepted !== "yes" || enquiryAgreementId !== "enquiry-communication-consultation-consent") {
    return Response.json({ message: "Please read and accept the Enquiry, Communication & Consultation Consent Agreement before submitting your enquiry." }, { status: 400 });
  }
  if (careerApplication && (
    value("applicationType") !== "professional" ||
    value("careerAgreementAccepted") !== "yes" ||
    value("careerAgreementId") !== "career-professional-partnership-consent"
  )) {
    return Response.json({ message: "Please read and accept the Career, Professional Association & Partnership Application Consent Agreement before submitting your application." }, { status: 400 });
  }
  if (!(["specific", "practice", "jurisdiction", "general"].includes(fields.connectWith)) ||
      (fields.connectWith === "specific" && !fields.professional) ||
      (fields.connectWith === "practice" && !fields.service) ||
      (fields.connectWith === "jurisdiction" && !fields.location) ||
      (collaborationEnquiry && (!fields.company || !fields.professionalType || !fields.service || !fields.location)) ||
      (collaborateWithUs && (!fields.company || !fields.professionalType || !fields.service || !fields.collaborationInterest)) ||
      fields.name.length < 2 || fields.name.length > 120 || !/^\S+@\S+\.\S+$/.test(fields.email) || fields.email.length > 254 ||
      fields.phone.length < 7 || fields.message.length < 10 || fields.message.length > 1000 ||
      value("consent") !== "yes" || Object.values(fields).some(field => field.length > 1000)) {
    return Response.json({ message: "Please check the required fields and provide your consent." }, { status: 400 });
  }

  const documents = data.getAll("documents").filter((item): item is File => item instanceof File);
  const totalSize = documents.reduce((total, file) => total + file.size, 0);
  if (collaborationEnquiry || collaborateWithUs) {
    if (documents.length > 1 || totalSize > 5 * 1024 * 1024 ||
        documents.some(file => file.size > 5 * 1024 * 1024 || !jurisdictionDocumentExtensions.has(file.name.split(".").pop()?.toLowerCase() || ""))) {
      return Response.json({ message: "Add one PDF, DOC or DOCX file no larger than 5 MB." }, { status: 400 });
    }
  } else if (fields.connectWith === "jurisdiction") {
    if (documents.length > 1 || totalSize > 5 * 1024 * 1024 ||
        documents.some(file => file.size > 5 * 1024 * 1024 || !jurisdictionDocumentExtensions.has(file.name.split(".").pop()?.toLowerCase() || ""))) {
      return Response.json({ message: "Add one PDF, DOC or DOCX file no larger than 5 MB." }, { status: 400 });
    }
  } else if (documents.length > 3 || totalSize > 20 * 1024 * 1024 || documents.some(file => file.size > 10 * 1024 * 1024 || !allowedExtensions.has(file.name.split(".").pop()?.toLowerCase() || ""))) {
    return Response.json({ message: "Add up to three PDF, DOC, DOCX, JPG or PNG files under 10 MB each and 20 MB total." }, { status: 400 });
  }

  const acceptanceTimestamp = new Date().toISOString();
  const enquiryReference = crypto.randomUUID();
  const formType = networkApplication ? "professional-network-application" : collaborateWithUs || collaborationEnquiry ? "professional-collaboration-enquiry" : "professional-enquiry";
  const acceptedAt = careerApplication ? acceptanceTimestamp : undefined;
  const persistedId = await persistPublicEnquiry({
    name: fields.name,
    email: fields.email,
    company: fields.company,
    subject: fields.collaborationInterest || fields.service || fields.connectWith,
    message: fields.message,
    formType,
    data: {
      ...fields,
      collaborationEnquiry,
      collaborateWithUs,
      networkApplication,
      enquiryAgreementAccepted: true,
      enquiryAgreementAcceptedAt: acceptanceTimestamp,
      careerAgreementAccepted: careerApplication,
      careerAgreementAcceptedAt: acceptedAt || null,
      enquiryReference,
      attachments: documents.map((file) => ({ name: file.name.slice(0, 180), type: file.type || "application/octet-stream", size: file.size })),
    },
  });
  if (!persistedId) return Response.json({ success: false, message: "We couldn't save your enquiry. Please try again." }, { status: 503 });

  const savedMessage = documents.length
    ? `Your enquiry details were saved, but the attachments were not received. Please contact advisory@astronisglobal.com and quote reference ${persistedId}.`
    : "Your enquiry has been received and saved. Our team will contact you shortly.";
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ message: savedMessage, reference: persistedId }, { status: 202 });

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
      body: JSON.stringify({
        kind: "professional-enquiry",
        ...fields,
        formType,
        enquiryReference,
        enquiryAgreementAccepted: true,
        enquiryAgreementId: "enquiry-communication-consultation-consent",
        enquiryAgreementAcceptedAt: acceptanceTimestamp,
        applicationType: careerApplication ? "professional" : undefined,
        careerAgreementAccepted: careerApplication ? true : undefined,
        careerAgreementId: careerApplication ? "career-professional-partnership-consent" : undefined,
        careerAgreementAcceptedAt: acceptedAt,
        attachments,
        submittedAt: acceptedAt ?? new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return Response.json({ message: "Thank you. Your enquiry has been received. Our team will connect you with the right professional shortly.", reference: persistedId });
  } catch {
    console.error("[cms] Professional enquiry webhook delivery failed after CMS persistence");
    const message = documents.length
      ? `Your enquiry details were saved, but the attachments could not be delivered. Please contact advisory@astronisglobal.com and quote reference ${persistedId}.`
      : "Your enquiry has been saved. Please do not submit it again; our team will follow up.";
    return Response.json({ message, reference: persistedId }, { status: 202 });
  }
}
