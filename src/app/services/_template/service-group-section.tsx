import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { groupPath, type ServicePractice, type DetailedServiceGroup } from "@/data/service-detail-types";
import { ServiceButton } from "./service-hero";
import styles from "./service-template.module.css";

export function ChildServiceList({ practice, group }: { practice: ServicePractice; group: DetailedServiceGroup }) {
  if (group.children.length <= 1) {
    return null;
  }

  return <div className={styles.childList}><div className={styles.listHeading}><span>EXPLORE THIS PRACTICE</span><span>{group.children.length} services</span></div><ol>{group.children.map((child, index) => <li key={child.slug}><Link href={`${groupPath(practice, group)}#${child.slug}`}><span className={styles.rowMarker} aria-hidden="true"><Icon name={group.icon} /><small>{String(index + 1).padStart(2,"0")}</small></span><span>{child.title}</span><Icon name="arrow" /></Link></li>)}</ol></div>;
}

export default function ServiceGroupSection({ practice, group, index }: { practice: ServicePractice; group: DetailedServiceGroup; index: number }) {
  const hasChildList = group.children.length > 1;
  return <section id={group.slug} className={`${styles.groupSection} ${hasChildList ? "" : styles.groupSectionSingle} ${index % 2 ? styles.reverse : ""} ${index === (practice.darkGroupIndex ?? 3) ? styles.darkSection : ""}`} aria-labelledby={`${group.slug}-heading`}>
    <div className={`container ${styles.groupGrid} ${hasChildList ? "" : styles.groupGridSingle}`}>
      <div className={styles.groupCopy}><div className={styles.groupMeta}><span className={styles.groupNumber}>{String(index + 1).padStart(2,"0")} <span>/ {String(practice.groups.length).padStart(2,"0")}</span></span><div className={styles.groupIcon}><Icon name={group.icon} /></div></div><h2 id={`${group.slug}-heading`} tabIndex={-1}>{group.title}</h2><p className={styles.groupDescription}>{group.description}</p><p>{group.introduction}</p><ServiceButton href={groupPath(practice,group)}>{group.cta}</ServiceButton><div className={styles.groupImage}><Image src={group.image} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" /></div></div>
      {hasChildList && <ChildServiceList practice={practice} group={group} />}
    </div>
  </section>;
}
