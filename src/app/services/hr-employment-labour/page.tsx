import Link from "next/link";
import Icon from "@/app/_components/icon";
import { hrEmploymentLabour } from "@/data/service-practices";
import { groupPath } from "@/data/service-detail-types";
import ServiceHero from "@/app/services/_template/service-hero";
import ServiceSupport from "@/app/services/_template/service-support";
import styles from "../corporate-commercial-advisory/page.module.css";

export const metadata = {
  title: "HR, Employment & Labour Advisory Services | Astronis",
  description: hrEmploymentLabour.description,
};

const directory = hrEmploymentLabour.groups.map((group) => ({
  category: group.title,
  categorySlug: group.slug,
  categoryDescription: group.description,
  icon: group.icon,
  children: group.children.map((child) => ({
    name: child.title,
    slug: child.slug,
    description: child.paragraphs[0],
    url: groupPath(hrEmploymentLabour, group),
  })),
}));

export default function HrEmploymentLabourPage() {
  return (
    <main className={styles.page} data-theme="hr">
      <ServiceHero practice={hrEmploymentLabour} hideBadges hideStageNumbers theme="hr" />

      <section className={styles.serviceDirectory} id="service-groups">
        <article className={`${styles.categorySection} ${styles.lightCategory}`}>
          <div className={styles.categoryInner}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionLabel}>OUR SERVICES</span>
                <h2>Employment, HR &amp; Workplace Support</h2>
                <span className={styles.sectionAccent} aria-hidden="true" />
                <p className={styles.categoryDescription}>Explore advisory across employment, HR policies, labour compliance, employee relations, workplace matters and statutory coordination.</p>
              </div>
              <div className={styles.iconBadge} aria-hidden="true"><Icon name="people" className={styles.icon} /></div>
            </div>

            <div className={styles.cardGrid}>
              {directory.flatMap((category) => category.children.map((child) => (
                <Link href={child.url} key={child.slug} className={styles.serviceCard} aria-label={`${child.name}. ${child.description}`}>
                  <span className={styles.cardIcon} aria-hidden="true"><Icon name={category.icon} className={styles.cardIconGraphic} /></span>
                  <span className={styles.cardLink}>Explore Service<span className={styles.cardArrow} aria-hidden="true">→</span></span>
                  <h3>{child.name}</h3>
                  <p>{child.description}</p>
                </Link>
              )))}
            </div>
          </div>
        </article>
      </section>

      <ServiceSupport practice={hrEmploymentLabour} />
    </main>
  );
}
