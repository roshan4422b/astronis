"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { EnquiryStatus, TestimonialApprovalStatus, TestimonialConsentStatus } from "../admin-data";

export type AdminInsight = {
  id: string;
  sourceDefined?: boolean;
  title: string;
  category: string;
  description: string;
  content: string;
  author: string;
  status: "Draft" | "Published" | "Archived";
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
};

export type AdminEnquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: EnquiryStatus;
  company: string;
  formType: string;
  message: string;
  phone?: string;
  internalNotes?: string;
  data?: Record<string, unknown>;
  updatedAt?: string;
};

export type AdminTestimonial = {
  id: string;
  sourceDefined?: boolean;
  name: string;
  excerpt: string;
  text: string;
  company: string;
  designation: string;
  service: string;
  date: string;
  consentStatus: TestimonialConsentStatus;
  approvalStatus: TestimonialApprovalStatus;
  email?: string;
  phone?: string;
  title?: string;
  internalNotes?: string;
  identityPublicationConsent?: boolean;
  photoPublicationConsent?: boolean;
  imagePath?: string;
  imageUrl?: string;
  videoPath?: string;
  videoUrl?: string;
  videoSource?: string;
  mediaSubmitted?: boolean;
  format?: string;
  rating?: number;
  rejectionReason?: string;
  decisionAt?: string;
  notificationStatus?: string;
};

export type AdminContentSection = "pages" | "services" | "industries" | "professionals" | "global-presence" | "technology";
export type AdminEditableContentSection = Exclude<AdminContentSection, "pages">;
export type AdminContentStatus = "Draft" | "Published" | "Archived";

export type AdminContentRecord = {
  id: string;
  sourceDefined?: boolean;
  sectionType: AdminContentSection;
  title: string;
  slug: string;
  sourcePath?: string;
  category: string;
  status: AdminContentStatus;
  updated: string;
  description: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  featuredImage?: string;
  designation: string;
  expertise: string;
  education: string;
  enrolment: string;
  jurisdiction: string;
  imagePlaceholder: string;
};

export type AdminEditableContentRecord = Omit<AdminContentRecord, "sectionType"> & {
  sectionType: AdminEditableContentSection;
};

type AdminStateValue = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
  feedback: string;
  setFeedback: Dispatch<SetStateAction<string>>;
  insights: AdminInsight[];
  setInsights: Dispatch<SetStateAction<AdminInsight[]>>;
  enquiries: AdminEnquiry[];
  setEnquiries: Dispatch<SetStateAction<AdminEnquiry[]>>;
  testimonials: AdminTestimonial[];
  setTestimonials: Dispatch<SetStateAction<AdminTestimonial[]>>;
  contentRecords: AdminContentRecord[];
  setContentRecords: Dispatch<SetStateAction<AdminContentRecord[]>>;
  loadState: "loading" | "ready" | "error";
  loadError: string;
  loadWarning: string;
};

const AdminStateContext = createContext<AdminStateValue | null>(null);

type AdminSnapshot = {
  sidebarCollapsed: boolean;
  feedback: string;
  insights: AdminInsight[];
  enquiries: AdminEnquiry[];
  testimonials: AdminTestimonial[];
  contentRecords: AdminContentRecord[];
  loadState: "loading" | "ready" | "error";
  loadError: string;
  loadWarning: string;
};
type CmsRow = {
  id: string;
  collection: string;
  slug: string;
  status: string;
  data: Record<string, unknown>;
  created_at: string | null;
  updated_at: string | null;
  source_defined?: boolean;
  notification_status?: string;
};
type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  created_at: string;
  status: EnquiryStatus;
  company: string;
  form_type: string;
  message: string;
  internal_notes: string;
  data: Record<string, unknown>;
  updated_at: string | null;
};
const text = (value: unknown) => typeof value === "string" ? value : "";

