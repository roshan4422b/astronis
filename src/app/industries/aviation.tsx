import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import shared from "./logistics.module.css";
import base from "./artificial-intelligence.module.css";
import styles from "./aviation.module.css";

const focus = [
  ["plane", "Licensing & certifications"],
  ["globe", "FDI & cross-border investment"],
  ["building", "Defence procurement"],
  ["chart", "Aerospace manufacturing"],
  ["shield", "MRO & operational compliance"],
  ["document", "Leasing, finance & contracts"],
];
const pillars = [
  ["plane", "Regulatory advisory", "Practical guidance on approvals, operations and sector-specific obligations."],
  ["document", "Commercial & contracts", "Agreements for leasing, maintenance, supply chains and partnerships."],
  ["shield", "Risk & compliance", "Support for safety, governance, export controls and operational risk."],
  ["chart", "Growth & investment", "Advice on market entry, collaboration, transactions and expansion."],
];
const challenges = [
  ["Aviation growth", "Fleet expansion, airport capacity and evolving passenger expectations.", "/Aviation, Aerospace & Defence .png"],
  ["Aerospace manufacturing", "Industrial partnerships, technology transfer and supply-chain readiness.", "/Manufacturing & Industrial .png"],
  ["Emerging technologies", "Drones, advanced air mobility and space-related opportunities.", "/Banner-Indus- Aviation, Aerospace & Defence .png"],
  ["Strategic procurement", "Complex contracting, sourcing and programme delivery.", "/Banner-Aviation, Aerospace, Defence, Marine.png"],
  ["Sustainability & ESG", "Environmental performance, resilient operations and responsible growth.", "/nergy, Power & Renewables .png"],
];
const solutions = [
  ["file", "Regulatory approvals & licensing", "/services/licensing-and-registrations"],
  ["document", "Contracts & commercial advisory", "/services/contracts"],
  ["globe", "FDI & cross-border transactions", "/services/foreign-investment"],
  ["building", "Procurement & project advisory", "/services/business-advisory-and-consulting"],
  ["shield", "MRO & operational compliance", "/services/regulatory-and-compliance"],
  ["bulb", "Technology transfer & IP", "/services/intellectual-property-rights"],
  ["scale", "Dispute resolution", "/services/litigation-and-dispute-resolution"],
  ["chart", "ESG & sustainable growth", "/services/esg-and-sustainability-advisory"],
];
const related = [
  ["Manufacturing & industrial", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Infrastructure & projects", "infrastructure", "/Infrastructure & Projects .png"],
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Logistics & transportation", "logistics", "/Logistics, Transportation & Warehousing .png"],
];
const faqs = [
  ["What approvals may be needed to launch an aviation business in India?", "Requirements depend on the activity, aircraft, operating model and location. We help map the applicable licences, registrations and contractual steps."],
  ["How does foreign investment work in aviation and aerospace?", "The applicable route and conditions depend on the activity and proposed structure. Investment, reporting and sector requirements should be reviewed together."],
  ["What should an aircraft lease or maintenance contract address?", "Key issues include responsibilities, performance standards, insurance, liability, records, termination and dispute procedures."],
  ["How are drone operations regulated?", "Drone operations can involve registration, permissions, airspace restrictions, safety requirements and data considerations, depending on the use case."],
  ["What risks arise in defence and aerospace procurement?", "Procurement can involve eligibility, bid terms, security, export controls, delivery obligations and technology ownership. Early contract review helps manage those risks."],
];

export default function Aviation() {
  return <div className={`${shared.page} ${base.page} ${styles.page}`}>
    <section className={`${shared.hero} ${base.hero} ${styles.hero}`} aria-labelledby="aviation-title"><Image src="/Banner-Indus- Aviation, Aerospace & Defence .png" alt="Commercial aviation, aerospace and defence technology at sunset" fill preload sizes="100vw" /><div className={`container ${shared.heroInner} ${base.heroInner} ${styles.heroInner}`}><nav className={shared.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Aviation, Aerospace & Defence</span></nav><div className={shared.heroMain}><span className={shared.eyebrow}>Industry focus</span><h1 id="aviation-title">Aviation, Aerospace<br />& Defence</h1><p className={shared.heroTagline}>Progress with precision. Growth with confidence.</p><p className={shared.heroText}>Legal, regulatory and strategic advice for airlines, airports, aerospace manufacturers, MRO providers, defence businesses and emerging aviation ventures.</p><Link className={shared.primaryButton} href="#enquire">Speak to our experts <Icon name="arrow" /></Link></div><aside className={base.heroStatement} aria-label="Our approach">Safer skies.<br />Stronger industries.<br />Smarter operations.<strong>A stronger tomorrow.</strong></aside></div></section>
    <nav className={shared.sectionNav} aria-label="Page sections"><div className={`container ${shared.navInner}`}>{[["overview","Overview"],["challenges","Key issues"],["solutions","Our solutions"],["regulatory","Regulatory landscape"],["related","Related industries"],["insights","Insights"],["faq","FAQ"]].map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={shared.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <main className={`container ${base.content}`}>
      <section id="overview" className={base.section}><div className={base.overviewGrid}><div><span className={shared.eyebrow}>Industry overview</span><h2>Enabling progress. <em>Connecting possibilities.</em></h2><p className={base.lead}>Aviation, aerospace and defence connect people, industries and strategic capabilities. We help organisations navigate complex requirements while building resilient, future-ready operations.</p><p>Our advice spans approvals, investment, contracts, manufacturing, technology and disputes, with practical guidance for decisions across the sector.</p></div><div className={base.focusPanel}><span className={base.focusHeading}>Where we help</span>{focus.map(([icon,title])=><div key={title}><span><Icon name={icon} /></span><strong>{title}</strong></div>)}</div></div><div className={base.pillars}>{pillars.map(([icon,title,body])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section id="challenges" className={base.section}><div className={base.heading}><div><span className={shared.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><Link href="#enquire">Discuss your priorities <Icon name="arrow" /></Link></div><div className={`${base.applications} ${styles.challenges}`}>{challenges.map(([title,body,image])=><article key={title}><div className={base.applicationImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 20vw" /></div><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
      <section id="solutions" className={base.section}><span className={shared.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p>Connected legal and business advice across the aviation, aerospace and defence value chain.</p><div className={base.solutions}>{solutions.map(([icon,title,href])=><Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
      <section id="regulatory" className={base.governance}><div><span className={shared.eyebrow}>Regulatory landscape</span><h2>Clarity for every stage of flight.</h2><p>From initial approvals to complex partnerships, we connect regulatory requirements with operational and commercial decisions.</p><Link href="#enquire">Talk to our team <Icon name="arrow" /></Link></div><div className={base.governanceSteps}>{[["01","Establish","Map licences, structure and investment requirements."],["02","Operate","Align contracts, safety and compliance processes."],["03","Expand","Support new technology, markets and partnerships."]].map(([number,title,body])=><div key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></div>)}</div></section>
      <section id="related" className={base.section}><span className={shared.eyebrow}>Connected sectors</span><h2>Related industries</h2><div className={base.relatedGrid}>{related.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span className={base.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></span><span>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={base.insight}><div className={base.insightImage}><Image src="/Aviation, Aerospace & Defence .png" alt="Aviation and aerospace technology" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span className={shared.eyebrow}>Featured insight</span><h2>Ideas for a changing aviation sector</h2><p>Explore the regulatory and commercial questions shaping aviation, aerospace and defence.</p><Link href="/insights">Explore insights <Icon name="arrow" /></Link></div></section>
    </main>
    <section id="faq" className={shared.faqSection}><div className={`container ${shared.faqLayout}`}><div className={shared.faqIntro}><span className={shared.eyebrow}>Your questions, answered</span><h2>Frequently asked questions</h2><p>Clear starting points for complex aviation and aerospace decisions.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={shared.faqList}>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
    <section id="enquire" className={shared.contact} aria-labelledby="enquire-title"><div className={`container ${shared.contactGrid}`}><div className={shared.contactCopy}><span className={shared.eyebrow}>Partner with us</span><h2 id="enquire-title">A stronger tomorrow takes flight.</h2><p>Tell us where your business is headed. We can help you manage risk, navigate regulation and pursue new opportunities.</p><div className={shared.contactImage}><Image src="/Banner-Indus- Aviation, Aerospace & Defence .png" alt="Aircraft and aerospace operations" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={shared.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
