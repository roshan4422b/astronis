"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import base from "./gst-updates.module.css";
import styles from "./sebi-updates.module.css";

const topics = ["LODR", "IPO", "Mutual Funds", "AIF", "Intermediaries", "PMS", "SAST", "Takeover Code"] as const;
const moreTopics = ["ESG", "Disclosure", "Enforcement", "Consultations"] as const;

const categories = [
  ["building", "Capital Markets Regulations", "LODR, Issue of Capital, Listing Compliance", "/images/market-india.jpg", "LODR"],
  ["people", "Intermediaries Regulation", "Brokers, Depositories, Merchant Bankers, Research Analysts", "/images/services/banking-nbfc-and-financial-services-advisory.webp", "Intermediaries"],
  ["chart", "Mutual Funds & AIFs", "MF Regulations, AIF Framework, Investor Protection", "/Banking & Financial Services .png", "Mutual Funds"],
  ["document", "Public Issues & Listings", "ICDR, Listing, Disclosure Requirements", "/FinTech & Digital Finance .png", "IPO"],
  ["network", "Takeovers & Substantial Acquisition", "SAST Regulations, Open Offers, Takeover Code", "/images/market-india.jpg", "SAST"],
  ["shield", "ESG & Sustainable Finance", "BRSR, ESG Disclosures, Sustainability Frameworks", "/images/services/esg-and-sustainability-advisory.webp", "ESG"],
  ["scale", "Enforcement & Adjudication", "Orders, Penalties, Settlements", "/images/services/risk-governance-and-forensic-advisory.webp", "Enforcement"],
  ["file", "Consultations & Discussion Papers", "Draft Regulations, Consultation Papers, Concept Notes", "/corporate-regulatory-hero.png", "Consultations"],
] as const;

const updates = [
  { day: "06", month: "Oct 2025", label: "CIRCULAR", title: "SEBI issues revised framework for Related Party Transactions", topics: "LODR Corporate Governance Disclosure" },
  { day: "28", month: "Sep 2025", label: "CONSULTATION PAPER", title: "Consultation paper on review of LODR Regulations", topics: "LODR Consultations Disclosure" },
  { day: "20", month: "Sep 2025", label: "NOTIFICATION", title: "SEBI notifies amendments to AIF Regulations", topics: "AIF Mutual Funds" },
  { day: "12", month: "Sep 2025", label: "CIRCULAR", title: "Guidelines for Research Analysts – Revised Compliance Requirements", topics: "Intermediaries PMS" },
  { day: "02", month: "Sep 2025", label: "DEVELOPMENT", title: "SEBI enhances disclosure norms for ESG and BRSR", topics: "ESG Disclosure" },
] as const;

const analysis = [
  { label: "ANALYSIS", title: "SEBI's New Disclosure Framework: Key Takeaways for Listed Companies", date: "28 Sep 2025", read: "6 min read", topics: "LODR Listed Companies Disclosure", image: "/images/services/regulatory-and-compliance.webp" },
  { label: "EXPERT VIEW", title: "ESG Reporting under SEBI Regulations: Practical Implementation", date: "22 Sep 2025", read: "7 min read", topics: "ESG BRSR Sustainability", image: "/images/services/esg-and-sustainability-advisory.webp" },
  { label: "SECTOR FOCUS", title: "Mutual Fund Regulations: Recent Changes and Market Impact", date: "15 Sep 2025", read: "5 min read", topics: "Mutual Funds AIF Market", image: "/Banking & Financial Services .png" },
] as const;

const themes = [
  ["building", "Corporate Governance", "LODR"],
  ["document", "Disclosure & Transparency", "LODR"],
  ["network", "Market Intermediaries", "Intermediaries"],
  ["shield", "Investor Protection", "Mutual Funds"],
  ["chart", "Mutual Funds & AIFs", "Mutual Funds"],
  ["scale", "Takeover Regulations (SAST)", "SAST"],
  ["cpu", "FinTech & Regulatory Innovation", "Intermediaries"],
  ["bulb", "ESG & Sustainable Finance", "ESG"],
] as const;

