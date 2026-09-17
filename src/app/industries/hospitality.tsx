import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import hospitality from "./hospitality.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"], ["experts", "Meet Our Experts"]];
const audiences = [["building", "Hotels, Resorts & Leisure Destinations"], ["globe", "Travel Operators & Tour Packages"], ["people", "Restaurants, Cafes & Food Chains"], ["shield", "Wellness & Medical Tourism"], ["globe", "Adventure & Eco-Tourism"], ["people", "MICE (Meetings, Incentives, Conferences & Exhibitions)"], ["building", "Tourism Infrastructure & Real Estate"], ["globe", "Aviation Support Services"], ["document", "Policy, Incentives & Tourism Promotion"]];
const benefits = [
 ["shield", "Regulatory Compliance", "Guidance on registrations, licences, approvals and sector-specific regulations."],
 ["document", "Contracts & Commercials", "Drafting and negotiating contracts with operators, franchisees, vendors and global partners."],
 ["chart", "Real Estate & Projects", "Support for hotel, resort and tourism infrastructure development, leasing and compliance."],
 ["shield", "Brand Protection", "Protecting brands, logos, trade dress and IP in the hospitality and travel space."],
];
const challenges = [
 ["Growing Tourism Demand", "Hospitality, Travel & Tourism .png", "Leveraging rising domestic and international travel for new business models.", "business-advisory-and-consulting"],
 ["Regulatory & Licensing Complexity", "Aviation, Aerospace & Defence .png", "Navigating multi-layered approvals and changing regulations.", "licensing-and-registrations"],
 ["Franchise & Management Contracts", "Banners-hospitality, Travel & Touris .png", "Structuring sustainable and equitable commercial arrangements.", "contracts"],
 ["Sustainability & Responsible Tourism", "nergy, Power & Renewables .png", "Integrating ESG and responsible tourism practices into business strategy.", "esg-and-sustainability-advisory"],
 ["Global Expansion", "Logistics, Transportation & Warehousing .png", "Supporting market entry, partnerships and cross-border operations.", "cross-border-and-international-business-support"],
];
const solutions = [
 ["document", "Licensing & Statutory Approvals", "licensing-and-registrations"],
 ["building", "Hotel & Resort Project Advisory", "rera-and-real-estate-advisory"],
 ["people", "Franchise & Management Agreements", "contracts/commercial-contracts"],
 ["shield", "Food Safety & FSSAI Compliance", "regulatory-and-compliance/fssai"],
 ["file", "Contracts, Procurement & Vendor Management", "contracts/vendor-agreements"],
 ["shield", "IPR, Brand Protection & Anti-Counterfeiting", "intellectual-property/brand-protection"],
 ["scale", "Dispute Resolution & Arbitration", "arbitration-and-conciliation"],
 ["globe", "Sustainability & ESG Advisory", "esg-and-sustainability-advisory"],
];
const faqs = [
 ["What licences are required to start a hotel or resort in India?", "Share your proposed location, property details and services with our team. We can help scope the licensing and approval questions for your hotel or resort and plan the relevant advisory work."],
 ["How is the hospitality and restaurant sector regulated?", "Our team can review your operating model, locations and services to identify the areas that need specialist advice. We support discussions around registrations, food safety, commercial agreements and ongoing compliance."],
 ["What are the key compliance requirements for travel and tour operators?", "We can help scope a review of your booking arrangements, supplier contracts, customer terms and business operations. The engagement is tailored to your services and the markets you serve."],
 ["Can foreign investors invest in the hospitality and tourism sector in India?", "Our team can assess your proposed investment and coordinate advice around the activity, structure and jurisdictions involved. Share your project plans and investment objectives for a focused discussion."],
 ["How can intellectual property such as brand names and logos be protected?", "Our IP team can review your brand assets, ownership records and licensing arrangements, then discuss suitable protection strategies. Bring an overview of your names, logos and other brand materials to the initial consultation."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Hospitality() {
  return <div className={`${styles.page} ${estate.page} ${hospitality.page}`}>
    <section className={`${styles.hero} ${estate.hero}`} aria-labelledby="hospitality-title">
      <Image src="/Hospitality, Travel & Tourism .png" alt="Hospitality destination with resort and leisure facilities" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Hospitality, Travel & Tourism</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="hospitality-title">Hospitality, Travel<br />& Tourism</h1><p className={styles.tagline}>Experiences Today. Stronger Destinations Tomorrow.</p><p className={styles.heroDescription}>We advise hotels, resorts, travel and tourism businesses, restaurants, wellness and leisure operators, and related service providers with end-to-end legal, regulatory and business advisory support, helping them navigate compliance requirements, manage commercial risks and capitalise on growth opportunities in India and global markets.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Memorable journeys" items={[["globe","Travel"],["scale","Hospitality regulations"],["document","Licensing"],["people","Franchises"],["building","Real estate"],["shield","Food safety"],["bulb","Sustainability"],["globe","Global expansion"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Hospitality page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Creating Destinations. Enabling Growth." id="overview-title" /><p className={styles.lead}>India’s hospitality, travel and tourism sector is a key contributor to economic growth, employment and cultural exchange, driven by rising domestic travel, inbound tourism and world-class infrastructure.</p><p>We provide practical, sector-focused advisory to hotels, resorts, restaurant chains, travel operators, airlines support services, wellness centres and tourism infrastructure projects, helping them meet regulatory requirements, manage contracts and build sustainable, future-ready businesses.</p></div><figure className={styles.overviewImage}><Image src="/Hospitality, Travel & Tourism .png" alt="Hospitality and tourism destinations" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Who We Work With</span><h2 id="audiences-title">Across hospitality, travel and tourism.</h2><ul>{audiences.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Requirements</TextLink></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, path], index) => <article key={title} className={styles.challengeCard}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 33vw, 20vw" /><span>0{index + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Expertise Across Your Business" id="solutions-title" /><p>Comprehensive advisory across the hospitality, travel and tourism ecosystem.</p></div><div className={estate.solutions}>{solutions.map(([icon, title, path]) => <Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Clarity from Destination to Daily Operations" id="regulatory-title" /><p>Connected support across licensing, project development, operator agreements, food safety and ongoing business advisory.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={estate.lifecycle}>{[["01", "Plan & Establish", "Hotel and resort projects, licences and approvals"], ["02", "Operate & Protect", "Operator agreements, food safety and brand protection"], ["03", "Collaborate & Grow", "Franchises, investment and international partnerships"]].map(([n, title, text]) => <div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <div className={estate.stats}><div className={`container ${estate.statsGrid}`}>{[["building", "500+", "Advisory Assignments"], ["globe", "Pan India", "Presence"], ["bulb", "Global", "Advisory Support"], ["people", "Multi-Sector", "Expertise"]].map(([icon, title, text]) => <div key={title}><Icon name={icon} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</div></div>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="A Perspective on Tourism Growth" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Hospitality, Travel & Tourism .png" alt="Resort and leisure destination" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Hospitality, Travel & Tourism</span><h3>India’s Tourism Growth: Opportunities and Regulatory Considerations</h3><p>A starting point for connecting destination development, commercial partnerships and responsible tourism with your growth strategy.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Start with a clear view of your destination, guest experience and operating model. Bring together your property arrangements, operator agreements and supplier contracts to support a focused advisory discussion.</p><p>As your business grows, revisit partner responsibilities, brand arrangements and the priorities of each location. Align your advisory work with your expansion plans and the experience you want to offer guests.</p><TextLink href="/services/regulatory-and-compliance">Discuss Your Tourism Business</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={`${styles.relatedGrid} ${hospitality.relatedGrid}`}>{[industries[3], industries[11], industries[4], industries[10], industries[13]].map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Start with a clearer understanding of the advisory support available for your hospitality, travel or tourism business.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Meet Our Experts" title="Talk to Our Hospitality, Travel & Tourism Experts" id="experts-title" /><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Partnering for<br />Extraordinary Experiences.</h2><p>Legal. Regulatory. Strategic. Work with Astronis Global to build compliant, resilient and future-ready hospitality, travel and tourism businesses.</p><div className={styles.contactImage}><Image src="/Banners-hospitality, Travel & Touris .png" alt="Hospitality and travel destination" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
