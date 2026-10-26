"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { insightsCategories } from "../admin-data";
import { useAdminState } from "./admin-state";
import type { AdminInsight } from "./admin-state";
import { AdminIcon, EmptyState, PageHeading, StatusBadge } from "./admin-ui";

type InsightStatus = AdminInsight["status"];
type SaveIntent = "draft" | "published" | "changes";
type InsightFormValues = Omit<AdminInsight, "id" | "sourceDefined" | "createdAt" | "updatedAt" | "publishedAt"> & {
  publicationDate: string;
};
type FormErrors = Partial<Record<"title" | "slug" | "description", string>>;

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDateInput(value: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function initialValues(insight?: AdminInsight): InsightFormValues {
  return {
    title: insight?.title || "",
    slug: insight?.slug || "",
    category: insight?.category || insightsCategories[0],
    description: insight?.description || "",
    content: insight?.content || "",
    author: insight?.author || "",
    status: insight?.status || "Draft",
    publicationDate: toDateInput(insight?.publishedAt || ""),
    seoTitle: insight?.seoTitle || "",
    seoDescription: insight?.seoDescription || "",
    featuredImage: insight?.featuredImage || "",
  };
}

function isInsightStatus(value: string): value is InsightStatus {
  return value === "Draft" || value === "Published" || value === "Archived";
}

export default function AdminInsightForm({ insightId }: { insightId?: string }) {
  const router = useRouter();
  const { insights, setInsights, setFeedback, loadState } = useAdminState();
  const editing = Boolean(insightId);
  const existing = editing ? insights.find((item) => item.id === insightId) : undefined;
  const [form, setForm] = useState(() => initialValues(existing));
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(existing?.slug));
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [loadedExistingId, setLoadedExistingId] = useState(existing?.id || "");
  if (existing && existing.id !== loadedExistingId) {
    setLoadedExistingId(existing.id);
    setForm(initialValues(existing));
  }

  if (editing && loadState === "loading") return <PageHeading title="Loading insight…" description="Loading the saved editorial record." />;
  if (editing && !existing) {
    return (
      <>
        <PageHeading
          title="Insight not found"
          description="This record may have been removed or is unavailable."
          action={<Link className="admin-button admin-button-secondary" href="/admin/insights">Back to Insights</Link>}
        />
        <EmptyState
          title="No matching insight"
          description="This insight is unavailable. Return to the listing or create a new record."
          action={<Link className="admin-button" href="/admin/insights">Return to Insights</Link>}
        />
      </>
    );
  }

  function update<K extends keyof InsightFormValues>(key: K, value: InsightFormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "title" || key === "slug" || key === "description") {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function validate() {
    const nextErrors: FormErrors = {
      title: form.title.trim() ? undefined : "Enter an article title.",
      slug: createSlug(form.slug) ? undefined : "Enter a valid URL slug.",
      description: form.description.trim() ? undefined : "Enter a short description.",
    };
    setErrors(nextErrors);
    return !nextErrors.title && !nextErrors.slug && !nextErrors.description;
  }

  async function save(intent: SaveIntent) {
    if (saving || !validate()) return;

    const now = new Date().toISOString();
    const status: InsightStatus = intent === "published"
      ? "Published"
      : intent === "draft"
        ? "Draft"
        : form.status;
    const record: AdminInsight = {
      id: existing?.id || "",
      sourceDefined: existing?.sourceDefined,
      title: form.title.trim(),
      slug: createSlug(form.slug),
      category: form.category,
      description: form.description.trim(),
      content: form.content.trim(),
      author: form.author.trim() || "Editorial team",
      status,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      publishedAt: status === "Published"
        ? form.publicationDate
          ? new Date(`${form.publicationDate}T00:00:00.000Z`).toISOString()
          : now
        : "",
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      featuredImage: form.featuredImage,
    };

    setSaving(true);
    const data = {
      title: record.title, slug: record.slug, category: record.category, description: record.description,
      content: record.content, author: record.author, publishedAt: record.publishedAt,
      seoTitle: record.seoTitle, seoDescription: record.seoDescription, featuredImage: record.featuredImage,
    };
    try {
      const response = await fetch("/api/admin/data", { method: existing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        id: existing?.id, sourceDefined: existing?.sourceDefined, collection: "insights", slug: record.slug, status: record.status.toLowerCase(), data,
      }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Insight could not be saved.");
      const saved = result.record;
      const persisted: AdminInsight = { ...saved.data, id: saved.id, sourceDefined: saved.data.sourceDefined === true, slug: saved.slug, status: saved.status === "published" ? "Published" : saved.status === "archived" ? "Archived" : "Draft", createdAt: saved.created_at, updatedAt: saved.updated_at, publishedAt: saved.status === "published" ? saved.data.publishedAt || saved.updated_at : "" };
      setInsights((current) => current.some((item) => item.id === saved.id) ? current.map((item) => item.id === saved.id ? persisted : item) : [persisted, ...current]);
      setFeedback(`Insight saved as ${persisted.status}.`);
      router.push("/admin/insights");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Insight could not be saved.");
    } finally { setSaving(false); }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("changes");
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setImageError("");
    setErrors((current) => ({ ...current, image: undefined }));
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setImageError("Choose a supported JPG, PNG, WebP, or AVIF image smaller than 10 MB.");
      input.value = "";
      return;
    }
    setSaving(true);
    const upload = new FormData();
    upload.set("file", file);
    fetch("/api/admin/assets", { method: "POST", body: upload }).then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Image upload failed.");
      update("featuredImage", result.url);
    }).catch((error) => setImageError(error instanceof Error ? error.message : "Image upload failed."))
      .finally(() => { setSaving(false); input.value = ""; });
  }

  return (
    <>
      <PageHeading
        title={editing ? "Edit Insight" : "New Insight"}
        description={editing
        ? "Edit and save this editorial record."
        : "Create a new editorial record."}
        action={<Link className="admin-button admin-button-secondary" href="/admin/insights">Cancel</Link>}
      />
      {preview ? (
        <section className="admin-insight-inline-preview" aria-label="Article preview">
          {form.featuredImage ? <Image src={form.featuredImage} alt="" width={1200} height={600} unoptimized /> : null}
          <div>
            <span>{form.category} · {form.status}</span>
            <h2>{form.title || "Your article title"}</h2>
            <p>{form.description || "Your short description will appear here."}</p>
            <p>{form.content || "Your article content will appear here."}</p>
          </div>
        </section>
      ) : null}

      <form className="admin-form-layout admin-insight-form" noValidate onSubmit={handleSubmit}>
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-heading">
            <div><h2>Basic Information</h2><p>Article title, URL and summary</p></div>
            <StatusBadge status={form.status} />
          </div>
          <label className="admin-field">
            <span>Article title <i>*</i></span>
            <input
              required
              autoComplete="off"
              value={form.title}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "insight-title-error" : undefined}
              onChange={(event) => {
                const title = event.target.value;
                update("title", title);
                if (!slugManuallyEdited) update("slug", createSlug(title));
              }}
              placeholder="Enter an insight title"
            />
            {errors.title ? <small id="insight-title-error" className="admin-field-error" role="alert">{errors.title}</small> : null}
          </label>
          <div className="admin-insight-form-row">
            <label className="admin-field">
              <span>Slug <i>*</i></span>
              <div className="admin-input-prefix"><span>/insights/</span><input required value={form.slug} aria-invalid={Boolean(errors.slug)} aria-describedby={errors.slug ? "insight-slug-error" : "insight-slug-preview"} onChange={(event) => { setSlugManuallyEdited(true); update("slug", createSlug(event.target.value)); }} placeholder="article-slug" /></div>
              {errors.slug ? <small id="insight-slug-error" className="admin-field-error" role="alert">{errors.slug}</small> : <small id="insight-slug-preview">Preview: /insights/{createSlug(form.slug) || "article-slug"}</small>}
            </label>
            <label className="admin-field">
              <span>Category <i>*</i></span>
              <select required value={form.category} onChange={(event) => update("category", event.target.value)}>
                {insightsCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
          </div>
          <label className="admin-field">
            <span>Short description <i>*</i></span>
            <textarea required rows={3} maxLength={300} value={form.description} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "insight-description-error" : "insight-description-count"} onChange={(event) => update("description", event.target.value)} placeholder="Write a short summary for this resource." />
            {errors.description ? <small id="insight-description-error" className="admin-field-error" role="alert">{errors.description}</small> : <small id="insight-description-count">{form.description.length}/300 characters</small>}
          </label>
          <label className="admin-field">
            <span>Author</span>
            <input value={form.author} onChange={(event) => update("author", event.target.value)} placeholder="Author or editorial team" />
          </label>
        </section>

        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-heading"><div><h2>Article Content</h2><p>Write the main content for your resource</p></div></div>
          <label className="admin-field">
            <span>Main content</span>
            <textarea className="admin-content-editor" rows={15} value={form.content} onChange={(event) => update("content", event.target.value)} placeholder="Write the article content here..." />
          </label>
        </section>

        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-heading"><div><h2>Publishing Information</h2><p>Control draft and publication status</p></div></div>
          <div className="admin-insight-form-row">
            <label className="admin-field">
              <span>Status</span>
              <select value={form.status} onChange={(event) => { if (isInsightStatus(event.target.value)) update("status", event.target.value); }}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Publication date</span>
              <input type="date" value={form.publicationDate} onChange={(event) => update("publicationDate", event.target.value)} />
            </label>
          </div>
          <label className="admin-field">
            <span>Featured image <small>Optional · up to 10 MB</small></span>
            <input ref={fileInput} className="admin-insight-file-input" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleImageChange} aria-describedby={imageError ? "insight-image-error" : undefined} disabled={saving} />
            {form.featuredImage ? (
              <div className="admin-insight-image-preview"><Image src={form.featuredImage} alt="Selected featured image preview" width={800} height={450} unoptimized /><button type="button" className="admin-button admin-button-secondary" onClick={() => { update("featuredImage", ""); if (fileInput.current) fileInput.current.value = ""; }}>Remove image</button></div>
            ) : (
              <button className="admin-image-placeholder" type="button" onClick={() => fileInput.current?.click()}><AdminIcon name="image" size={22} /><strong>Choose a featured image</strong><small>Image is uploaded to CMS storage</small></button>
            )}
            {imageError ? <small id="insight-image-error" className="admin-field-error" role="alert">{imageError}</small> : null}
          </label>
        </section>

        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-heading"><div><h2>SEO Information</h2><p>Search metadata for this insight</p></div></div>
          <label className="admin-field">
            <span>SEO title</span>
            <input maxLength={70} value={form.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} placeholder="Search result title" />
            <small>{form.seoTitle.length}/60 recommended · 70 max</small>
          </label>
          <label className="admin-field">
            <span>Meta description</span>
            <textarea rows={3} maxLength={180} value={form.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} placeholder="Describe this resource for search results." />
            <small>{form.seoDescription.length}/160 recommended · 180 max</small>
          </label>
        </section>

        <div className="admin-form-actions admin-insight-form-actions">
          <span>{saving ? "Saving…" : "Changes are saved to the CMS."}</span>
          <div>
            <button type="button" className="admin-button admin-button-secondary" onClick={() => setPreview((current) => !current)}><AdminIcon name="eye" size={16} />{preview ? "Hide preview" : "Preview"}</button>
            {editing ? <button type="button" className="admin-button admin-button-secondary" disabled={saving} onClick={() => void save("changes")}>Save Changes</button> : <button type="button" className="admin-button admin-button-secondary" disabled={saving} onClick={() => void save("draft")}>Save as Draft</button>}
            <button type="button" className="admin-button" disabled={saving} onClick={() => void save("published")}>{saving ? "Saving…" : "Publish"}</button>
          </div>
        </div>
      </form>
      {editing && existing ? <p className="admin-insight-timestamps">Created {formatDate(existing.createdAt)} · Last updated {formatDate(existing.updatedAt)}</p> : null}
    </>
  );
}
