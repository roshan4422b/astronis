import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroPriorities from "./hero-priorities";
import EnquiryForm from "../contact/enquiry-form";
import { industries } from "@/content/site";
import { corporateArticles } from "@/content/corporate-articles";
import { professionals } from "../professionals/leadership";
import styles from "./manufacturing.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["approach", "Our Approach"], ["insights", "Insights"], ["experts", "Meet Our Experts"], ["faq", "FAQs"]];
const benefits = [
  ["shield", "Regulatory Guidance", "Navigate approvals, licences and compliance with a clear plan."],
  ["chart", "Risk Management", "Identify and manage legal, operational and commercial risks."],
  ["scale", "Business Enablement", "Support expansion, diversification and entry into new markets."],
  ["globe", "Sustainable Growth", "Bring governance, people and sustainability into your growth strategy."],
];
const challenges = [
  ["Regulatory Approvals & Clearances", "Manufacturing & Industrial .png", "Plan your approvals around your location, product and operating model. Our team helps identify the scope of advice and coordinate the next steps.", "licensing-and-registrations"],
  ["Supply Chain Resilience", "Logistics, Transportation & Warehousing .png", "Build clarity into supplier relationships, procurement agreements and commercial dependencies to support continuity as your business grows.", "contracts"],
  ["Environmental & Sustainability Priorities", "nergy, Power & Renewables .png", "Connect environmental and sustainability priorities with your operating plans, internal responsibilities and wider governance approach.", "esg-and-sustainability-advisory"],
  ["Export & International Expansion", "Infrastructure & Projects .png", "Bring together commercial, contractual and regulatory perspectives when evaluating new markets and cross-border business relationships.", "cross-border-and-international-business-support"],
  ["Technology & Innovation Protection", "Technology, IT & ITES .png", "Consider ownership, confidentiality and licensing arrangements as you invest in technology, automation and new partnerships.", "intellectual-property-rights"],
];
const solutions = [
  ["building", "Company Formation & Structuring", "A considered foundation for your manufacturing business.", "business-formation"],
  ["document", "Industrial Licences & Approvals", "Coordinated support for your operational requirements.", "licensing-and-registrations"],
  ["shield", "Regulatory & Policy Advisory", "Practical perspective on your compliance priorities.", "regulatory-and-compliance"],
  ["file", "Contracts & Commercial Advisory", "Clear agreements across the manufacturing value chain.", "contracts"],
  ["people", "Labour, HR & Employment", "Support for your workforce and workplace arrangements.", "hr-and-employment-advisory"],
  ["bulb", "IP & Technology Protection", "Advice for the ideas and technology behind your business.", "intellectual-property-rights"],
  ["globe", "ESG & Sustainability", "Connect responsible operations with long-term ambitions.", "esg-and-sustainability-advisory"],
  ["scale", "Dispute Resolution & Arbitration", "A commercial approach to resolving business disputes.", "litigation-and-dispute-resolution"],
];
const steps = [["Understand your operations", "We start with your products, facilities, markets and business priorities."], ["Map the requirements", "Together, we identify the legal, regulatory and commercial workstreams."], ["Build a practical roadmap", "We agree priorities, responsibilities and the scope of advisory support."], ["Support implementation", "Our team works with yours as plans move into day-to-day operations."]];
const faqs = [
  ["How can Astronis support a new manufacturing business?", "We can help scope your company formation, commercial agreements and regulatory advisory requirements. Share your proposed activity, location and timeline so our team can discuss a suitable approach."],
  ["Do you work with both MSMEs and larger manufacturers?", "Yes. Our advisory approach is tailored to the scale, operating model and priorities of your business, from emerging manufacturers to established enterprises."],
  ["Can you support expansion into international markets?", "Our cross-border and international business support brings together structuring, contracts and regulatory perspectives. Contact our team with the markets and business arrangements you are considering."],
  ["Can we engage your team for ongoing advisory support?", "Yes. We can discuss recurring corporate, commercial and compliance advisory needs and agree a scope and working arrangement around your operations."],
  ["What should we prepare for an initial consultation?", "A short overview of your products, facility locations, company structure, key challenges and intended timelines is a useful starting point. Our team will identify any further information needed to scope the engagement."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>;
}

export default function Manufacturing() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="manufacturing-title">
      <Image src="/Manufacturing & Industrial .png" alt="Modern manufacturing facility with industrial machinery and automated production equipment" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Manufacturing</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Focus</span><h1 id="manufacturing-title">Manufacturing</h1><p className={styles.tagline}>Compliant Operations.<br />Competitive Growth. Global Reach.</p><p className={styles.heroDescription}>End-to-end legal, regulatory and strategic advisory for manufacturers. Navigate complexity, strengthen your operations and move confidently into your next phase of growth.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Built for progress" items={[["shield","Compliance"],["chart","Efficiency"],["bulb","Innovation"],["globe","Sustainability"],["building","Global markets"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Manufacturing page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a href="#enquire" className={styles.navEnquire}>Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={styles.overviewGrid}><div><Heading eyebrow="Industry Overview" title="Driving India’s Manufacturing Momentum" id="overview-title" /><p className={styles.lead}>From the factory floor to global markets, every stage of growth brings new decisions.</p><p>We work with manufacturers to address legal, regulatory and commercial challenges with a practical understanding of their operations. Our integrated advisory brings clarity to complex requirements and helps your team plan for sustainable growth.</p></div><figure className={styles.overviewImage}><Image src="/Manufacturing & Industrial .png" alt="Automated production equipment in a modern manufacturing facility" fill sizes="(max-width: 900px) 100vw, 50vw" /></figure></div><div className={styles.benefits}>{benefits.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.audienceSection} aria-labelledby="audiences-title"><div className="container"><div className={styles.sectors}><span className={styles.eyebrow}>Who We Work With</span><h2 id="audiences-title">Expertise across the production landscape.</h2><ul>{["Large, medium & MSME manufacturers", "Export-oriented businesses", "Industrial & engineering goods", "Automobile & auto components", "Chemicals, pharmaceuticals & food processing", "Electronics & precision manufacturing"].map(text => <li key={text}><Icon name="building" />{text}</li>)}</ul></div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="A Changing Industrial Landscape" title="Key Opportunities & Challenges" id="challenges-title" /><p>Clear thinking on the issues that shape your operations, resilience and next investment.</p></div><div className={styles.challengeGrid}>{challenges.map(([title, photo, text, slug], i) => <article className={styles.challengeCard} key={slug}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 20vw" /><span>0{i + 1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${slug}`}>Explore Support</TextLink></div></details></article>)}</div><p className={styles.hint}>Select a topic to explore how we can help.</p></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Support Across Your Value Chain" id="solutions-title" /><TextLink href="/services">Explore All Services</TextLink></div><div className={styles.solutionGrid}>{solutions.map(([icon, title, text, slug]) => <Link href={`/services/${slug}`} className={styles.solutionCard} key={slug}><Icon name={icon} /><div><h3>{title}</h3><p>{text}</p></div><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="approach" className={styles.approach} aria-labelledby="approach-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="A Collaborative Approach" title="From Operational Complexity to a Clear Way Forward" id="approach-title" /><p>One connected advisory approach, shaped around your business and the people who run it.</p></div><ol className={styles.steps}>{steps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className={styles.trust}><span><Icon name="pin" />Pan-India perspective</span><span><Icon name="globe" />International business support</span><span><Icon name="people" />Multidisciplinary expertise</span></div></div></section>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Insights & Perspectives" title="Ideas for Your Next Business Decision" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><div className={styles.insightGrid}>{corporateArticles.slice(0, 3).map(article => <Link href={`/insights/${article.slug}`} className={styles.insightCard} key={article.slug}><div className={styles.insightImage}><Image src={article.image} alt="" fill sizes="(max-width: 600px) 100vw, 33vw" /></div><div className={styles.insightBody}><span className={styles.eyebrow}>{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p><span className={styles.textLink}>Read Article<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="experts" className={`${styles.section} ${styles.pale}`} aria-labelledby="experts-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Professionals" title="People Behind the Perspective" id="experts-title" /><TextLink href="/professionals">Meet the Full Team</TextLink></div><div className={styles.expertGrid}>{professionals.slice(0, 2).map(person => <Link className={styles.expertCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 40vw, 220px" /></div><div><span className={styles.eyebrow}>{person.role}</span><h3>{person.name}</h3><p>{person.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="A Clearer Starting Point" id="faq-title" /><p>Learn more about working with our team and planning your manufacturing advisory requirements.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Explore Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={styles.relatedGrid}>{[industries[15], industries[4], industries[12], industries[10]].map(item => <Link href={`/industries/${item.slug}`} key={item.slug}><div className={styles.relatedImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{item.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Let’s Talk Manufacturing</span><h2 id="enquire-title">Partner for a<br />Stronger Tomorrow.</h2><p>Tell us where your business is today and where you want to take it. We’ll help you identify the next steps.</p><div className={styles.contactImage}><Image src="/Manufacturing & Industrial .png" alt="Industrial manufacturing facility" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
