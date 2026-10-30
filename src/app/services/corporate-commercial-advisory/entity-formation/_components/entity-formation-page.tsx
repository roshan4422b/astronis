import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { getServiceChildHeroImage, services } from "@/data/services";
import PrivateLimitedFaq from "../private-limited/private-limited-faq";
import PageSectionLayout from "./page-section-layout";
import ServiceCards from "./service-cards";
import ServiceChildTestimonial from "@/app/services/_template/service-child-testimonial";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
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
  if (
    data.pageVariant === "securities-appellate-screenshot"
    || data.pageVariant === "consumer-commissions-screenshot"
    || data.pageVariant === "economic-offences-screenshot"
    || data.pageVariant === "regulatory-investigations-screenshot"
    || data.pageVariant === "fdi-structuring-screenshot"
    || data.pageVariant === "foreign-collaboration-screenshot"
    || data.pageVariant === "cross-border-ma-screenshot"
    || data.pageVariant === "cross-border-corporate-structuring-screenshot"
    || data.pageVariant === "fema-cross-border-screenshot"
  ) {
    return <SecuritiesAppellatePage data={data} />;
  }

  if (data.pageVariant === "nclt-screenshot" || data.pageVariant === "tribunal-screenshot" || data.pageVariant === "arbitration-screenshot") {
    return <NcltScreenshotPage data={data} />;
  }

  const corporateService = services.find((service) => service.canonicalSlug === "corporate-commercial-advisory");
  const parentService = services.find((service) => data.serviceHref === `/services/${service.canonicalSlug}`)
    ?? corporateService;
  const categoryAliases: Record<string, string> = {
    "Corporate Governance": "corporate-governance-and-entity-structuring",
    "Corporate Restructuring": "corporate-governance-and-entity-structuring",
    "Entity Structuring & Group Reorganisation": "corporate-governance-and-entity-structuring",
  };
  const category = parentService?.subServices.find((item) => item.title === data.categoryTitle)
    ?? parentService?.subServices.find((item) => item.slug === categoryAliases[data.categoryTitle ?? ""])
    ?? (parentService?.canonicalSlug === corporateService?.canonicalSlug
      ? parentService?.subServices.find((item) => item.slug === "entity-formation-business-setup")
      : undefined);
  const categoryHref = data.categoryHref
    ?? `${parentService ? `/services/${parentService.canonicalSlug}` : "/services/corporate-commercial-advisory"}#${category?.slug ?? "entity-formation-business-setup"}`;
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
  const sectionNavItems = navItems.map(([label, id]) => ({ id, label }));
  const processIcons = ["people", "search", "document", "file", "award", "building", "calendar"];
  const defaultAlternatives = data.slug === "opc"
    ? ["One Person Company", "Private Limited Company", "LLP", "Partnership"]
    : data.slug === "section-8-company"
      ? ["Section 8 Company", "Private Limited Company", "LLP", "Partnership"]
      : ["LLP", "Private Limited Company", "One Person Company", "Partnership"];
  const comparisonHeaders = data.comparisonHeaders ?? defaultAlternatives;
  const showInsights = data.showInsights ?? true;
  const showKnowledge = data.showKnowledge ?? true;
  const showReviewActions = data.showReviewActions ?? true;
  const showFeatures = data.showFeatures ?? true;
  const heroServiceSlug = data.serviceHref?.split("/")[2]
    ?? data.categoryHref?.split("/")[2]
    ?? parentService?.canonicalSlug;
  const heroImage = data.heroImage ?? getServiceChildHeroImage(data.slug, heroServiceSlug) ?? data.image;

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} ${data.heroOverlay === false ? styles.heroNoOverlay : ""} service-child-page-hero`} id="overview">
        <Image
          src={heroImage}
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
            <Link href={data.serviceHref ?? data.categoryParentHref ?? "/services/corporate-commercial-advisory"}>{data.serviceTitle ?? data.categoryParentTitle ?? parentService?.title ?? "Corporate & Commercial"}</Link><span>/</span>
            <Link href={categoryHref}>{data.categoryTitle ?? category?.title ?? "Entity Formation & Business Setup"}</Link><span>/</span>
            <span aria-current="page">{data.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{data.heroEyebrow ?? "CORPORATE &amp; COMMERCIAL ADVISORY · ENTITY FORMATION"}</span>
            <h1>{data.title}</h1>
            <h2 className={`service-child-hero-subtitle ${data.heroSubtitleWrap ? styles.heroSubtitleWrap : ""}`}>{data.heroStatement}</h2>
            <div className={styles.actions}>
              <Link className={styles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceChildPageLayout items={sectionNavItems} includeTestimonial={false}>
      {data.showIntro !== false && <PageSectionLayout variant="full-width">
        <section className={styles.intro}>
        <div className={`container ${styles.introGrid}`}>
          <div>
            <Heading eyebrow={data.shortTitle.toUpperCase()} title={data.introHeading ?? "A clear foundation for your organisation"} />
            <p>{data.description}</p>
            <p>{data.introduction}</p>
          </div>
          <aside className={styles.introPanel}>
            <span>{data.introPanelEyebrow ?? "FORMATION PERSPECTIVE"}</span>
            <h3>{data.introPanelHeading ?? "Start with the way you intend to work."}</h3>
            <p>{data.introPanelDescription ?? "Consider your purpose, participants, responsibilities and plans before settling the formation brief."}</p>
          </aside>
        </div>
        </section>
      </PageSectionLayout>}

      <PageSectionLayout variant="full-width">
        <section className={styles.services}>
        <div className="container">
          <Heading
            eyebrow={`OUR SERVICES FOR ${data.shortTitle.toUpperCase()}`}
            title={data.servicesHeading ?? "Coordinated support from planning to setup"}
            text={data.servicesDescription ?? "Bring the formation steps and connected requirements into one considered plan."}
          />
          <ServiceCards services={data.services} threeColumns={data.serviceCardsThreeColumns} />
          {data.relatedPages && (
            <nav className={styles.relatedPages} aria-label="Related services">
              <span>Explore related services</span>
              {data.relatedPages.map(([title, href]) => (
                <Link key={`${title}-${href}`} href={href}>{title}<Icon name="arrow" /></Link>
              ))}
            </nav>
          )}
        </div>
        </section>

      <section className={`${styles.benefits} ${data.benefitCardsStacked ? styles.benefitsStacked : ""}`} id="benefits">
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
          <div className={`${styles.benefitGrid} ${data.benefitCards ? styles.benefitCards : ""} ${data.benefitCardsStacked ? styles.benefitCardsStacked : ""} ${data.benefitCardsThreeColumns ? styles.benefitCardsThreeColumns : ""} ${data.benefitCardsFourColumns ? styles.benefitCardsFourColumns : ""}`}>
            {data.benefits.map(([icon, title, text]) => (
              <article key={title}>
                <span className={styles.icon}><Icon name={icon} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
        </section>

      {!data.hideStructure && (
        <section className={styles.structure} id="structure">
        <div className={`container ${styles.structureGrid}`}>
          <div>
            <Heading
              eyebrow={data.structureEyebrow ?? "BUSINESS STRUCTURE & TAXATION ASPECTS"}
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
        </section>
      )}

        <section className={styles.comparison} id="comparison">
        <div className="container">
          <Heading
            eyebrow="COMPARATIVE ANALYSIS"
            title={data.comparisonHeading ?? "Which structure is right for you?"}
            text={data.comparisonDescription ?? "A discussion framework for comparing common entity choices. Requirements and tax treatment depend on the proposed activities and current law."}
          />
          {data.comparisonPanels ? (
            <div className={styles.comparisonPanels}>
              {data.comparisonPanels.map((panel) => (
                <article className={styles.comparisonPanel} key={panel.heading}>
                  <h3>{panel.heading}</h3>
                  {panel.description && <p>{panel.description}</p>}
                  <div className={styles.tableWrap} role="region" aria-label={`${panel.heading} comparison`} tabIndex={0}>
                    <table>
                      <thead><tr><th>{panel.rowHeader ?? "Parameter"}</th>{panel.headers.map((item) => <th key={item}>{item}</th>)}</tr></thead>
                      <tbody>{panel.rows.map((row) => (
                        <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                      ))}</tbody>
                    </table>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.tableWrap} role="region" aria-label={`${data.shortTitle} structure comparison`} tabIndex={0}>
              <table>
                <thead><tr><th>Features</th>{comparisonHeaders.map((item, index) => <th className={highlightIndex !== null && index === highlightIndex ? styles.focusCol : ""} key={item}>{item}</th>)}</tr></thead>
                <tbody>{data.comparison.map((row) => (
                  <tr key={row[0]}>{row.map((cell, index) => <td className={highlightIndex !== null && index === highlightIndex + 1 ? styles.focusCol : ""} key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <p className={styles.tableNote}>{data.comparisonNote ?? "Use this overview as a starting point for advice on the proposed structure and circumstances."}</p>
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
              <Link className={styles.priceButton} href="/professionals/enquiry">Get a Quote <Icon name="arrow" /></Link>
            </article>
          </div>
          {data.priceNote !== null && <p className={styles.priceNote}>{data.priceNote ?? "Government charges, applicable taxes and third-party costs are confirmed separately as part of the proposed scope."}</p>}
        </div>
        </section>
      </PageSectionLayout>

      {showFeatures && <PageSectionLayout variant="full-width">
        <section className={styles.features}>
        <div className="container">
          <Heading eyebrow={data.featureEyebrow ?? "KEY FEATURES"} title={data.featureHeading ?? `${data.shortTitle} at a glance`} light />
          <div className={`${styles.featureStrip} ${data.featureItems?.length === 4 ? styles.featureStripFourColumns : data.featureItems ? styles.featureStripWide : ""}`}>{(data.featureItems ?? data.benefits.map(([, title]) => title)).map((title, index) => (
            <div key={title}><Icon name={data.benefits[index % data.benefits.length][0]} /><span>{title}</span>{data.featureDescriptions?.[index] && <small>{data.featureDescriptions[index]}</small>}</div>
          ))}</div>
        </div>
        </section>
      </PageSectionLayout>}

      <PageSectionLayout variant="full-width">
        <section className={styles.faq} id="faqs">
        <div className={`container ${styles.faqLayout}`}>
          <div>
            <Heading eyebrow="FREQUENTLY ASKED QUESTIONS" title="A few useful answers" text={data.faqDescription ?? `Common questions about ${data.shortTitle} formation and planning.`} />
            <Link href="/faqs">Browse all FAQs <Icon name="arrow" /></Link>
          </div>
          <PrivateLimitedFaq faqs={data.faqs} styles={{ list: styles.faqList }} />
        </div>
        </section>
      </PageSectionLayout>

      <ServiceChildTestimonial />

      {showInsights && <PageSectionLayout variant="full-width">
        <section className={styles.insights}>
        <div className="container">
          <div className={styles.sectionTop}><Heading eyebrow={data.insights ? "INSIGHTS & EVENTS" : "INSIGHTS"} title={data.insights ? "Latest Articles, Updates and Events" : "Latest articles, updates and events"} /><Link href="/insights">View all insights <Icon name="arrow" /></Link></div>
          {data.insights ? <div className={styles.articleGrid}>{data.insights.map(([title, date, category], index) => (
            <article key={title}>
              <Link href="/insights" className={styles.articleImage}><Image src={data.insightImages?.[index] ?? ["/Part-14 .png", "/Part-18 .png", "/Part-9 .png"][index]} alt="" fill sizes="(max-width: 650px) 100vw, 33vw" /></Link>
              <div><span>{category}{date ? ` · ${date}` : ""}</span><h3><Link href="/insights">{title}</Link></h3><Link href="/insights" className={styles.readMore}>Read insight <Icon name="arrow" /></Link></div>
            </article>
          ))}</div> : <div className={styles.articleGrid}>{articles.map((article) => (
            <article key={article.slug}>
              <Link href={`/insights/${article.slug}`} className={styles.articleImage}><Image src={article.image} alt="" fill sizes="(max-width: 650px) 100vw, 33vw" /></Link>
              <div><span>{article.category} · Astronis Insights</span><h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link href={`/insights/${article.slug}`} className={styles.readMore}>Read insight <Icon name="arrow" /></Link></div>
            </article>
          ))}</div>}
        </div>
        </section>
      </PageSectionLayout>}

      {showKnowledge && <PageSectionLayout variant="full-width">
        <section className={styles.knowledge}>
        <div className="container">
          <Heading eyebrow="KNOWLEDGE CENTRE" title="Guides, checklists and templates" text={data.resourcesDescription ?? "Explore resources to help organise your formation planning."} />
          <div className={styles.resourceGrid}>{(data.resources ?? [
            ["GUIDE", `${data.shortTitle} formation guide`, "document"],
            ["CHECKLIST", "Formation documents checklist", "file"],
            ["TEMPLATE", "Governance and resolution templates", "folder"],
            ["RESOURCE", "Compliance and filing resources", "calendar"],
          ]).map(([type, title, icon]) => (
            <Link href="/knowledge-centre" key={`${type}-${title}`}><span className={styles.icon}><Icon name={icon} /></span><small>{type}</small><h3>{title}</h3><span className={styles.resourceAction}>Explore resource <Icon name="arrow" /></span></Link>
          ))}</div>
        </div>
        </section>
      </PageSectionLayout>}

      {showReviewActions && <PageSectionLayout variant="full-width">
        <section className={styles.experience}>
        <div className="container">
          <Heading eyebrow="SHARE YOUR EXPERIENCE WITH ASTRONIS GLOBAL" title="Your experience matters" />
          <div className={styles.experienceGrid}>
            <article><Icon name="message" /><div><h3>Write a review</h3><p>Share your experience and help us serve you better.</p></div><Link href="/testimonials">Write a Review <Icon name="arrow" /></Link></article>
            <article><Icon name="play" /><div><h3>Record a video testimonial</h3><p>Share your video feedback about your journey with Astronis Global.</p></div><Link href="/testimonials">Record a Video <Icon name="arrow" /></Link></article>
          </div>
        </div>
        </section>
      </PageSectionLayout>}

      <PageSectionLayout variant="full-width">
        <section className={styles.final}>
            <div className="container">
              <span>YOUR NEXT CHAPTER STARTS HERE</span>
              <h2>{data.finalHeading ?? `Ready to form your ${data.shortTitle}?`}</h2>
              <p>{data.finalDescription ?? "Let our experts guide you through a considered and compliant formation process."}</p>
              <Link href="/contact">{data.finalAction ?? "Schedule a Consultation"} <Icon name="arrow" /></Link>
            </div>
        </section>
      </PageSectionLayout>
      </ServiceChildPageLayout>
    </div>
  );
}

function NcltScreenshotPage({ data }: { data: EntityFormationPageData }) {
  const serviceSlug = data.serviceHref?.split("/")[2] ?? "litigation-dispute-resolution";
  const heroImage = data.heroImage ?? getServiceChildHeroImage(data.slug, serviceSlug);
  const isNclt = data.pageVariant === "nclt-screenshot";
  const shortTitle = data.shortTitle;
  const pageName = data.title;

  return (
    <div className={`${styles.page} ${styles.tribunalScreenshotPage}`}>
      <section className={`${styles.hero} service-child-page-hero`} id="overview">
        <Image
          src={heroImage}
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
            <Link href={data.serviceHref ?? "/services/litigation-dispute-resolution"}>{data.serviceTitle}</Link><span>/</span>
            <Link href={data.categoryHref ?? "/services/litigation-dispute-resolution#tribunals-dispute-resolution"}>{data.categoryTitle}</Link><span>/</span>
            <span aria-current="page">{data.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{data.heroEyebrow}</span>
            <h1>{data.title}</h1>
            <h2 className="service-child-hero-subtitle">{data.heroStatement}</h2>
            <div className={styles.actions}>
              <Link className={styles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceChildPageLayout
        items={[
          { id: "overview", label: "Overview" },
          { id: "services", label: "Services" },
          { id: "approach", label: "Our Approach" },
          { id: "process", label: "Our Process" },
          { id: "benefits", label: "Why Choose Us" },
          { id: "commitment", label: "Our Commitment" },
          ...(data.galleryItems?.length ? [{ id: "gallery", label: "Our Work" }] : []),
          { id: "testimonials", label: "Testimonials" },
        ]}
        includeTestimonial={false}
      >
        <PageSectionLayout variant="full-width">
          <section className={styles.services} id="services">
            <div className="container">
              <Heading eyebrow="OUR SERVICES" title={data.servicesHeading ?? `${pageName} Services`} text={data.servicesDescription} />
              <ServiceCards services={data.services} threeColumns />
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.features} id="approach">
            <div className="container">
              <Heading eyebrow={data.featureEyebrow ?? "OUR APPROACH"} title={data.featureHeading ?? "Strategic. Compliant. Results Driven."} text={data.noteDescription} light />
              <div className={`${styles.featureStrip} ${styles.featureStripFourColumns}`}>
                {(data.featureItems ?? []).map((title, index) => (
                  <div key={title}>
                    <Icon name={data.benefits[index % data.benefits.length][0]} />
                    <span>{title}</span>
                    {data.featureDescriptions?.[index] && <small>{data.featureDescriptions[index]}</small>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.process} id="process">
            <div className="container">
              <Heading eyebrow="OUR PROCESS" title={data.processHeading ?? `${shortTitle} Process`} text={data.processDescription} />
              {data.processTable && (
                <div className={styles.tableWrap} role="region" aria-label={`${shortTitle} process`} tabIndex={0}>
                  <table>
                    <thead><tr>{data.processTable.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                    <tbody>{data.processTable.rows.map((row) => (
                      <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.tribunalBenefits} id="benefits">
            <div className="container">
              <Heading eyebrow="WHY CHOOSE US" title={data.benefitsHeading ?? `Why Choose Our ${shortTitle} Legal Team?`} text={data.introduction} />
              <div className={`${styles.benefitGrid} ${styles.benefitCards} ${styles.benefitCardsThreeColumns}`}>
                {data.benefits.map(([icon, title, description]) => (
                  <article key={title}>
                    <span className={styles.icon}><Icon name={icon} /></span>
                    <div><h3>{title}</h3><p>{description}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.tribunalCommitment} id="commitment">
            <div className="container">
              <Heading eyebrow={data.commitmentEyebrow ?? "OUR COMMITMENT"} title={data.commitmentHeading ?? "Your Rights. Our Priority."} text={data.commitmentDescription} light />
              <div className={styles.tribunalCommitmentGrid}>
                {(data.commitmentItems ?? []).map(([title, description]) => (
                  <div key={title}><Icon name="shield" /><p><strong>{title}</strong><span>{description}</span></p></div>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        {data.galleryItems?.length ? (
          <PageSectionLayout variant="full-width">
            <section className={styles.arbitrationGallery} id="gallery">
              <div className="container">
                <Heading eyebrow="OUR WORK (GALLERY)" title="Select Cases & Success Stories" text="A glimpse of representative work across domestic and international arbitration matters." />
                <div className={styles.arbitrationGalleryGrid}>
                  {data.galleryItems.map(([image, title, alt]) => (
                    <article key={title}>
                      <div className={styles.arbitrationGalleryImage}>
                        <Image src={image} alt={alt} fill sizes="(max-width: 700px) 100vw, 20vw" />
                      </div>
                      <h3>{title}</h3>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </PageSectionLayout>
        ) : null}

        <ServiceChildTestimonial
          eyebrow={data.testimonialEyebrow}
          heading={data.testimonialHeading}
          description={data.testimonialDescription}
        />

        <PageSectionLayout variant="full-width">
          <section className={styles.tribunalCta}>
            <Image src={heroImage} alt="" fill sizes="100vw" className={styles.heroImage} />
            <div className="container">
              <span>GET STARTED TODAY</span>
              <h2>{data.finalHeading ?? `Need Expert Support for ${isNclt ? "NCLT" : shortTitle} Matters?`}</h2>
              <p>{data.finalDescription}</p>
              <Link href="/contact">Schedule a Consultation <Icon name="calendar" /></Link>
            </div>
          </section>
        </PageSectionLayout>
      </ServiceChildPageLayout>
    </div>
  );
}

function SecuritiesAppellatePage({ data }: { data: EntityFormationPageData }) {
  const isConsumerCommissions = data.pageVariant === "consumer-commissions-screenshot";
  const isEconomicOffences = data.pageVariant === "economic-offences-screenshot";
  const isRegulatoryInvestigations = data.pageVariant === "regulatory-investigations-screenshot";
  const isFdiStructuring = data.pageVariant === "fdi-structuring-screenshot";
  const isForeignCollaboration = data.pageVariant === "foreign-collaboration-screenshot";
  const isCrossBorderMa = data.pageVariant === "cross-border-ma-screenshot";
  const isCrossBorderCorporateStructuring = data.pageVariant === "cross-border-corporate-structuring-screenshot";
  const isFemaCrossBorder = data.pageVariant === "fema-cross-border-screenshot";
  const isDownstreamInvestment = data.slug === "downstream-investment";
  const sections = [
    ...(isDownstreamInvestment
      ? [{ id: "services", label: "Services" }, { id: "overview", label: "Overview" }]
      : [{ id: "overview", label: "Overview" }]),
    ...(isCrossBorderCorporateStructuring ? [
      { id: "why-sat", label: "Why Cross-Border Structuring" },
      { id: "who-needs", label: "Who Needs These Services" },
      { id: "services", label: "Structuring Options" },
    ] : isFemaCrossBorder ? [
      { id: "why-sat", label: `Why ${data.title} Matters` },
      { id: "who-needs", label: "Who Needs These Services" },
      ...(!isDownstreamInvestment ? [{ id: "services", label: "Services" }] : []),
    ] : [
      { id: "services", label: "Services" },
      { id: "why-sat", label: isRegulatoryInvestigations ? "Why These Investigations Matter" : isCrossBorderMa ? "Why Cross-Border M&A Is Necessary" : isForeignCollaboration ? "Why Foreign Collaboration Is Necessary" : isFdiStructuring ? "Why FDI Structuring Is Necessary" : isEconomicOffences ? "Why EOW Matters" : isConsumerCommissions ? "Why Consumer Commissions Matter" : "Why SAT Matters" },
      { id: "who-needs", label: "Who Needs These Services" },
    ]),
    { id: "framework", label: isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Regulatory Framework" : isEconomicOffences ? "Economic Offence Framework" : "Tribunal Framework" },
    { id: "appeals-process", label: isRegulatoryInvestigations ? "Our Approach" : isFdiStructuring || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Step-by-Step Process" : isCrossBorderMa ? "M&A Process" : isForeignCollaboration ? "Our Collaboration Process" : isEconomicOffences ? "Investigation Process" : "Appeals Process" },
    { id: "documents", label: "Documents Required" },
    { id: "timelines", label: isRegulatoryInvestigations ? "Industry Timelines" : isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Indicative Timelines" : "Statutory Timelines" },
    { id: "fees", label: isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Government Fees" : "Professional Fees" },
    { id: "precautions", label: isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Precautions & Legal Considerations" : "Precautions" },
    ...(isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? [{ id: "professional-fees", label: "Professional Fees" }] : []),
    { id: "faqs", label: "FAQs" },
    { id: "insights", label: "Insights & Events" },
    { id: "knowledge", label: "Knowledge Centre" },
    { id: "testimonials", label: "Testimonials" },
    { id: "related-services", label: "Related Services" },
  ];
  const frameworkRows = data.satFrameworkRows ?? [];
  const appealSteps = data.satAppealSteps ?? [];
  const timelineRows = data.satTimelineRows ?? [];
  const feeRows = data.satFeeRows ?? [];
  const governmentFeeRows = data.satGovernmentFeeRows ?? [];
  const precautions = data.satPrecautions ?? [];
  const knowledgeItems = data.satKnowledgeItems ?? [];
  const insightImages = [
    "/images/services/nclt-and-nclat-advisory.webp",
    "/images/services/litigation-dispute-resolution.webp",
    "/images/services/arbitration-and-conciliation.webp",
  ];

  return (
    <div className={`${styles.page} ${styles.tribunalScreenshotPage} ${styles.securitiesAppellatePage} ${isConsumerCommissions ? styles.consumerCommissionsPage : ""} ${isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? styles.regulatoryInvestigationsPage : ""} ${isCrossBorderCorporateStructuring ? styles.crossBorderCorporateStructuringPage : ""} ${isFemaCrossBorder ? styles.femaCrossBorderPage : ""}`}>
      <section className={`${styles.hero} service-child-page-hero`} id="sat-hero">
        <Image src={data.heroImage ?? data.image} alt={data.imageAlt} fill priority sizes="100vw" className={styles.heroImage} />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/services">Services</Link><span>/</span>
            <Link href={data.serviceHref ?? "/services/litigation-dispute-resolution"}>{data.serviceTitle}</Link><span>/</span>
            <Link href={data.categoryHref ?? "/services/litigation-dispute-resolution#tribunals-dispute-resolution"}>{data.categoryTitle}</Link><span>/</span>
            <span aria-current="page">{data.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{data.heroEyebrow}</span>
            <h1>{data.title}</h1>
            <h2 className="service-child-hero-subtitle">{data.heroStatement}</h2>
            <Link className={styles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link>
            {isRegulatoryInvestigations && (
              <Link className={styles.secondary} href="/professionals/enquiry">Request Regulatory Support <Icon name="arrow" /></Link>
            )}
            {isFdiStructuring && (
              <Link className={styles.secondary} href="/professionals/enquiry">Request FDI Advisory Support <Icon name="arrow" /></Link>
            )}
            {isForeignCollaboration && (
              <Link className={styles.secondary} href="/professionals/enquiry">Request Foreign Collaboration Support <Icon name="arrow" /></Link>
            )}
            {isCrossBorderMa && (
              <Link className={styles.secondary} href="/professionals/enquiry">Request M&amp;A Advisory Support <Icon name="arrow" /></Link>
            )}
          </div>
        </div>
      </section>

      <ServiceChildPageLayout items={sections} includeTestimonial={false}>
        {(!isCrossBorderCorporateStructuring && !isFemaCrossBorder || isDownstreamInvestment) && <PageSectionLayout variant="full-width">
          <section className={styles.satServices} id="services">
            <div className="container">
              <Heading eyebrow={isConsumerCommissions ? "OUR CONSUMER COMMISSION SERVICES" : isEconomicOffences ? "OUR ECONOMIC OFFENCES WING SERVICES" : isRegulatoryInvestigations ? "OUR REGULATORY & ADMINISTRATIVE SERVICES" : isFdiStructuring ? "OUR FDI STRUCTURING SERVICES" : isForeignCollaboration ? "OUR FOREIGN COLLABORATION SERVICES" : isCrossBorderMa ? "OUR CROSS-BORDER M&A SERVICES" : isFemaCrossBorder ? `OUR ${data.title.toUpperCase()} SERVICES` : "OUR SERVICES"} title={data.servicesHeading ?? "Securities Appellate Tribunal Services"} text={data.servicesDescription} />
              <ServiceCards services={data.services} threeColumns />
            </div>
          </section>
        </PageSectionLayout>}

        <PageSectionLayout variant="full-width">
          <section className={styles.satOverview} id="overview">
            <div className="container">
              <div className={styles.satOverviewGrid}>
                <article className={styles.satOverviewCard}>
                  <Heading eyebrow="OVERVIEW" title={isConsumerCommissions ? "Consumer Commissions – Your Partner in Consumer Rights" : isEconomicOffences ? "Economic Offences Wing – Strategic Legal Support for Complex Financial Matters" : isRegulatoryInvestigations ? "Navigating Complex Regulatory Landscapes" : isFdiStructuring ? "Understanding FDI Structuring in India" : isForeignCollaboration ? "How Astronis Supports International Collaborations in India" : isCrossBorderMa ? "Navigating Cross-Border M&A in India" : isCrossBorderCorporateStructuring ? "What Is Cross-Border Corporate Structuring?" : isFemaCrossBorder ? `What Is ${data.title}?` : "Securities Appellate Tribunal – Your Partner in Securities Dispute Resolution"} />
                  <p>{data.description}</p>
                  <p>{data.introduction}</p>
                  <Link href={isCrossBorderCorporateStructuring || isFemaCrossBorder ? "#appeals-process" : "/contact"}>{isCrossBorderCorporateStructuring ? "Learn More About Our Approach" : isFemaCrossBorder ? `Learn More About ${data.title}` : "Schedule a Consultation"} <Icon name="arrow" /></Link>
                </article>
                <article className={styles.satKeyBenefits}>
                  <h2>Key Benefits</h2>
                  <ul>
                    {(data.satOverviewItems ?? []).map(([icon, title, description]) => (
                      <li key={title}><Icon name={icon} /><span>{title}{(isCrossBorderCorporateStructuring || isFemaCrossBorder) && <small>{description}</small>}</span></li>
                    ))}
                  </ul>
                </article>
                {(isConsumerCommissions || isEconomicOffences || isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa) && (
                  <div className={styles.satOverviewVisual}>
                    <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 700px) 100vw, 22vw" />
                  </div>
                )}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.satAudience} id="why-sat">
            <div className="container">
              <div className={styles.satAudienceGrid}>
                <div>
                  <Heading eyebrow={isConsumerCommissions ? "WHY CONSUMER COMMISSIONS MATTER?" : isEconomicOffences ? "WHY EOW MATTERS" : isRegulatoryInvestigations ? "WHY REGULATORY & ADMINISTRATIVE INVESTIGATIONS MATTER?" : isFdiStructuring ? "WHY FDI STRUCTURING IS NECESSARY?" : isForeignCollaboration ? "WHY FOREIGN COLLABORATION IS NECESSARY?" : isCrossBorderMa ? "WHY CROSS-BORDER M&A IS NECESSARY?" : isCrossBorderCorporateStructuring ? "WHY CROSS-BORDER CORPORATE STRUCTURING IS NECESSARY" : isFemaCrossBorder ? `WHY ${data.title.toUpperCase()} MATTERS` : "WHY SAT MATTERS?"} title={data.benefitsHeading ?? "Why Securities Appellate Tribunal Matters?"} />
                  <div className={styles.satReasonGrid}>
                    {data.benefits.map(([icon, title]) => (
                      <article key={title}><Icon name={icon} /><span>{title}</span></article>
                    ))}
                  </div>
                </div>
                <div id="who-needs">
                  <Heading eyebrow="WHO NEEDS THESE SERVICES?" title={data.structureHeading ?? "Who Needs These Services?"} />
                  <div className={styles.satAudienceList}>
                    {data.structurePoints.map(([icon, title, description]) => (
                      <article key={title}><Icon name={isCrossBorderCorporateStructuring || isFemaCrossBorder ? "check" : icon} /><span><strong>{title}</strong><small>{description}</small></span></article>
                    ))}
                  </div>
                  {isFemaCrossBorder && (data.slug === "overseas-joint-venture" || data.slug === "overseas-direct-investment") && (
                    <div className={`${styles.satOverviewVisual} ${styles.femaAudienceImage}`}>
                      <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 700px) 100vw, 30vw" />
                    </div>
                  )}
                  {isCrossBorderCorporateStructuring && (
                    <div className={`${styles.satOverviewVisual} ${styles.structuringAudienceImage}`}>
                      <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 700px) 100vw, 30vw" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </PageSectionLayout>

        {isCrossBorderCorporateStructuring && (
          <PageSectionLayout variant="full-width">
            <section className={styles.satServices} id="services">
              <div className="container">
                <Heading eyebrow="STRUCTURING OPTIONS" title={data.servicesHeading ?? "Common Cross-Border Structuring Models"} text={data.servicesDescription} />
                <ServiceCards services={data.services} threeColumns />
              </div>
            </section>
          </PageSectionLayout>
        )}
        {isFemaCrossBorder && !isDownstreamInvestment && (
          <PageSectionLayout variant="full-width">
            <section className={styles.satServices} id="services">
              <div className="container">
                <Heading eyebrow={`OUR ${data.title.toUpperCase()} SERVICES`} title={data.servicesHeading ?? `${data.title} Services`} text={data.servicesDescription} />
                <ServiceCards services={data.services} threeColumns />
              </div>
            </section>
          </PageSectionLayout>
        )}

        <PageSectionLayout variant="full-width">
          <section className={styles.satFramework} id="framework">
            <div className="container">
              <div className={`${styles.satThreeColumnGrid} ${isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? styles.regulatoryFrameworkGrid : ""}`}>
                <article className={styles.satPanel}>
                  <Heading eyebrow={isConsumerCommissions ? "CONSUMER COMMISSION FRAMEWORK" : isEconomicOffences ? "ECONOMIC OFFENCE FRAMEWORK" : isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "REGULATORY FRAMEWORK" : "TRIBUNAL FRAMEWORK"} title={isConsumerCommissions ? "Consumer Forums & Jurisdiction" : isEconomicOffences ? "Offence Categories & Key Examples" : isRegulatoryInvestigations ? "Regulatory Bodies & Key Focus Areas" : isFdiStructuring ? (data.satFrameworkHeading ?? "FDI Policy & Regulatory Framework") : isForeignCollaboration ? (data.satFrameworkHeading ?? "Foreign Collaboration Regulatory Framework") : isCrossBorderMa ? (data.satFrameworkHeading ?? "Cross-Border M&A Regulatory Framework") : isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satFrameworkHeading ?? "Regulatory Framework") : "Securities Appellate Tribunal"} />
                  <div className={styles.satTableWrap}>
                    <table><thead><tr><th>{isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satFrameworkColumnLabels?.[0] ?? "Regulatory Body / Framework") : "Aspect"}</th><th>{isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satFrameworkColumnLabels?.[1] ?? "Key Focus Areas") : "Details"}</th></tr></thead>
                      <tbody>{frameworkRows.map(([aspect, details]) => <tr key={aspect}><th scope="row">{aspect}</th><td>{details}</td></tr>)}</tbody>
                    </table>
                  </div>
                  {isCrossBorderCorporateStructuring && <Link className={styles.secondary} href="/insights">View Regulatory Updates <Icon name="arrow" /></Link>}
                </article>
                {(isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder) && (
                  <article className={styles.satPanel}>
                    <Heading eyebrow={isFdiStructuring ? "COMPARISON CHART – FDI ROUTES IN INDIA" : isForeignCollaboration ? "COMPARISON CHART – COLLABORATION MODELS" : isCrossBorderMa ? "COMPARISON CHART – M&A STRUCTURES" : isCrossBorderCorporateStructuring ? "COMPARISON CHART" : isFemaCrossBorder ? "COMPARISON CHART" : "COMPARISON CHART – KEY INVESTIGATION TYPES"} title={isFdiStructuring ? "FDI Routes in India" : isForeignCollaboration ? "Collaboration Models" : isCrossBorderMa ? "M&A Structures" : isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.comparisonHeading ?? "Comparison Chart") : "Investigation Types & Typical Outcomes"} />
                    <div className={styles.satTableWrap}>
                      <table>
                        <thead><tr>{(data.comparisonPanels?.[0]?.headers ?? []).map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
                        <tbody>{(data.comparisonPanels?.[0]?.rows ?? []).map((row, index) => <tr key={row[0] ?? index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  </article>
                )}
                <article className={styles.satPanel} id="appeals-process">
                  <Heading eyebrow={isConsumerCommissions ? "COMPLAINT & APPEAL PROCESS" : isEconomicOffences ? "COMPLAINT & INVESTIGATION PROCESS" : isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satProcessEyebrow ?? "OUR INVESTIGATION PROCESS") : "APPEALS PROCESS"} title={isConsumerCommissions ? "Complaint & Appeal Process" : isEconomicOffences ? "Investigation Process" : isRegulatoryInvestigations ? "From Assessment to Resolution" : isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satProcessHeading ?? "Our Collaboration Process") : "Appeal Steps"} />
                  <ol className={styles.satSteps}>
                    {appealSteps.map(([title, description], index) => (
                      <li key={title}><span>{index + 1}</span><p><strong>{title}</strong><small>{description}</small></p></li>
                    ))}
                  </ol>
                </article>
                {!isCrossBorderCorporateStructuring && !isFemaCrossBorder && <article className={styles.satPanel} id="documents">
                  <Heading eyebrow="DOCUMENTS REQUIRED" title={isConsumerCommissions ? "Consumer Complaint Documents" : isEconomicOffences ? "Investigation Records" : isRegulatoryInvestigations ? "Prepare for an Investigation" : isFdiStructuring ? "FDI Structuring Documents" : isForeignCollaboration ? "Collaboration Documents" : isCrossBorderMa ? "M&A Documents Required" : isCrossBorderCorporateStructuring ? "Documents Required" : "Prepare Your Appeal Record"} />
                  <ul className={styles.satChecklist}>
                    {data.documents.map((document) => <li key={document}><Icon name="check" />{document}</li>)}
                  </ul>
                  <p className={styles.satNote}>{isConsumerCommissions ? "Keep originals and copies of relevant records; the final list depends on the claim." : isEconomicOffences ? "Preserve relevant records and maintain a clear chain of custody." : isRegulatoryInvestigations ? "The final checklist depends on the investigating authority, sector, notice and scope of inquiry." : isFdiStructuring ? "The exact requirements depend on the investor, sector, instrument and proposed transaction." : isForeignCollaboration ? "The final checklist depends on the collaboration model, parties, jurisdictions and scope of work." : isCrossBorderMa ? "The final checklist depends on transaction structure, jurisdictions, financing, parties and due-diligence scope." : isCrossBorderCorporateStructuring ? "The final checklist depends on the jurisdictions, entity type, ownership and proposed activities." : "The final document list depends on the order, appeal grounds and applicable procedure."}</p>
                </article>}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.satDetails}>
            <div className="container">
              <div className={styles.satThreeColumnGrid}>
                {(isCrossBorderCorporateStructuring || isFemaCrossBorder) && (
                  <article className={styles.satPanel} id="documents">
                    <Heading eyebrow="DOCUMENTS REQUIRED" title={isFemaCrossBorder ? `${data.title} Documents Required` : "Documents Required"} />
                    <ul className={styles.satChecklist}>
                      {data.documents.map((document) => <li key={document}><Icon name="check" />{document}</li>)}
                    </ul>
                    <p className={styles.satNote}>The final checklist depends on the jurisdictions, entity type, ownership and proposed activities.</p>
                  </article>
                )}
                <article className={styles.satPanel} id="timelines">
                  <Heading eyebrow={data.satTimelineEyebrow ?? (isRegulatoryInvestigations ? "INDUSTRY TIMELINES (INDICATIVE)" : "STATUTORY TIMELINES (INDICATIVE)")} title={isConsumerCommissions ? "Consumer Complaint Timelines" : isEconomicOffences ? "Investigation Timelines" : isRegulatoryInvestigations ? "Typical Investigation Timelines" : isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satTimelineHeading ?? "Timelines") : "Timelines"} />
                  <div className={styles.satTableWrap}>
                    <table><thead><tr><th>Stage</th><th>Typical timeline</th></tr></thead>
                      <tbody>{timelineRows.map(([stage, timeline]) => <tr key={stage}><th scope="row">{stage}</th><td>{timeline}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className={styles.satNote}>{isConsumerCommissions ? "Limitation and hearing timelines depend on the facts, applicable law and commission schedule." : isEconomicOffences ? "Timelines depend on the facts, jurisdiction, evidence and investigating authority." : isRegulatoryInvestigations ? "These indicative timelines vary by authority, sector, scope, cooperation and case complexity." : isFdiStructuring ? "Timing depends on the investor, route, sector, transaction documents and applicable authority or bank processing." : isForeignCollaboration ? "Timing depends on partner evaluation, negotiation, due diligence and applicable approvals across jurisdictions." : isCrossBorderMa ? "Actual timing depends on transaction complexity, diligence, financing, regulatory review and satisfaction of closing conditions." : isCrossBorderCorporateStructuring || isFemaCrossBorder ? "All timelines are indicative. Actual timing depends on transaction, documentation, filings and authority / bank processing." : "Subject to change based on case complexity and tribunal schedule."}</p>
                </article>
                <article className={styles.satPanel} id="fees">
                  <Heading eyebrow={isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "GOVERNMENT FEES (INDICATIVE)" : "PROFESSIONAL FEES (INDICATIVE)"} title={isConsumerCommissions ? "Consumer Commission Fees (INR)" : isEconomicOffences ? "Investigation Support Fees (INR)" : isRegulatoryInvestigations ? "Government & Statutory Fees" : isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satGovernmentFeeHeading ?? "Government Fees") : "Fee Ranges (INR)"} />
                  <div className={styles.satTableWrap}>
                    <table><thead><tr><th>{isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Activity" : "Service"}</th><th>{isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Fee (₹)" : "Fee range"}</th></tr></thead>
                      <tbody>{(isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? governmentFeeRows : feeRows).map(([service, fees]) => <tr key={service}><th scope="row">{service}</th><td>{fees}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className={styles.satNote}>{isRegulatoryInvestigations ? "Subject to applicable laws, rules and authority schedules. Government fees may vary by jurisdiction and complexity." : isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Subject to applicable laws and government schedules; fees vary by jurisdiction and transaction." : "Fees are indicative only and vary with the matter, urgency and agreed scope."}</p>
                </article>
                <article className={styles.satPanel} id="precautions">
                  <Heading eyebrow="PRECAUTIONS & LEGAL CONSIDERATIONS" title={isConsumerCommissions ? "Before Filing a Complaint" : isEconomicOffences ? "During an Investigation" : isRegulatoryInvestigations ? "Key Compliance Considerations" : isFdiStructuring ? "Plan Your FDI Transaction Carefully" : isCrossBorderMa ? "Plan Your Cross-Border M&A Carefully" : isCrossBorderCorporateStructuring ? "Plan Your Cross-Border Structure Carefully" : isFemaCrossBorder ? `Plan Your ${data.title} Carefully` : "Before Filing an Appeal"} />
                  <ul className={styles.satChecklist}>
                    {precautions.map((precaution) => <li key={precaution}><Icon name="check" />{precaution}</li>)}
                  </ul>
                  {(isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder) && <Link className={styles.secondary} href="/professionals/enquiry">Request a Quote <Icon name="arrow" /></Link>}
                </article>
              </div>
            </div>
          </section>
        </PageSectionLayout>

        {(isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder) && (
          <PageSectionLayout variant="full-width">
            <section className={styles.satDetails} id="professional-fees">
              <div className="container">
                <article className={styles.satPanel}>
                  <Heading eyebrow="PROFESSIONAL FEES" title={isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (data.satProfessionalFeeHeading ?? "Professional Fees") : "Advisory & Representation Fees"} />
                  <div className={styles.satTableWrap}>
                    <table><thead><tr><th>Service</th><th>Professional fee</th></tr></thead>
                      <tbody>{feeRows.map(([service, fees]) => <tr key={service}><th scope="row">{service}</th><td>{fees}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className={styles.satNote}>{isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Professional fees depend on transaction complexity and agreed scope. Government fees, taxes and third-party charges are separate." : "Fees are agreed after assessing the matter, jurisdictions, urgency, record volume and requested scope. Taxes and third-party charges are separate."}</p>
                  <Link className={styles.secondary} href="/professionals/enquiry">Request a Quote <Icon name="arrow" /></Link>
                </article>
              </div>
            </section>
          </PageSectionLayout>
        )}

        <PageSectionLayout variant="full-width">
          <section className={styles.satFaq} id="faqs">
            <div className="container">
              <Heading eyebrow={isRegulatoryInvestigations ? "FREQUENTLY ASKED QUESTIONS" : "FAQS"} title={isConsumerCommissions ? "Consumer Commission FAQs" : isEconomicOffences ? "Economic Offences Wing FAQs" : isRegulatoryInvestigations ? "Regulatory Investigation FAQs" : isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Frequently Asked Questions" : "Securities Appellate Tribunal FAQs"} />
              <div className={styles.satFaqGrid}>
                {data.faqs.map(([question, answer]) => (
                  <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.satInsights} id="insights">
            <div className="container">
              <div className={styles.satSectionHeader}><Heading eyebrow="INSIGHTS & EVENTS" title={isConsumerCommissions ? "Consumer Rights Updates & Insights" : isEconomicOffences ? "Economic Offence Updates & Insights" : isRegulatoryInvestigations ? "Regulatory Insights & Updates" : isFdiStructuring ? "FDI Insights & Updates" : isForeignCollaboration ? "Foreign Collaboration Insights & Events" : isCrossBorderMa ? "Cross-Border M&A Insights & Events" : isCrossBorderCorporateStructuring ? "Latest Insights" : isFemaCrossBorder ? "Insights & Events" : "Securities Law Updates & Insights"} /><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div>
              <div className={styles.satInsightGrid}>
                {(data.insights ?? []).map(([title, date, category], index) => (
                  <article key={title}>
                    <div className={styles.satInsightImage}><Image src={insightImages[index % insightImages.length]} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
                    <div><small>{date} · {category}</small><h3>{title}</h3><Link href="/insights">Read More <Icon name="arrow" /></Link></div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.satKnowledge} id="knowledge">
            <div className="container">
              <div className={styles.satSectionHeader}><Heading eyebrow="KNOWLEDGE CENTRE" title={isConsumerCommissions ? "Consumer Guides & Resources" : isEconomicOffences ? "Economic Offence Guides & Resources" : isRegulatoryInvestigations ? "Regulatory Resources & Guides" : isFdiStructuring ? "FDI Knowledge Centre" : isForeignCollaboration ? "Foreign Collaboration Knowledge Centre" : isCrossBorderMa ? "Cross-Border M&A Knowledge Centre" : isCrossBorderCorporateStructuring ? "Helpful Resources" : isFemaCrossBorder ? "Knowledge Centre" : "Resources & Guides"} /><Link href="/insights">View All Resources <Icon name="arrow" /></Link></div>
              <div className={styles.satKnowledgeGrid}>
                {knowledgeItems.map(([title, description, icon]) => <Link href="/insights" key={title}><Icon name={icon} /><strong>{title}</strong><small>{description}</small></Link>)}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <ServiceChildTestimonial
          eyebrow={data.testimonialEyebrow}
          heading={data.testimonialHeading}
          description={data.testimonialDescription}
        />

        <PageSectionLayout variant="full-width">
          <section className={styles.satRelated} id="related-services">
            <div className="container">
              <Heading eyebrow="EXPLORE RELATED SERVICES" title={isConsumerCommissions || isEconomicOffences || isRegulatoryInvestigations || isFdiStructuring || isForeignCollaboration || isCrossBorderMa || isCrossBorderCorporateStructuring || isFemaCrossBorder ? (isForeignCollaboration || isCrossBorderMa ? "Explore Related IP & Brand Advisory Services" : isCrossBorderCorporateStructuring || isFemaCrossBorder ? "Explore Related FEMA & Cross-Border Services" : "Explore Related Services") : "Connected Legal Support"} />
              <div className={styles.satRelatedGrid}>
                {(data.relatedPages ?? []).map(([title, href]) => <Link href={href} key={title}><Icon name="scale" /><span>{title}</span><Icon name="arrow" /></Link>)}
              </div>
            </div>
          </section>
        </PageSectionLayout>

        <PageSectionLayout variant="full-width">
          <section className={styles.satCta}>
            <Image src={data.heroImage ?? data.image} alt="" fill sizes="100vw" className={styles.heroImage} />
            <div className="container"><span>GET STARTED TODAY</span><h2>{data.finalHeading}</h2><p>{data.finalDescription}</p><Link href="/contact">Schedule a Consultation <Icon name="calendar" /></Link>{isFdiStructuring && <Link href="/professionals/enquiry">Request FDI Advisory Support <Icon name="arrow" /></Link>}{isForeignCollaboration && <Link href="/professionals/enquiry">Request Foreign Collaboration Support <Icon name="arrow" /></Link>}{isCrossBorderMa && <Link href="/professionals/enquiry">Request M&amp;A Advisory Support <Icon name="arrow" /></Link>}{isCrossBorderCorporateStructuring && <Link href="/professionals/enquiry">Request Structuring Support <Icon name="arrow" /></Link>}{isFemaCrossBorder && <Link href="/professionals/enquiry">Talk to Our Experts Today <Icon name="arrow" /></Link>}</div>
          </section>
        </PageSectionLayout>
      </ServiceChildPageLayout>
    </div>
  );
}
