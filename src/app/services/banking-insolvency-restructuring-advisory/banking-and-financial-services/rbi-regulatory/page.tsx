import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "RBI Regulatory | Banking & Financial Services | Astronis",
  description: "RBI regulatory advisory: interpretation, licensing, inspections and compliance reporting for banks, NBFCs and payment businesses.",
  alternates: { canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/rbi-regulatory" },
};

export default function RbiRegulatoryPage() {
  const heroImage = getServiceChildHeroImage("rbi-regulatory", "banking-insolvency-restructuring-advisory");
  const services = [
    ["file", "RBI Regulatory Interpretation & Advisory", "Interpret RBI acts, regulations and master directions relevant to business models."],
    ["shield", "Licensing, Registration & Approval Advisory", "Support eligibility assessment, application preparation and approvals."],
    ["people", "RBI Compliance & Regulatory Reporting", "Assist with ongoing compliance, statutory returns and internal controls."],
    ["chart", "Inspections, Notices & Supervisory Response", "Support responses to supervisory notices and inspection findings."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src={heroImage} alt="RBI advisory" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory">Banking, Insolvency & Restructuring Advisory</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory#banking-and-financial-services">Banking &amp; Financial Services</Link><span>/</span><span aria-current="page">RBI Regulatory</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>BANKING &amp; FINANCIAL SERVICES · REGULATORY</span><h1>RBI Regulatory</h1><h2>Navigating RBI Regulations. Strengthening Financial Compliance.</h2><p>Expert legal, regulatory and supervisory advisory services on the regulatory framework administered by the Reserve Bank of India.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Schedule an RBI Regulatory Consultation <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request RBI Compliance Assistance <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <ServiceChildPageLayout items={[{ id: "services", label: "Services" }]}>
      <section className={PageStyles.services} id="services">
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR RBI REGULATORY SERVICES</span><h2>Interpretation and supervisory response</h2><p>Practical regulatory mapping and support for licensing, reporting, governance and supervisory engagement with RBI frameworks.</p></div>

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
