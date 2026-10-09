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
const audiences = [["building", "Schools (K-12)"], ["building", "Higher Education Institutions"], ["document", "EdTech & Online Learning Platforms"], ["people", "Skill Development & Training"], ["file", "Educational Content & Publishing"], ["globe", "Foreign Collaborations & Franchises"], ["building", "Education Infrastructure & Real Estate"], ["bulb", "Policy, Research & Think Tanks"]];
const benefits = [
 ["shield", "Regulatory Compliance", "Guidance on education laws, approvals, affiliations and sector-specific regulations."],
 ["chart", "Growth Advisory", "Structuring, partnerships and fundraising support for sustainable expansion."],
 ["shield", "IP & Content Protection", "Protection of curriculum, educational content, brands and technology platforms."],
 ["globe", "Global Opportunities", "Support for international collaborations, student exchange, offshore campuses and cross-border compliance."],
];
const challenges = [
 ["Digital Transformation", "Technology, IT & ITES .png", "Expanding access through online and blended learning models.", "business-advisory-and-consulting"],
 ["Regulatory Complexity", "Education & EdTech .png", "Navigating approvals, affiliations and evolving education policies.", "regulatory-and-compliance"],
 ["Investment & Partnerships", "Part-16 .png", "Attracting capital and building strategic collaborations.", "startup-advisory/fund-raising"],
 ["Quality & Accreditation", "Banner-Education & EdTech .png", "Maintaining academic standards and global recognition.", "licensing-and-registrations"],
 ["Equity & Access", "Education & EdTech .png", "Addressing affordability, inclusion and rural education gaps.", "business-advisory-and-consulting"],
];
const solutions = [
 ["document", "Regulatory Approvals & Affiliation Support", "licensing-and-registrations"],
 ["shield", "EdTech Legal & Technology Advisory", "intellectual-property/technology-law"],
 ["people", "Contracts, Partnerships & Collaborations", "contracts"],
 ["file", "IPR (Content, Brands & Technology)", "intellectual-property-rights"],
 ["chart", "Investment & Fundraising Support", "startup-advisory/fund-raising"],
 ["globe", "Franchise, Expansion & International Tie-ups", "cross-border-and-international-business-support"],
 ["people", "Employment & Workplace Advisory", "hr-and-employment-advisory"],
 ["scale", "Dispute Resolution & Risk Management", "litigation-and-dispute-resolution"],
];
const faqs = [
 ["What approvals are required to start an educational institution in India?", "Share your proposed institution type, location, programmes and operating model with our team. We can help scope the approval and affiliation questions relevant to your plans."],
 ["How is EdTech regulated in India?", "Our advisory team can review your platform’s business model, learning services, commercial arrangements and compliance priorities. Contact us with a description of your offering so we can identify the appropriate advisory workstreams."],
 ["Can foreign universities collaborate with Indian institutions?", "We can help assess your proposed collaboration and structure the advisory review around the institutions, programmes and jurisdictions involved. Share your objectives and proposed arrangements for a focused discussion."],
 ["What intellectual property can be protected in the education sector?", "Our IP team can review your curriculum, content, brand and technology assets and discuss suitable protection and licensing arrangements. Start with an inventory of the materials you create, own or use."],
 ["What are the key compliance requirements for online learning platforms?", "We can help scope a review of your platform?s terms, content arrangements, data practices and workplace policies. The engagement is tailored to your users, services and operating locations."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Education() {
  return <div className={`${styles.page} ${estate.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="education-title">
      <Image src="/Education & EdTech .png" alt="Education campus and learning facilities" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Education & EdTech</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="education-title">Education &<br />EdTech</h1><p className={styles.tagline}>Knowledge. Innovation. A Brighter Tomorrow.</p><p className={styles.heroDescription}>We support educational institutions, EdTech companies and training providers with end-to-end legal, regulatory and business advisory services, helping them navigate compliance, manage risks and scale sustainably in a dynamic and rapidly evolving sector.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="A brighter tomorrow" items={[["file","Learning"],["bulb","Innovation"],["shield","Compliance"],["globe","Access"],["scale","Quality"],["building","Technology"],["people","Inclusion"],["globe","Global opportunities"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Education page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Empowering Education. Enabling Opportunities." id="overview-title" /><p className={styles.lead}>India’s education and EdTech sector is witnessing unprecedented growth, driven by digital transformation, increased access to learning resources, government initiatives and rising global demand.</p><p>We provide practical, sector-focused advisory to schools, higher education institutions, EdTech platforms, skill development providers and education investment funds, helping them comply with regulatory requirements, protect intellectual property, structure partnerships and achieve sustainable growth.</p></div><figure className={styles.overviewImage}><Image src="/Education & EdTech .png" alt="Education and digital learning environments" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Who We Work With</span><h2 id="audiences-title">Across the education ecosystem.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Requirements</TextLink></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, path], index) => <article key={title} className={styles.challengeCard}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 33vw, 20vw" /><span>0{index + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Our Solutions" id="solutions-title" /><p>Comprehensive advisory across the education and EdTech ecosystem.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Clarity for a Changing Education Landscape" id="regulatory-title" /><p>Connected support across institutional approvals, affiliations, platform operations, content protection and international partnerships.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={estate.lifecycle}>{[["01", "Establish & Affiliate", "Institutional structuring and approval support"], ["02", "Create & Protect", "Content, brands, contracts and technology"], ["03", "Collaborate & Grow", "Investment, partnerships and international tie-ups"]].map(([n, title, text]) => <div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <div className={estate.stats}><div className={`container ${estate.statsGrid}`}>{[["building", "500+", "Advisory Assignments"], ["globe", "Pan India", "Presence"], ["bulb", "Global", "Advisory Support"], ["people", "Multi-Sector", "Expertise"]].map(([icon, title, text]) => <div key={title}><Icon name={icon} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div></div>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="The Future of Learning" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Education & EdTech .png" alt="Education and digital learning environment" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Education & EdTech</span><h3>The Future of EdTech in India: Regulatory Trends and Opportunities</h3><p>A perspective on building sustainable learning businesses through thoughtful planning, clear partnerships and responsible technology use.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Start with a clear picture of your learners, learning model and technology. Bring together your content arrangements, platform terms and collaboration agreements to support a focused advisory discussion.</p><p>As your offering grows, revisit the ownership of learning materials, partner responsibilities and the information your platform handles. Align your advisory priorities with the markets you serve and the next stage of your business.</p><TextLink href="/services/regulatory-and-compliance">Discuss Your EdTech Business</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={styles.relatedGrid}>{[industries[1], industries[13], industries[3], industries[19]].map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Start with a clearer understanding of the advisory support available for your institution or EdTech business.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Talk to Our Education Industry Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Shaping the<br />Future of Learning.</h2><p>Legal. Regulatory. Strategic. Partner with Astronis Global for practical solutions in the education and EdTech sector.</p><div className={styles.contactImage}><Image src="/Banner-Education & EdTech .png" alt="Campus buildings and education facilities" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
