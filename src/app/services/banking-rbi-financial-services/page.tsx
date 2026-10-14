import Link from "next/link";
import Icon from "@/app/_components/icon";
import { groupPath } from "@/data/service-detail-types";
import { bankingRbiFinancialServices } from "@/data/service-practices";
import SectionNavigation from "@/app/services/_template/section-navigation";
import ServiceHero from "@/app/services/_template/service-hero";
import ServiceSupport from "@/app/services/_template/service-support";
import styles from "../corporate-commercial-advisory/page.module.css";

const categoryGroups = [
  {
    id: "banking-institutional-finance",
    title: "Banking & Institutional Finance",
    description: "Advice for banking relationships, financing documentation, lending structures, debt arrangements and financial institutions.",
    icon: "building",
    services: ["banking-advisory", "banking-documentation", "loan-security-documentation", "debt-restructuring-advisory", "financial-institution-advisory"],
  },
  {
    id: "rbi-regulated-financial-services",
    title: "RBI & Regulated Financial Services",
    description: "Regulatory and operational support for RBI frameworks, NBFC formation and compliance, and other regulated financial businesses.",
    icon: "shield",
    services: ["rbi-regulatory", "nbfc-formation-licensing-advisory", "nbfc-compliance", "financial-services-regulatory"],
  },
  {
    id: "fintech-payment-systems",
    title: "FinTech & Payment Systems",
    description: "Regulatory mapping and advisory for technology-enabled financial businesses, payment models and transaction infrastructure.",
    icon: "chart",
    services: ["fintech", "payment-systems"],
  },
].map((category) => ({
  ...category,
  children: category.services.flatMap((slug) => {
    const group = bankingRbiFinancialServices.groups.find((item) => item.slug === slug);
    return group ? [{
      slug: group.slug,
      name: group.shortTitle,
      description: group.description,
      url: groupPath(bankingRbiFinancialServices, group),
    }] : [];
  }),
}));

export const metadata = {
  title: bankingRbiFinancialServices.seoTitle,
  description: bankingRbiFinancialServices.description,
};

export default function BankingRbiFinancialServicesPage() {
  return (
    <main className={styles.page} data-theme="banking">
      <ServiceHero practice={bankingRbiFinancialServices} />

      <SectionNavigation
        variant="bar"
        showItemNumbers={false}
        title="Explore our capabilities"
        theme="banking"
        items={categoryGroups.map((category) => ({
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
            <h2>Banking, RBI &amp; Financial Services</h2>
            <p>Connected advisory across banking, regulation, financial institutions, technology-enabled finance and lending documentation.</p>
          </div>
        </div>

        {categoryGroups.map((category, index) => (
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

      <ServiceSupport practice={bankingRbiFinancialServices} hideFinalCTA />

      <section className={styles.bottomCta} id="banking-final-cta">
        <div className="container">
          <div className={styles.bottomCtaInner}>
            <div className={styles.bottomCtaCopy}>
              <span className={styles.eyebrow}>NEED GUIDANCE?</span>
              <h2>{bankingRbiFinancialServices.finalHeading}</h2>
            </div>
            <p>{bankingRbiFinancialServices.finalDescription}</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryAction}>Discuss Your Requirement</Link>
              <Link href="#enquiry" className={styles.secondaryActionLight}>Submit an Enquiry</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
