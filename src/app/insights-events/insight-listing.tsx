import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./insights-events.module.css";

export type InsightListingItem = {
  slug: string;
  title: string;
  image: string;
  label: string;
};

export default function InsightListing({
  title,
  countLabel,
  insights,
}: {
  title: string;
  countLabel: "Articles" | "Insights";
  insights: readonly InsightListingItem[];
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <h1 className={styles.corporatePageTitle}>{title}</h1>
        <span className={styles.corporateArticleCount}>
          {insights.length} {countLabel}
        </span>
      </div>
      <div className={`${styles.regulatoryGrid} ${styles.insightListingGrid}`}>
        {insights.map((insight) => {
          const colonIndex = insight.title.indexOf(":");
          const lead = colonIndex === -1 ? insight.title : insight.title.slice(0, colonIndex + 1);
          const continuation = colonIndex === -1 ? "" : insight.title.slice(colonIndex + 1).trimStart();

          return (
            <Link className={styles.insightCard} href={`/insights/${insight.slug}`} key={insight.slug}>
              <span className={styles.insightImage}>
                <Image src={insight.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
              </span>
              <span className={styles.insightBody}>
                <span className={styles.insightAudience}>{insight.label}</span>
                <strong>
                  {lead}{continuation && <> <span className={styles.headlineContinuation}>{continuation}</span></>}
                </strong>
                <span className={styles.readMore}>Read More <Icon name="arrow" /></span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
