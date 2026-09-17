import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Supply chain regulations", "Multi-modal logistics", "Customs & trade", "Transport compliance", "Warehousing infrastructure", "Risk management"];
const capabilities = [
  ["shield", "Regulatory compliance", "Clear guidance on transport, logistics, warehousing and customs obligations."],
  ["document", "Contracts & commercial", "Practical agreements for vendors, fleets, facilities and supply chain partners."],
  ["globe", "Cross-border trade", "Coordinated advice for customs, EXIM and international operations."],
  ["chart", "Resilient growth", "Support for digital transformation, infrastructure and sustainable operations."],
];
const challenges = [
  ["Growing trade & e-commerce", "Rising demand and cross-border trade are creating new operating opportunities.", "/Logistics, Transportation & Warehousing .png"],
  ["Regulatory complexity", "Navigate multi-agency approvals and evolving compliance requirements.", "/Banners-Logistics, Transportation & Warehousing .png"],
  ["Infrastructure & warehousing", "Build sound contracts and operating structures for facilities and networks.", "/Infrastructure & Projects .png"],
  ["Technology & digitisation", "Adopt connected systems while managing data and commercial risks.", "/Technology, IT & ITES .png"],
  ["Sustainability & ESG", "Move toward cleaner fleets and more responsible supply chains.", "/nergy, Power & Renewables .png"],
];
const solutions = [
  ["file", "Regulatory approvals & licensing", "regulatory-and-compliance"],
  ["globe", "Customs & EXIM compliance", "regulatory-and-compliance"],
  ["document", "Contracts & vendor management", "contracts"],
  ["building", "Warehouse & land structuring", "contracts"],
  ["shield", "Transport & fleet compliance", "regulatory-and-compliance"],
  ["scale", "Dispute resolution & arbitration", "litigation-and-dispute-resolution"],
  ["chart", "Technology & automation advisory", "business-advisory-and-consulting"],
  ["bulb", "ESG & sustainability advisory", "esg-and-sustainability-advisory"],
];
const related = [
  ["Manufacturing & Industrial", "manufacturing", "/Manufacturing & Industrial .png"],
  ["E-Commerce & Digital Platforms", "e-commerce", "/Retail & E-Commerce .png"],
  ["Energy, Power & Renewables", "renewable-energy", "/nergy, Power & Renewables .png"],
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
];
const faqs = [
  ["What licences are required to operate a logistics and warehousing business in India?", "Requirements depend on the location, mode of transport, nature of goods and type of facility. We help identify the applicable registrations, permits and operating approvals."],
  ["How does GST apply to logistics and transportation services?", "GST treatment can vary by service, contract and place of supply. A review of the operating model and documentation helps clarify obligations."],
  ["What are the customs compliance requirements for EXIM cargo?", "Import and export activity may involve classification, valuation, documentation, licensing and procedural requirements. We support businesses in mapping those obligations."],
  ["Can foreign companies invest in India’s logistics and warehousing sector?", "Investment routes and conditions depend on the activity and proposed structure. We advise on entry, contracts and regulatory considerations."],
  ["What are the key legal risks in multi-modal transportation contracts?", "Common issues include allocation of liability, cargo loss, insurance, handovers between carriers, service levels and dispute procedures."],
];

export default function Logistics() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="logistics-title">
      <Image src="/Banners-Logistics, Transportation & Warehousing .png" alt="Aircraft, freight truck and port operations" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Logistics, Transportation & Warehousing</span></nav>
        <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="logistics-title">Logistics, Transportation<br />& Warehousing</h1><p className={styles.heroTagline}>Connecting markets. Powering growth.</p><p className={styles.heroText}>End-to-end legal, regulatory and strategic advisory for businesses moving goods and building supply chains across India and beyond.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
        <HeroFocus items={focus} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Logistics page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Driving commerce.<br /><em>Delivering possibilities.</em></h2><p className={styles.lead}>India’s logistics, transportation and warehousing sector connects businesses, communities and global markets. We help operators, transporters, fleet owners and supply chain companies navigate regulation, manage risk and create room to grow.</p><div className={styles.capabilities}>{capabilities.map(([icon, title, description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>Move forward with clarity <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title, description, image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Connected advice across the logistics, transportation and warehousing ecosystem.</p><div className={styles.solutionGrid}>{solutions.map(([icon, title, path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Confidence across every connection.</h2><p>From customs and cargo movement to facilities and fleet operations, we bring legal, regulatory and commercial considerations together.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title, slug, image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/Banners-Logistics, Transportation & Warehousing .png" alt="Freight and port operations" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">The future of logistics in India</h2><p>Explore the trends shaping transport, trade and supply chain resilience.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for your logistics, transport and warehousing plans.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Stronger supply chains start with clearer advice.</h2><p>Tell us where your business is headed. Our team can help you navigate regulation, manage risk and plan the next move.</p><div className={styles.contactImage}><Image src="/Banners-Logistics, Transportation & Warehousing .png" alt="Freight transport and port operations" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
