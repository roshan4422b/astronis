import { Resend } from "resend";
import { consumeEmailVerification, verificationFailure } from "@/lib/form-verification.server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const FAILURE_MESSAGE = "We couldn't submit your enquiry. Please try again.";
const SUCCESS_MESSAGE = "Your enquiry has been submitted successfully.";
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();
const allowedFormTypes = new Set(["home", "industry", "service", "technology"]);
const fieldNames = [
  "name", "email", "company", "phone", "designation", "service", "industry",
  "technology", "solution", "category", "requirement", "country", "state", "city",
  "companyType", "companySize", "timeline", "projectTimeline", "preferredContact",
  "agreementType", "matterStage", "licenceNeed", "regulator", "currentStatus",
  "transactionType", "countriesInvolved", "transactionStage", "ipRequirement", "location",
  "message", "consent", "website", "pageUrl", "pageTitle", "pathname", "referrer",
  "utmSource", "utmMedium", "utmCampaign", "formType", "source", "detailAnswer",
  "applicationType", "careerAgreementAccepted", "careerAgreementId",
  "enquiryAgreementAccepted", "enquiryAgreementId",
] as const;

type EnquiryFieldName = (typeof fieldNames)[number];
type EnquiryFields = Record<EnquiryFieldName, string>;

const emptyFields = (): EnquiryFields =>
  Object.fromEntries(fieldNames.map((field) => [field, ""])) as EnquiryFields;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitize = (value: unknown): string =>
  String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, 2000);

const normalizeFormType = (value: unknown): string => sanitize(value).toLowerCase();

const normalizeConsent = (value: unknown): string => {
  const normalized = sanitize(value).toLowerCase();
  return ["yes", "true", "on"].includes(normalized) ? "yes" : "";
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);

const labels: Partial<Record<keyof EnquiryFields, string>> = {
  formType: "Form Type", pageUrl: "Page", name: "Name", email: "Business Email",
  phone: "Phone / WhatsApp", company: "Company", designation: "Designation",
  industry: "Industry", requirement: "Industry Requirement", service: "Service",
  detailAnswer: "Sub-Service Detail", technology: "Technology Area", solution: "Technology Solution",
  country: "Country", state: "State", city: "City", timeline: "Timeline",
  projectTimeline: "Timeline", preferredContact: "Preferred Contact", message: "Requirement Details",
  utmSource: "UTM Source", utmMedium: "UTM Medium", utmCampaign: "UTM Campaign",
  applicationType: "Application Type", careerAgreementAccepted: "Agreement Accepted",
  careerAgreementId: "Agreement Identifier",
  enquiryAgreementAccepted: "Enquiry Agreement Accepted", enquiryAgreementId: "Enquiry Agreement Identifier",
};

const subjectFor = (fields: EnquiryFields) => {
  const type = fields.formType === "service" ? `Service Enquiry${fields.service ? ` | ${fields.service}` : ""}`
    : fields.formType === "industry" ? `Industry Enquiry${fields.industry ? ` | ${fields.industry}` : ""}`
      : fields.formType === "technology" ? `Technology Enquiry${fields.technology ? ` | ${fields.technology}` : ""}`
        : "Website Enquiry | Home";
  return `New ${type}`;
};

const rejectWithMessage = (message: string, status = 400) =>
  Response.json({ success: false, message }, { status });

