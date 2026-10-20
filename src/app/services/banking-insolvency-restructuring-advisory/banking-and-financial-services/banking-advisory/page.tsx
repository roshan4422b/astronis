import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "Banking Advisory | Banking & Financial Services | Astronis",
  description: "Advisory for banking transactions, lending documentation, borrower-lender relationships and regulatory compliance.",
  alternates: { canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/banking-advisory" },
};

export default function BankingAdvisoryPage() {
  const heroImage = getServiceChildHeroImage("banking-advisory", "banking-insolvency-restructuring-advisory")
    ?? "/services/banking-nbfc-and-financial-services-advisory.webp";
  const services = [
    ["building", "Banking Regulatory & Compliance Advisory", "Advise on applicable banking laws, directions and regulatory correspondence."],
    ["document", "Corporate Lending & Credit Facility Advisory", "Support term sheets, facility documents and lending arrangements."],
    ["file", "Loan, Security & Guarantee Documentation", "Draft and review security agreements, mortgages and guarantees."],
    ["shield", "Banking Disputes & Enforcement Advisory", "Assist with contractual disputes, enforcement and recovery."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={`${PageStyles.hero} service-child-page-hero`} id="overview">
        <Image src={heroImage} alt="Banking advisory" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory">Banking, Insolvency & Restructuring Advisory</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory#banking-and-financial-services">Banking &amp; Financial Services</Link><span>/</span><span aria-current="page">Banking Advisory</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>BANKING &amp; FINANCIAL SERVICES · BANKING ADVISORY</span><h1>Banking Advisory</h1><h2 className="service-child-hero-subtitle">Navigating Banking Regulations. Securing Financial Transactions.</h2><div className={PageStyles.actions}><Link className={PageStyles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <ServiceChildPageLayout items={[{ id: "services", label: "Services" }]}>
      <section className={PageStyles.services} id="services">
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR BANKING ADVISORY SERVICES</span><h2>Practical legal and regulatory support for banking transactions</h2><p>Support across lending documentation, security structures, dispute resolution and bank regulatory matters.</p></div>

          <div className={PageStyles.serviceGrid}>
            {services.map(([icon, title, description]) => (
              <article className={PageStyles.serviceCard} key={String(title)}>
                <span className={PageStyles.icon}><Icon name={String(icon)} /></span>
                <h3>{String(title)}</h3>
                <p>{String(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </ServiceChildPageLayout>

    </div>
  );
}
