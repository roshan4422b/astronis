"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdminIcon, DataTable, EmptyState, FilterDropdown, PageHeading, Pagination, SearchInput, StatusBadge } from "./admin-ui";
import { useAdminState } from "./admin-state";
import styles from "./seo-management.module.css";

const PAGE_SIZE = 10;

function getPath(slug: string) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

function getSectionLabel(section: string) {
  return section.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function getCompletion(record: { seoTitle: string; seoDescription: string }) {
  return record.seoTitle.trim() && record.seoDescription.trim() ? "Complete" : "Needs attention";
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "—";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

type SeoPage = {
  id: string;
  title: string;
  slug: string;
  category: string;
  updated: string;
  seoTitle: string;
  seoDescription: string;
};

function SearchPreview({ record, title, description, onClose }: { record: SeoPage; title: string; description: string; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, []);

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={styles.previewDialog} role="dialog" aria-modal="true" aria-labelledby="seo-preview-title">
        <div className={styles.dialogHeading}>
          <div><span className={styles.eyebrow}>VISUAL PREVIEW</span><h2 id="seo-preview-title">Search result appearance</h2></div>
          <button ref={closeButtonRef} type="button" className={styles.iconButton} aria-label="Close preview" onClick={onClose}><AdminIcon name="close" /></button>
        </div>
        <div className={styles.searchResult}>
          <small>https://www.astronisglobal.com{getPath(record.slug)}</small>
          <strong>{title || record.title}</strong>
          <p>{description || "No meta description has been added for this page."}</p>
        </div>
        <p className={styles.disclaimer}>Visual approximation only. Search engines may choose different titles or descriptions.</p>
        <button className="admin-button admin-button-secondary" type="button" onClick={onClose}>Close preview</button>
      </section>
    </div>
  );
}

export default function SeoManagement() {
  const { contentRecords } = useAdminState();
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("All sections");
  const [completion, setCompletion] = useState("All statuses");
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState<SeoPage | null>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const records = useMemo<SeoPage[]>(() => contentRecords.map((record) => ({
    id: record.id,
    title: record.title,
    slug: record.slug,
    category: record.sectionType,
    updated: record.updated,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
  })), [contentRecords]);
  const sections = ["All sections", ...new Set(records.map((record) => getSectionLabel(record.category)))];
  const filtered = records.filter((record) => {
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || `${record.title} ${record.slug}`.toLowerCase().includes(search);
    const matchesSection = section === "All sections" || getSectionLabel(record.category) === section;
    const matchesCompletion = completion === "All statuses" || getCompletion(record) === completion;
    return matchesSearch && matchesSection && matchesCompletion;
  });
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  const visibleRecords = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const clearFilters = () => {
    setQuery("");
    setSection("All sections");
    setCompletion("All statuses");
    setPage(1);
  };

  const rows = visibleRecords.map((record) => [
    <strong className="admin-cell-primary" key="title">{record.title}</strong>,
    <span className={styles.slug} key="slug">{getPath(record.slug)}</span>,
    <span className={styles.truncate} key="seoTitle">{record.seoTitle || "Not set"}</span>,
    <span className={styles.descriptionPreview} key="description">{record.seoDescription || "No meta description yet"}</span>,
    formatDate(record.updated),
    <div className={styles.actions} key="actions">
      <Link className="admin-text-action" href={`/admin/seo/${encodeURIComponent(record.id)}/edit`} aria-label={`Edit SEO for ${record.title}`}>Edit SEO</Link>
      <button type="button" className="admin-text-action" onClick={(event) => { previewTriggerRef.current = event.currentTarget; setPreview(record); }}>Preview</button>
    </div>,
    <StatusBadge key="status" status={getCompletion(record)} />,
  ]);

  return <>
    <PageHeading title="SEO Management" description="Review and manage search metadata for website pages." />
    <section className={`admin-panel admin-list-panel ${styles.listPanel}`}>
      <div className="admin-panel-heading"><div><h2>Page metadata</h2><p>Search metadata is available for current CMS content records.</p></div><span className={styles.recordCount}>{records.length} records</span></div>
      <div className={`admin-toolbar ${styles.toolbar}`}>
        <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search by page title or slug..." />
        <FilterDropdown label="Filter by website section" value={section} options={sections} onChange={(value) => { setSection(value); setPage(1); }} />
        <FilterDropdown label="Filter by SEO completion" value={completion} options={["All statuses", "Complete", "Needs attention"]} onChange={(value) => { setCompletion(value); setPage(1); }} />
        {query || section !== "All sections" || completion !== "All statuses" ? <button className="admin-filter-reset" type="button" onClick={clearFilters}>Clear Filters</button> : null}
      </div>
      {visibleRecords.length
        ? <DataTable columns={["Page title", "Page URL / slug", "SEO title", "Meta description preview", "Last updated", "Actions", "SEO status"]} rows={rows} />
        : <EmptyState title="No pages match these filters" description="Try a different page title, slug, section, or SEO status." action={<button className="admin-button admin-button-secondary" type="button" onClick={clearFilters}>Clear Filters</button>} />}
      <div className="admin-table-footer"><span>Showing {filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} records</span><Pagination page={currentPage} pageCount={pageCount} onChange={setPage} /></div>
    </section>
    {preview ? <SearchPreview record={preview} title={preview.seoTitle} description={preview.seoDescription} onClose={() => {
      setPreview(null);
      window.requestAnimationFrame(() => previewTriggerRef.current?.focus());
    }} /> : null}
  </>;
}
