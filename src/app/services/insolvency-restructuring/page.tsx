import Link from "next/link";
import Icon from "@/app/_components/icon";
import { groupPath, practicePath } from "@/data/service-detail-types";
import { insolvencyRestructuring } from "@/data/service-practices";
import SectionNavigation from "@/app/services/_template/section-navigation";
import ServiceHero from "@/app/services/_template/service-hero";
import ServiceSupport from "@/app/services/_template/service-support";
import styles from "../corporate-commercial-advisory/page.module.css";

const categories = [
  {
    id: "insolvency-framework-process",
    title: "Insolvency Framework & Proceedings",
    description: "Strategic guidance on IBC matters, the Corporate Insolvency Resolution Process and tribunal proceedings, grounded in stakeholder positions and the practical resolution options available.",
    icon: "scale",
    services: ["ibc-advisory", "cirp-related-advisory", "nclt-nclat-proceedings"],
  },
  {
    id: "stakeholder-resolution-planning",
    title: "Stakeholder & Resolution Advisory",
    description: "Support for creditors, debtors and stakeholders assessing financial distress, coordinating interests and planning a viable resolution path.",
    icon: "people",
    services: ["creditor-advisory", "debtor-advisory", "resolution-planning-support"],
  },
  {
    id: "restructuring-distressed-business",
    title: "Restructuring & Distressed Businesses",
    description: "Advice on strategic options, debt restructuring, distressed business conditions and orderly liquidation or closure where required.",
    icon: "chart",
    services: ["insolvency-strategy", "debt-restructuring", "distressed-business-advisory", "liquidation-closure-support"],
  },
].map((category) => ({
  ...category,
  children: category.services.flatMap((slug) => {
    const group = insolvencyRestructuring.groups.find((item) => item.slug === slug);
    return group ? [{
      slug: group.slug,
      name: group.shortTitle,
      description: group.description,
      url: groupPath(insolvencyRestructuring, group),
    }] : [];
  }),
}));

export const metadata = {
  title: insolvencyRestructuring.seoTitle,
  description: insolvencyRestructuring.description,
  alternates: { canonical: practicePath(insolvencyRestructuring) },
};

export default function InsolvencyRestructuringPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: insolvencyRestructuring.title, path: practicePath(insolvencyRestructuring) },
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://www.astronisglobal.com${crumb.path}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      <main className={styles.page} data-theme="insolvency">
        <ServiceHero practice={insolvencyRestructuring} theme="insolvency" />

        <SectionNavigation
          variant="bar"
          showItemNumbers={false}
          title="Explore our capabilities"
          theme="insolvency"
          items={categories.map((category) => ({
            id: category.id,
            title: category.title,
            href: `#${category.id}`,
            icon: category.icon,
            description: category.description,
            children: category.children.map((child) => ({ title: child.name, url: child.url })),
          }))}
        />

        <section className={styles.serviceDirectory} id="service-groups">
          <div className="container">
            <div className={styles.sectionIntro}>
              <span className={styles.eyebrowDark}>SERVICE DIRECTORY</span>
              <h2>Insolvency &amp; Restructuring Services</h2>
              <p>Strategic advisory for businesses, creditors, debtors, lenders, promoters, investors and other stakeholders navigating financial distress and resolution.</p>
            </div>
          </div>

          {categories.map((category, index) => (
            <article
              className={`${styles.categorySection} ${index % 2 === 0 ? styles.lightCategory : styles.darkCategory}`}
              key={category.id}
              id={category.id}
            >
              <div className={styles.categoryInner}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionMeta}>
                    <span className={styles.sectionLabel}>OUR SERVICES</span>
                    <h2>{category.title}</h2>
                    <span className={styles.sectionAccent} aria-hidden="true" />
                    <p className={styles.categoryDescription}>{category.description}</p>
                  </div>
                  <div className={styles.iconBadge} aria-hidden="true"><Icon name={category.icon} className={styles.icon} /></div>
                </div>

                <div className={styles.cardGrid}>
                  {category.children.map((child) => (
                    <Link href={child.url} key={child.slug} className={styles.serviceCard} aria-label={`${child.name}. ${child.description}`}>
                      <span className={styles.cardIcon} aria-hidden="true"><Icon name={category.icon} className={styles.cardIconGraphic} /></span>
                      <span className={styles.cardLink}>Explore Service <span className={styles.cardArrow} aria-hidden="true">→</span></span>
                      <h3>{child.name}</h3>
                      <p>{child.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <ServiceSupport practice={insolvencyRestructuring} hideFinalCTA />

        <section className={styles.bottomCta} id="insolvency-final-cta">
          <div className="container">
            <div className={styles.bottomCtaInner}>
              <div className={styles.bottomCtaCopy}>
                <span className={styles.eyebrow}>NEED GUIDANCE?</span>
                <h2>{insolvencyRestructuring.finalHeading}</h2>
              </div>
              <p>{insolvencyRestructuring.finalDescription}</p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.primaryAction}>Discuss Your Requirement</Link>
                <Link href="#enquiry" className={styles.secondaryActionLight}>Submit an Enquiry</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
