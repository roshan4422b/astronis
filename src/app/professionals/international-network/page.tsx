import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import styles from "./international-network.module.css";

export const metadata = {
  title: "International Professionals & Network",
  description: "Explore Astronis Global's country desks and cross-border professional collaboration.",
};

const principles = [
  ["globe", "30+", "Countries in network"], ["people", "Connected", "Professional perspectives"],
  ["handshake", "Cross-border", "Advisory support"], ["shield", "Local insight", "Global reach"],
] as const;
const regions = [
  ["North America", "United States", "usa"], ["Europe", "United Kingdom · European Union", "uk"],
  ["Middle East", "United Arab Emirates", "uae"], ["Asia Pacific", "Singapore", "singapore"],
] as const;
const desks = [
  ["India", "South Asia", "IN", "india"], ["United Arab Emirates", "Middle East", "AE", "uae"],
  ["Singapore", "Asia Pacific", "SG", "singapore"], ["United Kingdom", "Europe", "UK", "uk"],
  ["United States", "North America", "US", "usa"], ["European Union", "Europe", "EU", "eu"],
  ["Middle East", "Regional perspective", "ME", "middle-east"],
] as const;
const support = [
  ["globe", "Market Entry Support", "Plan legal and regulatory priorities for a new market."],
  ["document", "Cross-Border Transactions", "Connect commercial and regulatory considerations."],
  ["people", "Local Counsel Coordination", "Bring relevant local insight into a matter."],
  ["shield", "Regulatory Perspective", "Identify requirements that differ between markets."],
  ["handshake", "Professional Introductions", "Start a conversation around shared client needs."],
  ["bulb", "Knowledge Sharing", "Exchange perspective on changing business issues."],
] as const;
const sectors = [
  ["Manufacturing & Industrial", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Technology & Digital Services", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Healthcare & Life Sciences", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Real Estate & Infrastructure", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Banking & Financial Services", "financial-services", "/Banking & Financial Services .png"],
  ["Energy & Resources", "renewable-energy", "/Banner-Energy, Power & Renewables .png"],
] as const;

export default function InternationalNetwork() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="network-title"><Image src="/international-network-hero.png" alt="" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">International Professionals & Network</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>International Professionals & Network</span><h1 id="network-title">Global Connections.<br />Local Solutions.</h1><p>Through international professional relationships, we connect businesses with legal, regulatory and commercial perspectives across markets.</p><div className={styles.heroActions}><a href="#desks" className={styles.button}>Our International Network <Icon name="arrow" /></a><Link href="/global-presence" className={styles.outlineButton}>Explore Global Opportunities <Icon name="arrow" /></Link></div></div><a className={styles.heroNote} href="#regions"><Icon name="globe" /><span>People<br />Ideas<br />Markets<br />Opportunities</span><small>Explore regions <Icon name="arrow" /></small></a></div></section>
    <main>
      <section className={`container ${styles.principles}`} aria-label="Our international approach">{principles.map(([icon,title,description])=><div key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span></div>)}</section>
      <section className={`container ${styles.overview}`} aria-labelledby="overview-title"><div><span className={styles.eyebrow}>Our international network</span><h2 id="overview-title">A Truly Global Perspective</h2><p>We connect international perspective with local knowledge so clients can assess opportunities, obligations and risk in context.</p><Link href="/global-presence" className={styles.textLink}>Explore Our Global Presence <Icon name="arrow" /></Link></div><div className={styles.mapVisual}><Image src="/Part-9 .png" alt="Illustration of connected global markets" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></section>
      <section id="regions" className={`container ${styles.regionsSection}`} aria-labelledby="regions-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Across markets</span><h2 id="regions-title">Key Regions</h2></div><Link href="/global-presence">View All Country Desks <Icon name="arrow" /></Link></div><div className={styles.regionsGrid}>{regions.map(([title,description,slug],index)=><Link href={`/global-presence/${slug}`} key={title}><span className={`${styles.regionPhoto} ${styles[`region${index}`]}`} aria-hidden="true" /><span className={styles.regionBody}><strong>{title}</strong><small>{description}</small></span></Link>)}</div></section>
      <section id="desks" className={`container ${styles.desksSection}`} aria-labelledby="desks-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Country & regional desks</span><h2 id="desks-title">Explore Our Published Desks</h2></div><Link href="/global-presence">View Global Presence <Icon name="arrow" /></Link></div><div className={styles.desksGrid}>{desks.map(([name,region,code,slug])=><Link href={`/global-presence/${slug}`} key={slug}><span className={styles.deskCode}>{code}</span><span className={styles.deskRegion}>{region}</span><h3>{name}</h3><span className={styles.deskLink}>Explore Desk <Icon name="arrow" /></span></Link>)}</div></section>
      <section className={styles.collaborationBand}><div className={`container ${styles.collaborationGrid}`}><div><span className={styles.eyebrow}>Connected work</span><h2>One Objective. Joined-Up Perspective.</h2><p>For matters involving multiple markets, we start with the business objective, clarify the roles needed and coordinate advice around practical decisions.</p><Link href="/professionals/enquiry" className={styles.button}>Discuss Your Requirements <Icon name="arrow" /></Link></div><div className={styles.collaborationSteps}>{[["01","Understand","Define the business need and relevant markets."],["02","Connect","Identify the expertise and local perspective required."],["03","Coordinate","Align responsibilities, timing and next steps."]].map(([number,title,body])=><div key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></div>)}</div></div></section>
      <section className={`container ${styles.supportSection}`} aria-labelledby="support-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>How we add value</span><h2 id="support-title">Cross-Border Support</h2></div><Link href="/services">Explore Services <Icon name="arrow" /></Link></div><div className={styles.supportGrid}>{support.map(([icon,title,body])=><article key={title}><span><Icon name={icon} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className={`container ${styles.sectorsSection}`} aria-labelledby="sectors-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Sector understanding</span><h2 id="sectors-title">Industries We Support Globally</h2></div><Link href="/industries">View All Industries <Icon name="arrow" /></Link></div><div className={styles.sectorsGrid}>{sectors.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>
      <section className={styles.cta}><div className="container"><div><span className={styles.eyebrow}>Connect across borders</span><h2>Let’s Take Your Business Further Together.</h2><p>Connect with our team for cross-border opportunities and trusted support.</p></div><div><Link className={styles.outlineButton} href="/professionals/enquiry">Discuss Your Requirements <Icon name="arrow" /></Link><Link className={styles.button} href="/professionals/partner-with-us">Professional Collaboration <Icon name="arrow" /></Link></div></div></section>
    </main>
  </div>;
}
