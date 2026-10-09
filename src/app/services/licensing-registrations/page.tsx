import Link from "next/link";
import Icon from "@/app/_components/icon";
import { licensingRegistrations } from "@/data/service-practices";
import { groupPath } from "@/data/service-detail-types";
import SectionNavigation from "@/app/services/_template/section-navigation";
import ServiceHero from "@/app/services/_template/service-hero";
import styles from "../corporate-commercial-advisory/page.module.css";

export const metadata = {
  title: "Licensing & Registrations | Astronis",
  description: licensingRegistrations.description,
  alternates: { canonical: "/services/licensing-registrations" },
  openGraph: { title: "Licensing & Registrations | Astronis", url: "/services/licensing-registrations", type: "website" },
};

const directory = licensingRegistrations.groups.map((group) => ({
  category: group.title,
  categorySlug: group.slug,
  categoryDescription: group.description,
  icon: group.icon,
  children: group.children.map((child) => ({
    name: child.title,
    slug: child.slug,
    description: child.paragraphs[0],
    url: `${groupPath(licensingRegistrations, group)}/${child.slug}`,
  })),
}));

export default function LicensingRegistrationsPage() {
  return (
    <main className={styles.page} data-theme="licensing">
      <ServiceHero practice={licensingRegistrations} hideBadges hideStageNumbers theme="licensing" />

      <SectionNavigation
        variant="bar"
        showItemNumbers={false}
        theme="licensing"
        title="Explore our capabilities"
        items={directory.map((category) => ({
          id: category.categorySlug,
          title: licensingRegistrations.groups.find((group) => group.slug === category.categorySlug)?.shortTitle || category.category,
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
            <h2>Our Licensing &amp; Registration Services</h2>
            <p>Registrations, licences and approvals across business operations, food and consumer activity, industrial operations and institutional structures.</p>
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
            <div className={styles.bottomCtaCopy}><span className={styles.eyebrow}>NEED GUIDANCE?</span><h2>Not Sure Which Licence or Registration Applies?</h2></div>
            <p>Tell us about your business activity, product, operations or organisation. Our team can help identify the relevant registration and approval requirements.</p>
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
