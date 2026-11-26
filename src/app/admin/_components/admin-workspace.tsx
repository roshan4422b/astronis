"use client";

import Link from "next/link";
import { useState } from "react";
import { enquiryStatuses } from "@/lib/admin/enquiry-status";
import { insightsCategories } from "../admin-data";
import { EnquiriesManagement, TestimonialsManagement } from "./admin-engagement";
import { getEnquiryTrend, getPublishedInsightCategories } from "./admin-dashboard-analytics";
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

const meta: Record<Exclude<Section, "dashboard">, { title: string; description: string }> = {
  services: { title: "Services", description: "Manage service content displayed across the Astronis Global website." },
  industries: { title: "Industries", description: "Browse and manage the industry pages in the public-site directory." },
  professionals: { title: "Professionals", description: "Review professional profile entries shown on the public website." },
  insights: { title: "Insights & Resources", description: "Manage articles, regulatory updates, publications, and knowledge resources." },
  "global-presence": { title: "Global Presence", description: "Manage jurisdiction and regional pages currently represented on the website." },
  technology: { title: "Technology & Digital Solutions", description: "Review technology and digital advisory pages." },
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

function DashboardCharts({ enquiries, insights }: { enquiries: { date: string; status: string }[]; insights: { category: string; status: string }[] }) {
  const enquiryTrend = getEnquiryTrend(enquiries);
  const publishedCategories = getPublishedInsightCategories(insights);
  const chartWidth = 720;
  const chartHeight = 220;
  const chartLeft = 42;
  const chartRight = 700;
  const chartTop = 18;
  const chartBottom = 174;
  const maxEnquiries = Math.max(1, ...enquiryTrend.map((month) => month.count));
  const yAxisFractions = maxEnquiries > 1 ? [0, 0.5, 1] : [0, 1];
  const points = enquiryTrend.map((month, index) => ({
    ...month,
    x: chartLeft + index * ((chartRight - chartLeft) / (enquiryTrend.length - 1)),
    y: chartBottom - (month.count / maxEnquiries) * (chartBottom - chartTop),
  }));
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${chartLeft},${chartBottom} ${line} ${chartRight},${chartBottom}`;
  const totalRecentEnquiries = enquiryTrend.reduce((total, month) => total + month.count, 0);
  const publishedTotal = publishedCategories.reduce((total, item) => total + item.count, 0);
  const maxCategoryCount = Math.max(1, ...publishedCategories.map((item) => item.count));
  const firstMonth = enquiryTrend[0];
  const lastMonth = enquiryTrend[enquiryTrend.length - 1];
  const dateRange = `${firstMonth.label}${firstMonth.year !== lastMonth.year ? ` ${firstMonth.year}` : ""}–${lastMonth.label} ${lastMonth.year}`;

  return (
    <section className="admin-dashboard-charts" aria-label="Dashboard analytics">
      <article className="admin-chart-card">
        <header className="admin-chart-heading">
          <div><h2>Enquiry activity</h2><p>Saved website enquiries · {dateRange}</p></div>
          <strong>{totalRecentEnquiries}<span> last 6 months</span></strong>
        </header>
        <div className="admin-trend-chart">
          <svg className="admin-trend-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby="enquiry-chart-title enquiry-chart-description">
            <title id="enquiry-chart-title">Monthly enquiry activity</title>
            <desc id="enquiry-chart-description">Enquiry totals for each of the last six calendar months, based on saved enquiry dates.</desc>
            <defs><linearGradient id="admin-enquiry-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
            {yAxisFractions.map((fraction) => {
              const y = chartBottom - fraction * (chartBottom - chartTop);
              const value = Math.round(maxEnquiries * fraction);
              return <g key={fraction}><line className="admin-chart-gridline" x1={chartLeft} x2={chartRight} y1={y} y2={y} /><text className="admin-chart-axis-label" x={chartLeft - 12} y={y + 4} textAnchor="end">{value}</text></g>;
            })}
            <polygon className="admin-chart-area" points={area} />
            <polyline className="admin-chart-line" points={line} />
            {points.map((point) => (
              <g key={`${point.year}-${point.month}`}>
                <circle className="admin-chart-point" cx={point.x} cy={point.y} r={4}><title>{`${point.label} ${point.year}: ${point.count} ${point.count === 1 ? "enquiry" : "enquiries"}`}</title></circle>
                <text className="admin-chart-month-label" x={point.x} y={chartHeight - 12} textAnchor="middle">{point.label}</text>
              </g>
            ))}
          </svg>
        </div>
        <section className="admin-enquiry-status-summary" aria-label="All saved enquiries by status">
          <header className="admin-enquiry-status-heading">
            <div><h3>Enquiries by status</h3><p>All saved enquiries</p></div>
            <strong>{enquiries.length}<span> total</span></strong>
          </header>
          <div className="admin-enquiry-status-list">
            {enquiryStatuses.map((status) => {
              const count = enquiries.filter((enquiry) => enquiry.status === status).length;
              const share = enquiries.length ? (count / enquiries.length) * 100 : 0;
              return (
                <div className="admin-enquiry-status-row" key={status}>
                  <div className="admin-enquiry-status-label"><span>{status}</span><strong>{count}</strong></div>
                  <div className="admin-enquiry-status-track" aria-hidden="true"><span style={{ width: `${share}%` }} /></div>
                </div>
              );
            })}
          </div>
        </section>
      </article>

      <article className="admin-chart-card">
        <header className="admin-chart-heading">
          <div><h2>Published insights</h2><p>Live articles by category</p></div>
          <strong>{publishedTotal}<span> published</span></strong>
        </header>
        {publishedCategories.length ? (
          <div className="admin-category-chart" role="list" aria-label="Published insights by category">
            {publishedCategories.slice(0, 6).map(({ category, count }) => (
              <div className="admin-category-chart-row" role="listitem" key={category}>
                <div className="admin-category-chart-label"><span>{category}</span><strong>{count}</strong></div>
                <div className="admin-category-chart-track" aria-hidden="true"><span style={{ width: `${(count / maxCategoryCount) * 100}%` }} /></div>
              </div>
            ))}
            {publishedCategories.length > 6 ? <p className="admin-chart-footnote">Showing the 6 most active categories</p> : null}
          </div>
        ) : (
          <p className="admin-chart-empty">Published insights will appear here when available.</p>
        )}
      </article>
    </section>
  );
}

function Dashboard({ onNotice }: { onNotice: (message: string) => void }) {
  const { enquiries, insights, testimonials, contentRecords } = useAdminState();
  const [selectedSection, setSelectedSection] = useState<"enquiries" | "testimonials" | "insights" | null>(null);
  if (selectedSection) {
    return (
      <>
        <div className="admin-dashboard-return">
          <button type="button" className="admin-button admin-button-secondary" onClick={() => setSelectedSection(null)}>
            <AdminIcon name="arrow" size={15} /> Back to dashboard
          </button>
        </div>
        {selectedSection === "enquiries"
          ? <EnquiriesManagement />
          : selectedSection === "testimonials"
            ? <TestimonialsManagement />
            : <CollectionPage section="insights" onNotice={onNotice} />}
      </>
    );
  }

  return <>
    <PageHeading title="Dashboard" />
    <div className="admin-stat-grid admin-dashboard-stat-grid">
      <StatCard label="Team" value={String(contentRecords.filter((item) => item.sectionType === "professionals" && item.status === "Published").length)} change="Published professional profiles" icon="people" />
      <StatCard label="Business" value={String(contentRecords.filter((item) => item.sectionType === "services" && item.status === "Published").length)} change="Published service pages" icon="services" />
      <StatCard label="Financial" value={String(contentRecords.filter((item) => item.sectionType === "industries" && item.status === "Published" && /financial|financ|bank|nbfc/i.test(`${item.title} ${item.category}`)).length)} change="Published financial industry pages" icon="globe" />
      <StatCard label="New Enquiries" value={String(enquiries.filter((item) => item.status === "New").length)} change="Current CMS inbox" icon="inbox" onClick={() => setSelectedSection("enquiries")} />
      <StatCard label="Testimonials" value={String(testimonials.length)} change="Stored submissions" icon="quote" onClick={() => setSelectedSection("testimonials")} />
      <StatCard label="Published Insights" value={String(insights.filter((item) => item.status === "Published").length)} change="Live CMS articles" icon="insights" onClick={() => setSelectedSection("insights")} />
    </div>
    <DashboardCharts enquiries={enquiries} insights={insights} />
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
    <PageHeading title={config.title} description={config.description} />
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
  const { feedback, setFeedback, loadState, loadError, loadWarning } = useAdminState();
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
  return <>{loadState === "loading" ? <p role="status" className="admin-detail-note">Loading saved CMS data…</p> : null}{loadState === "error" ? <div className="admin-insight-feedback" role="alert"><span>CMS data is unavailable: {loadError}</span></div> : null}{loadState === "ready" && loadWarning ? <div className="admin-insight-feedback" role="status"><span>{loadWarning}</span></div> : null}{feedback ? <div className="admin-insight-feedback" role="status" aria-live="polite"><span>{feedback}</span><button type="button" onClick={() => setFeedback("")}>Dismiss</button></div> : null}{renderContent()}</>;
}
