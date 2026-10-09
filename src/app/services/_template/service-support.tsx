import Link from "next/link";
import AssetImage from "../../_components/asset-image";
import { services } from "@/data/services";
import { groupPath, practicePath, type ServicePractice, type DetailedServiceGroup } from "@/data/service-detail-types";
import ServiceEnquiryForm from "@/components/forms/ServiceEnquiryForm";
import RelatedInsights from "../related-insights";
import hub from "../hub.module.css";
import { ServiceButton } from "./service-hero";
import styles from "./service-template.module.css";
import ServiceExperts from "./service-experts";

export function RelatedServices({ practice, group }: { practice: ServicePractice; group?: DetailedServiceGroup }) {
  const related = group
    ? practice.groups.filter(item => item.slug !== group.slug).slice(0,3).map(item => ({title:item.title, image:item.image, href:groupPath(practice,item)}))
    : services.filter(item => practice.relatedSlugs.includes(item.slug)).map(item => ({title:item.title, image:item.image, href:`/services/${item.canonicalSlug}`}));
  return <section className={styles.supportSection}><div className="container"><span className={styles.label}>THE WIDER PERSPECTIVE</span><h2>Related Services</h2><div className={styles.relatedCards}>{related.map(item => <Link key={item.href} href={item.href} className={styles.relatedCard}><span className={styles.relatedCardImage}><AssetImage src={item.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw" /></span><span className={styles.relatedCardContent}><span className={styles.relatedCardTop}>RELATED SERVICE</span><h3>{item.title}</h3><span className={styles.relatedCardAction}>Explore Service <span aria-hidden="true">→</span></span></span></Link>)}</div></div></section>;
}

export function KnowledgeCentreBlock({ practice }: { practice: ServicePractice }) {
  return <section className={styles.knowledge}><div className={`container ${styles.knowledgeGrid}`}><div><span className={styles.eyebrow}>INFORMATION THAT SUPPORTS ACTION</span><h2>{practice.knowledgeTitle}</h2><p>Practical reading and resources to prepare for your next business decision.</p><ServiceButton href="/knowledge-centre" secondary>{practice.knowledgeCTA || "Explore Knowledge Centre"}</ServiceButton></div><div className={styles.resourceLinks}>{(practice.knowledgeLinks?.map(item => [item.title,item.href]) || [["Guides","/resources/business-guides"],["Regulatory Updates","/insights/legal-updates"],["FAQs","/faqs"],["Checklists","/resources/compliance-checklists"],["Articles","/insights/articles"],["Templates / Resources","/resources/downloads"]]).map(([title,href],index) => <Link key={title} href={href}><span>0{index+1}</span>{title}<span aria-hidden="true">↗</span></Link>)}</div></div></section>;
}

export function ServiceEnquiryCTA({ practice, group }: { practice: ServicePractice; group?: DetailedServiceGroup }) {
  return <section id="enquiry" className={styles.enquiry}><div className={`container ${styles.enquiryGrid}`}><div><span className={styles.label}>LET’S DISCUSS THE NEXT STEP</span><h2>{practice.enquiryHeading}</h2><p>Tell us about your business requirement and our advisory team will help identify the appropriate service.</p>{group && <div className={styles.selectedGroup}><span>YOUR AREA OF INTEREST</span><strong>{group.title}</strong></div>}<ol className={styles.enquirySteps}><li><strong>Share your context</strong><span>Your objectives, business stage and priorities.</span></li><li><strong>Connect the right expertise</strong><span>A practice and service group aligned with your enquiry.</span></li><li><strong>Plan the next conversation</strong><span>Discuss the scope, available records and next steps.</span></li></ol><Link href="/contact">Contact our team <span aria-hidden="true">↗</span></Link></div><ServiceEnquiryForm key={group?.slug || practice.slug} defaultService={practice.title} defaultRequirement={group?.title} /></div></section>;
}

export function ServiceFinalCTA({ practice }: { practice: ServicePractice }) {
  return <section className={styles.final}><div className="container"><span className={styles.eyebrow}>A CLEARER PATH FORWARD</span><h2>{practice.finalHeading}</h2><p>{practice.finalDescription}</p>{practice.finalSecondaryCTA ? <div className={`${styles.actions} ${styles.finalActions}`}><ServiceButton href="#enquiry">Speak With an Advisor</ServiceButton><ServiceButton href="#enquiry" secondary>{practice.finalSecondaryCTA}</ServiceButton></div> : <ServiceButton href="#enquiry">Speak With an Advisor</ServiceButton>}</div></section>;
}

export function GroupPagination({ practice, group }: { practice: ServicePractice; group: DetailedServiceGroup }) {
  const index = practice.groups.findIndex(item => item.slug === group.slug);
  const previous = practice.groups[index-1];
  const next = practice.groups[index+1];
  return <nav className={styles.pagination} aria-label="Service group navigation"><Link href={practicePath(practice)} className={styles.backLink}>← {practice.title}</Link><div>{previous && <Link href={groupPath(practice,previous)}><small>PREVIOUS SERVICE GROUP</small><span>← {previous.title}</span></Link>}{next && <Link href={groupPath(practice,next)}><small>NEXT SERVICE GROUP</small><span>{next.title} →</span></Link>}</div></nav>;
}

export default function ServiceSupport({ practice, group, hideFinalCTA = false }: { practice: ServicePractice; group?: DetailedServiceGroup; hideFinalCTA?: boolean }) {
  return <><ServiceExperts practice={practice} /><RelatedServices practice={practice} group={group} /><div className={hub.page}><RelatedInsights {...(practice.visual === "regulatory" ? {title:"Regulatory Insights",articles:[]} : {})} /></div><KnowledgeCentreBlock practice={practice} /><ServiceEnquiryCTA practice={practice} group={group} />{!hideFinalCTA && <ServiceFinalCTA practice={practice} />}</>;
}
