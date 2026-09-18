import Link from "next/link";
import { slugify } from "@/content/site";
import Icon from "./icon";
import styles from "./global-presence-menu.module.css";

const regions = [
  ["India", "Our home market, serving clients nationwide.", "india"],
  ["UAE", "A strategic hub for the Middle East.", "uae"],
  ["Singapore", "Gateway to Asia-Pacific opportunities.", "singapore"],
  ["UK", "Supporting businesses across the United Kingdom.", "uk"],
  ["USA", "Advising across key markets in the United States.", "usa"],
  ["EU", "Access to European markets and regulation.", "eu"],
  ["Middle East", "Regional expertise across key jurisdictions.", "middleEast"],
] as const;

const explore = [
  ["globe", "Global Presence Overview", "/global-presence"],
  ["network", "Our International Network", "/professionals/international-network"],
  ["file", "Cross-Border Advisory", "/services/fema-fdi-and-foreign-exchange-advisory"],
  ["handshake", "Partner With Us", "/global-presence/partner-with-us"],
  ["pin", "Enquire About a Jurisdiction", "/contact"],
] as const;

const quickLinks = [
  ["chart", "Our Approach", "Consistent. Collaborative. Global.", "/about/our-methodology"],
  ["people", "Our Professionals", "A connected global team.", "/professionals"],
  ["building", "Client Success", "Supporting global ambitions.", "/success-stories"],
  ["file", "Insights & Updates", "Global developments. Local impact.", "/insights"],
] as const;

const opportunities = [
  ["globe", "Global Mindset", "Local insight with an international perspective.", "/about/global-perspective-and-international-network"],
  ["message", "Discuss Your Global Requirement", "Talk with our cross-border advisory team.", "/global-presence/discuss-your-global-requirement"],
  ["bulb", "Ideas Across Borders", "Perspectives for international growth.", "/global-presence/ideas-across-borders"],
  ["handshake", "Partner With Us", "Build opportunities together.", "/global-presence/partner-with-us"],
  ["chart", "Our Approach", "How we work across jurisdictions.", "/about/our-methodology"],
  ["globe", "Connecting Markets, Creating Opportunities", "Explore our global reach.", "/global-presence"],
  ["people", "International Professional Network", "Meet our connected professionals.", "/professionals/international-network"],
] as const;

export default function GlobalPresenceMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.intro}>
      <div><span className={styles.eyebrow}>Global Presence</span><h2>A Global Mindset. Local Insight.</h2><p>Connecting businesses across borders with trusted legal, regulatory and business advisory support.</p></div>
      <Link href="/global-presence#countries" onClick={onNavigate} className={styles.mapCta}><span>View Interactive Global Map <Icon name="arrow" /></span><small>Explore our presence, offices and partner network worldwide.</small></Link>
    </div>
    <div className={styles.main}>
      <section className={styles.regions} aria-label="Our regions">
        {regions.map(([name, description, image]) => <Link href={`/global-presence/${slugify(name)}`} onClick={onNavigate} className={styles.region} key={name}><span className={`${styles.thumbnail} ${styles[image]}`} aria-hidden="true" /><span className={styles.regionCopy}><strong>{name}</strong><small>{description}</small></span><span className={styles.regionArrow} aria-hidden="true">›</span></Link>)}
      </section>
      <section className={styles.footprint} aria-label="Our global footprint">
        <span className={styles.sectionLabel}>Our Global Footprint</span>
        <div className={styles.stats}><div><strong>7+</strong><span>Key Regions</span></div><div><strong>30+</strong><span>Countries (Network)</span></div><div><strong>1</strong><span>Integrated Platform</span></div></div>
        <div className={styles.map} role="img" aria-label="Stylized world map highlighting our international network"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g fill="#cfdeeb" stroke="#f7fbff" strokeWidth="2"><path d="M43 78 92 57 155 60 190 78 187 98 213 109 203 135 175 146 159 174 132 177 116 158 89 151 81 129 48 121 30 104Z"/><path d="m158 188 40-9 34 22 21 41-12 35-20 19-7 43-24 33-16-8-4-34-19-28 2-34-21-35Z"/><path d="m171 43 24-28 30 8-3 34-28 15Z"/><path d="m331 82 35-25 47 4 25-18 47 6 29-14 48 12 38-6 68 27 39 21-10 31-45 14-37-7-25 20-38-10-38 19-27-21-30 4-32-15-29 8-29-12-34 14-18-24-28 3-25-18Z"/><path d="m373 168 41-16 41 14 29 37-15 48-16 24-13 45-25 22-25-21-10-41-21-25-7-53Z"/><path d="m654 258 43-13 50 16 24 37-11 34-48 14-54-16-21-38Z"/><path d="m596 184 20 13 8 28-13 16-19-22Z"/><path d="m279 166 14-10 12 7-4 19-14 6Z"/></g><g fill="#123f77" stroke="#f7fbff" strokeWidth="2"><path d="m61 103 34-14 35 8 24 20-11 25-39 6-24-17-25 2Z"/><path d="m353 100 18-10 22 9-3 22-21 7-16-10Z"/><path d="m387 126 20-12 18 9 7 24-16 12-28-13Z"/><path d="m494 194 20-13 21 12 6 34-16 32-22-10-14-31Z"/><path d="m523 176 20-8 16 13-3 26-16 5-17-18Z"/><path d="m555 205 19-8 11 18-12 20-16-5Z"/><path d="m595 207 18 7 6 18-14 9-14-16Z"/><path d="m658 274 39-11 43 16 15 29-19 24-44 5-35-18-11-26Z"/></g></svg></div>
        <p>Partnering across jurisdictions to deliver seamless advisory support wherever you do business.</p>
      </section>
      <aside className={styles.side}><div className={styles.feature}><span>Global Perspective.<br />Local Impact.</span><i /><p>Cross-border advisory for a more connected, opportunity-rich world.</p><Link href="/professionals/international-network" onClick={onNavigate}>Our Global Network <Icon name="arrow" /></Link></div><div className={styles.explore}><span className={styles.sectionLabel}>Explore More</span>{explore.map(([icon, title, href]) => <Link href={href} onClick={onNavigate} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></aside>
      <section className={styles.opportunities} aria-label="Global opportunities">
        <span className={styles.sectionLabel}>Connect & Collaborate</span>
        {opportunities.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title} className={styles.opportunity}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span><Icon name="arrow" /></Link>)}
      </section>
    </div>
    <div className={styles.footer}>{quickLinks.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span></Link>)}</div>
  </div>;
}
