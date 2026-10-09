import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import shared from "./logistics.module.css";
import styles from "./professional-services.module.css";

const focus = [
  ["file", "Entity formation & structuring"],
  ["shield", "Licensing & regulatory compliance"],
  ["people", "Governance & partner arrangements"],
  ["document", "Client contracts & engagements"],
  ["bulb", "Intellectual property & knowledge"],
  ["globe", "Cross-border professional services"],
];
const pillars = [
  ["building", "Business formation", "Thoughtful entity structure, ownership and operating agreements for the way your firm works."],
  ["file", "Regulatory clarity", "Advice on registrations, professional obligations and ongoing compliance."],
  ["shield", "Risk & governance", "Stronger controls for client work, conflicts, data and professional responsibilities."],
  ["chart", "Growth & expansion", "Commercial support for new services, partnerships and international opportunities."],
];
const segments = [
  ["Consulting firms", "Strategy · management · advisory", "/Professional & Business Services .png"],
  ["Accounting & financial advisory", "Audit · valuation · tax advisory", "/Banking & Financial Services .png"],
  ["Legal & professional organisations", "Practices · partnerships · associations", "/Real Estate & Construction .png"],
  ["Engineering & technical consultants", "Projects · design · specialist advice", "/Infrastructure & Projects .png"],
  ["HR, recruitment & BPO", "Talent · workforce · outsourcing", "/Technology, IT & ITES .png"],
  ["Research, creative & digital services", "Insights · brands · technology", "/Media, Entertainment & Sports .png"],
];
const solutions = [
  ["building", "Corporate structuring & governance", "/services/corporate-advisory"],
  ["file", "Regulatory advisory & licensing", "/services/licensing-and-registrations"],
  ["document", "Client & commercial contracts", "/services/contracts"],
  ["people", "Employment & workforce advice", "/services/employment-and-labour"],
  ["bulb", "Intellectual property protection", "/services/intellectual-property-rights"],
  ["globe", "Cross-border expansion", "/services/business-advisory-and-consulting"],
  ["scale", "Dispute resolution", "/services/litigation-and-dispute-resolution"],
  ["chart", "Transactions & strategic growth", "/services/corporate-transactions"],
];
const related = [
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["FinTech & digital finance", "fintech-and-digital-finance", "/FinTech & Digital Finance .png"],
  ["Real estate & construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Startups & emerging businesses", "startups", "/Startups & Emerging Businesses .png"],
];
const faqs = [
  ["Which structure is suitable for a professional services firm?", "The right structure depends on ownership, professional rules, liability, tax considerations and plans for growth. We can assess the options against your business model."],
  ["Do professional services firms need specific licences?", "Some activities and professions require registrations, approvals or membership with a professional body. The requirements depend on the services and location."],
  ["How can we protect our methods and client work?", "Clear engagement terms, confidentiality arrangements, intellectual property provisions and internal controls help protect valuable knowledge and client information."],
  ["What employment issues should a growing firm consider?", "Hiring terms, contractor classification, workplace policies, confidentiality and compliance obligations become increasingly important as teams grow."],
  ["Can an Indian professional services firm serve clients overseas?", "Yes, subject to the service, local professional rules, contract terms, data requirements and applicable cross-border and tax considerations."],
];

