import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import textile from "./textiles.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Sustainability", "Compliance", "Responsible sourcing", "Exports & trade", "Innovation", "Brand growth"];
const capabilities = [
  ["document", "Regulatory compliance", "Guidance on labour, export, environmental and industry obligations."],
  ["bulb", "Practical solutions", "Advice that helps manage risk and improve day-to-day operations."],
  ["shield", "Sustainable growth", "Support for responsible sourcing, ESG and supply chain standards."],
  ["globe", "Global market access", "Commercial and regulatory support for international growth."],
];
const challenges = [
  ["Evolving consumer trends", "Respond to changing demand for fashion and sustainable choices.", "/Textiles, Apparel & Lifestyle .png"],
  ["Compliance & labour laws", "Manage statutory requirements and workforce obligations.", "/Banner-Apparel, Textiles & Garments .png"],
  ["Export opportunities", "Use global demand to expand Indian apparel and textile businesses.", "/Banner01 Apparel, Textiles & Garments .png"],
  ["Cost & supply chain", "Address raw material costs, sourcing risks and logistics challenges.", "/Logistics, Transportation & Warehousing .png"],
  ["Sustainability & ESG", "Meet environmental, social and governance expectations.", "/Textiles, Apparel & Lifestyle .png"],
];
const solutions = [
  ["file", "Regulatory approvals & licences", "regulatory-and-compliance"],
  ["people", "Labour law compliance", "regulatory-and-compliance"],
  ["globe", "Export & import advisory", "cross-border-and-international-business-support"],
  ["document", "Contract drafting & negotiation", "contracts"],
  ["scale", "Dispute resolution & arbitration", "litigation-and-dispute-resolution"],
  ["shield", "Intellectual property & brands", "intellectual-property-rights"],
  ["bulb", "ESG & sustainability compliance", "esg-and-sustainability-advisory"],
  ["chart", "Supply chain & vendor agreements", "contracts"],
];
const related = [
  ["Retail & Consumer", "retail-and-consumer", "/FMCG FOOD .png"],
  ["E-Commerce & Digital Platforms", "e-commerce", "/Retail & E-Commerce .png"],
  ["Manufacturing & Industrial", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Logistics & Warehousing", "logistics", "/Logistics, Transportation & Warehousing .png"],
];
const faqs = [
  ["What are the key registrations for apparel and garment manufacturing in India?", "Requirements vary by location, workforce, facility and activity. We help identify relevant business, factory, labour and environmental registrations."],
  ["How can Indian apparel exporters access export opportunities?", "Businesses should review market access, product standards, customs documentation, contracts and any available schemes before expanding."],
  ["What labour laws apply to garment units?", "Applicable obligations depend on the type and size of the operation and the state. We support compliance reviews and practical workplace policies."],
  ["How does sustainability affect the textile and apparel industry?", "Buyer expectations and regulations increasingly affect sourcing, materials, waste, reporting and supply chain oversight."],
  ["Can you assist with international contracts and dispute resolution?", "We advise on cross-border supply contracts, governing law, payment, delivery, intellectual property and dispute processes."],
];

export default function Textiles() {
  return <div className={`${styles.page} ${textile.page}`}>
    <section className={styles.hero} aria-labelledby="textiles-title"><Image src="/Banner-Apparel, Textiles & Garments .png" alt="Garment production and apparel design" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Textiles, Apparel & Lifestyle</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="textiles-title">Textiles, Apparel<br />& Lifestyle</h1><p className={styles.heroTagline}>From fabric to global markets. Legally yours.</p><p className={styles.heroText}>End-to-end legal, regulatory and business advisory for manufacturers, exporters, brands and retailers navigating the changing world of apparel and textiles.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="Textiles page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Stitching growth.<br /><em>Weaving opportunities.</em></h2><p className={styles.lead}>India’s apparel, textiles and lifestyle businesses bring craft, manufacturing and brands to markets worldwide. We help them navigate compliance, manage commercial risk and build resilient, responsible operations.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>Across the value chain <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Practical advisory across the textile, apparel and lifestyle value chain.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Confidence from source to shelf.</h2><p>Bring labour, sourcing, trade, environment and brand protection obligations into one clear plan.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/Textiles, Apparel & Lifestyle .png" alt="Textiles and apparel" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">Sustainability in the apparel industry</h2><p>Explore the regulatory and legal questions shaping responsible sourcing and production.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for your apparel and textile business.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">For a stronger, more sustainable industry.</h2><p>Tell us about your business and the challenges ahead. We can help you protect your brand, manage compliance and grow with confidence.</p><div className={styles.contactImage}><Image src="/Banner01 Apparel, Textiles & Garments .png" alt="Apparel fabrics and garment production" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