const resources = [
  ["file", "Guides & Toolkits", "Practical guides, checklists and implementation resources.", "Explore Guides", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "View Calendar", "/insights/compliance-calendar"],
  ["chart", "Research & Reports", "In-depth research and market analysis.", "View Reports", "/resources"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key SEBI regulatory questions.", "Browse FAQs", "/faqs"],
] as const;

const episodes = [
  { title: "SEBI’s 2025 Priorities and Market Impact", date: "12 Sep 2025", duration: "28 min", image: "/Banner-Indus- FinTech & Digital Finance .png" },
  { title: "Corporate Governance Trends in Listed Entities", date: "05 Sep 2025", duration: "32 min", image: "/images/services/corporate-and-commercial-advisory.webp" },
  { title: "ESG & Sustainable Finance: Regulatory Outlook", date: "28 Aug 2025", duration: "26 min", image: "/images/services/esg-and-sustainability-advisory.webp" },
  { title: "Key Compliance Challenges for Market Intermediaries", date: "20 Aug 2025", duration: "24 min", image: "/images/services/risk-governance-and-forensic-advisory.webp" },
] as const;

const testimonials = [
  ["Astronis Global’s insights on SEBI regulations are timely, practical and highly valuable for our compliance planning.", "Fund Management Company (India)"],
  ["Clear and concise analysis on complex SEBI circulars helps us make informed business decisions.", "Listed Company (India)"],
  ["Their updates on regulatory developments give us an edge in navigating compliance and market opportunities.", "Brokerage & Research Firm (India)"],
] as const;

function SectionHeading({ title, href, action, subtitle }: { title: string; href: string; action: string; subtitle?: string }) {
  return <div className={base.sectionHeading}><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link href={href}>{action}<Icon name="arrow" /></Link></div>;
}

function matchesTopic(text: string, selectedTopic: string) {
  if (!selectedTopic) return true;
  const aliases: Record<string, string[]> = {
    "Mutual Funds": ["Mutual Funds", "AIF"],
    "Takeover Code": ["SAST", "Takeover"],
    PMS: ["PMS", "Intermediaries", "Research Analysts"],
    IPO: ["IPO", "Public Issues", "Listings"],
  };
  const normalizedText = text.toLowerCase();
  return [selectedTopic, ...(aliases[selectedTopic] || [])]
    .some((term) => normalizedText.includes(term.toLowerCase()));
}

export default function SebiUpdates() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleUpdates = useMemo(
    () => updates.filter((item) => matchesTopic(`${item.title} ${item.label} ${item.topics}`, selectedTopic)
      && (!normalizedQuery || `${item.title} ${item.label} ${item.topics}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedTopic],
  );
  const visibleAnalysis = useMemo(
    () => analysis.filter((item) => matchesTopic(`${item.title} ${item.label} ${item.topics}`, selectedTopic)
      && (!normalizedQuery || `${item.title} ${item.label} ${item.topics}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedTopic],
  );

  function selectTopic(topic: string) {
    setSelectedTopic((current) => current === topic ? "" : topic);
    document.getElementById("latest-updates")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubscribeStatus("");
    try {
      const response = await fetch("/api/insights-subscribe", { method: "POST", body: new FormData(form) });
      const result: { message?: string } = await response.json();
      setSubscribeStatus(result.message || "We could not process your request.");
      if (response.ok) form.reset();
    } catch {
      setSubscribeStatus("We could not send your request. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className={`${base.page} ${styles.page}`}>
    <section className={`${base.hero} ${styles.hero}`}>
      <div className={`${base.heroShade} ${styles.heroShade}`} />
      <div className={base.heroInner}>
        <nav className={base.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Resources</Link><span>›</span><span>SEBI Updates</span></nav>
        <div className={base.heroCopy}>
          <span className={base.eyebrow}>Insights &amp; Resources</span>
          <h1>SEBI Updates</h1>
          <h2>SEBI Developments. Market Insights. Regulatory Impact.</h2>
          <p>Stay informed with the latest SEBI circulars, consultation, notifications and policy developments that shape India’s capital markets, listed entities, intermediaries and investors.</p>
          <div className={base.heroActions}><Link href="#latest-updates">Explore Latest SEBI Updates <Icon name="arrow" /></Link><Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <div className={`${base.content} ${styles.content}`}>
      <div className={`${base.searchPanel} ${styles.searchPanel}`}>
        <label className={base.searchBox}><span className={base.srOnly}>Search SEBI updates</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search SEBI circulars, consultation papers, regulations or topics..." /><Icon name="search" /></label>
        <div className={base.popularTopics}><strong>Popular Topics:</strong><div>{[...topics, ...(showMoreTopics ? moreTopics : [])].map((topic) => <button type="button" key={topic} aria-pressed={selectedTopic === topic} className={selectedTopic === topic ? base.activeTopic : ""} onClick={() => selectTopic(topic)}>{topic}</button>)}<button type="button" aria-expanded={showMoreTopics} onClick={() => setShowMoreTopics((value) => !value)}>{showMoreTopics ? "Less" : "More"} <Icon name="chevron" /></button></div></div>
      </div>

      <section className={`${base.section} ${styles.sectionSpacing}`} id="categories">
        <SectionHeading title="Explore SEBI Updates by Category" href="#categories" action="View All Categories" />
        <div className={`${base.categoryGrid} ${styles.categoryGrid}`}>{categories.map(([icon, title, description, image, topic]) => <Link href="#latest-updates" className={base.categoryCard} key={title} onClick={() => setSelectedTopic(topic)}>
          <span className={base.categoryImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 12vw" /></span><span className={base.categoryIcon}><Icon name={icon} /></span><strong>{title}</strong><span>{description}</span>
        </Link>)}</div>
      </section>

      <section className={`${base.section} ${base.shaded} ${base.featuredLatest} ${styles.featuredLatest} ${styles.sectionSpacing}`} id="latest-updates">
        <div>
          <SectionHeading title="Featured SEBI Update" href="#insights-analysis" action="Read Full Analysis" />
          <article className={`${base.featuredArticle} ${styles.featuredArticle}`}>
            <div className={base.featuredBody}><span className={base.badge}>FEATURED UPDATE</span><h3>SEBI issues enhanced disclosure framework for listed entities</h3><p>Key changes, compliance requirements and impact on listed companies.</p><div className={base.meta}><span><Icon name="calendar" />03 Oct 2025</span><span><Icon name="clock" />8 min read</span><span><Icon name="person" />Astronis Global Editorial Team</span></div><Link href="#insights-analysis" className={base.readLink}>Read Full Analysis <Icon name="arrow" /></Link></div>
            <div className={`${base.featuredImage} ${styles.featuredImage}`}><AssetImage src="/images/services/regulatory-and-compliance.webp" alt="Regulatory compliance and listed company disclosures" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
          </article>
        </div>
        <div>
          <SectionHeading title="Latest SEBI Updates" href="/insights/sebi-updates" action="View All Updates" />
          <div className={base.updateList}>{visibleUpdates.map((item) => <Link href="/insights/sebi-updates" className={base.updateItem} key={item.title}>
            <span className={base.updateDate}><strong>{item.day}</strong><small>{item.month}</small></span><span className={base.updateText}><small>{item.label}</small><strong>{item.title}</strong></span><Icon name="arrow" />
          </Link>)}{visibleUpdates.length === 0 && <p className={base.emptyState}>No SEBI updates match your search. Try a different keyword or topic.</p>}</div>
        </div>
      </section>

      <section className={`${base.section} ${base.analysisThemes} ${styles.analysisThemes} ${styles.sectionSpacing}`} id="insights-analysis">
        <div><SectionHeading title="Insights &amp; Analysis" href="/insights" action="View All Insights" />
          <div className={`${base.analysisGrid} ${styles.analysisGrid}`}>{visibleAnalysis.map((item) => <article className={`${base.analysisCard} ${styles.analysisCard}`} key={item.title}>
            <AssetImage src={item.image} alt="" fill sizes="(max-width: 600px) 90vw, 30vw" /><div className={base.analysisOverlay} /><div className={base.analysisBody}><span className={base.badge}>{item.label}</span><h3 className={styles.analysisTitle}>{item.title}</h3><div className={base.meta}><span><Icon name="calendar" />{item.date}</span><span><Icon name="clock" />{item.read}</span></div><Link href="/insights/sebi-updates" className={base.readLink}>Read Analysis <Icon name="arrow" /></Link></div>
          </article>)}{visibleAnalysis.length === 0 && <p className={base.emptyState}>No analysis matches your search or selected topic.</p>}</div>
        </div>
        <div className={base.themes}>
          <SectionHeading title="Key SEBI Themes" href="#categories" action="View All Themes" />
          <div className={`${base.themeGrid} ${styles.themeGrid}`}>{themes.map(([icon, title, topic]) => <button type="button" className={`${base.themeCard} ${styles.themeCard}`} key={title} onClick={() => selectTopic(topic)}><Icon name={icon} /><span>{title}</span></button>)}</div>
        </div>
      </section>

      <section className={`${base.section} ${base.shaded} ${styles.sectionSpacing}`} id="knowledge-centre">
        <SectionHeading title="Knowledge Centre" href="/resources" action="View All Resources" />
        <div className={`${base.resourceGrid} ${styles.resourceGrid}`}>{resources.map(([icon, title, description, action, href]) => <Link href={href} className={`${base.resourceCard} ${styles.resourceCard}`} key={title}>
          <span className={styles.resourceIcon}><Icon name={icon} /></span><span className={`${base.resourceBody} ${styles.resourceBody}`}><strong>{title}</strong><span>{description}</span><em>{action} <Icon name="arrow" /></em></span>
        </Link>)}</div>
      </section>

      <section className={`${base.section} ${styles.conversation} ${styles.sectionSpacing}`} id="conversation">
        <SectionHeading title="ASTRONIS IN CONVERSATION" href="/media" action="View All Episodes" subtitle="Watch. Listen. Discover." />
        <div className={`${base.conversationGrid} ${styles.conversationGrid}`}>{episodes.map((episode) => <article className={base.episodeCard} key={episode.title}>
          <Link href="/media" className={base.episodeImage} aria-label={`Play ${episode.title}`}><AssetImage src={episode.image} alt="" fill sizes="(max-width: 600px) 90vw, 20vw" /><span className={base.playButton}><Icon name="play" /></span><small>{episode.duration}</small></Link>
          <div className={base.episodeBody}><strong>{episode.title}</strong><span><Icon name="calendar" />{episode.date}</span></div>
        </article>)}<aside className={base.promoPanel}><span>Conversations with</span><strong>Industry Experts,<br />Regulators and<br />Thought Leaders.</strong><Link href="/media">Explore All Episodes <Icon name="arrow" /></Link></aside></div>
      </section>

      <section className={`${base.section} ${base.shaded} ${base.testimonials} ${styles.testimonials} ${styles.sectionSpacing}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
        <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
      </section>
    </div>

    <section className={`${base.cta} ${styles.cta}`}>
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
      <div className={base.ctaShade} /><div className={base.ctaInner}><div><h2>Stay Informed. Stay Ahead.</h2><p>Get the latest SEBI updates, market insights and expert analysis from Astronis Global.</p></div>
        <form onSubmit={subscribe}><div><label className={base.srOnly} htmlFor="sebi-subscribe-email">Email address</label><input id="sebi-subscribe-email" name="email" type="email" placeholder="Enter your email address" required maxLength={180} /><button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" /></button></div><label className={base.consent}><input type="checkbox" name="consent" value="yes" required />I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{subscribeStatus && <p role="status">{subscribeStatus}</p>}</form>
      </div>
    </section>
  </div>;
}
