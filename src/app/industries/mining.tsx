import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import mining from "./mining.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"], ["experts", "Meet Our Experts"]];
const audiences = [["document", "Mineral Concessions & Approvals"], ["globe", "Environmental & Forest Clearances"], ["chart", "DMF, NMET & Statutory Levies"], ["pin", "Land Acquisition & Rehabilitation"], ["search", "Exploration, Prospecting & Mining Rights"], ["document", "Royalties, Revenue & Compliance"], ["globe", "ESG, Sustainability & Climate Risk"], ["people", "Contracts, Joint Ventures & M&A"], ["scale", "Dispute Resolution & Litigation"]];
const benefits = [
 ["shield", "Regulatory Compliance", "Advisory on MMDR Act, mining leases, clearances and sector-specific regulations."],
 ["document", "Contracts & Commercials", "Drafting and negotiating mining contracts, offtake agreements, joint ventures and supply arrangements."],
 ["globe", "ESG & Sustainability", "Guidance on environmental compliance, social responsibility and sustainable operations."],
 ["chart", "Growth & Investment", "Strategic support for expansion, diversification and global market opportunities."],
];
const challenges = [
 ["Policy Reforms", "Mining, Metals & Natural Resources .png", "Leveraging government initiatives and auction opportunities for growth.", "regulatory-and-compliance"],
 ["Regulatory Complexity", "Manufacturing & Industrial .png", "Navigating overlapping approvals, clearances and compliance requirements.", "licensing-and-registrations"],
 ["Sustainable Mining", "Banner-Mining, Metals & Natural Resources .png", "Balancing resource extraction with environmental protection and community interests.", "esg-and-sustainability-advisory"],
 ["Global Demand", "Infrastructure & Projects .png", "Meeting rising demand for critical minerals and metals in a low-carbon economy.", "cross-border-and-international-business-support"],
 ["Climate & Transition Risk", "Agriculture & Agri-Business .png", "Adapting to evolving ESG and climate-related regulations and investor expectations.", "esg-and-sustainability-advisory"],
];
const solutions = [
 ["document", "Regulatory Approvals & Compliance", "regulatory-and-compliance"],
 ["building", "Mining Leases & Concession Advisory", "licensing-and-registrations"],
 ["globe", "Environment, Forest & ESG Compliance", "esg-and-sustainability-advisory"],
 ["pin", "Land Acquisition & Rehabilitation", "rera-and-real-estate-advisory"],
 ["file", "Contracts & Commercial Advisory", "contracts"],
 ["people", "Joint Ventures & M&A", "corporate-transactions"],
 ["scale", "Dispute Resolution & Arbitration", "arbitration-and-conciliation"],
 ["globe", "Sustainability & Climate Advisory", "esg-and-sustainability-advisory"],
];
const faqs = [
 ["What approvals are required to start a mining project in India?", "Share the proposed mineral, location, project stage and operating structure with our team. We can help scope the concession, approval and compliance questions for a project-specific review."],
 ["How does the MMDR Act regulate mineral concessions?", "Our regulatory team can review your proposed activity and concession arrangements within the relevant legal framework. Bring details of the mineral, location, existing rights and transaction objectives to the initial discussion."],
 ["What environmental clearances are needed for mining operations?", "We can help scope environmental and forest clearance advisory around your site, proposed activity and development plans. Share existing approvals and project records so the team can identify the matters requiring review."],
 ["How are royalty, DMF and NMET levies calculated?", "Our team can scope a review of the statutory levy questions associated with your mineral and operations. Share the relevant concession documents, production records and existing calculations for a focused assessment."],
 ["What are the key ESG considerations for mining and metals companies?", "Our advisory can address environmental priorities, community engagement, governance responsibilities and sustainability commitments. We tailor the engagement to your operations, project stage and stakeholder expectations."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Mining() {
  return <div className={`${styles.page} ${estate.page} ${mining.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="mining-title">
      <Image src="/Mining, Metals & Natural Resources .png" alt="Mining, metals and natural resource operations" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Mining, Metals & Natural Resources</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="mining-title">Mining, Metals &<br />Natural Resources</h1><p className={styles.tagline}>Resources for a Resilient Tomorrow.</p><p className={styles.heroDescription}>We provide end-to-end legal, regulatory and strategic advisory support to businesses across mining, metals and natural resources, helping them navigate complex regulatory frameworks, secure approvals, manage environmental and social risks, and unlock sustainable growth in India and global markets.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Responsible mining" items={[["shield","Regulatory compliance"],["globe","Environmental stewardship"],["building","Resource security"],["chart","Sustainable growth"],["bulb","A stronger tomorrow"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Mining page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Powering Industries. Sustaining Resources." id="overview-title" /><p className={styles.lead}>India’s mining, metals and natural resources sector is vital for infrastructure development, industrial growth and energy security.</p><p>We advise mining companies, metal producers, explorers and investors on regulatory approvals, mineral concessions, environmental clearances, land acquisition, community engagement, contracts, dispute resolution and sustainability compliance, helping them operate responsibly while maximising value.</p></div><figure className={styles.overviewImage}><Image src="/Mining, Metals & Natural Resources .png" alt="Mining operations and natural resource development" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Areas of Focus</span><h2 id="audiences-title">Connected expertise across the resource lifecycle.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Requirements</TextLink></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, path], index) => <article key={title} className={styles.challengeCard}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 33vw, 20vw" /><span>0{index + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Our Solutions" id="solutions-title" /><p>Comprehensive advisory across the mining, metals and natural resources value chain.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Clarity Across the Resource Lifecycle" id="regulatory-title" /><p>Connected support across mineral rights, clearances, statutory levies, commercial arrangements and responsible operations.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={estate.lifecycle}>{[["01", "Plan & Establish", "Mineral concessions, land and approval priorities"], ["02", "Operate & Protect", "Mining contracts, levies and ongoing compliance"], ["03", "Collaborate & Grow", "Joint ventures, investment and sustainable growth"]].map(([n, title, text]) => <div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <div className={estate.stats}><div className={`container ${estate.statsGrid}`}>{[["building", "500+", "Advisory Assignments"], ["globe", "Pan India", "Presence"], ["bulb", "Global", "Advisory Support"], ["people", "Multi-Sector", "Expertise"]].map(([icon, title, text]) => <div key={title}><Icon name={icon} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div></div>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="Perspectives on Responsible Resource Development" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Mining, Metals & Natural Resources .png" alt="Mining and natural resources landscape" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Mining, Metals & Natural Resources</span><h3>India’s Critical Minerals Strategy: Opportunities and Legal Framework</h3><p>A starting point for considering mineral opportunities, commercial structures and the advisory priorities behind responsible resource development.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Start with a clear overview of your mineral interests, concession arrangements and investment objectives. Bring together existing rights, site information and proposed commercial agreements for a focused advisory discussion.</p><p>Consider how your exploration, production and supply arrangements connect with environmental and community priorities. Coordinate the review of approvals, commercial responsibilities and investment structures with your advisory team.</p><TextLink href="/services/regulatory-and-compliance">Discuss Your Mining Business</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={`${styles.relatedGrid} ${mining.relatedGrid}`}>{[industries[12], industries[8], industries[0], industries[3], industries[14]].map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Start with a clearer understanding of the advisory support available for your mining, metals or natural resources business.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Talk to Our Mining, Metals & Natural Resources Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Natural Resources.<br />Stronger Economies.</h2><p>Legal. Regulatory. Strategic. Work with Astronis Global to unlock opportunities in mining, metals and natural resources for a sustainable future.</p><div className={styles.contactImage}><Image src="/Banner-Mining, Metals & Natural Resources .png" alt="Mining and natural resource development" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