export default function ProfessionalServices() {
  return <div className={`${shared.page} ${styles.page}`}>
    <section className={`${shared.hero} ${styles.hero}`} aria-labelledby="professional-title"><Image src="/Professional & Business Services .png" alt="Professional advisers connecting across global markets" fill preload sizes="100vw" /><div className={`container ${shared.heroInner} ${styles.heroInner}`}><nav className={shared.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Professional & Business Services</span></nav><div className={shared.heroMain}><span className={shared.eyebrow}>Industry focus</span><h1 id="professional-title">Professional &<br />Business Services</h1><p className={shared.heroTagline}>People. Knowledge. Growth.</p><p className={shared.heroText}>Practical legal, regulatory and business advice for consulting firms, professional practices and knowledge-led organisations building trusted, resilient businesses.</p><Link className={shared.primaryButton} href="#enquire">Speak to our experts <Icon name="arrow" /></Link></div><aside className={styles.heroStatement} aria-label="Our approach">Advisory.<br />Governance.<br />Compliance.<br />People.<strong>A stronger tomorrow.</strong></aside></div></section>
    <nav className={shared.sectionNav} aria-label="Page sections"><div className={`container ${shared.navInner}`}>{[["overview","Overview"],["segments","Key segments"],["solutions","Our solutions"],["approach","Our approach"],["related","Related industries"],["insights","Insights"],["faq","FAQ"]].map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={shared.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <main className={`container ${styles.content}`}>
      <section id="overview" className={styles.section}><div className={styles.overviewGrid}><div><span className={shared.eyebrow}>Industry overview</span><h2>Enabling professional excellence <em>and sustainable growth.</em></h2><p className={styles.lead}>Professional and business services help organisations solve complex problems and create new opportunities. We support the firms behind that work with sound structures, clear agreements and practical risk management.</p><p>From formation and governance to people, knowledge assets and market expansion, our connected advice helps you focus on clients with confidence.</p></div><div className={styles.focusList}><span className={styles.focusHeading}>How we support your firm</span>{focus.map(([icon,title])=><div key={title}><span className={styles.focusIcon}><Icon name={icon} /></span><span>{title}</span></div>)}</div></div><div className={styles.pillars}>{pillars.map(([icon,title,body])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section id="segments" className={styles.section}><div className={styles.heading}><div><span className={shared.eyebrow}>Where we work</span><h2>Key segments we support</h2></div><Link href="#enquire">Discuss your firm <Icon name="arrow" /></Link></div><div className={styles.segments}>{segments.map(([title,subtitle,image])=><article key={title}><div className={styles.segmentImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 33vw" /></div><div><h3>{title}</h3><p>{subtitle}</p></div></article>)}</div></section>
      <section id="solutions" className={styles.section}><span className={shared.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p>Connected advice across the professional services business lifecycle.</p><div className={styles.solutions}>{solutions.map(([icon,title,href])=><Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
      <section id="approach" className={styles.approach}><div><span className={shared.eyebrow}>Built around your work</span><h2>Sound foundations.<br />Room to grow.</h2><p>We connect regulatory, commercial and people considerations so your firm can deliver excellent work and build lasting relationships.</p><Link href="#enquire">Talk to our team <Icon name="arrow" /></Link></div><div className={styles.approachSteps}>{[["01","Establish","Choose the right structure and clear partner arrangements."],["02","Protect","Strengthen contracts, knowledge assets and governance."],["03","Expand","Plan new services, partnerships and markets."]].map(([number,title,body])=><div key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></div>)}</div></section>
      <section id="related" className={styles.section}><span className={shared.eyebrow}>Connected sectors</span><h2>Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></span><span>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insight}><div className={styles.insightImage}><Image src="/Professional & Business Services .png" alt="Professionals working across a global network" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span className={shared.eyebrow}>Featured insight</span><h2>Ideas for knowledge-led businesses</h2><p>Explore the legal and regulatory questions shaping professional services growth.</p><Link href="/insights">Explore insights <Icon name="arrow" /></Link></div></section>
    </main>
    <section id="faq" className={shared.faqSection}><div className={`container ${shared.faqLayout}`}><div className={shared.faqIntro}><span className={shared.eyebrow}>Your questions, answered</span><h2>Frequently asked questions</h2><p>A clearer starting point for structuring, protecting and growing your firm.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={shared.faqList}>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
    <section id="enquire" className={shared.contact} aria-labelledby="enquire-title"><div className={`container ${shared.contactGrid}`}><div className={shared.contactCopy}><span className={shared.eyebrow}>Partner with us</span><h2 id="enquire-title">Trusted advice for the people behind the work.</h2><p>Tell us what your firm is building. We can help you navigate regulation, strengthen governance and move forward with confidence.</p><div className={shared.contactImage}><Image src="/Professional & Business Services .png" alt="Professional services network" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={shared.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
