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
  ["Business Guides", "Practical guidance for navigating new markets.", "/resources/business-guides", "guide"],
  ["Compliance Checklists", "Plan regulatory steps with more clarity.", "/resources/compliance-checklists", "checklist"],
  ["Download Library", "Browse useful documents and resources.", "/resources/downloads", "library"],
] as const;

export default function IdeasAcrossBordersPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><div className={styles.heroInner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/global-presence">Global Presence</Link><span>›</span><span>Global Insights</span></nav>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Global Insights</span><h1>Ideas Across Borders.<br />Insights for What&apos;s Next.</h1><i /><p>Thought leadership, regulatory updates and market perspectives to help you navigate opportunities and challenges in key global markets.</p><Link href="#featured">Explore Insights <Icon name="arrow" /></Link></div>
      <div className={styles.heroAside}>Knowledge<br />informs<br />opportunity.<i />A more<br />connected<br />tomorrow.</div>
    </div></section>

    <IdeasDirectory />

    <div className={styles.lowerGrid}>
      <section className={styles.topics}><div className={styles.sectionHeading}><h2>Key Topics</h2><Link href="/insights">View All Topics <Icon name="arrow" /></Link></div><div className={styles.topicGrid}>{topics.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div></section>
      <section className={styles.events}><div className={styles.sectionHeading}><h2>Events & Perspectives</h2><Link href="/media">View All Events <Icon name="arrow" /></Link></div><div className={styles.eventList}><Link href="/media"><Icon name="calendar" /><span><strong>Events, Seminars & Webinars</strong><small>Explore conversations shaping business and regulation.</small></span><Icon name="arrow" /></Link><Link href="/professionals/international-network"><Icon name="people" /><span><strong>International Perspectives</strong><small>Connect with our network of professionals.</small></span><Icon name="arrow" /></Link><Link href="/insights"><Icon name="bulb" /><span><strong>Latest Insights</strong><small>Ideas and updates from across our practice.</small></span><Icon name="arrow" /></Link></div></section>
    </div>

    <section className={styles.publications}><div className={styles.sectionHeading}><h2>Resources & Publications</h2><Link href="/resources">View All Resources <Icon name="arrow" /></Link></div><div className={styles.resourceGrid}>{resources.map(([title, description, href, image]) => <Link href={href} key={title}><span className={`${styles.resourceImage} ${styles[image]}`} aria-hidden="true"/><span><strong>{title}</strong><small>{description}</small><em>Explore Resource <Icon name="arrow" /></em></span></Link>)}</div></section>

    <section className={styles.subscribe}><div className={styles.subscribeInner}><div><h2>Stay Informed</h2><p>Request updates on the latest insights, events and resources from Astronis Global.</p></div><SubscribeForm /></div></section>
  </div>;
}
