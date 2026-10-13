import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import type { DetailedServiceGroup, ServicePractice } from "@/data/service-detail-types";
import type { ConsumerRegulatoryDetail } from "@/data/consumer-regulatory-details";
import PageSectionNav from "@/app/services/corporate-commercial-advisory/entity-formation/_components/page-section-nav";
import styles from "./consumer-regulatory-detail.module.css";

const sectionLinks = [
  ["Overview", "overview"],
  ["Services", "services"],
  ["Framework", "framework"],
  ["Who We Assist", "stakeholders"],
  ["Our Approach", "process"],
  ["FAQs", "faqs"],
];

function Heading({
  label,
  title,
  text,
  light = false,
}: {
  label: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`${styles.heading} ${light ? styles.lightHeading : ""}`}>
      <span>{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function ConsumerRegulatoryDetailPage({
  detail,
  group,
  practice,
}: {
  detail: ConsumerRegulatoryDetail;
  group: DetailedServiceGroup;
  practice: ServicePractice;
}) {
  const groupHref = `/services/${practice.slug}#${group.slug}`;

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="service-hero">
        <Image
          src={detail.image}
          alt={detail.imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/services">Services</Link><span aria-hidden="true">/</span>
            <Link href="/services/regulatory-services">Regulatory Services</Link><span aria-hidden="true">/</span>
            <Link href={`${groupHref}#${group.slug}`}>{group.title}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{detail.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{group.title.toUpperCase()} SERVICES</span>
            <h1>{detail.title}</h1>
            <h2>{detail.subtitle}</h2>
            <p>{detail.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/professionals/enquiry">
                Request a Consultation <Icon name="arrow" />
              </Link>
              <Link className={styles.secondaryAction} href={groupHref}>
                Explore Regulatory Services <Icon name="globe" />
              </Link>
            </div>
          </div>
          <aside className={styles.heroNote}>
            <span>REGULATORY ADVISORY</span>
            <strong>Understand the rules.<br />Plan the next step.</strong>
            <p>Service-specific guidance, coordinated around your organisation and operating context.</p>
          </aside>
        </div>
      </section>

      <section className={styles.highlights} aria-label={`${detail.title} highlights`}>
        <div className={`container ${styles.highlightGrid}`}>
          {detail.highlights.map((item) => (
            <article key={item.title}>
              <span className={styles.icon}><Icon name={item.icon} /></span>
              <div><h2>{item.title}</h2><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.pageNavLayout}>
        <div className={styles.pageContent}>
          <section className={styles.overview} id="overview">
            <div className={`container ${styles.overviewGrid}`}>
              <div>
                <Heading
                  label="SERVICE OVERVIEW"
                  title={detail.overview.heading}
                  text="An informed regulatory plan starts with the facts of your product, activity and operating model."
                />
                {detail.overview.paragraphs.map((paragraph) => <p className={styles.overviewText} key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>

      <section className={styles.services} id="services">
        <div className="container">
          <Heading
            label="OUR SERVICES"
            title={`How we support ${detail.title.replace(" Advisory", "").replace(" Regulatory", "").toLowerCase()}`}
            text="A coordinated set of regulatory workstreams, tailored to the activity, evidence and outcomes you need to address."
          />
          <div className={styles.serviceGrid}>
            {detail.services.map((item, index) => (
              <article className={styles.serviceCard} key={item.title}>
                <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.icon}><Icon name={detail.highlights[index % detail.highlights.length].icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.framework} id="framework">
        <div className={`container ${styles.frameworkGrid}`}>
          <div className={styles.frameworkFeature}>
            <span className={styles.cardLabel}>REGULATORY LANDSCAPE</span>
            <h2>Know the framework behind each decision.</h2>
            <p>{detail.frameworkNote}</p>
            <Link href="/professionals/enquiry" className={styles.frameworkLink}>Talk to our regulatory team <Icon name="arrow" /></Link>
          </div>
          <div className={styles.frameworkContent}>
            <Heading
              label="KEY LAWS & FRAMEWORKS"
              title={`A considered view of ${detail.title.toLowerCase()}`}
              text="The specific rules, notifications and authority directions should be confirmed for each matter."
            />
            <ul className={styles.frameworkList}>
              {detail.framework.map((item) => (
                <li key={item.title}>
                  <Icon name="shield" />
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.stakeholders} id="stakeholders">
        <div className="container">
          <Heading
            label="WHO WE ASSIST"
            title="Support shaped around your role"
            text={`We work with organisations and stakeholders navigating ${detail.title.toLowerCase()} questions at different stages of operation.`}
          />
          <div className={styles.stakeholderGrid}>
            {detail.stakeholders.map((item) => (
              <article key={item.title}><span className={styles.icon}><Icon name="people" /></span><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.process} id="process">
        <div className="container">
          <Heading
            label="OUR APPROACH"
            title="A clear process from assessment to follow-through"
            text="Each engagement is scoped to the relevant activity, available records and decision milestones."
          />
          <ol className={styles.timeline}>
            {detail.process.map((item, index) => (
              <li key={item.title}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.stepIcon}><Icon name={["search", "scale", "document", "file", "calendar"][index % 5]} /></span>
                <h3>{item.title}</h3><p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.considerations}>
        <div className={`container ${styles.considerationGrid}`}>
          <div>
            <Heading
              label="KEY CONSIDERATIONS"
              title="Plan for the details that shape compliance"
              text="Addressing these points early can help reduce avoidable delays and keep responsibilities clear."
            />
            <div className={styles.considerationList}>
              {detail.considerations.map((item) => (
                <article key={item.title}><span aria-hidden="true">✓</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>
              ))}
            </div>
          </div>
          <aside className={styles.considerationPanel}>
            <span className={styles.cardLabel}>A PRACTICAL STARTING POINT</span>
            <h3>Bring the right facts together.</h3>
            <p>Activity, product or project details, current permissions and authority correspondence help define a useful advisory scope.</p>
            <Link href="/professionals/enquiry">Start a conversation <Icon name="arrow" /></Link>
          </aside>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className="container">
          <Heading
            label="SERVICE-SPECIFIC VIEW"
            title={detail.comparison.heading}
            text="Use this high-level guide to organise the initial review. Applicability depends on the facts and current requirements."
          />
          <div className={styles.tableWrap} role="region" aria-label={detail.comparison.heading} tabIndex={0}>
            <table>
              <thead><tr>{detail.comparison.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
              <tbody>{detail.comparison.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className={styles.tableNote}>This summary is for general information and does not replace advice on a specific product, project or regulatory matter.</p>
        </div>
      </section>

      <section className={styles.resources}>
        <div className="container">
          <div className={styles.resourcesHeading}>
            <Heading label="INSIGHTS & RESOURCES" title="Keep informed as requirements evolve" text="Explore further information and discuss how current regulatory developments may affect your organisation." />
            <Link href="/insights" className={styles.textLink}>Explore all insights <Icon name="arrow" /></Link>
          </div>
          <div className={styles.resourceGrid}>
            <Link href="/insights" className={styles.resourceCard}>
              <span className={styles.resourceLabel}>INSIGHTS</span><h3>Regulatory updates and perspectives</h3>
              <p>Read the latest commentary and updates from Astronis Global.</p><span className={styles.readMore}>Explore insights <Icon name="arrow" /></span>
            </Link>
            <Link href="/knowledge-centre" className={styles.resourceCard}>
              <span className={styles.resourceLabel}>KNOWLEDGE CENTRE</span><h3>Guidance for regulatory decisions</h3>
              <p>Browse information to help frame your next compliance question.</p><span className={styles.readMore}>Visit knowledge centre <Icon name="arrow" /></span>
            </Link>
            <Link href="/resources/business-guides" className={styles.resourceCard}>
              <span className={styles.resourceLabel}>BUSINESS GUIDES</span><h3>Practical resources for your team</h3>
              <p>Explore available guides and identify the right next step for your business.</p><span className={styles.readMore}>Browse business guides <Icon name="arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.faq} id="faqs">
        <div className={`container ${styles.faqGrid}`}>
          <div>
            <Heading
              label="FREQUENTLY ASKED QUESTIONS"
              title={`${detail.title}: common questions`}
              text="Answers to help you frame an initial conversation. The applicable position should be confirmed for your circumstances."
            />
            <Link className={styles.textLink} href="/contact">Have another question? Contact us <Icon name="arrow" /></Link>
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

          <section className={styles.finalCta} id="consultation">
            <div className={`container ${styles.finalInner}`}>
              <div>
                <span className={styles.cardLabel}>LET&apos;S DISCUSS YOUR REQUIREMENTS</span>
                <h2>Move forward with a clearer regulatory plan.</h2>
                <p>Tell us about your organisation, activity and the regulatory question you need to address.</p>
              </div>
              <div className={styles.finalActions}>
                <Link href="/professionals/enquiry" className={styles.primaryAction}>Request a Consultation <Icon name="arrow" /></Link>
                <Link href="/contact" className={styles.finalContact}><Icon name="mail" /> Contact Astronis Global</Link>
              </div>
            </div>
          </section>
        </div>
        <PageSectionNav items={sectionLinks.map(([label, id]) => ({ id, label }))} />
      </div>
    </div>
  );
}
