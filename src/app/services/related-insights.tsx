import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import { Action } from "./hub-sections";
import styles from "./hub.module.css";

type Article = (typeof corporateArticles)[number] & { publishedAt?: string };

export default function RelatedInsights({ articles = corporateArticles.slice(0, 3), title = "Insights Related to Our Services" }: { articles?: Article[]; title?: string }) {
  return (
    <section className={`${styles.section} ${styles.insightsSection}`} aria-labelledby="related-insights-title">
      <div className="container">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>PERSPECTIVES FOR DECISION-MAKERS</span>
            <h2 id="related-insights-title">{title}</h2>
            <p className={styles.insightsIntro}>Considered perspectives. Practical guidance. A clearer view of your next business decision.</p>
          </div>
          <Action href="/insights" secondary>All Insights</Action>
        </div>
        {articles.length === 0 && <p>Explore our regulatory updates and resources in the <Link href="/insights/legal-updates">Insights centre</Link>. Browse the available updates and guidance to prepare for your next regulatory discussion.</p>}
        <div className={styles.grid}>
          {articles.map((article, index) => {
            const words = article.sections.flat().join(" ").trim().split(/\s+/).length;
            const minutes = Math.max(1, Math.ceil(words / 200));
            return (
              <article className={styles.insight} key={article.slug}>
                <Link href={`/insights/${article.slug}`} className={styles.insightLink} aria-labelledby={`insight-title-${article.slug}`}>
                  <div className={styles.insightImage}>
                    <Image src={article.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
                    <span className={styles.insightCategory}>{article.category}</span>
                    <span className={styles.insightImageArrow} aria-hidden="true"><Icon name="arrow" /></span>
                  </div>
                  <div className={styles.insightBody}>
                    <div className={styles.insightMeta}>
                      <span>ASTRONIS PERSPECTIVES</span>
                      <span>{minutes} min read</span>
                    </div>
                    <h3 id={`insight-title-${article.slug}`}>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    {article.publishedAt && <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" })}</time>}
                    <div className={styles.insightFooter}>
                      <span>Read Article <Icon name="arrow" /></span>
                      <span className={styles.insightIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
