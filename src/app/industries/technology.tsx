import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import HeroFocus from "./hero-focus";
import EnquiryForm from "../contact/enquiry-form";
import styles from "./technology.module.css";

const focus = [
  ["building", "IT & ITES Services"], ["file", "Software Products & SaaS"],
  ["chart", "Fintech & Digital Platforms"], ["globe", "Global Capability Centres"],
  ["shield", "Cloud & Data Services"], ["bulb", "Artificial Intelligence"],
  ["document", "E-Commerce & Online Services"], ["people", "Digital Media & Content"],
];
const pillars = [
  ["shield", "Regulatory confidence", "Practical guidance on technology laws, privacy, cyber risk and sector requirements."],
  ["bulb", "Business enablement", "Commercial agreements and operating structures built for growth."],
  ["file", "Ideas protected", "Safeguard software, brands, data and the intellectual property behind your product."],
  ["globe", "Global ambition", "Support for cross-border contracts, expansion and international delivery."],
];
const challenges = [
  ["Digital transformation", "Technology, IT & ITES .png", "Build for new markets while keeping your commercial foundations sound."],
  ["Regulatory change", "FinTech & Digital Finance .png", "Keep pace with evolving technology, platform and data obligations."],
  ["Global expansion", "Banner-Technology, IT & ITES .png", "Navigate international contracts, delivery models and partnerships."],
  ["Cybersecurity & data", "Telecommunications & Digital Infrastructure .png", "Strengthen privacy governance and respond to emerging risks."],
  ["Talent & operations", "Professional & Business Services .png", "Align people, vendors and processes as your business scales."],
];
const solutions = [
  ["document", "Technology contracts & commercial advisory", "/services/contracts"],
  ["shield", "Data protection & privacy compliance", "/services/regulatory-and-compliance/data-protection"],
  ["file", "IP, software, brands & copyrights", "/services/intellectual-property-rights"],
  ["people", "Employment & workforce advisory", "/services/employment-and-labour"],
  ["scale", "Regulatory approvals & licensing", "/services/licensing-and-registrations"],
  ["chart", "M&A, investment & fundraising", "/services/corporate-transactions"],
  ["building", "Dispute resolution & risk management", "/services/arbitration-and-conciliation"],
  ["globe", "Global expansion & cross-border advisory", "/services/business-advisory-and-consulting"],
];
const related = [
  ["Financial services", "Banking & Financial Services .png", "financial-services"],
  ["E-commerce", "Retail & E-Commerce .png", "e-commerce"],
  ["Startups", "Startups & Emerging Businesses .png", "startups"],
  ["Telecommunications", "Telecommunications & Digital Infrastructure .png", "telecommunications"],
];
const faqs = [
  ["Which legal areas matter most to an IT or ITES business?", "The starting points usually include customer and vendor contracts, intellectual property ownership, privacy, cybersecurity, employment and sector-specific requirements. The priorities depend on your services and markets."],
  ["How should a SaaS company approach data protection?", "Map the personal data you collect and process, define roles with customers and vendors, and review notices, agreements, security measures and incident procedures against applicable law."],
  ["What should a technology services contract cover?", "A clear scope, service levels, ownership and use of IP, confidentiality, data responsibilities, payment terms, liability, termination and dispute processes help both parties work with confidence."],
  ["Can an Indian technology company expand overseas?", "Yes. The structure, contracts, tax, foreign exchange, data and local regulatory requirements should be reviewed for each target market and delivery model."],
];

