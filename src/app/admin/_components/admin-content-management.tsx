"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  professionalRows,
  serviceRows,
  technologyPages,
} from "../admin-data";
import type { AdminContentRecord, AdminEditableContentRecord, AdminEditableContentSection, AdminContentStatus } from "./admin-state";
import { useAdminState } from "./admin-state";
import {
  AdminIcon,
  DataTable,
  EmptyState,
  FilterDropdown,
  PageHeading,
  Pagination,
  SearchInput,
  StatusBadge,
} from "./admin-ui";

const sectionConfig: Record<AdminEditableContentSection, { title: string; description: string; addLabel: string; search: string }> = {
  services: {
    title: "Services",
    description: "Review service categories and routes represented in the current project.",
    addLabel: "Add New Service",
    search: "Search by service name...",
  },
  industries: {
    title: "Industries",
    description: "Review the industry directory entries represented in the current project.",
    addLabel: "Add New Industry",
    search: "Search industries...",
  },
  professionals: {
    title: "Professionals",
    description: "Manage professional profile content published from the CMS.",
    addLabel: "Add New Professional",
    search: "Search by name or expertise...",
  },
  "global-presence": {
    title: "Global Presence",
    description: "Review jurisdiction and regional routes verified in the current project.",
    addLabel: "Add Jurisdiction",
    search: "Search jurisdictions...",
  },
  technology: {
    title: "Technology & Digital Solutions",
    description: "Review Technology & Digital Solutions routes verified in the current project.",
    addLabel: "Add Technology Page",
    search: "Search technology pages...",
  },
};

const statusOptions: AdminContentStatus[] = ["Draft", "Published", "Archived"];
const serviceCategories = [...new Set(serviceRows.map((item) => item.category).filter(Boolean))];
const industryCategories = ["Industry directory"];
const technologyCategories = [...new Set(technologyPages.map((item) => item.category))];
const expertiseOptions = [...new Set(professionalRows.map((item) => item.expertise).filter(Boolean))];

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSlug(value: string) {
  const trimmed = value.trim();
  if (trimmed === "/") return "/";
  return trimmed.split("/").map(createSlug).filter(Boolean).join("/");
}

