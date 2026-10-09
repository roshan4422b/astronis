import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugify } from "@/content/site";
import Icon from "./icon";
import styles from "./insights-menu.module.css";
import { isRouteActive } from "./navigation-state";

const columns = [
  {
    icon: "file", title: "Thought Leadership", tagline: "Ideas. Analysis. Perspectives.",
    links: [
      ["file", "Articles", "Analysis on legal and regulatory developments."],
      ["pencil", "Blogs", "Views on emerging opportunities and risks."],
      ["file", "White Papers", "Research on key sectors and regulations."],
      ["building", "Government Notifications", "Central and state notifications."],
    ],
  },
  {
    icon: "chart", title: "Regulatory & Legal Updates", tagline: "Stay compliant. Stay informed.",
    links: [
      ["scale", "Legal Updates", "Key judgments and regulatory changes."],
      ["chart", "Business Updates", "Policy updates affecting businesses."],
      ["building", "RBI Circulars", "Reserve Bank updates."],
      ["chart", "SEBI Updates", "SEBI developments."],
    ],
  },
  {
    icon: "folder", title: "Sectoral & Compliance Updates", tagline: "Updates that matter to your business.",
    links: [
      ["percent", "GST Updates", "GST news and advisories."],
      ["file", "MCA Updates", "Company law notifications."],
      ["rocket", "Start-Up and MSME Updates", "Start-up and MSME ecosystem updates."],
      ["calendar", "Compliance Calendar", "Key compliance dates."],
    ],
  },
  {
    icon: "bulb", title: "Knowledge Resources", tagline: "Practical tools. Real value.",
    links: [
      ["download", "Downloads", "Useful documents and templates."],
      ["help", "FAQs", "Common legal and regulatory questions."],
      ["file", "Case Studies & Success Stories", "Real-world solutions and impact."],
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
  if (title === "Downloads") return "/insights/download-useful-documents";
  return `/insights/${slugify(title)}`;
}

export default function InsightsMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const pathname = usePathname();

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    
    <div className={styles.main}>
      <div className={styles.columns}>{columns.map((column) => <section className={styles.column} key={column.title} aria-label={column.title}>
        <div className={styles.heading}><Icon name={column.icon} /><span><h3>{column.title}</h3><p>{column.tagline}</p></span></div>
        <div className={styles.links}>{column.links.map(([icon, title, description]) => {
          const href = hrefFor(title);
          return <Link href={href} onClick={onNavigate} key={title} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span><span className={styles.chevron} aria-hidden="true">›</span></Link>;
        })}</div>
      </section>)}</div>
      <aside className={styles.feature}><div className={styles.featureImage} role="img" aria-label="Legal and business insights workspace" /><div className={styles.featureCopy}><span className={styles.eyebrow}>Knowledge that empowers.</span><h2>From Insight<br />to Impact.</h2><Link href="/insights-events" onClick={onNavigate} className={isRouteActive(pathname, "/insights-events") ? "active-submenu-item" : undefined}>Explore All Insights <Icon name="arrow" /></Link></div></aside>
    </div>
    <div className={styles.footer}>{footerLinks.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><span className={styles.quickIcon}><Icon name={icon} /></span><span className={styles.quickCopy}><strong>{title}</strong><small>{description}</small></span><span className={styles.quickArrow} aria-hidden="true"><Icon name="arrow" /></span></Link>)}</div>
  </div>;
}
