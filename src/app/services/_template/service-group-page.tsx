import Link from "next/link";
import { practicePath, type DetailedChildService, type DetailedServiceGroup, type ServicePractice } from "@/data/service-detail-types";
import ChildEnquiryLink from "./child-enquiry-link";
import ServiceHero from "./service-hero";
import SectionNavigation from "./section-navigation";
import ServiceSupport, { GroupPagination } from "./service-support";
import styles from "./service-template.module.css";

function ChildServiceSection({ child, index }: { child: DetailedChildService; index: number }) {
  return <section className={styles.childSection} id={child.slug} aria-labelledby={`${child.slug}-heading`}>
    <div className={styles.childHeading}><span>{String(index+1).padStart(2,"0")}</span><h2 id={`${child.slug}-heading`} tabIndex={-1}>{child.title}</h2></div>
    {child.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <div className={styles.coverage}><h3>What this service covers</h3><ul>{child.covers.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul></div>
    <div className={styles.considerations}><div><h3>When businesses typically need it</h3><p>{child.when}</p></div><div><h3>Key considerations</h3><p>{child.considerations}</p></div></div>
    <div className={styles.assistance}><h3>How Astronis can assist</h3><p>{child.assistance}</p><ChildEnquiryLink title={child.title} /></div>
  </section>;
}

export default function ServiceGroupPage({ practice, group }: { practice: ServicePractice; group: DetailedServiceGroup }) {
  return <div className={styles.page} data-service-template>
    <ServiceHero practice={practice} group={group} />
    <div className={`container ${styles.detailLayout}`}>
      <aside className={styles.detailAside}><SectionNavigation title="Services in this category" items={group.children.map(child => ({id:child.slug,title:child.title}))} /><div className={styles.sidebarHelp}><span>LOOKING AT THE BIGGER PICTURE?</span><p>Explore the complete practice and its connected service groups.</p><Link href={practicePath(practice)}>{practice.title} <span aria-hidden="true">↗</span></Link></div></aside>
      <div className={styles.detailContent}>
        <section className={styles.detailIntro}><span className={styles.label}>MAKE AN INFORMED START</span><h2>A clear starting point for your requirements</h2><p>{group.introduction}</p><span className={styles.detailCount}>{group.children.length} services / one connected advisory approach</span></section>
        {group.children.map((child,index) => <ChildServiceSection child={child} index={index} key={child.slug} />)}
        <section className={styles.faq}><span className={styles.label}>BEFORE WE BEGIN</span><h2>Frequently Asked Questions</h2>{group.faqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</section>
        <GroupPagination practice={practice} group={group} />
      </div>
    </div>
    <ServiceSupport practice={practice} group={group} />
  </div>;
}
