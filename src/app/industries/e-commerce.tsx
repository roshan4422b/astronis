import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import commerce from "./e-commerce.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Digital commerce", "Data privacy", "Consumer trust", "Marketplaces", "Payments & fintech", "Cross-border trade"];
const capabilities = [
  ["shield", "Regulatory compliance", "Guidance on e-commerce, consumer protection and platform obligations."],
  ["document", "Contracts & commercial", "Marketplace terms, vendor agreements and clear commercial frameworks."],
  ["globe", "Data protection & privacy", "Support for data governance, cybersecurity and cross-border transfers."],
  ["chart", "Growth & market entry", "Practical advice for scaling, investment and international expansion."],
];
const challenges = [
  ["Rapid market growth", "Turn rising digital demand into sustainable opportunities.", "/Retail & E-Commerce .png"],
  ["Regulatory evolution", "Respond to changing e-commerce, consumer and data protection rules.", "/Banner-E-Commerce & Digital Platforms .png"],
  ["Cross-border expansion", "Navigate international trade, customs and market-entry requirements.", "/Logistics, Transportation & Warehousing .png"],
  ["Consumer trust & safety", "Manage product liability, fraud prevention and dispute resolution.", "/Technology, IT & ITES .png"],
  ["Competition & marketplaces", "Address platform risks, seller disputes and brand protection.", "/Retail & E-Commerce .png"],
];
const solutions = [
  ["file", "Regulatory advisory & compliance", "regulatory-and-compliance"],
  ["document", "Platform agreements & terms of use", "contracts"],
  ["shield", "Data privacy & cyber compliance", "regulatory-and-compliance"],
  ["bulb", "IP protection & brand enforcement", "intellectual-property-rights"],
  ["scale", "Consumer disputes & redressal", "litigation-and-dispute-resolution"],
  ["globe", "Payment & fintech regulatory support", "banking-nbfc-and-financial-services-advisory"],
  ["people", "Cross-border trade & market entry", "cross-border-and-international-business-support"],
  ["chart", "Investment & strategic partnerships", "corporate-advisory"],
];
const related = [
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Financial Services", "financial-services", "/Banking & Financial Services .png"],
  ["Retail & Consumer", "retail-and-consumer", "/FMCG FOOD .png"],
  ["Logistics & Warehousing", "logistics", "/Logistics, Transportation & Warehousing .png"],
];
const faqs = [
  ["What laws govern e-commerce businesses in India?", "The applicable framework depends on the business model and may include consumer protection, data, tax, payments, foreign investment and sector-specific rules."],
  ["Do e-commerce platforms need to follow consumer protection laws?", "Yes. Platforms should assess duties around disclosures, grievance handling, seller information, pricing and fair practices."],
  ["What are the key data protection requirements for online businesses?", "Businesses should review how personal data is collected, used, secured, retained and shared, as well as applicable notice and consent duties."],
  ["How can foreign companies operate e-commerce platforms in India?", "The structure and investment route depend on the proposed marketplace or inventory model and the activities involved."],
  ["What are the legal requirements for marketplace agreements?", "Terms should clearly address seller obligations, payments, returns, IP, consumer complaints, data, liability and dispute resolution."],
];

export default function Ecommerce() {
  return <div className={`${styles.page} ${commerce.page}`}>
    <section className={styles.hero} aria-labelledby="ecommerce-title"><Image src="/Banner-E-Commerce & Digital Platforms .png" alt="Online store on a laptop with a shopping basket" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">E-Commerce & Digital Platforms</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="ecommerce-title">E-Commerce &<br />Digital Platforms</h1><p className={styles.heroTagline}>Innovate. Comply. Scale globally.</p><p className={styles.heroText}>End-to-end legal, regulatory and strategic advice for marketplaces, online retailers and digital platforms building trusted commerce in India and beyond.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="E-commerce page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Enabling the<br /><em>digital economy.</em></h2><p className={styles.lead}>Digital platforms are transforming how businesses reach customers and deliver services. We help marketplaces, direct-to-consumer brands and technology businesses navigate compliance, protect data and scale with confidence.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>What is shaping digital trade <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Connected legal and regulatory advice across the digital commerce ecosystem.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Build trust at every transaction.</h2><p>Bring consumer protection, data governance, platform terms and payments compliance into one practical plan.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/Retail & E-Commerce .png" alt="Online shopping and digital commerce" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">E-commerce in India: key regulatory questions</h2><p>Explore the requirements shaping marketplaces, online brands and trusted digital platforms.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for your e-commerce and digital platform plans.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Partnering for a digital-first future.</h2><p>Tell us what you are building. We can help you navigate regulation, earn customer trust and grow with confidence.</p><div className={styles.contactImage}><Image src="/Banner-E-Commerce & Digital Platforms .png" alt="Digital storefront and online shopping" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
