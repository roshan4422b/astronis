import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import styles from "./knowledge-centre.module.css";

const formats = [
  { title: "Articles", text: "Perspectives on law, business and the decisions ahead.", icon: "file", href: "/insights/articles" },
  { title: "Legal Updates", text: "Navigate changing laws and regulatory developments.", icon: "document", href: "/insights/legal-updates" },
  { title: "Research Papers", text: "Explore ideas in depth through our white papers.", icon: "chart", href: "/insights/white-papers" },
  { title: "Guides & Checklists", text: "Practical resources for your next business step.", icon: "shield", href: "/resources/compliance-checklists" },
  { title: "Case Studies", text: "Discover perspectives from real business challenges.", icon: "scale", href: "/success-stories" },
  { title: "Webinars & Videos", text: "Make room for fresh thinking and expert discussions.", icon: "play", href: "/media/webinars" },
];
const topics = [
  { title: "Corporate & Commercial", icon: "building", href: "/services/corporate-advisory" },
  { title: "Regulatory & Compliance", icon: "shield", href: "/insights/legal-updates" },
  { title: "Taxation & GST", icon: "document", href: "/insights/gst-updates" },
  { title: "Business & Investment", icon: "chart", href: "/insights/business-updates" },
  { title: "Technology & Innovation", icon: "bulb", href: "/industries/it-and-ites" },
  { title: "Foreign Investment & FEMA", icon: "globe", href: "/global-presence/fdi" },
];
const principles = [
  { title: "Expert perspectives", text: "Insights from our professional team", icon: "people" },
  { title: "Practical & actionable", text: "Knowledge for real business decisions", icon: "bulb" },
  { title: "A broader perspective", text: "Across industries and jurisdictions", icon: "globe" },
];

export default function KnowledgeCentre() {
  const [featured, ...articles] = corporateArticles;
  return (
    <section className={styles.section} aria-labelledby="home-knowledge-title" id="knowledge-centre">
      <div className="container">
        <div className={styles.hero}>
          <Image src="/Part-18 .png" alt="" fill sizes="(max-width: 700px) 100vw, 90vw" className={styles.heroImage} />
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>THE ASTRONIS PERSPECTIVE</span>
            <h2 id="home-knowledge-title">Knowledge Centre<span>.</span></h2>
            <h3>Insights that inform.<br />Knowledge that empowers.</h3>
            <p>Explore legal, regulatory and business perspectives that help you see what matters — and move forward with clarity.</p>
            <Link href="/knowledge-centre" className={styles.heroLink}>Explore the Knowledge Centre <Icon name="arrow" /></Link>
          </div>
        </div>

        <div className={styles.principles}>
          {principles.map(item => <div key={item.title}><span className={styles.softIcon}><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
        </div>

        <div className={styles.block}>
          <div className={styles.heading}><div><span className={styles.label}>FIND YOUR FORMAT</span><h3>Browse knowledge by content type</h3></div><p>A little clarity, in the way you like to learn.</p></div>
          <div className={styles.formats}>
            {formats.map(item => <Link href={item.href} key={item.title} className={styles.format}><span className={styles.roundIcon}><Icon name={item.icon} /></span><h4>{item.title}</h4><p>{item.text}</p><span className={styles.explore}>Explore <Icon name="arrow" /></span></Link>)}
          </div>
        </div>

        <div className={`${styles.block} ${styles.editorial}`}>
          <div>
            <div className={styles.heading}><div><span className={styles.label}>IDEAS TO MOVE YOU FORWARD</span><h3>Insights & perspectives</h3></div><Link href="/insights" className={styles.textLink}>View all insights <Icon name="arrow" /></Link></div>
            <article className={styles.featured}>
              <div className={styles.featuredImage}><Image src={featured.image} alt="" fill sizes="(max-width: 700px) 100vw, 40vw" /></div>
              <div className={styles.featuredBody}><span className={styles.eyebrow}>FEATURED INSIGHT</span><h4>{featured.title}</h4><p>{featured.excerpt}</p><Link href={`/insights/${featured.slug}`} className={styles.heroLink}>Read insight <Icon name="arrow" /></Link></div>
            </article>
            <div className={styles.articles}>{articles.map(article => <article className={styles.article} key={article.slug}><div className={styles.articleImage}><Image src={article.image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" /></div><div className={styles.articleBody}><span className={styles.label}>{article.category}</span><h4><Link href={`/insights/${article.slug}`}>{article.title}</Link></h4><Link href={`/insights/${article.slug}`} className={styles.textLink}>Read insight <Icon name="arrow" /></Link></div></article>)}</div>
          </div>
          <aside className={styles.sidebar} aria-labelledby="knowledge-topics-title">
            <span className={styles.label}>EXPLORE WHAT MATTERS</span><h3 id="knowledge-topics-title">Popular topics</h3>
            <div className={styles.topics}>{topics.map(topic => <Link key={topic.title} href={topic.href}><Icon name={topic.icon} /><span>{topic.title}</span><Icon name="arrow" /></Link>)}</div>
            <div className={styles.library}><span className={styles.softIcon}><Icon name="file" /></span><h3>Your resource library</h3><p>Make your next step simpler with business guides, checklists and useful resources.</p><Link href="/resources" className={styles.textLink}>Browse resources <Icon name="arrow" /></Link></div>
          </aside>
        </div>

        <div className={styles.bottom}><div className={styles.bottomIntro}><span className={styles.roundIcon}><Icon name="mail" /></span><div><h3>Stay informed. Stay ahead.</h3><p>Discover more perspectives from Astronis Global.</p></div></div><Link href="/insights" className={styles.bottomLink}>Explore all insights <Icon name="arrow" /></Link><p className={styles.motto}>Knowledge is power.<br /><strong>Use it to lead.</strong></p></div>
      </div>
    </section>
  );
}
