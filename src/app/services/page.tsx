import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/content/site";
import ServiceEnquiryForm from "@/components/forms/ServiceEnquiryForm";
import { Action, FinalCTA, ServicesHero, WhyAstronis } from "./hub-sections";
import ServicesExplorer from "./services-explorer";
import RelatedInsights from "./related-insights";
import KnowledgeSection from "./knowledge-section";
import styles from "./hub.module.css";

export const metadata: Metadata = {
  title: { absolute: "Corporate, Legal, Regulatory & Business Advisory Services | Astronis" },
  description: "Explore Astronis advisory services across corporate law, regulatory compliance, business strategy, licensing, intellectual property, FEMA, taxation, banking, technology, risk, ESG and cross-border matters.",
};
function IndustryLinks() {
  return <section className={styles.section}><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>SPECIALIST CONTEXT. CONNECTED ADVICE.</span><h2>Expertise Across Industries</h2></div><Action href="/industries" secondary>Explore Industries</Action></div><p className={styles.lead}>Every sector has its own operating realities. Explore advisory informed by the markets, regulations and business models that shape your industry.</p><div className={styles.industryLinks}>{industries.slice(0, 16).map(industry => <Link href={`/industries/${industry.slug}`} key={industry.slug}>{industry.title}<span aria-hidden="true">↗</span></Link>)}</div></div></section>;
}
function ServiceConsultation() {
  return <section id="consultation" className={`${styles.section} ${styles.consultation}`}><div className={`container ${styles.consultationGrid}`}><div><span className={styles.eyebrow}>START A CONVERSATION</span><h2>Need Guidance on a Specific Business Matter?</h2><p>Tell us what you are looking for and our team will connect you with the appropriate advisory practice.</p><ol className={styles.enquirySteps}><li><strong>01 / Share your context</strong><span>Your business, objectives and current stage.</span></li><li><strong>02 / Identify the right expertise</strong><span>Select a practice and the support you need.</span></li><li><strong>03 / Discuss the next step</strong><span>Our team reviews your enquiry and connects with you.</span></li></ol><Link href="/contact" className={styles.cardAction}>Prefer to speak with us? <span aria-hidden="true">→</span></Link></div><ServiceEnquiryForm /></div></section>;
}
export default function ServicesPage() {
  return <div className={styles.page}><ServicesHero /><ServicesExplorer /><WhyAstronis /><IndustryLinks /><RelatedInsights /><KnowledgeSection /><ServiceConsultation /><FinalCTA /></div>;
}
