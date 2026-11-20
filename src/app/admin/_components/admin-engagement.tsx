"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  AdminIcon,
  DataTable,
  EmptyState,
  FilterDropdown,
  PageHeading,
  Pagination,
  SearchInput,
  StatCard,
  StatusBadge,
} from "./admin-ui";
import { useAdminState } from "./admin-state";
import type { AdminEnquiry, AdminTestimonial } from "./admin-state";
import type { EnquiryStatus, TestimonialApprovalStatus } from "../admin-data";
import { enquiryStatuses, isEnquiryStatus } from "@/lib/admin/enquiry-status";
import styles from "./admin.module.css";
import {
  TestimonialMediaFields,
  type TestimonialMediaValue,
} from "./testimonial-media-fields";
import { isSupportedTestimonialVideoUrl } from "@/lib/testimonial-media";
import { displayEnquiryLabel } from "@/lib/admin/enquiry-display";
import { enquiryFilterDateValue } from "@/lib/admin/enquiry-date";
import { createEnquiryReplyTemplate } from "@/lib/admin/enquiry-email";

const testimonialPageSize = 50;
const enquiryPageSize = 50;

function displayDate(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Date not available";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

type EnquiryApiRecord = {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  created_at: string | null;
  status: string | null;
  follow_up_date?: string | null;
  company: string | null;
  form_type: string | null;
  message: string | null;
  phone?: string | null;
  internal_notes?: string | null;
  updated_at?: string | null;
  data?: Record<string, unknown> | null;
};

function mapEnquiryRecord(record: EnquiryApiRecord): AdminEnquiry {
  const data = record.data && typeof record.data === "object" ? record.data : {};
  return {
    id: record.id,
    name: record.name || "",
    email: record.email || "",
    subject: record.subject || "",
    date: record.created_at || "",
    status: isEnquiryStatus(record.status) ? record.status : "New",
    followUpDate: record.follow_up_date || "",
    company: record.company || "",
    formType: record.form_type || "",
    message: record.message || "",
    phone: record.phone || (typeof data.phone === "string" ? data.phone : ""),
    internalNotes: record.internal_notes || "",
    data,
    updatedAt: record.updated_at || "",
  };
}

function enquiryDataText(enquiry: AdminEnquiry, ...keys: string[]) {
  for (const key of keys) {
    const value = enquiry.data?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "Not provided";
}

function whatsappUrl(value?: string) {
  const phone = value?.replace(/\D/g, "") || "";
  return phone ? `https://wa.me/${phone}` : "";
}

function safeVideoUrl(value: string) {
  const url = value.trim();
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    return new URL(url).protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function AccessibleDialog({
  title,
  labelledBy,
  onClose,
  children,
  className = "",
}: {
  title: string;
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), select:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    dialog.addEventListener("keydown", handleKeyDown);
    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, []);

  return (
    <div
      className={`admin-detail-backdrop ${className}`.trim()}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="admin-detail-dialog admin-engagement-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <div className="admin-detail-heading">
          <h2 id={labelledBy}>{title}</h2>
          <button ref={closeButtonRef} type="button" aria-label="Close details" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="admin-detail-content">{children}</div>
      </section>
    </div>
  );
}

export function EnquiryDetailsDialog({
  enquiry,
  onClose,
  onStatusChange,
}: {
  enquiry: AdminEnquiry | undefined;
  onClose: () => void;
  onStatusChange: (status: EnquiryStatus, followUpDate: string) => Promise<string | null>;
}) {
  const [statusNotice, setStatusNotice] = useState("");
  const [followUpDate, setFollowUpDate] = useState(enquiry?.followUpDate || "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [details, setDetails] = useState<AdminEnquiry | undefined>(enquiry);
  const [detailsLoading, setDetailsLoading] = useState(Boolean(enquiry));
  const [detailsError, setDetailsError] = useState("");
  const enquiryId = enquiry?.id;

  useEffect(() => {
    if (!enquiryId) return;
    let active = true;
    void fetch(`/api/admin/enquiries/${encodeURIComponent(enquiryId)}`, { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as { record?: EnquiryApiRecord; error?: string };
        if (!response.ok || !result.record) throw new Error(result.error || "Could not load complete enquiry details.");
        if (active) {
          const record = mapEnquiryRecord(result.record);
          setDetails(record);
          setFollowUpDate(record.followUpDate || "");
        }
      })
      .catch((error: unknown) => {
        if (active) setDetailsError(error instanceof Error ? error.message : "Could not load complete enquiry details.");
      })
      .finally(() => {
        if (active) setDetailsLoading(false);
      });
    return () => { active = false; };
  }, [enquiryId]);

  if (!details) {
    return (
      <AccessibleDialog title="Enquiry unavailable" labelledBy="enquiry-dialog-title" onClose={onClose}>
        <EmptyState
          title="Enquiry unavailable"
          description="This record is no longer available. Return to the enquiry listing to continue."
        />
      </AccessibleDialog>
    );
  }

  async function saveStatus(status: EnquiryStatus, nextFollowUpDate: string) {
    setSavingStatus(true);
    const error = await onStatusChange(status, nextFollowUpDate);
    if (!error) {
      setDetails((current) => current ? { ...current, status, followUpDate: nextFollowUpDate } : current);
      setFollowUpDate(nextFollowUpDate);
    }
    setStatusNotice(error || `Enquiry status saved as ${status}.`);
    setSavingStatus(false);
  }

  return (
    <AccessibleDialog title="Enquiry details" labelledBy="enquiry-dialog-title" onClose={onClose}>
      {detailsLoading ? <p role="status">Loading complete enquiry details…</p> : null}
      {detailsError ? <p className="admin-detail-note" role="status">{detailsError}</p> : null}
      <dl className="admin-detail-list">
        <div><dt>Name</dt><dd>{details.name || "Not provided"}</dd></div>
        <div><dt>Email</dt><dd>{details.email || "Not provided"}</dd></div>
        <div><dt>Mobile Number</dt><dd>{details.phone || "Not provided"}</dd></div>
        <div><dt>Page Submitted</dt><dd>{enquiryDataText(details, "pageUrl", "pathname", "pageTitle")}</dd></div>
        <div><dt>Date</dt><dd>{displayDate(details.date)}</dd></div>
        <div><dt>Status</dt><dd><StatusBadge status={details.status} /></dd></div>
        <div><dt>State</dt><dd>{enquiryDataText(details, "state")}</dd></div>
        <div><dt>Country</dt><dd>{enquiryDataText(details, "country")}</dd></div>
      </dl>
      <label className="admin-field">
        <span>Update status</span>
        <select
          aria-label={`Status for ${details.name}`}
          value={details.status}
          disabled={savingStatus}
          onChange={(event) => {
            const status = event.target.value;
            if (isEnquiryStatus(status)) void saveStatus(status, status === "Follow-up" ? followUpDate : "");
          }}
        >
          {enquiryStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
      </label>
      {details.status === "Follow-up" ? <label className="admin-field">
        <span>Follow-up Date</span>
        <input
          aria-label={`Follow-up date for ${details.name}`}
          type="date"
          value={followUpDate}
          disabled={savingStatus}
          onChange={(event) => setFollowUpDate(event.target.value)}
        />
      </label> : null}
      {details.status === "Follow-up" ? <div className="admin-follow-up-date-actions">
        <button
          className="admin-button"
          type="button"
          disabled={savingStatus || followUpDate === (details.followUpDate || "")}
          onClick={() => { void saveStatus("Follow-up", followUpDate); }}
        >{savingStatus ? "Saving..." : "Save Follow-up Date"}</button>
      </div> : null}
      {statusNotice ? <p className="admin-detail-note" role="status">{statusNotice}</p> : null}
    </AccessibleDialog>
  );
}

function EnquiryEmailDialog({
  enquiry,
  onClose,
  onSend,
}: {
  enquiry: AdminEnquiry;
  onClose: () => void;
  onSend: (subject: string, message: string) => Promise<string | null>;
}) {
  const template = createEnquiryReplyTemplate(enquiry.name, enquiry.subject);
  const [subject, setSubject] = useState(template.subject);
  const [message, setMessage] = useState(template.message);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFeedback("");
    const error = await onSend(subject, message);
    if (error) setFeedback(error);
    else {
      setFeedback("Email sent successfully.");
      setSent(true);
    }
    setSending(false);
  }

  return (
    <AccessibleDialog title="Reply to enquiry" labelledBy="enquiry-email-dialog-title" onClose={onClose}>
      <form className="admin-enquiry-email-form" onSubmit={(event) => { void submit(event); }}>
        <p><strong>To:</strong> {enquiry.email}</p>
        <label className="admin-field">
          <span>Subject</span>
          <input value={subject} maxLength={200} required disabled={sending} onChange={(event) => setSubject(event.target.value)} />
        </label>
        <label className="admin-field">
          <span>Message</span>
          <textarea value={message} maxLength={10000} rows={8} required disabled={sending} onChange={(event) => setMessage(event.target.value)} />
        </label>
        {feedback ? <p className="admin-detail-note" role="status">{feedback}</p> : null}
        <div className="admin-enquiry-email-actions">
          <button className="admin-button" type="submit" disabled={sending || sent || !subject.trim() || !message.trim()}>
            {sending ? "Sending..." : sent ? "Email Sent" : "Send Email"}
          </button>
        </div>
      </form>
    </AccessibleDialog>
  );
}

export function EnquiriesManagement() {
  const { enquiries, setEnquiries } = useAdminState();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All statuses" | EnquiryStatus>("All statuses");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [emailEnquiryId, setEmailEnquiryId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [deletingEnquiry, setDeletingEnquiry] = useState(false);
  const [printing, setPrinting] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const filtered = enquiries.filter((enquiry) => {
    const search = query.trim().toLowerCase();
    return (!search || `${enquiry.name} ${enquiry.email} ${enquiry.subject}`.toLowerCase().includes(search))
      && (statusFilter === "All statuses" || enquiry.status === statusFilter)
      && (!dateFilter || enquiryFilterDateValue(enquiry, statusFilter) === dateFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / enquiryPageSize));

  useEffect(() => {
    if (!printing) return;
    const finishPrinting = () => setPrinting(false);
    window.addEventListener("afterprint", finishPrinting);
    const frame = window.requestAnimationFrame(() => window.print());
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("afterprint", finishPrinting);
    };
  }, [printing]);

  function downloadEnquiryFile(url: string) {
    window.location.assign(url);
  }

  const displayedEnquiries = printing ? filtered : filtered.slice((page - 1) * enquiryPageSize, page * enquiryPageSize);
  const rows = displayedEnquiries.map((enquiry) => {
    const whatsapp = whatsappUrl(enquiry.phone);
    return [
      <strong className="admin-cell-primary" key="name">{enquiry.name}</strong>,
      <span className="admin-engagement-email" key="email">{enquiry.email}</span>,
      displayEnquiryLabel(enquiry.subject),
      displayDate(enquiry.date),
      <StatusBadge key="status" status={enquiry.status} />,
      <div className="admin-engagement-actions admin-enquiry-actions" key="actions">
        <button
          className="admin-icon-action"
          type="button"
          aria-label={`View details for ${enquiry.name}`}
          title="View Details"
          onClick={(event) => {
            triggerRef.current = event.currentTarget;
            setSelectedId(enquiry.id);
          }}
        ><AdminIcon name="eye" size={16} /></button>
        <button
          className="admin-icon-action"
          type="button"
          aria-label={`Download Excel for ${enquiry.name}`}
          title="Download Excel"
          onClick={() => downloadEnquiryFile(`/api/admin/enquiries/export?id=${encodeURIComponent(enquiry.id)}`)}
        ><AdminIcon name="download" size={16} /></button>
        <button
          className="admin-icon-action admin-reject-action"
          type="button"
          aria-label={`Delete enquiry from ${enquiry.name}`}
          title="Delete"
          disabled={deletingEnquiry}
          onClick={() => { void deleteEnquiry(enquiry.id, enquiry.name); }}
        ><AdminIcon name="trash" size={16} /></button>
        {enquiry.email ? <button className="admin-icon-action" type="button" aria-label={`Send email to ${enquiry.name}`} title="Send email" onClick={() => setEmailEnquiryId(enquiry.id)}><AdminIcon name="mail" size={16} /></button> : <button className="admin-icon-action" type="button" disabled aria-label="Email unavailable" title="Email unavailable"><AdminIcon name="mail" size={16} /></button>}
        {whatsapp ? <a className="admin-icon-action" href={whatsapp} target="_blank" rel="noreferrer" aria-label={`Contact ${enquiry.name} on WhatsApp`} title="WhatsApp"><AdminIcon name="whatsapp" size={16} /></a> : <button className="admin-icon-action" type="button" disabled aria-label="Mobile number unavailable" title="Mobile number unavailable"><AdminIcon name="whatsapp" size={16} /></button>}
      </div>,
    ];
  });
  const selected = enquiries.find((enquiry) => enquiry.id === selectedId);
  const selectedEmailEnquiry = enquiries.find((enquiry) => enquiry.id === emailEnquiryId);

  function closeDetails() {
    setSelectedId(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  async function updateEnquiry(id: string, values: { status: EnquiryStatus; followUpDate: string }): Promise<string | null> {
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: values.status, follow_up_date: values.followUpDate || null }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save enquiry.");
      setEnquiries((current) => current.map((item) => item.id === id ? {
        ...item,
        status: result.record.status,
        followUpDate: result.record.follow_up_date || "",
      } : item));
      setNotice("Enquiry changes saved.");
      return null;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save enquiry.";
      setNotice(message);
      return message;
    }
  }

  async function sendEnquiryEmail(id: string, subject: string, message: string): Promise<string | null> {
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Email could not be sent.");
      const recipient = enquiries.find((item) => item.id === id)?.email || "";
      setNotice(`Email sent to ${recipient}.`);
      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Email could not be sent.";
      setNotice(errorMessage);
      return errorMessage;
    }
  }

  async function deleteEnquiry(id: string, name: string): Promise<{ deleted: boolean; message?: string }> {
    if (deletingEnquiry) return { deleted: false, message: "Another enquiry deletion is already in progress." };
    if (!window.confirm(`Permanently delete the enquiry from "${name}"? This cannot be undone.`)) {
      return { deleted: false, message: "Deletion cancelled." };
    }

    setDeletingEnquiry(true);
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, { method: "DELETE" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not delete enquiry.");
      setEnquiries((current) => current.filter((item) => item.id !== id));
      setSelectedId((current) => current === id ? null : current);
      setNotice(`Enquiry from ${name} was deleted.`);
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLInputElement>(".admin-toolbar .admin-search input")?.focus();
      });
      return { deleted: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not delete enquiry.";
      setNotice(message);
      return { deleted: false, message };
    } finally {
      setDeletingEnquiry(false);
    }
  }

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All statuses");
    setDateFilter("");
    setPage(1);
  };
  const filteredExportParams = new URLSearchParams({
    scope: "filtered",
    search: query.trim(),
    status: statusFilter === "All statuses" ? "" : statusFilter,
    date: dateFilter,
  });

  return (
    <div className={styles.enquiryPrintView}>
      <PageHeading
        title="Contact Enquiries"
        action={
          <div className="admin-enquiry-export-actions">
            <button className="admin-button admin-button-secondary" type="button" title="Download enquiries matching the current status and filters." onClick={() => downloadEnquiryFile(`/api/admin/enquiries/export?${filteredExportParams}`)}><AdminIcon name="download" size={16} /> Download Excel</button>
            <button className="admin-button" type="button" title="Print all enquiries matching the current status and filters." onClick={() => setPrinting(true)}><AdminIcon name="printer" size={16} /> Print</button>
          </div>
        }
      />
      <div className="admin-stat-grid admin-engagement-stats">
        <StatCard label="Total Enquiries" value={String(enquiries.length)} change="All statuses" icon="inbox" pressed={statusFilter === "All statuses"} onClick={() => { setStatusFilter("All statuses"); setPage(1); }} />
        <StatCard label="New Enquiries" value={String(enquiries.filter((item) => item.status === "New").length)} change="Status: New" icon="bell" pressed={statusFilter === "New"} onClick={() => { setStatusFilter("New"); setPage(1); }} />
        <StatCard label="In Progress" value={String(enquiries.filter((item) => item.status === "In Progress").length)} change="Operational status" icon="drafts" pressed={statusFilter === "In Progress"} onClick={() => { setStatusFilter("In Progress"); setPage(1); }} />
        <StatCard label="Responded" value={String(enquiries.filter((item) => item.status === "Responded").length)} change="Operational status" icon="check" pressed={statusFilter === "Responded"} onClick={() => { setStatusFilter("Responded"); setPage(1); }} />
        <StatCard label="Closed" value={String(enquiries.filter((item) => item.status === "Closed").length)} change="Operational status" icon="close" pressed={statusFilter === "Closed"} onClick={() => { setStatusFilter("Closed"); setPage(1); }} />
        <StatCard label="Interested" value={String(enquiries.filter((item) => item.status === "Interested").length)} change="Lead status" icon="check" pressed={statusFilter === "Interested"} onClick={() => { setStatusFilter("Interested"); setPage(1); }} />
        <StatCard label="Not Interested" value={String(enquiries.filter((item) => item.status === "Not Interested").length)} change="Lead status" icon="close" pressed={statusFilter === "Not Interested"} onClick={() => { setStatusFilter("Not Interested"); setPage(1); }} />
        <StatCard label="Follow-up" value={String(enquiries.filter((item) => item.status === "Follow-up").length)} change="Needs follow-up" icon="calendar" pressed={statusFilter === "Follow-up"} onClick={() => { setStatusFilter("Follow-up"); setPage(1); }} />
      </div>
      <p className={styles.enquiryPrintSummary}>
        {statusFilter === "All statuses" ? "Total Enquiries" : statusFilter} · {filtered.length} enquiries
        {query.trim() ? ` · Search: ${query.trim()}` : ""}
        {dateFilter ? ` · ${statusFilter === "Follow-up" ? "Follow-up Date" : "Received Date"}: ${dateFilter}` : ""}
      </p>
      {notice ? <div className="admin-insight-feedback" role="status" aria-live="polite"><span>{notice}</span></div> : null}
      <section className="admin-panel admin-list-panel">
        <div className="admin-toolbar admin-engagement-toolbar">
          <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search by name, email, or subject..." />
          <FilterDropdown
            label="Filter by enquiry status"
            value={statusFilter}
            options={["All statuses", ...enquiryStatuses]}
            onChange={(value) => { setStatusFilter(isEnquiryStatus(value) ? value : "All statuses"); setPage(1); }}
          />
          <label className="admin-date-filter">
            <span className="admin-visually-hidden">{statusFilter === "Follow-up" ? "Filter by follow-up date" : "Filter by received date"}</span>
            <input aria-label={statusFilter === "Follow-up" ? "Filter by follow-up date" : "Filter by received date"} type="date" value={dateFilter} onChange={(event) => { setDateFilter(event.target.value); setPage(1); }} />
          </label>
          {query || statusFilter !== "All statuses" || dateFilter
            ? <button type="button" className="admin-filter-reset" onClick={clearFilters}>Clear Filters</button>
            : null}
        </div>
        <DataTable
          columns={["Name", "Email", "Subject", "Received Date", "Status", "Actions"]}
          rows={rows}
          emptyMessage="No enquiries match these filters."
        />
        <div className="admin-table-footer">
          <span>Showing {filtered.length ? (page - 1) * enquiryPageSize + 1 : 0}–{Math.min(page * enquiryPageSize, filtered.length)} of {filtered.length} enquiries</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>
      {selectedId ? (
        <EnquiryDetailsDialog
          key={selectedId}
          enquiry={selected}
          onClose={closeDetails}
          onStatusChange={(status, followUpDate) => updateEnquiry(selectedId, { status, followUpDate })}
        />
      ) : null}
      {selectedEmailEnquiry ? (
        <EnquiryEmailDialog
          key={selectedEmailEnquiry.id}
          enquiry={selectedEmailEnquiry}
          onClose={() => setEmailEnquiryId(null)}
          onSend={(subject, message) => sendEnquiryEmail(selectedEmailEnquiry.id, subject, message)}
        />
      ) : null}
    </div>
  );
}

