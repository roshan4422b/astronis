import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

export const metadata: Metadata = {
  title: "IPR Assignment | IP & Brand Advisory | Astronis",
  description: "Support for assignment, transfer and novation of IP rights, ensuring clear chain of title and enforceable transfer documentation.",
  alternates: { canonical: "/services/intellectual-property-right-services/ip-and-brand-advisory/assignment" },
};

export default function IprAssignmentPage() {
  const services = [
    ["file", "Assignment & Transfer Documentation", "Draft and review assignments, deeds and transfer agreements for IP rights."],
    ["link", "Chain of Title Verification", "Ensure clear title and record transfers with relevant registries where needed."],
    ["handshake", "Consideration & Tax Structuring Advice", "Coordinate commercial terms and advise on tax/regulatory implications of transfers."],
    ["gavel", "Post-transfer Enforcement Support", "Support enforcement and registration post-transfer to protect the assigned rights."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={PageStyles.hero} id="overview">
        <Image src="/assignment-hero.png" alt="IPR assignment" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/intellectual-property-right-services">Intellectual Property Right Services</Link><span>/</span><Link href="/services/intellectual-property-right-services/ip-and-brand-advisory">IP &amp; Brand Advisory</Link><span>/</span><span aria-current="page">IPR Assignment</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>INTELLECTUAL PROPERTY · ADVISORY</span><h1>IPR Assignment</h1><h2>Transfer IP Rights with Certainty</h2><p>Legal support for assignments and transfers of IP to ensure enforceability and a clear chain of title.</p><div className={PageStyles.actions}><Link className={PageStyles.primary} href="/contact">Arrange an Assignment <Icon name="arrow" /></Link><Link className={PageStyles.secondary} href="/professionals/enquiry">Request Transfer Assistance <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <section className={PageStyles.services}>
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>ASSIGNMENT & TRANSFER SERVICES</span><h2>Clear, enforceable transfers of IP rights</h2><p>Documentation and registration support for assignments and transfers across jurisdictions.</p></div>

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