function toPublicPath(section: AdminEditableContentSection, slug: string) {
  const normalized = slug.trim().replace(/^\/+|\/+$/g, "");
  if (section === "services" || section === "industries" || section === "professionals") {
    return `/${section}/${normalized}`;
  }
  if (section === "global-presence") return `/global-presence/${normalized}`;
  return `/technology-and-digital-solutions/${normalized}`;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function newRecord(section: AdminEditableContentSection): AdminEditableContentRecord {
  const slugBase = `new-${section}`;
  return {
    id: "",
    sectionType: section,
    title: "",
    slug: slugBase,
    category: "",
    status: "Draft",
    updated: new Date().toISOString().slice(0, 10),
    description: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    designation: "",
    expertise: "",
    education: "",
    enrolment: "",
    jurisdiction: "",
    imagePlaceholder: "",
    featuredImage: "",
  };
}

function fieldLabel(section: AdminEditableContentSection) {
  switch (section) {
    case "services": return { name: "Service Name", category: "Category", body: "Short Description", content: "Main Description" };
    case "industries": return { name: "Industry Name", category: "Category", body: "Short Description", content: "Main Description" };
    case "professionals": return { name: "Name", category: "Designation", body: "Professional Biography", content: "Professional Biography" };
    case "global-presence": return { name: "Jurisdiction Name", category: "Jurisdiction", body: "Short Description", content: "Main Content" };
    case "technology": return { name: "Page Name", category: "Category", body: "Short Description", content: "Main Content" };
  }
}

function categoryOptions(section: AdminEditableContentSection) {
  if (section === "services") return serviceCategories;
  if (section === "industries") return industryCategories;
  if (section === "technology") return technologyCategories;
  return [];
}

function getColumns(section: AdminEditableContentSection) {
  switch (section) {
    case "services": return ["Service Name", "Category", "Description", "Last Updated", "Status", "Actions"];
    case "industries": return ["Industry Name", "Description", "Last Updated", "Status", "Actions"];
    case "professionals": return ["Name", "Designation", "Expertise", "Jurisdiction", "Status", "Actions"];
    case "global-presence": return ["Jurisdiction", "Page URL", "Description", "Last Updated", "Status", "Actions"];
    case "technology": return ["Page Name", "Category", "Description", "Last Updated", "Status", "Actions"];
  }
}

function ContentDialog({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="admin-content-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-content-dialog-title">
        <div className="admin-content-dialog-heading">
          <h2 id="admin-content-dialog-title">{title}</h2>
          <button type="button" className="admin-icon-action" aria-label="Close dialog" onClick={onClose}>
            <AdminIcon name="close" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function ContentEditor({
  section,
  initial,
  onCancel,
  onSave,
}: {
  section: AdminEditableContentSection;
  initial: AdminEditableContentRecord;
  onCancel: () => void;
  onSave: (record: AdminEditableContentRecord) => Promise<boolean>;
}) {
  const [form, setForm] = useState(initial);
  const [slugEdited, setSlugEdited] = useState(Boolean(initial.id));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState("");
  const labels = fieldLabel(section);
  const options = categoryOptions(section);
  const categoryLabel = section === "professionals"
    ? "Designation"
    : section === "global-presence"
      ? "Jurisdiction"
      : labels.category;

  function update<K extends keyof AdminContentRecord>(key: K, value: AdminContentRecord[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "title" && !slugEdited ? { slug: createSlug(String(value)) } : {}),
      ...(key === "title" ? { jurisdiction: section === "global-presence" ? String(value) : current.jurisdiction } : {}),
    }));
    if (key === "title" || key === "slug" || key === "description" || key === "category" || key === "designation" || key === "expertise" || key === "jurisdiction") {
      setErrors((current) => ({ ...current, [key]: "" }));
    }
  }

  function requestClose() {
    if (JSON.stringify(form) !== JSON.stringify(initial) && !window.confirm("Discard your unsaved changes?")) return;
    onCancel();
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = `Enter the ${labels.name.toLowerCase()}.`;
    const normalizedSlug = normalizeSlug(form.slug);
    if (!normalizedSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedSlug)) {
      next.slug = "Enter a valid single-segment URL slug.";
    }
    if (!form.description.trim() && !initial.sourceDefined) next.description = "Enter a short description.";
    if (section === "services" && !form.category.trim()) next.category = "Enter a service category.";
    if (section === "technology" && !form.category.trim()) next.category = "Enter a page category.";
    if (section === "professionals" && !form.designation.trim()) next.designation = "Enter a designation.";
    if (section === "professionals" && !form.expertise.trim()) next.expertise = "Enter an expertise area.";
    if (section === "global-presence" && !form.jurisdiction.trim()) next.jurisdiction = "Enter a jurisdiction.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    setImageError("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setImageError("Choose a JPG, PNG, WebP, or AVIF image smaller than 10 MB.");
      input.value = "";
      return;
    }
    setSaving(true);
    try {
      const upload = new FormData();
      upload.set("file", file);
      const response = await fetch("/api/admin/assets", { method: "POST", body: upload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Image upload failed.");
      update("featuredImage", result.url);
    } catch (error) {
      setImageError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setSaving(false);
      input.value = "";
    }
  }

  async function save(status: AdminContentStatus) {
    if (saving || !validate()) return;
    setSaving(true);
    const succeeded = await onSave({
      ...form,
      title: form.title.trim(),
      slug: normalizeSlug(form.slug),
      category: form.category.trim(),
      description: form.description.trim(),
      content: form.content.trim(),
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      designation: form.designation.trim(),
      expertise: form.expertise.trim(),
      education: form.education.trim(),
      enrolment: form.enrolment.trim(),
      jurisdiction: form.jurisdiction.trim(),
      imagePlaceholder: form.imagePlaceholder.trim(),
      status,
      updated: new Date().toISOString().slice(0, 10),
    });
    setSaving(false);
    if (succeeded) onCancel();
  }

  const required = (message?: string) => message ? <small className="admin-content-error" role="alert">{message}</small> : null;
  function submitAsSelectedStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save(initial.id ? form.status : "Draft");
  }

  return (
    <ContentDialog title={preview ? "Local content preview" : `${initial.id ? "Edit" : "Add"} ${labels.name}`} onClose={requestClose}>
      {preview ? (
        <div className="admin-content-preview">
          <span>LOCAL PREVIEW · NOT PUBLISHED</span>
          <h3>{form.title || "Untitled content"}</h3>
          <small>{toPublicPath(section, form.slug || "new-page")}</small>
          <StatusBadge status={form.status} />
          <p>{form.description || "Add a short description to preview this content."}</p>
          {form.content ? <div>{form.content}</div> : null}
          <button className="admin-button admin-button-secondary" type="button" onClick={() => setPreview(false)}>Back to editor</button>
        </div>
      ) : (
        <form className="admin-content-form" onSubmit={submitAsSelectedStatus} noValidate>
          <div className="admin-content-form-grid">
            <label className="admin-field">
              <span>{labels.name} <i>*</i></span>
              <input autoFocus value={form.title} onChange={(event) => update("title", event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "content-title-error" : undefined} />
              {errors.title ? <span id="content-title-error">{required(errors.title)}</span> : null}
            </label>
            <label className="admin-field">
              <span>Slug <i>*</i></span>
              <input value={form.slug} readOnly={initial.sourceDefined} onChange={(event) => { setSlugEdited(true); update("slug", event.target.value); }} aria-invalid={Boolean(errors.slug)} aria-describedby={errors.slug ? "content-slug-error" : undefined} />
              {errors.slug ? <span id="content-slug-error">{required(errors.slug)}</span> : null}
            </label>
            {section !== "industries" && section !== "professionals" && section !== "global-presence" ? (
              <label className="admin-field">
                <span>{categoryLabel}<i> *</i></span>
                <input list={`content-categories-${section}`} value={form.category} onChange={(event) => update("category", event.target.value)} aria-invalid={Boolean(errors.category)} />
                <datalist id={`content-categories-${section}`}>{options.map((option) => <option key={option} value={option} />)}</datalist>
                {required(errors.category)}
              </label>
            ) : null}
            {section === "professionals" ? (
              <>
                <label className="admin-field">
                  <span>Designation <i>*</i></span>
                  <input value={form.designation} onChange={(event) => update("designation", event.target.value)} aria-invalid={Boolean(errors.designation)} />
                  {required(errors.designation)}
                </label>
                <label className="admin-field">
                  <span>Expertise <i>*</i></span>
                  <input list="content-expertise-options" value={form.expertise} onChange={(event) => update("expertise", event.target.value)} aria-invalid={Boolean(errors.expertise)} />
                  <datalist id="content-expertise-options">{expertiseOptions.map((option) => <option key={option} value={option} />)}</datalist>
                  {required(errors.expertise)}
                </label>
                <label className="admin-field">
                  <span>Education</span>
                  <input value={form.education} onChange={(event) => update("education", event.target.value)} />
                </label>
                <label className="admin-field">
                  <span>Professional Enrolment</span>
                  <input value={form.enrolment} onChange={(event) => update("enrolment", event.target.value)} />
                </label>
                <label className="admin-field">
                  <span>Jurisdiction</span>
                  <input value={form.jurisdiction} onChange={(event) => update("jurisdiction", event.target.value)} />
                </label>
                <label className="admin-field">
                  <span>Profile Image placeholder</span>
                  <input value={form.imagePlaceholder} onChange={(event) => update("imagePlaceholder", event.target.value)} placeholder="No image selected" />
                </label>
              </>
            ) : null}
            {section === "global-presence" ? (
              <label className="admin-field">
                <span>Jurisdiction <i>*</i></span>
                <input value={form.jurisdiction} onChange={(event) => update("jurisdiction", event.target.value)} aria-invalid={Boolean(errors.jurisdiction)} />
                {required(errors.jurisdiction)}
              </label>
            ) : null}
            <label className="admin-field">
              <span>Status</span>
              <select value={form.status} onChange={(event) => update("status", event.target.value as AdminContentStatus)}>
                {statusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label className="admin-field admin-content-full">
              <span>{labels.body} <i>*</i></span>
              <textarea rows={3} value={form.description} onChange={(event) => update("description", event.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "content-description-error" : undefined} />
              {errors.description ? <span id="content-description-error">{required(errors.description)}</span> : null}
            </label>
            {section !== "professionals" ? (
              <label className="admin-field admin-content-full">
                <span>{labels.content}</span>
                <textarea rows={5} value={form.content} onChange={(event) => update("content", event.target.value)} />
              </label>
            ) : null}
            {section === "professionals" ? (
              <label className="admin-field admin-content-full">
                <span>Professional Biography</span>
                <textarea rows={5} value={form.content} onChange={(event) => update("content", event.target.value)} />
              </label>
            ) : null}
            <label className="admin-field admin-content-full">
              <span>Image URL</span>
              <input value={form.featuredImage || ""} onChange={(event) => update("featuredImage", event.target.value)} placeholder="Existing website image or stored asset URL" />
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => void uploadImage(event)} disabled={saving} />
              {imageError ? <small className="admin-content-error" role="alert">{imageError}</small> : null}
              <small>Uploads are stored in Supabase Storage and the saved URL is kept with this CMS record.</small>
            </label>
            <label className="admin-field">
              <span>SEO Title</span>
              <input maxLength={70} value={form.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} />
            </label>
            <label className="admin-field">
              <span>Meta Description</span>
              <textarea rows={2} maxLength={180} value={form.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} />
            </label>
          </div>
          <div className="admin-content-form-actions">
            <button className="admin-button admin-button-secondary" type="button" onClick={() => setPreview(true)}>Preview</button>
            <button className="admin-button admin-button-secondary" type="button" onClick={requestClose}>Cancel</button>
            {initial.id ? <button className="admin-button admin-button-secondary" type="button" disabled={saving} onClick={() => save("Draft")}>Save as Draft</button> : null}
            <button className="admin-button" type="submit" disabled={saving}>{saving ? "Saving…" : initial.id ? "Save Changes" : "Save as Draft"}</button>
          </div>
          <p className="admin-content-form-note">Changes are saved to the CMS. Published records are visible on supported public routes.</p>
        </form>
      )}
    </ContentDialog>
  );
}

function ContentDetails({
  record,
  preview,
  onClose,
}: {
  record: AdminEditableContentRecord;
  preview: boolean;
  onClose: () => void;
}) {
  const details = [
    ["Slug", toPublicPath(record.sectionType, record.slug)],
    ["Section / Category", record.category || "Not specified"],
    ["Last updated", formatDate(record.updated)],
    ...(record.designation ? [["Designation", record.designation]] : []),
    ...(record.expertise ? [["Expertise", record.expertise]] : []),
    ...(record.education ? [["Education", record.education]] : []),
    ...(record.enrolment ? [["Professional Enrolment", record.enrolment]] : []),
    ...(record.jurisdiction ? [["Jurisdiction", record.jurisdiction]] : []),
  ];
  return (
    <ContentDialog title={preview ? "Local preview" : record.title} onClose={onClose}>
      <div className="admin-content-details">
        <div className="admin-content-detail-status"><StatusBadge status={record.status} /><span>{record.sourceDefined ? "Existing website content · source-backed" : "CMS-managed content"}</span></div>
        <dl>{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <section><h3>{fieldLabel(record.sectionType).body}</h3><p>{record.description}</p></section>
        {record.content ? <section><h3>{fieldLabel(record.sectionType).content}</h3><p>{record.content}</p></section> : null}
        {record.seoTitle || record.seoDescription ? <section><h3>Search metadata</h3><p>{record.seoTitle || "No SEO title"}</p><p>{record.seoDescription || "No meta description"}</p></section> : null}
        {record.imagePlaceholder ? <section><h3>Profile image</h3><p>{record.imagePlaceholder}</p></section> : null}
      </div>
    </ContentDialog>
  );
}

export default function AdminContentManagement({ section }: { section: AdminEditableContentSection }) {
  const { contentRecords, setContentRecords, setFeedback } = useAdminState();
  const config = sectionConfig[section];
  const records = useMemo(() => contentRecords.filter((record): record is AdminEditableContentRecord => record.sectionType === section), [contentRecords, section]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<AdminEditableContentRecord | null>(null);
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<{ record: AdminEditableContentRecord; preview: boolean } | null>(null);
  const pageSize = 6;
  const categories = [...new Set(section === "professionals"
    ? records.flatMap((record) => [record.designation, record.expertise]).filter(Boolean)
    : records.map((record) => record.category).filter(Boolean))];
  const filtered = records.filter((record) => {
    const terms = [record.title, record.slug, record.description, record.category, record.designation, record.expertise, record.jurisdiction].join(" ").toLowerCase();
    return terms.includes(query.trim().toLowerCase())
      && (categoryFilter === "All categories" || (section === "professionals"
        ? record.designation === categoryFilter || record.expertise === categoryFilter
        : record.category === categoryFilter))
      && (statusFilter === "All statuses" || record.status === statusFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function saveRecord(record: AdminEditableContentRecord) {
    const collection = section;
    const data = Object.fromEntries(Object.entries(record).filter(([key]) => !["id", "sectionType", "updated", "status"].includes(key)));
    const method = record.id ? "PATCH" : "POST";
    try {
      const response = await fetch("/api/admin/data", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: record.id, collection, slug: record.slug, status: record.status.toLowerCase(), data }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Content could not be saved.");
      const saved = payload.record;
      const persisted: AdminContentRecord = {
        ...saved.data, id: saved.id, sectionType: saved.collection, slug: saved.slug,
        status: saved.status === "published" ? "Published" : saved.status === "archived" ? "Archived" : "Draft",
        updated: saved.updated_at,
      };
      setContentRecords((current) => current.some((item) => item.id === persisted.id)
        ? current.map((item) => item.id === persisted.id ? persisted : item)
        : [persisted, ...current]);
      setAdding(false);
      setEditing(null);
      setFeedback(`${record.title} was saved as ${persisted.status}.`);
      return true;
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Content could not be saved.");
      return false;
    }
  }

  async function deleteRecord(record: AdminContentRecord) {
    if (!window.confirm(`Delete "${record.title}" from the CMS? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/admin/data?id=${encodeURIComponent(record.id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Content could not be deleted.");
      setContentRecords((current) => current.filter((item) => item.id !== record.id));
      setFeedback(`${record.title} was deleted.`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Content could not be deleted.");
    }
  }

  const rows = pageRows.map((record) => {
    const actions = (
      <div className="admin-row-actions" key="actions">
        <button type="button" aria-label={`View ${record.title}`} title="View CMS details" onClick={() => setSelected({ record, preview: false })}><AdminIcon name="eye" size={16} /></button>
        <button type="button" aria-label={`Preview ${record.title}`} title="Preview locally" onClick={() => setSelected({ record, preview: true })}><AdminIcon name="file" size={16} /></button>
        <button type="button" aria-label={`Edit ${record.title}`} title="Edit CMS record" onClick={() => setEditing(record)}><AdminIcon name="edit" size={16} /></button>
        <button type="button" aria-label={`Delete ${record.title}`} title="Delete CMS record" onClick={() => void deleteRecord(record)}><AdminIcon name="close" size={16} /></button>
      </div>
    );
    const title = <strong className="admin-cell-primary" key="title">{record.title}</strong>;
    const description = <span className="admin-excerpt" key="description">{record.description}</span>;
    const status = <StatusBadge key="status" status={record.status} />;
    const updated = formatDate(record.updated);
    switch (section) {
      case "services": return [title, record.category, description, updated, status, actions];
      case "industries": return [title, description, updated, status, actions];
      case "professionals": return [title, record.designation, record.expertise, record.jurisdiction || "Not specified", status, actions];
      case "global-presence": return [title, toPublicPath(section, record.slug), description, updated, status, actions];
      case "technology": return [title, record.category, description, updated, status, actions];
    }
  });
  const headingAction = <button className="admin-button" type="button" onClick={() => setAdding(true)}><AdminIcon name="plus" size={16} />{config.addLabel}</button>;
  const filterLabel = section === "professionals" ? "Filter by designation or expertise" : "Filter by category";

  return (
    <>
      <PageHeading title={config.title} description={config.description} action={headingAction} />
      <section className="admin-panel admin-list-panel">
        <div className="admin-toolbar">
          <SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder={config.search} />
          {categories.length > 0 ? <FilterDropdown label={filterLabel} value={categoryFilter} options={["All categories", ...categories]} onChange={(value) => { setCategoryFilter(value); setPage(1); }} /> : null}
          <FilterDropdown label="Filter by status" value={statusFilter} options={["All statuses", ...statusOptions]} onChange={(value) => { setStatusFilter(value); setPage(1); }} />
          {query || categoryFilter !== "All categories" || statusFilter !== "All statuses" ? (
            <button type="button" className="admin-filter-reset" onClick={() => { setQuery(""); setCategoryFilter("All categories"); setStatusFilter("All statuses"); setPage(1); }}>Clear Filters</button>
          ) : null}
        </div>
        {filtered.length ? (
          <DataTable columns={getColumns(section)} rows={rows} />
        ) : (
          <EmptyState title={records.length ? "No matching content" : "No content yet"} description={records.length ? "Try changing your search or filters." : "Create a record to add content to this section."} />
        )}
        <div className="admin-table-footer">
          <span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} records</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>
      {adding ? <ContentEditor key={`${section}-new`} section={section} initial={newRecord(section)} onCancel={() => setAdding(false)} onSave={saveRecord} /> : null}
      {editing ? <ContentEditor key={editing.id} section={section} initial={editing} onCancel={() => setEditing(null)} onSave={saveRecord} /> : null}
      {selected ? <ContentDetails record={selected.record} preview={selected.preview} onClose={() => setSelected(null)} /> : null}
    </>
  );
}
