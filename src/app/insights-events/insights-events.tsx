"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import { corporateAdvisoryInsights, splitCorporateHeadline } from "@/content/corporate-advisory-insights";
import { regulatoryInsights as regulatoryInsightArticles } from "@/content/regulatory-insights";
import { businessAdvisoryInsights } from "@/content/business-advisory-insights";
import { legalAdvisoryInsights } from "@/content/legal-advisory-insights";
import { priorityInsights } from "@/content/priority-insights";
import { rbiNbfcInsights } from "@/content/rbi-nbfc-insights";
import { cloudCollaborationInsights, digitalBusinessInsights } from "@/content/digital-solutions";
import { homeMedia } from "@/content/home-media";
import { testimonials } from "@/content/testimonials";
import { globalPresenceInsights } from "@/app/global-presence/ideas-across-borders/ideas-directory";
import { professionalInsights } from "@/app/professionals/insights-by-professional/page-content";
import gstStyles from "../insights/gst-updates.module.css";
import styles from "./insights-events.module.css";

type HubInsight = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  date?: string;
  author?: string;
  audience?: string;
  source: string;
  searchTerms: string;
  court?: string;
};

const globalImages: Record<string, string> = {
  europe: "/images/european-union-institutions.jpg",
  uae: "/images/uae-dubai-skyline.jpg",
  trade: "/international-regions.png",
  regulation: "/Banking & Financial Services .png",
  diligence: "/Part-18 .png",
  eventsImage: "/Part-14 .png",
  publicationsImage: "/Part-6 .png",
};

const sectionImages = {
  corporate: [
    "/Real Estate & Construction .png",
    "/Part-14 .png",
    "/Part-18 .png",
    "/Part-9 .png",
    "/Part-6 .png",
  ],
  regulatory: [
    "/Banking & Financial Services .png",
    "/international-network-hero.png",
    "/international-regions.png",
    "/Part-10 .png",
    "/Part-11 .png",
  ],
  business: [
    "/Part-12 .png",
    "/Part-13 .png",
    "/Part-15 .png",
    "/Part-17 .png",
    "/Part-20 .png",
  ],
  legal: [
    "/Banking & Financial Services1 .png",
    "/Part-4 .png",
    "/Part-5 .png",
    "/Part-7 .png",
    "/Part-8 .png",
  ],
  priority: [
    "/images/services/regulatory-and-compliance.webp",
    "/images/services/corporate-and-commercial-advisory.webp",
    "/images/services/arbitration-and-conciliation.webp",
    "/images/services/business-advisory-and-consulting.webp",
    "/images/services/gst-and-indirect-tax-regulatory-support.webp",
  ],
  rbi: [
    "/images/services/banking-nbfc-and-financial-services-advisory.webp",
    "/images/services/gst-and-indirect-tax-regulatory-support.webp",
    "/Banking & Financial Services .png",
    "/Part-10 .png",
    "/Part-11 .png",
  ],
} as const;

