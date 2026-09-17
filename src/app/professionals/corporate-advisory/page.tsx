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
  ["people", "Business structuring"], ["globe", "Cross-border advice"],
  ["file", "Licensing & approvals"], ["chart", "Transactions & growth"],
];
const sectors = [
  ["Banking & financial services", "financial-services", "/Banking & Financial Services .png"],
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Healthcare & pharma", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Real estate & construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Startups", "startups", "/Startups & Emerging Businesses .png"],
];

export default function CorporateAdvisoryProfessionals() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="corporate-title"><Image src="/PR2 Banner .png" alt="Professionals discussing business strategy" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}><span className={styles.eyebrow}>Corporate & regulatory professionals</span><h1 id="corporate-title">Navigate regulation.<br />Enable growth.</h1><p>Meet professionals who bring legal, regulatory and business perspective to complex corporate decisions.</p><div className={styles.heroActions}><a href="#find" className={styles.button}>Find a professional <Icon name="arrow" /></a><Link href="/services/corporate-advisory" className={styles.outlineButton}>Explore corporate advisory</Link></div></div></section>
    <main>
      <section id="find" className={`container ${styles.directorySection}`} aria-labelledby="find-title"><div className={styles.directoryIntro}><span className={styles.eyebrow}>Find the right perspective</span><h2 id="find-title">Find a corporate & regulatory professional</h2><p>Search our published profiles by name or area of expertise.</p></div><ProfessionalDirectory people={professionals} /></section>
      <section className={`container ${styles.expertiseSection}`} aria-labelledby="expertise-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Connected expertise</span><h2 id="expertise-title">Corporate & regulatory support</h2></div><Link href="/services">View all services <Icon name="arrow" /></Link></div><div className={styles.expertiseGrid}>{expertise.map(([icon,title])=><Link href="/services/corporate-advisory" key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div></section>
      <section className={styles.advisoryBand}><div className={`container ${styles.advisoryGrid}`}><div className={styles.advisoryImage}><Image src="/Professional & Business Services .png" alt="Professional collaboration across markets" fill sizes="(max-width: 700px) 100vw, 40vw" /></div><div><span className={styles.eyebrow}>Compliance today. A stronger tomorrow.</span><h2>Clear advice for complex decisions.</h2><p>Our professionals work together across corporate structuring, regulatory obligations, commercial contracts and risk management.</p><Link href="/services/corporate-advisory" className={styles.button}>Explore our approach <Icon name="arrow" /></Link></div></div></section>
      <section className={`container ${styles.sectorsSection}`} aria-labelledby="sectors-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Sector perspective</span><h2 id="sectors-title">Industries we serve</h2></div><Link href="/industries">View all industries <Icon name="arrow" /></Link></div><div className={styles.sectorsGrid}>{sectors.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>
      <section className={styles.standards}><div className={`container ${styles.standardsInner}`}><div><span className={styles.eyebrow}>How we work</span><h2>Professional standards, practical perspective.</h2><p>We combine careful analysis with advice that fits the commercial realities of each matter.</p></div><ul>{["Integrity & independence","Confidentiality","Regulatory accuracy","Client-focused advice","Collaboration","Continuous learning"].map(item=><li key={item}><Icon name="shield" />{item}</li>)}</ul></div></section>
      <section className={styles.cta}><div className="container"><div><span className={styles.eyebrow}>Connect with our team</span><h2>Looking for corporate or regulatory expertise?</h2><p>Tell us about your business, regulatory or compliance requirements.</p></div><div><a href="#find" className={styles.outlineButton}>Find a professional <Icon name="arrow" /></a><Link href="/professionals/enquiry" className={styles.button}>Submit an enquiry <Icon name="arrow" /></Link></div></div></section>
    </main>
  </div>;
}
