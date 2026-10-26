import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { consumeEmailVerification, verificationFailure } from "@/lib/form-verification.server";
import {
  backgrounds, categories, countries, engagementOptions, experienceBands, hierarchiesFor,
  isSeniorReview, positionDisplayLabel, positionsFor, specialisationsFor, subdivisionCountryCodes, indianStates,
  type CategoryCode,
} from "@/data/professional-application-taxonomy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_FILE_LIMIT = 8 * 1024 * 1024;
const MAX_FILE_LIMIT = 20 * 1024 * 1024;
const rateWindow = 15 * 60 * 1000;
const rateLimit = 8;
const requests = new Map<string, { count: number; resetAt: number }>();

function fileLimit() {
  const value = Number(process.env.PROFESSIONAL_APPLICATION_MAX_FILE_BYTES || DEFAULT_FILE_LIMIT);
  return Number.isSafeInteger(value) && value > 0 ? Math.min(value, MAX_FILE_LIMIT) : DEFAULT_FILE_LIMIT;
}

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

function validText(value: unknown, max = 500) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
}

async function validCv(file: File, limit: number) {
  if (file.size < 1 || file.size > limit) return false;
  const bytes = new Uint8Array(await file.slice(0, 4096).arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-";
  if (ext === "doc") return [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1].every((v, i) => bytes[i] === v);
  if (ext !== "docx" || bytes[0] !== 0x50 || bytes[1] !== 0x4b) return false;
  const full = new Uint8Array(await file.arrayBuffer());
  const sample = new TextDecoder("latin1").decode(full);
  return sample.includes("[Content_Types].xml") && sample.includes("word/");
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).host !== new URL(request.url).host) return response("This request could not be verified.", 403); }
    catch { return response("This request could not be verified.", 403); }
  }
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = requests.get(forwarded);
  if (current && current.resetAt > now && current.count >= rateLimit) return response("Too many attempts. Please try again later.", 429);
  requests.set(forwarded, current && current.resetAt > now ? { ...current, count: current.count + 1 } : { count: 1, resetAt: now + rateWindow });
  if (requests.size > 5000) for (const [key, entry] of requests) if (entry.resetAt <= now) requests.delete(key);

  const declaredLength = Number(request.headers.get("content-length") || 0);
  const limit = fileLimit();
  if (declaredLength > limit + 1024 * 1024) return response("The application upload is too large.", 413);
  let form: FormData;
  try { form = await request.formData(); } catch { return response("The application could not be read. Please try again.", 400); }
  if (form.get("website")) return response("The application could not be accepted.", 400);
  const raw = form.get("application");
  const cv = form.get("cv");
  if (typeof raw !== "string" || !(cv instanceof File)) return response("Complete the required application fields and attach your CV.", 400);

  let app: Record<string, unknown>;
  try { app = JSON.parse(raw) as Record<string, unknown>; } catch { return response("Application details are invalid.", 400); }
  const applicant = app.applicant as Record<string, unknown> | undefined;
  const categoryData = app.category as { code?: string } | undefined;
  const hierarchyData = app.hierarchy as { code?: string } | undefined;
  const positionData = app.position as { code?: string } | undefined;
  const categoryCode = categoryData?.code as CategoryCode;
  const hierarchyCode = hierarchyData?.code || "";
  const category = categories.find((item) => item.code === categoryCode);
  const hierarchy = hierarchiesFor(categoryCode).find((item) => item.code === hierarchyCode);
  const position = positionsFor(categoryCode, hierarchyCode).find((item) => item.code === positionData?.code);
  if (!category || !hierarchy || !position) return response("Select a valid category, hierarchy and position.", 400);
  if (!validText(applicant?.fullName, 120) || !validText(applicant?.email, 180) || !/^\S+@\S+\.\S+$/.test(String(applicant?.email))) return response("Enter a valid name and email address.", 400);

  const backgroundsSelected = app.professionalBackgrounds;
  const specialisationsSelected = app.specialisations;
  if (!Array.isArray(backgroundsSelected) || !backgroundsSelected.length || backgroundsSelected.length > backgrounds.length || backgroundsSelected.some((entry) => !backgrounds.some((valid) => valid.code === (entry as { code?: string })?.code))) return response("Select at least one valid professional background.", 400);
  if (!Array.isArray(specialisationsSelected) || specialisationsSelected.some((entry) => !specialisationsFor(categoryCode).some((valid) => valid.code === (entry as { code?: string })?.code))) return response("One or more specialisations are invalid.", 400);
  if ((backgroundsSelected as Array<{ code: string }>).some((entry) => entry.code === "PQ-17") && !validText(app.otherProfessionalBackground, 180)) return response("Specify the other professional background.", 400);
  const registration = app.registration as Record<string, unknown> | undefined;
  const selectedBackgroundCodes = (backgroundsSelected as Array<{ code: string }>).map((entry) => entry.code);
  if (categoryCode === "LA" && selectedBackgroundCodes.includes("PQ-01") && (!validText(registration?.type, 140) || !validText(registration?.issuingBody, 180) || !validText(registration?.jurisdiction, 120))) return response("Provide the professional registration details required for this legal application.", 400);

  const experience = app.experience as { code?: string; exactYears?: number } | undefined;
  if (!experienceBands.some((entry) => entry.code === experience?.code) || (experience?.exactYears !== undefined && (!Number.isFinite(experience.exactYears) || experience.exactYears < 0 || experience.exactYears > 60))) return response("Select a valid experience range.", 400);
  const preferred = app.preferredLocation as { countryCode?: string; region?: string; stateOrProvince?: string; city?: string } | undefined;
  const preferredCountry = countries.find((entry) => entry.code === preferred?.countryCode);
  if (!preferredCountry || preferred?.region !== preferredCountry.region || !validText(preferred?.city, 120)) return response("Select a valid preferred country, region and city.", 400);
  if (subdivisionCountryCodes.has(preferredCountry.code) && !validText(preferred?.stateOrProvince, 120)) return response("Enter your state or province.", 400);
  if (preferredCountry.code === "IN" && !indianStates.includes(String(preferred?.stateOrProvince))) return response("Select a valid Indian state or union territory.", 400);

  const market = app.applicationMarket as { countryCode?: string } | undefined;
  const marketCountry = market?.countryCode ? countries.find((entry) => entry.code === market.countryCode) : undefined;
  if (categoryCode === "GN" && !marketCountry) return response("Select the market for this network application.", 400);
  const selectedEngagement = app.engagement as { code?: string } | undefined;
  const engagement = engagementOptions(categoryCode, position, process.env.PROFESSIONAL_INTERN_RECRUITMENT_OPEN === "true").find((entry) => entry.code === selectedEngagement?.code);
  if (!engagement) return response("Select a valid engagement type.", 400);
  const profileUrl = app.professionalProfileUrl;
  if (profileUrl !== undefined) {
    try { const url = new URL(String(profileUrl)); if (!validText(profileUrl, 500) || !["http:", "https:"].includes(url.protocol)) throw new Error(); }
    catch { return response("Enter a valid professional profile URL.", 400); }
  }
  if (app.declarationAccepted !== true || app.privacyConsentAccepted !== true) return response("Confirm the applicant declaration and privacy consent.", 400);
  if (!await validCv(cv, limit)) return response("The CV must be a valid PDF, DOC or DOCX file within the upload limit.", 400);

  const verificationResponse = verificationFailure(
    await consumeEmailVerification(
      String(applicant?.email),
      String(form.get("emailVerificationToken") || "").trim(),
    ),
  );
  if (verificationResponse) return verificationResponse;

  const webhook = process.env.PROFESSIONAL_APPLICATION_WEBHOOK_URL;
  const token = process.env.PROFESSIONAL_APPLICATION_WEBHOOK_TOKEN;
  if (!webhook || !token) return response("The application service is not available right now. Your details have not been submitted; please try again later.", 503);
  let webhookUrl: URL;
  try { webhookUrl = new URL(webhook); } catch { return response("The application service is not available right now.", 503); }
  if (webhookUrl.protocol !== "https:") return response("The application service is not available right now.", 503);

  const reference = `AG-${new Date().getUTCFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const filename = cv.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "professional-cv";
  const payload = {
    applicationReference: reference,
    submittedAt: new Date().toISOString(),
    classification: { category: { code: category.code, label: category.label }, hierarchy: { code: hierarchy.code, label: hierarchy.label }, position: { code: position.code, label: positionDisplayLabel(position, marketCountry?.label) }, seniorReviewRequired: isSeniorReview(position) },
    application: {
      ...app,
      category: { code: category.code, label: category.label },
      hierarchy: { code: hierarchy.code, label: hierarchy.label },
      position: { code: position.code, label: positionDisplayLabel(position, marketCountry?.label), seniorReviewRequired: isSeniorReview(position) },
      applicationMarket: marketCountry ? { countryCode: marketCountry.code, country: marketCountry.label } : undefined,
      preferredLocation: { countryCode: preferredCountry.code, country: preferredCountry.label, region: preferredCountry.region, stateOrProvince: preferred?.stateOrProvince, city: preferred?.city },
      professionalBackgrounds: (backgroundsSelected as Array<{ code: string }>).map(({ code }) => { const item = backgrounds.find((entry) => entry.code === code)!; return { code: item.code, label: item.label }; }),
      specialisations: (specialisationsSelected as Array<{ code: string }>).map(({ code }) => { const item = specialisationsFor(categoryCode).find((entry) => entry.code === code)!; return { code: item.code, label: item.label }; }),
      experience: { code: experienceBands.find((entry) => entry.code === experience?.code)!.code, label: experienceBands.find((entry) => entry.code === experience?.code)!.label, exactYears: experience?.exactYears },
      engagement: { code: engagement.code, label: engagement.label },
    },
    cv: { filename, mediaType: cv.type, size: cv.size, base64: Buffer.from(await cv.arrayBuffer()).toString("base64") },
  };
  try {
    const upstream = await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload), signal: AbortSignal.timeout(20_000), cache: "no-store" });
    if (!upstream.ok) return response("The application service could not accept your submission. Your details remain in this form; please try again later.", 502);
  } catch {
    return response("The application service could not be reached. Your details remain in this form; please try again later.", 502);
  }
  return NextResponse.json({ applicationReference: reference }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
