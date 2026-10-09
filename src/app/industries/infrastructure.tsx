import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import infrastructure from "./infrastructure.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"], ["experts", "Meet Our Experts"]];
const audiences = [["building", "Infrastructure Developers"], ["bulb", "Energy Producers & Distributors"], ["globe", "Renewable Energy Companies"], ["people", "EPC Contractors"], ["building", "Government & Public Sector"], ["chart", "Investors & Project Financiers"]];
const benefits = [
 ["shield", "Regulatory Expertise", "Guidance on clearances, licences and compliance across central and state regulations."],
 ["document", "Practical Solutions", "Structuring and implementing bankable and compliant projects."],
 ["globe", "Sustainability Focus", "Integrating ESG and environmental best practices for long-term impact."],
 ["people", "End-to-End Support", "From land acquisition to operations, across the project lifecycle."],
];
const challenges = [
 ["Land Acquisition and Rehabilitation", "Infrastructure & Projects .png", "Coordinating land, title and rehabilitation advisory with project development priorities.", "rera-and-real-estate-advisory"],
 ["Renewable Energy and Green Transition", "nergy, Power & Renewables .png", "Supporting project development and commercial arrangements for the energy transition.", "esg-and-sustainability-advisory"],
 ["Regulatory Approvals and Environmental Clearances", "Real Estate & Construction .png", "Planning approval and environmental advisory work around your project and location.", "licensing-and-registrations"],
 ["Project Financing and Viability", "Banking & Financial Services .png", "Connecting project structures, investment priorities and commercial documentation.", "corporate-advisory/corporate-structuring"],
 ["Climate Change and Sustainability Compliance", "Banner-Energy, Power & Renewables .png", "Bringing sustainability priorities into project planning and ongoing operations.", "esg-and-sustainability-advisory"],
];
const solutions = [
 ["building", "Regulatory Approvals & Clearances", "licensing-and-registrations"],
 ["document", "Project Development & Structuring", "corporate-advisory/corporate-structuring"],
 ["file", "Contracts & EPC Advisory", "contracts"],
 ["pin", "Land Acquisition & R&R Advisory", "rera-and-real-estate-advisory"],
 ["bulb", "Renewable Energy & Power Projects", "business-advisory-and-consulting"],
 ["globe", "Environmental & ESG Compliance", "esg-and-sustainability-advisory"],
 ["scale", "Dispute Resolution & Arbitration", "arbitration-and-conciliation"],
 ["shield", "Policy & Regulatory Advisory", "regulatory-and-compliance"],
];
const faqs = [
 ["What environmental clearances are required for infrastructure and energy projects in India?", "Share your project activity, location, scale and development stage with our team. We can help scope the environmental clearance and approval questions that need specialist review for your project."],
 ["How can we structure a renewable energy project legally in India?", "We can discuss your ownership, investment and operating plans, then scope support for project structuring and commercial agreements. Bring an overview of the proposed project and the parties involved."],
 ["What are the key regulatory challenges in land acquisition?", "Our team can help scope a review of land records, proposed use, transaction arrangements and rehabilitation questions. The advisory approach is tailored to the location and requirements of the project."],
 ["How does ESG compliance impact infrastructure and energy businesses?", "We can help connect your environmental, social and governance priorities with project plans, internal responsibilities and ongoing advisory needs. Share the standards and commitments relevant to your business for a focused discussion."],
 ["Can foreign investors participate in infrastructure and renewable energy projects?", "Our team can assess the proposed activity, investment structure and jurisdictions involved. Share your project and investor details so we can scope the relevant foreign investment and project advisory work."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Infrastructure() {
  return <div className={`${styles.page} ${estate.page} ${infrastructure.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="infrastructure-title">
      <Image src="/nergy, Power & Renewables .png" alt="Renewable energy and sustainable infrastructure" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Infrastructure, Energy & Environment</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="infrastructure-title">Infrastructure, Energy<br />& Environment</h1><p className={styles.tagline}>Sustainable Growth. Responsible Development.</p><p className={styles.heroDescription}>We advise developers, investors, contractors and operators across the infrastructure, energy and environment sectors with end-to-end legal, regulatory and strategic solutions to help them build a more sustainable and resilient tomorrow.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Responsible development" items={[["bulb","Clean energy"],["building","Resilient infrastructure"],["globe","Sustainable tomorrow"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Infrastructure page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Building a Sustainable Future" id="overview-title" /><p className={styles.lead}>The infrastructure, energy and environment sector is fundamental to India’s economic progress and global climate commitments.</p><p>We support our clients in navigating regulatory approvals, project development, financing, land acquisition, environmental clearances and dispute resolution, while ensuring compliance with evolving legal and sustainability requirements.</p></div><figure className={styles.overviewImage}><Image src="/Infrastructure & Projects .png" alt="Large-scale infrastructure and project development" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Who We Work With</span><h2 id="audiences-title">Across infrastructure, energy and environment.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Requirements</TextLink></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, path], index) => <article key={title} className={styles.challengeCard}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 33vw, 20vw" /><span>0{index + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Solutions Across the Project Lifecycle" id="solutions-title" /><p>Comprehensive advisory across the infrastructure, energy and environment value chain.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="A Clearer Path from Planning to Operations" id="regulatory-title" /><p>Connected support across project development, land acquisition, approvals, financing, contracts and environmental advisory.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={estate.lifecycle}>{[["01", "Plan & Establish", "Project structures, land and approval priorities"], ["02", "Operate & Protect", "EPC agreements, operations and compliance"], ["03", "Collaborate & Grow", "Project financing, sustainability and investment"]].map(([n, title, text]) => <div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <div className={estate.stats}><div className={`container ${estate.statsGrid}`}>{[["building", "200+", "Advisory Assignments"], ["globe", "Pan India", "Presence"], ["bulb", "Global", "Advisory Support"], ["people", "Multi-Sector", "Expertise"]].map(([icon, title, text]) => <div key={title}><Icon name={icon} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div></div>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="Perspective for a Sustainable Future" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/nergy, Power & Renewables .png" alt="Renewable energy generation" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Infrastructure, Energy & Environment</span><h3>Renewable Energy Policy 2026: Key Opportunities for Investors</h3><p>A starting point for investors considering project structures, commercial priorities and advisory needs in renewable energy.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Start with a clear overview of your proposed energy project, location and investment objectives. Bring together the project structure, land arrangements and key commercial agreements for a focused advisory discussion.</p><p>Identify the responsibilities of developers, investors and operators early. Align your advisory priorities with project milestones and discuss approval, financing and sustainability questions with the appropriate specialists.</p><TextLink href="/services/regulatory-and-compliance">Discuss Your Energy Project</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={`${styles.relatedGrid} ${infrastructure.relatedGrid}`}>{[industries[3], industries[0], industries[15], industries[4], industries[5]].map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Start with a clearer understanding of the advisory support available for your infrastructure, energy or environment project.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Discuss Your Project With Our Sector Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Infrastructure<br />for a Greener Tomorrow.</h2><p>Partner with Astronis Global for practical, compliant and sustainable solutions. Get tailored legal and business advisory support for your infrastructure, energy or environment project.</p><div className={styles.contactImage}><Image src="/Infrastructure & Projects .png" alt="Infrastructure and project development" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
