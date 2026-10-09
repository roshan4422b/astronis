import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import agriculture from "./agriculture.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Food security", "Policy support", "Contract farming", "Value chain growth", "Export opportunities", "Agri-tech & innovation"];
const capabilities = [
  ["shield", "Regulatory compliance", "Advice on agricultural laws, food safety, state rules and export obligations."],
  ["document", "Contracts & commercial", "Clear terms for farming, procurement, processing and distribution."],
  ["bulb", "Sustainable growth", "Support for responsible supply chains, climate resilience and ESG."],
  ["globe", "Market access", "Guidance for domestic expansion and cross-border trade."],
];
const challenges = [
  ["Policy reforms", "Turn changing policy frameworks into opportunities for growth.", "/Agriculture & Agri-Business .png"],
  ["Value addition", "Expand food processing and agri-value chains responsibly.", "/Banner-Food, FMCG & Consumer Products .png"],
  ["Technology adoption", "Integrate agri-tech, precision farming and digital markets.", "/Banner-Agriculture & Agri-Business .png"],
  ["Export & global markets", "Meet standards and unlock international demand.", "/Logistics, Transportation & Warehousing .png"],
  ["Climate & sustainability", "Address climate risk and build resilient supply chains.", "/nergy, Power & Renewables .png"],
];
const solutions = [
  ["file", "Regulatory approvals & licensing", "regulatory-and-compliance"],
  ["document", "Contract farming advisory", "contracts"],
  ["shield", "FSSAI & food safety compliance", "regulatory-and-compliance"],
  ["globe", "Export & trade advisory", "cross-border-and-international-business-support"],
  ["building", "Land, leasing & agri-real estate", "contracts"],
  ["bulb", "Agri-tech & digital platforms", "business-advisory-and-consulting"],
  ["people", "Cooperatives & FPO structuring", "corporate-advisory"],
  ["scale", "Dispute resolution & arbitration", "litigation-and-dispute-resolution"],
];
const related = [
  ["Food & Consumer Products", "retail-and-consumer", "/FMCG FOOD .png"],
  ["E-Commerce & Digital Platforms", "e-commerce", "/Retail & E-Commerce .png"],
  ["Logistics & Warehousing", "logistics", "/Logistics, Transportation & Warehousing .png"],
  ["Renewable Energy", "renewable-energy", "/nergy, Power & Renewables .png"],
];
const faqs = [
  ["What are the key laws governing agriculture and agri-business in India?", "The applicable rules depend on the activity and state, and may cover land, produce markets, contract farming, food safety, labour and exports."],
  ["How does contract farming work and what are the legal safeguards?", "A clear agreement should cover quality, pricing, delivery, responsibilities, payment, risk allocation and dispute resolution."],
  ["What approvals are required for food processing and exports?", "Requirements vary by product and location and may include food safety registration, facility permissions, product standards and export documentation."],
  ["Can foreign investors invest in Indian agriculture and agri-business?", "Investment routes depend on the proposed activity and structure. We help assess applicable conditions and commercial arrangements."],
  ["What support is available for farmers and agri-startups?", "Relevant schemes and incentives vary by sector, technology and region. We help identify legal, commercial and regulatory steps for participation."],
];

export default function Agriculture() {
  return <div className={`${styles.page} ${agriculture.page}`}>
    <section className={styles.hero} aria-labelledby="agriculture-title"><Image src="/Banner-Agriculture & Agri-Business .png" alt="Agricultural fields and modern farm operations" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Agriculture & Agri-Business</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="agriculture-title">Agriculture &<br />Agri-Business</h1><p className={styles.heroTagline}>Sustainable growth. Stronger communities.</p><p className={styles.heroText}>Integrated legal, regulatory and strategic support for farmers, cooperatives, processors, exporters and agri-tech businesses growing a more resilient food system.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="Agriculture page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Cultivating opportunities.<br /><em>Empowering growth.</em></h2><p className={styles.lead}>Agriculture and agri-business underpin food security, livelihoods and economic growth. We help producers, cooperatives, processors, exporters and investors navigate regulation, build sound partnerships and reach new markets.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>Across the value chain <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Practical advice across the agriculture and agri-business ecosystem.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Clarity from farm to market.</h2><p>Bring land, food safety, commercial contracts, trade and sustainability obligations into one practical plan.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/Agriculture & Agri-Business .png" alt="Agriculture and sustainable cultivation" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">Sustainable agriculture in India</h2><p>Explore the policy, investment and compliance questions shaping a resilient food system.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for your agriculture and agri-business plans.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Partnering for a food-secure future.</h2><p>Tell us what you are growing. We can help you navigate regulation, strengthen contracts and build a sustainable business.</p><div className={styles.contactImage}><Image src="/Banner-Agriculture & Agri-Business .png" alt="Farm fields and agricultural production" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
