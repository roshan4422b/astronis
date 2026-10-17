import type { Metadata } from "next";
import Link from "next/link";
import InsightListing from "@/app/insights-events/insight-listing";
import { insightListingImages } from "@/app/insights-events/insight-listing-images";
import { regulatoryInsights } from "@/content/regulatory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Regulatory Intelligence & Compliance Insights",
  description: "20 high-value regulatory insights for Indian businesses, investors and compliance teams.",
};

export default function RegulatoryIntelligencePage() {
  const insights = regulatoryInsights.map((insight, index) => ({
    slug: insight.slug,
    title: insight.title,
    image: insightListingImages.regulatory[index],
    label: insight.focus,
  }));

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Regulatory Intelligence</span>
        </nav>
        <InsightListing title="Regulatory Intelligence & Compliance" countLabel="Insights" insights={insights} />
      </div>
    </main>
  );
}