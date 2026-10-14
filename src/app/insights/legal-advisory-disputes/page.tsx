import type { Metadata } from "next";
import Link from "next/link";
import LegalInsightCards from "@/app/insights-events/legal-insight-cards";
import { legalAdvisoryInsights } from "@/content/legal-advisory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Legal Advisory & Dispute Resolution Insights",
  description: "20 authoritative insights on commercial disputes, arbitration, insolvency, recovery and litigation in India.",
};

export default function LegalAdvisoryInsightsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Legal Advisory &amp; Dispute Resolution</span>
        </nav>
        <section className={`${styles.section} ${styles.legalInsightSection}`}>
          <div className={styles.legalEditorialHeading}>
            <div>
              <h1 className={styles.legalEditorialTitle}>Legal Advisory &amp; Dispute Resolution</h1>
              <p>20 Authoritative Insights</p>
            </div>
            <span className={styles.legalInsightCount}>20 insights</span>
          </div>
          <LegalInsightCards insights={legalAdvisoryInsights} />
        </section>
      </div>
    </main>
  );
}