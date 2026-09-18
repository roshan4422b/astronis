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
      ["Our Professionals", "Meet our team", "/professionals"],
      ["Leadership Team", "Visionary leadership", "/professionals/leadership-team"],
      ["Legal Professionals", "Litigation, advisory and dispute resolution", "/professionals/legal-professionals"],
      ["Corporate & Regulatory Professionals", "Company law, compliance and regulation", "/professionals/corporate-advisory"],
      ["Business & Financial Advisors", "Finance, tax and strategic advisory", "/professionals/business-financial-advisors"],
      ["Governance & Secretarial Professionals", "Corporate governance and compliance", "/professionals/governance-secretarial"],
      ["Industry & Subject-Matter Experts", "Specialised sector expertise", "/professionals/industry-and-subject-matter-experts"],
    ],
  },
  {
    icon: "scale",
    title: "Advisory Expertise",
    tagline: "Multidisciplinary. Practical. Solutions-focused.",
    links: [
      ["Expertise Across Practice Areas", "Find the right professional", "/services"],
      ["Experts by Industry", "Sector-focused professionals", "/professionals/industry-and-subject-matter-experts"],
      ["Experts by Service", "Match expertise to your needs", "/services"],
      ["Experts by Jurisdiction", "India and international experience", "/professionals/international-network"],
      ["Insights by Professional", "Articles, publications and thought leadership", "/insights"],
    ],
  },
  {
    icon: "globe",
    title: "Global & Collaboration",
    tagline: "Borderless expertise. Shared growth.",
    links: [
      ["International Professionals & Network", "Our global relationships", "/professionals/international-network"],
      ["Professional Collaboration", "Working together for greater impact", "/professionals/partner-with-us"],
      ["Join Our Professional Network", "Be a part of our growing network", "/professionals/join-our-professional-network"],
      ["Professionals by Location / Jurisdiction", "Find professionals in India and globally", "/global-presence"],
    ],
  },
  {
    icon: "search",
    title: "Find a Professional",
    tagline: "Right expertise. Right solution.",
    links: [
      ["Search Professionals", "Find by expertise, service, industry, location and more", "/professionals#leadership"],
      ["Advanced Search", "Refine your search with multiple filters", "/professionals/corporate-advisory"],
      ["Professionals by Location", "India and international jurisdictions", "/global-presence"],
      ["Request an Introduction", "Let us connect you with the right expert", "/professionals/enquiry"],
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
        {column.title === "Global & Collaboration" && <Link className={styles.collaborate} href="/professionals/partner-with-us" onClick={onNavigate}><Icon name="people" /><span><strong>Collaborate With Us</strong><small>Explore opportunities to work together</small></span><Icon name="arrow" /></Link>}
      </section>)}
    </div>
    <aside className={styles.feature} aria-label="Meet our professionals">
      <div className={styles.featureImage}><Image src="/Professional & Business Services .png" alt="Professionals collaborating across a global network" fill sizes="(max-width: 1050px) 100vw, 270px" /></div>
      <div className={styles.featureCopy}><span className={styles.featureEyebrow}>ASTRONIS GLOBAL</span><h2>People.<br />Perspective.<br />Progress.</h2><span className={styles.rule} /><p>Legal knowledge, regulatory insight and business understanding, brought together for your goals.</p><Link href="/professionals" onClick={onNavigate}>Meet Our Professionals <Icon name="arrow" /></Link></div>
    </aside>
  </div>;
}
