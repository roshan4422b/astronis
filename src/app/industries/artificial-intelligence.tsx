import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import shared from "./logistics.module.css";
import styles from "./artificial-intelligence.module.css";

const focus = [
  ["shield", "AI governance & risk"],
  ["document", "Data privacy & protection"],
  ["bulb", "Intellectual property & AI assets"],
  ["people", "Responsible AI & ethics"],
  ["file", "AI contracts & commercialisation"],
  ["globe", "Sector-specific applications"],
];
const pillars = [
  ["bulb", "Strategy & advisory", "Build responsible AI plans with clear governance, roles and review processes."],
  ["document", "IP & technology", "Address ownership, licensing and protection of data, models and AI-enabled products."],
  ["shield", "Risk & compliance", "Identify privacy, security, contractual and operational risks across the AI lifecycle."],
  ["chart", "Innovation & growth", "Structure partnerships, products and market opportunities with confidence."],
];
const applications = [
  ["Financial services", "Fraud detection · customer support", "/FinTech & Digital Finance .png"],
  ["Healthcare", "Clinical workflows · research", "/Healthcare & Pharmaceuticals .png"],
  ["Manufacturing", "Automation · predictive maintenance", "/Manufacturing & Industrial .png"],
  ["Retail & consumer", "Personalisation · demand planning", "/Retail & E-Commerce .png"],
  ["Media & entertainment", "Content creation · rights management", "/Media, Entertainment & Sports .png"],
  ["Education", "Learning tools · administration", "/Education & EdTech .png"],
  ["Professional services", "Research · workflow support", "/Professional & Business Services .png"],
  ["Public sector", "Service delivery · decision support", "/overnment, Public Sector & Institutions .png"],
];
const solutions = [
  ["shield", "Regulatory & risk advisory", "/services/regulatory-and-compliance"],
  ["document", "Technology contracts", "/services/contracts"],
  ["bulb", "IP protection & licensing", "/services/intellectual-property-rights"],
  ["globe", "Data privacy & cybersecurity", "/services/regulatory-and-compliance/data-protection"],
  ["people", "Governance & workforce advice", "/services/employment-and-labour"],
  ["chart", "Investment & transactions", "/services/corporate-transactions"],
  ["scale", "Dispute resolution", "/services/litigation-and-dispute-resolution"],
  ["file", "Product & sector advisory", "/services/business-advisory-and-consulting"],
];
const related = [
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["FinTech & digital finance", "fintech-and-digital-finance", "/FinTech & Digital Finance .png"],
  ["Healthcare & pharma", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
];
const faqs = [
  ["Is there a single AI law that applies to every business in India?", "AI obligations depend on the use case and the laws that apply to the business, data, product and sector. A tailored review is the best starting point."],
  ["Who owns AI-generated content and outputs?", "Ownership and use rights can depend on applicable law, the tools and data involved, and the terms agreed between the parties. Clear contracts help reduce uncertainty."],
  ["What data protection questions matter for an AI project?", "Map the data used to train, test and operate the system, the roles of each party, the basis for processing, security controls and retention practices."],
  ["How can a business use AI responsibly?", "Set clear accountability, assess foreseeable risks, test outputs, document important decisions and provide appropriate human oversight."],
  ["What should an AI vendor agreement cover?", "Consider data use, intellectual property, performance, security, confidentiality, liability, audit rights and what happens when the service ends."],
];

export default function ArtificialIntelligence() {
  return <div className={`${shared.page} ${styles.page}`}>
    <section className={`${shared.hero} ${styles.hero}`} aria-labelledby="ai-title"><Image src="/Banner - Indus - Artificial Intelligence .png" alt="Artificial intelligence robot and a connected global city" fill preload sizes="100vw" /><div className={`container ${shared.heroInner} ${styles.heroInner}`}><nav className={shared.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Artificial Intelligence</span></nav><div className={shared.heroMain}><span className={shared.eyebrow}>Industry focus</span><h1 id="ai-title">Artificial<br />Intelligence</h1><p className={shared.heroTagline}>Responsible innovation. Real opportunities.</p><p className={shared.heroText}>Legal, regulatory and strategic advice across the AI value chain, from data and intellectual property to contracts, governance and responsible deployment.</p><Link className={shared.primaryButton} href="#enquire">Speak to our experts <Icon name="arrow" /></Link></div><aside className={styles.heroStatement} aria-label="Our approach">People.<br />Technology.<br />Trust.<br />Responsible AI.<strong>A stronger tomorrow.</strong></aside></div></section>
    <nav className={shared.sectionNav} aria-label="Page sections"><div className={`container ${shared.navInner}`}>{[["overview","Overview"],["applications","Applications"],["solutions","Our solutions"],["governance","Governance"],["related","Related industries"],["insights","Insights"],["faq","FAQ"]].map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={shared.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <main className={`container ${styles.content}`}>
      <section id="overview" className={styles.section}><div className={styles.overviewGrid}><div><span className={shared.eyebrow}>Industry overview</span><h2>Shaping a smarter, <em>more responsible future.</em></h2><p className={styles.lead}>AI is changing how organisations operate, create and serve people. We help businesses turn new capabilities into trusted products and practical outcomes.</p><p>Our multidisciplinary advice connects governance, data protection, intellectual property, commercial agreements and risk management at every stage of adoption.</p></div><div className={styles.focusPanel}><span className={styles.focusHeading}>Where we help</span>{focus.map(([icon,title])=><div key={title}><span><Icon name={icon} /></span><strong>{title}</strong></div>)}</div></div><div className={styles.pillars}>{pillars.map(([icon,title,body])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section id="applications" className={styles.section}><div className={styles.heading}><div><span className={shared.eyebrow}>Across the economy</span><h2>Applications & sectors we support</h2></div><Link href="#enquire">Discuss your use case <Icon name="arrow" /></Link></div><div className={styles.applications}>{applications.map(([title,subtitle,image])=><article key={title}><div className={styles.applicationImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></div><div><h3>AI in {title}</h3><p>{subtitle}</p></div></article>)}</div></section>
      <section id="solutions" className={styles.section}><span className={shared.eyebrow}>Connected expertise</span><h2>Our solutions</h2><p>Practical support from first assessment to product launch and ongoing oversight.</p><div className={styles.solutions}>{solutions.map(([icon,title,href])=><Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
      <section id="governance" className={styles.governance}><div><span className={shared.eyebrow}>Responsible by design</span><h2>Innovate with clarity.<br />Build trust by design.</h2><p>Strong governance helps teams understand how an AI system is built, what it affects and who is accountable for its use.</p><Link href="#enquire">Talk to our AI team <Icon name="arrow" /></Link></div><div className={styles.governanceSteps}>{[["01","Assess","Map the use case, data and foreseeable risks."],["02","Protect","Set safeguards for privacy, IP, contracts and security."],["03","Monitor","Review performance, oversight and changing obligations."]].map(([number,title,body])=><div key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></div>)}</div></section>
      <section id="related" className={styles.section}><span className={shared.eyebrow}>Connected sectors</span><h2>Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></span><span>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insight}><div className={styles.insightImage}><Image src="/Banner - Indus - Artificial Intelligence .png" alt="AI and connected global technology" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span className={shared.eyebrow}>Featured insight</span><h2>Ideas for responsible AI</h2><p>Explore the legal and commercial questions shaping the next generation of intelligent products.</p><Link href="/insights">Explore insights <Icon name="arrow" /></Link></div></section>
    </main>
    <section id="faq" className={shared.faqSection}><div className={`container ${shared.faqLayout}`}><div className={shared.faqIntro}><span className={shared.eyebrow}>Your questions, answered</span><h2>Frequently asked questions</h2><p>Clear starting points for planning, building and using AI responsibly.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={shared.faqList}>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
    <section id="enquire" className={shared.contact} aria-labelledby="enquire-title"><div className={`container ${shared.contactGrid}`}><div className={shared.contactCopy}><span className={shared.eyebrow}>Partner with us</span><h2 id="enquire-title">Innovation with responsibility.</h2><p>Tell us about your AI initiative. We can help you navigate the legal, commercial and governance decisions behind it.</p><div className={shared.contactImage}><Image src="/Banner - Indus - Artificial Intelligence .png" alt="Artificial intelligence and global connectivity" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={shared.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
