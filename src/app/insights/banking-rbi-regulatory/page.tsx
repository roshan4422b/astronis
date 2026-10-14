import type { Metadata } from "next";
import Link from "next/link";
import RbiNbfcInsightCards from "@/app/insights-events/rbi-nbfc-insight-cards";
import { rbiNbfcInsights } from "@/content/rbi-nbfc-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Banking, RBI & Financial Services Insights",
  description: "13 regulatory insights on NBFCs, digital lending, FinTech and financial services in India.",
};

export default function BankingRbiRegulatoryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Banking, RBI &amp; Financial Services</span>
        </nav>
        <section className={`${styles.section} ${styles.rbiInsightsSection}`}>
          <div className={styles.rbiEditorialHeading}>
            <div>
              <span className={styles.rbiEditorialEyebrow}>BANKING, RBI &amp; FINANCIAL SERVICES</span>
              <h1 className={styles.rbiEditorialTitle}>RBI &amp; NBFC Regulatory Insights</h1>
            </div>
            <span className={styles.rbiInsightCount}>13 insights</span>
          </div>
          <RbiNbfcInsightCards insights={rbiNbfcInsights} />
        </section>
      </div>
    </main>
  );
}