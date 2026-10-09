import { Resend } from "resend";

export const runtime = "nodejs";

const FAILURE_MESSAGE = "We couldn't submit your enquiry. Please try again.";
const SUCCESS_MESSAGE = "Your enquiry has been submitted successfully.";
const allowedFormTypes = new Set(["home", "industry", "service", "technology"]);
const fieldNames = [
  "name", "email", "company", "phone", "designation", "service", "industry",
  "technology", "solution", "category", "requirement", "country", "state", "city",
  "companyType", "companySize", "timeline", "projectTimeline", "preferredContact",
  "agreementType", "matterStage", "licenceNeed", "regulator", "currentStatus",
  "transactionType", "countriesInvolved", "transactionStage", "ipRequirement", "location",
  "message", "consent", "website", "pageUrl", "pageTitle", "pathname", "referrer",
  "utmSource", "utmMedium", "utmCampaign", "formType", "source", "detailAnswer",
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

  console.log("Enquiry received:", {
    formType: fields.formType,
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    company: fields.company,
    service: fields.service,
    industry: fields.industry,
    technology: fields.technology,
    solution: fields.solution,
    country: fields.country,
    consent: fields.consent,
    honeypotFilled: Boolean(fields.website),
    pageUrl: fields.pageUrl,
  });

  if (fields.website) {
    console.log("Enquiry rejected: honeypot filled.", { formType: fields.formType, pageUrl: fields.pageUrl });
    return rejectWithMessage("Your submission could not be processed.", 400);
  }

  if (!allowedFormTypes.has(fields.formType)) {
    const message = "Unsupported enquiry type.";
    console.log("Enquiry rejected:", { reason: message, formType: fields.formType, pageUrl: fields.pageUrl });
    return rejectWithMessage(message, 400);
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
    console.log("Enquiry rejected:", { reason: commonError, formType: fields.formType, pageUrl: fields.pageUrl });
    return rejectWithMessage(commonError, 400);
  }

  const typeError = validateForType();
  if (typeError) {
    console.log("Enquiry rejected:", { reason: typeError, formType: fields.formType, pageUrl: fields.pageUrl });
    return rejectWithMessage(typeError, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Enquiry submission failed: email provider is not configured");
    return rejectWithMessage(FAILURE_MESSAGE, 503);
  }

  const entries = Object.entries(fields)
    .filter(([key, value]) => value && !["website", "consent", "category", "source", "detailAnswer"].includes(key))
    .map(([key, value]) => [labels[key as keyof EnquiryFields] || key, value] as const);
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
    return Response.json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Enquiry submission failed:", error instanceof Error ? error.message : "Unknown email provider error");
    return rejectWithMessage(FAILURE_MESSAGE, 502);
  }
}
