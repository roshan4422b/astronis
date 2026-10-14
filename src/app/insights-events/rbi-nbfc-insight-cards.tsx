import Link from "next/link";
import Icon from "@/app/_components/icon";
import type { RbiNbfcInsight } from "@/content/rbi-nbfc-insights";
import { splitRbiNbfcHeadline } from "@/content/rbi-nbfc-insights";
import styles from "./insights-events.module.css";

export default function RbiNbfcInsightCards({ insights }: { insights: readonly RbiNbfcInsight[] }) {
  return (
    <div className={styles.rbiInsightGrid}>
      {insights.map((insight, index) => {
        const headline = splitRbiNbfcHeadline(insight.title);

        return (
          <Link className={styles.rbiInsightCard} href={`/insights/${insight.slug}`} key={insight.slug}>
            <span className={styles.rbiInsightIcon} aria-hidden="true"><Icon name={insight.icon} /></span>
            <span className={styles.rbiInsightAction}>Read Insight <Icon name="arrow" /></span>
            <span className={styles.rbiInsightCategory}>Banking, RBI &amp; Financial Services</span>
            <strong className={styles.rbiInsightTitle}>
              {headline.lead}{headline.continuation && <> <span>{headline.continuation}</span></>}
            </strong>
            <span className={styles.rbiInsightNumber}>{String(index + 1).padStart(2, "0")}</span>
          </Link>
        );
      })}
    </div>
  );
}