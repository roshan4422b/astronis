"use client";

import Link from "next/link";
import { useState } from "react";
import { insightsCategories } from "../admin-data";
import { EnquiriesManagement, EnquiryDetailsDialog, TestimonialsManagement } from "./admin-engagement";
import AdminContentManagement from "./admin-content-management";
import {
  AdminIcon,
  ConfirmationDialog,
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
import SeoManagement from "./seo-management";
import AdminSettings from "./admin-settings";

type Section = "dashboard" | "services" | "industries" | "professionals" | "insights" | "global-presence" | "technology" | "enquiries" | "testimonials" | "seo" | "settings";
type RecordRow = { id?: string; sourceDefined?: boolean; title: string; category?: string; section?: string; status?: string; updated?: string; slug?: string; description?: string; content?: string; author?: string; designation?: string; expertise?: string; date?: string; name?: string; email?: string; subject?: string; excerpt?: string; publicationDate?: string; publicationDateValue?: string; seoTitle?: string; seoDescription?: string };

const meta: Record<Exclude<Section, "dashboard">, { title: string; description: string; action?: string }> = {
  services: { title: "Services", description: "Manage service content displayed across the Astronis Global website.", action: "Add service" },
  industries: { title: "Industries", description: "Browse and manage the industry pages in the public-site directory.", action: "Add industry" },
  professionals: { title: "Professionals", description: "Review professional profile entries shown on the public website.", action: "Add professional" },
  insights: { title: "Insights & Resources", description: "Manage articles, regulatory updates, publications, and knowledge resources.", action: "Add New Insight" },
  "global-presence": { title: "Global Presence", description: "Manage jurisdiction and regional pages currently represented on the website.", action: "Add jurisdiction" },
  technology: { title: "Technology & Digital Solutions", description: "Review technology and digital advisory pages.", action: "Add page" },
  enquiries: { title: "Contact Enquiries", description: "Review and organise website enquiries in one place." },
  testimonials: { title: "Testimonials", description: "Review and manage testimonial submissions before they are considered for publication." },
  seo: { title: "SEO Management", description: "Review and manage search metadata for website pages." },
  settings: { title: "Settings", description: "Manage admin profile preferences and review website configuration placeholders." },
};

const collections: Partial<Record<Section, RecordRow[]>> = {};

function ActionLinks({ href, onEdit }: { href: string; onEdit: () => void }) {
  return <div className="admin-row-actions"><Link href={href} aria-label="Open public page" title="Open public page"><AdminIcon name="eye" size={16} /></Link><button type="button" aria-label="Edit CMS record" title="Edit CMS record" onClick={onEdit}><AdminIcon name="edit" size={16} /></button></div>;
}

function toDateInputValue(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDemoDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function Dashboard({ onNotice }: { onNotice: (message: string) => void }) {
  const { enquiries, insights, setEnquiries } = useAdminState();
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const enquiryRows = enquiries.slice(0, 3).map((item) => [
    <strong className="admin-cell-primary" key="name">{item.name}</strong>,
    <span className="admin-cell-secondary" key="email">{item.email}</span>,
    item.subject,
    formatDemoDate(item.date),
    <StatusBadge key="status" status={item.status} />,
    <button key="action" className="admin-text-action" type="button" onClick={() => setSelectedEnquiryId(item.id)}>View details</button>,
  ]);
  const insightRows = insights.slice(0, 3).map((item) => [
    <strong className="admin-cell-primary" key="title">{item.title}</strong>,
    item.category,
    formatDemoDate(item.updatedAt),
    <StatusBadge key="status" status={item.status} />,
    <Link key="action" className="admin-text-action" href="/admin/insights">Open</Link>,
  ]);
  return <>
    <PageHeading title="Dashboard" description="A clear overview of your website content and engagement workspace." />
    <div className="admin-stat-grid">
      <StatCard label="New enquiries" value={String(enquiries.filter((item) => item.status === "New").length)} change="Current CMS inbox" icon="inbox" />
      <StatCard label="Published insights" value={String(insights.filter((item) => item.status === "Published").length)} change="Live CMS articles" icon="insights" />
      <StatCard label="Draft insights" value={String(insights.filter((item) => item.status === "Draft").length)} change="Editorial drafts" icon="drafts" />
    </div>
    <div className="admin-dashboard-grid">
      <section className="admin-panel admin-panel-wide"><div className="admin-panel-heading"><div><h2>Recent enquiries</h2><p>Latest persisted enquiries</p></div><Link href="/admin/enquiries">View all <AdminIcon name="arrow" size={14} /></Link></div><DataTable columns={["Name", "Email", "Subject", "Date", "Status", ""]} rows={enquiryRows} /></section>
      <section className="admin-panel admin-panel-wide"><div className="admin-panel-heading"><div><h2>Recent insights</h2><p>Latest saved editorial records</p></div><Link href="/admin/insights">View all <AdminIcon name="arrow" size={14} /></Link></div><DataTable columns={["Article title", "Category", "Last updated", "Status", ""]} rows={insightRows} /></section>
      <section className="admin-panel admin-quick-panel"><div className="admin-panel-heading"><div><h2>Quick actions</h2><p>Shortcuts to common tasks</p></div></div><div className="admin-quick-actions"><Link href="/admin/insights/new"><span><AdminIcon name="plus" /></span><span><strong>Add new insight</strong><small>Create a draft for review</small></span><AdminIcon name="arrow" size={15} /></Link><Link href="/admin/enquiries"><span><AdminIcon name="inbox" /></span><span><strong>View enquiries</strong><small>Review current inbox</small></span><AdminIcon name="arrow" size={15} /></Link></div></section>
    </div>
    {selectedEnquiryId ? <EnquiryDetailsDialog enquiry={enquiries.find((item) => item.id === selectedEnquiryId)} onClose={() => setSelectedEnquiryId(null)} onStatusChange={async (status) => {
      const response = await fetch(`/api/admin/enquiries/${selectedEnquiryId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const result = await response.json();
      if (!response.ok) { onNotice(result.error || "Could not save enquiry."); return false; }
      setEnquiries((current) => current.map((item) => item.id === selectedEnquiryId ? { ...item, status } : item));
      onNotice("Enquiry status saved.");
      return true;
    }} onNotesChange={async (internalNotes) => {
      const response = await fetch(`/api/admin/enquiries/${selectedEnquiryId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ internal_notes: internalNotes }) });
      const result = await response.json();
      if (!response.ok) { onNotice(result.error || "Could not save internal notes."); return false; }
      setEnquiries((current) => current.map((item) => item.id === selectedEnquiryId ? { ...item, internalNotes } : item));
      onNotice("Internal notes saved.");
      return true;
    }} /> : null}
  </>;
}

