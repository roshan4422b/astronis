import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import telecom from "./telecommunications.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"], ["experts", "Meet Our Experts"]];
const audiences = [["document", "Telecom Licensing & Spectrum"], ["pin", "Right of Way (RoW) & Infrastructure"], ["globe", "5G/6G, IoT & Emerging Technologies"], ["building", "Data Centres, Cloud & Edge"], ["globe", "Satellite & Space Communication"], ["bulb", "Broadcasting & DTH"], ["shield", "Cybersecurity & Data Privacy"], ["people", "Interconnection & Access Regulations"], ["people", "Mergers, Acquisitions & Partnerships"], ["scale", "Dispute Resolution & Policy Advocacy"]];
const benefits = [
 ["globe", "Regulatory Compliance", "Advisory on licensing, spectrum, RoW, interconnection and sector-specific regulations."],
 ["document", "Contracts & Commercials", "Drafting and negotiating infrastructure, service, leasing, tower sharing and technology agreements."],
 ["shield", "Data Protection & Security", "Guidance on cybersecurity, data privacy and compliance with applicable laws and standards."],
 ["chart", "Growth & Innovation", "Strategic support for new business models, digital transformation and global expansion."],
];
const challenges = [
 ["5G and Beyond", "Telecommunications & Digital Infrastructure .png", "Expanding network infrastructure and unlocking new digital opportunities.", "regulatory-and-compliance"],
 ["Data Centres & Cloud", "Technology, IT & ITES .png", "Rising demand for hyperscale and edge data centres across India.", "business-advisory-and-consulting"],
 ["Satellite & Space Tech", "Bannr-Telecommunications, Digital Infrastructure .png", "Emerging opportunities in satellite internet and space-based services.", "licensing-and-registrations"],
 ["Digital Inclusion", "Banner-Technology, IT & ITES .png", "Bridging the connectivity gap in rural and remote areas.", "business-advisory-and-consulting"],
 ["Regulatory & Security Challenges", "Part-8 .png", "Evolving regulations, cyber risks and increasing compliance requirements.", "regulatory-and-compliance/data-protection"],
];
const solutions = [
 ["globe", "Licensing, Spectrum & Regulatory Approvals", "licensing-and-registrations"],
 ["building", "Infrastructure Sharing & RoW Advisory", "regulatory-and-compliance"],
 ["file", "Contracts & Vendor Management", "contracts/vendor-agreements"],
 ["building", "Data Centres & Cloud Advisory", "business-advisory-and-consulting"],
 ["shield", "Cybersecurity & Data Compliance", "regulatory-and-compliance/data-protection"],
 ["people", "M&A, Investments & Joint Ventures", "corporate-transactions"],
 ["scale", "Dispute Resolution & Arbitration", "arbitration-and-conciliation"],
 ["document", "Policy Advocacy & Representation", "regulatory-and-compliance"],
];
const faqs = [
 ["What licences are required to operate a telecom business in India?", "Share your proposed services, network model and operating locations with our team. We can help scope the licensing and approval questions for a review tailored to your business."],
 ["What is the process for obtaining spectrum for telecom services?", "Our team can discuss your service plans and spectrum requirements, then scope advice on the relevant regulatory process. Bring details of your existing authorisations and intended network deployment to the initial discussion."],
 ["How does the Telecom Act and TRAI regulations impact service providers?", "We can review your service offering, commercial arrangements and compliance priorities to identify the areas requiring specialist advice. The engagement is tailored to your role and operations in the telecom ecosystem."],
 ["What are the key compliance requirements for data centres in India?", "We can help scope a review of your facility plans, customer agreements, data practices and operating arrangements. Share the location, service model and development stage for a focused discussion."],
 ["How are cybersecurity and data protection addressed in the telecom sector?", "Our advisory can review your data-handling arrangements, contractual responsibilities and internal policies. We work with your team to identify the legal and compliance questions relevant to your services and business relationships."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Telecommunications() {
  return <div className={`${styles.page} ${estate.page} ${telecom.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="telecom-title">
      <Image src="/Telecommunications & Digital Infrastructure .png" alt="Telecommunications networks and digital infrastructure" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Telecommunications & Digital Infrastructure</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="telecom-title">Telecommunications &<br />Digital Infrastructure</h1><p className={styles.tagline}>Connecting People. Enabling Possibilities.</p><p className={styles.heroDescription}>We provide end-to-end legal, regulatory and strategic advisory support to businesses across telecom, digital infrastructure, data centres, broadcasting and emerging technologies, helping them navigate complex regulations, licences, spectrum policies, infrastructure development and commercial arrangements in India and globally.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="A stronger tomorrow" items={[["document","Spectrum & licensing"],["scale","Telecom regulations"],["building","Digital infrastructure"],["file","Data centres & cloud"],["globe","Satellite communication"],["chart","Broadband & 5G/6G"],["shield","Cybersecurity & data protection"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Telecommunications page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Building a Connected Future." id="overview-title" /><p className={styles.lead}>India’s telecommunications and digital infrastructure sector is a key enabler of inclusive growth, digital transformation and global connectivity.</p><p>We advise telecom operators, infrastructure providers, data centre developers, satellite and space communication entities, OTT platforms and technology companies on regulatory compliance, licensing, spectrum management, infrastructure sharing, data protection and commercial transactions, enabling them to innovate and scale with confidence.</p></div><figure className={styles.overviewImage}><Image src="/Telecommunications & Digital Infrastructure .png" alt="Telecommunications networks and digital infrastructure" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Areas of Focus</span><h2 id="audiences-title">Across the digital infrastructure ecosystem.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Requirements</TextLink></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, path], index) => <article key={title} className={styles.challengeCard}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 33vw, 20vw" /><span>0{index + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Expertise for a Connected Ecosystem" id="solutions-title" /><p>Comprehensive advisory across the telecommunications and digital infrastructure ecosystem.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Clarity Across the Connectivity Lifecycle" id="regulatory-title" /><p>Connected support across licensing, spectrum, infrastructure sharing, commercial arrangements and data protection.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={estate.lifecycle}>{[["01", "Plan & Establish", "Licensing, spectrum and infrastructure priorities"], ["02", "Operate & Protect", "Network agreements, cybersecurity and data compliance"], ["03", "Collaborate & Grow", "Partnerships, investment and digital innovation"]].map(([n, title, text]) => <div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <div className={estate.stats}><div className={`container ${estate.statsGrid}`}>{[["building", "500+", "Advisory Assignments"], ["globe", "Pan India", "Presence"], ["bulb", "Global", "Advisory Support"], ["people", "Multi-Sector", "Expertise"]].map(([icon, title, text]) => <div key={title}><Icon name={icon} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div></div>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="Perspectives on a Digital-First Future" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Telecommunications & Digital Infrastructure .png" alt="Telecommunications and connected cities" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Telecommunications & Digital Infrastructure</span><h3>India’s Telecom Sector: Roadmap to a Digital-First Economy</h3><p>A starting point for connecting network development, commercial partnerships and digital services with your advisory priorities.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Start with a clear picture of your services, network model and intended markets. Bring together your existing authorisations, infrastructure arrangements and key customer and vendor agreements for review.</p><p>As your offering grows, revisit data responsibilities, infrastructure partnerships and commercial dependencies. Align the advisory work with your deployment plans and the services you intend to deliver.</p><TextLink href="/services/regulatory-and-compliance">Discuss Your Telecom Business</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={`${styles.relatedGrid} ${telecom.relatedGrid}`}>{[industries[1], industries[13], industries[2], industries[5], industries[3]].map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Start with a clearer understanding of the advisory support available for your telecom and digital infrastructure business.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Talk to Our Telecommunications Industry Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Partnering for<br />a Connected Tomorrow.</h2><p>Legal. Regulatory. Strategic. Work with Astronis Global to navigate the complexities of the telecommunications and digital infrastructure sector.</p><div className={styles.contactImage}><Image src="/Bannr-Telecommunications, Digital Infrastructure .png" alt="Telecommunications and satellite infrastructure" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
