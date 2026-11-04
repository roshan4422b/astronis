"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
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
import styles from "./admin.module.css";
import {
  TestimonialMediaFields,
  type TestimonialMediaValue,
} from "./testimonial-media-fields";
import { isSupportedTestimonialVideoUrl } from "@/lib/testimonial-media";
import { displayEnquiryLabel, getEnquiryPreviewPosition } from "@/lib/admin/enquiry-display";

const pageSize = 5;

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

function displayDateTime(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Date not available";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

type EnquiryApiRecord = {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  created_at: string | null;
  status: string | null;
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
    status: (record.status || "New") as EnquiryStatus,
    company: record.company || "",
    formType: record.form_type || "",
    message: record.message || "",
    phone: record.phone || (typeof data.phone === "string" ? data.phone : ""),
    internalNotes: record.internal_notes || "",
    data,
    updatedAt: record.updated_at || "",
  };
}

function enquiryAdditionalDetails(enquiry: AdminEnquiry) {
  const omitted = new Set([
    "name", "email", "phone", "company", "subject", "service", "message", "formtype",
    "consent", "website", "captchaToken", "emailVerificationToken",
  ]);
  return Object.entries(enquiry.data || {}).filter(([key, value]) => {
    if (omitted.has(key) || /token|secret|password/i.test(key)) return false;
    return value !== null && value !== undefined && value !== "";
  }).map(([key, value]) => ({
    label: key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, (letter) => letter.toUpperCase()),
    value: typeof value === "string" ? value : JSON.stringify(value),
  }));
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

