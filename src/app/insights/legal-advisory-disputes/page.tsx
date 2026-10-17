import type { Metadata } from "next";
import Link from "next/link";
import InsightListing from "@/app/insights-events/insight-listing";
import { insightListingImages } from "@/app/insights-events/insight-listing-images";
import { legalAdvisoryInsights } from "@/content/legal-advisory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Legal Advisory & Dispute Resolution Insights",
  description: "20 authoritative insights on commercial disputes, arbitration, insolvency, recovery and litigation in India.",
};

export default function LegalAdvisoryInsightsPage() {
  const insights = legalAdvisoryInsights.map((insight, index) => ({
    slug: insight.slug,
    title: insight.title,
    image: insightListingImages.legal[index],
    label: insight.focus,
  }));

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Legal Advisory &amp; Dispute Resolution</span>
        </nav>
        <InsightListing title="Legal Advisory & Dispute Resolution" countLabel="Insights" insights={insights} />
      </div>
    </main>
  );
}