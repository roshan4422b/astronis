import Link from "next/link";
import Icon from "@/app/_components/icon";
import type { BusinessAdvisoryInsight } from "@/content/business-advisory-insights";
import { splitBusinessAdvisoryHeadline } from "@/content/business-advisory-insights";
import styles from "./insights-events.module.css";

export default function BusinessInsightCards({ insights }: { insights: readonly BusinessAdvisoryInsight[] }) {
  return (
    <div className={styles.businessInsightGrid}>
      {insights.map((insight, index) => {
        const headline = splitBusinessAdvisoryHeadline(insight.title);

        return (
          <Link className={styles.businessInsightCard} href={`/insights/${insight.slug}`} key={insight.slug}>
            <span className={styles.businessInsightTop}>
              <span className={styles.businessInsightNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.businessInsightIcon} aria-hidden="true"><Icon name={insight.icon} /></span>
            </span>
            <span className={styles.businessInsightFocus}>{insight.focus}</span>
            <strong className={styles.businessInsightTitle}>
              {headline.lead}{headline.continuation && <> <span>{headline.continuation}</span></>}
            </strong>
            <span className={styles.businessInsightAction}>Explore Insight <Icon name="arrow" /></span>
          </Link>
        );
      })}
    </div>
  );
}