async function readAdminApiResponse(response: Response, endpoint: string) {
  const contentType = response.headers.get("content-type") || "unknown content type";
  const body = await response.text();
  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid response shape");
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    const redirectedTo = response.url ? new URL(response.url).pathname : "";
    const redirectNote = redirectedTo && redirectedTo !== endpoint ? ` Redirected to ${redirectedTo}.` : "";
    throw new Error(
      `${endpoint} returned a non-JSON response (HTTP ${response.status}, ${contentType}).${redirectNote} Check the Admin sign-in state and local server logs.`,
    );
  }
  if (!response.ok) {
    throw new Error(
      typeof payload.error === "string"
        ? `${endpoint} (HTTP ${response.status}): ${payload.error}`
        : `${endpoint} returned HTTP ${response.status}.`,
    );
  }
  return payload;
}

const initialSnapshot: AdminSnapshot = {
  sidebarCollapsed: false,
  feedback: "",
  insights: [],
  enquiries: [],
  testimonials: [],
  contentRecords: [],
  loadState: "loading",
  loadError: "",
  loadWarning: "",
};
let snapshot = initialSnapshot;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return initialSnapshot;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function setSidebarCollapsed(value: SetStateAction<boolean>) {
  const next = typeof value === "function" ? value(snapshot.sidebarCollapsed) : value;
  if (next === snapshot.sidebarCollapsed) return;
  snapshot = { ...snapshot, sidebarCollapsed: next };
  notify();
}

function setFeedback(value: SetStateAction<string>) {
  const next = typeof value === "function" ? value(snapshot.feedback) : value;
  if (next === snapshot.feedback) return;
  snapshot = { ...snapshot, feedback: next };
  notify();
}

function setInsights(value: SetStateAction<AdminInsight[]>) {
  const next = typeof value === "function" ? value(snapshot.insights) : value;
  if (next === snapshot.insights) return;
  snapshot = { ...snapshot, insights: next };
  notify();
}

function setEnquiries(value: SetStateAction<AdminEnquiry[]>) {
  const next = typeof value === "function" ? value(snapshot.enquiries) : value;
  if (next === snapshot.enquiries) return;
  snapshot = { ...snapshot, enquiries: next };
  notify();
}

function setTestimonials(value: SetStateAction<AdminTestimonial[]>) {
  const next = typeof value === "function" ? value(snapshot.testimonials) : value;
  if (next === snapshot.testimonials) return;
  snapshot = { ...snapshot, testimonials: next };
  notify();
}

function setContentRecords(value: SetStateAction<AdminContentRecord[]>) {
  const next = typeof value === "function" ? value(snapshot.contentRecords) : value;
  if (next === snapshot.contentRecords) return;
  snapshot = { ...snapshot, contentRecords: next };
  notify();
}

