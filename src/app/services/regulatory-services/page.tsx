import Link from "next/link";
import Icon from "@/app/_components/icon";
import SectionNavigation from "@/app/services/_template/section-navigation";
import ServiceHero from "@/app/services/_template/service-hero";
import { regulatoryServices } from "@/data/regulatory-practice";
import { groupPath } from "@/data/service-detail-types";
import styles from "./page.module.css";

const conciseCardSummary = (text: string) => {
  const compact = text.replace(/\s+/g, " ").trim();
  const firstSentence = compact.split(". ")[0]?.replace(/\.$/, "") || compact;

  if (firstSentence.length <= 120) return firstSentence;

  return `${firstSentence.split(" ").slice(0, 16).join(" ")}...`;
};

export const metadata = {
  title: "Regulatory Services | Astronis",
  description:
    "Astronis helps organisations understand and manage corporate, financial and sector-specific regulatory obligations, connecting statutory compliance, approvals and reporting with practical support for evolving business requirements.",
  alternates: { canonical: "/services/regulatory-services" },
  openGraph: { title: "Regulatory Services | Astronis", url: "/services/regulatory-services", type: "website" },
};

export default function RegulatoryServicesPage() {
  return (
    <main className={styles.page}>
      <ServiceHero practice={regulatoryServices} />

      <SectionNavigation
        variant="bar"
        showItemNumbers={false}
        title="Explore our capabilities"
        items={regulatoryServices.groups.map((group) => ({
          id: group.slug,
          title: group.shortTitle || group.title,
          icon: group.icon,
          description: group.description,
          children: group.children.map((child) => ({
            title: child.title,
            url: `${groupPath(regulatoryServices, group)}/${child.slug}`,
          })),
        }))}
      />

      <section className={styles.serviceDirectory} id="service-groups">
        {regulatoryServices.groups.map((group, index) => (
          <article
            className={`${styles.categorySection} ${index % 2 === 0 ? styles.lightCategory : styles.darkCategory}`}
            key={group.slug}
            id={group.slug}
          >
            <div className={styles.categoryInner}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionMeta}>
                  <span className={styles.sectionLabel}>OUR SERVICES</span>
                  <h2>
                    <span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>
                    {group.title}
                  </h2>
                  <span className={styles.sectionAccent} aria-hidden="true" />
                  <p className={styles.categoryDescription}>{group.description}</p>
                </div>
                <div className={styles.iconBadge} aria-hidden="true">
                  <Icon name={group.icon} className={styles.icon} />
                </div>
              </div>

              <div className={styles.cardGrid}>
                {group.children.map((child) => (
                  (() => {
                    const summary = child.paragraphs?.[0] ?? `Explore regulatory support for ${child.title.toLowerCase()}.`;

                    return (
                      <Link
                        href={`${groupPath(regulatoryServices, group)}/${child.slug}`}
                        key={child.slug}
                        className={styles.serviceCard}
                        aria-label={`${child.title}. ${summary}`}
                      >
                        <span className={styles.cardIcon} aria-hidden="true">
                          <Icon name={group.icon} className={styles.cardIconGraphic} />
                        </span>
                        <span className={styles.cardLink}>
                          Explore Service
                          <span className={styles.cardArrow} aria-hidden="true">→</span>
                        </span>
                        <h3>{child.title}</h3>
                        <p>{conciseCardSummary(summary)}</p>
                      </Link>
                    );
                  })()
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
              <span className={styles.eyebrow}>NEED GUIDANCE?</span>
              <h2>Need a Clearer Route Through Compliance and Regulation?</h2>
            </div>
            <p>
              Tell us about your organisation, jurisdiction, product, process or
              approval requirement. We can help identify the right regulatory
              pathway and next step.
            </p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryAction}>
                Discuss Your Requirement
              </Link>
              <Link href="/professionals" className={styles.secondaryActionLight}>
                Meet Our Professionals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
