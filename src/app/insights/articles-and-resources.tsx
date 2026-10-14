import Link from "next/link";
import Image from "@/app/_components/asset-image";
import { Banner, Heading, TextLink } from "@/app/_components/ui";
import { corporateArticles } from "@/content/corporate-articles";
import styles from "./articles-and-resources.module.css";

const resources = [
  ["White Papers & Research", "/insights/white-papers-research"],
  ["Downloads & Useful Documents", "/insights/download-useful-documents"],
  ["FAQs", "/faqs"],
] as const;

export default function ArticlesAndResources() {
  return (
    <>
      <Banner
        title="Articles & Resources"
        eyebrow="Insights & Resources"
        text="Explore practical articles, business perspectives and resources from Astronis Global."
        image="/Part-14 .png"
      />
      <section className="section">
        <div className="container">
          <Heading
            title="Articles & Expert Perspectives"
            text="Analysis and practical guidance on corporate, commercial and business matters."
          />
          <div className={styles.grid}>
            {corporateArticles.map((article) => (
              <article className={styles.card} key={article.slug}>
                <Link
                  className={styles.image}
                  href={`/insights/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                >
                  <Image src={article.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                </Link>
                <div className={styles.copy}>
                  <span className="eyebrow">{article.category}</span>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <TextLink href={`/insights/${article.slug}`}>Read Article</TextLink>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.resources}>
            {resources.map(([title, href]) => (
              <TextLink href={href} key={title}>{title}</TextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