function isRateLimited(ip: string, now: number) {
  const current = requestsByIp.get(ip);
  if (current && current.resetAt > now && current.count >= RATE_LIMIT) return true;

  requestsByIp.set(
    ip,
    current && current.resetAt > now
      ? { ...current, count: current.count + 1 }
      : { count: 1, resetAt: now + RATE_WINDOW_MS },
  );
  if (requestsByIp.size > 5000) {
    for (const [key, entry] of requestsByIp) {
      if (entry.resetAt <= now) requestsByIp.delete(key);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return rejectWithMessage(FAILURE_MESSAGE, 403);
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return rejectWithMessage(FAILURE_MESSAGE, 413);

  let raw: Record<string, unknown>;
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("JSON required");
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return rejectWithMessage(FAILURE_MESSAGE, 400);
  }

  const fields = emptyFields();
  for (const field of fieldNames) fields[field] = sanitize(raw[field]);
  fields.formType = normalizeFormType(fields.formType);
  fields.consent = normalizeConsent(raw.consent);
  fields.careerAgreementAccepted = normalizeConsent(raw.careerAgreementAccepted);
  fields.enquiryAgreementAccepted = normalizeConsent(raw.enquiryAgreementAccepted);

  if (fields.website) {
    return Response.json({ success: true, message: SUCCESS_MESSAGE });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
  if (isRateLimited(ip, Date.now())) {
    return rejectWithMessage("Too many enquiries. Please try again later.", 429);
  }

  if (!allowedFormTypes.has(fields.formType)) {
    const message = "Unsupported enquiry type.";
    return rejectWithMessage(message, 400);
  }

  if (fields.enquiryAgreementAccepted !== "yes" || fields.enquiryAgreementId !== "enquiry-communication-consultation-consent") {
    return rejectWithMessage("Please read and accept the Enquiry, Communication & Consultation Consent Agreement before submitting your enquiry.");
  }

  const partnerApplication = fields.applicationType === "partner" || fields.pathname === "/global-presence/partner-with-us";
  if (partnerApplication && (
    fields.formType !== "service" ||
    fields.applicationType !== "partner" ||
    fields.careerAgreementAccepted !== "yes" ||
    fields.careerAgreementId !== "career-professional-partnership-consent"
  )) {
    return rejectWithMessage("Please read and accept the Career, Professional Association & Partnership Application Consent Agreement before submitting your application.");
  }

  const validateCommon = () => {
    const isCompactTechnologyEnquiry = fields.formType === "technology" && (
      (!fields.solution && fields.technology === "Digital Business Solutions")
      || ["Client & Enterprise Portals", "Cybersecurity Readiness", "Cloud & Collaboration Solutions"].includes(fields.solution)
    );
    if (!fields.name.trim()) return "Please enter your name.";
    if (fields.name.trim().length < 2 || fields.name.trim().length > 120) return "Please enter your name.";
    if (!fields.email.trim()) return "Please enter a valid email address.";
    if (!emailRegex.test(fields.email) || fields.email.length > 254) return "Please enter a valid email address.";
    if (fields.phone.length > 40) return "Please enter a valid phone number.";
    if (fields.company.length > 160) return "Please enter a valid company name.";
    if (!isCompactTechnologyEnquiry && !fields.phone.trim()) return "Please enter your phone number.";
    if (!isCompactTechnologyEnquiry && !fields.message.trim()) return "Please provide more details about your enquiry.";
    if (!isCompactTechnologyEnquiry && fields.message.trim().length < 10) return "Please provide more details about your enquiry.";
    if (!fields.consent) return "Please accept the consent checkbox.";
    return null;
  };

  const validateForType = () => {
    switch (fields.formType) {
      case "home":
        return null;
      case "industry":
        if (!fields.company.trim()) return "Company name is required.";
        if (!fields.industry.trim()) return "Please select an industry.";
        return null;
      case "service":
        if (!fields.company.trim()) return "Company name is required.";
        if (!fields.service.trim()) return "Please select a service.";
        return null;
      case "technology":
        if (!fields.company.trim()) return "Company name is required.";
        if (!fields.technology.trim() && !fields.solution.trim()) return "Please select a technology or solution.";
        return null;
      default:
        return "Unsupported enquiry type.";
    }
  };

  const commonError = validateCommon();
  if (commonError) {
    return rejectWithMessage(commonError, 400);
  }

  const typeError = validateForType();
  if (typeError) {
    return rejectWithMessage(typeError, 400);
  }

  const verificationResponse = verificationFailure(
    await consumeEmailVerification(fields.email, sanitize(raw.emailVerificationToken)),
  );
  if (verificationResponse) return verificationResponse;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.error("Enquiry submission failed: Supabase is not configured");
    return rejectWithMessage("Enquiry submission is not configured yet. Please try again later.", 503);
  }
  const enquiryId = crypto.randomUUID();
  const { error: saveError } = await supabase.from("cms_enquiries").insert({
    id: enquiryId,
    name: fields.name.trim(),
    email: fields.email.trim(),
    company: fields.company,
    subject: subjectFor(fields),
    message: fields.message,
    form_type: fields.formType,
    data: fields,
  });
  if (saveError) {
    console.error("Enquiry submission failed: database persistence failed", saveError?.code || "unknown");
    return rejectWithMessage("We couldn't submit your enquiry. Please try again.", 503);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ success: true, message: SUCCESS_MESSAGE, reference: enquiryId });
  }

  const acceptanceTimestamp = new Date().toISOString();
  const enquiryReference = crypto.randomUUID();
  const entries = Object.entries(fields)
    .filter(([key, value]) => value && !["website", "consent", "category", "source", "detailAnswer"].includes(key))
    .map(([key, value]) => [labels[key as keyof EnquiryFields] || key, value] as const);
  entries.push(
    ["Enquiry Reference", enquiryReference],
    ["Agreement Accepted", "true"],
    ["Agreement Acceptance Timestamp (UTC)", acceptanceTimestamp],
  );
  const text = entries.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = entries.map(([label, value]) => `<p><strong>${escapeHtml(label)}</strong><br />${escapeHtml(value).replace(/\n/g, "<br />")}</p>`).join("");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: ["advisory@astronisglobal.com"],
      replyTo: fields.email,
      subject: subjectFor(fields),
      text,
      html,
    });
    if (result.error) throw new Error(result.error.message);
    return Response.json({ success: true, message: SUCCESS_MESSAGE, reference: enquiryId });
  } catch (error) {
    console.error("Enquiry submission failed:", error instanceof Error ? error.message : "Unknown email provider error");
    return Response.json({ success: true, message: SUCCESS_MESSAGE, reference: enquiryId });
  }
}
