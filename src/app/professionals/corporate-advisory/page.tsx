import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { professionals } from "../leadership";
import ProfessionalDirectory from "./professional-directory";
import styles from "./corporate-advisory.module.css";

export const metadata = {
  title: "Corporate & Regulatory Professionals",
  description: "Meet the Astronis Global professionals supporting corporate, regulatory and business advisory matters.",
};

const expertise = [
  ["building", "Corporate advisory"], ["shield", "Regulatory compliance"],
  ["people", "Company formation & structuring"], ["globe", "FEMA / FDI / ECB"],
  ["building", "Banking & NBFC regulation"], ["file", "Licensing & approvals"],
  ["handshake", "M&A and transactions"], ["shield", "Corporate governance"],
  ["chart", "RBI / SEBI / IBBI advisory"],
];
const sectors = [
  ["Banking & financial services", "financial-services", "/Banking & Financial Services .png"],
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Healthcare & pharma", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Real estate & construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Startups", "startups", "/Startups & Emerging Businesses .png"],
];
const regulators = [
  ["building", "MCA", "Registrar of Companies"], ["chart", "RBI", "Reserve Bank of India"],
  ["shield", "SEBI", "Securities and Exchange Board of India"], ["file", "IBBI", "Insolvency and Bankruptcy Board of India"],
  ["people", "CCI", "Competition Commission of India"], ["document", "DGFT", "Directorate General of Foreign Trade"],
  ["globe", "CBIC", "Central Board of Indirect Taxes & Customs"], ["scale", "FSSAI", "Food Safety and Standards Authority of India"],
] as const;

export default function CorporateAdvisoryProfessionals() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="corporate-title"><Image src="/corporate-regulatory-hero.png" alt="" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}><span className={styles.eyebrow}>Corporate & regulatory professionals</span><h1 id="corporate-title">Navigate Regulation.<br />Enable Growth.</h1><p>Our corporate and regulatory professionals advise businesses on complex legal, regulatory and compliance matters with a practical, solution-oriented approach.</p><div className={styles.heroActions}><a href="#find" className={styles.button}>Find a Professional <Icon name="arrow" /></a><Link href="/services/corporate-advisory" className={styles.outlineButton}>Our Corporate Advisory Services</Link></div><a className={styles.heroNote} href="#expertise-title"><Icon name="shield" /><span>Compliance<br />Structure<br />Strategy<br />Opportunity</span><small>Explore our expertise <Icon name="arrow" /></small></a></div></section>
    <main>
      <section id="find" className={`container ${styles.directorySection}`} aria-labelledby="find-title"><div className={styles.directoryIntro}><span className={styles.eyebrow}>Find the right perspective</span><h2 id="find-title">Find a corporate & regulatory professional</h2><p>Search our published profiles by name or area of expertise.</p></div><ProfessionalDirectory people={professionals} /></section>
      <section className={`container ${styles.expertiseSection}`} aria-labelledby="expertise-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our corporate & regulatory expertise</span><h2 id="expertise-title">Connected expertise for confident decisions</h2></div><Link href="/services">View all services <Icon name="arrow" /></Link></div><div className={styles.expertiseGrid}>{expertise.map(([icon,title])=><Link href="/services/corporate-advisory" key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div></section>
      <section className={styles.advisoryBand}><div className={`container ${styles.advisoryGrid}`}><div className={styles.advisoryImage}><Image src="/Professional & Business Services .png" alt="Professional collaboration across markets" fill sizes="(max-width: 700px) 100vw, 40vw" /></div><div><span className={styles.eyebrow}>Compliance today. A stronger tomorrow.</span><h2>Clear advice for complex decisions.</h2><p>Our professionals work together across corporate structuring, regulatory obligations, commercial contracts and risk management.</p><Link href="/services/corporate-advisory" className={styles.button}>Explore our approach <Icon name="arrow" /></Link></div></div></section>
      <section className={`container ${styles.regulatorsSection}`} aria-labelledby="regulators-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2 id="regulators-title">Key Regulators & Authorities</h2></div><Link href="/services/regulatory-and-compliance">Explore regulatory services <Icon name="arrow" /></Link></div><div className={styles.regulatorsGrid}>{regulators.map(([icon,shortName,name])=><article key={shortName}><Icon name={icon} /><h3>{shortName}</h3><p>{name}</p></article>)}</div></section>
      <section className={`container ${styles.sectorsSection}`} aria-labelledby="sectors-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Sector perspective</span><h2 id="sectors-title">Industries we serve</h2></div><Link href="/industries">View all industries <Icon name="arrow" /></Link></div><div className={styles.sectorsGrid}>{sectors.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>
      <section className={`container ${styles.globalSection}`} aria-labelledby="global-title"><div><Icon name="globe" /><span className={styles.eyebrow}>Borderless perspective</span><h2 id="global-title">Cross-Border Regulatory Support</h2><p>Work with our professional network on foreign investment, international regulatory frameworks and cross-border structuring.</p><div><Link href="/professionals/international-network">Explore Global Perspective <Icon name="arrow" /></Link><Link href="/global-presence">India Entry Support <Icon name="arrow" /></Link></div></div></section>
      <section className={styles.standards}><div className={`container ${styles.standardsInner}`}><div><span className={styles.eyebrow}>How we work</span><h2>Professional standards, practical perspective.</h2><p>We combine careful analysis with advice that fits the commercial realities of each matter.</p></div><ul>{["Integrity & independence","Confidentiality","Regulatory accuracy","Client-focused advice","Collaboration","Continuous learning"].map(item=><li key={item}><Icon name="shield" />{item}</li>)}</ul></div></section>
      <section className={`container ${styles.insightsSection}`} aria-labelledby="insights-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Ideas and updates</span><h2 id="insights-title">Insights & Updates</h2></div><Link href="/insights">View all insights <Icon name="arrow" /></Link></div><div className={styles.insightsGrid}><Link href="/insights"><span>REGULATORY UPDATE</span><h3>Follow the developments shaping business compliance.</h3><small>Articles, notifications and practical perspectives</small></Link><Link href="/insights"><span>CORPORATE ADVISORY</span><h3>Plan structures and transactions with greater clarity.</h3><small>Ideas for growing businesses and leadership teams</small></Link><Link href="/professionals/enquiry"><span>CONNECT WITH US</span><h3>Discuss a corporate or regulatory question.</h3><small>Find the right professional for your requirements</small></Link></div></section>
      <section className={styles.cta}><div className="container"><div><span className={styles.eyebrow}>Connect with our team</span><h2>Looking for corporate or regulatory expertise?</h2><p>Tell us about your business, regulatory or compliance requirements.</p></div><div><a href="#find" className={styles.outlineButton}>Find a professional <Icon name="arrow" /></a><Link href="/professionals/enquiry" className={styles.button}>Submit an enquiry <Icon name="arrow" /></Link></div></div></section>
    </main>
  </div>;
}
