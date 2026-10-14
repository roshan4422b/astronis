import Link from "next/link";
import Icon from "@/app/_components/icon";
import type { RegulatoryInsight } from "@/content/regulatory-insights";
import { splitRegulatoryHeadline } from "@/content/regulatory-insights";
import styles from "./insights-events.module.css";

export default function RegulatoryInsightRows({ insights }: { insights: readonly RegulatoryInsight[] }) {
  return (
    <div className={styles.regulatoryInsightRows}>
      {insights.map((insight, index) => {
        const headline = splitRegulatoryHeadline(insight.title);

        return (
          <Link className={styles.regulatoryInsightRow} href={`/insights/${insight.slug}`} key={insight.slug}>
            <span className={styles.regulatoryInsightNumber}>{String(index + 1).padStart(2, "0")}</span>
            <strong className={styles.regulatoryInsightTitle}>
              {headline.lead}{headline.continuation && <> <span>{headline.continuation}</span></>}
            </strong>
            <span className={styles.regulatoryFocus}>
              <strong>{insight.focus}</strong>
            </span>
            <Icon name="arrow" />
          </Link>
        );
      })}
    </div>
  );
}