function dateInputValue(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
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
  onNotesChange,
  onDelete,
}: {
  enquiry: AdminEnquiry | undefined;
  onClose: () => void;
  onStatusChange: (status: EnquiryStatus) => Promise<boolean>;
  onNotesChange: (notes: string) => Promise<boolean>;
  onDelete?: (id: string, name: string) => Promise<{ deleted: boolean; message?: string }>;
}) {
  const [statusNotice, setStatusNotice] = useState("");
  const [notes, setNotes] = useState(enquiry?.internalNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
          setNotes(record.internalNotes || "");
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

  const additionalDetails = enquiryAdditionalDetails(details);
  return (
    <AccessibleDialog title="Enquiry details" labelledBy="enquiry-dialog-title" onClose={onClose}>
      {detailsLoading ? <p role="status">Loading complete enquiry details…</p> : null}
      {detailsError ? <p className="admin-detail-note" role="status">{detailsError}</p> : null}
      <dl className="admin-detail-list">
        <div><dt>Name</dt><dd>{details.name}</dd></div>
        <div><dt>Email</dt><dd>{details.email}</dd></div>
        <div><dt>Phone</dt><dd>{details.phone || "Not provided"}</dd></div>
        <div><dt>Company</dt><dd>{details.company || "Not provided"}</dd></div>
        <div><dt>Subject</dt><dd>{displayEnquiryLabel(details.subject)}</dd></div>
        <div><dt>Received</dt><dd>{displayDateTime(details.date)}</dd></div>
        <div><dt>Form type</dt><dd>{displayEnquiryLabel(details.formType)}</dd></div>
        <div><dt>Current status</dt><dd><StatusBadge status={details.status} /></dd></div>
        <div className="admin-detail-message"><dt>Message</dt><dd>{details.message || "No message provided."}</dd></div>
        {details.internalNotes ? <div className="admin-detail-message"><dt>Internal notes</dt><dd>{details.internalNotes}</dd></div> : null}
        {additionalDetails.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
      </dl>
      <a className="admin-button admin-button-secondary" href={`/api/admin/enquiries/export?id=${encodeURIComponent(details.id)}`}>Download Excel</a>
      <label className="admin-field">
        <span>Update enquiry status</span>
        <select
          aria-label={`Status for ${details.name}`}
          value={details.status}
          onChange={(event) => {
            const status = event.target.value;
            if (status === "New" || status === "In Progress" || status === "Responded" || status === "Closed") {
              void onStatusChange(status).then((saved) => {
                if (saved) setDetails((current) => current ? { ...current, status } : current);
                setStatusNotice(saved ? `Enquiry status saved as ${status}.` : "Could not save the enquiry status.");
              });
            }
          }}
        >
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Responded">Responded</option>
          <option value="Closed">Closed</option>
        </select>
      </label>
      <label className="admin-field">
        <span>Internal notes</span>
        <textarea rows={4} value={notes} maxLength={5000} onChange={(event) => setNotes(event.target.value)} />
      </label>
      <button className="admin-button admin-button-secondary" type="button" disabled={savingNotes} onClick={async () => {
        setSavingNotes(true);
        const saved = await onNotesChange(notes);
        if (saved) setDetails((current) => current ? { ...current, internalNotes: notes } : current);
        setStatusNotice(saved ? "Internal notes saved." : "Could not save internal notes.");
        setSavingNotes(false);
      }}>{savingNotes ? "Saving…" : "Save internal notes"}</button>
      {onDelete ? (
        <button
          className="admin-button admin-button-secondary admin-reject-action"
          type="button"
          disabled={deleting}
          onClick={async () => {
            setDeleting(true);
            const result = await onDelete(details.id, details.name);
            if (!result.deleted) setStatusNotice(result.message || "Could not delete enquiry.");
            setDeleting(false);
          }}
        >{deleting ? "Deleting…" : "Delete enquiry"}</button>
      ) : null}
      {statusNotice ? <p className="admin-detail-note" role="status">{statusNotice}</p> : null}
    </AccessibleDialog>
  );
}

export function EnquiriesManagement() {
  const { enquiries, setEnquiries } = useAdminState();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [deletingEnquiry, setDeletingEnquiry] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previewAnchorRef = useRef<HTMLButtonElement | null>(null);
  const previewPanelRef = useRef<HTMLDivElement | null>(null);
  const previewCloseTimer = useRef<number | null>(null);
  const previewCache = useRef(new Map<string, AdminEnquiry>());
  const [preview, setPreview] = useState<{ id: string; loading: boolean; record?: AdminEnquiry; error?: string } | null>(null);
  const [previewPinned, setPreviewPinned] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ top: 12, left: 12 });
  const filtered = enquiries.filter((enquiry) => {
    const search = query.trim().toLowerCase();
    return (!search || `${enquiry.name} ${enquiry.email} ${enquiry.subject}`.toLowerCase().includes(search))
      && (statusFilter === "All statuses" || enquiry.status === statusFilter)
      && (!dateFilter || dateInputValue(enquiry.date) === dateFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  const clearPreviewCloseTimer = useCallback(() => {
    if (previewCloseTimer.current !== null) {
      window.clearTimeout(previewCloseTimer.current);
      previewCloseTimer.current = null;
    }
  }, []);

  function loadPreview(id: string) {
    const cached = previewCache.current.get(id);
    if (cached) {
      setPreview({ id, loading: false, record: cached });
      return;
    }
    setPreview({ id, loading: true });
    void fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as { record?: EnquiryApiRecord; error?: string };
        if (!response.ok || !result.record) throw new Error(result.error || "Could not load enquiry details.");
        const record = mapEnquiryRecord(result.record);
        previewCache.current.set(id, record);
        setPreview((current) => current?.id === id ? { id, loading: false, record } : current);
      })
      .catch((error: unknown) => {
        setPreview((current) => current?.id === id
          ? { id, loading: false, error: error instanceof Error ? error.message : "Could not load enquiry details." }
          : current);
      });
  }

  function openPreview(id: string, anchor: HTMLButtonElement, pin = false) {
    clearPreviewCloseTimer();
    previewAnchorRef.current = anchor;
    if (pin) setPreviewPinned(true);
    if (preview?.id !== id) loadPreview(id);
  }

  function schedulePreviewClose() {
    clearPreviewCloseTimer();
    if (previewPinned) return;
    previewCloseTimer.current = window.setTimeout(() => {
      setPreview(null);
      previewCloseTimer.current = null;
    }, 260);
  }

  const closePreview = useCallback(() => {
    clearPreviewCloseTimer();
    setPreview(null);
    setPreviewPinned(false);
  }, [clearPreviewCloseTimer]);

  useEffect(() => {
    if (!preview) return;
    const positionPreview = () => {
      const anchor = previewAnchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const panel = previewPanelRef.current;
      const width = panel?.getBoundingClientRect().width || Math.min(380, window.innerWidth - 24);
      const height = panel?.getBoundingClientRect().height || 300;
      setPreviewPosition(getEnquiryPreviewPosition(
        rect,
        { width, height },
        { width: window.innerWidth, height: window.innerHeight },
      ));
    };
    const positionFrame = window.requestAnimationFrame(positionPreview);
    window.addEventListener("resize", positionPreview);
    window.addEventListener("scroll", positionPreview, true);
    return () => {
      window.cancelAnimationFrame(positionFrame);
      window.removeEventListener("resize", positionPreview);
      window.removeEventListener("scroll", positionPreview, true);
    };
  }, [preview]);

  useEffect(() => {
    if (!preview || !previewPinned) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (previewAnchorRef.current?.contains(target) || previewPanelRef.current?.contains(target)) return;
      closePreview();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [preview, previewPinned, closePreview]);

  useEffect(() => () => clearPreviewCloseTimer(), [clearPreviewCloseTimer]);

  function downloadEnquiryFile(url: string) {
    window.location.assign(url);
  }

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((enquiry) => [
    <button
      className={`admin-cell-primary ${styles.enquiryNameTrigger}`}
      key="name"
      type="button"
      aria-haspopup="dialog"
      aria-controls="admin-enquiry-hover-details"
      aria-expanded={preview?.id === enquiry.id}
      onMouseEnter={(event) => openPreview(enquiry.id, event.currentTarget)}
      onMouseLeave={schedulePreviewClose}
      onFocus={(event) => openPreview(enquiry.id, event.currentTarget)}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && previewPanelRef.current?.contains(event.relatedTarget)) return;
        if (previewPinned) closePreview();
        else schedulePreviewClose();
      }}
      onClick={(event) => openPreview(enquiry.id, event.currentTarget, true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") closePreview();
      }}
    >
      {enquiry.name}
    </button>,
    <span className="admin-engagement-email" key="email">{enquiry.email}</span>,
    displayEnquiryLabel(enquiry.subject),
    displayDate(enquiry.date),
    <StatusBadge key="status" status={enquiry.status} />,
    <div className="admin-engagement-actions" key="actions">
      <button
        className="admin-text-action"
        type="button"
        onClick={(event) => {
          triggerRef.current = event.currentTarget;
          closePreview();
          setSelectedId(enquiry.id);
        }}
      >View Details</button>
      <button className="admin-text-action" type="button" onClick={() => downloadEnquiryFile(`/api/admin/enquiries/export?id=${encodeURIComponent(enquiry.id)}`)}>Download Excel</button>
      <button
        className="admin-text-action admin-reject-action"
        type="button"
        disabled={deletingEnquiry}
        onClick={() => { void deleteEnquiry(enquiry.id, enquiry.name); }}
      >Delete</button>
    </div>,
  ]);
  const selected = enquiries.find((enquiry) => enquiry.id === selectedId);

  function closeDetails() {
    setSelectedId(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  async function updateEnquiry(id: string, values: { status?: EnquiryStatus; internalNotes?: string }) {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: values.status, internal_notes: values.internalNotes }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save enquiry.");
      setEnquiries((current) => current.map((item) => item.id === id ? { ...item, status: result.record.status, internalNotes: result.record.internal_notes } : item));
      setNotice("Enquiry changes saved.");
      return true;
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save enquiry.");
      return false;
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
      previewCache.current.delete(id);
      if (preview?.id === id) closePreview();
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
  const hasActiveFilters = Boolean(query.trim() || statusFilter !== "All statuses" || dateFilter);
  const previewRecord = preview?.record;
  const filteredExportParams = new URLSearchParams({
    scope: "filtered",
    search: query.trim(),
    status: statusFilter === "All statuses" ? "" : statusFilter,
    date: dateFilter,
  });

  return (
    <>
      <PageHeading
        title="Contact Enquiries"
        description="Review and organise website enquiries in one place."
        action={
          <div className="admin-enquiry-export-actions">
            {hasActiveFilters ? <button className="admin-button admin-button-secondary" type="button" title="Exports enquiries matching the current search, status, and date filters." onClick={() => downloadEnquiryFile(`/api/admin/enquiries/export?${filteredExportParams}`)}>Download Filtered</button> : null}
            <button className="admin-button" type="button" title="Exports all enquiries, ignoring active filters." onClick={() => downloadEnquiryFile("/api/admin/enquiries/export?scope=all")}>Download Excel</button>
          </div>
        }
      />
      <div className="admin-stat-grid admin-engagement-stats">
        <StatCard label="Total Enquiries" value={String(enquiries.length)} change="Stored enquiries" icon="inbox" />
        <StatCard label="New Enquiries" value={String(enquiries.filter((item) => item.status === "New").length)} change="Status: New" icon="bell" />
        <StatCard label="In Progress" value={String(enquiries.filter((item) => item.status === "In Progress").length)} change="Operational status" icon="drafts" />
        <StatCard label="Responded" value={String(enquiries.filter((item) => item.status === "Responded").length)} change="Operational status" icon="check" />
      </div>
      {notice ? <div className="admin-insight-feedback" role="status" aria-live="polite"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>Dismiss</button></div> : null}
      <section className="admin-panel admin-list-panel">
        <div className="admin-toolbar admin-engagement-toolbar">
          <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search by name, email, or subject..." />
          <FilterDropdown
            label="Filter by enquiry status"
            value={statusFilter}
            options={["All statuses", "New", "In Progress", "Responded", "Closed"]}
            onChange={(value) => { setStatusFilter(value); setPage(1); }}
          />
          <label className="admin-date-filter">
            <span className="admin-visually-hidden">Filter by received date</span>
            <input aria-label="Filter by received date" type="date" value={dateFilter} onChange={(event) => { setDateFilter(event.target.value); setPage(1); }} />
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
          <span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} enquiries</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>
      {selectedId ? (
        <EnquiryDetailsDialog
          key={selectedId}
          enquiry={selected}
          onClose={closeDetails}
          onStatusChange={(status) => updateEnquiry(selectedId, { status })}
          onNotesChange={(internalNotes) => updateEnquiry(selectedId, { internalNotes })}
          onDelete={deleteEnquiry}
        />
      ) : null}
      {preview && typeof document !== "undefined" ? createPortal(
        <div
          ref={previewPanelRef}
          className={styles.enquiryHoverCard}
          id="admin-enquiry-hover-details"
          role="dialog"
          aria-label="Enquiry quick details"
          aria-live="polite"
          style={{ top: previewPosition.top, left: previewPosition.left }}
          onMouseEnter={clearPreviewCloseTimer}
          onMouseLeave={schedulePreviewClose}
          onFocus={clearPreviewCloseTimer}
          onBlur={(event) => {
            if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
              if (previewPinned) closePreview();
              else schedulePreviewClose();
            }
          }}
        >
          <div className={styles.enquiryHoverHeader}>
            <strong>Enquiry</strong>
            <button type="button" aria-label="Close enquiry details" onClick={closePreview}>×</button>
          </div>
          {preview.loading ? <p className={styles.enquiryHoverState} role="status">Loading enquiry details…</p> : null}
          {preview.error ? (
            <div className={styles.enquiryHoverState} role="alert">
              <p>{preview.error}</p>
              <button type="button" onClick={() => loadPreview(preview.id)}>Try again</button>
            </div>
          ) : null}
          {!preview.loading && !preview.error && !preview.record ? <p className={styles.enquiryHoverState}>No enquiry details are available.</p> : null}
          {previewRecord ? (
            <>
              <dl className={styles.enquiryHoverDetails}>
                <div><dt>Name</dt><dd>{previewRecord.name || "Not provided"}</dd></div>
                <div><dt>Email</dt><dd>{previewRecord.email || "Not provided"}</dd></div>
                <div><dt>Phone</dt><dd>{previewRecord.phone || "Not provided"}</dd></div>
                <div><dt>Company</dt><dd>{previewRecord.company || "Not provided"}</dd></div>
                <div><dt>Subject</dt><dd>{displayEnquiryLabel(previewRecord.subject)}</dd></div>
                <div><dt>Form type</dt><dd>{displayEnquiryLabel(previewRecord.formType)}</dd></div>
                <div><dt>Received</dt><dd>{displayDateTime(previewRecord.date)}</dd></div>
                <div><dt>Status</dt><dd>{previewRecord.status}</dd></div>
                <div className={styles.enquiryHoverMessage}><dt>Message</dt><dd>{previewRecord.message || "No message provided."}</dd></div>
                {previewRecord.internalNotes ? <div className={styles.enquiryHoverMessage}><dt>Internal notes</dt><dd>{previewRecord.internalNotes}</dd></div> : null}
                {enquiryAdditionalDetails(previewRecord).map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
              </dl>
              <div className={styles.enquiryHoverActions}>
                <button type="button" onClick={() => { closePreview(); setSelectedId(previewRecord.id); }}>Open details</button>
                <button type="button" onClick={() => downloadEnquiryFile(`/api/admin/enquiries/export?id=${encodeURIComponent(previewRecord.id)}`)}>Download Excel</button>
              </div>
            </>
          ) : null}
        </div>,
        document.body,
      ) : null}
    </>
  );
}

