import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import government from "./government.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Policy support", "Regulatory compliance", "Procurement advisory", "Government liaison", "Stakeholder coordination", "Project facilitation"];
const capabilities = [
  ["building", "Regulatory & policy support", "Advice on government rules, policies, guidelines and statutory compliance."],
  ["people", "Liaison & coordination", "Effective engagement across departments, ministries and authorities."],
  ["document", "Contracts & procurement", "Support for tenders, concessions, public projects and contract management."],
  ["chart", "Institutional strengthening", "Governance, risk management and systems for stronger public outcomes."],
];
const challenges = [
  ["Policy implementation", "Translate policy frameworks into effective execution on the ground.", "/Banner-Government, Public Sector  Institutions .png"],
  ["Public procurement", "Build transparency, compliance and efficiency into tendering and contracting.", "/Infrastructure & Projects .png"],
  ["Regulatory approvals", "Navigate layered approvals and statutory clearances.", "/overnment, Public Sector & Institutions .png"],
  ["Stakeholder coordination", "Align departments, agencies and partners for timely decisions.", "/Banner-Infrastructure & Projects .png"],
  ["Public infrastructure", "Support complex development projects and public services.", "/Infrastructure & Projects .png"],
];
const solutions = [
  ["file", "Policy & legal advisory", "regulatory-and-compliance"],
  ["people", "Government liaison & representation", "regulatory-and-compliance"],
  ["document", "Procurement & tender support", "contracts"],
  ["shield", "Regulatory approvals & clearances", "licensing-and-registrations"],
  ["building", "PSU governance & compliance", "corporate-advisory"],
  ["chart", "PPP & infrastructure advisory", "business-advisory-and-consulting"],
  ["globe", "RTI, transparency & disclosure", "regulatory-and-compliance"],
  ["scale", "Dispute resolution & litigation", "litigation-and-dispute-resolution"],
];
const related = [
  ["Infrastructure & Projects", "infrastructure", "/Infrastructure & Projects .png"],
  ["Energy, Power & Renewables", "renewable-energy", "/nergy, Power & Renewables .png"],
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Healthcare & Pharma", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
];
const faqs = [
  ["What types of government approvals do businesses typically require?", "Approvals vary by sector, location, activity and project structure. We help identify the applicable authorities, filings and clearance steps."],
  ["How can you assist in liaison with government departments?", "We support structured submissions, representation and coordination with relevant departments while keeping decision-making and records clear."],
  ["What is the role of legal advisors in public procurement and tenders?", "Legal advisors can review eligibility, bidding documents, contractual terms, compliance obligations and dispute procedures."],
  ["Do you advise PSUs and autonomous institutions?", "We advise public sector undertakings and institutions on governance, contracts, regulatory matters and disputes."],
  ["How do you support compliance with RTI and transparency requirements?", "We help assess applicable disclosure duties, establish review processes and respond to legal issues around access to information."],
];

export default function Government() {
  return <div className={`${styles.page} ${government.page}`}>
    <section className={styles.hero} aria-labelledby="government-title"><Image src="/Banner-Government, Public Sector  Institutions .png" alt="Indian government building and national flag" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Government & Public Sector</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="government-title">Government, Public<br />Sector & Institutions</h1><p className={styles.heroTagline}>Policy. Partnerships. Public impact.</p><p className={styles.heroText}>Integrated legal, regulatory and strategic advisory for public bodies, PSUs and businesses working with government. We help turn policy and partnership into practical outcomes.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="Government page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Enabling governance.<br /><em>Building trust.</em></h2><p className={styles.lead}>India’s public institutions shape development, investment and access to essential services. We advise government bodies, PSUs, statutory authorities and businesses on policy, procurement, contracts and regulatory matters.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>Advancing public outcomes <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Connected legal and regulatory advice across the public sector ecosystem.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Clarity across complex public matters.</h2><p>We bring policy, statutory requirements, procurement rules and practical delivery considerations together.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/overnment, Public Sector & Institutions .png" alt="Government and public institutions" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">Strengthening public procurement in India</h2><p>Explore the legal and operational questions behind transparent, effective procurement.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for government and public sector matters.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Partnering for a stronger public future.</h2><p>Tell us about your project or institutional need. Our team can help you navigate the legal and regulatory path ahead.</p><div className={styles.contactImage}><Image src="/Banner-Government, Public Sector  Institutions .png" alt="Government building with Indian flag" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
