import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "IP Due Diligence | IP & Brand Advisory | Astronis",
  description: "IP due diligence for transactions, investments and licensing — identify legal risks, rights and gaps in IP assets.",
  alternates: { canonical: "/services/intellectual-property-right-services/ip-and-brand-advisory/ip-due-diligence" },
};

export default function IpDueDiligencePage() {
  const services = [
    ["search", "IP Ownership & Title Verification", "Review ownership, inventorship, authorship and registered rights."],
    ["file", "IP Registration & Portfolio Audit", "Examine trademark, patent and copyright portfolios and gaps."],
    ["shield", "IP Licensing & Encumbrance Review", "Assess licensing arrangements, restrictions and security interests."],
    ["chart", "Transaction IP Due Diligence", "Support M&A, investment and technology transfer due diligence."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src="/business-financial-advisory.png" alt="IP due diligence" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/intellectual-property-right-services">Intellectual Property Right Services</Link><span>/</span><Link href="/services/intellectual-property-right-services/ip-and-brand-advisory">IP &amp; Brand Advisory</Link><span>/</span><span aria-current="page">IP Due Diligence</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>INTELLECTUAL PROPERTY · ADVISORY</span><h1>IP Due Diligence</h1><h2>Verify Intellectual Property Assets. Identify Legal Risks.</h2><p>Structured legal and commercial assessment of IP assets for transactions, investment and licensing decisions.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Schedule a Consultation <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request IP Due Diligence Assistance <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <section className={PageStyles.services}>
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR IP DUE DILIGENCE SERVICES</span><h2>Practical review of IP assets for transactions and risk</h2><p>Identify ownership, encumbrances, scope and material risks in IP portfolios to inform transactional decisions.</p></div>

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