export function TestimonialsManagement() {
  const { testimonials, setTestimonials } = useAdminState();
  const [query, setQuery] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("All approval statuses");
  const [consentFilter, setConsentFilter] = useState("All consent statuses");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState(false);
  const [savingTestimonial, setSavingTestimonial] = useState(false);
  const [uploadingTestimonialMedia, setUploadingTestimonialMedia] = useState(false);
  const [savingDecision, setSavingDecision] = useState(false);
  const [retryingNotificationId, setRetryingNotificationId] = useState<string | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState(false);
  const deletingTestimonialRef = useRef(false);
  const [testimonialEdit, setTestimonialEdit] = useState({
    name: "", email: "", title: "", company: "", designation: "", service: "", text: "", internalNotes: "",
    format: "written" as "written" | "video",
    photoPublicationConsent: false,
    imagePath: "", imageUrl: "", videoPath: "", videoUrl: "", videoSource: "",
  });
  const [pendingDecision, setPendingDecision] = useState<{ id: string; status: TestimonialApprovalStatus } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const triggerRef = useRef<HTMLElement | null>(null);
  const filtered = testimonials.filter((testimonial) => {
    const search = query.trim().toLowerCase();
    return (!search || `${testimonial.name} ${testimonial.text}`.toLowerCase().includes(search))
      && (approvalFilter === "All approval statuses" || testimonial.approvalStatus === approvalFilter)
      && (consentFilter === "All consent statuses" || testimonial.consentStatus === consentFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((testimonial) => [
    <strong className="admin-cell-primary" key="name">{testimonial.name}</strong>,
    <span className="admin-excerpt" key="excerpt">{testimonial.excerpt}</span>,
    <span key="rating" aria-label={`${testimonial.rating ?? 5} out of 5 stars`}>{"★".repeat(testimonial.rating ?? 5)}</span>,
    displayDate(testimonial.date),
    <StatusBadge key="consent" status={testimonial.consentStatus} />,
    <StatusBadge key="approval" status={testimonial.approvalStatus} />,
    <div className="admin-engagement-actions" key="actions">
      <button type="button" className="admin-text-action" onClick={(event) => {
        triggerRef.current = event.currentTarget;
        setSelectedId(testimonial.id);
      }}>View Details</button>
      <button type="button" className="admin-text-action" onClick={(event) => {
        triggerRef.current = event.currentTarget;
        setTestimonialEdit({
          name: testimonial.name,
          email: testimonial.email || "",
          title: testimonial.title || "",
          company: testimonial.company || "",
          designation: testimonial.designation || "",
          service: testimonial.service || "",
          text: testimonial.text,
          internalNotes: testimonial.internalNotes || "",
          format: testimonial.format === "video" ? "video" : "written",
          photoPublicationConsent: testimonial.photoPublicationConsent === true,
          imagePath: testimonial.imagePath || "",
          imageUrl: testimonial.imageUrl || "",
          videoPath: testimonial.videoPath || "",
          videoUrl: testimonial.videoUrl || "",
          videoSource: testimonial.videoSource || (testimonial.videoUrl ? "url" : ""),
        });
        setEditingTestimonial(true);
        setSelectedId(testimonial.id);
      }}>Edit</button>
      {!testimonial.sourceDefined ? (
        <button type="button" className="admin-text-action admin-reject-action" onClick={(event) => {
          triggerRef.current = event.currentTarget;
          setPendingDeleteId(testimonial.id);
        }} aria-label={`Delete ${testimonial.name}`}>Delete</button>
      ) : null}
      {testimonial.approvalStatus === "Pending" ? (
        <>
          <button type="button" className="admin-text-action" disabled={testimonial.consentStatus !== "Granted" || !testimonial.identityPublicationConsent} title={testimonial.consentStatus !== "Granted" ? "Publication consent is required." : "Identity publication consent is required."} onClick={(event) => { triggerRef.current = event.currentTarget; updateApproval(testimonial, "Approved"); }} aria-label={`Approve ${testimonial.name}`}>Approve</button>
          <button type="button" className="admin-text-action admin-reject-action" onClick={(event) => { triggerRef.current = event.currentTarget; updateApproval(testimonial, "Rejected"); }} aria-label={`Reject ${testimonial.name}`}>Reject</button>
        </>
      ) : null}
    </div>,
  ]);
  const selected = testimonials.find((testimonial) => testimonial.id === selectedId);
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
    setConsentFilter("All consent statuses");
    setPage(1);
  };

  const counts = {
    pending: testimonials.filter((item) => item.approvalStatus === "Pending").length,
    approved: testimonials.filter((item) => item.approvalStatus === "Approved").length,
    rejected: testimonials.filter((item) => item.approvalStatus === "Rejected").length,
  };

  return (
    <>
      <PageHeading
        title="Testimonials"
        description="Review and manage testimonial submissions before they are considered for publication."
        action={<Link className="admin-button" href="/admin/testimonials/new"><AdminIcon name="plus" size={16} />Add New Testimonial</Link>}
      />
      <div className="admin-stat-grid admin-engagement-stats">
        <StatCard label="Total Testimonials" value={String(testimonials.length)} change="Stored submissions" icon="quote" />
        <StatCard label="Pending Review" value={String(counts.pending)} change="Awaiting moderation" icon="drafts" />
        <StatCard label="Approved" value={String(counts.approved)} change="Published where consent allows" icon="check" />
        <StatCard label="Rejected" value={String(counts.rejected)} change="Moderation status" icon="close" />
      </div>
      {notice ? <div className="admin-insight-feedback" role="status" aria-live="polite"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>Dismiss</button></div> : null}
      <section className="admin-panel admin-list-panel">
        <div className="admin-toolbar admin-engagement-toolbar">
          <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search by name or testimonial..." />
          <FilterDropdown
            label="Filter by approval status"
            value={approvalFilter}
            options={["All approval statuses", "Pending", "Approved", "Rejected", "Archived"]}
            onChange={(value) => { setApprovalFilter(value); setPage(1); }}
          />
          <FilterDropdown
            label="Filter by consent status"
            value={consentFilter}
            options={["All consent statuses", "Granted", "Not granted"]}
            onChange={(value) => { setConsentFilter(value); setPage(1); }}
          />
          {query || approvalFilter !== "All approval statuses" || consentFilter !== "All consent statuses"
            ? <button type="button" className="admin-filter-reset" onClick={clearFilters}>Clear Filters</button>
            : null}
        </div>
        <DataTable
          columns={["Name", "Testimonial Excerpt", "Rating", "Submission Date", "Consent Status", "Approval Status", "Actions"]}
          rows={rows}
          emptyMessage="No testimonials match these filters."
        />
        <div className="admin-table-footer">
          <span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} testimonials</span>
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
                {selected.title ? <div><dt>Title</dt><dd>{selected.title}</dd></div> : null}
                {selected.company ? <div><dt>Company</dt><dd>{selected.company}</dd></div> : null}
                {selected.designation ? <div><dt>Designation</dt><dd>{selected.designation}</dd></div> : null}
                {selected.service ? <div><dt>Service</dt><dd>{selected.service}</dd></div> : null}
                <div><dt>Rating</dt><dd>{"★".repeat(selected.rating ?? 5)} ({selected.rating ?? 5}/5)</dd></div>
                <div><dt>Submission date</dt><dd>{displayDate(selected.date)}</dd></div>
                <div><dt>Consent status</dt><dd><StatusBadge status={selected.consentStatus} /></dd></div>
                <div><dt>Identity publication consent</dt><dd>{selected.identityPublicationConsent ? "Granted" : "Not granted"}</dd></div>
                {selected.imagePath || selected.photoPublicationConsent || (selected.mediaSubmitted && selected.format === "written") ? <div><dt>Customer image consent</dt><dd>{selected.photoPublicationConsent ? "Granted" : "Not granted"}</dd></div> : null}
                <div><dt>Approval status</dt><dd><StatusBadge status={selected.approvalStatus} /></dd></div>
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
                {selected.videoUrl && safeVideoUrl(selected.videoUrl) ? (
                  <div className="admin-detail-message">
                    <dt>Video preview</dt>
                    <dd>
                      <video src={safeVideoUrl(selected.videoUrl)} controls preload="metadata" playsInline className="video-preview" />
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
                    name: selected.name, email: selected.email || "", title: selected.title || "",
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
                {selected.approvalStatus === "Approved" ? (
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => updateApproval(selected, "Archived")}>Archive</button>
                ) : null}
                {selected.approvalStatus === "Archived" ? (
                  <button type="button" className="admin-button admin-button-secondary" onClick={() => updateApproval(selected, "Approved")}>Restore Approved</button>
                ) : null}
                {selected.notificationStatus === "failed" ? (
                  <button
                    type="button"
                    className="admin-button"
                    disabled={retryingNotificationId === selected.id}
                    onClick={() => void retryNotification(selected)}
                  >
                    {retryingNotificationId === selected.id ? "Retrying…" : "Retry email notification"}
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
    </>
  );
}
