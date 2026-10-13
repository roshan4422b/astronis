import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { practicePath, type ServicePractice, type DetailedServiceGroup } from "@/data/service-detail-types";
import Breadcrumbs from "./breadcrumbs";
import { services } from "@/data/services";
import styles from "./service-template.module.css";

export function ServiceButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`${styles.button} ${secondary ? styles.secondary : ""}`}>{children}<Icon name="arrow" /></Link>;
}

const lifecycleIcons: Record<string, string> = {
  "Start Business": "building",
  Structure: "document",
  "Raise Capital": "chart",
  Transact: "handshake",
  Govern: "shield",
  Restructure: "scale",
  Scale: "rocket",
  Plan: "file",
  Launch: "building",
  Grow: "chart",
  Transform: "gear",
  Expand: "globe",
  Assess: "file",
  Review: "document",
  Comply: "shield",
  Document: "document",
  Respond: "message",
  Support: "people",
  Operate: "globe",
  Monitor: "chart",
  Protect: "shield",
  Manage: "people",
  Commercialise: "chart",
  Enforce: "scale",
  Approve: "shield",
  Report: "document",
  Design: "gear",
  Contract: "document",
  Governance: "shield",
};

export default function ServiceHero({ practice, group, title }: { practice: ServicePractice; group?: DetailedServiceGroup; title?: string }) {
  return <section className={`${styles.hero} ${group ? styles.detailHero : ""}`} style={!group ? { "--service-hero-image": `url("${practice.heroImage}")` } as React.CSSProperties : undefined}>
    {group && <Image src={group.image} alt="" fill preload sizes="100vw" className={styles.heroImage} />}
    <div className="container">
      <Breadcrumbs items={[{title:"Home",href:"/"},{title:"Services",href:"/services"},{title:practice.title,...(group ? {href:practicePath(practice)} : {})},...(group ? [{title:group.title,href:`${practicePath(practice)}#${services.find(service => service.canonicalSlug === practice.slug)?.subServices.find(item => item.slug === group.slug)?.slug || group.slug}`}] : [])]} />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{group ? practice.title : practice.heroEyebrow || "STRUCTURE. DIRECTION. CONTINUITY."}</span>
          <h1>{group?.title || title || practice.title}</h1>
          {!group && <p className={styles.heroStatement}>{practice.heroStatement}</p>}
          <p>{group?.description || practice.description}</p>
          <div className={styles.actions}><ServiceButton href="#enquiry">Speak With an Advisor</ServiceButton><ServiceButton href={group ? `#${group.children[0].slug}` : "#service-groups"} secondary>{group ? "Explore Services" : "Explore Our Capabilities"}</ServiceButton></div>
        </div>
        {!group && <div className={styles.lifecycle} aria-label="Business lifecycle">
          <div className={styles.lifecycleHeading}><span>THE BUSINESS LIFECYCLE</span><strong>Connected decisions.<br /><em>Lasting foundations.</em></strong></div>
          <ol>{practice.lifecycle.map((stage) => {
            const iconName = lifecycleIcons[stage] || "globe";
            return <li key={stage}><span className={styles.lifecycleIcon}><Icon name={iconName} /></span><strong>{stage}</strong></li>;
          })}</ol>
          <p>One advisory perspective, through every stage.</p>
        </div>}
      </div>
    </div>
  </section>;
}
