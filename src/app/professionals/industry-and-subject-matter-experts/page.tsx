import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { professionals } from "../leadership";
import ExpertDirectory from "./expert-directory";
import styles from "../advisory-professionals.module.css";
import local from "./industry-experts.module.css";

export const metadata = { title: "Industry & Subject-Matter Experts", description: "Explore industry expertise and connect with Astronis Global's published professionals." };

const expertise = [
  ["building", "Manufacturing & Industrial", "manufacturing"], ["building", "Real Estate & Construction", "real-estate-and-construction"],
  ["building", "Infrastructure & Projects", "infrastructure"], ["chart", "Banking & Financial Services", "financial-services"],
  ["shield", "Healthcare & Life Sciences", "healthcare-and-pharma"], ["file", "Pharmaceuticals & Food", "healthcare-and-pharma"],
  ["bulb", "Technology & Emerging Business", "it-and-ites"], ["chart", "Automotive & Mobility", "automotive-and-mobility"],
  ["globe", "Energy & Sustainability", "renewable-energy"],
] as const;
const strengths = [
  ["chart", "Sector-Specific Insight"], ["file", "Regulatory Understanding"], ["shield", "Risk Identification & Mitigation"],
  ["people", "Strategic Decision Support"], ["bulb", "Practical Implementation"], ["globe", "Sustainable Growth"],
] as const;
const industries = [
  ["Manufacturing", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
  ["Healthcare & Life Sciences", "healthcare-and-pharma", "/Healthcare & Pharmaceuticals .png"],
  ["Technology & IT", "it-and-ites", "/Technology, IT & ITES .png"],
  ["Infrastructure & Energy", "infrastructure", "/Infrastructure & Projects .png"],
  ["Startups & Emerging Businesses", "startups", "/Startups & Emerging Businesses .png"],
] as const;

export default function IndustryExpertsPage() {
  return <div className={`${styles.page} ${local.page}`}>
    <section className={styles.hero} aria-labelledby="industry-title"><Image src="/Banner-Infrastructure & Projects .png" alt="" fill preload sizes="100vw" /><div className={styles.heroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Industry & Subject-Matter Experts</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>Industry & Subject-Matter Experts</span><h1 id="industry-title">Industry Insight.<br />Practical Solutions.<br />Real Impact.</h1><p>Our professionals bring legal, regulatory and business perspectives to complex sector challenges and new opportunities.</p><div className={styles.heroActions}><a className={styles.primaryButton} href="#find">Find an Expert <Icon name="arrow" /></a><a className={styles.outlineButton} href="#expertise">Explore Industry Expertise</a></div></div><a className={styles.heroNote} href="#industries"><Icon name="globe" /><span>Sectors<br />Solutions<br />Sustainable Growth</span><small>Explore industries <Icon name="arrow" /></small></a></div></section>

    <div className={styles.wrap}><ExpertDirectory people={professionals} />
      <section className={styles.expertiseSection} id="expertise" aria-labelledby="expertise-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our industry expertise</span><h2 id="expertise-title">Perspectives across key sectors</h2></div><Link href="/industries">View All Industries <Icon name="arrow" /></Link></div><div className={local.expertiseGrid}>{expertise.map(([icon,title,slug]) => <Link href={`/industries/${slug}`} key={title}><Icon name={icon} /><strong>{title}</strong></Link>)}</div></section>

      <section className={styles.advisorySection} aria-labelledby="perspective-title"><div className={styles.advisoryImage}><Image src="/Professional & Business Services .png" alt="Professionals discussing business plans" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div className={styles.advisoryCopy}><span className={styles.eyebrow}>Deeper industry perspective</span><h2 id="perspective-title">Real Sector Knowledge. Actionable Solutions.</h2><p>Every sector has its own operating realities. We connect industry context with practical legal, regulatory and business advice to help you move forward.</p><Link className={styles.primaryButton} href="/about/our-methodology">Our Approach <Icon name="arrow" /></Link></div></section>

      <section className={styles.audienceSection} aria-labelledby="strengths-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Why industry expertise matters</span><h2 id="strengths-title">Insight that helps shape decisions</h2></div></div><div className={local.strengthsGrid}>{strengths.map(([icon,title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div></section>

      <section className={styles.industriesSection} id="industries" aria-labelledby="industries-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Explore our sectors</span><h2 id="industries-title">Industries We Serve</h2></div><Link href="/industries">View All Industries <Icon name="arrow" /></Link></div><div className={styles.industryGrid}>{industries.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 17vw" /></span><strong>{title}</strong></Link>)}</div></section>

      <div className={styles.lowerGrid}><section className={styles.globalCard} aria-labelledby="global-title"><Icon name="globe" /><div><span className={styles.eyebrow}>Connected perspective</span><h2 id="global-title">Global Industry Perspective</h2><p>Explore Indian and international business questions with sector context and support from our professional network.</p><Link href="/professionals/international-network">Explore Global Network <Icon name="arrow" /></Link></div></section><section className={styles.standardsCard} aria-labelledby="collaborate-title"><h2 id="collaborate-title">Work With Our Industry Experts</h2><p className={local.collaborateCopy}>Bring us your sector-specific challenge, project or opportunity. We can connect you with the right professional perspective.</p><Link className={local.collaborateButton} href="/professionals/enquiry">Discuss Your Requirements <Icon name="arrow" /></Link></section></div>

      <section className={styles.insightsSection} aria-labelledby="insights-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Ideas and updates</span><h2 id="insights-title">Insights from Our Experts</h2></div><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div><div className={styles.insightsGrid}><Link href="/insights"><span>INDUSTRY INSIGHT</span><h3>Plan for the obligations that shape your sector.</h3><small>Explore our latest perspectives</small></Link><Link href="/insights"><span>REGULATORY UPDATE</span><h3>Understand change across industries.</h3><small>Read our updates</small></Link><Link href="/professionals/enquiry"><span>CONNECT WITH US</span><h3>Turn industry questions into a practical discussion.</h3><small>Speak with our team</small></Link></div></section>
    </div>
    <section className={styles.cta}><div className={styles.wrap}><div><h2>Let’s Build a Stronger, More Sustainable Tomorrow</h2><p>Connect with our team for practical advice shaped around your industry.</p><div><a href="#find">Find an Expert <Icon name="arrow" /></a><Link href="/professionals/enquiry">Speak to an Advisor <Icon name="arrow" /></Link><Link href="/professionals/enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div><span>People<br />Industry<br />Insight<br />Opportunity</span></div></section>
  </div>;
}
