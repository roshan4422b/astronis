import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
import ServiceChildTestimonial from "@/app/services/_template/service-child-testimonial";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import styles from "./arbitration-page.module.css";

export default function ArbitrationPage({ data }: { data: EntityFormationPageData }) {
  const comparison = data.comparisonPanels?.[0];
  const framework = data.comparisonPanels?.[1];
  const services = data.services.slice(0, 6);
  const sectionItems = [
    { id: "services", label: "Services" },
    { id: "approach", label: "Our Approach" },
    { id: "process", label: "Our Process" },
    { id: "benefits", label: "Why Choose Us" },
    { id: "commitment", label: "Our Commitment" },
    { id: "comparison", label: "Our Work" },
    { id: "framework", label: "Legal Framework" },
    { id: "faqs", label: "Frequently Asked Questions" },
    { id: "testimonials", label: "Testimonials" },
  ];

  return (
    <>
      <div className={styles.page}>
        <section className={styles.hero} id="overview">
        <div className={styles.heroVisual}>
          <Image
            src={data.heroImage ?? data.image}
            alt={data.imageAlt}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 52vw"
          />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/services">Services</Link><span>/</span>
            <Link href={data.serviceHref ?? "/services/litigation-dispute-resolution"}>{data.serviceTitle}</Link><span>/</span>
            <span aria-current="page">{data.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{data.heroEyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.heroStatement}</p>
            <Link className={styles.primaryAction} href={data.heroPrimaryHref ?? "/contact"}>
              {data.heroPrimaryAction ?? "Schedule a Consultation"}
              <Icon name="arrow" />
            </Link>
          </div>
          <span className={styles.heroMark} aria-hidden="true"><Icon name="scale" /></span>
        </div>
        </section>
      </div>

      <ServiceChildPageLayout items={sectionItems} includeTestimonial={false}>
        <div className={styles.page}>

      <section className={styles.servicesSection} id="services">
        <div className={`container ${styles.servicesLayout}`}>
          <div className={styles.overviewCopy}>
            <span className={styles.sectionLabel}>OVERVIEW</span>
            <h2>What is arbitration?</h2>
            <p>{data.introduction}</p>
            <Link className={styles.textLink} href={data.categoryHref ?? "/services/litigation-dispute-resolution#tribunals-dispute-resolution"}>
              Explore dispute resolution services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.serviceGrid}>
            {services.map(([icon, title, description]) => (
              <article className={styles.serviceCard} key={title}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.darkSection} id="approach">
        <div className={`container ${styles.twoColumn}`}>
          <article className={styles.infoPanel} id="benefits">
            <span className={styles.sectionLabel}>WHY CHOOSE ARBITRATION?</span>
            <h2>{data.benefitsHeading}</h2>
            <ul className={styles.checkList}>
              {data.benefits.map(([, title, description]) => (
                <li key={title}>
                  <Icon name="check" />
                  <span><strong>{title}</strong>{description}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.infoPanel}>
            <span className={styles.sectionLabel}>WHO NEEDS THESE SERVICES?</span>
            <h2>{data.structureHeading ?? "Who we assist"}</h2>
            <ul className={styles.checkList}>
              {data.structurePoints.map(([icon, title, description]) => (
                <li key={title}>
                  <Icon name={icon} />
                  <span><strong>{title}</strong>{description}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.comparisonSection} id="comparison">
        <div className={`container ${styles.comparisonLayout}`}>
          <div className={styles.comparisonImage}>
            <Image src={data.image} alt="" fill sizes="(max-width: 760px) 100vw, 36vw" />
          </div>
          {comparison && (
            <article className={styles.tablePanel}>
              <span className={styles.sectionLabel}>AT A GLANCE</span>
              <h2>{comparison.heading}</h2>
              <div className={styles.tableWrap} role="region" aria-label="Arbitration options comparison" tabIndex={0}>
                <table>
                  <thead>
                    <tr><th scope="col">Consideration</th>{comparison.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row, index) => (
                      <tr key={row[0] ?? index}>
                        <th scope="row">{["Typical dispute", "Procedure", "Award enforcement"][index] ?? `Factor ${index + 1}`}</th>
                        {row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.comparisonNote && <p className={styles.tableNote}>{data.comparisonNote}</p>}
            </article>
          )}
        </div>
      </section>

      {framework && (
        <section className={styles.frameworkSection} id="framework">
          <div className={`container ${styles.frameworkLayout}`}>
            <div>
              <span className={styles.sectionLabel}>REGULATORY FRAMEWORK</span>
              <h2>{framework.heading}</h2>
              <p>{data.description}</p>
            </div>
            <div className={styles.tableWrap} role="region" aria-label="Arbitration legal framework" tabIndex={0}>
              <table>
                <thead><tr>{framework.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                <tbody>
                  {framework.rows.map((row, index) => (
                    <tr key={row[0] ?? index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className={styles.processSection} id="process">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>STEP-BY-STEP ARBITRATION PROCESS</span>
            <h2>{data.processHeading}</h2>
            <p>{data.processDescription}</p>
          </div>
          <ol className={styles.processGrid}>
            {data.process.map(([title, description], index) => (
              <li key={title}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.practicalSection} id="commitment">
        <div className={`container ${styles.practicalGrid}`}>
          <article className={styles.practicalCard}>
            <span className={styles.sectionLabel}>DOCUMENTS TO PREPARE</span>
            <h2>{data.documentsHeading ?? "Documents required"}</h2>
            <ul className={styles.documentList}>
              {data.documents.map((document) => <li key={document}><Icon name="check" />{document}</li>)}
            </ul>
          </article>
          <article className={styles.practicalCard}>
            <span className={styles.sectionLabel}>{data.requirementsEyebrow ?? "IMPORTANT CONSIDERATIONS"}</span>
            <h2>{data.requirementsHeading ?? "Plan the key details early"}</h2>
            <ul className={styles.requirementList}>
              {data.requirements.map(([icon, title, description]) => (
                <li key={title}>
                  <Icon name={icon} />
                  <span><strong>{title}</strong>{description}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.faqSection} id="faqs">
        <div className={`container ${styles.faqLayout}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>FREQUENTLY ASKED QUESTIONS</span>
            <h2>Arbitration FAQs</h2>
            <p>{data.faqDescription ?? "A few common questions about arbitration and the support available."}</p>
          </div>
          <div className={styles.faqList}>
            {data.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {data.relatedPages?.length ? (
        <section className={styles.relatedSection}>
          <div className="container">
            <span className={styles.sectionLabel}>EXPLORE RELATED SERVICES</span>
            <div className={styles.relatedGrid}>
              {data.relatedPages.map(([title, href]) => (
                <Link href={href} key={href}><Icon name="scale" />{title}<span aria-hidden="true">→</span></Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <span className={styles.sectionLabel}>NEED GUIDANCE?</span>
            <h2>{data.finalHeading}</h2>
            <p>{data.finalDescription}</p>
          </div>
          <Link className={styles.primaryAction} href="/contact">
            {data.finalAction ?? "Schedule a Consultation"} <Icon name="calendar" />
          </Link>
        </div>
      </section>

      <ServiceChildTestimonial
        eyebrow={data.testimonialEyebrow}
        heading={data.testimonialHeading}
        description={data.testimonialDescription}
      />
        </div>
      </ServiceChildPageLayout>
    </>
  );
}
