import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { services } from "@/data/services";
import Leadership, { professionals, type ProfessionalRecord } from "../leadership";
import styles from "./profile.module.css";

const serviceMatches: Array<{ patterns: string[]; slug: string }> = [
  { patterns: ["corporate", "commercial", "structur", "governance"], slug: "corporate-commercial-advisory" },
  { patterns: ["regulatory", "compliance"], slug: "regulatory-services" },
  { patterns: ["litigation", "dispute", "civil", "criminal", "family", "matrimonial", "white colour"], slug: "litigation-dispute-resolution" },
  { patterns: ["business advisory", "acquisition", "financing", "startup", "msme"], slug: "business-advisory-contracts" },
  { patterns: ["ip", "intellectual property"], slug: "intellectual-property-right-services" },
  { patterns: ["banking", "industrial law", "debt recovery"], slug: "banking-insolvency-restructuring-advisory" },
  { patterns: ["licensing", "bis", "isi"], slug: "licensing-registrations" },
  { patterns: ["employment", "labour"], slug: "industrial-employment-forensics-advisory" },
];

function expertiseAreas(value: string) {
  return value.split(/,|\s+&\s+/).map((item) => item.trim()).filter(Boolean);
}

function getRelatedServices(person: ProfessionalRecord) {
  const expertise = person.expertise.toLowerCase();
  const matchingSlugs = serviceMatches
    .filter(({ patterns }) => patterns.some((pattern) => expertise.includes(pattern)))
    .map(({ slug }) => slug);
  return matchingSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service))
    .slice(0, 4);
}

function expertiseDomains(person: ProfessionalRecord) {
  const expertise = person.expertise.toLowerCase();
  return serviceMatches.filter(({ patterns }) => patterns.some((pattern) => expertise.includes(pattern))).map(({ slug }) => slug);
}

