import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "Brand Protection | IP & Brand Advisory | Astronis",
  description: "Brand protection services including enforcement, anti-counterfeiting, and online brand take-downs to protect goodwill and reputation.",
  alternates: { canonical: "/services/intellectual-property-right-services/ip-and-brand-advisory/brand-protection" },
};

export default function BrandProtectionPage() {
  const heroImage = getServiceChildHeroImage("brand-protection", "intellectual-property-right-services");
  const services = [
    ["shield", "Enforcement & Litigation Support", "Support in trademark infringement, passing off and domain disputes."],
    ["globe", "Online Brand Monitoring & Takedown", "Monitor marketplaces and social platforms and implement takedowns for infringing listings."],
    ["binoculars", "Investigations & Anti-counterfeiting", "Conduct investigations and collaborate with enforcement agencies to curb counterfeits."],
    ["gavel", "Domain & Cyber-squatting Remedies", "Remedies and UDRP actions for abusive domain registrations."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={`${PageStyles.hero} service-child-page-hero`} id="overview">
        <Image src={heroImage} alt="Brand protection" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/intellectual-property-right-services">Intellectual Property Right Services</Link><span>/</span><Link href="/services/intellectual-property-right-services/ip-and-brand-advisory">IP &amp; Brand Advisory</Link><span>/</span><span aria-current="page">Brand Protection</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>INTELLECTUAL PROPERTY · ADVISORY</span><h1>Brand Protection</h1><h2 className="service-child-hero-subtitle">Protect reputation, revenue and goodwill</h2><div className={PageStyles.actions}><Link className={PageStyles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <ServiceChildPageLayout items={[{ id: "services", label: "Services" }]}>
      <section className={PageStyles.services} id="services">
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>BRAND PROTECTION SERVICES</span><h2>Enforcement and proactive monitoring</h2><p>From marketplaces to courts—implement practical actions to stop infringement and protect consumers.</p></div>

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
