import type { Metadata } from "next";
import Link from "next/link";
import RelatedInsights from "@/app/services/related-insights";
import { priorityInsights } from "@/content/priority-insights";
import styles from "../../insights-events/insights-events.module.css";
import serviceHubStyles from "@/app/services/hub.module.css";

export const metadata: Metadata = {
  title: "Priority Insights | Astronis Global",
  description: "20 priority perspectives across regulatory, corporate, legal and business issues in India.",
};

export default function PriorityInsightsPage() {
  return (
    <main className={serviceHubStyles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Priority Insights</span>
        </nav>
      </div>
      <RelatedInsights
        articles={priorityInsights}
        sectionClassName={styles.priorityRelatedSection}
        title="Priority Insights"
        eyebrow="ASTRONIS - 20 PRIORITY INSIGHTS"
        intro="Publication-ready headlines spanning regulatory, corporate, legal and business priorities."
        showAction={false}
      />
    </main>
  );
}