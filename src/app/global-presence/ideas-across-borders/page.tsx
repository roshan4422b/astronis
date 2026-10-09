import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import IdeasDirectory from "./ideas-directory";
import SubscribeForm from "./subscribe-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ideas Across Borders",
  description: "Explore cross-border perspectives, market opportunities and practical resources from Astronis Global.",
};

const topics = [
  ["scale", "Regulatory Developments", "/insights/legal-updates"],
  ["chart", "Market Trends", "/insights/business-updates"],
  ["file", "Cross-Border Transactions", "/services/fema-fdi-and-foreign-exchange-advisory"],
  ["globe", "Jurisdiction Updates", "/global-presence"],
  ["gear", "Sector Insights", "/industries"],
  ["bulb", "ESG & Sustainability", "/industries"],
  ["people", "Global Business Strategy", "/services/business-advisory-and-consulting"],
  ["document", "Thought Leadership", "/insights/articles"],
] as const;

const resources = [
  ["Global Business Expansion Guide 2026", "A practical guide for navigating key international markets.", "/resources/business-guides", "guide"],
  ["Regulatory Compliance Handbook", "Key legal and regulatory considerations across jurisdictions.", "/resources/compliance-checklists", "checklist"],
  ["Asia-Pacific Market Outlook 2026", "Trends, opportunities and sectoral analysis.", "/resources/downloads", "library"],
] as const;

const events = [
  ["25", "SEP 2026", "Doing Business in the UAE – Legal & Regulatory Considerations", "Webinar", "Online", "/media"],
  ["10", "OCT 2026", "India–Europe Trade Opportunities", "Panel Discussion", "New Delhi", "/media"],
  ["22", "OCT 2026", "Global Compliance in a Changing Landscape", "Roundtable", "Singapore", "/media"],
] as const;

export default function IdeasAcrossBordersPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><div className={styles.heroInner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/global-presence">Global Presence</Link><span>›</span><span>Global Insights</span></nav>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Global Insights</span><h1>Ideas Across Borders.<br />Insights for What&apos;s Next.</h1><i /><p>Thought leadership, regulatory updates and market perspectives to help you navigate opportunities and challenges in key global markets.</p><Link href="#featured">Explore All Insights <Icon name="arrow" /></Link></div>
      <div className={styles.heroAside}>Knowledge<br />informs<br />opportunity.<i />A more<br />connected<br />tomorrow.</div>
    </div></section>

    <IdeasDirectory />

    <div className={styles.lowerGrid}>
      <section className={styles.topics}><div className={styles.sectionHeading}><h2>Key Topics</h2><Link href="/insights">View All Topics <Icon name="arrow" /></Link></div><div className={styles.topicGrid}>{topics.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div></section>
    </div>

    <section className={styles.events}><div className={styles.sectionHeading}><h2>Upcoming Events</h2><Link href="/media">View All Events <Icon name="arrow" /></Link></div><div className={styles.eventList}>{events.map(([day, date, title, type, location, href]) => <Link href={href} key={title}><span className={styles.eventDate}><strong>{day}</strong><small>{date}</small></span><span className={styles.eventDetails}><strong>{title}</strong><small>{type}<i aria-hidden="true">|</i>{location}</small></span><Icon name="arrow" /></Link>)}</div></section>

    <section className={styles.publications}><div className={styles.sectionHeading}><h2>Latest Publications</h2><Link href="/resources">View All Publications <Icon name="arrow" /></Link></div><div className={styles.resourceGrid}>{resources.map(([title, description, href, image]) => <Link href={href} key={title}><span className={`${styles.resourceImage} ${styles[image]}`} aria-hidden="true"/><span><strong>{title}</strong><small>{description}</small><em>Download PDF <Icon name="arrow" /></em></span></Link>)}</div></section>

    <section className={styles.subscribe} id="subscribe"><div className={styles.subscribeInner}><div><h2>Stay Informed</h2><p>Subscribe to our updates for the latest insights, events and publications from Astronis Global.</p></div><SubscribeForm /></div></section>
  </div>;
}
