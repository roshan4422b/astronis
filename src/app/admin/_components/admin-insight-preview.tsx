"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAdminState } from "./admin-state";
import { AdminIcon, DemoNotice, EmptyState, PageHeading, StatusBadge } from "./admin-ui";

function displayDate(value: string) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function AdminInsightPreview() {
  const params = useParams<{ id: string }>();
  const { insights } = useAdminState();
  const insight = insights.find((item) => item.id === params.id);

  if (!insight) {
    return (
      <>
        <PageHeading
          title="Insight not found"
          description="This CMS record could not be found."
          action={<Link className="admin-button admin-button-secondary" href="/admin/insights">Back to Insights</Link>}
        />
        <EmptyState
          title="No matching insight"
          description="The requested insight is not available in the CMS."
          action={<Link className="admin-button" href="/admin/insights">Return to Insights</Link>}
        />
      </>
    );
  }

  return (
    <>
      <PageHeading
        title="Insight Preview"
        description="Private admin preview only. This record is not a public website article."
        action={
          <div className="admin-heading-actions">
            <Link className="admin-button admin-button-secondary" href="/admin/insights">Back to Insights</Link>
            <Link className="admin-button" href={`/admin/insights/${insight.id}/edit`}><AdminIcon name="edit" size={16} />Edit</Link>
          </div>
        }
      />
      <DemoNotice>Private admin preview — only published insights are visible on the public website.</DemoNotice>
      <article className="admin-insight-preview">
        {insight.featuredImage ? <Image className="admin-insight-preview-image" src={insight.featuredImage} alt="" width={1200} height={600} unoptimized /> : null}
        <div className="admin-insight-preview-body">
          <div className="admin-insight-preview-meta">
            <span>{insight.category}</span>
            <StatusBadge status={insight.status} />
          </div>
          <h1>{insight.title}</h1>
          <p className="admin-insight-preview-description">{insight.description}</p>
          <div className="admin-insight-byline">
            <span>By {insight.author || "Editorial team"}</span>
            <span>{displayDate(insight.publishedAt)}</span>
          </div>
          <div className="admin-insight-preview-content">{insight.content || "No article body has been provided for this record."}</div>
        </div>
      </article>
      <section className="admin-panel admin-insight-seo-preview">
        <div className="admin-panel-heading"><div><h2>SEO Metadata Preview</h2><p>Metadata is saved with this CMS record.</p></div></div>
        <div className="admin-search-preview">
          <span>SEARCH RESULT PREVIEW</span>
          <strong>{insight.seoTitle || insight.title}</strong>
          <small>www.astronisglobal.com/insights/{insight.slug}</small>
          <p>{insight.seoDescription || insight.description}</p>
        </div>
      </section>
    </>
  );
}
