import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "FinTech Advisory & Compliance | Banking & Financial Services | Astronis",
  description: "Regulatory and compliance advisory for fintech and payments businesses, covering licensing, digital lending, KYC/AML, and payments compliance.",
  alternates: { canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/fintech-advisory-and-compliance" },
};

export default function FintechAdvisoryCompliancePage() {
  const services = [
    ["shield", "FinTech Regulatory Classification & Business Structuring", "Map product models to regulatory requirements (NBFC, PSP, PPI, payment aggregator)."],
    ["chart", "Digital Lending & NBFC Partnership Advisory", "Assess platform-lender models, responsibilities and safeguards."],
    ["people", "KYC, AML & Customer Protection Advisory", "Design KYC/AML frameworks and customer grievance processes."],
    ["file", "FinTech Contracts, Data & Technology Governance", "Draft agreements reflecting data protection, platform relationships and operations."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src="/services/banking-nbfc-and-financial-services-advisory.webp" alt="FinTech professionals in a meeting" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory">Banking, Insolvency & Restructuring Advisory</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory#banking-and-financial-services">Banking &amp; Financial Services</Link><span>/</span><span aria-current="page">FinTech Advisory &amp; Compliance</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>BANKING &amp; FINANCIAL SERVICES · FINTECH</span><h1>FinTech Advisory &amp; Compliance</h1><h2>Enabling financial innovation. Navigating digital regulations.</h2><p>Practical regulatory, compliance and transactional advisory for fintech companies, payment platforms, digital lenders and technology-enabled financial services.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Get Started <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Schedule a Consultation <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <section className={PageStyles.services}>
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR SERVICES FOR FINTECH</span><h2>Regulatory & Commercial Support for FinTech Businesses</h2><p>End-to-end advisory covering licensing, compliance, contracts, data governance and operational risk for digital finance businesses.</p></div>

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

      <section className={PageStyles.benefits} id="benefits">
        <div className="container">
          <div className={PageStyles.benefitLayout}>
            <div>
              <h3>Overview</h3>
              <p>FinTech advisory connects product design with regulatory clarity — supporting launch, scale and ongoing compliance across payments, lending, data and customer protections.</p>
            </div>
            <aside className={PageStyles.benefitPanel}><span>KEY BENEFITS</span><h3>Reduce regulatory risk and accelerate product delivery</h3></aside>
          </div>
        </div>
      </section>

    </div>
  );
}
