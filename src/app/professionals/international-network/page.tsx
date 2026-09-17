import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import styles from "./international-network.module.css";

export const metadata = {
  title: "International Professionals & Network",
  description: "Explore Astronis Global's country and regional desks and its approach to cross-border professional collaboration.",
};

const principles = [
  ["globe", "Cross-border perspective"], ["people", "Professional collaboration"],
  ["shield", "Local context"], ["chart", "Business opportunities"],
];
const desks = [
  ["India", "India", "IN", "india"], ["United Arab Emirates", "Middle East", "AE", "uae"],
  ["Singapore", "Asia Pacific", "SG", "singapore"], ["United Kingdom", "Europe", "UK", "uk"],
  ["United States", "North America", "US", "usa"], ["European Union", "Europe", "EU", "eu"],
  ["Middle East", "Regional perspective", "ME", "middle-east"],
];
const support = [
  ["globe", "Market entry", "Structure a practical path into a new jurisdiction."],
  ["document", "Cross-border transactions", "Connect commercial and regulatory considerations."],
  ["people", "Local counsel coordination", "Bring relevant local insight into the matter."],
  ["shield", "Regulatory perspective", "Identify requirements that may differ by market."],
  ["handshake", "Professional introductions", "Start a conversation around shared client needs."],
  ["bulb", "Knowledge exchange", "Share perspective on changing business issues."],
];
const sectors = [
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Healthcare & pharma", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Real estate & projects", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Banking & finance", "financial-services", "/Banking & Financial Services .png"],
  ["Retail & consumer", "retail-and-consumer", "/Retail & E-Commerce .png"],
];

export default function InternationalNetwork() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="network-title"><Image src="/PR2 Banner .png" alt="Professionals discussing international business opportunities" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">International Network</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>International professionals & network</span><h1 id="network-title">Global connections.<br />Local solutions.</h1><p>Connected professional perspectives help businesses approach legal, regulatory and commercial questions across borders with clarity.</p><div className={styles.heroActions}><a href="#desks" className={styles.button}>Explore our network <Icon name="arrow" /></a><Link href="/professionals/enquiry" className={styles.outlineButton}>Discuss your requirements <Icon name="arrow" /></Link></div></div></div></section>
    <main>
      <section className={`container ${styles.principles}`} aria-label="Our international approach">{principles.map(([icon,title])=><div key={title}><Icon name={icon} /><strong>{title}</strong></div>)}</section>
      <section className={`container ${styles.overview}`} aria-labelledby="overview-title"><div><span className={styles.eyebrow}>A wider view</span><h2 id="overview-title">International perspective. Practical support.</h2><p>Business decisions often cross legal systems, markets and working cultures. We help connect the right perspectives so clients can assess opportunities, obligations and risk in context.</p><Link href="/global-presence" className={styles.textLink}>Explore global presence <Icon name="arrow" /></Link></div><div className={styles.mapVisual}><Image src="/Part-9 .png" alt="Illustration of connected global markets" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></section>
      <section id="desks" className={`container ${styles.desksSection}`} aria-labelledby="desks-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Country & regional desks</span><h2 id="desks-title">Explore our published desks</h2></div><Link href="/global-presence">View global presence <Icon name="arrow" /></Link></div><div className={styles.desksGrid}>{desks.map(([name,region,code,slug])=><Link href={`/global-presence/${slug}`} key={slug}><span className={styles.deskCode}>{code}</span><span className={styles.deskRegion}>{region}</span><h3>{name}</h3><span className={styles.deskLink}>Explore desk <Icon name="arrow" /></span></Link>)}</div></section>
      <section className={styles.collaborationBand}><div className={`container ${styles.collaborationGrid}`}><div><span className={styles.eyebrow}>Connected work</span><h2>One objective. Joined-up perspective.</h2><p>For matters that touch multiple markets, we start with the business objective, clarify the roles needed and coordinate advice around the practical decisions ahead.</p><Link href="/professionals/partner-with-us" className={styles.button}>Professional collaboration <Icon name="arrow" /></Link></div><div className={styles.collaborationSteps}>{[["01","Understand","Define the business need and relevant markets."],["02","Connect","Identify the expertise and local perspective required."],["03","Coordinate","Align responsibilities, timing and next steps."]].map(([number,title,body])=><div key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></div>)}</div></div></section>
      <section className={`container ${styles.supportSection}`} aria-labelledby="support-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>How we add value</span><h2 id="support-title">Cross-border support</h2></div><Link href="/services">Explore services <Icon name="arrow" /></Link></div><div className={styles.supportGrid}>{support.map(([icon,title,body])=><article key={title}><span><Icon name={icon} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className={`container ${styles.sectorsSection}`} aria-labelledby="sectors-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Sector understanding</span><h2 id="sectors-title">Industries we support</h2></div><Link href="/industries">View all industries <Icon name="arrow" /></Link></div><div className={styles.sectorsGrid}>{sectors.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>
      <section className={styles.cta}><div className="container"><div><span className={styles.eyebrow}>Connect across borders</span><h2>Let's explore what comes next.</h2><p>Share your cross-border business, regulatory or collaboration requirements with our team.</p></div><div><Link className={styles.outlineButton} href="/professionals/partner-with-us">Explore collaboration <Icon name="arrow" /></Link><Link className={styles.button} href="/professionals/enquiry">Submit an enquiry <Icon name="arrow" /></Link></div></div></section>
    </main>
  </div>;
}
