import type { Metadata } from "next";
import Link from "next/link";
import InsightListing from "@/app/insights-events/insight-listing";
import { insightListingImages } from "@/app/insights-events/insight-listing-images";
import { rbiNbfcInsights } from "@/content/rbi-nbfc-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Banking, RBI & Financial Services Insights",
  description: "13 regulatory insights on NBFCs, digital lending, FinTech and financial services in India.",
};

export default function BankingRbiRegulatoryPage() {
  const insights = rbiNbfcInsights.map((insight, index) => ({
    slug: insight.slug,
    title: insight.title,
    image: insightListingImages.rbi[index],
    label: "RBI & NBFC",
  }));

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Banking, RBI &amp; Financial Services</span>
        </nav>
        <InsightListing title="RBI & NBFC Regulatory Insights" countLabel="Insights" insights={insights} />
      </div>
    </main>
  );
}