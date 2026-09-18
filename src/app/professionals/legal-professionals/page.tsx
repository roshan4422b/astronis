import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import LegalDirectory from "./legal-directory";
import styles from "./legal-professionals.module.css";

export const metadata = {
  title: "Legal Professionals",
  description: "Meet Astronis Global's published legal professional profiles and explore litigation, dispute resolution and advisory expertise.",
};

const practices = [
  ["scale", "Civil Litigation", "Claims, appeals & execution", "/services/litigation-and-dispute-resolution"],
  ["people", "Commercial Disputes", "Contracts & business disputes", "/services/litigation-and-dispute-resolution"],
  ["file", "Arbitration & Conciliation", "Domestic & international", "/services/arbitration-and-conciliation"],
  ["building", "Tribunal Matters", "NCLT, NCLAT & DRT", "/services/nclt-and-nclat-advisory"],
  ["shield", "Criminal Law", "Trial, appeals & special laws", "/services/litigation-and-dispute-resolution"],
  ["document", "NI Act Matters", "Cheque dishonour proceedings", "/services/litigation-and-dispute-resolution"],
  ["people", "Family & Matrimonial", "Family disputes & personal law", "/services/litigation-and-dispute-resolution"],
  ["scale", "Consumer Disputes", "Consumer forums & appeals", "/services/litigation-and-dispute-resolution"],
] as const;

const expertise = [
  ["Commercial", "building"], ["Arbitration", "scale"], ["NCLT / NCLAT", "file"],
  ["MSME Disputes", "chart"], ["RERA", "building"], ["NI Act", "document"],
  ["Civil Matters", "shield"], ["Consumer Disputes", "people"],
] as const;

const industries = [
  ["Banking & Financial Services", "financial-services", "/Banking & Financial Services .png"],
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Healthcare & Life Sciences", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Startups & Emerging Businesses", "startups", "/Startups & Emerging Businesses .png"],
  ["Infrastructure & Energy", "infrastructure", "/Infrastructure & Projects .png"],
  ["E-commerce & Consumer", "e-commerce", "/Retail & E-Commerce .png"],
] as const;

export default function LegalProfessionalsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="legal-title"><Image src="/legal-professionals-hero.png" alt="" fill preload sizes="100vw" className={styles.heroImage} /><div className={styles.heroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Legal Professionals</span></nav><div className={styles.heroCopy}><h1 id="legal-title">Legal Professionals</h1><p className={styles.heroTagline}>Trusted Advocacy. Practical Solutions.</p><p>A dedicated team delivering strategic, effective and result-oriented solutions across legal advisory and dispute resolution.</p><div className={styles.heroActions}><a className={styles.button} href="#find">Find a Legal Professional <Icon name="arrow" /></a><a className={styles.outlineButton} href="#practice-areas">Explore Our Legal Expertise</a></div></div><a className={styles.heroWords} href="#practice-areas"><Icon name="scale" /><span>Rights<br />Remedies<br />Results</span><span className={styles.heroWordsLink}>Explore legal expertise <Icon name="arrow" /></span></a></div></section>

    <div className={styles.wrap}><LegalDirectory />
      <section className={styles.practiceSection} id="practice-areas" aria-labelledby="practice-title"><div className={styles.sectionHeading}><span className={styles.kicker} id="practice-title">Our Legal Practice Areas</span><Link href="/services">View All Legal Practices <Icon name="arrow" /></Link></div><div className={styles.practiceGrid}>{practices.map(([icon,title,caption,href]) => <Link href={href} key={title}><Icon name={icon} /><strong>{title}</strong><small>{caption}</small></Link>)}</div></section>

      <section className={styles.panels} aria-label="Legal advisory capabilities"><article><h2>Courts, Tribunals & Forums</h2><div className={styles.panelBody}><Icon name="building" /><ul><li>Supreme Court of India</li><li>High Courts</li><li>District & Sessions Courts</li><li>NCLT / NCLAT</li><li>DRT / DRAT</li><li>Consumer Forums</li></ul></div></article><article className={styles.darkPanel}><h2>Strategic Litigation.<br />Measured Approach.<br /><span>Better Outcomes.</span></h2><Icon name="scale" /></article><article><h2>Alternative Dispute Resolution</h2><div className={styles.panelBody}><Icon name="handshake" /><ul><li>Arbitration</li><li>Conciliation</li><li>Mediation</li><li>Settlement advisory</li></ul></div><Link href="/services/arbitration-and-conciliation">Explore ADR Expertise <Icon name="arrow" /></Link></article></section>

      <div className={styles.exploreGrid}><section aria-labelledby="expertise-title"><div className={styles.sectionHeading}><h2 id="expertise-title">Find Professionals by Expertise</h2><Link href="/services">View All <Icon name="arrow" /></Link></div><div className={styles.expertiseGrid}>{expertise.map(([title,icon]) => <Link href="/services" key={title}><Icon name={icon} />{title}</Link>)}</div></section><section aria-labelledby="industries-title"><div className={styles.sectionHeading}><h2 id="industries-title">Find Professionals by Industry</h2><Link href="/industries">View All <Icon name="arrow" /></Link></div><div className={styles.industryGrid}>{industries.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 14vw" /></span><strong>{title}</strong></Link>)}</div></section></div>

      <section className={styles.supportGrid} aria-label="Our reach and standards"><article><h2>Legal Reach Across India</h2><Icon name="india" /><p>Connect with our team about legal and regulatory requirements across India.</p><Link href="/global-presence">Explore Our India Reach <Icon name="arrow" /></Link></article><article><h2>Cross-Border Legal Support</h2><Icon name="globe" /><p>Work with our international professional network on cross-border questions.</p><Link href="/professionals/international-network">Explore Global Network <Icon name="arrow" /></Link></article><article><h2>Our Professional Standards</h2><div className={styles.standards}>{["Integrity", "Independence", "Confidentiality", "Accountability", "Client-Centric", "Professional Excellence"].map((item) => <span key={item}><Icon name="shield" />{item}</span>)}</div></article></section>

      <section className={styles.insights} aria-labelledby="insights-title"><div className={styles.sectionHeading}><h2 id="insights-title">Insights from Our Legal Professionals</h2><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div><div className={styles.insightGrid}><Link href="/insights"><span>LEGAL PERSPECTIVE</span><h3>Practical perspectives on a changing legal landscape</h3><small>Explore articles, updates and thought leadership.</small></Link><Link href="/professionals/partner-with-us"><span>COLLABORATION</span><h3>Collaborate With Us</h3><small>Connect with advocates, law firms and professionals across India and globally.</small></Link><Link href="/professionals/enquiry"><span>YOUR NEXT STEP</span><h3>Speak to Our Team</h3><small>Tell us about the matter and the expertise you need.</small></Link></div></section>
    </div>
    <section className={styles.cta}><div className={styles.wrap}><div><h2>Require Legal Expertise?</h2><p>Speak with our legal professionals for a confidential discussion.</p><div><a href="#find">Find a Legal Professional <Icon name="arrow" /></a><Link href="/professionals/enquiry">Speak to an Advisor <Icon name="arrow" /></Link><Link href="/professionals/enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div><span>Law<br />Strategy<br />Solutions</span></div></section>
  </div>;
}
