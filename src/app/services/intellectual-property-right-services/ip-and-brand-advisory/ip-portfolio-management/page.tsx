import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "IP Portfolio Management | IP & Brand Advisory | Astronis",
  description: "IP portfolio strategy and management — optimise registration, maintenance and monetisation of trademark, patent and design assets.",
  alternates: { canonical: "/services/intellectual-property-right-services/ip-and-brand-advisory/ip-portfolio-management" },
};

export default function IpPortfolioManagementPage() {
  const heroImage = getServiceChildHeroImage("ip-portfolio-management", "intellectual-property-right-services");
  const services = [
    ["layers", "Portfolio Strategy & Prioritisation", "Align IP filings with business objectives and budget priorities."],
    ["calendar", "Maintenance & Renewals", "Manage renewals, annuities and administrative compliance for registered rights."],
    ["dollar", "Monetisation & Licensing Strategy", "Identify commercialisation pathways and revenue models for IP."],
    ["search", "Freedom-to-Operate & Clearance", "Perform searches and freedom-to-operate opinions to de-risk product launches."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src={heroImage} alt="IP portfolio management" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/intellectual-property-right-services">Intellectual Property Right Services</Link><span>/</span><Link href="/services/intellectual-property-right-services/ip-and-brand-advisory">IP &amp; Brand Advisory</Link><span>/</span><span aria-current="page">IP Portfolio Management</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>INTELLECTUAL PROPERTY · ADVISORY</span><h1>IP Portfolio Management</h1><h2>Optimise, Maintain and Monetise Your IP Assets</h2><p>End-to-end management of registered and unregistered IP to preserve rights, support growth and maximise value.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Discuss Your Portfolio <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request Portfolio Review <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <section className={PageStyles.services}>
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>PORTFOLIO MANAGEMENT SERVICES</span><h2>Practical, commercial IP stewardship</h2><p>Comprehensive lifecycle management—filings, renewals, audits and commercial strategies for IP assets.</p></div>

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
