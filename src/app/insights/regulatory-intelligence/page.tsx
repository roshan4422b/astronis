import type { Metadata } from "next";
import Link from "next/link";
import RegulatoryInsightRows from "@/app/insights-events/regulatory-insight-rows";
import { regulatoryInsights } from "@/content/regulatory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Regulatory Intelligence & Compliance Insights",
  description: "20 high-value regulatory insights for Indian businesses, investors and compliance teams.",
};

export default function RegulatoryIntelligencePage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Regulatory Intelligence</span>
        </nav>
        <section className={`${styles.section} ${styles.regulatorySpotlight}`}>
          <div className={styles.regulatoryEditorialHeading}>
            <div>
              <h1 className={styles.regulatoryEditorialTitle}>Regulatory Intelligence &amp; Compliance</h1>
              <p>Practical perspectives on the rules shaping Indian businesses.</p>
            </div>
            <span className={styles.regulatoryTotal}>20 insights</span>
          </div>
          <RegulatoryInsightRows insights={regulatoryInsights} />
        </section>
      </div>
    </main>
  );
}