import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "./asset-image";
import Icon from "./icon";
import styles from "./professionals-menu.module.css";
import { isRouteActive } from "./navigation-state";

const columns = [
  {
    title: "Our People",
    links: [
      ["people", "Our Professionals", "Meet our team", "/professionals"],
      ["award", "Leadership Team", "Visionary leadership", "/professionals/leadership-team"],
      ["scale", "Legal Professionals", "Litigation, advisory and dispute resolution", "/professionals/legal-professionals"],
      ["building", "Corporate & Regulatory Professionals", "Company law, compliance and regulation", "/professionals/corporate-advisory"],
      ["bank", "Business & Financial Advisors", "Finance, tax and strategic advisory", "/professionals/business-financial-advisors"],
      ["target", "Industry & Subject-Matter Experts", "Specialised sector expertise", "/professionals/industry-and-subject-matter-experts"],
    ],
  },
  {
    title: "Advisory Expertise",
    links: [
      ["scale", "Expertise Across Practice Areas", "Find the right professional", "/expertise-across-practice-areas"],
      ["building", "Experts by Industry", "Sector-focused professionals", "/professionals/industry-and-subject-matter-experts"],
      ["checklist", "Experts by Service", "Match expertise to your needs", "/professionals/experts-by-service"],
      ["globe", "Experts by Jurisdiction", "India and international experience", "/professionals/experts-by-jurisdiction"],
      ["file", "Insights by Professional", "Articles, publications and thought leadership", "/professionals/insights-by-professional"],
    ],
  },
  {
    title: "Global & Collaboration",
    links: [
      ["globe", "International Professionals & Network", "Our global relationships", "/professionals/international-network"],
      ["document", "Governance & Secretarial Professionals", "Corporate governance and compliance", "/professionals/governance-secretarial"],
      ["handshake", "Professional Collaboration", "Strategic partnerships with firms and professionals", "/professionals/professional-collaboration"],
      ["people", "Join Our Professional Network", "Be a part of our growing network", "/professionals/join-our-professional-network"],
      ["pin", "Professionals by Location / Jurisdiction", "Find professionals in India and globally", "/global-presence"],
    ],
  },
  {
    title: "Find a Professional",
    links: [
      ["search", "Search Professionals", "Find by expertise, service, industry, location and more", "/professionals#leadership"],
      ["checklist", "Advanced Search", "Refine your search with multiple filters", "/professionals/corporate-advisory"],
      ["pin", "Professionals by Location", "India and international jurisdictions", "/global-presence"],
      ["message", "Request an Introduction", "Let us connect you with the right expert", "/professionals/enquiry"],
    ],
  },
] as const;

export default function ProfessionalsMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const pathname = usePathname();

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.columns}>
      {columns.map(column => <section className={styles.column} key={column.title} aria-label={column.title}>
        <div className={styles.links}>{column.links.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}>
          <Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span><span className={styles.chevron} aria-hidden="true">›</span>
        </Link>)}</div>
        {column.title === "Find a Professional" && <div className={styles.columnFooter}>
          <Link className={styles.columnCard} href="/professionals/collaborate-with-us" onClick={onNavigate}><Icon name="people" /><span><strong>Collaborate With Us</strong><small>Explore opportunities to work together</small></span><Icon name="arrow" /></Link>
        </div>}
      </section>)}
    </div>
    <aside className={styles.feature} aria-label="Meet our professionals">
      <div className={styles.featureImage}><Image src="/Professional & Business Services .png" alt="Professionals collaborating across a global network" fill sizes="(max-width: 1050px) 100vw, 270px" /></div>
      <div className={styles.featureCopy}><span className={styles.featureEyebrow}>ASTRONIS GLOBAL</span><h2>People.<br />Perspective.<br />Progress.</h2><span className={styles.rule} /><p>Legal knowledge, regulatory insight and business understanding, brought together for your goals.</p><Link className={styles.primaryAction} href="/professionals" onClick={onNavigate}>Meet Our Professionals <Icon name="arrow" /></Link></div>
    </aside>
  </div>;
}
