import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import { testimonials } from "@/content/testimonials";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { services } from "@/data/services";
import PrivateLimitedFaq from "../private-limited/private-limited-faq";
import PageSectionNav from "./page-section-nav";
import styles from "./entity-formation-page.module.css";

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

export default function EntityFormationPage({ data }: { data: EntityFormationPageData }) {
  const corporateService = services.find((service) => service.canonicalSlug === "corporate-commercial-advisory");
  const categoryAliases: Record<string, string> = {
    "Corporate Governance": "corporate-governance-and-entity-structuring",
    "Corporate Restructuring": "corporate-governance-and-entity-structuring",
    "Entity Structuring & Group Reorganisation": "corporate-governance-and-entity-structuring",
  };
  const category = corporateService?.subServices.find((item) => item.title === data.categoryTitle)
    ?? corporateService?.subServices.find((item) => item.slug === categoryAliases[data.categoryTitle ?? ""])
    ?? corporateService?.subServices.find((item) => item.slug === "entity-formation-business-setup");
  const categoryHref = `${corporateService ? `/services/${corporateService.canonicalSlug}` : "/services/corporate-commercial-advisory"}#${category?.slug ?? "entity-formation-business-setup"}`;
  const currentTestimonial = data.testimonials ? undefined : testimonials.find(
    (testimonial) =>
      testimonial.status === "approved" &&
      testimonial.publicationConsent &&
      testimonial.service === "Corporate & Commercial Advisory",
  );
  const articles = corporateArticles.slice(0, 3);
  const highlightIndex = data.comparisonFocusIndex === undefined ? 0 : data.comparisonFocusIndex;
  const navItems = data.referenceNavigation
    ? [
        ["Overview", "overview"],
        ["Benefits", "benefits"],
        ["Structure & Comparison", "comparison"],
        ["Process & Timeline", "process"],
        ["Compliance & Taxation", "structure"],
        ["FAQs", "faqs"],
      ]
    : [
        ["Overview", "overview"],
        ["Benefits", "benefits"],
        ["Structure", "structure"],
        ["Comparison", "comparison"],
        ["Process", "process"],
        ["Documents", "documents"],
        ["Fees", "fees"],
        ["FAQs", "faqs"],
      ];
  const processIcons = ["people", "search", "document", "file", "award", "building", "calendar"];
  const defaultAlternatives = data.slug === "opc"
    ? ["One Person Company", "Private Limited Company", "LLP", "Partnership"]
    : data.slug === "section-8-company"
      ? ["Section 8 Company", "Private Limited Company", "LLP", "Partnership"]
      : ["LLP", "Private Limited Company", "One Person Company", "Partnership"];
  const comparisonHeaders = data.comparisonHeaders ?? defaultAlternatives;
  const showTestimonials = data.showTestimonials ?? true;
  const showInsights = data.showInsights ?? true;
  const showKnowledge = data.showKnowledge ?? true;
  const showReviewActions = data.showReviewActions ?? true;
  const showFeatures = data.showFeatures ?? true;

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="overview">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          priority
          sizes="(max-width: 850px) 100vw, 55vw"
          className={styles.heroImage}
        />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/services">Services</Link><span>/</span>
            <Link href="/services/corporate-commercial-advisory">Corporate &amp; Commercial</Link><span>/</span>
            <Link href={categoryHref}>{data.categoryTitle ?? category?.title ?? "Entity Formation & Business Setup"}</Link><span>/</span>
            <span aria-current="page">{data.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{data.heroEyebrow ?? "CORPORATE &amp; COMMERCIAL ADVISORY · ENTITY FORMATION"}</span>
            <h1>{data.title}</h1>
            <h2>{data.heroStatement}</h2>
            <p>{data.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/professionals/enquiry">Get Started <Icon name="arrow" /></Link>
              <Link className={styles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link>
            </div>
          </div>
          <div className={styles.heroNote}>
            <span>{data.heroNoteEyebrow ?? "FORMATION WITH A LONG VIEW"}</span>
            <strong>{data.heroNoteTitle ?? <>Structure first.<br />Then move forward with clarity.</>}</strong>
            <p>{data.heroNoteDescription ?? "Connect formation decisions with the way your organisation will operate."}</p>
          </div>
        </div>
      </section>

      <div className={styles.pageNavLayout}>
        <div className={styles.pageContent}>
          {data.showIntro !== false && <section className={styles.intro}>
        <div className={`container ${styles.introGrid}`}>
          <div>
            <Heading eyebrow={data.shortTitle.toUpperCase()} title={data.introHeading ?? "A clear foundation for your organisation"} />
            <p>{data.description}</p>
            <p>{data.introduction}</p>
          </div>
          <aside className={styles.introPanel}>
            <span>FORMATION PERSPECTIVE</span>
            <h3>Start with the way you intend to work.</h3>
            <p>Consider your purpose, participants, responsibilities and plans before settling the formation brief.</p>
          </aside>
        </div>
      </section>}

      <section className={styles.services}>
        <div className="container">
          <Heading
            eyebrow={`OUR SERVICES FOR ${data.shortTitle.toUpperCase()}`}
            title={data.servicesHeading ?? "Coordinated support from planning to setup"}
            text={data.servicesDescription ?? "Bring the formation steps and connected requirements into one considered plan."}
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
          {data.relatedPages && (
            <nav className={styles.relatedPages} aria-label="Foreign company office structures">
              <span>Explore a specific India office structure</span>
              {data.relatedPages.map(([title, href]) => (
                <Link key={href} href={href}>{title}<Icon name="arrow" /></Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      <section className={styles.benefits} id="benefits">
        <div className={`container ${styles.benefitLayout}`}>
          <div>
            <Heading
              eyebrow="KEY BENEFITS"
              title={data.benefitsHeading ?? `Why choose ${data.title}?`}
              text={data.introduction}
            />
          </div>
          <figure className={styles.benefitImage}>
            <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 850px) 100vw, 38vw" />
            <figcaption>{data.shortTitle}<br /><strong>Considered for your next chapter.</strong></figcaption>
          </figure>
          <div className={styles.benefitGrid}>
            {data.benefits.map(([icon, title, text]) => (
              <article key={title}>
                <span className={styles.icon}><Icon name={icon} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!data.hideStructure && <section className={styles.structure} id="structure">
        <div className={`container ${styles.structureGrid}`}>
          <div>
            <Heading
              eyebrow="BUSINESS STRUCTURE & TAXATION ASPECTS"
              title={data.structureHeading ?? "Plan the structure around the purpose"}
              text={data.introduction}
              light
            />
            <ul className={styles.structurePoints}>
              {data.structurePoints.map(([icon, title, text]) => (
                <li key={title}><Icon name={icon} /><div><strong>{title}</strong><p>{text}</p></div></li>
              ))}
            </ul>
          </div>
          <figure className={styles.structureImage}>
            <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 850px) 100vw, 42vw" />
            <figcaption>Structure for today.<br /><strong>Clarity for what comes next.</strong></figcaption>
          </figure>
        </div>
      </section>}

      <section className={styles.comparison} id="comparison">
        <div className="container">
          <Heading
            eyebrow="COMPARATIVE ANALYSIS"
            title={data.comparisonHeading ?? "Which structure is right for you?"}
            text={data.comparisonDescription ?? "A discussion framework for comparing common entity choices. Requirements and tax treatment depend on the proposed activities and current law."}
          />
          <div className={styles.tableWrap} role="region" aria-label={`${data.shortTitle} structure comparison`} tabIndex={0}>
            <table>
              <thead><tr><th>Features</th>{comparisonHeaders.map((item, index) => <th className={highlightIndex !== null && index === highlightIndex ? styles.focusCol : ""} key={item}>{item}</th>)}</tr></thead>
              <tbody>{data.comparison.map((row) => (
                <tr key={row[0]}>{row.map((cell, index) => <td className={highlightIndex !== null && index === highlightIndex + 1 ? styles.focusCol : ""} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <p className={styles.tableNote}>Use this overview as a starting point for advice on the proposed structure and circumstances.</p>
        </div>
      </section>

      {data.structureSections && (
        <section className={styles.structuringDetails} id="structure">
          <div className={`container ${styles.structuringDetailsGrid}`}>
            {data.structureSections.map((section) => (
              <article className={styles.structuringDetail} key={section.title}>
                <Heading eyebrow={section.eyebrow} title={section.title} text={section.description} />
                {section.image && (
                  <figure>
                    <Image src={section.image} alt={section.imageAlt ?? ""} fill sizes="(max-width: 700px) 100vw, 40vw" />
                  </figure>
                )}
                <ul>{section.items.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.process} id="process">
        <div className="container">
          <Heading eyebrow={data.processEyebrow ?? (data.slug === "foreign-company-setup" ? "SETUP PROCESS" : data.slug === "partnership-firm" || data.slug === "proprietorship" ? data.slug === "partnership-firm" ? "INCORPORATION PROCESS" : "REGISTRATION PROCESS" : "INCORPORATION PROCESS")} title={data.processHeading ?? "Simple, transparent and timely"} text={data.processDescription ?? "A clear sequence of decisions and filings, coordinated around complete information and authority processing."} />
          <ol className={styles.timeline}>
            {data.process.map(([title, description], index) => (
              <li key={title}>
                {data.processNumbers && <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>}
                <span className={styles.stepIcon}><Icon name={processIcons[index] ?? "calendar"} /></span>
                <h3>{title}</h3><p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.documents} id="documents">
        <div className={`container ${styles.documentGrid}`}>
          <div>
            <Heading eyebrow={data.slug === "partnership-firm" || data.slug === "proprietorship" ? "DOCUMENTS REQUIRED" : "DOCUMENTS & REQUIREMENTS"} title={data.documentsHeading ?? "Prepare the right information"} text={data.documentsDescription ?? "The exact checklist depends on the proposed entity, participants and activities. We will confirm requirements for your circumstances."} />
            <ul className={styles.checklist}>{data.documents.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
          </div>
          <aside className={styles.requirementPanel}>
            <span>{data.requirementsEyebrow ?? (data.slug === "partnership-firm" || data.slug === "proprietorship" ? "MINIMUM REQUIREMENTS" : "KEY REQUIREMENTS")}</span>
            <h3>{data.requirementsHeading ?? "Plan the essential details."}</h3>
            {data.requirements.map(([icon, title, text]) => (
              <div className={styles.requirementItem} key={title}>
                <Icon name={icon} /><div><strong>{title}</strong><p>{text}</p></div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {data.advantages && data.challenges && (
        <section className={styles.prosCons}>
          <div className="container">
            <Heading eyebrow="PROS AND CONS" title={`Pros and Cons of ${data.shortTitle}`} />
            <div className={styles.prosConsGrid}>
              <article className={styles.advantages}>
                <h3><Icon name="shield" />Key Advantages</h3>
                <ul>{data.advantages.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
              </article>
              <article className={styles.challenges}>
                <h3><Icon name="help" />Key Challenges</h3>
                <ul>{data.challenges.map((item) => <li key={item}><Icon name="help" />{item}</li>)}</ul>
              </article>
            </div>
          </div>
        </section>
      )}

      <section className={styles.pricing} id="fees">
        <div className="container">
          <Heading
            eyebrow={data.pricingEyebrow ?? "OUR PROFESSIONAL FEES"}
            title={data.pricingHeading ?? "Transparent and value-driven"}
            text={data.pricingDescription ?? "Choose a formation package based on the level of support you need. The scope can be confirmed against your requirements before proceeding."}
          />
          <div className={styles.priceGrid}>
            <article className={styles.priceCard}>
              <span>{data.basicPackageEyebrow ?? "FORMATION ESSENTIALS"}</span><h3>{data.basicPackageName ?? "Basic Package"}</h3>
              <strong className={styles.price}>{data.basicPrice}</strong>
              <ul>{(data.basicFeatures ?? ["Name reservation", "Formation filing coordination", "Constitutional documents", "PAN, TAN and banking next steps"]).map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
              <Link className={styles.priceButton} href="/professionals/enquiry">{data.basicAction ?? "Get Started"} <Icon name="arrow" /></Link>
            </article>
            <article className={`${styles.priceCard} ${styles.featuredPrice}`}>
              <span>{data.comprehensivePackageEyebrow ?? "EXTENDED FORMATION SUPPORT"}</span><h3>{data.comprehensivePackageName ?? "Comprehensive Package"}</h3>
              <strong className={styles.price}>{data.comprehensivePrice}</strong>
              <ul>{(data.comprehensiveFeatures ?? ["Basic formation support", "Applicable registrations assessment", "Initial compliance guidance", "Post-formation advisory scope"]).map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
              <Link className={styles.priceButton} href="/contact">{data.comprehensiveAction ?? "Schedule a Consultation"} <Icon name="arrow" /></Link>
            </article>
            <article className={styles.customPrice}>
              <span>FOR COMPLEX REQUIREMENTS</span><h3>{data.customHeading ?? "Customised Quote"}</h3>
              <p>{data.customDescription ?? "For complex ownership, activity-specific permissions, foreign participation or tailored requirements."}</p>
              <Link href="/professionals/enquiry">Get a Quote <Icon name="arrow" /></Link>
            </article>
          </div>
          {data.priceNote !== null && <p className={styles.priceNote}>{data.priceNote ?? "Government charges, applicable taxes and third-party costs are confirmed separately as part of the proposed scope."}</p>}
        </div>
      </section>

      {showFeatures && <section className={styles.features}>
        <div className="container">
          <Heading eyebrow="KEY FEATURES" title={data.featureHeading ?? `${data.shortTitle} at a glance`} light />
          <div className={`${styles.featureStrip} ${data.featureItems ? styles.featureStripWide : ""}`}>{(data.featureItems ?? data.benefits.map(([, title]) => title)).map((title, index) => (
            <div key={title}><Icon name={data.benefits[index % data.benefits.length][0]} /><span>{title}</span></div>
          ))}</div>
        </div>
      </section>}

      <section className={styles.faq} id="faqs">
        <div className={`container ${styles.faqLayout}`}>
          <div>
            <Heading eyebrow="FREQUENTLY ASKED QUESTIONS" title="A few useful answers" text={data.faqDescription ?? `Common questions about ${data.shortTitle} formation and planning.`} />
            <Link href="/faqs">Browse all FAQs <Icon name="arrow" /></Link>
          </div>
          <PrivateLimitedFaq faqs={data.faqs} styles={{ list: styles.faqList }} />
        </div>
      </section>

      {showTestimonials && (data.testimonials || currentTestimonial) && (
        <section className={styles.testimonial}>
          <div className="container">
            <Heading eyebrow="TESTIMONIALS" title="What Our Clients Say" />
            {data.testimonials ? <div className={styles.testimonialGrid}>
              {data.testimonials.map(([quote, name, designation, company, rating], index) => (
                <figure key={`${name}-${company}-${index}`}>
                  <span className={styles.quoteMark}>“</span>
                  <span className={styles.testimonialAvatar} aria-hidden="true">{name.slice(0, 1)}</span>
                  <blockquote>{quote}</blockquote>
                  <figcaption><strong>{name}</strong><span>{designation}, {company}</span><span className={styles.stars} aria-label={`${rating} out of 5 stars`}>{"★".repeat(rating)}</span></figcaption>
                </figure>
              ))}
            </div> : currentTestimonial && <figure>
              <span className={styles.quoteMark}>“</span>
              <blockquote>{currentTestimonial.quote}</blockquote>
              <figcaption><strong>{currentTestimonial.name}</strong><span>{currentTestimonial.designation}, {currentTestimonial.company}</span><span className={styles.stars} aria-label={`${currentTestimonial.rating} out of 5 stars`}>{"★".repeat(currentTestimonial.rating || 0)}</span></figcaption>
            </figure>}
          </div>
        </section>
      )}

      {showInsights && <section className={styles.insights}>
        <div className="container">
          <div className={styles.sectionTop}><Heading eyebrow={data.insights ? "INSIGHTS & EVENTS" : "INSIGHTS"} title={data.insights ? "Latest Articles, Updates and Events" : "Latest articles, updates and events"} /><Link href="/insights">View all insights <Icon name="arrow" /></Link></div>
          {data.insights ? <div className={styles.articleGrid}>{data.insights.map(([title, date, category], index) => (
            <article key={title}>
              <Link href="/insights" className={styles.articleImage}><Image src={data.insightImages?.[index] ?? ["/Part-14 .png", "/Part-18 .png", "/Part-9 .png"][index]} alt="" fill sizes="(max-width: 650px) 100vw, 33vw" /></Link>
              <div><span>{category} · {date}</span><h3><Link href="/insights">{title}</Link></h3><Link href="/insights" className={styles.readMore}>Read insight <Icon name="arrow" /></Link></div>
            </article>
          ))}</div> : <div className={styles.articleGrid}>{articles.map((article) => (
            <article key={article.slug}>
              <Link href={`/insights/${article.slug}`} className={styles.articleImage}><Image src={article.image} alt="" fill sizes="(max-width: 650px) 100vw, 33vw" /></Link>
              <div><span>{article.category} · Astronis Insights</span><h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link href={`/insights/${article.slug}`} className={styles.readMore}>Read insight <Icon name="arrow" /></Link></div>
            </article>
          ))}</div>}
        </div>
      </section>}

      {showKnowledge && <section className={styles.knowledge}>
        <div className="container">
          <Heading eyebrow="KNOWLEDGE CENTRE" title="Guides, checklists and templates" text="Explore resources to help organise your formation planning." />
          <div className={styles.resourceGrid}>{(data.resources ?? [
            ["GUIDE", `${data.shortTitle} formation guide`, "document"],
            ["CHECKLIST", "Formation documents checklist", "file"],
            ["TEMPLATE", "Governance and resolution templates", "folder"],
            ["RESOURCE", "Compliance and filing resources", "calendar"],
          ]).map(([type, title, icon]) => (
            <Link href="/knowledge-centre" key={type}><span className={styles.icon}><Icon name={icon} /></span><small>{type}</small><h3>{title}</h3><span className={styles.resourceAction}>Explore resource <Icon name="arrow" /></span></Link>
          ))}</div>
        </div>
      </section>}

      {showReviewActions && <section className={styles.experience}>
        <div className="container">
          <Heading eyebrow="SHARE YOUR EXPERIENCE WITH ASTRONIS GLOBAL" title="Your experience matters" />
          <div className={styles.experienceGrid}>
            <article><Icon name="message" /><div><h3>Write a review</h3><p>Share your experience and help us serve you better.</p></div><Link href="/testimonials">Write a Review <Icon name="arrow" /></Link></article>
            <article><Icon name="play" /><div><h3>Record a video testimonial</h3><p>Share your video feedback about your journey with Astronis Global.</p></div><Link href="/testimonials">Record a Video <Icon name="arrow" /></Link></article>
          </div>
        </div>
      </section>}

          <section className={styles.final}>
            <div className="container">
              <span>YOUR NEXT CHAPTER STARTS HERE</span>
              <h2>{data.finalHeading ?? `Ready to form your ${data.shortTitle}?`}</h2>
              <p>{data.finalDescription ?? "Let our experts guide you through a considered and compliant formation process."}</p>
              <Link href="/contact">{data.finalAction ?? "Schedule a Consultation"} <Icon name="arrow" /></Link>
            </div>
          </section>
        </div>

        <PageSectionNav items={navItems.map(([label, id]) => ({ id, label }))} />
      </div>
    </div>
  );
}
