import type { Metadata } from "next";
import Link from "next/link";
import BusinessInsightCards from "@/app/insights-events/business-insight-cards";
import { businessAdvisoryInsights } from "@/content/business-advisory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Business Advisory Insights",
  description: "Commercial strategy, investment readiness and growth insights for businesses in India.",
};

export default function BusinessAdvisoryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Business Advisory</span>
        </nav>
        <section className={`${styles.section} ${styles.businessAdvisorySection}`}>
          <div className={styles.businessEditorialHeading}>
            <div>
              <h1 className={styles.businessEditorialTitle}>Business Advisory &amp; Growth</h1>
              <p>Commercial strategy, investment readiness and growth planning for Indian businesses.</p>
            </div>
            <span className={styles.businessInsightCount}>20 insights</span>
          </div>
          <BusinessInsightCards insights={businessAdvisoryInsights} />
        </section>
      </div>
    </main>
  );
}