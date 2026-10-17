import Link from "next/link";
import Icon from "@/app/_components/icon";
import type { LegalAdvisoryInsight } from "@/content/legal-advisory-insights";
import { splitLegalAdvisoryHeadline } from "@/content/legal-advisory-insights";
import styles from "./insights-events.module.css";

export default function LegalInsightCards({ insights }: { insights: readonly LegalAdvisoryInsight[] }) {
  return (
    <div className={styles.legalInsightGrid}>
      {insights.map((insight, index) => {
        const headline = splitLegalAdvisoryHeadline(insight.title);

        return (
          <Link className={styles.legalInsightCard} href={`/insights/${insight.slug}`} key={insight.slug}>
            <span className={styles.legalInsightTop}>
              <span className={styles.legalInsightNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.legalInsightIcon} aria-hidden="true"><Icon name={insight.icon} /></span>
            </span>
            <span className={styles.legalInsightFocus}>{insight.focus}</span>
            <strong className={styles.legalInsightTitle}>
              {headline.lead}{headline.continuation && <> <span>{headline.continuation}</span></>}
            </strong>
            <span className={styles.legalInsightAction}>Read Insight <Icon name="arrow" /></span>
          </Link>
        );
      })}
    </div>
  );
}