function CollectionPage({ section, onNotice }: { section: Exclude<Section, "dashboard" | "seo" | "settings" | "enquiries" | "testimonials">; onNotice: (message: string) => void }) {
  const config = meta[section];
  const { insights, setInsights } = useAdminState();
  const isInsights = section === "insights";
  const records: RecordRow[] = section === "insights"
    ? insights.map((item) => ({
      ...item,
      updated: formatDemoDate(item.updatedAt),
      publicationDate: formatDemoDate(item.publishedAt),
      publicationDateValue: item.publishedAt ? toDateInputValue(item.publishedAt) : "",
    }))
    : collections[section] || [];
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [authorFilter, setAuthorFilter] = useState("All authors");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [confirmation, setConfirmation] = useState<RecordRow | null>(null);
  const pageSize = 6;
  const filterOptions = isInsights ? insightsCategories : [...new Set(records.map((record) => record.category || record.section).filter((value): value is string => Boolean(value)))];
  const authors = [...new Set(records.map((record) => record.author).filter((value): value is string => Boolean(value)))];
  const filtered = records.filter((record) => {
    const matchesSearch = isInsights
      ? record.title.toLowerCase().includes(query.trim().toLowerCase())
      : Object.values(record).join(" ").toLowerCase().includes(query.trim().toLowerCase());
    const recordDate = isInsights ? record.publicationDateValue || "" : record.updated ? toDateInputValue(record.updated) : "";
    return matchesSearch
      && (sectionFilter === "All categories" || (record.category || record.section) === sectionFilter)
      && (statusFilter === "All statuses" || record.status === statusFilter)
      && (authorFilter === "All authors" || record.author === authorFilter)
      && (!dateFilter || recordDate === dateFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const showDate = isInsights;
  const searchPlaceholder = isInsights ? "Search by article title..." : "Search records...";

  async function deleteInsight(record: RecordRow) {
    if (!record.id || record.sourceDefined) return;
    if (!window.confirm(`Delete "${record.title}" from the CMS? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/admin/data?id=${encodeURIComponent(record.id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Insight could not be deleted.");
      setInsights((current) => current.filter((item) => item.id !== record.id));
      onNotice(`${record.title} was deleted.`);
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "Insight could not be deleted.");
    }
  }

  const headerAction = config.action
    ? section === "insights"
      ? <Link className="admin-button" href="/admin/insights/new"><AdminIcon name="plus" size={16} />{config.action}</Link>
      : <button className="admin-button" type="button" onClick={() => onNotice("Demo only — this action does not change website content.")}><AdminIcon name="plus" size={16} />{config.action}</button>
    : undefined;
  const columns = isInsights
      ? ["Article Title", "Category", "Author", "Last Updated", "Publication Date", "Status", "Actions"]
      : section === "services"
            ? ["Service name", "Category", "Status", "Last updated", "Actions"]
            : section === "industries"
              ? ["Industry name", "Description", "Status", "Actions"]
              : section === "professionals"
                ? ["Name", "Designation", "Expertise", "Status", "Actions"]
                : section === "global-presence"
                  ? ["Jurisdiction", "URL / slug", "Region", "Status", "Actions"]
                  : ["Page name", "Category", "Status", "Last updated", "Actions"];

  const rows = pageRows.map((record) => {
    const action = <ActionLinks key="actions" href={record.slug || "/"} onEdit={() => setConfirmation(record)} />;
    if (isInsights) return [
      <strong className="admin-cell-primary" key="title">{record.title}</strong>,
      record.category,
      record.author || "Editorial team",
      record.updated,
      record.publicationDate,
      <StatusBadge key="status" status={record.status || "Draft"} />,
      <div key="actions" className="admin-row-actions">
        <Link href={`/admin/insights/${record.id}`} aria-label={`View ${record.title}`} title="Preview insight"><AdminIcon name="eye" size={16} /></Link>
        <Link href={`/admin/insights/${record.id}/edit`} aria-label={`Edit ${record.title}`} title="Edit insight"><AdminIcon name="edit" size={16} /></Link>
        {!record.sourceDefined ? <button type="button" aria-label={`Delete ${record.title}`} title="Delete insight" onClick={() => void deleteInsight(record)}><AdminIcon name="close" size={16} /></button> : null}
        <details className="admin-insight-more">
          <summary aria-label={`More actions for ${record.title}`} title="More actions"><AdminIcon name="more" size={16} /></summary>
          <div><Link href={`/admin/insights/${record.id}`}>Open preview</Link><Link href={`/admin/insights/${record.id}/edit`}>Edit record</Link></div>
        </details>
      </div>,
    ];
    if (section === "services") return [<strong className="admin-cell-primary" key="title">{record.title}</strong>, record.category, <StatusBadge key="status" status={record.status || "Published"} />, "18 Oct 2026", action];
    if (section === "industries") return [<strong className="admin-cell-primary" key="title">{record.title}</strong>, record.description, <StatusBadge key="status" status={record.status || "Published"} />, action];
    if (section === "professionals") return [<strong className="admin-cell-primary" key="title">{record.title}</strong>, record.designation, record.expertise, <StatusBadge key="status" status={record.status || "Published"} />, action];
    if (section === "global-presence") return [<strong className="admin-cell-primary" key="title">{record.title}</strong>, record.slug, record.section, <StatusBadge key="status" status={record.status || "Published"} />, action];
    return [<strong className="admin-cell-primary" key="title">{record.title}</strong>, record.category, <StatusBadge key="status" status={record.status || "Published"} />, record.updated, action];
  });

  return <>
    <PageHeading title={config.title} description={config.description} action={headerAction} />
    <section className="admin-panel admin-list-panel">
      <div className="admin-toolbar">
        <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder={searchPlaceholder} />
        {filterOptions.length ? <FilterDropdown label="Filter by category" value={sectionFilter} options={["All categories", ...filterOptions]} onChange={(value) => { setSectionFilter(value); setPage(1); }} /> : null}
        <FilterDropdown label="Filter by publication status" value={statusFilter} options={isInsights ? ["All statuses", "Draft", "Published", "Archived"] : ["All statuses", ...new Set(records.map((record) => record.status).filter((value): value is string => Boolean(value)))]} onChange={(value) => { setStatusFilter(value); setPage(1); }} />
        {isInsights && authors.length > 1 ? <FilterDropdown label="Filter by author" value={authorFilter} options={["All authors", ...authors]} onChange={(value) => { setAuthorFilter(value); setPage(1); }} /> : null}
        {showDate ? <label className="admin-date-filter"><AdminIcon name="calendar" size={16} /><span className="admin-visually-hidden">Filter by publication date</span><input type="date" aria-label="Filter by publication date" value={dateFilter} onChange={(event) => { setDateFilter(event.target.value); setPage(1); }} /></label> : null}
        {query || sectionFilter !== "All categories" || statusFilter !== "All statuses" || authorFilter !== "All authors" || dateFilter ? <button type="button" className="admin-filter-reset" onClick={() => { setQuery(""); setSectionFilter("All categories"); setStatusFilter("All statuses"); setAuthorFilter("All authors"); setDateFilter(""); setPage(1); }}>Clear Filters</button> : null}
      </div>
      {isInsights ? <div className="admin-category-chips"><span>Categories</span>{insightsCategories.map((category) => <button type="button" key={category} className={sectionFilter === category ? "admin-chip-active" : ""} aria-pressed={sectionFilter === category} onClick={() => { setSectionFilter(sectionFilter === category ? "All categories" : category); setPage(1); }}>{category}</button>)}</div> : null}
      {records.length ? <DataTable columns={columns} rows={rows} /> : <EmptyState title="Nothing to show yet" description="Records will appear here when content is connected." />}
      <div className="admin-table-footer"><span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} records <i>·</i> preview data</span><Pagination page={page} pageCount={pageCount} onChange={setPage} /></div>
    </section>
    {confirmation ? <ConfirmationDialog title={`Edit ${confirmation.title}`} description="Use the management form to save changes to this record." onCancel={() => setConfirmation(null)} onConfirm={() => { setConfirmation(null); onNotice("Open the content editor to make changes."); }} /> : null}
  </>;
}

export default function AdminWorkspace({ section }: { section: Section }) {
  const { feedback, setFeedback, loadState, loadError } = useAdminState();
  const renderContent = () => {
    if (section === "dashboard") return <Dashboard onNotice={setFeedback} />;
    if (section === "enquiries") return <EnquiriesManagement />;
    if (section === "testimonials") return <TestimonialsManagement />;
    if (section === "seo") return <SeoManagement />;
    if (section === "settings") return <AdminSettings />;
    if (section === "services" || section === "industries" || section === "professionals" || section === "global-presence" || section === "technology") {
      return <AdminContentManagement section={section} />;
    }
    return <CollectionPage section={section} onNotice={setFeedback} />;
  };
  return <>{loadState === "loading" ? <p role="status" className="admin-detail-note">Loading saved CMS data…</p> : null}{loadState === "error" ? <div className="admin-insight-feedback" role="alert"><span>CMS data is unavailable: {loadError}</span></div> : null}{feedback ? <div className="admin-insight-feedback" role="status" aria-live="polite"><span>{feedback}</span><button type="button" onClick={() => setFeedback("")}>Dismiss</button></div> : null}{renderContent()}</>;
}
