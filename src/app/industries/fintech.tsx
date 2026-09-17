import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import shared from "./logistics.module.css";
import styles from "./fintech.module.css";

const focus = [
  ["building", "RBI & regulatory approvals"],
  ["chart", "Payments & digital transactions"],
  ["file", "Digital lending & NBFCs"],
  ["bulb", "InsurTech & WealthTech"],
  ["shield", "Data privacy & cybersecurity"],
  ["globe", "Cross-border finance"],
];
const pillars = [
  ["shield", "Regulatory strategy", "Licensing, approvals and compliance designed around your business model."],
  ["document", "Business & transactions", "Commercial agreements, partnerships and investment support."],
  ["scale", "Risk & compliance", "Governance, customer protection, privacy and dispute readiness."],
  ["chart", "Growth & innovation", "Practical advice for new products and expansion across markets."],
];
const segments = [
  ["Digital lending", "Lending platforms · BNPL · P2P", "/FinTech & Digital Finance .png"],
  ["Payments & wallets", "Payment systems · UPI · aggregators", "/Banner-Indus- FinTech & Digital Finance .png"],
  ["NBFCs & financial services", "NBFCs · HFCs · digital finance", "/Banking & Financial Services .png"],
  ["WealthTech & investments", "Investment platforms · digital advisory", "/Banking & Financial Services1 .png"],
  ["InsurTech", "Digital insurance · distribution · claims", "/Healthcare & Pharmaceuticals .png"],
  ["RegTech", "Compliance technology · risk monitoring", "/Technology, IT & ITES .png"],
];
const solutions = [
  ["file", "Regulatory approvals & licensing", "/services/licensing-and-registrations"],
  ["people", "Corporate & commercial advisory", "/services/contracts"],
  ["globe", "FEMA, FDI & cross-border advisory", "/services/foreign-investment"],
  ["shield", "Privacy, data & cybersecurity", "/services/regulatory-and-compliance/data-protection"],
  ["scale", "Dispute resolution & litigation", "/services/litigation-and-dispute-resolution"],
  ["chart", "Investment, M&A & fundraising", "/services/corporate-transactions"],
];
const related = [
  ["Banking & financial services", "financial-services", "/Banking & Financial Services .png"],
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["E-commerce & digital platforms", "e-commerce", "/Retail & E-Commerce .png"],
  ["Startups & emerging businesses", "startups", "/Startups & Emerging Businesses .png"],
];
const faqs = [
  ["Does a fintech company need an RBI licence in India?", "It depends on the activity and operating model. Payments, lending and other regulated financial services may require authorisation or a partnership with a licensed entity."],
  ["How are digital lending platforms regulated?", "Requirements may cover lender and service-provider roles, customer disclosures, data use, grievance handling and outsourcing. We assess the obligations against the proposed model."],
  ["What should fintech businesses consider before launching a payment product?", "Start with the payment flow, custody of funds, partner roles, customer terms, security controls and any applicable RBI approval or compliance requirement."],
  ["Can a fintech business receive foreign investment?", "Foreign investment depends on the activity, structure and applicable FDI and FEMA rules. Early review helps identify approvals, reporting and contractual requirements."],
];

