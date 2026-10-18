import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "NBFC Formation / Licensing Advisory | Banking & Financial Services | Astronis",
  description: "Support for NBFC formation and RBI registration: classification, registration application, governance and post-licensing readiness.",
  alternates: { canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/nbfc-formation-licensing-advisory" },
};

export default function NbfcFormationPage() {
  const heroImage = getServiceChildHeroImage("nbfc-formation-licensing-advisory", "banking-insolvency-restructuring-advisory");
  const services = [
    ["file", "Regulatory Classification & Feasibility", "Assess business model, RBI classification and registration requirements."],
    ["document", "RBI Certificate of Registration Application Support", "Prepare application documents, business plan and declarations."],
    ["shield", "Governance, Policies & Compliance Framework", "Develop KYC/AML, lending policy, governance and risk frameworks."],
    ["people", "Post-Licensing & Operational Readiness", "Support implementation of license conditions and compliance calendar."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src={heroImage} alt="NBFC formation" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory">Banking, Insolvency & Restructuring Advisory</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory#banking-and-financial-services">Banking &amp; Financial Services</Link><span>/</span><span aria-current="page">NBFC Formation / Licensing Advisory</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>BANKING &amp; FINANCIAL SERVICES · NBFC FORMATION</span><h1>NBFC Formation / Licensing Advisory</h1><h2>Establishing financial institutions. Navigating RBI licensing.</h2><p>Practical support for formation, registration, governance and readiness to operate as an NBFC under RBI frameworks.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Schedule a Licensing Consultation <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request Registration Assistance <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <section className={PageStyles.services}>
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR NBFC FORMATION SERVICES</span><h2>From classification to registration — end-to-end support</h2><p>Guidance through regulatory classification, application preparation, governance and post-registration compliance.</p></div>

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

    </div>
  );
}
