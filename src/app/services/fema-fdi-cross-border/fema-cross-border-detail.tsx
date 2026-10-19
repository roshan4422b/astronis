import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import ServiceChildPageLayout from "../_template/service-child-page-layout";
import styles from "../corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";
import type { FemaCrossBorderDetail } from "@/data/fema-cross-border-details";
import { getServiceChildHeroImage } from "@/data/services";

const sectionLinks = [
  ["Overview", "overview"],
  ["Services", "services"],
  ["Why This Is Necessary", "why-needed"],
  ["Key Benefits", "benefits"],
  ["Process & Timelines", "process"],
  ["Documents", "documents"],
  ["FAQs", "faqs"],
];
function Heading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`${styles.heading} ${light ? styles.lightHeading : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function femaCrossBorderMetadata(detail: FemaCrossBorderDetail): Metadata {
  const canonical = `/services/fema-fdi-cross-border/${detail.groupSlug}/${detail.slug}`;
  return {
    title: `${detail.title} | FEMA, FDI & Cross-Border | Astronis`,
    description: detail.description,
    alternates: { canonical },
    openGraph: {
      title: `${detail.title} | Astronis`,
      description: detail.description,
      url: canonical,
      type: "website",
    },
  };
}

export default function FemaCrossBorderDetailPage({ detail }: { detail: FemaCrossBorderDetail }) {
  const heroImage = getServiceChildHeroImage(detail.slug, "fema-fdi-cross-border")
    ?? "/images/services/fema-fdi-and-foreign-exchange-advisory.webp";
  const groupTitle = detail.groupSlug === "fema-compliance-and-support"
    ? "FEMA Compliance & Support"
    : "FDI Compliance & Support";
  const groupHref = `/services/fema-fdi-cross-border#${detail.groupSlug}`;

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="hero">
        <Image
          src={heroImage}
          alt="FEMA, foreign investment and cross-border advisory"
          fill
          priority
          sizes="(max-width: 850px) 100vw, 50vw"
          className={styles.heroImage}
        />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/services">Services</Link><span>/</span>
            <Link href="/services/fema-fdi-cross-border">FEMA, FDI &amp; Cross-Border</Link><span>/</span>
            <Link href={groupHref}>{groupTitle}</Link><span>/</span>
            <span aria-current="page">{detail.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>FEMA, FDI &amp; CROSS-BORDER · {groupTitle.toUpperCase()}</span>
            <h1>{detail.title}</h1>
            <h2>{detail.subtitle}</h2>
            <p>{detail.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/professionals/enquiry">
                Schedule a Consultation <Icon name="arrow" />
              </Link>
              <Link className={styles.secondary} href={groupHref}>
                Explore {groupTitle} <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <aside className={styles.heroNote}>
            <span>CROSS-BORDER ADVISORY</span>
            <strong>Structure transactions.<br />Meet obligations.</strong>
            <p>FEMA, RBI, FDI and corporate requirements considered together.</p>
          </aside>
        </div>
      </section>

      <ServiceChildPageLayout
        items={sectionLinks.map(([label, id]) => ({ id, label }))}
      >
          <section className={styles.tax} id="overview">
            <div className={`container ${styles.taxGrid}`}>
              <div>
                <Heading eyebrow="OVERVIEW" title={detail.overviewTitle} text={detail.overview} light />
                <ul className={styles.taxPoints}>
                  {detail.framework.slice(0, 4).map((item) => (
                    <li key={item}><Icon name="shield" /><div><strong>{item}</strong></div></li>
                  ))}
                </ul>
              </div>
              <figure className={styles.taxImage}>
                <Image
                  src="/images/services/fema-fdi-and-foreign-exchange-advisory.webp"
                  alt=""
                  fill
                  sizes="(max-width: 850px) 100vw, 42vw"
                />
                <figcaption>Cross-border clarity.<br /><strong>Compliance with confidence.</strong></figcaption>
              </figure>
            </div>
          </section>

          <section className={styles.services} id="services" data-section-layout="full-width">
            <div className="container">
              <Heading
                eyebrow={`OUR ${detail.title.toUpperCase()} SERVICES`}
                title="Integrated advisory and transaction support"
                text="Coordinate regulatory assessment, documentation, reporting and implementation around your transaction."
              />
              <div className={styles.serviceGrid}>
                {detail.services.map((item) => (
                  <article className={styles.serviceCard} key={item.title}>
                    <span className={styles.icon}><Icon name="globe" /></span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.benefits} id="why-needed">
            <div className={`container ${styles.benefitLayout}`}>
              <div>
                <Heading
                  eyebrow={`WHY ${detail.title.toUpperCase()} IS NECESSARY`}
                  title="Plan the regulatory steps before the transaction"
                  text="Cross-border transactions may involve multiple parties, reporting events and supporting records."
                />
                <ul className={styles.checklist}>
                  {detail.whyNeeded.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}
                </ul>
              </div>
              <aside className={styles.benefitPanel}>
                <span>WHO NEEDS THESE SERVICES?</span>
                <h3>Support shaped around your transaction.</h3>
                <ul>
                  {["Indian companies", "Foreign investors", "Global corporate groups", "Founders & finance teams", "Authorised dealer bank stakeholders"].map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link href="/professionals/enquiry">Discuss your requirement <Icon name="arrow" /></Link>
              </aside>
            </div>
          </section>

          <section className={styles.comparison} id="benefits">
            <div className="container">
              <Heading
                eyebrow="KEY BENEFITS"
                title="Why take an integrated advisory approach?"
                text="Bring applicable foreign exchange requirements together with commercial, corporate and financial decisions."
              />
              <div className={styles.benefitGrid}>
                {detail.benefits.map((item) => (
                  <article key={item.title}>
                    <span className={styles.icon}><Icon name="globe" /></span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                ))}
              </div>
              <p className={styles.tableNote}>
                This overview is general information. Regulatory treatment, approvals and reporting depend on the transaction facts and current requirements.
              </p>
            </div>
          </section>

          <section className={styles.tax}>
            <div className="container">
              <Heading eyebrow="REGULATORY FRAMEWORK" title="Key laws, regulations & considerations" light />
              <div className={styles.featureStrip}>
                {detail.framework.map((item) => <div key={item}><Icon name="shield" /><span>{item}</span></div>)}
              </div>
            </div>
          </section>

          <section className={styles.comparison}>
            <div className="container">
              <Heading
                eyebrow="COMPARATIVE ANALYSIS"
                title={detail.comparison.heading}
                text="A high-level guide to help frame the relevant transaction and compliance questions."
              />
              <div className={styles.tableWrap} role="region" aria-label={detail.comparison.heading} tabIndex={0}>
                <table>
                  <thead><tr>{detail.comparison.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                  <tbody>
                    {detail.comparison.rows.map((row) => (
                      <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableNote}>Requirements should be verified against current rules and the details of the proposed transaction.</p>
            </div>
          </section>

          <section className={styles.process} id="process">
            <div className="container">
              <Heading
                eyebrow={`${detail.title.toUpperCase()} PROCESS`}
                title="A coordinated path from assessment to compliance"
                text="The exact steps and sequence depend on the parties, transaction route and authorised dealer bank requirements."
              />
              <ol className={styles.timeline}>
                {detail.process.map((item, index) => (
                  <li key={item.title}>
                    <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.stepIcon}><Icon name={["search", "scale", "document", "file", "people", "calendar"][index]} /></span>
                    <h3>{item.title}</h3><p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={styles.documents} id="documents">
            <div className={`container ${styles.documentGrid}`}>
              <div>
                <Heading
                  eyebrow="DOCUMENTS REQUIRED"
                  title="Prepare the transaction record"
                  text="The information required varies by transaction. These materials can help establish the facts and applicable route."
                />
                <ul className={styles.checklist}>
                  {detail.documents.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}
                </ul>
              </div>
              <div className={styles.documentImage}>
                <Image
                  src="/images/services/fema-fdi-and-foreign-exchange-advisory.webp"
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 45vw"
                />
                <span>Records aligned.<br /><strong>Transactions prepared.</strong></span>
              </div>
            </div>
          </section>

          <section className={styles.requirements}>
            <div className="container">
              <Heading eyebrow="STATUTORY TIMELINES" title="Indicative transaction milestones" text="Timelines vary with completeness, bank review and regulatory processing." />
              <div className={styles.tableWrap} role="region" aria-label="Indicative transaction timelines" tabIndex={0}>
                <table>
                  <thead><tr><th>Activity</th><th>Indicative timeline</th></tr></thead>
                  <tbody>{detail.timelines.map((item) => <tr key={item.matter}><td>{item.matter}</td><td>{item.typical}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </section>

          <section className={styles.pricing}>
            <div className="container">
              <Heading
                eyebrow="PROFESSIONAL FEES & ENGAGEMENT STRUCTURE"
                title="A scope tailored to the transaction"
                text="Professional fees depend on the transaction, documentation, number of parties and support required."
              />
              <div className={styles.priceGrid}>
                {detail.fees.map((item) => (
                  <article className={styles.priceCard} key={item.matter}>
                    <span>ADVISORY WORKSTREAM</span>
                    <h3>{item.matter}</h3>
                    <strong className={styles.price}><small>{item.basis}</small></strong>
                    <Link className={styles.priceButton} href="/professionals/enquiry">Request a Quote <Icon name="arrow" /></Link>
                  </article>
                ))}
              </div>
              <p className={styles.priceNote}>Any statutory fees, taxes, valuation charges or third-party costs are separate and will be confirmed as applicable.</p>
            </div>
          </section>

          <section className={styles.features} id="features" data-section-layout="full-width">
            <div className="container">
              <Heading eyebrow="PRECAUTIONS & LEGAL CONSIDERATIONS" title="Plan carefully before implementation" light />
              <div className={styles.featureStrip}>
                {detail.precautions.map((item) => <div key={item}><Icon name="shield" /><span>{item}</span></div>)}
              </div>
            </div>
          </section>

          <section className={styles.faq} id="faqs" data-section-layout="full-width">
            <div className={`container ${styles.faqLayout}`}>
              <div>
                <Heading
                  eyebrow="FREQUENTLY ASKED QUESTIONS"
                  title={`${detail.title}: common questions`}
                  text="General information to help frame an initial discussion; applicability should be confirmed for each transaction."
                />
                <Link href="/faqs">Browse all FAQs <Icon name="arrow" /></Link>
              </div>
              <div className={styles.faqList}>
                {detail.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.final} id="consultation" data-section-layout="full-width">
            <div className="container">
              <span>YOUR NEXT STEP STARTS HERE</span>
              <h2>{detail.finalHeading}</h2>
              <p>Share the transaction context, parties and timeline so we can discuss an appropriate advisory scope.</p>
              <Link href="/professionals/enquiry">Request a Consultation <Icon name="arrow" /></Link>
            </div>
          </section>
      </ServiceChildPageLayout>
    </div>
  );
}
