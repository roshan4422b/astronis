import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import type { PrivateStyleAdvisoryPageData } from "@/data/private-style-advisory-pages";
import PageSectionLayout from "../corporate-commercial-advisory/entity-formation/_components/page-section-layout";
import PrivateLimitedFaq from "../corporate-commercial-advisory/entity-formation/private-limited/private-limited-faq";
import ServiceChildPageLayout from "./service-child-page-layout";
import styles from "../corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";

const navigation = [
  ["Overview", "overview"],
  ["Our Services", "services"],
  ["Benefits", "benefits"],
  ["Regulatory Framework", "framework"],
  ["Who We Assist", "stakeholders"],
  ["Comparative Analysis", "comparison"],
  ["Our Process", "process"],
  ["Documents", "documents"],
  ["Key Considerations", "requirements"],
  ["Fees & Engagement", "fees"],
  ["Key Features", "features"],
  ["FAQs", "faqs"],
  ["Knowledge Centre", "resources"],
  ["Related Services", "related"],
  ["Contact Us", "contact"],
].map(([label, id]) => ({ label, id }));

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

export default function PrivateStyleAdvisoryPage({ data }: { data: PrivateStyleAdvisoryPageData }) {
  const documentColumns = [
    data.documents.slice(0, Math.ceil(data.documents.length / 2)),
    data.documents.slice(Math.ceil(data.documents.length / 2)),
  ];

  return (
    <main className={styles.page} data-text-size="plus-two">
      <section className={`${styles.hero} ${styles.heroNoOverlay} service-child-page-hero`} id="overview">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <Link href={data.serviceHref}>{data.serviceTitle}</Link>
            <span>/</span>
            <Link href={data.categoryHref}>{data.categoryTitle}</Link>
            <span>/</span>
            <span aria-current="page">{data.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <h1>{data.title}</h1>
            <h2 className="service-child-hero-subtitle">{data.statement}</h2>
            <p>{data.description}</p>
            <div className={styles.actions}>
              <Link className={styles.secondary} href="/contact">
                {data.finalAction} <Icon name="calendar" />
              </Link>
              <Link className={styles.primary} href={data.categoryHref}>
                Explore Our Services <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceChildPageLayout items={navigation}>
        <PageSectionLayout variant="full-width">
          <section className={styles.services} id="services">
            <div className="container">
              <Heading
                eyebrow={`OUR ${data.shortTitle.toUpperCase()} SERVICES`}
                title={`Practical support across ${data.shortTitle.toLowerCase()}`}
                text="End-to-end advisory support shaped around applicable requirements, your objectives and the facts of each matter."
              />
              <div className={styles.serviceGrid}>
                {data.services.map(([icon, title, description]) => (
                  <article className={styles.serviceCard} key={title}>
                    <span className={styles.icon}><Icon name={icon} /></span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.benefits} id="benefits">
            <div className={`container ${styles.benefitLayout}`}>
              <div>
                <Heading
                  eyebrow="OVERVIEW & KEY BENEFITS"
                  title={data.overviewHeading}
                  text={data.overview[0]}
                />
                {data.overview.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className={styles.benefitGrid}>
                  {data.benefits.map(([icon, title, text]) => (
                    <article key={title}>
                      <span className={styles.icon}><Icon name={icon} /></span>
                      <div><h3>{title}</h3><p>{text}</p></div>
                    </article>
                  ))}
                </div>
              </div>
              <aside className={styles.benefitPanel}>
                <span>ADVISORY FOR {data.shortTitle.toUpperCase()}</span>
                <h3>{data.benefitsHeading}</h3>
                <p>Get a clear view of the applicable framework, practical options and next steps for your organisation.</p>
                <Link href="/contact">Discuss your requirements <Icon name="arrow" /></Link>
              </aside>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.tax} id="framework">
            <div className={`container ${styles.taxGrid}`}>
              <div>
                <Heading
                  eyebrow="REGULATORY FRAMEWORK"
                  title={data.frameworkHeading}
                  text={data.frameworkDescription}
                  light
                />
                <ul className={styles.taxPoints}>
                  {data.framework.map(([title, text]) => (
                    <li key={title}>
                      <Icon name="shield" />
                      <div><strong>{title}</strong><p>{text}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className={styles.taxImage}>
                <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 700px) 100vw, 40vw" />
                <figcaption><strong>{data.shortTitle}</strong><br />Regulatory considerations</figcaption>
              </figure>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.features} id="stakeholders">
            <div className="container">
              <Heading
                eyebrow="WHO WE ASSIST"
                title={data.stakeholdersHeading}
                text={`We assist organisations and stakeholders across the ${data.shortTitle.toLowerCase()} ecosystem.`}
                light
              />
              <div className={styles.featureStrip}>
                {data.stakeholders.map(([title, description]) => (
                  <div key={title} title={description}><Icon name="people" /><span>{title}</span></div>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.comparison} id="comparison">
            <div className="container">
              <Heading
                eyebrow="COMPARATIVE ANALYSIS"
                title={data.comparisonHeading}
                text="The appropriate route depends on the parties, activity, facts and rules applicable to the specific matter."
              />
              <div className={styles.tableWrap} role="region" aria-label={data.comparisonHeading} tabIndex={0}>
                <table>
                  <thead><tr>{data.comparisonHeaders.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                  <tbody>
                    {data.comparison.map((row) => (
                      <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableNote}>This comparison is for general information; confirm requirements against current law and the specific facts.</p>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.process} id="process">
            <div className="container">
              <Heading
                eyebrow="ADVISORY PROCESS"
                title={data.processHeading}
                text="A structured approach from initial assessment and documentation through implementation and follow-up."
              />
              <ol className={styles.timeline}>
                {data.process.map(([title, description], index) => (
                  <li key={title}>
                    <span className={styles.stepIcon}><Icon name={["search", "scale", "document", "file", "people", "calendar"][index % 6]} /></span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.documents} id="documents">
            <div className={`container ${styles.documentGrid}`}>
              <div>
                <Heading
                  eyebrow="DOCUMENTS & PREPARATION"
                  title="Documents to organise"
                  text="The final checklist depends on the issue, forum, transaction and applicable requirements."
                />
                <div className={styles.checklist}>
                  {documentColumns.map((column, index) => (
                    <ul key={index}>
                      {column.map((item) => <li key={item}><Icon name="file" />{item}</li>)}
                    </ul>
                  ))}
                </div>
              </div>
              <div className={styles.documentImage}>
                <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 800px) 100vw, 45vw" />
                <span>Prepared with care.<br /><strong>Reviewed with clarity.</strong></span>
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.requirements} id="requirements">
            <div className="container">
              <Heading
                eyebrow="KEY CONSIDERATIONS"
                title={data.requirementsHeading}
                text="Early review can clarify priorities, evidence and responsibilities before important decisions or deadlines."
              />
              <div className={styles.requirementGrid}>
                {data.requirements.map(([icon, title, text]) => (
                  <article key={title}>
                    <span className={styles.requirementIcon}><Icon name={icon} /></span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.pricing} id="fees">
            <div className="container">
              <Heading
                eyebrow="FEES & ENGAGEMENT"
                title="A scope tailored to your requirements"
                text="Professional fees depend on complexity, urgency, forums, jurisdictions and the agreed scope. Statutory and third-party charges are separate."
              />
              <div className={styles.priceGrid}>
                {data.fees.map(([title, description]) => (
                  <article className={styles.priceCard} key={title}>
                    <span>{data.shortTitle.toUpperCase()}</span>
                    <h3>{title}</h3>
                    <strong className={styles.price}>By scope</strong>
                    <p>{description}</p>
                    <Link className={styles.priceButton} href="/contact">Discuss scope <Icon name="arrow" /></Link>
                  </article>
                ))}
              </div>
              <p className={styles.priceNote}>No outcome, approval or proceeding duration can be guaranteed. Scope and fees are confirmed after review.</p>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.features} id="features">
            <div className="container">
              <Heading eyebrow="WHY CHOOSE ASTRONIS GLOBAL" title="Integrated advisory for practical outcomes" light />
              <div className={styles.featureStrip}>
                {data.features.map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.knowledge} id="resources">
            <div className="container">
              <Heading
                eyebrow="KNOWLEDGE CENTRE"
                title="Guides and practical resources"
                text={`Resources to help your team plan for ${data.shortTitle.toLowerCase()} requirements.`}
              />
              <div className={styles.resourceGrid}>
                {data.resources.map(([type, title]) => (
                  <Link href="/knowledge-centre" key={title}>
                    <span className={styles.icon}><Icon name="file" /></span>
                    <small>{type}</small>
                    <h3>{title}</h3>
                    <span className={styles.resourceAction}>Explore resources <Icon name="arrow" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.faq} id="faqs">
            <div className={`container ${styles.faqLayout}`}>
              <div>
                <Heading eyebrow="FREQUENTLY ASKED QUESTIONS" title="Questions & answers" text={`Answers to common questions about ${data.shortTitle.toLowerCase()}.`} />
                <Link href="/faqs">Browse all FAQs <Icon name="arrow" /></Link>
              </div>
              <PrivateLimitedFaq faqs={data.faqs} styles={{ list: styles.faqList }} />
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.knowledge} id="related">
            <div className="container">
              <Heading eyebrow="RELATED SERVICES & EXPERTISE" title="Explore related expertise" />
              <div className={styles.resourceGrid}>
                {data.related.map(([title, href]) => (
                  <Link href={href} key={title}>
                    <span className={styles.icon}><Icon name="network" /></span>
                    <small>RELATED SERVICE</small>
                    <h3>{title}</h3>
                    <span className={styles.resourceAction}>Explore service <Icon name="arrow" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.final} id="contact">
            <div className="container">
              <span>LET&apos;S START A CONVERSATION</span>
              <h2>{data.finalHeading}</h2>
              <p>{data.finalDescription}</p>
              <Link href="/contact">{data.finalAction} <Icon name="arrow" /></Link>
            </div>
          </section>
        </PageSectionLayout>
      </ServiceChildPageLayout>
    </main>
  );
}
