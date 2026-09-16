import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import AboutResources from "./about-resources";
import styles from "./international-network.module.css";

const strengths = [
  ["globe", "International Network", "Connected expertise across key global markets."],
  ["people", "Cross-Border Support", "Legal, regulatory and business perspectives."],
  ["building", "Market Entry Guidance", "Local insight. Practical direction."],
  ["chart", "Global Opportunities", "Helping businesses grow internationally."],
  ["shield", "Long-Term Partnerships", "Built on trust and shared ambition."],
];
const services = [
  { title: "Market Entry & Expansion", text: "Strategy, business structuring and regulatory support for your next market.", image: "/Real Estate & Construction .png", icon: "building" },
  { title: "Cross-Border Transactions", text: "Coordinated legal and commercial advice for international transactions.", image: "/Part-14 .png", icon: "document" },
  { title: "Regulatory & Compliance", text: "Navigate jurisdiction-specific obligations with informed local guidance.", image: "/explore_services.png", icon: "shield" },
  { title: "International Trade & Investment", text: "Support for foreign investment, joint ventures and strategic alliances.", image: "/Logistics, Transportation & Warehousing .png", icon: "globe" },
  { title: "Dispute Prevention & Resolution", text: "Cross-border advisory and coordination to protect your business interests.", image: "/Part-10 .png", icon: "scale" },
  { title: "Ongoing Advisory Support", text: "A continuing relationship as your business and international priorities evolve.", image: "/Part-9 .png", icon: "people" },
];
const advantages = [
  ["globe", "Access to Trusted Partners", "Connections with legal and advisory professionals across markets."],
  ["bulb", "Local Expertise", "On-ground knowledge of laws, regulations and market practices."],
  ["document", "Coordinated Solutions", "Connected advice across disciplines and jurisdictions."],
  ["shield", "Quality & Credibility", "A shared commitment to professional standards and integrity."],
  ["people", "Client-Centric Approach", "Advice aligned with your priorities and business goals."],
  ["chart", "Sustainable Growth", "A long-term perspective on international expansion."],
];
const regions = ["North America", "Europe", "Middle East", "Asia Pacific", "Africa", "Latin America"];

export default function InternationalNetwork() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/Part-9 .png" alt="Connected world map, globe and international business skyline" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/about">About Us</Link><span>/</span><span aria-current="page">Global Perspective &amp; International Network</span></nav>
        <div className={styles.heroLayout}><div className={styles.heroCopy}><span className={styles.eyebrow}>GLOBAL PERSPECTIVE &amp; INTERNATIONAL NETWORK</span><h1>Borderless Thinking.<br />Broader Possibilities.</h1><span className={styles.rule} /><p>Connecting international perspective with local expertise. We work with a network of law firms, advisory practices and consultants to help you navigate opportunities across borders with confidence.</p><Link className={styles.button} href="#global-network">Explore Our Global Network <Icon name="arrow" /></Link></div><aside className={styles.heroNote}>Local insight.<br />Global reach.<br />Lasting impact.<small>Connecting businesses<br />to possibilities<br />beyond borders.</small></aside></div>
      </div>
    </section>

    <section className={`container ${styles.strengths}`} aria-label="Our global capabilities">{strengths.map(([icon, title, text]) => <article key={title}><span className={styles.icon}><Icon name={icon} /></span><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className={styles.networkSection} id="global-network" aria-labelledby="network-title"><div className={`container ${styles.networkLayout}`}><div className={styles.networkCopy}><span className={styles.eyebrow}>A CONNECTED PERSPECTIVE</span><h2 id="network-title">A Global Mindset.<br />A Local Advantage.</h2><span className={styles.rule} /><p>International business calls for more than a single perspective. Our network combines global understanding with local knowledge to deliver practical, commercially relevant support across jurisdictions.</p><Link className={`${styles.button} ${styles.blue}`} href="/global-presence#countries">Explore Country Desks <Icon name="arrow" /></Link></div><div className={styles.networkVisual}><Image src="/Part-9 .png" alt="Illustration of a connected global advisory network" fill sizes="(max-width: 800px) 100vw, 50vw" /><div className={styles.visualLabel}><span className={styles.liveDot} />CONNECTED ACROSS BORDERS</div><div className={styles.visualCaption}><Icon name="globe" /><span>Many markets.<br /><strong>One coordinated approach.</strong></span></div></div><aside className={styles.regions}><span className={styles.eyebrow}>INTERNATIONAL OUTLOOK</span><h3>Key Regions</h3><ul>{regions.map((region, index) => <li key={region}><span>0{index + 1}</span>{region}</li>)}</ul><p>Local understanding to inform your global ambitions.</p></aside></div></section>

    <section className={`container ${styles.services}`} aria-labelledby="services-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>HOW WE SUPPORT YOUR GLOBAL JOURNEY</span><h2 id="services-title">International Advisory Services</h2></div><p>From your first international step<br />to your next phase of growth.</p></div><div className={styles.serviceGrid}>{services.map((service, index) => <Link href="/contact" className={styles.serviceCard} key={service.title}><div className={styles.cardImage}><Image src={service.image} alt="" fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className={styles.cardNumber}>0{index + 1}</span><span className={styles.cardIcon}><Icon name={service.icon} /></span></div><div className={styles.cardBody}><h3>{service.title}</h3><p>{service.text}</p><span className={styles.cardAction}>Discuss your global plans <Icon name="arrow" /></span></div></Link>)}</div></section>

    <section className={styles.advantageSection} aria-labelledby="advantage-title"><div className={`container ${styles.advantageLayout}`}><div className={styles.advantageIntro}><span className={styles.eyebrow}>THE POWER OF COLLABORATION</span><Icon name="globe" /><h2 id="advantage-title">Our International<br />Network Advantage</h2><p>We collaborate with legal, accounting and consulting professionals to bring the right perspectives together for your business.</p><Link href="/contact" className={styles.lightLink}>Connect with our team <Icon name="arrow" /></Link></div><div className={styles.advantageGrid}>{advantages.map(([icon, title, text]) => <article key={title}><span className={styles.icon}><Icon name={icon} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className={`container ${styles.explore}`} aria-label="International insights and partnerships"><Link href="/insights"><span className={styles.eyebrow}>KNOWLEDGE WITHOUT BORDERS</span><h2>Featured Insights <Icon name="arrow" /></h2><p>Explore business perspectives, regulatory developments and market insights.</p></Link><Link href="/success-stories"><span className={styles.eyebrow}>EXPERIENCE IN ACTION</span><h2>Our Success Stories <Icon name="arrow" /></h2><p>Discover how integrated advice supports business challenges and opportunities.</p></Link><Link href="/contact"><span className={styles.eyebrow}>GROW OUR CONNECTIONS</span><h2>Partner With Us <Icon name="arrow" /></h2><p>Start a conversation about professional collaboration and referral opportunities.</p></Link></section>
    <AboutResources />
    <section className={styles.cta}><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>READY TO EXPAND GLOBALLY?</span><h2>Let’s Explore Opportunities Together.</h2><p>Connect with our team to discuss your international business objectives.</p></div><div className={styles.ctaActions}><Link href="/contact" className={styles.button}>Speak to an Advisor <Icon name="arrow" /></Link><Link href="/contact#enquiry-form" className={`${styles.button} ${styles.outline}`}>Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
