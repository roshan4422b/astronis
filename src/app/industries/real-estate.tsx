import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"], ["experts", "Meet Our Experts"]];
const audiences = [["people", "Developers & Builders"], ["chart", "Investors & Funds"], ["building", "Lenders & Financial Institutions"], ["people", "Contractors & EPC Companies"], ["building", "REITs & Real Estate Trusts"], ["pin", "Occupiers & Facility Managers"]];
const benefits = [
  ["chart", "Commercial Perspective", "Solutions aligned with your business objectives."],
  ["document", "Regulatory Clarity", "Guidance across approvals, compliance and dispute resolution."],
  ["shield", "Risk Mitigation", "Identify and manage legal, financial and project risks."],
  ["people", "End-to-End Support", "From land acquisition to project completion and operations."],
];
const challenges = [
  ["Land Acquisition & Title Due Diligence", "Real Estate & Construction .png", "Bring title records, proposed use and transaction objectives into a coordinated due diligence process.", "corporate-transactions/due-diligence"],
  ["Regulatory Approvals & Clearances", "Infrastructure & Projects .png", "Plan the advisory work around your project location, development plans and approval priorities.", "licensing-and-registrations"],
  ["Project Financing & Investment Structures", "Banking & Financial Services .png", "Align financing arrangements, investment structures and commercial documentation with your project objectives.", "corporate-advisory/corporate-structuring"],
  ["Contract Management & Dispute Resolution", "Part-6 .png", "Clarify responsibilities, project milestones and the approach to resolving contractual disagreements.", "litigation-and-dispute-resolution"],
  ["Sustainable & ESG-Compliant Development", "nergy, Power & Renewables .png", "Bring environmental, social and governance considerations into project planning and ongoing operations.", "esg-and-sustainability-advisory"],
];
const solutions = [
  ["pin", "Land & Title Advisory", "rera-and-real-estate-advisory"],
  ["document", "Regulatory & Statutory Approvals", "licensing-and-registrations"],
  ["people", "Project Structuring & Joint Ventures", "corporate-advisory/joint-ventures"],
  ["building", "Construction Contracts & EPC Advisory", "contracts"],
  ["building", "RERA Compliance", "rera-and-real-estate-advisory"],
  ["chart", "Real Estate Investment & REIT Advisory", "rera-and-real-estate-advisory"],
  ["scale", "Dispute Resolution & Arbitration", "arbitration-and-conciliation"],
  ["file", "Leasing, Licensing & Occupancy", "contracts/commercial-contracts"],
  ["globe", "Environment, ESG & Sustainability", "esg-and-sustainability-advisory"],
  ["chart", "Taxation, Stamp Duty & Incentives", "rera-and-real-estate-advisory"],
  ["search", "Due Diligence & Risk Assessment", "corporate-transactions/due-diligence"],
  ["shield", "Ongoing Compliance & Advisory", "regulatory-and-compliance"],
];
const faqs = [
  ["What approvals are required for a real estate project in India?", "Share the project location, proposed use and stage of development with our team. We can help scope the relevant approval and compliance workstreams for your specific project."],
  ["How does RERA impact real estate developers and buyers?", "Our RERA advisory team can discuss the registration, documentation and ongoing compliance questions relevant to your project, as well as the concerns of developers and buyers. Contact us with your project details for a focused discussion."],
  ["What are the key legal risks in construction contracts?", "Our contract review can focus on your scope of work, responsibilities, payment milestones, change management and dispute arrangements. The review is tailored to your role in the project and the proposed agreement."],
  ["Can foreign investors invest in real estate in India?", "Our team can assess your proposed investment structure and activity alongside the relevant foreign investment and real estate requirements. Share the investor jurisdiction, project type and proposed transaction so we can scope the advice."],
  ["How can we ensure ESG compliance in our real estate development?", "We can help review the environmental, social and governance priorities of your development and plan the associated advisory work. Start by sharing your project plans, existing policies and the specific standards or commitments you are working towards."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function RealEstate() {
  return <div className={`${styles.page} ${estate.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="estate-title">
      <Image src="/Real Estate & Construction .png" alt="Modern commercial buildings and real estate development" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Real Estate & Construction</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="estate-title">Real Estate &<br />Construction</h1><p className={styles.tagline}>Building Possibilities. Backed by Expertise.</p><p className={styles.heroDescription}>We advise developers, investors, lenders, contractors and occupiers across the real estate and construction value chain, providing practical, commercial and regulatory solutions to help them execute projects successfully and sustainably.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Building possibilities" items={[["pin","Land"],["building","Development"],["scale","Regulation"],["chart","Investment"],["globe","Sustainable"],["people","Communities"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Real estate page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Shaping Smart, Sustainable Spaces" id="overview-title" /><p className={styles.lead}>The real estate and construction sector is a key driver of economic growth, urban development and infrastructure creation.</p><p>We support our clients in navigating complex legal, regulatory and commercial challenges across residential, commercial, industrial and mixed-use projects.</p></div><figure className={styles.overviewImage}><Image src="/Real Estate & Construction .png" alt="Real estate development and contemporary construction" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Who We Work With</span><h2 id="audiences-title">Across the real estate value chain.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Project</TextLink></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, path], index) => <article key={title} className={styles.challengeCard}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 33vw, 20vw" /><span>0{index + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Expertise for Every Stage of Your Project" id="solutions-title" /><p>Comprehensive advisory across the real estate and construction lifecycle.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Clarity from Acquisition to Occupation" id="regulatory-title" /><p>Connected support across land and title, regulatory and statutory approvals, RERA compliance and ongoing project advisory.</p><TextLink href="/services/rera-and-real-estate-advisory">Explore Real Estate Advisory</TextLink></div><div className={estate.lifecycle}>{[["01", "Acquire & Structure", "Land, title and due diligence"], ["02", "Approve & Develop", "Approvals, RERA and construction contracts"], ["03", "Invest & Operate", "Investment, leasing and ongoing compliance"]].map(([n, title, text]) => <div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <div className={estate.stats}><div className={`container ${estate.statsGrid}`}>{[["building", "1000+", "Advisory Assignments"], ["globe", "Pan India", "Presence"], ["bulb", "Global", "Advisory Support"], ["people", "Multi-Sector", "Expertise"]].map(([icon, title, text]) => <div key={title}><Icon name={icon} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div></div>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="Perspective for Better Project Decisions" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Real Estate & Construction .png" alt="Glass facade of a contemporary commercial building" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Real Estate & Construction</span><h3>RERA Compliance: Key Considerations for Developers in 2026</h3><p>A starting point for discussing project documentation, compliance responsibilities and ongoing advisory needs.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Prepare a clear overview of the project, its location and development stage. Bring together your existing approvals, project records and key agreements for review.</p><p>Identify who maintains project information and coordinates updates across your teams. Discuss any documentation gaps and upcoming milestones with your advisors so the review can focus on your project’s requirements.</p><TextLink href="/services/rera-and-real-estate-advisory">Discuss RERA Compliance</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={styles.relatedGrid}>{[[industries[12], "Infrastructure, Energy & Environment"], [industries[5], "Banking, Finance & Insurance"], [industries[0], "Manufacturing"], [industries[9], "Hospitality"]].map(([item, label]) => {
      const industry = item as typeof industries[number];
      return <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{label as string}<Icon name="arrow" /></h3></Link>;
    })}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Start your next project with a clearer understanding of the advisory support available.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Talk to Our Industry Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Real Estate Today.<br />Stronger Tomorrow.</h2><p>Get tailored legal and business advisory for your real estate and construction projects.</p><div className={styles.contactImage}><Image src="/Infrastructure & Projects .png" alt="Construction and infrastructure development" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
