import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { corporateAdvisoryInsights, splitCorporateHeadline } from "@/content/corporate-advisory-insights";
import styles from "../../insights-events/insights-events.module.css";

export const metadata: Metadata = {
  title: "Corporate Advisory Insights",
  description: "Corporate structuring, governance, investment and M&A insights for businesses and investors in India.",
};

export default function CorporateAdvisoryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Events</Link><span>›</span><span aria-current="page">Corporate Advisory</span>
        </nav>
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <h1 className={styles.corporatePageTitle}>Corporate Advisory</h1>
            </div>
            <span className={styles.corporateArticleCount}>{corporateAdvisoryInsights.length} Articles</span>
          </div>
          <div className={styles.regulatoryGrid}>
            {corporateAdvisoryInsights.map((insight) => (
              <CorporateAdvisoryCard insight={insight} key={insight.slug} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function CorporateAdvisoryCard({ insight }: { insight: (typeof corporateAdvisoryInsights)[number] }) {
  const headline = splitCorporateHeadline(insight.title);

  return (
    <Link className={styles.insightCard} href={`/insights/${insight.slug}`}>
      <span className={styles.insightImage}>
        <Image src={insight.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
      </span>
      <span className={styles.insightBody}>
        <span className={styles.insightAudience}>{insight.audience}</span>
        <strong>{headline.lead}{headline.continuation && <> <span className={styles.headlineContinuation}>{headline.continuation}</span></>}</strong>
        <span className={styles.readMore}>Read More <Icon name="arrow" /></span>
      </span>
    </Link>
  );
}