const hubInsights: HubInsight[] = [
  ...corporateArticles.map((article) => ({
    title: article.title,
    category: article.category,
    description: article.excerpt,
    image: article.image,
    href: `/insights/${article.slug}`,
    source: "Corporate & Commercial Advisory",
    searchTerms: `${article.category} corporate business services`,
  })),
  ...corporateAdvisoryInsights.map((insight) => ({
    title: insight.title,
    category: "Corporate Advisory",
    description: insight.description,
    audience: insight.audience,
    image: insight.image,
    href: `/insights/${insight.slug}`,
    source: "Corporate & Commercial Advisory",
    searchTerms: `${insight.audience} corporate advisory business`,
  })),
  ...regulatoryInsightArticles.map((insight) => ({
    title: insight.title,
    category: "Regulatory Insight",
    description: "",
    image: "/Banking & Financial Services .png",
    href: `/insights/${insight.slug}`,
    source: "Regulatory Intelligence",
    searchTerms: insight.focus,
  })),
  ...businessAdvisoryInsights.map((insight) => ({
    title: insight.title,
    category: "Business Advisory",
    description: "",
    image: "/Part-18 .png",
    href: `/insights/${insight.slug}`,
    source: "Business Advisory",
    searchTerms: insight.focus,
  })),
  ...legalAdvisoryInsights.map((insight) => ({
    title: insight.title,
    category: "Legal Advisory",
    description: "",
    image: "/Part-14 .png",
    href: `/insights/${insight.slug}`,
    source: "Legal Advisory & Dispute Resolution",
    searchTerms: insight.focus,
  })),
  ...priorityInsights.map((insight) => ({
    title: insight.title,
    category: insight.category,
    description: "",
    image: insight.image,
    href: `/insights/${insight.slug}`,
    source: "Priority Insights",
    searchTerms: insight.category,
  })),
  ...rbiNbfcInsights.map((insight) => ({
    title: insight.title,
    category: "Banking, RBI & Financial Services",
    description: "",
    image: "/images/services/banking-nbfc-and-financial-services-advisory.webp",
    href: `/insights/${insight.slug}`,
    source: "Banking, RBI & Financial Services",
    searchTerms: "banking RBI NBFC FinTech digital lending",
  })),
  ...professionalInsights.map((insight) => ({
    title: insight.title,
    category: insight.category,
    description: insight.description,
    image: insight.image,
    href: insight.href,
    date: insight.date,
    author: insight.author,
    source: "Insights by Professionals",
    searchTerms: `${insight.topics} ${insight.practice} ${insight.industry} ${insight.jurisdiction}`,
  })),
  ...globalPresenceInsights.map((insight) => ({
    title: insight.title,
    category: insight.category,
    description: insight.description,
    image: globalImages[insight.image] || "/globalpresence.png",
    href: insight.href,
    date: insight.date || undefined,
    source: "Global Presence",
    searchTerms: `${insight.category} global jurisdiction international`,
  })),
  ...cloudCollaborationInsights.map((insight) => ({
    title: insight.title,
    category: "Technology & Digital",
    description: "Technology perspectives from the Cloud & Digital Infrastructure practice.",
    image: insight.image,
    href: insight.href,
    date: insight.date,
    source: "Technology & Digital Solutions",
    searchTerms: "technology cloud digital infrastructure india",
  })),
  ...digitalBusinessInsights.map((insight) => ({
    title: insight.title,
    category: insight.category,
    description: "Perspectives from Astronis Global's digital business practice.",
    image: insight.image,
    href: insight.href,
    source: "Technology & Digital Solutions",
    searchTerms: `${insight.category} technology digital business`,
  })),
].sort((a: HubInsight, b: HubInsight) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));

const deduplicatedInsights = hubInsights.filter(
  (insight, index, all) => all.findIndex((item) => item.title === insight.title) === index,
);

const caseLawInsights: HubInsight[] = professionalInsights
  .filter((insight) => /arbitration|MSEFC jurisdiction/i.test(insight.title))
  .map((insight) => ({
    title: insight.title,
    category: insight.category,
    description: insight.description,
    image: insight.image,
    href: insight.href,
    date: insight.date,
    author: insight.author,
    source: "Insights by Professionals",
    searchTerms: `${insight.topics} ${insight.practice} ${insight.industry} ${insight.jurisdiction}`,
    court: "Arbitration",
  }));

const popularSearches = ["RBI", "MCA", "SEBI", "FEMA", "GST", "NBFC", "Startups", "ESG"];
const regulatoryTabs = [
  "All", "MCA", "RBI", "SEBI", "IFSCA", "FEMA", "GST", "IPR", "MSME", "RERA", "Labour", "Environment", "Competition", "Others",
] as const;
const courtTabs = [
  "Supreme Court", "High Courts", "NCLT/NCLAT", "DRT/DRAT", "Tribunals", "Arbitration", "Consumer", "NI Act", "Others",
] as const;

