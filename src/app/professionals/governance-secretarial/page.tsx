import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { professionals } from "../leadership";
import GovernanceDirectory from "./governance-directory";
import styles from "../advisory-professionals.module.css";

export const metadata = {
  title: "Governance & Secretarial Professionals",
  description: "Explore Astronis Global's corporate governance, secretarial and regulatory advisory capabilities and meet our published professionals.",
};

const expertise = [
  ["building", "Corporate Governance", "/services/risk-governance-and-forensic-advisory"],
  ["file", "Company Law Compliance", "/services/regulatory-and-compliance"],
  ["people", "Board & Committee Support", "/services/corporate-and-commercial-advisory"],
  ["shield", "Secretarial Audit & Due Diligence", "/services/regulatory-and-compliance"],
  ["chart", "RBI, SEBI & Exchange Compliance", "/services/banking-nbfc-and-financial-services-advisory"],
  ["globe", "FEMA, FDI & Cross-Border Matters", "/services/fema-fdi-and-foreign-exchange-advisory"],
  ["handshake", "Insolvency & Restructuring", "/services/nclt-and-nclat-advisory"],
  ["bulb", "ESG & Sustainability Compliance", "/services/esg-and-sustainability-advisory"],
] as const;

const regulators = [
  ["building", "MCA", "Ministry of Corporate Affairs"],
  ["chart", "SEBI", "Securities and Exchange Board of India"],
  ["shield", "RBI", "Reserve Bank of India"],
  ["building", "Stock Exchanges", "Listing and disclosure requirements"],
  ["people", "CCI", "Competition Commission of India"],
  ["file", "IBBI", "Insolvency and Bankruptcy Board of India"],
  ["shield", "FSSAI", "Food Safety and Standards Authority of India"],
  ["globe", "Other Authorities", "Sectoral and statutory regulators"],
] as const;

const industries = [
  ["Banking & Financial Services", "financial-services", "/Banking & Financial Services .png"],
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Healthcare & Life Sciences", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Startups & Emerging Businesses", "startups", "/Startups & Emerging Businesses .png"],
] as const;

export default function GovernanceSecretarialPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="governance-title"><Image src="/governance-secretarial-hero.png" alt="" fill preload sizes="100vw" /><div className={styles.heroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Governance & Secretarial Professionals</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>Governance & Secretarial Professionals</span><h1 id="governance-title">Building Compliant,<br />Resilient and Future-Ready<br />Businesses.</h1><p>Navigate corporate governance, regulatory compliance and statutory responsibilities with practical advice and a clear view of what comes next.</p><div className={styles.heroActions}><a className={styles.primaryButton} href="#find">Find a Professional <Icon name="arrow" /></a><Link className={styles.outlineButton} href="/services/regulatory-and-compliance">Explore Governance Services</Link></div></div><a className={styles.heroNote} href="#expertise"><Icon name="shield" /><span>Good Governance<br />Stronger Businesses</span><small>Explore our expertise <Icon name="arrow" /></small></a></div></section>

    <div className={styles.wrap}><GovernanceDirectory people={professionals} />
      <section className={styles.expertiseSection} id="expertise" aria-labelledby="expertise-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our expertise</span><h2 id="expertise-title">Governance built for confident decisions</h2></div><Link href="/services">View All Services <Icon name="arrow" /></Link></div><div className={styles.expertiseGrid}>{expertise.map(([icon,title,href]) => <Link href={href} key={title}><Icon name={icon} /><strong>{title}</strong></Link>)}</div></section>

      <section className={styles.advisorySection} aria-labelledby="advisory-title"><div className={styles.advisoryImage}><Image src="/governance-secretarial-advisory.png" alt="Boardroom papers being reviewed" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div className={styles.advisoryCopy}><span className={styles.eyebrow}>Clarity in every obligation</span><h2 id="advisory-title">Enabling Better Governance.</h2><p>We help boards and businesses strengthen governance frameworks, respond to evolving requirements and make sound decisions with confidence.</p><Link className={styles.primaryButton} href="/about/our-methodology">Our Approach <Icon name="arrow" /></Link></div></section>

      <section className={styles.audienceSection} aria-labelledby="regulators-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2 id="regulators-title">Key Regulators & Compliance Areas</h2></div></div><div className={styles.audienceGrid}>{regulators.map(([icon,title,description]) => <div key={title}><Icon name={icon} /><span><strong>{title}</strong><br />{description}</span></div>)}</div></section>

      <section className={styles.industriesSection} aria-labelledby="industries-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Sector perspective</span><h2 id="industries-title">Industries We Serve</h2></div><Link href="/industries">View All Industries <Icon name="arrow" /></Link></div><div className={styles.industryGrid}>{industries.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>

      <div className={styles.lowerGrid}><section className={styles.globalCard} aria-labelledby="global-title"><Icon name="globe" /><div><span className={styles.eyebrow}>Connected perspective</span><h2 id="global-title">India & Global Reach</h2><p>Explore governance and compliance support in India, with cross-border perspective available through our international network.</p><Link href="/professionals/international-network">Explore Global Network <Icon name="arrow" /></Link></div></section><section className={styles.standardsCard} aria-labelledby="standards-title"><h2 id="standards-title">Our Professional Standards</h2><div>{["Integrity & independence","Accuracy & diligence","Confidentiality","Regulatory perspective","Client-focused advice","Long-term perspective"].map((item) => <span key={item}><Icon name="shield" />{item}</span>)}</div></section></div>

      <section className={styles.insightsSection} aria-labelledby="insights-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Ideas and updates</span><h2 id="insights-title">Governance Insights & Updates</h2></div><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div><div className={styles.insightsGrid}><Link href="/insights"><span>REGULATORY UPDATES</span><h3>Stay informed as company law requirements evolve.</h3><small>Explore our latest updates</small></Link><Link href="/insights"><span>GOVERNANCE PERSPECTIVE</span><h3>Build stronger oversight and clearer decisions.</h3><small>Read our perspectives</small></Link><Link href="/professionals/enquiry"><span>CONNECT WITH US</span><h3>Discuss a governance question with our team.</h3><small>Start a conversation</small></Link></div></section>
    </div>
    <section className={styles.cta}><div className={styles.wrap}><div><h2>Let’s Strengthen Your Governance Framework</h2><p>Connect with our professionals for a confidential discussion.</p><div><a href="#find">Find a Professional <Icon name="arrow" /></a><Link href="/professionals/enquiry">Speak to an Advisor <Icon name="arrow" /></Link><Link href="/professionals/enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div><span>Compliance<br />Governance<br />Sustainability<br />Growth</span></div></section>
  </div>;
}
