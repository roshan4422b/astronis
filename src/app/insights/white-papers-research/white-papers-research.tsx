"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import SubscribeForm from "../government-notifications/subscribe-form";
import sharedStyles from "../gst-updates.module.css";
import pageStyles from "./white-papers-research.module.css";

const styles = {
  page: sharedStyles.page,
  hero: sharedStyles.hero,
  heroImage: pageStyles.heroImage,
  heroShade: sharedStyles.heroShade,
  heroInner: sharedStyles.heroInner,
  breadcrumb: sharedStyles.breadcrumb,
  heroCopy: `${sharedStyles.heroCopy} ${pageStyles.heroCopy}`,
  eyebrow: sharedStyles.eyebrow,
  heroActions: sharedStyles.heroActions,
  content: sharedStyles.content,
  searchPanel: sharedStyles.searchPanel,
  searchBox: sharedStyles.searchBox,
  srOnly: sharedStyles.srOnly,
  popularTopics: sharedStyles.popularTopics,
  activeTopic: sharedStyles.activeTopic,
  section: `${sharedStyles.section} ${pageStyles.section}`,
  shaded: sharedStyles.shaded,
  featuredLatest: `${sharedStyles.featuredLatest} ${pageStyles.featuredLatest}`,
  sectionHeading: sharedStyles.sectionHeading,
  featuredCard: `${sharedStyles.featuredArticle} ${pageStyles.featuredCard}`,
  featuredCopy: `${sharedStyles.featuredBody} ${pageStyles.featuredCopy}`,
  badge: sharedStyles.badge,
  metadata: sharedStyles.meta,
  unavailableButton: pageStyles.unavailableButton,
  reportCover: pageStyles.reportCover,
  coverShade: pageStyles.coverShade,
  coverBrand: pageStyles.coverBrand,
  emptyState: sharedStyles.emptyState,
  reportList: `${sharedStyles.updateList} ${pageStyles.reportList}`,
  reportItem: `${sharedStyles.updateItem} ${pageStyles.reportItem}`,
  reportThumbnail: pageStyles.reportThumbnail,
  reportDetails: pageStyles.reportDetails,
  reportCategory: sharedStyles.badge,
  reportMeta: sharedStyles.meta,
  downloadUnavailable: pageStyles.downloadUnavailable,
  sectorGrid: sharedStyles.categoryGrid,
  sectorCard: `${sharedStyles.categoryCard} ${pageStyles.sectorCard}`,
  sectorImage: sharedStyles.categoryImage,
  selectedCard: pageStyles.selectedCard,
  regulationGrid: sharedStyles.themeGrid,
  regulationCard: `${sharedStyles.themeCard} ${pageStyles.regulationCard}`,
  regulatorMark: pageStyles.regulatorMark,
  resourceGrid: sharedStyles.resourceGrid,
  resourceCard: `${sharedStyles.resourceCard} ${pageStyles.resourceCard}`,
  conversationGrid: sharedStyles.conversationGrid,
  episodeCard: sharedStyles.episodeCard,
  episodeImage: sharedStyles.episodeImage,
  playButton: sharedStyles.playButton,
  episodeBody: sharedStyles.episodeBody,
  promoPanel: sharedStyles.promoPanel,
  testimonials: sharedStyles.testimonials,
  cta: sharedStyles.cta,
  ctaShade: sharedStyles.ctaShade,
  ctaInner: `${sharedStyles.ctaInner} ${pageStyles.ctaInner}`,
};

const topics = [
  "RBI",
  "FEMA",
  "SEBI",
  "MCA",
  "GST",
  "NBFC",
  "FinTech",
  "Real Estate",
  "ESG",
] as const;

const moreTopics = ["Renewable Energy", "Infrastructure", "Healthcare", "Manufacturing"] as const;

