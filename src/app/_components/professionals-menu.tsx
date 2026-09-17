import Link from "next/link";
import Image from "./asset-image";
import Icon from "./icon";
import styles from "./professionals-menu.module.css";

const columns = [
  {
    icon: "people",
    title: "Our People",
    tagline: "Experienced. Diverse. Committed.",
    links: [
      ["Our Professionals", "Meet the people behind our work", "/professionals"],
      ["Leadership Team", "Get to know our leaders", "/professionals/leadership-team"],
      ["Careers", "Grow with Astronis Global", "/about/careers"],
      ["Partner With Us", "Explore professional collaboration", "/professionals/partner-with-us"],
    ],
  },
  {
    icon: "scale",
    title: "Advisory Expertise",
    tagline: "Practical. Multidisciplinary.",
    links: [
      ["Across Practice Areas", "Find the advice your matter needs", "/services"],
      ["Corporate Advisory", "Meet our corporate and regulatory professionals", "/professionals/corporate-advisory"],
      ["Regulatory Services", "Navigate obligations with clarity", "/services/regulatory-and-compliance"],
      ["Experts by Industry", "Sector-focused perspectives", "/industries"],
    ],
  },
  {
    icon: "globe",
    title: "Global Collaboration",
    tagline: "Local insight. Wider reach.",
    links: [
      ["Global Presence", "See where we work", "/global-presence"],
      ["India Presence", "Local understanding across India", "/global-presence/india"],
      ["International Network", "Connected across borders", "/professionals/international-network"],
      ["Professional Collaboration", "Build relationships that last", "/professionals/partner-with-us"],
    ],
  },
  {
    icon: "search",
    title: "Find a Professional",
    tagline: "The right perspective for you.",
    links: [
      ["Browse Professionals", "Explore our team", "/professionals#leadership"],
      ["By Practice Area", "Start with a service", "/services"],
      ["By Industry", "Explore sector expertise", "/industries"],
      ["Request an Introduction", "Tell us what you need", "/professionals/enquiry"],
    ],
  },
] as const;

export default function ProfessionalsMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.columns}>
      {columns.map(column => <section className={styles.column} key={column.title} aria-label={column.title}>
        <span className={styles.columnIcon}><Icon name={column.icon} /></span>
        <h2>{column.title}</h2>
        <p className={styles.tagline}>{column.tagline}</p>
        <span className={styles.rule} />
        <div className={styles.links}>{column.links.map(([title, description, href]) => <Link href={href} onClick={onNavigate} key={title}>
          <span><strong>{title}</strong><small>{description}</small></span><Icon name="arrow" />
        </Link>)}</div>
        {column.title === "Global Collaboration" && <Link className={styles.collaborate} href="/professionals/partner-with-us" onClick={onNavigate}><Icon name="people" /><span><strong>Collaborate With Us</strong><small>Explore ways to work together</small></span><Icon name="arrow" /></Link>}
      </section>)}
    </div>
    <aside className={styles.feature} aria-label="Meet our professionals">
      <div className={styles.featureImage}><Image src="/Professional & Business Services .png" alt="Professionals collaborating across a global network" fill sizes="(max-width: 1050px) 100vw, 270px" /></div>
      <div className={styles.featureCopy}><span className={styles.featureEyebrow}>ASTRONIS GLOBAL</span><h2>People.<br />Perspective.<br />Progress.</h2><span className={styles.rule} /><p>Legal knowledge, regulatory insight and business understanding, brought together for your goals.</p><Link href="/professionals" onClick={onNavigate}>Meet Our Professionals <Icon name="arrow" /></Link></div>
    </aside>
  </div>;
}
