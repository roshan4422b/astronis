import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroPriorities from "./hero-priorities";
import { industries } from "@/content/site";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import health from "./healthcare.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const audiences = [["building", "Healthcare Providers & Hospitals"], ["file", "Pharma & Biotech Companies"], ["shield", "Medical Devices & Diagnostics"], ["globe", "Digital Health & Telemedicine"], ["bulb", "Clinical Research & CROs"], ["chart", "Healthcare Infrastructure & Investors"]];
const benefits = [
  ["shield", "Regulatory Expertise", "Guidance on healthcare laws, standards and approval processes."],
  ["bulb", "Practical Solutions", "Business-focused advice for real-world healthcare challenges."],
  ["scale", "Risk Mitigation", "Proactive identification and management of legal and compliance risks."],
  ["people", "Strategic Support", "Guidance across growth, partnerships and market expansion."],
];
const challenges = [
  ["Regulatory Approvals & Compliance", "Banner-Healthcare & Medical Scien .png", "Navigate licensing, quality standards and changing sector rules.", "regulatory-and-compliance"],
  ["Research, Innovation & Clinical Trials", "Healthcare & Pharmaceuticals .png", "Protect research and structure compliant innovation partnerships.", "intellectual-property-rights"],
  ["Data Privacy & Digital Health", "Banner-Consumer & Life Sciences .png", "Build trust through responsible use of sensitive health information.", "regulatory-and-compliance/data-protection"],
  ["Market Access & Pricing", "Banner-Pharmaceuticals, Food & Drugs .png", "Plan product entry, distribution and commercial arrangements.", "business-advisory-and-consulting"],
];
const solutions = [
  ["document", "Regulatory Advisory: Drugs, Devices & Clinical Trials", "regulatory-and-compliance"],
  ["file", "Licensing & Approvals", "licensing-and-registrations"],
  ["people", "Contract Management & Partnerships", "contracts"],
  ["bulb", "IP & Technology Licensing", "intellectual-property-rights"],
  ["shield", "Compliance & Risk Advisory", "regulatory-and-compliance"],
  ["scale", "Dispute Resolution", "litigation-and-dispute-resolution"],
  ["globe", "Data Protection & Digital Health", "regulatory-and-compliance/data-protection"],
  ["building", "Healthcare Infrastructure & Project Advisory", "business-advisory-and-consulting"],
];
const faqs = [
  ["What approvals are required to establish a hospital in India?", "Approvals depend on the location, services and facility model. We can help identify the registrations, licences and operating standards relevant to your project."],
  ["How can we protect our pharmaceutical innovations?", "A coordinated strategy can address patents, trade marks, confidential know-how, research agreements and licensing. The right approach depends on the product and stage of development."],
  ["What are the key compliance requirements for medical device manufacturers?", "Manufacturers should assess product classification, licences, quality systems, labelling, distribution and post-market responsibilities against the rules applicable to their devices."],
  ["How does data protection apply to healthcare organisations?", "Healthcare organisations should review how they collect, use, store and share patient information, including the roles of technology partners and service providers."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>; }
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) { return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>; }

export default function Healthcare() {
  return <div className={`${styles.page} ${estate.page} ${health.page}`}>
    <section className={`${styles.hero} ${estate.hero} ${health.hero}`} aria-labelledby="healthcare-title">
      <Image src="/Banner-Healthcare & Medical Scien .png" alt="Healthcare researcher working with a microscope" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Healthcare & Pharma</span></nav>
        <div className={`${styles.heroCopy} ${health.heroCopy}`}><span className={styles.eyebrow}>Industry Focus</span><h1 id="healthcare-title">Healthcare &<br />Pharma</h1><p className={styles.tagline}>Regulatory Clarity. Ethical Growth. Healthier Tomorrow.</p><p className={styles.heroDescription}>We support healthcare providers, pharmaceutical companies, medical device manufacturers, diagnostics and allied businesses with connected legal, regulatory and business advisory solutions.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Better health" items={[["people", "People"], ["scale", "Regulation"], ["bulb", "Innovation"], ["globe", "Access"], ["shield", "Better health"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Healthcare page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={`${styles.overviewGrid} ${health.overviewGrid}`}><div><Heading eyebrow="Industry Overview" title="Advancing Healthcare Through Compliance and Collaboration" id="overview-title" /><p className={styles.lead}>The healthcare and pharmaceutical sectors play a critical role in improving lives and building healthier communities.</p><p>We partner with organisations across the healthcare value chain to navigate complex regulatory frameworks, manage risks, protect intellectual property and achieve strategic goals in India and globally.</p></div><div className={`${styles.sectors} ${health.sectors}`}><span className={styles.eyebrow}>Who We Work With</span><h3>Across the healthcare ecosystem</h3><ul>{audiences.map(([icon,title])=><li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div><div className={`${styles.benefits} ${health.benefits}`}>{benefits.map(([icon,title,text])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Priorities</TextLink></div><div className={`${styles.challengeGrid} ${health.challengeGrid}`}>{challenges.map(([title,photo,text,path],index)=><article key={title} className={`${styles.challengeCard} ${health.challengeCard}`}><div className={`${styles.challengeImage} ${health.challengeImage}`}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, 25vw" /><span>0{index+1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Expertise Across the Healthcare Ecosystem" id="solutions-title" /><p>Legal, regulatory and business advice that connects innovation, compliance and care.</p></div><div className={estate.solutions}>{solutions.map(([icon,title,path])=><Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="regulatory" className={estate.regulatory} aria-labelledby="regulatory-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Regulatory Landscape" title="Clarity for Every Stage of Care" id="regulatory-title" /><p>Connected advice from product development and facility setup to daily operations and expansion.</p><TextLink href="/services/regulatory-and-compliance">Explore Regulatory Advisory</TextLink></div><div className={estate.lifecycle}>{[["01","Establish & Approve","Licensing, registrations and regulatory planning"],["02","Operate & Protect","Quality, privacy, contracts and risk management"],["03","Innovate & Grow","Research, investment and strategic partnerships"]].map(([n,title,text])=><div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={`${styles.relatedGrid} ${health.relatedGrid}`}>{[industries[1],industries[19],industries[0],industries[5]].map(industry=><Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Insight" title="Perspectives on Better Health" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Healthcare & Pharmaceuticals .png" alt="Healthcare and pharmaceutical innovation" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Healthcare & Pharma</span><h3>Building a Responsible Future for Healthcare Innovation</h3><p>Explore the regulatory and commercial questions shaping medical science and patient care.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Sound planning connects approvals, clinical evidence, intellectual property, patient data and commercial partnerships. The right priorities depend on your product, services and stage of growth.</p><TextLink href="#enquire">Discuss Your Healthcare Business</TextLink></div></details></div></article></div></section>

    <section id="faq" className={`${styles.section} ${styles.pale}`} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Explore common legal and regulatory questions for healthcare and pharmaceutical businesses.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question,answer])=><details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">Let&apos;s Build a Healthier Tomorrow, Together.</h2><p>Partner with Astronis Global for strategic, practical and compliant solutions across healthcare and pharma.</p><div className={`${styles.contactImage} ${health.contactImage}`}><Image src="/Banner-Healthcare & Medical Scien .png" alt="Healthcare research and medical science" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
