import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { professionals } from "../../professionals/leadership";
import type { ServicePractice } from "@/data/service-detail-types";
import { ServiceButton } from "./service-hero";
import styles from "./service-template.module.css";

export default function ServiceExperts({ practice }: { practice: ServicePractice }) {
  const experts = (practice.expertSlugs || []).flatMap(slug => {
    const person = professionals.find(item => item.slug === slug);
    return person ? [person] : [];
  });
  if (!experts.length) return null;

  return <section className={styles.experts} aria-labelledby="service-experts-heading">
    <div className="container">
      <div className={styles.expertsHeading}>
        <div><span className={styles.eyebrow}>PEOPLE BEHIND THE PERSPECTIVE</span><h2 id="service-experts-heading">Meet Our Experts</h2><p>Connect with our professionals for {practice.title.toLowerCase()} and related legal, regulatory and business matters.</p></div>
        <ServiceButton href="/professionals" secondary>Explore Our Professionals</ServiceButton>
      </div>
      <div className={styles.expertsGrid}>
        {experts.map(person => <article className={styles.expertCard} key={person.slug}>
          <Link href={`/professionals/${person.slug}`} className={styles.expertPhoto} aria-label={`View ${person.name}'s profile`}>
            <Image src={person.image} alt={person.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1000px) 50vw, 33vw" />
            <span className={styles.expertPhotoArrow} aria-hidden="true"><Icon name="arrow" /></span>
          </Link>
          <div className={styles.expertBody}>
            <span className={styles.expertRole}>{person.role}</span>
            <h3><Link href={`/professionals/${person.slug}`}>{person.name}</Link></h3>
            <p>{person.expertise}</p>
            <div className={styles.expertActions}><Link href={`/professionals/${person.slug}`}>View Profile <Icon name="arrow" /></Link><Link href={`/professionals/enquiry?professional=${person.slug}`} aria-label={`Enquire about working with ${person.name}`}><Icon name="mail" /><span>Enquire</span></Link></div>
          </div>
        </article>)}
      </div>
      <div className={styles.expertsNote}><Icon name="people" /><p>Not sure who to speak with? Tell us about your matter and we’ll help identify the appropriate professional.</p><Link href="#enquiry">Discuss Your Requirement <Icon name="arrow" /></Link></div>
    </div>
  </section>;
}
