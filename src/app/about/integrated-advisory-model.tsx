import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import AboutResources from "./about-resources";
import styles from "./integrated-advisory-model.module.css";

const disciplines = [
  { title: "Corporate Advisory", icon: "building", strap: "Structure. Transactions. Governance. Growth.", items: ["Company formation & structuring", "Mergers, acquisitions & joint ventures", "Restructuring & corporate actions", "Governance and corporate compliance", "NCLT, DRT, MSME & RERA matters"] },
  { title: "Regulatory Services", icon: "document", strap: "Compliance. Approvals. Sustained operations.", items: ["FEMA, FDI & foreign exchange", "RBI, SEBI, IRDAI, PFRDA & IFSCA", "GST, Customs & DGFT", "Sectoral licences & regulatory approvals", "Ongoing compliance and advisory"] },
  { title: "Legal & Litigation", icon: "scale", strap: "Protection. Resolution. Enforcement.", items: ["Civil & commercial litigation", "Arbitration & alternative dispute resolution", "Regulatory and tribunal representation", "Intellectual property enforcement", "Company law, banking & specialised disputes"] },
  { title: "Business Advisory", icon: "chart", strap: "Strategy. Investment. Expansion.", items: ["Market entry & business strategy", "Startup and investment advisory", "Financial services & NBFC support", "Commercial contracts & risk advisory", "ESG, sustainability & cross-border support"] },
];
const process = [
  { title: "Understand", icon: "search", text: "Your goals, business context and priorities." },
  { title: "Assess", icon: "file", text: "Legal, regulatory, commercial and operational issues." },
  { title: "Structure", icon: "building", text: "Practical solutions designed around your business." },
  { title: "Advise", icon: "people", text: "Clear, integrated recommendations for the way forward." },
  { title: "Implement", icon: "chart", text: "Support with execution, filings and transactions." },
  { title: "Monitor", icon: "shield", text: "Track compliance, change and emerging risks." },
  { title: "Support", icon: "globe", text: "Ongoing advice and a long-term partnership." },
];
const lifecycle = [
  ["Establish", "Incorporation & setup"], ["Structure", "Legal & tax structuring"], ["Fund", "Investment & financing"],
  ["Operate", "Day-to-day operations"], ["Comply", "Regulatory compliance"], ["Protect", "IP, contracts & risk"],
  ["Resolve", "Dispute management"], ["Restructure", "Turnaround & growth"], ["Expand", "India & global expansion"],
];
const scenarios = [
  { title: "Foreign Investor Entering India", image: "/explore_services.png", text: "Entity structuring, FDI, regulatory approvals and contracts.", tag: "MARKET ENTRY" },
  { title: "Growing Indian Business", image: "/Professional & Business Services .png", text: "Compliance, expansion, funding and sound governance.", tag: "BUSINESS GROWTH" },
  { title: "Regulatory Challenge", image: "/Part-14 .png", text: "Strategic advice and representation in complex regulatory matters.", tag: "REGULATORY INSIGHT" },
  { title: "Startup to Scale", image: "/Startups & Emerging Businesses .png", text: "Business structuring, investment readiness and market entry support.", tag: "ENTREPRENEURSHIP" },
  { title: "Cross-Border Expansion", image: "/Logistics, Transportation & Warehousing .png", text: "International structuring and coordinated legal support.", tag: "GLOBAL OPPORTUNITY" },
  { title: "Dispute Resolution", image: "/Part-14 .png", text: "Focused representation, clear strategy and practical outcomes.", tag: "PROTECTION & RESOLUTION" },
];

