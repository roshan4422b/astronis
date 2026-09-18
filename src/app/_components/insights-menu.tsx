import Link from "next/link";
import { slugify } from "@/content/site";
import Icon from "./icon";
import styles from "./insights-menu.module.css";

const columns = [
  {
    icon: "file", title: "Thought Leadership", tagline: "Ideas. Analysis. Perspectives.",
    links: [
      ["file", "Articles", "In-depth analysis on legal, regulatory and business developments."],
      ["pencil", "Blogs", "Expert views on emerging opportunities and challenges."],
      ["file", "White Papers", "Research-driven insights on key sectors and regulations."],
    ],
  },
  {
    icon: "chart", title: "Regulatory & Legal Updates", tagline: "Stay compliant. Stay informed.",
    links: [
      ["scale", "Legal Updates", "Key judgments, legal developments and regulatory changes."],
      ["chart", "Business Updates", "Policy updates and market movements impacting businesses."],
      ["building", "Government Notifications", "Central and State government notifications."],
      ["building", "RBI Circulars", "Updates from the Reserve Bank of India."],
      ["chart", "SEBI Updates", "Developments from SEBI."],
    ],
  },
  {
    icon: "folder", title: "Sectoral & Compliance Updates", tagline: "Updates that matter to your business.",
    links: [
      ["percent", "GST Updates", "Latest news, notifications and advisories on GST."],
      ["file", "MCA Updates", "Company law and MCA notifications."],
      ["rocket", "Startup News", "Updates from India's startup ecosystem."],
      ["calendar", "Compliance Calendar", "Key compliance due dates and alerts."],
    ],
  },
  {
    icon: "bulb", title: "Knowledge Resources", tagline: "Practical tools. Real value.",
    links: [
      ["download", "Downloads", "Useful documents, templates and resources."],
      ["help", "FAQs", "Answers to common legal and regulatory queries."],
      ["file", "Case Studies & Success Stories", "Real-world solutions. Tangible impact."],
    ],
  },
] as const;

const footerLinks = [
  ["calendar", "Upcoming Events", "Webinars, seminars and industry events.", "/media"],
  ["people", "Expert Perspectives", "Insights from our professionals.", "/professionals"],
  ["mail", "Subscribe for Updates", "Get the latest insights in your inbox.", "/contact"],
  ["play", "Watch on YouTube", "Legal. Regulatory. Business Insights.", "/media"],
] as const;

function hrefFor(title: string) {
  if (title === "FAQs") return "/faqs";
  if (title === "Case Studies & Success Stories") return "/success-stories";
  if (title === "Downloads") return "/resources";
  return `/insights/${slugify(title)}`;
}

export default function InsightsMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.intro}>
      <div><span className={styles.eyebrow}>Insights & Events</span><h2>Insights for a Changing World.</h2><p>Trusted perspectives on legal, regulatory, business and policy developments.</p></div>
      <Link href="/insights" onClick={onNavigate} className={styles.introLink}><strong>Explore All Insights <Icon name="arrow" /></strong><small>Stay informed. Stay ahead.</small></Link>
    </div>
    <div className={styles.main}>
      <div className={styles.columns}>{columns.map((column) => <section className={styles.column} key={column.title} aria-label={column.title}>
        <div className={styles.heading}><Icon name={column.icon} /><span><h3>{column.title}</h3><p>{column.tagline}</p></span></div>
        <div className={styles.links}>{column.links.map(([icon, title, description]) => <Link href={hrefFor(title)} onClick={onNavigate} key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span><span className={styles.chevron} aria-hidden="true">›</span></Link>)}</div>
      </section>)}</div>
      <aside className={styles.feature}><div className={styles.featureImage} role="img" aria-label="Legal and business insights workspace" /><div className={styles.featureCopy}><span className={styles.eyebrow}>Knowledge that empowers.</span><h2>From Insight<br />to Impact.</h2><p>Timely updates, expert analysis and practical intelligence for a more informed tomorrow.</p><Link href="/insights" onClick={onNavigate}>Explore All Insights <Icon name="arrow" /></Link></div></aside>
    </div>
    <div className={styles.footer}>{footerLinks.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span><span className={styles.chevron} aria-hidden="true">›</span></Link>)}</div>
  </div>;
}
