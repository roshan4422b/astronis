import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "Licensing | IP & Brand Advisory | Astronis",
  description: "Design, negotiate and manage IP licensing agreements and commercialisation arrangements for trademarks, patents, designs and software.",
  alternates: { canonical: "/services/intellectual-property-right-services/ip-and-brand-advisory/licensing" },
};

export default function LicensingPage() {
  const services = [
    ["file-text", "Drafting & Negotiation of Licences", "Tailor licensing agreements for commercial goals and risk allocation."],
    ["handshake", "Distribution & Franchise Agreements", "Licence structures for distribution, franchising and regional partners."],
    ["dollar", "Royalty Modelling & Audit Rights", "Commercial terms, royalty structures and audit protections for licensors."],
    ["scale", "Cross-border Licensing & Compliance", "Address jurisdictional IP and regulatory considerations in cross-border deals."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src="/licensing-hero.png" alt="IP licensing" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/intellectual-property-right-services">Intellectual Property Right Services</Link><span>/</span><Link href="/services/intellectual-property-right-services/ip-and-brand-advisory">IP &amp; Brand Advisory</Link><span>/</span><span aria-current="page">Licensing</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>INTELLECTUAL PROPERTY · ADVISORY</span><h1>Licensing</h1><h2>Commercialise IP with robust agreements</h2><p>Practical drafting, negotiation and management of licensing and commercialisation arrangements.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Talk Licensing Strategy <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request Licensing Support <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <section className={PageStyles.services}>
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>LICENSING SERVICES</span><h2>Agreements that align risk and commercial outcomes</h2><p>From drafting to enforcement—support across the full licence lifecycle and commercial models.</p></div>

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
