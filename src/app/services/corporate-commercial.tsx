import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { industries } from "@/content/site";
import { professionals } from "../professionals/leadership";
import { corporateArticles } from "@/content/corporate-articles";
import styles from "./corporate-commercial.module.css";

const capabilities = [
  ["Entity Structuring & Group Reorganisation", "Optimal legal structures for growth and governance.", "corporate-advisory/corporate-structuring", "Real Estate & Construction .png"],
  ["Corporate Governance", "Board advisory, compliance frameworks and policy support.", "corporate-advisory/corporate-governance", "Part-16 .png"],
  ["Commercial Contracts", "Drafting, negotiation and management of commercial agreements.", "contracts", "Part-14 .png"],
  ["Mergers & Acquisitions (M&A)", "Strategic advisory for domestic and cross-border transactions.", "corporate-transactions", "Part-10 .png"],
  ["Joint Ventures & Strategic Alliances", "Structuring and negotiating partnerships and alliances.", "corporate-advisory/joint-ventures", "Part-9 .png"],
  ["Corporate Restructuring", "Mergers, demergers, amalgamation and business realignment.", "corporate-advisory/corporate-restructuring", "Infrastructure & Projects .png"],
  ["Capital Markets & Fund Raising", "Equity, debt, private placements and investor advisory.", "startup-advisory/fund-raising", "Banking & Financial Services .png"],
  ["Due Diligence", "Legal, regulatory and commercial due diligence.", "corporate-transactions/due-diligence", "Part-18 .png"],
  ["General Corporate Advisory", "Day-to-day legal support for business operations.", "corporate-advisory/commercial-advisory", "Part-10 .png"],
  ["Cross-Border Transactions", "Advisory on international business transactions.", "foreign-investment/cross-border-transactions", "Logistics, Transportation & Warehousing .png"],
  ["Regulatory & Compliance", "Ongoing compliance with applicable laws and regulations.", "regulatory-and-compliance", "Part-8 .png"],
  ["Dispute Prevention", "Risk assessment, contract management and early resolution strategies.", "litigation-and-dispute-resolution", "Part-6 .png"],
];
const benefits = [
  ["people", "Business Focused", "Practical, commercially oriented advice."],
  ["globe", "End-to-End Support", "From formation to expansion."],
  ["shield", "Regulatory Insight", "Aligned with legal and regulatory frameworks."],
  ["chart", "Long-Term Partnership", "Committed to your growth journey."],
];
const approach = [["Understand", "Your objectives"], ["Assess", "Opportunities & risks"], ["Strategise", "Tailored solutions"], ["Implement", "End-to-end support"], ["Monitor", "Ongoing compliance"], ["Deliver Value", "Long-term success"]];
const related = [
  ["Regulatory Advisory", "regulatory-and-compliance"],
  ["Custom & Excise Advisory Services", "litigation-and-dispute-resolution"],
  ["Taxation & Compliance", "gst-and-indirect-tax-regulatory-support"],
  ["MSME Advisory & Disputes", "msme-advisory-and-disputes"],
  ["FEMA & Foreign Investment", "fema-fdi-and-foreign-exchange-advisory"],
  ["Banking & Financial Services", "banking-nbfc-and-financial-services-advisory"],
  ["Intellectual Property Rights", "intellectual-property-rights"],
  ["Employment & HR", "hr-and-employment-advisory"],
];
function Action({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return <Link href="/contact" className={`${styles.button} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>;
}
function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>;
}

export default function CorporateCommercial() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="service-heading">
      <Image src="/Part-10 .png" alt="A contemporary corporate boardroom overlooking the city" fill preload sizes="100vw" />
      <div className={`container ${styles.heroContent}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span><Link href="/services">Services</Link><span>›</span><span aria-current="page">Corporate & Commercial</span></nav>
        <h1 id="service-heading">Corporate & Commercial</h1>
        <p className={styles.subtitle}>Strategic legal and business solutions for a stronger enterprise.</p>
        <p className={styles.description}>At Astronis Global, we advise businesses across the full spectrum of corporate and commercial matters — from structuring and governance to transactions, contracts and strategic growth.</p>
        <div className={styles.heroActions}><Action>Speak to an Advisor</Action><Link className={`${styles.button} ${styles.outline}`} href="#capabilities">Explore Our Capabilities<Icon name="arrow" /></Link></div>
      </div>
    </section>

    <div className={styles.benefits}><div className={`container ${styles.benefitGrid}`}>{benefits.map(([icon, title, text]) => <div className={styles.benefit} key={title}><Icon name={icon} /><div><h2>{title}</h2><p>{text}</p></div></div>)}</div></div>

    <section id="capabilities" className={styles.capabilities} aria-labelledby="capabilities-heading"><div className="container">
      <div className={styles.capabilityHeading}><span className={styles.sectionLabel}>Our Corporate & Commercial Capabilities</span><h2 id="capabilities-heading">A Comprehensive Suite for Every Stage of Your Business</h2><p>We provide integrated legal, regulatory and strategic support to businesses of all sizes, including startups, SMEs and large enterprises, helping them navigate complex commercial environments with clarity and confidence.</p></div>
      <div className={styles.cardGrid}>{capabilities.map(([title, description, path, image]) => <Link href={`/services/${path}`} className={styles.card} key={path}><div className={styles.cardImage}><Image src={`/${image}`} alt="" fill sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div><div className={styles.cardBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></Link>)}</div>
    </div></section>

    <section className={styles.approachSection} aria-labelledby="approach-heading"><div className="container"><div className={styles.approachHeading}><span className={styles.sectionLabel}>Our Approach</span><h2 id="approach-heading">From Insight to Impact</h2><p>A structured and collaborative process to deliver practical, business-focused solutions.</p></div><ol className={styles.process}>{approach.map(([title, text], i) => <li key={title}><span className={styles.step}>{String(i + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

    <section className={styles.industriesSection} aria-labelledby="industries-heading"><div className="container"><div className={styles.sectionHeading}><span className={styles.sectionLabel}>Industries We Serve</span><h2 id="industries-heading">Sector-focused Expertise</h2><p>Commercial perspective shaped around the realities of your sector.</p><TextLink href="/industries">Explore All Industries</TextLink></div><div className={styles.industryGrid}>{[industries[0], industries[1], industries[3], industries[5], industries[4], industries[2]].map(s => <Link href={`/industries/${s.slug}`} key={s.slug}><div className={styles.industryImage}><Image src={s.image} alt="" fill sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 16vw" /></div><h3>{s.title}</h3></Link>)}</div></div></section>

    <section className={styles.relatedSection} aria-labelledby="related-heading"><div className="container"><div className={styles.sectionHeading}><span className={styles.sectionLabel}>Related Services</span><h2 id="related-heading">Explore Connected Expertise</h2><p>Extend your advisory support with complementary legal, regulatory and business capabilities.</p></div><div className={styles.related}>{related.map(([title, path], i) => <Link href={`/services/${path}`} className={styles.relatedCard} key={path}><span className={styles.relatedNumber}>0{i + 1}</span><span><strong>{title}</strong><small>Explore service</small></span><Icon name="arrow" /></Link>)}</div><Link href="/services" className={styles.exploreButton}>Explore More Services <Icon name="arrow" /></Link></div></section>

    <section className={styles.insights} aria-labelledby="insights-heading"><div className="container"><div className={styles.sectionTop}><div><span className={styles.sectionLabel}>Insights & Events</span><h2 id="insights-heading">Latest Perspectives</h2></div><TextLink href="/insights">View All Insights</TextLink></div><div className={styles.insightGrid}>{corporateArticles.map(article => <Link href={`/insights/${article.slug}`} className={styles.insightCard} key={article.slug}><div className={styles.cardImage}><Image src={article.image} alt="" fill sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div><div className={styles.insightBody}><span className={styles.category}>{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p><span className={styles.textLink}>Read Article<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section className={styles.professionals} aria-labelledby="professionals-heading"><div className="container"><div className={styles.sectionTop}><div><span className={styles.sectionLabel}>Our Professionals</span><h2 id="professionals-heading">Meet Our Experts</h2></div><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.professionalGrid}>{professionals.map(p => <Link href={`/professionals/${p.slug}`} className={styles.professionalCard} key={p.slug}><div className={styles.portrait}><Image src={p.image} alt={p.name} fill sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div><div className={styles.profileBody}><h3>{p.name}</h3><span className={styles.role}>{p.role}</span><p>{p.expertise}</p><span className={styles.textLink}>View Profile<Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section className={styles.cta} aria-labelledby="contact-heading"><Image src="/Real Estate & Construction .png" alt="" fill sizes="100vw" /><div className={`container ${styles.ctaInner}`}><div><h2 id="contact-heading">Let’s Build What’s Next, Together.</h2><p>Connect with our team for strategic legal and business solutions.</p></div><div className={styles.ctaActions}><Action>Speak to an Advisor</Action><Action outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
