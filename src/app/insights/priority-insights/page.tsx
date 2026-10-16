import type { Metadata } from "next";
import Link from "next/link";
import InsightListing from "@/app/insights-events/insight-listing";
import { insightListingImages } from "@/app/insights-events/insight-listing-images";
import { priorityInsights } from "@/content/priority-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Priority Insights | Astronis Global",
  description: "20 priority perspectives across regulatory, corporate, legal and business issues in India.",
};

export default function PriorityInsightsPage() {
  const insights = priorityInsights.map((insight, index) => ({
    slug: insight.slug,
    title: insight.title,
    image: insightListingImages.priority[index],
    label: insight.category,
  }));

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Priority Insights</span>
        </nav>
        <InsightListing title="Priority Insights" countLabel="Insights" insights={insights} />
      </div>
    </main>
  );
}