export default function Technology() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="technology-title">
      <Image src="/Banner-Technology, IT & ITES .png" alt="Technology professionals working in a digital office" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Technology, IT & ITES</span></nav>
        <div className={styles.heroContent}><span className={styles.eyebrow}>Industry focus</span><h1 id="technology-title">Technology,<br />IT & ITES</h1><p className={styles.heroTag}>Innovate. Comply. Scale globally.</p><p>We support technology companies, IT and ITES service providers, SaaS businesses and digital platforms with joined-up legal, regulatory and strategic advice.</p><Link className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></Link></div>
        <HeroFocus items={["Ideas", "Technology", "People", "Compliance", "Data", "Innovation", "Global markets", "A stronger tomorrow"]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Page sections"><div className="container">{[["overview","Overview"],["challenges","Key issues"],["solutions","Our solutions"],["regulatory","Regulatory landscape"],["insights","Insights"],["faq","FAQ"]].map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}<a href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <main className={`container ${styles.content}`}>
      <div className={styles.mainColumn}>
        <section id="overview" className={styles.section}><span className={styles.eyebrow}>Industry overview</span><h2>Powering innovation.<br /><em>Enabling possibilities.</em></h2><p className={styles.lead}>India’s technology, IT and ITES sector is a powerful engine for economic growth, innovation and global competitiveness.</p><p>We advise IT services companies, software product businesses, SaaS platforms, fintech firms, data-driven companies and global capability centres. Our connected expertise helps teams manage complex laws, protect valuable ideas and expand with confidence.</p><div className={styles.focusList}>{focus.map(([icon,title])=><div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div><div className={styles.pillars}>{pillars.map(([icon,title,body])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <section id="challenges" className={styles.section}><div className={styles.sectionHeader}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunity meets complexity.</h2></div><Link href="#enquire">Discuss your priorities <Icon name="arrow" /></Link></div><div className={styles.challengeGrid}>{challenges.map(([title,photo,body],i)=><article key={title} className={styles.challenge}><div className={styles.challengeImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 720px) 80vw, 25vw" /><span>0{i+1}</span></div><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
        <section id="solutions" className={styles.section}><span className={styles.eyebrow}>Our solutions</span><h2>Expertise for every stage of growth.</h2><p>Legal, regulatory and strategic advice across the digital business lifecycle.</p><div className={styles.solutions}>{solutions.map(([icon,title,href])=><Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><span className={styles.eyebrow}>Regulatory landscape</span><h2>Move forward with clarity.</h2><p>From product launch to international delivery, we connect legal requirements with commercial decisions.</p><div>{[["01","Establish","Entity structure, licensing and technology agreements"],["02","Protect","Privacy, security, IP and workforce governance"],["03","Expand","Investment, partnerships and cross-border growth"]].map(([n,title,body])=><article key={n}><strong>{n}</strong><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      </div>
      <div className={styles.sidebar}>
        <section className={styles.sideCard}><span className={styles.eyebrow}>Connected sectors</span><h2>Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,photo,slug])=><Link key={title} href={`/industries/${slug}`}><span className={styles.relatedImage}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 650px) 100vw, 25vw" /></span><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="insights" className={styles.sideCard}><span className={styles.eyebrow}>Featured insight</span><h2>Ideas for the digital economy</h2><div className={styles.insightFeature}><div className={styles.insightImage}><Image src="/Technology, IT & ITES .png" alt="Digital technology and connected data" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div><h3>Data protection and AI governance in India</h3><p>Explore the questions shaping responsible technology growth.</p><Link className={styles.insightLink} href="/insights">Explore insights <Icon name="arrow" /></Link></div></div></section>
      </div>
    </main>
    <section id="faq" className={styles.faqSection}><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2>Frequently asked questions.</h2><p>Clear answers to common questions about building and scaling a technology business.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqs}>{faqs.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section className={styles.bottomCta}><div className="container"><div><span className={styles.eyebrow}>Build what comes next</span><h2>Partnering for a smarter digital future.</h2><p>Build, protect and scale your technology business with practical advice.</p></div><Link className={styles.primaryButton} href="#enquire">Get in touch <Icon name="arrow" /></Link></div></section>
    <section id="enquire" className={styles.enquirySection}><div className={`container ${styles.enquiryGrid}`}><div className={styles.enquiryCopy}><span className={styles.eyebrow}>Partner with us</span><h2>Talk to our technology industry experts.</h2><p>Get tailored legal, regulatory and business advisory support for your technology, IT and ITES business.</p><div className={styles.enquiryImage}><Image src="/Banner-Technology, IT & ITES .png" alt="Technology professionals working together" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" /> +91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" /> advisory@astronisglobal.com</a></div><div className={styles.enquiryForm}><EnquiryForm /></div></div></section>
  </div>;
}

