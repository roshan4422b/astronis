import type { Metadata } from "next";
import Link from "next/link";
import InsightListing from "@/app/insights-events/insight-listing";
import { insightListingImages } from "@/app/insights-events/insight-listing-images";
import { corporateAdvisoryInsights } from "@/content/corporate-advisory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Corporate Advisory Insights",
  description: "Corporate structuring, governance, investment and M&A insights for businesses and investors in India.",
};

export default function CorporateAdvisoryPage() {
  const insights = corporateAdvisoryInsights.map((insight, index) => ({
    slug: insight.slug,
    title: insight.title,
    image: insightListingImages.corporate[index],
    label: insight.audience,
  }));

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Corporate Advisory</span>
        </nav>
        <InsightListing title="Corporate Advisory" countLabel="Articles" insights={insights} />
      </div>
    </main>
  );
}