export default function Fintech() {
  return <div className={`${shared.page} ${styles.page}`}>
    <section className={`${shared.hero} ${styles.hero}`} aria-labelledby="fintech-title">
      <Image src="/Banner-Indus- FinTech & Digital Finance .png" alt="Digital finance and payment technology" fill preload sizes="100vw" />
      <div className={`container ${shared.heroInner} ${styles.heroInner}`}>
        <nav className={shared.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">FinTech & Digital Finance</span></nav>
        <div className={`${shared.heroMain} ${styles.heroMain}`}><span className={shared.eyebrow}>Industry focus</span><h1 id="fintech-title">FinTech &<br />Digital Finance</h1><p className={shared.heroTagline}>Innovation. Regulation. Responsible growth.</p><p className={shared.heroText}>End-to-end legal, regulatory and strategic advice for fintech companies, digital lenders, payment businesses, NBFCs, WealthTech and InsurTech innovators.</p><Link className={shared.primaryButton} href="#enquire">Speak to our experts <Icon name="arrow" /></Link></div>
        <aside className={styles.heroStatement} aria-label="Our approach"><span>Ideas.</span><span>Technology.</span><span>Regulation.</span><span>Inclusion.</span><strong>A stronger financial tomorrow.</strong></aside>
      </div>
    </section>
    <nav className={shared.sectionNav} aria-label="Page sections"><div className={`container ${shared.navInner}`}>{[["overview","Overview"],["segments","Key segments"],["solutions","Our solutions"],["regulatory","Regulatory landscape"],["insights","Insights"],["faq","FAQ"]].map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={shared.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.layout}`}>
      <main className={styles.main}>
        <section id="overview" className={`${styles.section} ${styles.overview}`}><span className={shared.eyebrow}>Industry overview</span><h2>Enabling the next generation<br /><em>of financial services.</em></h2><p className={styles.lead}>FinTech and digital finance are changing how people and businesses access, manage and grow their money. We help innovators turn ambitious ideas into compliant, scalable businesses.</p><p>Our advice connects product design, regulatory approvals, commercial arrangements, data protection and risk management across the financial ecosystem.</p><div className={styles.focusGrid}>{focus.map(([icon,item])=><div key={item}><span className={styles.focusIcon}><Icon name={icon} /></span><span>{item}</span></div>)}</div><div className={styles.pillars}>{pillars.map(([icon,title,body],index)=><article key={title}><span className={styles.pillarNumber} aria-hidden="true">0{index+1}</span><span className={styles.pillarIcon}><Icon name={icon} /></span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <section id="segments" className={styles.section}><div className={styles.heading}><div><span className={shared.eyebrow}>Where we work</span><h2>Key segments we support</h2></div><Link href="#enquire">Discuss your business <Icon name="arrow" /></Link></div><div className={styles.segments}>{segments.map(([title,subtitle,image])=><article key={title}><div className={styles.segmentImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 50vw, 33vw" /></div><div><h3>{title}</h3><p>{subtitle}</p></div></article>)}</div></section>
        <section id="solutions" className={styles.section}><span className={shared.eyebrow}>Connected expertise</span><h2>Our solutions</h2><p>Practical advice across the fintech and digital finance lifecycle.</p><div className={styles.solutions}>{solutions.map(([icon,title,href])=><Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><span className={shared.eyebrow}>Regulatory landscape</span><h2>Build with clarity.<br />Grow with confidence.</h2><p>From the first approval to ongoing governance, we help connect regulatory requirements with commercial decisions.</p><div><span>01 <strong>Launch</strong><small>Licensing & structure</small></span><span>02 <strong>Operate</strong><small>Contracts & compliance</small></span><span>03 <strong>Scale</strong><small>Investment & expansion</small></span></div></section>
      </main>
      <section className={styles.relatedSection} aria-labelledby="related-title"><span className={shared.eyebrow}>Connected sectors</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/FinTech & Digital Finance .png" alt="Digital finance technology" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className={styles.insightCopy}><span className={shared.eyebrow}>Featured insight</span><h2 id="insight-title">Ideas for digital finance</h2><h3>Regulatory priorities for digital lending</h3><p>Explore the issues shaping trust, compliance and growth.</p><Link href="/insights">Explore insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={shared.faqSection}><div className={`container ${shared.faqLayout}`}><div className={shared.faqIntro}><span className={shared.eyebrow}>Your questions, answered</span><h2>Frequently asked questions</h2><p>A clearer starting point for fintech and digital finance decisions.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={shared.faqList}>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
    <section id="enquire" className={shared.contact} aria-labelledby="enquire-title"><div className={`container ${shared.contactGrid}`}><div className={shared.contactCopy}><span className={shared.eyebrow}>Partner with us</span><h2 id="enquire-title">Innovating finance. Building trust.</h2><p>Tell us about your fintech or digital finance venture. We can help you navigate regulation, manage risk and plan your next stage of growth.</p><div className={shared.contactImage}><Image src="/Banner-Indus- FinTech & Digital Finance .png" alt="Digital payment technology and financial services" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={shared.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