function getRelatedProfessionals(person: ProfessionalRecord) {
  const domains = expertiseDomains(person);
  return professionals
    .filter((other) => other.slug !== person.slug)
    .map((other) => ({ other, score: expertiseDomains(other).filter((domain) => domains.includes(domain)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ other }) => other);
}

export default function ProfessionalProfileTemplate({ person }: { person: ProfessionalRecord }) {
  const enquiry = `/professionals/enquiry?professional=${person.slug}`;
  const areas = expertiseAreas(person.expertise);
  const relatedServices = getRelatedServices(person);
  const relatedProfessionals = getRelatedProfessionals(person);
  const qualifications = person.education?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    image: person.image ? `https://www.astronisglobal.com${encodeURI(person.image)}` : undefined,
    url: `https://www.astronisglobal.com/professionals/${person.slug}`,
    worksFor: { "@type": "Organization", name: "Astronis Global", url: "https://www.astronisglobal.com" },
  };
  const sections = [
    { id: "overview", label: "Overview", show: Boolean(person.description) },
    { id: "expertise", label: "Expertise", show: areas.length > 0 },
    { id: "education", label: "Education", show: qualifications.length > 0 },
    { id: "credentials", label: "Credentials", show: Boolean(person.enrolment) },
    { id: "services", label: "Services", show: relatedServices.length > 0 },
    { id: "related", label: "Related Professionals", show: relatedProfessionals.length > 0 },
  ].filter((section) => section.show);

  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
    <div className={styles.wrap}>
      <section className={styles.executiveBanner} aria-labelledby="profile-name">
        <div className={styles.executiveCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/professionals">Professionals</Link><span aria-hidden="true">/</span><span aria-current="page">{person.name}</span></nav>
          <span className={styles.kicker}>Astronis Global · Professional Profile</span>
          <h1 id="profile-name">{person.name}</h1>
          <p className={styles.role}>{person.role}</p>
          {qualifications.length > 0 && <p className={styles.qualificationLine}>{qualifications.join(" · ")}</p>}
          <p className={styles.intro}>{person.description}</p>
          <div className={styles.expertiseTags} aria-label="Areas of expertise">{areas.slice(0, 4).map((area) => <span key={area}>{area}</span>)}</div>
          <div className={styles.profileActions}><Link className={styles.primaryButton} href={enquiry}>Discuss Your Requirements <Icon name="arrow" /></Link><a className={styles.secondaryButton} href="#overview">View Professional Details <span aria-hidden="true">↓</span></a></div>
        </div>
        <figure className={styles.portraitFrame}>
          {person.image ? <Image src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 760px) 100vw, 42vw" priority /> : <div className={styles.photoFallback} role="img" aria-label={`Portrait unavailable for ${person.name}`}>{person.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</div>}
          <figcaption><strong>{person.role}</strong>{person.location && <span><Icon name="pin" />{person.location}</span>}</figcaption>
        </figure>
      </section>

      <nav className={styles.sectionNav} aria-label="Professional profile sections">{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.label}</a>)}</nav>

      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          {person.description && <section className={styles.contentSection} id="overview"><span className={styles.sectionEyebrow}>Profile</span><h2>Professional Overview</h2><p>{person.description}</p></section>}
          {areas.length > 0 && <section className={styles.contentSection} id="expertise"><span className={styles.sectionEyebrow}>Practice focus</span><h2>Areas of Expertise</h2><div className={styles.expertiseGrid}>{areas.map((area, index) => <div className={styles.expertiseItem} key={`${area}-${index}`}><span className={styles.expertiseNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{area}</h3></div>)}</div></section>}
          {qualifications.length > 0 && <section className={styles.contentSection} id="education"><span className={styles.sectionEyebrow}>Academic background</span><h2>Education &amp; Qualifications</h2><ul className={styles.qualificationList}>{qualifications.map((qualification) => <li key={qualification}><Icon name="document" /><span>{qualification}</span></li>)}</ul></section>}
          {relatedServices.length > 0 && <section className={styles.contentSection} id="services"><span className={styles.sectionEyebrow}>Astronis capabilities</span><h2>Related Services</h2><div className={styles.serviceGrid}>{relatedServices.map((service) => <Link href={`/services/${service.slug}`} className={styles.serviceCard} key={service.slug}><span className={styles.serviceIcon}><Icon name={service.icon} /></span><span className={styles.serviceText}><strong>{service.title}</strong><span>{service.shortDescription}</span></span><Icon name="arrow" /></Link>)}</div></section>}
        </div>

        <aside className={styles.sidebar} aria-label="Professional details">
          <section className={styles.detailsPanel}><span className={styles.sectionEyebrow}>At a glance</span><h2>Professional Details</h2><dl>
            {person.role && <div><dt>Current position</dt><dd>{person.role}</dd></div>}
            {person.location && <div><dt>Location</dt><dd>{person.location}</dd></div>}
            {person.hierarchy && <div><dt>Practice group</dt><dd>{person.hierarchy}</dd></div>}
            {person.code && <div><dt>Professional code</dt><dd>{person.code}</dd></div>}
            {person.linkedinProfile && <div><dt>LinkedIn profile</dt><dd>{person.linkedinProfile}</dd></div>}
          </dl></section>
          {person.enrolment && <section className={styles.credentialPanel} id="credentials"><span className={styles.sectionEyebrow}>Professional standing</span><h2>Credentials</h2><p>{person.enrolment}</p></section>}
          {(person.email || person.phones.length > 0) && <section className={styles.contactPanel}><h2>Start a Conversation</h2><p>Connect with Astronis Global about your legal, regulatory or business requirements.</p>{person.email && <a href={`mailto:${person.email}`}><Icon name="mail" />{person.email}</a>}{person.phones.map((phone) => <a href={`tel:${phone.replace(/\s/g, "")}`} key={phone}><Icon name="phone" />{phone}</a>)}<Link className={styles.primaryButton} href={enquiry}>Send an Enquiry <Icon name="arrow" /></Link></section>}
        </aside>
      </div>

      {relatedProfessionals.length > 0 && <section className={styles.relatedSection} id="related"><div className={styles.relatedHeading}><div><span className={styles.sectionEyebrow}>Across our team</span><h2>Related Professionals</h2></div><Link href="/professionals">View all professionals <Icon name="arrow" /></Link></div><Leadership variant="premium" people={relatedProfessionals} /></section>}
    </div>

    <section className={styles.bottomCta}><div className={styles.bottomInner}><span className={styles.sectionEyebrow}>Astronis Global · Professional Advisory</span><h2>Let’s Discuss Your Requirements</h2><p>Connect with Astronis Global to discuss legal, regulatory, corporate or business advisory requirements.</p><Link className={styles.primaryButton} href={enquiry}>Discuss Your Requirements <Icon name="arrow" /></Link></div></section>
  </div>;
}
