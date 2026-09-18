import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { professionals } from "../leadership";
import AdvisorDirectory from "./advisor-directory";
import styles from "../advisory-professionals.module.css";

export const metadata = {
  title: "Business & Financial Advisors",
  description: "Explore Astronis Global's business and financial advisory capabilities and connect with our published advisory professionals.",
};

const advisorProfiles = professionals.filter((person) => person.slug !== "priti-mishra");

const expertise = [
  ["chart", "Business Strategy & Planning", "/services/business-advisory-and-consulting"],
  ["building", "Financial Advisory & Restructuring", "/services/banking-nbfc-and-financial-services-advisory"],
  ["handshake", "M&A Advisory", "/services/corporate-and-commercial-advisory"],
  ["file", "Valuation & Financial Modelling", "/services/business-advisory-and-consulting"],
  ["people", "Fundraising & Investor Connect", "/services/startup-and-investment-advisory"],
  ["bulb", "Startups & Growth Advisory", "/services/startup-and-investment-advisory"],
  ["shield", "Risk Advisory & Forensics", "/services/risk-governance-and-forensic-advisory"],
  ["globe", "ESG & Sustainable Finance", "/services/esg-and-sustainability-advisory"],
] as const;

const audiences = [
  ["bulb", "Startups & Emerging Businesses"], ["building", "Growing Enterprises"],
  ["people", "Family Businesses"], ["chart", "Investors & Venture Funds"],
  ["building", "Corporate Groups"], ["file", "PE / VC Funds"],
  ["shield", "Financial Institutions"], ["globe", "Global Businesses"],
] as const;

const industries = [
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Healthcare & Life Sciences", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Banking & Financial Services", "financial-services", "/Banking & Financial Services .png"],
  ["E-commerce & Consumer", "e-commerce", "/Retail & E-Commerce .png"],
] as const;

export default function BusinessFinancialAdvisorsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="business-title"><Image src="/business-financial-hero.png" alt="" fill preload sizes="100vw" /><div className={styles.heroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Business & Financial Advisors</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>Business & Financial Advisors</span><h1 id="business-title">Ideas to Execution.<br />Value for Tomorrow.</h1><p>Our business and financial advisory professionals work with businesses, investors and entrepreneurs to create value, manage risk and support sustainable growth.</p><div className={styles.heroActions}><a className={styles.primaryButton} href="#find">Find a Professional <Icon name="arrow" /></a><Link className={styles.outlineButton} href="/services/business-advisory-and-consulting">Our Advisory Services</Link></div></div><a className={styles.heroNote} href="#expertise"><Icon name="chart" /><span>Strategy<br />Capital<br />Growth<br />Opportunity</span><small>Explore our expertise <Icon name="arrow" /></small></a></div></section>

    <div className={styles.wrap}><AdvisorDirectory people={advisorProfiles} />
      <section className={styles.expertiseSection} id="expertise" aria-labelledby="expertise-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our advisory expertise</span><h2 id="expertise-title">From strategy to sustainable growth</h2></div><Link href="/services">View All Services <Icon name="arrow" /></Link></div><div className={styles.expertiseGrid}>{expertise.map(([icon,title,href]) => <Link href={href} key={title}><Icon name={icon} /><strong>{title}</strong></Link>)}</div></section>

      <section className={styles.advisorySection} aria-labelledby="advisory-title"><div className={styles.advisoryImage}><Image src="/business-financial-advisory.png" alt="Business advisors reviewing financial charts" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div className={styles.advisoryCopy}><span className={styles.eyebrow}>Practical perspective</span><h2 id="advisory-title">Helping Businesses Make Informed Decisions.</h2><p>We support businesses through structuring, growth, transactions and strategic partnerships with practical, data-informed and commercially grounded advice.</p><Link className={styles.primaryButton} href="/about/our-methodology">Our Approach <Icon name="arrow" /></Link></div></section>

      <section className={styles.audienceSection} aria-labelledby="audience-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Who we work with</span><h2 id="audience-title">Advice shaped around your ambitions</h2></div></div><div className={styles.audienceGrid}>{audiences.map(([icon,title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div></section>

      <section className={styles.industriesSection} aria-labelledby="industries-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Sector perspective</span><h2 id="industries-title">Industries We Serve</h2></div><Link href="/industries">View All Industries <Icon name="arrow" /></Link></div><div className={styles.industryGrid}>{industries.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>

      <div className={styles.lowerGrid}><section className={styles.globalCard} aria-labelledby="global-title"><Icon name="globe" /><div><span className={styles.eyebrow}>Global perspective</span><h2 id="global-title">Growth Across Borders</h2><p>Explore cross-border investments, market entry, strategic alliances and international expansion with support from our professional network.</p><Link href="/professionals/international-network">Explore Global Network <Icon name="arrow" /></Link></div></section><section className={styles.standardsCard} aria-labelledby="standards-title"><h2 id="standards-title">Our Professional Standards</h2><div>{["Integrity & independence","Confidentiality","Client-focused solutions","Commercial practicality","Responsible advice","Long-term partnerships"].map((item) => <span key={item}><Icon name="shield" />{item}</span>)}</div></section></div>

      <section className={styles.insightsSection} aria-labelledby="insights-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Ideas and updates</span><h2 id="insights-title">Insights from Our Advisors</h2></div><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div><div className={styles.insightsGrid}><Link href="/insights"><span>BUSINESS PERSPECTIVE</span><h3>Plan the next stage of growth with greater clarity.</h3><small>Explore practical ideas and updates</small></Link><Link href="/insights"><span>FINANCIAL ADVISORY</span><h3>Connect financial decisions to business goals.</h3><small>Perspectives on planning and risk</small></Link><Link href="/professionals/enquiry"><span>CONNECT WITH US</span><h3>Bring your next question to our team.</h3><small>Find the right advisory perspective</small></Link></div></section>
    </div>
    <section className={styles.cta}><div className={styles.wrap}><div><h2>Ready to Discuss Your Business or Financial Goals?</h2><p>Connect with our advisory professionals for a confidential discussion.</p><div><a href="#find">Find a Professional <Icon name="arrow" /></a><Link href="/professionals/enquiry">Speak to an Advisor <Icon name="arrow" /></Link><Link href="/professionals/enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div><span>Ideas<br />Capital<br />Execution<br />Growth</span></div></section>
  </div>;
}
