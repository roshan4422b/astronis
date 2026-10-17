import type { Metadata } from "next";
import Link from "next/link";
import InsightListing from "@/app/insights-events/insight-listing";
import { insightListingImages } from "@/app/insights-events/insight-listing-images";
import { businessAdvisoryInsights } from "@/content/business-advisory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Business Advisory Insights",
  description: "Commercial strategy, investment readiness and growth insights for businesses in India.",
};

export default function BusinessAdvisoryPage() {
  const insights = businessAdvisoryInsights.map((insight, index) => ({
    slug: insight.slug,
    title: insight.title,
    image: insightListingImages.business[index],
    label: insight.focus,
  }));

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Business Advisory</span>
        </nav>
        <InsightListing title="Business Advisory & Growth" countLabel="Insights" insights={insights} />
      </div>
    </main>
  );
}