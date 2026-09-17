import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import auto from "./automotive.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["experts", "Meet Our Experts"]];
const audiences = [["building", "Manufacturers & OEMs"], ["document", "Suppliers & Component Makers"], ["building", "Dealers & Distributors"], ["bulb", "New-Age Mobility & EV Businesses"]];
const challenges = [
 ["globe", "EV Transition", "Regulatory framework, incentives and infrastructure readiness."],
 ["people", "Supply Chain Resilience", "Risk management, localisation and vendor compliance."],
 ["building", "Regulatory Compliance", "Safety, emissions, homologation and industry standards."],
 ["bulb", "Technology & Innovation", "Connected, autonomous and shared mobility."],
 ["globe", "Global Expansion", "Market entry, joint ventures and cross-border regulatory support."],
];
const solutions = [
 ["people", "Regulatory & Policy Advisory", "regulatory-and-compliance"],
 ["document", "Licensing & Approvals", "licensing-and-registrations"],
 ["building", "Corporate & Commercial Support", "corporate-and-commercial-advisory"],
 ["globe", "EV & Clean Mobility", "business-advisory-and-consulting"],
 ["people", "Supply Chain & Contracts", "contracts"],
 ["scale", "Dispute Resolution", "litigation-and-dispute-resolution"],
 ["shield", "IPR & Technology Protection", "intellectual-property-rights"],
 ["globe", "ESG & Sustainability", "esg-and-sustainability-advisory"],
];
const insights = [
 ["India's EV Policy Landscape: Key Regulatory Developments", "Automotive & Mobility .png", "Plan your advisory priorities around your vehicle offering, operating model and intended markets. Discuss approval requirements and infrastructure arrangements with your advisors before committing to expansion.", "regulatory-and-compliance"],
 ["Supply Chain Compliance in the Automotive Sector", "Manufacturing & Industrial .png", "Map your supplier relationships and key commercial dependencies. Bring procurement terms, quality responsibilities and vendor arrangements together for a focused review.", "contracts/vendor-agreements"],
 ["Global Expansion Strategies for Indian Auto Component Makers", "Infrastructure & Projects .png", "Define your target markets, partnership objectives and proposed operating structure. Coordinate commercial, contractual and cross-border advisory as you prepare for the next stage of growth.", "cross-border-and-international-business-support"],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Automotive() {
  return <div className={`${styles.page} ${estate.page} ${auto.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="automotive-title">
      <Image src="/Automotive & Mobility S .png" alt="Automotive technology and modern mobility" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Automotive & Mobility</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="automotive-title">Automotive<br />& Mobility</h1><p className={styles.tagline}>Driving Compliance. Enabling Growth.</p><p className={styles.heroDescription}>We support manufacturers, suppliers, dealers, EV players and mobility businesses with end-to-end legal, regulatory and business advisory solutions, helping them navigate change and seize opportunities in a dynamic and global industry.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Driving progress" items={[["building","Mobility"],["bulb","Innovation"],["scale","Regulation"],["globe","Sustainable growth"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Automotive page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Powering a Connected Future" id="overview-title" /><p className={styles.lead}>The automobile and automotive industry is undergoing a transformative shift driven by electric mobility, advanced technologies, sustainability goals and evolving regulations.</p><p>We work closely with industry participants to address complex legal, regulatory and commercial challenges and help them build resilient, future-ready businesses.</p></div><figure className={styles.overviewImage}><Image src="/Automotive & Mobility .png" alt="Automotive production and modern mobility" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Who We Work With</span><h2 id="audiences-title">Across the automotive value chain.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={styles.section} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /></div><div className={auto.challenges}>{challenges.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Our Solutions" id="solutions-title" /><p>Practical, integrated and industry-focused advisory across the value chain.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Supporting the Shift to Sustainable Mobility" id="regulatory-title" /><p>We help businesses navigate regulatory change and unlock opportunities in the next era of mobility.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={auto.mobilityImage}><Image src="/Automotive & Mobility .png" alt="Electric mobility and automotive innovation" fill sizes="(max-width: 900px) 100vw, 50vw" /></div></div></section>


    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Insights & Updates" title="Perspectives on the Future of Mobility" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><div className={styles.insightGrid}>{insights.map(([title, photo, text, path]) => <article className={styles.insightCard} key={title}><div className={styles.insightImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, 33vw" /></div><div className={styles.insightBody}><span className={styles.eyebrow}>Automotive & Mobility</span><h3>{title}</h3><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><p>{text}</p><TextLink href={`/services/${path}`}>Explore Advisory</TextLink></details></div></article>)}</div></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={`${styles.relatedGrid} ${auto.relatedGrid}`}>{[industries[0], industries[12], industries[2], industries[10]].map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>


    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Our Industry Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section className={auto.global} aria-labelledby="global-title"><div className={`container ${auto.globalInner}`}><div><Icon name="globe" /><div><h2 id="global-title">Global Perspective. Local Insight.</h2><p>We support domestic and international clients across key auto and mobility markets.</p></div></div><dl><div><dt>India</dt><dd>Pan-India Presence</dd></div><div><dt>30+</dt><dd>Countries (Referral Network)</dd></div><div><dt>1000+</dt><dd>Advisory Assignments</dd></div></dl></div></section>
    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Let’s Navigate What’s Next. Together.</h2><p>Speak with our industry experts for tailored legal and business solutions. Discuss your industry-specific requirements with our team.</p><div className={styles.contactImage}><Image src="/Banner-Automotive & Mobility .png" alt="Automotive and mobility landscape" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
