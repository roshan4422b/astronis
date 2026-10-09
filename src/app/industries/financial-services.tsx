import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import finance from "./financial-services.module.css";

const nav = [["overview", "Overview"], ["regulatory", "Regulatory Landscape"], ["solutions", "Our Solutions"], ["challenges", "Key Issues"], ["related", "Related Industries"], ["insights", "Insights"], ["stories", "Success Stories"], ["faq", "FAQ"]];
const focus = ["Stability", "Compliance", "Risk management", "Opportunity", "Financial inclusion", "A stronger tomorrow"];
const capabilities = [
  ["shield", "Regulatory compliance", "Navigate RBI, SEBI, IRDAI and other applicable frameworks."],
  ["chart", "Risk & governance", "Strengthen internal controls, oversight and risk management."],
  ["globe", "Business expansion", "Structure new products, partnerships and cross-border growth."],
  ["people", "Dispute resolution", "Practical advice and representation in regulatory and commercial disputes."],
];
const challenges = [
  ["Evolving regulations", "Keep pace with a changing financial regulatory environment.", "/Banking & Financial Services1 .png"],
  ["Cybersecurity & data", "Protect customer information and strengthen operational resilience.", "/Technology, IT & ITES .png"],
  ["Asset quality & recovery", "Address stressed assets and recovery challenges with clarity.", "/Banking & Financial Services .png"],
  ["Digital transformation", "Adapt to fintech disruption and changing customer expectations.", "/Banner-Technology, IT & ITES .png"],
];
const solutions = [
  ["building", "Regulatory & policy advisory", "regulatory-and-compliance"],
  ["file", "Licensing & approvals", "licensing-and-registrations"],
  ["shield", "NBFC & HFC advisory", "banking-nbfc-and-financial-services-advisory"],
  ["globe", "Fintech & digital assets", "banking-nbfc-and-financial-services-advisory"],
  ["document", "Insurance regulatory support", "regulatory-and-compliance"],
  ["people", "Contracts & commercial advisory", "contracts"],
  ["scale", "Dispute resolution & litigation", "litigation-and-dispute-resolution"],
  ["bulb", "ESG & sustainable finance", "esg-and-sustainability-advisory"],
];
const related = [
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Infrastructure & Projects", "infrastructure", "/Infrastructure & Projects .png"],
  ["E-Commerce", "e-commerce", "/Retail & E-Commerce .png"],
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
];
const stories = [
  ["Regulatory approval and market entry support", "Helping a financial services business prepare for its next stage.", "/Banking & Financial Services .png"],
  ["Complex commercial and regulatory matters", "Coordinated advice across contractual and compliance priorities.", "/Banking & Financial Services1 .png"],
  ["Fintech growth and governance", "Supporting product development with a clear regulatory perspective.", "/Technology, IT & ITES .png"],
];
const faqs = [
  ["What approvals are required to start an NBFC in India?", "The applicable approval route depends on the activity, ownership and proposed structure. We help assess RBI requirements and prepare a clear application plan."],
  ["How does IRDAI regulate insurance products?", "IRDAI requirements can affect product design, distribution, disclosures and governance. We support compliance reviews and regulatory submissions."],
  ["What are the key compliance requirements for fintech companies?", "Requirements vary by business model and may cover payments, lending, data protection, outsourcing, customer disclosures and cybersecurity."],
  ["How can financial institutions manage digital lending risks?", "A sound approach covers partner due diligence, customer consent, data use, disclosures, grievance handling and ongoing monitoring."],
];

export default function FinancialServices() {
  return <div className={`${styles.page} ${finance.page}`}>
    <section className={styles.hero} aria-labelledby="financial-title"><Image src="/Banners-Banking, Financial Services & Insurance .png" alt="Modern financial district and banking buildings" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Financial Services</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="financial-title">Banking, Finance<br />& Insurance</h1><p className={styles.heroTagline}>Trusted advisory for a stronger financial ecosystem.</p><p className={styles.heroText}>Legal, regulatory and strategic support for banks, NBFCs, insurers and fintech businesses navigating change, managing risk and pursuing responsible growth.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="Financial services page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Enabling<br /><em>responsible growth.</em></h2><p className={styles.lead}>Financial services are central to economic development and inclusion. We advise institutions and emerging businesses on regulation, governance, transactions and risk across a fast-changing landscape.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Industry challenges</h2></div><span>Responding to change <Icon name="arrow" /></span></div><div className={`${styles.challengeGrid} ${finance.challengeGrid}`}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 25vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Connected advisory across the financial services value chain.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Build resilience in a changing market.</h2><p>Navigate licensing, conduct, governance and digital finance obligations with joined-up legal and regulatory advice.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/Banking & Financial Services1 .png" alt="Financial services analysis and planning" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">Regulatory priorities for digital lending</h2><p>Explore the questions shaping fintech compliance, customer trust and sustainable growth.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
      <section id="stories" className={finance.stories} aria-labelledby="stories-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Experience in action</span><h2 id="stories-title">Success stories</h2></div><Link href="/success-stories">View all <Icon name="arrow" /></Link></div><div className={finance.storyGrid}>{stories.map(([title,description,image]) => <article key={title}><div><Image src={image} alt="" fill sizes="(max-width: 600px) 100vw, 33vw" /></div><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for banking, insurance and fintech matters.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Financial expertise for a better tomorrow.</h2><p>Tell us about your requirements. We can help you manage risk, meet regulatory expectations and move forward with confidence.</p><div className={styles.contactImage}><Image src="/Banners-Banking, Financial Services & Insurance .png" alt="Banking and finance district" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
