"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
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
}: {
  enquiry: AdminEnquiry | undefined;
  onClose: () => void;
  onStatusChange: (status: EnquiryStatus) => Promise<boolean>;
  onNotesChange: (notes: string) => Promise<boolean>;
}) {
  const [statusNotice, setStatusNotice] = useState("");
  const [notes, setNotes] = useState(enquiry?.internalNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  if (!enquiry) {
    return (
      <AccessibleDialog title="Enquiry unavailable" labelledBy="enquiry-dialog-title" onClose={onClose}>
        <EmptyState
          title="Enquiry unavailable"
          description="This record is no longer available. Return to the enquiry listing to continue."
        />
      </AccessibleDialog>
    );
  }

  return (
    <AccessibleDialog title="Enquiry details" labelledBy="enquiry-dialog-title" onClose={onClose}>
      <dl className="admin-detail-list">
        <div><dt>Name</dt><dd>{enquiry.name}</dd></div>
        <div><dt>Email</dt><dd>{enquiry.email}</dd></div>
        {enquiry.phone ? <div><dt>Phone</dt><dd>{enquiry.phone}</dd></div> : null}
        <div><dt>Company</dt><dd>{enquiry.company || "Not provided"}</dd></div>
        <div><dt>Subject</dt><dd>{enquiry.subject}</dd></div>
        <div><dt>Received</dt><dd>{displayDate(enquiry.date)}</dd></div>
        <div><dt>Form type</dt><dd>{enquiry.formType}</dd></div>
        <div><dt>Current status</dt><dd><StatusBadge status={enquiry.status} /></dd></div>
        <div className="admin-detail-message"><dt>Message</dt><dd>{enquiry.message}</dd></div>
      </dl>
      <label className="admin-field">
        <span>Update enquiry status</span>
        <select
          aria-label={`Status for ${enquiry.name}`}
          value={enquiry.status}
          onChange={(event) => {
            const status = event.target.value;
            if (status === "New" || status === "In Progress" || status === "Responded" || status === "Closed") {
              void onStatusChange(status).then((saved) => setStatusNotice(saved ? `Enquiry status saved as ${status}.` : "Could not save the enquiry status."));
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
        setStatusNotice(saved ? "Internal notes saved." : "Could not save internal notes.");
        setSavingNotes(false);
      }}>{savingNotes ? "Saving…" : "Save internal notes"}</button>
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
  const triggerRef = useRef<HTMLElement | null>(null);
  const filtered = enquiries.filter((enquiry) => {
    const search = query.trim().toLowerCase();
    return (!search || `${enquiry.name} ${enquiry.email} ${enquiry.subject}`.toLowerCase().includes(search))
      && (statusFilter === "All statuses" || enquiry.status === statusFilter)
      && (!dateFilter || dateInputValue(enquiry.date) === dateFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((enquiry) => [
    <strong className="admin-cell-primary" key="name">{enquiry.name}</strong>,
    <span className="admin-engagement-email" key="email">{enquiry.email}</span>,
    enquiry.subject,
    displayDate(enquiry.date),
    <StatusBadge key="status" status={enquiry.status} />,
    <button
      key="view"
      className="admin-text-action"
      type="button"
      onClick={(event) => {
        triggerRef.current = event.currentTarget;
        setSelectedId(enquiry.id);
      }}
    >
      View Details
    </button>,
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

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("All statuses");
    setDateFilter("");
    setPage(1);
  };

  return (
    <>
      <PageHeading
        title="Contact Enquiries"
        description="Review and organise website enquiries in one place."
        action={<Link className="admin-button" href="/admin/enquiries/new"><AdminIcon name="plus" size={16} />Add New Enquiry</Link>}
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
          enquiry={selected}
          onClose={closeDetails}
          onStatusChange={(status) => updateEnquiry(selectedId, { status })}
          onNotesChange={(internalNotes) => updateEnquiry(selectedId, { internalNotes })}
        />
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
  const [testimonialEdit, setTestimonialEdit] = useState({
    name: "", email: "", title: "", company: "", designation: "", service: "", text: "", internalNotes: "",
  });
  const [pendingDecision, setPendingDecision] = useState<{ id: string; status: TestimonialApprovalStatus } | null>(null);
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
        });
        setEditingTestimonial(true);
        setSelectedId(testimonial.id);
      }}>Edit</button>
      {testimonial.approvalStatus === "Pending" ? (
        <>
          <button type="button" className="admin-text-action" disabled={testimonial.consentStatus !== "Granted" || !testimonial.identityPublicationConsent} title={testimonial.consentStatus !== "Granted" ? "Publication consent is required." : "Identity publication consent is required."} onClick={(event) => { triggerRef.current = event.currentTarget; setPendingDecision({ id: testimonial.id, status: "Approved" }); }} aria-label={`Approve ${testimonial.name}`}>Approve</button>
          <button type="button" className="admin-text-action admin-reject-action" onClick={(event) => { triggerRef.current = event.currentTarget; setPendingDecision({ id: testimonial.id, status: "Rejected" }); }} aria-label={`Reject ${testimonial.name}`}>Reject</button>
        </>
      ) : (
        <button type="button" className="admin-text-action" onClick={(event) => { triggerRef.current = event.currentTarget; setPendingDecision({ id: testimonial.id, status: "Pending" }); }} aria-label={`Return ${testimonial.name} to pending`}>Return to Pending</button>
      )}
    </div>,
  ]);
  const selected = testimonials.find((testimonial) => testimonial.id === selectedId);
  const target = pendingDecision
    ? testimonials.find((testimonial) => testimonial.id === pendingDecision.id)
    : undefined;

  function closeDetails() {
    setSelectedId(null);
    setEditingTestimonial(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  async function saveTestimonialEdits() {
    if (!selected || savingTestimonial) return;
    const name = testimonialEdit.name.trim();
    const text = testimonialEdit.text.trim();
    if (name.length < 2 || name.length > 120 || text.length < 10 || text.length > 5000) {
      setNotice("Use a name of 2–120 characters and testimonial text of 10–5000 characters.");
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
        consentStatus: saved.data.consent === true && saved.data.identityPublicationConsent === true ? "Granted" : "Not granted",
        identityPublicationConsent: saved.data.identityPublicationConsent === true,
        approvalStatus: saved.status === "published" ? "Approved" : saved.status === "rejected" ? "Rejected" : "Pending",
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
    setPendingDecision({ id: testimonial.id, status });
  }

  async function confirmApprovalChange() {
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
      const status = pendingDecision.status === "Approved" ? "published" : pendingDecision.status === "Rejected" ? "rejected" : "pending";
      const response = await fetch("/api/admin/data", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: pendingDecision.id, status }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update testimonial.");
      setTestimonials((current) => current.map((item) => item.id === pendingDecision.id ? { ...item, approvalStatus: pendingDecision.status } : item));
      setNotice(`Testimonial status saved as ${pendingDecision.status}.`);
      setSelectedId(null);
      setPendingDecision(null);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not update testimonial.");
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
            options={["All approval statuses", "Pending", "Approved", "Rejected"]}
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
          columns={["Name", "Testimonial Excerpt", "Submission Date", "Consent Status", "Approval Status", "Actions"]}
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
                  <label className="admin-field admin-content-full"><span>Testimonial Text <i>*</i></span><textarea rows={7} value={testimonialEdit.text} onChange={(event) => setTestimonialEdit((current) => ({ ...current, text: event.target.value }))} /></label>
                  <label className="admin-field admin-content-full"><span>Internal Admin Notes</span><textarea rows={3} value={testimonialEdit.internalNotes} onChange={(event) => setTestimonialEdit((current) => ({ ...current, internalNotes: event.target.value }))} /></label>
                  <p className="admin-detail-note">Consent records are not editable here. Approval still requires the original consent flags.</p>
                  <div className="admin-modal-actions">
                    <button type="button" className="admin-button admin-button-secondary" disabled={savingTestimonial} onClick={() => setEditingTestimonial(false)}>Cancel Edit</button>
                    <button type="button" className="admin-button" disabled={savingTestimonial} onClick={() => void saveTestimonialEdits()}>{savingTestimonial ? "Saving…" : "Save Testimonial"}</button>
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
                <div><dt>Submission date</dt><dd>{displayDate(selected.date)}</dd></div>
                <div><dt>Consent status</dt><dd><StatusBadge status={selected.consentStatus} /></dd></div>
                <div><dt>Identity publication consent</dt><dd>{selected.identityPublicationConsent ? "Granted" : "Not granted"}</dd></div>
                <div><dt>Approval status</dt><dd><StatusBadge status={selected.approvalStatus} /></dd></div>
                <div className="admin-detail-message"><dt>Full testimonial</dt><dd>{selected.text}</dd></div>
                {selected.internalNotes ? <div className="admin-detail-message"><dt>Internal notes</dt><dd>{selected.internalNotes}</dd></div> : null}
              </dl>
              <div className="admin-moderation-actions">
                <button type="button" className="admin-button admin-button-secondary" onClick={() => {
                  setTestimonialEdit({ name: selected.name, email: selected.email || "", title: selected.title || "", company: selected.company || "", designation: selected.designation || "", service: selected.service || "", text: selected.text, internalNotes: selected.internalNotes || "" });
                  setEditingTestimonial(true);
                }}>Edit Testimonial</button>
                {(["Pending", "Approved", "Rejected"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={status === "Rejected" ? "admin-button admin-button-secondary admin-reject-button" : "admin-button admin-button-secondary"}
                    disabled={selected.approvalStatus === status || (status === "Approved" && (selected.consentStatus !== "Granted" || !selected.identityPublicationConsent))}
                    onClick={() => updateApproval(selected, status)}
                  >
                    {status === "Pending" ? "Return to Pending" : status}
                  </button>
                ))}
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
          <div className="admin-modal-actions">
            <button type="button" className="admin-button admin-button-secondary" onClick={() => setPendingDecision(null)}>Cancel</button>
            <button type="button" className="admin-button" disabled={!target} onClick={confirmApprovalChange}>Confirm status change</button>
          </div>
        </AccessibleDialog>
      ) : null}
    </>
  );
}
