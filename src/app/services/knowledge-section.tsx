import Link from "next/link";
import { corporateArticles } from "@/content/corporate-articles";
import { Action } from "./hub-sections";
import styles from "./hub.module.css";

export default function KnowledgeSection() {
  const article = corporateArticles[3];
  return <section className={styles.knowledge}><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>BEYOND THE ENGAGEMENT</span><h2>Knowledge Centre</h2><p>Practical insights, regulatory updates and business intelligence for decision-makers.</p></div><Action href="/knowledge-centre" secondary>Visit Knowledge Centre</Action></div><div className={styles.knowledgeGrid}><Link className={styles.featuredArticle} href={`/insights/${article.slug}`}><span className={styles.eyebrow}>FEATURED PERSPECTIVE / JOINT VENTURES</span><h3>{article.title}</h3><p>{article.excerpt}</p><span className={styles.cardAction}>Read the perspective <span aria-hidden="true">↗</span></span></Link><div className={styles.knowledgeLinks}>{[["Articles & Perspectives", "/insights"], ["Legal & Regulatory Updates", "/insights/legal-updates"], ["Research & White Papers", "/knowledge-centre"], ["Compliance Resources", "/resources"], ["Case Studies", "/success-stories"], ["Frequently Asked Questions", "/faqs"]].map(([title, href]) => <Link key={title} href={href}>{title}<span aria-hidden="true">↗</span></Link>)}</div></div></div></section>;
}
