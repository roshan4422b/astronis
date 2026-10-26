"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
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
  title?: string;
  internalNotes?: string;
  identityPublicationConsent?: boolean;
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
};
const text = (value: unknown) => typeof value === "string" ? value : "";

const initialSnapshot: AdminSnapshot = {
  sidebarCollapsed: false,
  feedback: "",
  insights: [],
  enquiries: [],
  testimonials: [],
  contentRecords: [],
  loadState: "loading",
  loadError: "",
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
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [contentResponse, enquiryResponse] = await Promise.all([
          fetch("/api/admin/data?collection=all", { cache: "no-store" }),
          fetch("/api/admin/data?collection=enquiries", { cache: "no-store" }),
        ]);
        const contentPayload = await contentResponse.json();
        const enquiryPayload = await enquiryResponse.json();
        if (!contentResponse.ok) throw new Error(contentPayload.error || "Could not load CMS content.");
        if (!enquiryResponse.ok) throw new Error(enquiryPayload.error || "Could not load enquiries.");
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
          text: text(row.data.text), excerpt: text(row.data.excerpt), company: text(row.data.company), designation: text(row.data.designation), service: text(row.data.service), date: row.created_at ?? "",
          consentStatus: row.data.consent === true && row.data.identityPublicationConsent === true ? "Granted" : "Not granted",
          approvalStatus: row.status === "published" ? "Approved" : row.status === "rejected" ? "Rejected" : "Pending",
          identityPublicationConsent: row.data.identityPublicationConsent === true, internalNotes: text(row.data.internalNotes),
        }));
        const enquiryRows: EnquiryRow[] = Array.isArray(enquiryPayload.records) ? enquiryPayload.records : [];
        const enquiries: AdminEnquiry[] = enquiryRows.map((row) => ({
          id: row.id, name: row.name, email: row.email, subject: row.subject, date: row.created_at,
          status: row.status, company: row.company, formType: row.form_type, message: row.message,
          phone: text(row.data.phone), internalNotes: row.internal_notes,
        }));
        snapshot = { ...snapshot, contentRecords, insights, testimonials, enquiries, loadState: "ready", loadError: "" };
        notify();
      } catch (error) {
        if (!active) return;
        snapshot = { ...snapshot, loadState: "error", loadError: error instanceof Error ? error.message : "Could not load CMS data." };
        notify();
      }
    };
    void load();
    return () => { active = false; };
  }, []);
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
