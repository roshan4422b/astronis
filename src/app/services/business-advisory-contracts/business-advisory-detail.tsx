import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import ServiceChildPageLayout from "../_template/service-child-page-layout";
import styles from "../corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";
import type { BusinessAdvisoryDetail } from "@/data/business-advisory-details";
import { getServiceChildHeroImage } from "@/data/services";

const sections = [
  ["Overview", "overview"],
  ["Our Services", "services"],
  ["When Advisory Is Required", "needs"],
  ["Key Benefits", "benefits"],
  ["Our Process", "process"],
  ["Documents & Preparation", "documents"],
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

export function businessAdvisoryMetadata(detail: BusinessAdvisoryDetail): Metadata {
  const canonical = `/services/business-advisory-contracts/business-strategy/${detail.slug}`;
  return {
    title: `${detail.title} | Business Advisory & Contracts | Astronis`,
    description: detail.description,
    alternates: { canonical },
    openGraph: { title: `${detail.title} | Astronis`, description: detail.description, url: canonical, type: "website" },
  };
}

export default function BusinessAdvisoryDetailPage({ detail }: { detail: BusinessAdvisoryDetail }) {
  const heroImage = getServiceChildHeroImage(detail.slug, "business-advisory-contracts") ?? detail.image;

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="hero">
        <Image
          src={heroImage}
          alt={`${detail.title} advisory`}
          fill
          priority
          sizes="(max-width: 850px) 100vw, 50vw"
          className={styles.heroImage}
        />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/services">Services</Link><span>/</span>
            <Link href="/services/business-advisory-contracts">Business Advisory &amp; Contracts</Link><span>/</span>
            <Link href="/services/business-advisory-contracts#business-strategy">Business Strategy</Link><span>/</span>
            <span aria-current="page">{detail.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>BUSINESS ADVISORY &amp; CONTRACTS · BUSINESS STRATEGY</span>
            <h1>{detail.title}</h1>
            <h2>{detail.subtitle}</h2>
            <p>{detail.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/professionals/enquiry">
                Request a Consultation <Icon name="arrow" />
              </Link>
              <Link className={styles.secondary} href="/services/business-advisory-contracts#business-strategy">
                Explore Our Advisory Services <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <aside className={styles.heroNote}>
            <span>STRATEGIC BUSINESS ADVISORY</span>
            <strong>Plan with clarity.<br />Move forward with confidence.</strong>
            <p>Commercial, financial, legal and regulatory perspectives connected to your business objectives.</p>
          </aside>
        </div>
      </section>

      <ServiceChildPageLayout
        items={sections.map(([label, id]) => ({ id, label }))}
      >
          <section className={styles.tax} id="overview">
            <div className={`container ${styles.taxGrid}`}>
              <div>
                <Heading eyebrow="OVERVIEW" title={detail.overviewTitle} text={detail.overview} light />
                <ul className={styles.taxPoints}>
                  {detail.frameworks.slice(0, 4).map((item) => (
                    <li key={item}><Icon name="shield" /><div><strong>{item}</strong></div></li>
                  ))}
                </ul>
              </div>
              <figure className={styles.taxImage}>
                <Image src={detail.image} alt="" fill sizes="(max-width: 850px) 100vw, 42vw" />
                <figcaption>Strategy for today.<br /><strong>Readiness for tomorrow.</strong></figcaption>
              </figure>
            </div>
          </section>

          <section className={styles.services} id="services" data-section-layout="full-width">
            <div className="container">
              <Heading
                eyebrow={`OUR SERVICES IN ${detail.title.toUpperCase()}`}
                title="Integrated advisory for your next business decision"
                text="A coordinated set of strategic, commercial and implementation workstreams shaped around your objectives."
              />
              <div className={styles.serviceGrid}>
                {detail.services.map((item) => (
                  <article className={styles.serviceCard} key={item.title}>
                    <span className={styles.icon}><Icon name="chart" /></span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.benefits} id="needs">
            <div className={`container ${styles.benefitLayout}`}>
              <div>
                <Heading
                  eyebrow="WHEN IS ADVISORY REQUIRED?"
                  title="Bring clarity to important business decisions"
                  text={`Consider ${detail.title.toLowerCase()} when your organisation is planning a material change, opportunity or next stage of growth.`}
                />
                <ul className={styles.checklist}>
                  {detail.needs.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}
                </ul>
              </div>
              <aside className={styles.benefitPanel}>
                <span>BUSINESSES &amp; STAKEHOLDERS WE ASSIST</span>
                <h3>Advice shaped around your role.</h3>
                <ul>
                  {detail.stakeholders.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link href="/professionals/enquiry">Discuss your requirements <Icon name="arrow" /></Link>
              </aside>
            </div>
          </section>

          <section className={styles.comparison} id="benefits">
            <div className="container">
              <Heading
                eyebrow="KEY BENEFITS"
                title={`Why consider ${detail.title.toLowerCase()}?`}
                text="Connect a clear commercial objective with practical advice and defined next steps."
              />
              <div className={styles.benefitGrid}>
                {detail.benefits.map((item) => (
                  <article key={item.title}>
                    <span className={styles.icon}><Icon name="chart" /></span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                ))}
              </div>
              <p className={styles.tableNote}>
                Advisory scope is tailored to the business, available information and applicable requirements. Outcomes depend on the facts and decisions of relevant parties.
              </p>
            </div>
          </section>

          <section className={styles.process} id="process">
            <div className="container">
              <Heading
                eyebrow="OUR PROCESS"
                title="A clear path from assessment to implementation"
                text="Workstreams, responsibilities and timing are agreed to suit the business and the decisions ahead."
              />
              <ol className={styles.timeline}>
                {detail.process.map((item, index) => (
                  <li key={item.title}>
                    <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.stepIcon}><Icon name={["people", "search", "chart", "document", "file", "calendar"][index]} /></span>
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
                  eyebrow="DOCUMENTS & PREPARATION"
                  title="Information to help us get started"
                  text="The exact materials depend on the scope. These items can help establish the business context and priorities."
                />
                <ul className={styles.checklist}>
                  {detail.documents.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}
                </ul>
              </div>
              <div className={styles.documentImage}>
                <Image src={detail.image} alt="" fill sizes="(max-width: 800px) 100vw, 45vw" />
                <span>Prepared with care.<br /><strong>Planned with clarity.</strong></span>
              </div>
            </div>
          </section>

          <section className={styles.requirements}>
            <div className="container">
              <Heading eyebrow="KEY PRECAUTIONS" title="Build a sound foundation for action" text="A few practical steps help make advisory more focused and useful." />
              <div className={styles.requirementGrid}>
                {detail.precautions.map((item, index) => (
                  <article key={item}>
                    <span className={styles.requirementIcon}><Icon name={["search", "document", "shield", "people", "chart"][index % 5]} /></span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <h3>{item}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.features} id="features" data-section-layout="full-width">
            <div className="container">
              <Heading eyebrow="KEY FRAMEWORKS & CONSIDERATIONS" title="Connected perspectives for better decisions" light />
              <div className={styles.featureStrip}>
                {detail.frameworks.map((item) => <div key={item}><Icon name="shield" /><span>{item}</span></div>)}
              </div>
            </div>
          </section>

          <section className={styles.faq} id="faqs" data-section-layout="full-width">
            <div className={`container ${styles.faqLayout}`}>
              <div>
                <Heading
                  eyebrow="FREQUENTLY ASKED QUESTIONS"
                  title="A few useful answers"
                  text={`Common questions about ${detail.title.toLowerCase()} and how an advisory engagement can be scoped.`}
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
              <span>YOUR NEXT CHAPTER STARTS HERE</span>
              <h2>{detail.finalHeading}</h2>
              <p>Speak with our team about your business, objectives and the next decision you are preparing to make.</p>
              <Link href="/professionals/enquiry">Request a Consultation <Icon name="arrow" /></Link>
            </div>
          </section>
      </ServiceChildPageLayout>
    </div>
  );
}
