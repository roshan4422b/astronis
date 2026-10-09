import Link from "next/link";
import Icon from "@/app/_components/icon";
import { intellectualProperty } from "@/data/service-practices";
import { groupPath } from "@/data/service-detail-types";
import SectionNavigation from "@/app/services/_template/section-navigation";
import ServiceHero from "@/app/services/_template/service-hero";
import styles from "../corporate-commercial-advisory/page.module.css";

export const metadata = {
  title: intellectualProperty.seoTitle,
  description: intellectualProperty.description,
};

const directory = intellectualProperty.groups.map((group) => ({
  category: group.title,
  categorySlug: group.slug,
  categoryDescription: group.description,
  icon: group.icon,
  children: group.children.map((child) => ({
    name: child.title,
    slug: child.slug,
    description: child.paragraphs[0],
    url: `${groupPath(intellectualProperty, group)}#${child.slug}`,
  })),
}));

export default function IntellectualPropertyPage() {
  return (
    <main className={styles.page}>
      <ServiceHero practice={intellectualProperty} hideBadges hideStageNumbers />

      <SectionNavigation
        variant="bar"
        showItemNumbers={false}
        title="Explore our capabilities"
        items={directory.map((category) => ({
          id: category.categorySlug,
          title: intellectualProperty.groups.find((group) => group.slug === category.categorySlug)?.shortTitle || category.category,
          href: `#${category.categorySlug}`,
          icon: category.icon,
          description: category.categoryDescription,
          children: category.children.map((child) => ({ title: child.name, url: child.url })),
        }))}
      />

      <section className={styles.serviceDirectory} id="service-groups">
        <div className="container">
          <div className={styles.sectionIntro}>
            <span className={styles.eyebrowDark}>SERVICE DIRECTORY</span>
            <h2>Our Intellectual Property Services</h2>
            <p>Protect, manage and commercialise the ideas, brands and innovations that create business value.</p>
          </div>
        </div>

        {directory.map((category, index) => (
          <article
            className={`${styles.categorySection} ${index % 2 === 0 ? styles.lightCategory : styles.darkCategory}`}
            key={category.categorySlug}
            id={category.categorySlug}
          >
            <div className={styles.categoryInner}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionMeta}>
                  <span className={styles.sectionLabel}>OUR SERVICES</span>
                  <h2>{category.category}</h2>
                  <span className={styles.sectionAccent} aria-hidden="true" />
                  <p className={styles.categoryDescription}>{category.categoryDescription}</p>
                </div>
                <div className={styles.iconBadge} aria-hidden="true"><Icon name={category.icon} className={styles.icon} /></div>
              </div>

              <div className={styles.cardGrid}>
                {category.children.map((child) => (
                  <Link href={child.url} key={child.slug} className={styles.serviceCard} aria-label={`${child.name}. ${child.description}`}>
                    <span className={styles.cardIcon} aria-hidden="true"><Icon name={category.icon} className={styles.cardIconGraphic} /></span>
                    <span className={styles.cardLink}>Explore Service<span className={styles.cardArrow} aria-hidden="true">→</span></span>
                    <h3>{child.name}</h3>
                    <p>{child.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.bottomCta} id="enquiry">
        <div className="container">
          <div className={styles.bottomCtaInner}>
            <div className={styles.bottomCtaCopy}>
              <span className={styles.eyebrow}>PROTECT YOUR BUSINESS ASSETS</span>
              <h2>{intellectualProperty.finalHeading}</h2>
            </div>
            <p>{intellectualProperty.finalDescription}</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryAction}>Discuss Your Requirement</Link>
              <Link href="/professionals" className={styles.secondaryActionLight}>Meet Our Professionals</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