export function AdminStateProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/admin/login") return;
    let active = true;
    const load = async () => {
      try {
        const [contentResponse, enquiryResponse] = await Promise.all([
          fetch("/api/admin/data?collection=all", { cache: "no-store" }),
          fetch("/api/admin/data?collection=enquiries", { cache: "no-store" }),
        ]);
        const contentPayload = await readAdminApiResponse(contentResponse, "/api/admin/data?collection=all");
        const enquiryPayload = await readAdminApiResponse(enquiryResponse, "/api/admin/data?collection=enquiries");
        if (!active) return;
        const contentRows: CmsRow[] = Array.isArray(contentPayload.records) ? contentPayload.records : [];
        const toStatus = (status: string) => status === "published" ? "Published" : status === "archived" ? "Archived" : "Draft";
        const validCollections: AdminContentSection[] = ["pages", "services", "industries", "professionals", "global-presence", "technology"];
        const contentRecords: AdminContentRecord[] = contentRows.filter((row) => validCollections.includes(row.collection as AdminContentSection))
          .map((row) => ({ ...row.data, id: row.id, sourceDefined: row.source_defined === true || row.data.sourceDefined === true, sectionType: row.collection as AdminContentSection, title: text(row.data.title), slug: row.slug, sourcePath: text(row.data.sourcePath), category: text(row.data.category), status: toStatus(row.status), updated: row.updated_at ?? "", description: text(row.data.description), content: text(row.data.content), seoTitle: text(row.data.seoTitle), seoDescription: text(row.data.seoDescription), featuredImage: text(row.data.featuredImage), designation: text(row.data.designation), expertise: text(row.data.expertise), education: text(row.data.education), enrolment: text(row.data.enrolment), jurisdiction: text(row.data.jurisdiction), imagePlaceholder: text(row.data.imagePlaceholder) }));
        const insights: AdminInsight[] = contentRows.filter((row) => row.collection === "insights").map((row) => ({
          id: row.id, sourceDefined: row.source_defined === true || row.data.sourceDefined === true, title: text(row.data.title), slug: row.slug, category: text(row.data.category), description: text(row.data.description),
          content: text(row.data.content), author: text(row.data.author), status: toStatus(row.status), updatedAt: row.updated_at ?? "",
          createdAt: row.created_at ?? "", publishedAt: row.status === "published" ? text(row.data.publishedAt) || row.updated_at || "" : "",
          seoTitle: text(row.data.seoTitle), seoDescription: text(row.data.seoDescription), featuredImage: text(row.data.featuredImage),
          ogTitle: text(row.data.ogTitle), ogDescription: text(row.data.ogDescription), canonicalUrl: text(row.data.canonicalUrl),
          robotsIndex: row.data.robotsIndex !== false, robotsFollow: row.data.robotsFollow !== false,
        }));
        const testimonials: AdminTestimonial[] = contentRows.filter((row) => row.collection === "testimonials").map((row) => ({
          id: row.id, sourceDefined: row.source_defined === true || row.data.sourceDefined === true, name: text(row.data.name), email: text(row.data.email), title: text(row.data.title),
          phone: text(row.data.phone),
          text: text(row.data.text), excerpt: text(row.data.excerpt), company: text(row.data.company), designation: text(row.data.designation), service: text(row.data.service), date: row.created_at ?? "",
          consentStatus: row.data.consent === true && row.data.identityPublicationConsent === true ? "Granted" : "Not granted",
          approvalStatus: row.status === "published" || row.status === "approved" ? "Approved" : row.status === "rejected" ? "Rejected" : row.status === "archived" ? "Archived" : "Pending",
          rating: typeof row.data.rating === "number" && Number.isInteger(row.data.rating) ? row.data.rating : 5,
          rejectionReason: text(row.data.moderationReason),
          decisionAt: text(row.data.moderationDecisionAt),
          notificationStatus: row.notification_status,
          identityPublicationConsent: row.data.identityPublicationConsent === true, internalNotes: text(row.data.internalNotes),
          photoPublicationConsent: row.data.photoPublicationConsent === true,
          imagePath: text(row.data.imagePath),
          imageUrl: text(row.data.imageUrl),
          videoPath: text(row.data.videoPath),
          videoUrl: text(row.data.videoUrl),
          videoSource: text(row.data.videoSource),
          mediaSubmitted: row.data.mediaSubmitted === true,
          format: text(row.data.format),
        }));
        const enquiryRows: EnquiryRow[] = Array.isArray(enquiryPayload.records) ? enquiryPayload.records : [];
        const enquiries: AdminEnquiry[] = enquiryRows.map((row) => ({
          id: row.id, name: row.name, email: row.email, subject: row.subject, date: row.created_at,
          status: row.status, company: row.company, formType: row.form_type, message: row.message,
          phone: text(row.data.phone), internalNotes: row.internal_notes, data: row.data, updatedAt: row.updated_at ?? "",
        }));
        snapshot = {
          ...snapshot,
          contentRecords,
          insights,
          testimonials,
          enquiries,
          loadState: "ready",
          loadError: "",
          loadWarning: text(contentPayload.warning),
        };
        notify();
      } catch (error) {
        if (!active) return;
        const message = error instanceof Error ? error.message : "";
        if (/HTTP 401/.test(message) || /Authentication required/.test(message)) {
          router.replace("/admin/login");
          return;
        }
        snapshot = {
          ...snapshot,
          loadState: "error",
          loadError: error instanceof Error ? error.message : "Could not load CMS data.",
          loadWarning: "",
        };
        notify();
      }
    };
    void load();
    return () => { active = false; };
  }, [pathname, router]);
  const value = useMemo(
    () => ({ ...state, setSidebarCollapsed, setFeedback, setInsights, setEnquiries, setTestimonials, setContentRecords }),
    [state],
  );

  return <AdminStateContext.Provider value={value}>{children}</AdminStateContext.Provider>;
}

export function useAdminState() {
  const value = useContext(AdminStateContext);
  if (!value) {
    throw new Error("useAdminState must be used within AdminStateProvider.");
  }
  return value;
}
