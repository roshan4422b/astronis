"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import { cloudCollaborationInsights, digitalBusinessInsights } from "@/content/digital-solutions";
import { homeMedia } from "@/content/home-media";
import { testimonials } from "@/content/testimonials";
import { globalPresenceInsights } from "@/app/global-presence/ideas-across-borders/ideas-directory";
import { professionalInsights } from "@/app/professionals/insights-by-professional/page-content";
import styles from "./insights-events.module.css";

type HubInsight = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  date?: string;
  author?: string;
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
  ["file", "Latest Insights", "Recent articles and analysis", "#featured-insights", "/Part-6 .png"],
  ["building", "Regulatory Updates", "Key changes from regulators", "#regulatory-intelligence", "/Banking & Financial Services .png"],
  ["scale", "Legal Insights", "Judgments and legal developments", "#case-law-intelligence", "/Part-14 .png"],
  ["chart", "Corporate & Business Insights", "Strategy, governance and transactions", "#featured-insights", "/Part-18 .png"],
  ["building", "Industry Insights", "Sector-specific perspectives", "#featured-insights", "/Technology, IT & ITES .png"],
  ["document", "Case Law Intelligence", "Key decisions and implications", "#case-law-intelligence", "/Part-16 .png"],
  ["message", "Client Alerts", "Time-sensitive updates", "#regulatory-intelligence", "/Part-8 .png"],
  ["document", "Knowledge Centre", "Guides, toolkits and resources", "#knowledge-centre", "/Part-14 .png"],
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
  return (
    <Link href={insight.href} className={`${styles.insightCard} ${featured ? styles.featuredCard : ""}`}>
      <span className={styles.insightImage}>
        <Image src={insight.image} alt="" fill sizes={featured ? "(max-width: 760px) 100vw, 45vw" : "(max-width: 760px) 100vw, 25vw"} />
      </span>
      <span className={styles.insightBody}>
        {iconName ? (
          <span className={styles.regulatoryLabel}><Icon name={iconName} /><span className={styles.insightCategory}>{insight.category}</span></span>
        ) : <span className={styles.insightCategory}>{insight.category}</span>}
        {insight.date && <time>{insight.date}</time>}
        <strong>{insight.title}</strong>
        <span className={styles.insightDescription}>{insight.description}</span>
        {insight.author && <span className={styles.insightAuthor}>{insight.author}</span>}
        <span className={styles.readMore}>{actionLabel} <Icon name="arrow" /></span>
      </span>
    </Link>
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
  const featuredInsights = normalizedQuery ? searchResults.slice(0, 5) : deduplicatedInsights.slice(0, 5);

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
        <form className={styles.searchBar} onSubmit={submitSearch}>
          <label className={styles.searchInput}>
            <span className={styles.srOnly}>Search insights, regulatory updates, case laws, industries, services or topics</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights, regulatory updates, case laws, industries, services or topics..."
            />
            <button type="submit" aria-label="Search"><Icon name="search" /></button>
          </label>
          <div className={styles.popularSearches}>
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
          <SectionHeading title={normalizedQuery ? "Search Results" : "Featured Insights"} href="/insights" action="View All Insights" />
          {featuredInsights.length ? (
            <div className={styles.featuredGrid}>
              <InsightCard insight={featuredInsights[0]} featured />
              <div className={styles.supportingGrid}>
                {featuredInsights.slice(1, 5).map((insight) => <InsightCard key={`${insight.title}-${insight.source}`} insight={insight} />)}
              </div>
            </div>
          ) : (
            <div className={styles.emptyState} role="status">No insights found.</div>
          )}
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