export default function IntegratedAdvisoryModel() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image className={styles.heroImage} src="/explore_services.png" alt="Blue architectural panels representing connected global advisory disciplines" fill priority sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/about">About Us</Link><span>/</span><span aria-current="page">Our Integrated Advisory Model</span></nav>
        <div className={styles.heroLayout}><div className={styles.heroCopy}>
          <span className={styles.eyebrow}>OUR INTEGRATED ADVISORY MODEL</span>
          <h1>Different Disciplines.<br />A Unified Approach.</h1>
          <span className={styles.rule} />
          <p>Legal expertise, regulatory insight and commercial understanding. One integrated platform to help your business move forward with confidence.</p>
          <Link className={styles.button} href="#advisory-model">Explore Our Approach <Icon name="arrow" /></Link>
        </div><div className={styles.heroNote}><span>Law.<br />Regulation.<br />Business.<br />People.<br />Progress.</span><small>Different perspectives.<br />One shared purpose.</small></div></div>
      </div>
    </section>

    <section className={`container ${styles.modelSection}`} id="advisory-model" aria-labelledby="model-title">
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>ONE PLATFORM. MULTIPLE CAPABILITIES.</span><h2 id="model-title">Our Integrated<br />Advisory Model</h2></div><div><p>Four core advisory disciplines. One connected team. We bring together corporate, regulatory, legal and business insight to deliver practical solutions across your business lifecycle.</p><Link className={styles.textLink} href="/about/about-astronis-global">Discover Astronis Global <Icon name="arrow" /></Link></div></div>
      <div className={styles.modelGrid}>
        <div className={styles.hub}><div className={styles.orbit} aria-hidden="true" /><div className={styles.hubCore}><Icon name="globe" /><span className={styles.hubBrand}>ASTRONIS<small>GLOBAL</small></span><h3>Integrated<br />Advisory Model</h3><span className={styles.hubRule} /><p>Your business.<br />Our integrated support.</p></div><span className={styles.hubCaption}>CONNECTED EXPERTISE. CLEARER OUTCOMES.</span></div>
        {disciplines.map((item, index) => <article className={`${styles.discipline} ${styles[`discipline${index}`]}`} key={item.title}><div className={styles.cardTop}><span className={styles.iconBadge}><Icon name={item.icon} /></span><span className={styles.cardNumber}>0{index + 1}</span></div><h3>{item.title}</h3><p className={styles.strap}>{item.strap}</p><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul></article>)}
      </div>
    </section>

    <section className={styles.processSection} aria-labelledby="process-title"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>HOW WE CREATE VALUE</span><h2 id="process-title">Our Advisory Process</h2></div><Link className={styles.textLink} href="/about/our-methodology">Explore Our Methodology <Icon name="arrow" /></Link></div><ol className={styles.processGrid}>{process.map((item, index) => <li key={item.title}><div className={styles.processIcon}><Icon name={item.icon} /><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></div></section>

    <section className={`container ${styles.lifecycleSection}`} aria-labelledby="lifecycle-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>ADVISORY ACROSS THE BUSINESS LIFECYCLE</span><h2 id="lifecycle-title">From Idea to Impact</h2></div><p>At every stage, the right perspective.<br />At every turning point, a trusted partner.</p></div><ol className={styles.lifecycle}>{lifecycle.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

    <section className={`container ${styles.scenarioSection}`} aria-labelledby="scenario-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>PRACTICAL SCENARIOS. INTEGRATED SOLUTIONS.</span><h2 id="scenario-title">How We Work in Practice</h2></div><p>Connected advice for the challenges<br />and opportunities that matter to you.</p></div><div className={styles.scenarioGrid}>{scenarios.map(item => <Link className={styles.scenarioCard} href="/contact" key={item.title}><div className={styles.scenarioImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 30vw" /><span>{item.tag}</span></div><div className={styles.scenarioBody}><h3>{item.title}</h3><p>{item.text}</p><span className={styles.scenarioAction}>Discuss your requirements <Icon name="arrow" /></span></div></Link>)}</div></section>

    <AboutResources />
    <section className={styles.cta}><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S BUILD WHAT’S NEXT TOGETHER</span><h2>Partner with Astronis Global</h2><p>Integrated advisory support, shaped around your business objectives.</p></div><div className={styles.ctaActions}><Link href="/contact" className={styles.button}>Speak to an Advisor <Icon name="arrow" /></Link><Link href="/contact#enquiry-form" className={`${styles.button} ${styles.outline}`}>Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