const reports = [
  {
    category: "Energy & Infrastructure",
    title: "Regulatory Landscape for Renewable Energy Projects in India",
    date: "August 2025",
    pages: "28 Pages",
    type: "Research Report",
    image: "/Banner-Energy, Power & Renewables .png",
    topics: ["Energy", "Infrastructure", "Renewable Energy", "FEMA"],
  },
  {
    category: "Financial Services",
    title: "Digital Lending in India: Regulatory Framework and Compliance",
    date: "July 2025",
    pages: "36 Pages",
    type: "White Paper",
    image: "/FinTech & Digital Finance .png",
    topics: ["Financial Services", "FinTech", "NBFC", "RBI"],
  },
  {
    category: "Real Estate & Construction",
    title: "Real Estate Regulatory Trends and Opportunities in 2025",
    date: "June 2025",
    pages: "30 Pages",
    type: "Research Report",
    image: "/Real Estate & Construction .png",
    topics: ["Real Estate", "Construction", "MCA"],
  },
] as const;

const sectors = [
  ["Financial Services & NBFC", "/Banking & Financial Services .png", "Financial Services"],
  ["Technology & FinTech", "/Banner-Indus- FinTech & Digital Finance .png", "FinTech"],
  ["Real Estate & Construction", "/Real Estate & Construction .png", "Real Estate"],
  ["Infrastructure & Energy", "/Banner-Infrastructure & Projects .png", "Infrastructure"],
  ["Healthcare & Life Sciences", "/Banner-Healthcare & Medical Scien .png", "Healthcare"],
  ["Manufacturing", "/Manufacturing & Industrial .png", "Manufacturing"],
  ["Consumer & Retail", "/Banner- Indus- Retail & Consumer .png", "Retail"],
  ["Startups & Innovation", "/Startups & Emerging Businesses .png", "Startups"],
] as const;

const regulations = [
  ["RBI", "bank", "RBI"],
  ["MCA", "building", "MCA"],
  ["SEBI", "scale", "SEBI"],
  ["IFSCA", "globe", "IFSCA"],
  ["FEMA", "globe", "FEMA"],
  ["GST", "percent", "GST"],
  ["IPR", "gem", "IPR"],
  ["Environment", "leaf", "Environment"],
] as const;