const insightCategories = [
  ["file", "Articles & Resources", "Articles, analysis and practical resources.", "/insights/articles-and-resources", "/Part-6 .png"],
  ["file", "White Papers", "Research on key sectors and regulations.", "/insights/white-papers-research", "/Part-18 .png"],
  ["building", "Government Notifications", "Central and state notifications.", "/insights/government-notifications", "/Part-16 .png"],
  ["scale", "Legal Updates", "Key judgments and regulatory changes.", "/insights/legal-updates", "/Part-14 .png"],
  ["chart", "Business Updates", "Policy updates affecting businesses.", "/insights/business-updates", "/Part-18 .png"],
  ["building", "RBI Circulars", "Reserve Bank updates.", "/insights/rbi-circulars", "/Banking & Financial Services .png"],
  ["chart", "SEBI Updates", "SEBI developments.", "/insights/sebi-updates", "/Part-16 .png"],
  ["percent", "GST Updates", "GST news and advisories.", "/insights/gst-updates", "/Part-14 .png"],
] as const;

const resources = [
  ["file", "Guides & Toolkits", "Practical guides, checklists and step-by-step resources.", "/Part-14 .png", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "/Part-6 .png", "/insights/compliance-calendar"],
  ["pencil", "Research & Reports", "Research and in-depth publications.", "/Part-16 .png", "/resources"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key business questions.", "/Part-18 .png", "/faqs"],
] as const;

const approvedTestimonials = testimonials
  .filter((item) => item.status === "approved" && item.publicationConsent && item.quote)
  .slice(0, 3);

function formatSearchText(insight: HubInsight) {
  return [
    insight.title,
    insight.category,
    insight.description,
    insight.author,
    insight.source,
    insight.searchTerms,
  ].join(" ").toLowerCase();
}

function regulatorIconFor(insight: HubInsight) {
  const text = `${insight.title} ${insight.searchTerms}`;
  if (/RBI|banking|NBFC/i.test(text)) return "building";
  if (/FEMA|foreign exchange/i.test(text)) return "globe";
  if (/GST/i.test(text)) return "percent";
  if (/SEBI|securities/i.test(text)) return "shield";
  return "scale";
}

function SectionHeading({
  title,
  href,
  action,
  subtitle,
}: {
  title: string;
  href: string;
  action: string;
  subtitle?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <Link href={href}>{action}<Icon name="arrow" /></Link>
    </div>
  );
}

function InsightCard({
  insight,
  featured = false,
  iconName,
  actionLabel = "Read More",
}: {
  insight: HubInsight;
  featured?: boolean;
  iconName?: string;
  actionLabel?: string;
}) {
  const headline = insight.audience
    ? splitCorporateHeadline(insight.title)
    : { lead: insight.title, continuation: "" };

  return (
    <Link href={insight.href} className={`${styles.insightCard} ${featured ? styles.featuredCard : ""}`}>
      <span className={styles.insightImage}>
        <Image src={insight.image} alt="" fill sizes={featured ? "(max-width: 760px) 100vw, 45vw" : "(max-width: 760px) 100vw, 25vw"} />
      </span>
      <span className={styles.insightBody}>
        {iconName ? (
          <span className={styles.regulatoryLabel}><Icon name={iconName} /><span className={styles.insightCategory}>{insight.category}</span></span>
        ) : insight.audience ? (
          <span className={styles.insightAudience}>{insight.audience}</span>
        ) : <span className={styles.insightCategory}>{insight.category}</span>}
        {insight.date && <time>{insight.date}</time>}
        <strong>{headline.lead}{headline.continuation && <> <span className={styles.headlineContinuation}>{headline.continuation}</span></>}</strong>
        {!insight.audience && insight.description && <span className={styles.insightDescription}>{insight.description}</span>}
        {insight.author && <span className={styles.insightAuthor}>{insight.author}</span>}
        <span className={styles.readMore}>{actionLabel} <Icon name="arrow" /></span>
      </span>
    </Link>
  );
}

function createSectionInsights<T extends { slug: string; title: string }>(
  items: readonly T[],
  category: string,
  source: string,
  images: readonly string[],
  descriptionFor: (item: T) => string,
  searchTermsFor: (item: T) => string,
): HubInsight[] {
  return items.slice(0, 5).map((item, index) => ({
    title: item.title,
    category,
    description: descriptionFor(item),
    image: images[index],
    href: `/insights/${item.slug}`,
    source,
    searchTerms: searchTermsFor(item),
  }));
}

function FeaturedInsightCards({
  insights,
  featuredPosition = "left",
}: {
  insights: readonly HubInsight[];
  featuredPosition?: "left" | "right";
}) {
  const cards = insights.slice(0, 5);
  const supportingCards = cards.slice(1);
  const supportingGrid = (
    <div className={styles.supportingGrid}>
      {supportingCards.map((insight) => (
        <InsightCard key={`${insight.title}-${insight.source}`} insight={insight} />
      ))}
    </div>
  );

  return cards.length ? (
    <div className={`${styles.featuredGrid} ${featuredPosition === "right" ? styles.featuredRight : ""}`}>
      {featuredPosition === "right" && supportingGrid}
      <InsightCard insight={cards[0]} featured />
      {featuredPosition === "left" && supportingGrid}
    </div>
  ) : (
    <div className={styles.emptyState} role="status">No insights found.</div>
  );
}

export default function InsightsEvents() {
  const [query, setQuery] = useState("");
  const [regulator, setRegulator] = useState<(typeof regulatoryTabs)[number]>("All");
  const [court, setCourt] = useState<(typeof courtTabs)[number]>("Supreme Court");
  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = useMemo(
    () => normalizedQuery
      ? deduplicatedInsights.filter((insight) => formatSearchText(insight).includes(normalizedQuery))
      : deduplicatedInsights,
    [normalizedQuery],
  );
  const regulatoryInsights = useMemo(() => {
    const updates = deduplicatedInsights.filter((insight) => /regulatory update|legal update/i.test(insight.category));
    if (regulator === "All") return updates.slice(0, 4);
    return updates.filter((insight) => formatSearchText(insight).includes(regulator.toLowerCase())).slice(0, 4);
  }, [regulator]);
  const visibleCaseLaw = useMemo(
    () => caseLawInsights.filter((insight) => insight.court === court),
    [court],
  );
  const featuredInsights = normalizedQuery
    ? searchResults.slice(0, 5)
    : deduplicatedInsights.filter((insight) => insight.category === "Corporate Advisory").slice(0, 5);
  const corporateCards = featuredInsights.map((insight, index) => ({
    ...insight,
    image: sectionImages.corporate[index],
  }));
  const regulatoryCards = createSectionInsights(
    regulatoryInsightArticles,
    "Regulatory Intelligence",
    "Regulatory Intelligence",
    sectionImages.regulatory,
    (insight) => insight.focus,
    (insight) => insight.focus,
  );
  const businessCards = createSectionInsights(
    businessAdvisoryInsights,
    "Business Advisory",
    "Business Advisory",
    sectionImages.business,
    (insight) => insight.focus,
    (insight) => insight.focus,
  );
  const legalCards = createSectionInsights(
    legalAdvisoryInsights,
    "Legal Advisory",
    "Legal Advisory & Dispute Resolution",
    sectionImages.legal,
    (insight) => insight.focus,
    (insight) => insight.focus,
  );
  const priorityCards = createSectionInsights(
    priorityInsights,
    "Priority Insight",
    "Priority Insights",
    sectionImages.priority,
    (insight) => `${insight.category} priority insight`,
    (insight) => insight.category,
  );
  const rbiCards = createSectionInsights(
    rbiNbfcInsights,
    "Banking, RBI & Financial Services",
    "Banking, RBI & Financial Services",
    sectionImages.rbi,
    () => "Banking, RBI & Financial Services insight",
    () => "banking RBI NBFC FinTech digital lending",
  );

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("featured-insights")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image src="/corporate-regulatory-hero.png" alt="" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>Insights &amp; Events</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1>Insights &amp; Events</h1>
            <h2>Ideas. Analysis. Perspective. For What’s Next.</h2>
            <p>Our insights and events bring you the latest legal, regulatory and business developments, practical analysis and expert perspectives to help you make informed decisions.</p>
            <div className={styles.heroActions}>
              <Link href="#featured-insights">Explore Latest Insights <Icon name="arrow" /></Link>
              <Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <form className={gstStyles.searchPanel} onSubmit={submitSearch}>
          <label className={gstStyles.searchBox}>
            <span className={styles.srOnly}>Search insights, regulatory updates, case laws, industries, services or topics</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights, regulatory updates, case laws, industries, services or topics..."
            />
            <Icon name="search" />
          </label>
          <div className={gstStyles.popularTopics}>
            <strong>Popular Searches:</strong>
            <div>{popularSearches.map((term) => <button type="button" key={term} onClick={() => setQuery(term)}>{term}</button>)}</div>
          </div>
        </form>

        <section className={styles.section} aria-labelledby="explore-title">
          <SectionHeading title="Explore Our Insights" href="/insights" action="View All Insights" />
          <div className={styles.categoryGrid}>
            {insightCategories.map(([icon, title, description, href, image]) => (
              <Link href={href} className={styles.categoryCard} key={title}>
                <span className={styles.categoryImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 44vw, 12vw" /></span>
                <span className={styles.categoryIcon}><Icon name={icon} /></span>
                <strong>{title}</strong>
                <span>{description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="featured-insights">
          <SectionHeading title={normalizedQuery ? "Search Results" : "Corporate Advisory"} href="/insights/corporate-advisory" action="View All 20 Articles" />
          <FeaturedInsightCards insights={corporateCards} />
        </section>

        <section className={`${styles.section} ${styles.regulatorySpotlight}`} id="regulatory-editorial">
          <div className={styles.regulatoryEditorialHeading}>
            <div>
              <h2 className={styles.regulatoryEditorialTitle}>Regulatory Intelligence &amp; Compliance</h2>
              <p>Practical perspectives on the rules shaping Indian businesses.</p>
            </div>
            <Link href="/insights/regulatory-intelligence">View all 20 insights<Icon name="arrow" /></Link>
          </div>
          <FeaturedInsightCards insights={regulatoryCards} featuredPosition="right" />
        </section>

        <section className={`${styles.section} ${styles.businessAdvisorySection}`} id="business-advisory">
          <div className={styles.businessEditorialHeading}>
            <div>
              <h2 className={styles.businessEditorialTitle}>Business Advisory &amp; Growth</h2>
              <p>Commercial strategy, investment readiness and growth planning for Indian businesses.</p>
            </div>
            <Link href="/insights/business-advisory">View all 20 insights<Icon name="arrow" /></Link>
          </div>
          <FeaturedInsightCards insights={businessCards} />
        </section>

        <section className={`${styles.section} ${styles.legalInsightSection}`} id="legal-advisory-disputes">
          <div className={styles.legalEditorialHeading}>
            <div>
              <h2 className={styles.legalEditorialTitle}>Legal Advisory &amp; Dispute Resolution</h2>
              <p>20 Authoritative Insights</p>
            </div>
            <Link href="/insights/legal-advisory-disputes">View all 20 insights<Icon name="arrow" /></Link>
          </div>
          <FeaturedInsightCards insights={legalCards} featuredPosition="right" />
        </section>

        <section className={styles.section} id="priority-insights">
          <SectionHeading title="Priority Insights" subtitle="Publication-ready headlines spanning regulatory, corporate, legal and business priorities." href="/insights/priority-insights" action="View all 20 insights" />
          <FeaturedInsightCards insights={priorityCards} />
        </section>

        <section className={`${styles.section} ${styles.rbiInsightsSection}`} id="banking-rbi-insights">
          <div className={styles.rbiEditorialHeading}>
            <div>
              <span className={styles.rbiEditorialEyebrow}>BANKING, RBI &amp; FINANCIAL SERVICES</span>
              <h2 className={styles.rbiEditorialTitle}>RBI &amp; NBFC Regulatory Insights</h2>
            </div>
            <Link href="/insights/banking-rbi-regulatory">View all 13 insights<Icon name="arrow" /></Link>
          </div>
          <FeaturedInsightCards insights={rbiCards} featuredPosition="right" />
        </section>

        <section className={styles.section} id="regulatory-intelligence">
          <SectionHeading title="Regulatory Intelligence" href="/insights/legal-updates" action="View All Insights" />
          <div className={styles.tabList} role="group" aria-label="Filter regulatory updates">
            {regulatoryTabs.map((tab) => <button type="button" key={tab} aria-pressed={regulator === tab} className={regulator === tab ? styles.selectedTab : ""} onClick={() => setRegulator(tab)}>{tab}</button>)}
          </div>
          {regulatoryInsights.length ? (
            <div className={styles.regulatoryGrid}>
              {regulatoryInsights.map((insight) => <InsightCard key={`${insight.title}-${insight.source}`} insight={insight} iconName={regulatorIconFor(insight)} actionLabel="Read Update" />)}
            </div>
          ) : (
            <div className={styles.emptyState} role="status">No published updates are available for {regulator}.</div>
          )}
        </section>

        <section className={styles.section} id="case-law-intelligence">
          <SectionHeading title="Case Law & Judicial Intelligence" href="/insights/legal-updates" action="View All Judgments" />
          <div className={styles.tabList} role="group" aria-label="Filter judgments by court">
            {courtTabs.map((tab) => <button type="button" key={tab} aria-pressed={court === tab} className={court === tab ? styles.selectedTab : ""} onClick={() => setCourt(tab)}>{tab}</button>)}
          </div>
          {visibleCaseLaw.length ? (
            <div className={styles.regulatoryGrid}>
              {visibleCaseLaw.map((insight) => <InsightCard key={insight.title} insight={insight} iconName="scale" actionLabel="Read Analysis" />)}
            </div>
          ) : (
            <div className={styles.emptyState} role="status">No published case-law updates are available for {court}.</div>
          )}
        </section>

        <section className={styles.section} id="knowledge-centre">
          <SectionHeading title="Knowledge Centre" href="/resources" action="View All Resources" />
          <div className={styles.resourceGrid}>
            {resources.map(([icon, title, description, image, href]) => (
              <Link href={href} key={title} className={styles.resourceCard}>
                <span className={styles.resourceImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 90vw, 25vw" /></span>
                <span className={styles.resourceIcon}><Icon name={icon} /></span>
                <span className={styles.resourceBody}><strong>{title}</strong><span>{description}</span><em>Explore <Icon name="arrow" /></em></span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="conversation">
          <SectionHeading title="ASTRONIS IN CONVERSATION" href="/media" action="View All Episodes" subtitle="Watch. Listen. Discover." />
          <div className={styles.mediaGrid}>
            {homeMedia.map((item) => (
              <article className={styles.mediaCard} key={item.id}>
                <Link href={item.href || "/media"} className={styles.mediaImage} aria-label={item.href ? `Read ${item.title}` : `${item.title} — coming soon`}>
                  <Image src={item.image} alt="" fill sizes="(max-width: 600px) 90vw, 25vw" />
                  <span className={styles.playMark}><Icon name="play" /></span>
                  {!item.href && <span className={styles.comingSoon}>Coming soon</span>}
                </Link>
                <div className={styles.mediaBody}>
                  <span>{item.type}</span><strong>{item.title}</strong><p>{item.description}</p>
                  {item.href ? <Link href={item.href}>Read More <Icon name="arrow" /></Link> : <span className={styles.mediaPending}>New conversations are on their way</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="client-testimonials">
          <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
          <div className={styles.testimonialGrid}>
            {approvedTestimonials.map((item) => (
              <article className={styles.testimonialCard} key={item.id}>
                <span className={styles.rating} role="img" aria-label={`${item.rating ?? 0} out of 5 stars`}>{"★".repeat(item.rating ?? 0)}</span>
                <blockquote>“{item.quote}”</blockquote>
                <strong>{item.company}</strong>
                <span>{item.name}{item.designation ? ` · ${item.designation}` : ""}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.cta}>
        <Image src="/globalpresence.png" alt="" fill sizes="100vw" className={styles.ctaImage} />
        <div className={styles.ctaShade} />
        <div className={styles.ctaInner}>
          <div><h2>Stay Informed. Stay Ahead.</h2><p>Get the latest legal, regulatory and business insights from Astronis Global.</p></div>
          <Link href="/global-presence/ideas-across-borders#subscribe">Subscribe to Updates <Icon name="arrow" /></Link>
        </div>
      </section>
    </div>
  );
}
