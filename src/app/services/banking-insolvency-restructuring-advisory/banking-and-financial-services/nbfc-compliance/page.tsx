import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "NBFC Compliance | Banking & Financial Services | Astronis",
  description: "Ongoing RBI & NBFC compliance advisory: regulatory returns, governance, KYC/AML, and prudential obligations.",
  alternates: { canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/nbfc-compliance" },
};

export default function NbfcCompliancePage() {
  const heroImage = getServiceChildHeroImage("nbfc-compliance", "banking-insolvency-restructuring-advisory");
  const services = [
    ["file", "RBI Regulatory Compliance & Advisory", "Assess applicable RBI directions, NBFC classification and ongoing obligations."],
    ["shield", "Compliance Calendar & Reporting", "Coordinate periodic returns, reconciliations and regulatory correspondence."],
    ["people", "KYC, AML & Customer Protection", "Implement controls aligned with RBI and customer-protection frameworks."],
    ["chart", "Inspection, Notice & Remediation", "Support responses to inspections and corrective action plans."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src={heroImage} alt="Financial compliance" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory">Banking, Insolvency & Restructuring Advisory</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory#banking-and-financial-services">Banking &amp; Financial Services</Link><span>/</span><span aria-current="page">NBFC Compliance</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>BANKING &amp; FINANCIAL SERVICES · NBFC</span><h1>NBFC Compliance</h1><h2>Strengthening regulatory governance. Managing RBI obligations.</h2><p>Support for regulated non-banking financial companies to comply with RBI prudential norms, reporting, governance and customer protection requirements.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Request a Consultation <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request a Compliance Review <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <ServiceChildPageLayout items={[{ id: "services", label: "Services" }]}>
      <section className={PageStyles.services} id="services">
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR NBFC COMPLIANCE SERVICES</span><h2>Practical compliance, reporting and remedial support</h2><p>Ongoing compliance design, reporting and inspection readiness aligned to RBI expectations and governance best practice.</p></div>

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
