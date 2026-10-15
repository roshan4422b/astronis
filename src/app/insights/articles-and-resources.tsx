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
        variant="insights"
        image="/Part-14 .png"
      />
      <section className="section">
        <div className="container">
          <Heading
            title="Articles & Expert Perspectives"
            text="Analysis and practical guidance on corporate, commercial and business matters."
          />
          <article className={styles.featuredArticle}>
            <Link
              className={styles.featuredImage}
              href="/insights/articles-and-resources"
              aria-label="Read RBI’s Scale-Based Regulation for NBFCs"
            >
              <Image
                src="/Banking & Financial Services1 .png"
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 40vw"
              />
            </Link>
            <div className={styles.featuredCopy}>
              <span className="eyebrow">Regulatory &amp; Compliance</span>
              <h2>
                <Link
                  href="/insights/articles-and-resources"
                  className={styles.featuredTitleLink}
                >
                  RBI’s Scale-Based Regulation for NBFCs: Understanding the Four-Layer Regulatory Framework
                </Link>
              </h2>
              <p>A comprehensive analysis of the SBR framework, its four layers and practical considerations for NBFC governance and compliance teams.</p>
              <TextLink href="/insights/articles-and-resources">Read Article</TextLink>
            </div>
          </article>
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