const resources = [
  ["document", "Guides & Toolkits", "Practical guides, checklists and step-by-step resources.", "Explore Guides", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "View Calendar", "/insights/compliance-calendar"],
  ["file", "Research Archive", "Browse all white papers and research publications.", "View Reports", "#latest-research"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key regulatory questions.", "Browse FAQs", "/faqs"],
] as const;

const episodes = [
  ["RBI's Evolving Regulatory Approach for NBFCs", "12 Sep 2025", "/Banking & Financial Services .png"],
  ["Opportunities in GIFT City for Global Investors", "05 Sep 2025", "/Banner-Infrastructure & Projects .png"],
  ["Renewable Energy Regulation and Investment in India", "28 Aug 2025", "/Banner-Energy, Power & Renewables .png"],
  ["ESG Compliance and Business Strategy", "20 Aug 2025", "/Banner-Healthcare & Medical Scien .png"],
] as const;

const testimonials = [
  {
    quote: "The white paper on NBFC regulations provided practical insights that helped us strengthen our compliance framework.",
    company: "Financial Services Company (India)",
    rating: 5,
  },
  {
    quote: "Clear, well-researched and insightful analysis. Extremely useful for our strategic decision-making.",
    company: "Infrastructure Developer (India)",
    rating: 5,
  },
  {
    quote: "Their research reports are concise, credible and highly relevant to current regulatory developments.",
    company: "Manufacturing Company (India)",
    rating: 5,
  },
] as const;

function matchesText(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

export default function WhitePapersResearch() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const filtersActive = Boolean(query.trim() || selectedTopic);
  const visibleReports = useMemo(
    () =>
      reports.filter((report) => {
        const searchable = `${report.category} ${report.title} ${report.date} ${report.pages} ${report.type} ${report.topics.join(" ")}`;
        return (
          (!query.trim() || matchesText(searchable, query)) &&
          (!selectedTopic ||
            report.topics.some((topic) => matchesText(topic, selectedTopic) || matchesText(selectedTopic, topic)))
        );
      }),
    [query, selectedTopic],
  );
  const featuredTopics: readonly string[] = ["NBFC", "Financial Services", "RBI"];
  const featuredSearchable =
    "India's NBFC Sector Regulation Risk Growth Opportunities Financial Services RBI";
  const featuredVisible =
    (!query.trim() || matchesText(featuredSearchable, query)) &&
    (!selectedTopic ||
      featuredTopics.some(
        (topic) => matchesText(topic, selectedTopic) || matchesText(selectedTopic, topic),
      ));

  function toggleTopic(topic: string) {
    setSelectedTopic((current) => (current === topic ? "" : topic));
    document.getElementById("latest-research")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearFilters() {
    setQuery("");
    setSelectedTopic("");
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <AssetImage
          className={styles.heroImage}
          src="/corporate-regulatory-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 52vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/insights-events">Insights &amp; Resources</Link><span>›</span>
            <span>White Papers &amp; Research</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Insights &amp; Resources</span>
            <h1>White Papers &amp; Research</h1>
            <h2>In-depth Analysis. Real-World Perspective. Practical Impact.</h2>
            <p>
              Our white papers and research publications provide detailed analysis on key sectors,
              regulations and emerging trends to help you navigate complex legal, regulatory and
              business challenges.
            </p>
            <div className={styles.heroActions}>
              <Link href="#latest-research">Explore Latest Research <Icon name="arrow" /></Link>
              <Link href="#research-by-sector">Browse by Sector <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.searchPanel}>
          <label className={styles.searchBox}>
            <span className={styles.srOnly}>Search white papers and research</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search white papers, research reports, sectors, regulations or topics..."
            />
            <Icon name="search" />
          </label>
          <div className={styles.popularTopics}>
            <strong>Popular Topics:</strong>
            <div>
              {[...topics, ...(showMoreTopics ? moreTopics : [])].map((topic) => (
                <button
                  type="button"
                  key={topic}
                  aria-pressed={selectedTopic === topic}
                  className={selectedTopic === topic ? styles.activeTopic : ""}
                  onClick={() => toggleTopic(topic)}
                >
                  {topic}
                </button>
              ))}
              <button
                type="button"
                aria-expanded={showMoreTopics}
                onClick={() => setShowMoreTopics((current) => !current)}
              >
                {showMoreTopics ? "Less" : "More"} <Icon name="chevron" />
              </button>
              {filtersActive && <button type="button" onClick={clearFilters}>Clear filters</button>}
            </div>
          </div>
        </div>

        <section className={`${styles.section} ${styles.featuredLatest}`} id="latest-research">
          <div>
            <SectionHeading title="Featured Research" />
            {featuredVisible ? (
              <article className={styles.featuredCard}>
                <div className={styles.featuredCopy}>
                  <span className={styles.badge}>Featured Research</span>
                  <h3>India’s NBFC Sector: Regulation, Risk and Growth Opportunities</h3>
                  <p>
                    A comprehensive analysis of the current regulatory framework, emerging risks
                    and growth opportunities for NBFCs in India.
                  </p>
                  <div className={styles.metadata}>
                    <span><Icon name="calendar" />September 2025</span>
                    <span><Icon name="document" />42 Pages</span>
                    <span><Icon name="people" />Astronis Global Research</span>
                  </div>
                  <button className={styles.unavailableButton} type="button" disabled>
                    <Icon name="download" /> Report coming soon
                  </button>
                </div>
                <div className={styles.reportCover}>
                  <AssetImage
                    src="/Banking & Financial Services .png"
                    alt=""
                    fill
                    sizes="(max-width: 760px) 65vw, 170px"
                  />
                  <div className={styles.coverShade} />
                  <span className={styles.coverBrand}>ASTRONIS GLOBAL</span>
                  <strong>India’s NBFC Sector</strong>
                  <span>Regulation, Risk and<br />Growth Opportunities</span>
                  <small>WHITE PAPER · SEPTEMBER 2025</small>
                </div>
              </article>
            ) : (
              <div className={styles.emptyState}>No featured report matches these filters.</div>
            )}
          </div>

          <div className={pageStyles.latestReportsPanel}>
            <SectionHeading title="Latest White Papers & Reports" href="#latest-research" action="View All Research" />
            <div className={styles.reportList}>
              {visibleReports.length ? visibleReports.map((report) => (
                <article className={styles.reportItem} key={report.title}>
                  <div className={styles.reportThumbnail}>
                    <AssetImage src={report.image} alt="" fill sizes="100px" />
                  </div>
                  <div className={styles.reportDetails}>
                    <span className={styles.reportCategory}>{report.category}</span>
                    <h3>{report.title}</h3>
                    <div className={styles.reportMeta}>
                      <span><Icon name="calendar" />{report.date}</span>
                      <span><Icon name="document" />{report.pages}</span>
                      <span>{report.type}</span>
                    </div>
                  </div>
                  <button className={styles.downloadUnavailable} type="button" disabled>
                    Coming soon <Icon name="arrow" />
                  </button>
                </article>
              )) : (
                <div className={styles.emptyState}>
                  No reports match these filters. <button type="button" onClick={clearFilters}>Clear filters</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={styles.section} id="research-by-sector">
          <SectionHeading title="Research by Sector" href="#research-by-sector" action="View All Sectors" />
          <div className={styles.sectorGrid}>
            {sectors.map(([title, image, topic]) => (
              <button
                type="button"
                className={`${styles.sectorCard} ${selectedTopic === topic ? styles.selectedCard : ""}`}
                key={title}
                aria-pressed={selectedTopic === topic}
                onClick={() => toggleTopic(topic)}
              >
                <span className={styles.sectorImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 44vw, 12vw" /></span>
                <strong>{title}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded}`} id="research-by-regulation">
          <SectionHeading title="Research by Regulation" href="#research-by-regulation" action="View All Regulatory Reports" />
          <div className={styles.regulationGrid}>
            {regulations.map(([title, icon, topic]) => (
              <button
                type="button"
                className={`${styles.regulationCard} ${selectedTopic === topic ? styles.selectedCard : ""}`}
                key={title}
                aria-pressed={selectedTopic === topic}
                onClick={() => toggleTopic(topic)}
              >
                <span className={styles.regulatorMark}><Icon name={icon} /><strong>{title}</strong></span>
                <span>Research &amp; Analysis</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section} id="knowledge-centre">
          <SectionHeading title="Knowledge Centre" href="/insights" action="View All Resources" />
          <div className={styles.resourceGrid}>
            {resources.map(([icon, title, description, action, href]) => (
              <Link className={styles.resourceCard} href={href} key={title}>
                <Icon name={icon} />
                <span><strong>{title}</strong><small>{description}</small><em>{action} <Icon name="arrow" /></em></span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="conversation">
          <SectionHeading
            title="ASTRONIS IN CONVERSATION"
            href="/media"
            action="View All Episodes"
            subtitle="Watch. Listen. Discover."
          />
          <div className={styles.conversationGrid}>
            {episodes.map(([title, date, image]) => (
              <Link className={styles.episodeCard} href="/media" key={title} aria-label={`${title} — view episodes`}>
                <span className={styles.episodeImage}>
                  <AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 20vw" />
                  <span className={styles.playButton}><Icon name="play" /></span>
                </span>
                <span className={styles.episodeBody}>
                  <strong>{title}</strong>
                  <small><Icon name="calendar" />{date}</small>
                </span>
              </Link>
            ))}
            <aside className={styles.promoPanel}>
              <span>Conversations with</span>
              <strong>Industry Experts,<br />Regulators and<br />Thought Leaders.</strong>
              <Link href="/media">Explore All Episodes <Icon name="arrow" /></Link>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
          <SectionHeading title="Client Testimonials" href="/clients" action="View All Testimonials" />
          <InsightsTestimonials items={testimonials} />
        </section>
      </div>

      <section className={styles.cta}>
        <AssetImage src="/business-financial-hero.png" alt="" fill sizes="100vw" />
        <div className={styles.ctaShade} />
        <div className={styles.ctaInner}>
          <div>
            <h2>Stay Informed. Stay Ahead.</h2>
            <p>Get the latest white papers, research publications and expert insights from Astronis Global.</p>
          </div>
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  title,
  href,
  action,
  subtitle,
}: {
  title: string;
  href?: string;
  action?: string;
  subtitle?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {href && action && <Link href={href}>{action}<Icon name="arrow" /></Link>}
    </div>
  );
}
