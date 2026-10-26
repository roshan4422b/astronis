"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AdminIcon, EmptyState, PageHeading } from "./admin-ui";
import { useAdminState } from "./admin-state";
import type { AdminContentRecord } from "./admin-state";
import styles from "./seo-management.module.css";

type SeoEditorProps = { recordId: string };

function getPath(slug: string) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export default function SeoEditor({ recordId }: SeoEditorProps) {
  const { contentRecords, loadState, loadError } = useAdminState();
  const record = contentRecords.find((item) => item.id === recordId);

  if (loadState === "loading") {
    return <PageHeading title="Loading SEO record…" description="Loading the saved CMS metadata." />;
  }

  if (loadState === "error") {
    return <EmptyState title="SEO data unavailable" description={loadError || "CMS data could not be loaded."} action={<Link className="admin-button" href="/admin/seo">Back to SEO Management</Link>} />;
  }

  if (!record) {
    return <EmptyState title="SEO record not found" description="This page record is not available in the CMS." action={<Link className="admin-button" href="/admin/seo"><AdminIcon name="arrow" size={15} /> Back to SEO Management</Link>} />;
  }

  return <SeoEditorForm key={record.id} record={record} />;
}

function SeoEditorForm({ record }: { record: AdminContentRecord }) {
  const { setContentRecords } = useAdminState();
  const recordId = record.id;
  const [seoTitle, setSeoTitle] = useState(record.seoTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(record.seoDescription ?? "");
  const [ogTitle, setOgTitle] = useState(record.ogTitle ?? "");
  const [ogDescription, setOgDescription] = useState(record.ogDescription ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(record.canonicalUrl ?? "");
  const [robotsIndex, setRobotsIndex] = useState(record.robotsIndex ?? true);
  const [robotsFollow, setRobotsFollow] = useState(record.robotsFollow ?? true);
  const [errors, setErrors] = useState<{ seoTitle?: string; metaDescription?: string; canonicalUrl?: string }>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveFailed, setSaveFailed] = useState(false);

  const previewTitle = seoTitle || record.title;
  const previewDescription = metaDescription || "No meta description has been added for this page.";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const nextErrors: typeof errors = {};
    if (!seoTitle.trim()) nextErrors.seoTitle = "Enter an SEO title.";
    if (!metaDescription.trim()) nextErrors.metaDescription = "Enter a meta description.";
    if (canonicalUrl.trim()) {
      try {
        const parsed = new URL(canonicalUrl);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("Invalid URL protocol");
      } catch {
        nextErrors.canonicalUrl = "Enter a valid http or https URL, or leave this field empty.";
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    const updatedRecord: AdminContentRecord = {
      ...record!,
      seoTitle: seoTitle.trim(),
      seoDescription: metaDescription.trim(),
      ogTitle: ogTitle.trim(),
      ogDescription: ogDescription.trim(),
      canonicalUrl: canonicalUrl.trim(),
      robotsIndex,
      robotsFollow,
      updated: new Date().toISOString(),
    };
    try {
      const { sourceDefined, ...recordData } = updatedRecord;
      const data = Object.fromEntries(
        Object.entries(recordData).filter(([key]) => key !== "id"),
      );
      const response = await fetch("/api/admin/data", {
        method: sourceDefined ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: recordId,
          sourceDefined,
          collection: record.sectionType,
          slug: record.slug,
          status: record.status.toLowerCase(),
          data,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "SEO changes could not be saved.");
      setContentRecords((current) => current.map((item) => item.id === recordId ? { ...updatedRecord, updated: result.record.updated_at } : item));
      setSaveMessage("SEO changes saved.");
      setSaveFailed(false);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "SEO changes could not be saved.");
      setSaveFailed(true);
    } finally { setSaving(false); }
  }

  return <>
    <PageHeading title="Edit SEO" description="Edit search metadata for this CMS record." action={<Link className="admin-button admin-button-secondary" href="/admin/seo"><AdminIcon name="arrow" size={15} /> Back to listing</Link>} />
    <section className={styles.editorPanel}>
      <div className="admin-panel-heading"><div><h2>{record.title}</h2><p>Page information is read-only in this preview.</p></div></div>
      <form className={styles.editorForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.readOnlyGrid}>
          <label className="admin-field"><span>Page title</span><input value={record.title} readOnly /></label>
          <label className="admin-field"><span>Page URL / slug</span><input value={getPath(record.slug)} readOnly /></label>
        </div>
        <label className="admin-field">
          <span>SEO title <small>{seoTitle.length}/70 characters · around 50–60 is a useful guide</small></span>
          <input value={seoTitle} maxLength={70} aria-invalid={Boolean(errors.seoTitle)} aria-describedby={errors.seoTitle ? "seo-title-error" : "seo-title-guidance"} onChange={(event) => setSeoTitle(event.target.value)} />
          <small id={errors.seoTitle ? "seo-title-error" : "seo-title-guidance"} className={errors.seoTitle ? styles.error : styles.guidance}>{errors.seoTitle || "Search engines may display a different title; length guidance is not a ranking guarantee."}</small>
        </label>
        <label className="admin-field">
          <span>Meta description <small>{metaDescription.length}/180 characters · around 150–160 is a useful guide</small></span>
          <textarea value={metaDescription} rows={4} maxLength={180} aria-invalid={Boolean(errors.metaDescription)} aria-describedby={errors.metaDescription ? "seo-description-error" : "seo-description-guidance"} onChange={(event) => setMetaDescription(event.target.value)} />
          <small id={errors.metaDescription ? "seo-description-error" : "seo-description-guidance"} className={errors.metaDescription ? styles.error : styles.guidance}>{errors.metaDescription || "A concise summary can help describe the page; search engines may rewrite it."}</small>
        </label>
        <div className={styles.optionalFields}>
          <label className="admin-field"><span>Open Graph title <small>Optional</small></span><input value={ogTitle} maxLength={120} onChange={(event) => setOgTitle(event.target.value)} /></label>
          <label className="admin-field"><span>Canonical URL <small>Optional</small></span><input type="url" value={canonicalUrl} aria-invalid={Boolean(errors.canonicalUrl)} aria-describedby={errors.canonicalUrl ? "canonical-error" : undefined} onChange={(event) => setCanonicalUrl(event.target.value)} />{errors.canonicalUrl ? <small id="canonical-error" className={styles.error}>{errors.canonicalUrl}</small> : null}</label>
          <label className="admin-field"><span>Open Graph description <small>Optional</small></span><textarea value={ogDescription} rows={3} maxLength={200} onChange={(event) => setOgDescription(event.target.value)} /></label>
        </div>
        <fieldset className={styles.robotsFieldset}>
          <legend>Robots directives <small>Optional preview controls</small></legend>
          <label><input type="checkbox" checked={robotsIndex} onChange={(event) => setRobotsIndex(event.target.checked)} /> Allow indexing</label>
          <label><input type="checkbox" checked={robotsFollow} onChange={(event) => setRobotsFollow(event.target.checked)} /> Allow following links</label>
        </fieldset>
        <section className={styles.previewCard} aria-labelledby="editor-preview-heading">
          <div><span className={styles.eyebrow}>VISUAL PREVIEW</span><h2 id="editor-preview-heading">Approximate search result</h2></div>
          <div className={styles.searchResult}>
            <small>https://www.astronisglobal.com{getPath(record.slug)}</small>
            <strong>{previewTitle}</strong>
            <p>{previewDescription}</p>
          </div>
          <p className={styles.disclaimer}>Visual approximation only — Google and other search engines may display different titles or descriptions.</p>
        </section>
        {saveMessage ? <p className={saveFailed ? styles.error : styles.savedMessage} role={saveFailed ? "alert" : "status"}>{saveMessage}</p> : null}
        <div className={styles.formActions}>
          <span>SEO settings are saved with this CMS record.</span>
          <div><Link className="admin-button admin-button-secondary" href="/admin/seo">Cancel</Link><button className="admin-button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button></div>
        </div>
      </form>
    </section>
  </>;
}