export function TestimonialsManagement() {
  const { testimonials, setTestimonials } = useAdminState();
  const [query, setQuery] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("All approval statuses");
  const [typeFilter, setTypeFilter] = useState("All testimonial types");
  const [consentFilter, setConsentFilter] = useState("All consent statuses");
  const [page, setPage] = useState(1);
  const [printing, setPrinting] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState(false);
  const [savingTestimonial, setSavingTestimonial] = useState(false);
  const [uploadingTestimonialMedia, setUploadingTestimonialMedia] = useState(false);
  const [savingDecision, setSavingDecision] = useState(false);
  const [retryingNotificationId, setRetryingNotificationId] = useState<string | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState(false);
  const deletingTestimonialRef = useRef(false);
  const [testimonialEdit, setTestimonialEdit] = useState({
    name: "", email: "", phone: "", title: "", company: "", designation: "", service: "", text: "", internalNotes: "",
    format: "written" as "written" | "video",
    photoPublicationConsent: false,
    imagePath: "", imageUrl: "", videoPath: "", videoUrl: "", videoSource: "",
  });
  const [pendingDecision, setPendingDecision] = useState<{ id: string; status: TestimonialApprovalStatus } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [videoPlaybackError, setVideoPlaybackError] = useState<{ id: string; message: string } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!printing) return;
    const finishPrinting = () => setPrinting(false);
    window.addEventListener("afterprint", finishPrinting);
    const frame = window.requestAnimationFrame(() => window.print());
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("afterprint", finishPrinting);
    };
  }, [printing]);
  const filtered = testimonials.filter((testimonial) => {
    const search = query.trim().toLowerCase();
    const hasImage = Boolean(testimonial.imagePath || testimonial.imageUrl);
    const isVideo = testimonial.format === "video";
    return (!search || `${testimonial.name} ${testimonial.email || ""} ${testimonial.company} ${testimonial.text}`.toLowerCase().includes(search))
      && (approvalFilter === "All approval statuses" ||
        (approvalFilter === "Published" ? testimonial.approvalStatus === "Approved" : testimonial.approvalStatus === approvalFilter))
      && (typeFilter === "All testimonial types" ||
        (typeFilter === "Text testimonials" && !isVideo) ||
        (typeFilter === "Video testimonials" && isVideo) ||
        (typeFilter === "Image / media" && hasImage))
      && (consentFilter === "All consent statuses" || testimonial.consentStatus === consentFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / testimonialPageSize));
  const displayedTestimonials = printing ? filtered : filtered.slice((page - 1) * testimonialPageSize, page * testimonialPageSize);
  const rows = displayedTestimonials.map((testimonial) => [
    <strong className="admin-cell-primary" key="name">{testimonial.name}</strong>,
    <span className="admin-excerpt" key="excerpt">{testimonial.excerpt}</span>,
    <span key="type">{testimonial.format === "video" ? "Video" : "Text"}{testimonial.imagePath || testimonial.imageUrl ? " · Image" : ""}</span>,
    <span key="rating" aria-label={`${testimonial.rating ?? 5} out of 5 stars`}>{"★".repeat(testimonial.rating ?? 5)}</span>,
    displayDate(testimonial.date),
    <StatusBadge key="consent" status={testimonial.consentStatus} />,
    <StatusBadge key="approval" status={testimonial.approvalStatus === "Approved" ? "Published" : testimonial.approvalStatus} />,
    <div className="admin-engagement-actions" key="actions">
      <button type="button" className="admin-icon-action" aria-label={`View details for ${testimonial.name}`} title="View Details" onClick={(event) => {
        triggerRef.current = event.currentTarget;
        setSelectedId(testimonial.id);
      }}><AdminIcon name="eye" size={16} /></button>
    </div>,
  ]);
  const selected = testimonials.find((testimonial) => testimonial.id === selectedId);
  const selectedVideoUrl = selected?.videoPath
    ? `/api/admin/testimonials/${encodeURIComponent(selected.id)}/video`
    : selected?.videoUrl
      ? safeVideoUrl(selected.videoUrl)
      : "";
  const target = pendingDecision
    ? testimonials.find((testimonial) => testimonial.id === pendingDecision.id)
    : undefined;
  const deleteTarget = pendingDeleteId
    ? testimonials.find((testimonial) => testimonial.id === pendingDeleteId)
    : undefined;

  function closeDetails() {
    setSelectedId(null);
    setEditingTestimonial(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  async function saveTestimonialEdits() {
    if (!selected || savingTestimonial || uploadingTestimonialMedia) return;
    const name = testimonialEdit.name.trim();
    const text = testimonialEdit.text.trim();
    const hasVideo = Boolean(testimonialEdit.videoPath || (testimonialEdit.videoSource === "url" && isSupportedTestimonialVideoUrl(testimonialEdit.videoUrl)));
    if (
      name.length < 2 ||
      name.length > 120 ||
      text.length > 5000 ||
      (testimonialEdit.format === "written" && text.length < 10) ||
      (testimonialEdit.format === "video" && !hasVideo) ||
      (testimonialEdit.imagePath && !testimonialEdit.photoPublicationConsent)
    ) {
      setNotice("Provide a valid name, written text or video, and supported media.");
      return;
    }
    setSavingTestimonial(true);
    try {
      const response = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          data: {
            name,
            email: testimonialEdit.email.trim(),
            phone: testimonialEdit.phone.trim(),
            title: testimonialEdit.title.trim(),
            company: testimonialEdit.company.trim(),
            designation: testimonialEdit.designation.trim(),
            service: testimonialEdit.service.trim(),
            text,
            internalNotes: testimonialEdit.internalNotes.trim(),
            format: testimonialEdit.format,
            imagePath: testimonialEdit.imagePath,
            videoPath: testimonialEdit.videoPath,
            videoUrl: testimonialEdit.videoSource === "url" ? testimonialEdit.videoUrl.trim() : "",
            videoSource: testimonialEdit.videoSource,
            mediaSubmitted: Boolean(testimonialEdit.imagePath || testimonialEdit.videoPath || testimonialEdit.videoUrl),
            photoPublicationConsent: testimonialEdit.photoPublicationConsent,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Testimonial could not be saved.");
      const saved = result.record;
      setTestimonials((current) => current.map((item) => item.id === saved.id ? {
        ...item,
        ...saved.data,
        id: saved.id,
        date: saved.created_at || item.date,
        imageUrl: saved.data.imageUrl || "",
        imagePath: saved.data.imagePath || "",
        videoUrl: saved.data.videoUrl || "",
        videoPath: saved.data.videoPath || "",
        videoSource: saved.data.videoSource || "",
        consentStatus: saved.data.consent === true && saved.data.identityPublicationConsent === true ? "Granted" : "Not granted",
        identityPublicationConsent: saved.data.identityPublicationConsent === true,
        approvalStatus: saved.status === "published" || saved.status === "approved" ? "Approved" : saved.status === "rejected" ? "Rejected" : saved.status === "archived" ? "Archived" : "Pending",
      } : item));
      setEditingTestimonial(false);
      setNotice("Testimonial changes saved.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Testimonial could not be saved.");
    } finally {
      setSavingTestimonial(false);
    }
  }

  function updateApproval(testimonial: AdminTestimonial, status: TestimonialApprovalStatus) {
    if (status === "Rejected") setRejectionReason("");
    setPendingDecision({ id: testimonial.id, status });
  }

  async function confirmApprovalChange() {
    if (savingDecision) return;
    if (!pendingDecision || !testimonials.some((item) => item.id === pendingDecision.id)) {
      setPendingDecision(null);
      setNotice("That testimonial is no longer available.");
      return;
    }
    const testimonial = testimonials.find((item) => item.id === pendingDecision.id);
    if (pendingDecision.status === "Approved" && (testimonial?.consentStatus !== "Granted" || !testimonial.identityPublicationConsent)) {
      setNotice("Publication requires recorded consent for both the testimonial and the contributor's identity.");
      setPendingDecision(null);
      return;
    }
    try {
      setSavingDecision(true);
      const status = pendingDecision.status === "Approved" ? "published" : pendingDecision.status === "Rejected" ? "rejected" : "archived";
      const response = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: pendingDecision.id,
          status,
          ...(pendingDecision.status === "Rejected" ? { rejectionReason } : {}),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update testimonial.");
      setTestimonials((current) => current.map((item) => item.id === pendingDecision.id ? {
        ...item,
        approvalStatus: pendingDecision.status,
        rejectionReason: pendingDecision.status === "Rejected" ? rejectionReason.trim() : "",
        decisionAt: result.record?.data?.moderationDecisionAt || item.decisionAt,
        notificationStatus: result.notificationStatus || item.notificationStatus,
      } : item));
      const emailNotice = pendingDecision.status === "Approved" || pendingDecision.status === "Rejected"
        ? result.notificationStatus === "failed"
          ? " The decision was saved, but the notification could not be sent. Retry it from the testimonial details."
          : result.notificationStatus === "skipped"
            ? " The decision was saved, but no verified customer email was available."
            : result.notificationStatus === "sent-unrecorded"
              ? " The email was sent, but its delivery could not be recorded. Avoid retrying to prevent a duplicate."
            : ""
        : "";
      setNotice(`Testimonial status saved as ${pendingDecision.status}.${emailNotice}`);
      setSelectedId(null);
      setPendingDecision(null);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not update testimonial.");
    } finally {
      setSavingDecision(false);
    }
  }

  async function retryNotification(testimonial: AdminTestimonial) {
    if (retryingNotificationId) return;
    setRetryingNotificationId(testimonial.id);
    try {
      const response = await fetch(`/api/admin/testimonials/${encodeURIComponent(testimonial.id)}/notification/retry`, {
        method: "POST",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The notification could not be retried.");
      setTestimonials((current) => current.map((item) => item.id === testimonial.id
        ? { ...item, notificationStatus: result.notificationStatus }
        : item));
      setNotice("The moderation notification was delivered successfully.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The notification could not be retried.");
    } finally {
      setRetryingNotificationId(null);
    }
  }

  async function confirmTestimonialDelete() {
    if (deletingTestimonialRef.current || !pendingDeleteId) return;
    const targetRecord = testimonials.find((item) => item.id === pendingDeleteId);
    if (!targetRecord) {
      setPendingDeleteId(null);
      setNotice("That testimonial is no longer available.");
      return;
    }
    deletingTestimonialRef.current = true;
    setDeletingTestimonial(true);
    try {
      const response = await fetch(`/api/admin/data?id=${encodeURIComponent(targetRecord.id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Testimonial could not be deleted.");
      setTestimonials((current) => current.filter((item) => item.id !== targetRecord.id));
      setPendingDeleteId(null);
      if (selectedId === targetRecord.id) setSelectedId(null);
      setNotice(`${targetRecord.name} was permanently deleted.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Testimonial could not be deleted.");
    } finally {
      deletingTestimonialRef.current = false;
      setDeletingTestimonial(false);
    }
  }

  const clearFilters = () => {
    setQuery("");
    setApprovalFilter("All approval statuses");
    setTypeFilter("All testimonial types");
    setConsentFilter("All consent statuses");
    setPage(1);
  };

  const testimonialExportParams = new URLSearchParams({
    scope: "filtered",
    status: approvalFilter === "All approval statuses" ? "" : approvalFilter,
    search: query.trim(),
    type: typeFilter === "All testimonial types" ? "" : typeFilter,
    consent: consentFilter === "All consent statuses" ? "" : consentFilter,
  });
  function downloadTestimonialFile() {
    const link = document.createElement("a");
    link.href = `/api/admin/testimonials/export?${testimonialExportParams}`;
    link.download = "";
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
  }

  const counts = {
    total: testimonials.length,
    pending: testimonials.filter((item) => item.approvalStatus === "Pending").length,
    published: testimonials.filter((item) => item.approvalStatus === "Approved").length,
    rejected: testimonials.filter((item) => item.approvalStatus === "Rejected").length,
  };

  return (
    <div className={styles.testimonialPrintView}>
      <PageHeading
        title="Testimonials"
        action={
          <div className="admin-testimonial-export-actions">
            <button className="admin-button admin-button-secondary" type="button" title="Download testimonials matching the current status and filters." onClick={downloadTestimonialFile}><AdminIcon name="download" size={16} /> Download Excel</button>
            <button className="admin-button admin-button-secondary" type="button" title="Print testimonials matching the current status and filters." onClick={() => setPrinting(true)}><AdminIcon name="printer" size={16} /> Print</button>
            <Link className="admin-button" href="/admin/testimonials/new"><AdminIcon name="plus" size={16} />Add New Testimonial</Link>
          </div>
        }
      />
      <div className="admin-stat-grid admin-engagement-stats">
        <StatCard label="Total Testimonials" value={String(counts.total)} change="Stored submissions" icon="quote" pressed={approvalFilter === "All approval statuses"} onClick={() => { setApprovalFilter("All approval statuses"); setPage(1); }} />
        <StatCard label="Pending Review" value={String(counts.pending)} change="Awaiting moderation" icon="drafts" pressed={approvalFilter === "Pending"} onClick={() => { setApprovalFilter("Pending"); setPage(1); }} />
        <StatCard label="Published" value={String(counts.published)} change="Visible where consent allows" icon="check" pressed={approvalFilter === "Published"} onClick={() => { setApprovalFilter("Published"); setPage(1); }} />
        <StatCard label="Rejected" value={String(counts.rejected)} change="Moderation status" icon="close" pressed={approvalFilter === "Rejected"} onClick={() => { setApprovalFilter("Rejected"); setPage(1); }} />
      </div>
      <p className={styles.testimonialPrintSummary}>
        {approvalFilter === "All approval statuses" ? "Total Testimonials" : approvalFilter === "Pending" ? "Pending Review" : approvalFilter} · {filtered.length} testimonials
        {query.trim() ? ` · Search: ${query.trim()}` : ""}
        {typeFilter !== "All testimonial types" ? ` · Type: ${typeFilter}` : ""}
        {consentFilter !== "All consent statuses" ? ` · Consent: ${consentFilter}` : ""}
      </p>
      {notice ? <div className="admin-insight-feedback" role="status" aria-live="polite"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>Dismiss</button></div> : null}
      <section className="admin-panel admin-list-panel">
        <div className="admin-toolbar admin-engagement-toolbar">
          <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search by name or testimonial..." />
          <FilterDropdown
            label="Filter by publication status"
            value={approvalFilter}
            options={["All approval statuses", "Pending", "Published", "Rejected", "Archived"]}
            onChange={(value) => { setApprovalFilter(value); setPage(1); }}
          />
          <FilterDropdown
            label="Filter by testimonial type or media"
            value={typeFilter}
            options={["All testimonial types", "Text testimonials", "Video testimonials", "Image / media"]}
            onChange={(value) => { setTypeFilter(value); setPage(1); }}
          />
          <FilterDropdown
            label="Filter by consent status"
            value={consentFilter}
            options={["All consent statuses", "Granted", "Not granted"]}
            onChange={(value) => { setConsentFilter(value); setPage(1); }}
          />
          {query || approvalFilter !== "All approval statuses" || typeFilter !== "All testimonial types" || consentFilter !== "All consent statuses"
            ? <button type="button" className="admin-filter-reset" onClick={clearFilters}>Clear Filters</button>
            : null}
        </div>
        <DataTable
          columns={["Name", "Testimonial Excerpt", "Type / Media", "Rating", "Submission Date", "Consent Status", "Publication Status", "Actions"]}
          rows={rows}
          emptyMessage="No testimonials match these filters."
        />
        <div className="admin-table-footer">
          <span>Showing {filtered.length ? (page - 1) * testimonialPageSize + 1 : 0}–{Math.min(page * testimonialPageSize, filtered.length)} of {filtered.length} testimonials</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>
      {selectedId ? (
        <AccessibleDialog title="Testimonial details" labelledBy="testimonial-dialog-title" onClose={closeDetails}>
          {selected ? (
            <>
              {editingTestimonial ? (
                <div className="admin-engagement-fields">
                  <label className="admin-field"><span>Contributor Name <i>*</i></span><input value={testimonialEdit.name} onChange={(event) => setTestimonialEdit((current) => ({ ...current, name: event.target.value }))} /></label>
                  <label className="admin-field"><span>Email Address</span><input type="email" value={testimonialEdit.email} onChange={(event) => setTestimonialEdit((current) => ({ ...current, email: event.target.value }))} /></label>
                  <label className="admin-field"><span>Phone</span><input type="tel" value={testimonialEdit.phone} onChange={(event) => setTestimonialEdit((current) => ({ ...current, phone: event.target.value }))} /></label>
                  <label className="admin-field"><span>Testimonial Title</span><input value={testimonialEdit.title} onChange={(event) => setTestimonialEdit((current) => ({ ...current, title: event.target.value }))} /></label>
                  <label className="admin-field"><span>Company</span><input value={testimonialEdit.company} onChange={(event) => setTestimonialEdit((current) => ({ ...current, company: event.target.value }))} /></label>
                  <label className="admin-field"><span>Designation</span><input value={testimonialEdit.designation} onChange={(event) => setTestimonialEdit((current) => ({ ...current, designation: event.target.value }))} /></label>
                  <label className="admin-field"><span>Service</span><input value={testimonialEdit.service} onChange={(event) => setTestimonialEdit((current) => ({ ...current, service: event.target.value }))} /></label>
                  <label className="admin-field"><span>Testimonial Type</span><select value={testimonialEdit.format} onChange={(event) => setTestimonialEdit((current) => ({ ...current, format: event.target.value as "written" | "video" }))}><option value="written">Written testimonial</option><option value="video">Video testimonial</option></select></label>
                  <label className="admin-field admin-content-full"><span>{testimonialEdit.format === "video" ? "Supporting Text (optional)" : "Testimonial Text"}{testimonialEdit.format === "written" ? <i> *</i> : null}</span><textarea rows={7} value={testimonialEdit.text} onChange={(event) => setTestimonialEdit((current) => ({ ...current, text: event.target.value }))} /></label>
                  <TestimonialMediaFields
                    value={testimonialEdit}
                    onChange={(media: TestimonialMediaValue) => setTestimonialEdit((current) => ({
                      ...current,
                      ...media,
                      ...(current.imagePath !== media.imagePath ? { photoPublicationConsent: false } : {}),
                    }))}
                    onUploadingChange={setUploadingTestimonialMedia}
                    disabled={savingTestimonial || uploadingTestimonialMedia}
                  />
                  {testimonialEdit.imagePath ? (
                    <label className="admin-field admin-content-full">
                      <span>Customer image publication consent <i>*</i></span>
                      <span><input type="checkbox" checked={testimonialEdit.photoPublicationConsent} onChange={(event) => setTestimonialEdit((current) => ({ ...current, photoPublicationConsent: event.target.checked }))} /> Consent to publish this customer image is on file.</span>
                    </label>
                  ) : null}
                  <label className="admin-field admin-content-full"><span>Internal Admin Notes</span><textarea rows={3} value={testimonialEdit.internalNotes} onChange={(event) => setTestimonialEdit((current) => ({ ...current, internalNotes: event.target.value }))} /></label>
                  <p className="admin-detail-note">Consent records are not editable here. Approval still requires the original consent flags.</p>
                  <div className="admin-modal-actions">
                    <button type="button" className="admin-button admin-button-secondary" disabled={savingTestimonial || uploadingTestimonialMedia} onClick={() => setEditingTestimonial(false)}>Cancel Edit</button>
                    <button type="button" className="admin-button" disabled={savingTestimonial || uploadingTestimonialMedia} onClick={() => void saveTestimonialEdits()}>{savingTestimonial ? "Saving…" : uploadingTestimonialMedia ? "Uploading media…" : "Save Testimonial"}</button>
                  </div>
                </div>
              ) : (
                <>
              <dl className="admin-detail-list">
                <div><dt>Name</dt><dd>{selected.name}</dd></div>
                {selected.email ? <div><dt>Email</dt><dd>{selected.email}</dd></div> : null}
                {selected.phone ? <div><dt>Phone</dt><dd>{selected.phone}</dd></div> : null}
                {selected.title ? <div><dt>Title</dt><dd>{selected.title}</dd></div> : null}
                {selected.company ? <div><dt>Company</dt><dd>{selected.company}</dd></div> : null}
                {selected.designation ? <div><dt>Designation</dt><dd>{selected.designation}</dd></div> : null}
                {selected.service ? <div><dt>Service</dt><dd>{selected.service}</dd></div> : null}
                <div><dt>Rating</dt><dd>{"★".repeat(selected.rating ?? 5)} ({selected.rating ?? 5}/5)</dd></div>
                <div><dt>Submission date</dt><dd>{displayDate(selected.date)}</dd></div>
                <div><dt>Consent status</dt><dd><StatusBadge status={selected.consentStatus} /></dd></div>
                <div><dt>Identity publication consent</dt><dd>{selected.identityPublicationConsent ? "Granted" : "Not granted"}</dd></div>
                {selected.imagePath || selected.photoPublicationConsent || (selected.mediaSubmitted && selected.format === "written") ? <div><dt>Customer image consent</dt><dd>{selected.photoPublicationConsent ? "Granted" : "Not granted"}</dd></div> : null}
                <div><dt>Publication status</dt><dd><StatusBadge status={selected.approvalStatus === "Approved" ? "Published" : selected.approvalStatus} /></dd></div>
                {selected.decisionAt ? <div><dt>Decision date</dt><dd>{displayDate(selected.decisionAt)}</dd></div> : null}
                {selected.rejectionReason ? <div className="admin-detail-message"><dt>Rejection reason</dt><dd>{selected.rejectionReason}</dd></div> : null}
                {selected.notificationStatus ? <div><dt>Notification status</dt><dd><StatusBadge status={selected.notificationStatus} /></dd></div> : null}
                <div className="admin-detail-message"><dt>Full testimonial</dt><dd>{selected.text || "Video testimonial"}</dd></div>
                {selected.imageUrl && safeVideoUrl(selected.imageUrl) ? (
                  <div className="admin-detail-message">
                    <dt>Customer image</dt>
                    <dd><Image src={safeVideoUrl(selected.imageUrl)} alt={`${selected.name} testimonial`} width={96} height={96} unoptimized className="admin-testimonial-image-preview" /></dd>
                  </div>
                ) : null}
                {selectedVideoUrl ? (
                  <div className="admin-detail-message">
                    <dt>Video preview</dt>
                    <dd>
                      <video
                        key={`${selected.id}-${selected.videoPath || selected.videoUrl}`}
                        src={selectedVideoUrl}
                        controls
                        preload="metadata"
                        playsInline
                        className="video-preview"
                        onError={() => setVideoPlaybackError({
                          id: selected.id,
                          message: "Video could not be loaded. Try reopening the details; the file may use a format this browser cannot play.",
                        })}
                      />
                      {videoPlaybackError?.id === selected.id ? <small role="alert">{videoPlaybackError.message}</small> : null}
                      {selected.videoSource ? <small>{selected.videoSource === "recorded" ? "Recorded by the customer" : selected.videoSource === "url" ? "Provided as a video URL" : "Uploaded video"}</small> : null}
                    </dd>
                  </div>
                ) : selected.mediaSubmitted ? (
                  <div className="admin-detail-message">
                    <dt>Media attachment</dt>
                    <dd>Media was submitted but no playable media reference is available.</dd>
                  </div>
                ) : null}
                {selected.internalNotes ? <div className="admin-detail-message"><dt>Internal notes</dt><dd>{selected.internalNotes}</dd></div> : null}
              </dl>
              <div className="admin-moderation-actions">
                <button type="button" className="admin-button admin-button-secondary" onClick={() => {
                  setTestimonialEdit({
                    name: selected.name, email: selected.email || "", phone: selected.phone || "", title: selected.title || "",
                    company: selected.company || "", designation: selected.designation || "",
                    service: selected.service || "", text: selected.text, internalNotes: selected.internalNotes || "",
                    format: selected.format === "video" ? "video" : "written",
                    photoPublicationConsent: selected.photoPublicationConsent === true,
                    imagePath: selected.imagePath || "", imageUrl: selected.imageUrl || "",
                    videoPath: selected.videoPath || "", videoUrl: selected.videoUrl || "",
                    videoSource: selected.videoSource || (selected.videoUrl ? "url" : ""),
                  });
                  setEditingTestimonial(true);
                }}>Edit Testimonial</button>
                {!selected.sourceDefined ? (
                  <button type="button" className="admin-button admin-button-secondary admin-reject-button" onClick={() => {
                    setPendingDeleteId(selected.id);
                    setSelectedId(null);
                  }}>Delete Testimonial</button>
                ) : null}
                {selected.approvalStatus === "Pending" ? (["Approved", "Rejected"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={status === "Rejected" ? "admin-button admin-button-secondary admin-reject-button" : "admin-button admin-button-secondary"}
                    disabled={selected.approvalStatus === status || (status === "Approved" && (selected.consentStatus !== "Granted" || !selected.identityPublicationConsent))}
                    onClick={() => updateApproval(selected, status)}
                  >
                    {status}
                  </button>
                )) : null}
                {selected.approvalStatus !== "Archived" ? (
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => updateApproval(selected, "Archived")}>Archive</button>
                ) : null}
                {selected.approvalStatus === "Archived" ? (
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => updateApproval(selected, "Approved")}>Restore Approved</button>
                ) : null}
                {selected.notificationStatus === "failed" ||
                (!selected.notificationStatus && (selected.approvalStatus === "Approved" || selected.approvalStatus === "Rejected")) ? (
                  <button
                    type="button"
                    className="admin-button"
                    disabled={retryingNotificationId === selected.id}
                    onClick={() => void retryNotification(selected)}
                  >
                    {retryingNotificationId === selected.id
                      ? "Sending…"
                      : selected.notificationStatus === "failed"
                        ? "Retry email notification"
                        : "Send email notification"}
                  </button>
                ) : null}
              </div>
                </>
              )}
            </>
          ) : (
            <EmptyState title="No matching testimonial" description="This record is no longer available. Close this panel and return to the listing." />
          )}
          <p className="admin-detail-note">Approval is blocked unless the submission includes explicit publication and identity consent.</p>
        </AccessibleDialog>
      ) : null}
      {pendingDecision ? (
        <AccessibleDialog
          title="Confirm moderation change"
          labelledBy="testimonial-confirm-title"
          onClose={() => setPendingDecision(null)}
          className="admin-confirmation-layer"
        >
          <p className="admin-detail-confirmation">
            {target
              ? `Change the approval status for ${target.name} to ${pendingDecision.status}? Approval is permitted only when required publication and identity consent have been granted.`
              : "This testimonial is no longer available."}
          </p>
          {pendingDecision.status === "Rejected" ? (
            <label className="admin-field admin-content-full">
              <span>Reason for rejection <i>*</i></span>
              <textarea
                rows={4}
                maxLength={1000}
                required
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                placeholder="Provide a clear reason to include in the visitor notification."
              />
            </label>
          ) : null}
          <div className="admin-modal-actions">
            <button type="button" className="admin-button admin-button-secondary" disabled={savingDecision} onClick={() => setPendingDecision(null)}>Cancel</button>
            <button type="button" className="admin-button" disabled={!target || savingDecision || (pendingDecision.status === "Rejected" && rejectionReason.trim().length < 3)} onClick={confirmApprovalChange}>{savingDecision ? "Saving…" : "Confirm status change"}</button>
          </div>
        </AccessibleDialog>
      ) : null}
      {pendingDeleteId ? (
        <AccessibleDialog
          title="Permanently delete testimonial?"
          labelledBy="testimonial-delete-title"
          onClose={() => {
            if (!deletingTestimonial) setPendingDeleteId(null);
          }}
          className="admin-confirmation-layer"
        >
          <p className="admin-detail-confirmation">
            {deleteTarget
              ? `Permanently delete ${deleteTarget.name}${deleteTarget.company ? ` of ${deleteTarget.company}` : ""} and remove this testimonial from the CMS? This cannot be undone.`
              : "This testimonial is no longer available."}
          </p>
          <div className="admin-modal-actions">
            <button type="button" className="admin-button admin-button-secondary" disabled={deletingTestimonial} onClick={() => setPendingDeleteId(null)}>Cancel</button>
            <button type="button" className="admin-button admin-button-secondary admin-reject-button" disabled={!deleteTarget || deletingTestimonial} onClick={() => void confirmTestimonialDelete()}>{deletingTestimonial ? "Deleting…" : "Delete Permanently"}</button>
          </div>
        </AccessibleDialog>
      ) : null}
    </div>
  );
}
