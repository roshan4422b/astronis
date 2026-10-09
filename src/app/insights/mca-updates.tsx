"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import styles from "./gst-updates.module.css";
import avatarStyles from "./mca-updates.module.css";

const topics = ["Companies Act 2013", "MCA Notifications", "MGT Filings", "Director KYC", "CSR", "XBRL", "Corporate Governance", "Other Circulars"];

const categories = [
  ["scale", "Companies Act & Rules", "Latest amendments, rules and regulatory updates", "/images/services/corporate-and-commercial-advisory.webp", "Companies Act 2013"],
  ["building", "MCA Notifications", "Key notifications issued by the Ministry of Corporate Affairs", "/governance-secretarial-advisory.png", "MCA Notifications"],
  ["file", "Filings & Compliance", "MGT, AOC, DIR, KYC and other statutory filings", "/images/services/regulatory-and-compliance.webp", "MGT Filings"],
  ["people", "Corporate Governance", "Board processes, disclosures and best practices", "/images/services/risk-governance-and-forensic-advisory.webp", "Corporate Governance"],
  ["rocket", "Startups & DPIIT", "Recognition, compliances and regulatory updates", "/Part-14 .png", "Companies Act 2013"],
  ["chart", "CSR & Sustainability", "CSR rules, reporting and social impact", "/Part-12 .png", "CSR"],
  ["scale", "Adjudication & Enforcement", "Orders, penalties and regulatory actions", "/governance-secretarial-hero.png", "Other Circulars"],
  ["help", "Other Circulars & Clarifications", "General circulars, FAQs and clarifications", "/Part-16 .png", "Other Circulars"],
] as const;

const updates = [
  { day: "06", month: "Oct 2025", label: "NOTIFICATION", title: "MCA notifies Companies (Management and Administration) Amendment Rules, 2025", topic: "MCA Notifications", href: "/insights/legal-updates" },
  { day: "28", month: "Sep 2025", label: "CIRCULAR", title: "Clarification on filing of Form MGT-7 for FY 2024-25", topic: "MGT Filings", href: "/insights/legal-updates" },
  { day: "20", month: "Sep 2025", label: "NOTIFICATION", title: "Revision in additional fees for delayed filings", topic: "MGT Filings", href: "/insights/legal-updates" },
  { day: "12", month: "Sep 2025", label: "ADVISORY", title: "Frequent Deficiencies in AOC-4/AOC-4 XBRL – MCA Advisory", topic: "XBRL", href: "/insights/legal-updates" },
  { day: "02", month: "Sep 2025", label: "CIRCULAR", title: "Director KYC (DIR-3 KYC) – Last date extended", topic: "Director KYC", href: "/insights/legal-updates" },
] as const;

const analysis = [
  { label: "ANALYSIS", title: "Recent Amendments to the Companies (Accounts) Rules: Key Implications", date: "28 Sep 2025", read: "7 min read", topic: "Companies Act 2013", image: "/governance-secretarial-hero.png" },
  { label: "EXPERT VIEW", title: "MCA’s Focus on Corporate Governance and Disclosure", date: "22 Sep 2025", read: "6 min read", topic: "Corporate Governance", image: "/images/services/risk-governance-and-forensic-advisory.webp" },
  { label: "COMPLIANCE GUIDE", title: "Annual Filings Checklist for Companies – FY 2024-25", date: "15 Sep 2025", read: "5 min read", topic: "MGT Filings", image: "/images/services/regulatory-and-compliance.webp" },
] as const;

const themes = [
  ["file", "Statutory Filings & Compliance", "MGT Filings"],
  ["people", "Board & Governance", "Corporate Governance"],
  ["person", "Directors & KYC", "Director KYC"],
  ["document", "Accounts & Financial Reporting", "XBRL"],
  ["chart", "CSR & Sustainability", "CSR"],
  ["handshake", "Related Party Transactions", "Corporate Governance"],
  ["building", "Corporate Restructuring", "Companies Act 2013"],
  ["scale", "Adjudication & Penalties", "Other Circulars"],
] as const;

const resources = [
  ["file", "Guides & Toolkits", "Practical guides, checklists and step-by-step resources.", "Explore Guides", "/Part-14 .png", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "View Calendar", "/Part-6 .png", "/insights/compliance-calendar"],
  ["document", "Research & Reports", "In-depth research and company law developments.", "View Reports", "/images/services/corporate-and-commercial-advisory.webp", "/resources"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key MCA regulatory questions.", "Browse FAQs", "/Part-18 .png", "/faqs"],
] as const;

const episodes = [
  { title: "MCA Reforms 2025: Impact on Businesses", date: "12 Sep 2025", views: "1.2K views", duration: "28:15", image: "/governance-secretarial-hero.png" },
  { title: "Startup Compliances under Companies Act", date: "05 Sep 2025", views: "980 views", duration: "32:40", image: "/Part-14 .png" },
  { title: "CSR 2.0: Evolving Compliance Landscape", date: "28 Aug 2025", views: "760 views", duration: "26:18", image: "/Part-12 .png" },
  { title: "Director KYC and Disqualification Risks", date: "20 Aug 2025", views: "690 views", duration: "24:10", image: "/images/services/risk-governance-and-forensic-advisory.webp" },
] as const;

const testimonials = [
  ["Astronis Global’s updates on MCA notifications are timely, clear and highly practical for our compliance team.", "Listed Company (India)"],
  ["In-depth analysis and actionable insights on company law changes help us make informed business decisions.", "Manufacturing Company (India)"],
  ["The insights on MCA developments are concise, relevant and extremely useful for our corporate governance practices.", "Start-up Company (India)"],
] as const;

function SectionHeading({ title, href, action, subtitle }: { title: string; href: string; action: string; subtitle?: string }) {
  return <div className={styles.sectionHeading}><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link href={href}>{action}<Icon name="arrow" /></Link></div>;
}

function matchesTopic(topic: string, title: string, label: string, selectedTopic: string) {
  if (!selectedTopic) return true;
  if (selectedTopic === "Companies Act 2013") return /companies|company|accounts|annual filing/i.test(title) || topic === selectedTopic;
  if (selectedTopic === "MCA Notifications") return label.includes("NOTIFICATION");
  if (selectedTopic === "Other Circulars") return label === "CIRCULAR" || /advisory|clarification/i.test(title);
  if (selectedTopic === "CSR") return /csr|sustainability/i.test(`${title} ${topic}`);
  if (selectedTopic === "XBRL") return /xbrl|aoc-4|financial reporting/i.test(`${title} ${topic}`);
  if (selectedTopic === "Director KYC") return /director|kyc|dir-3/i.test(`${title} ${topic}`);
  return topic === selectedTopic || `${title} ${label}`.toLowerCase().includes(selectedTopic.toLowerCase());
}

export default function McaUpdates() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleUpdates = useMemo(
    () => updates.filter((item) => matchesTopic(item.topic, item.title, item.label, selectedTopic)
      && (!normalizedQuery || `${item.title} ${item.label} ${item.topic}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedTopic],
  );
  const visibleAnalysis = useMemo(
    () => analysis.filter((item) => matchesTopic(item.topic, item.title, item.label, selectedTopic)
      && (!normalizedQuery || `${item.title} ${item.label} ${item.topic}`.toLowerCase().includes(normalizedQuery))),
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

  return <div className={styles.page}>
    <section className={styles.hero}>
      <AssetImage src="/governance-secretarial-hero.png" alt="" fill priority sizes="100vw" />
      <div className={`${styles.heroShade} ${avatarStyles.heroShade}`} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Resources</Link><span>›</span><span>MCA Updates</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Insights &amp; Resources</span>
          <h1>MCA Updates</h1>
          <h2>Company law notifications.</h2>
          <p>Stay updated with the latest MCA notifications, circulars, amendments, compliance requirements and key developments under the Companies Act, 2013 and allied rules.</p>
          <div className={styles.heroActions}><Link href="#latest-updates">View Latest MCA Updates <Icon name="arrow" /></Link><Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <div className={styles.content}>
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><span className={styles.srOnly}>Search MCA updates</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search MCA notifications, circulars, rules, filings, compliance or topics..." /><Icon name="search" /></label>
        <div className={styles.popularTopics}><strong>Popular Topics:</strong><div>{topics.slice(0, showMoreTopics ? topics.length : 6).map((topic) => <button type="button" key={topic} aria-pressed={selectedTopic === topic} className={selectedTopic === topic ? styles.activeTopic : ""} onClick={() => selectTopic(topic)}>{topic}</button>)}<button type="button" aria-expanded={showMoreTopics} onClick={() => setShowMoreTopics((value) => !value)}>{showMoreTopics ? "Less" : "More"} <Icon name="chevron" /></button></div></div>
      </div>

      <section className={styles.section} id="categories">
        <SectionHeading title="Explore MCA Updates by Category" href="#categories" action="View All Categories" />
        <div className={styles.categoryGrid}>{categories.map(([icon, title, description, image, topic]) => <Link href="#latest-updates" className={styles.categoryCard} key={title} onClick={() => setSelectedTopic(topic)}>
          <span className={styles.categoryImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 12vw" /></span><span className={styles.categoryIcon}><Icon name={icon} /></span><strong>{title}</strong><span>{description}</span>
        </Link>)}</div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.featuredLatest}`} id="latest-updates">
        <div>
          <SectionHeading title="Featured MCA Update" href="#insights-analysis" action="Read Full Analysis" />
          <article className={styles.featuredArticle}>
            <div className={styles.featuredImage}><AssetImage src="/governance-secretarial-advisory.png" alt="Corporate governance and company law advisory" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
            <div className={styles.featuredBody}><span className={styles.badge}>FEATURED NOTIFICATION</span><h3>MCA notifies amendments to the Companies (Accounts) Rules, 2014</h3><p>Key changes in financial statement disclosures and filing requirements for companies.</p><div className={styles.meta}><span><Icon name="calendar" />28 Sep 2025</span><span><Icon name="clock" />8 min read</span><span><Icon name="person" />Astronis Global Editorial Team</span></div><Link href="#insights-analysis" className={styles.readLink}>Read Full Analysis <Icon name="arrow" /></Link></div>
          </article>
        </div>
        <div className={styles.latestColumn}>
          <SectionHeading title="Latest MCA Updates" href="/insights/legal-updates" action="View All Updates" />
          <div className={styles.updateList}>{visibleUpdates.map((item) => <Link href={item.href} className={styles.updateItem} key={item.title}>
            <span className={styles.updateDate}><strong>{item.day}</strong><small>{item.month}</small></span><span className={styles.updateText}><small>{item.label}</small><strong>{item.title}</strong></span><Icon name="arrow" />
          </Link>)}{visibleUpdates.length === 0 && <p className={styles.emptyState}>No MCA updates match your search. Try a different keyword or topic.</p>}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.analysisThemes}`} id="insights-analysis">
        <div><SectionHeading title="Insights &amp; Analysis" href="/insights" action="View All Insights" />
          <div className={styles.analysisGrid}>{visibleAnalysis.map((item) => <article className={styles.analysisCard} key={item.title}>
            <AssetImage src={item.image} alt="" fill sizes="(max-width: 600px) 90vw, 30vw" /><div className={styles.analysisOverlay} /><div className={styles.analysisBody}><span className={styles.badge}>{item.label}</span><h3>{item.title}</h3><div className={styles.meta}><span><Icon name="calendar" />{item.date}</span><span><Icon name="clock" />{item.read}</span></div><Link href="/insights/legal-updates" className={styles.readLink}>Read Analysis <Icon name="arrow" /></Link></div>
          </article>)}{visibleAnalysis.length === 0 && <p className={styles.emptyState}>No analysis matches your search or selected topic.</p>}</div>
        </div>
        <div className={styles.themes}>
          <SectionHeading title="Key MCA Themes" href="#categories" action="View All Themes" />
          <div className={styles.themeGrid}>{themes.map(([icon, title, topic]) => <button type="button" className={styles.themeCard} key={title} onClick={() => selectTopic(topic)}><Icon name={icon} /><span>{title}</span></button>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.shaded}`} id="knowledge-centre">
        <SectionHeading title="Knowledge Centre" href="/resources" action="View All Resources" />
        <div className={styles.resourceGrid}>{resources.map(([icon, title, description, action, image, href]) => <Link href={href} className={styles.resourceCard} key={title}>
          <span className={styles.resourceImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 90vw, 25vw" /></span><span className={styles.resourceIcon}><Icon name={icon} /></span><span className={styles.resourceBody}><strong>{title}</strong><span>{description}</span><em>{action} <Icon name="arrow" /></em></span>
        </Link>)}</div>
      </section>

      <section className={styles.section} id="conversation">
        <SectionHeading title="ASTRONIS IN CONVERSATION" href="/media" action="View All Episodes" subtitle="Watch. Listen. Discover." />
        <div className={styles.conversationGrid}>{episodes.map((episode) => <article className={styles.episodeCard} key={episode.title}>
          <Link href="/media" className={styles.episodeImage} aria-label={`Play ${episode.title}`}><AssetImage src={episode.image} alt="" fill sizes="(max-width: 600px) 90vw, 20vw" /><span className={styles.playButton}><Icon name="play" /></span><small>{episode.duration}</small></Link>
          <div className={styles.episodeBody}><strong>{episode.title}</strong><span><Icon name="calendar" />{episode.date}<i /><Icon name="play" />{episode.views}</span></div>
        </article>)}<aside className={styles.promoPanel}><span>Conversations with</span><strong>Industry Experts,<br />Regulators and<br />Thought Leaders.</strong><Link href="/media">Explore All Episodes <Icon name="arrow" /></Link></aside></div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
        <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
      </section>
    </div>

    <section className={styles.cta}>
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaShade} /><div className={styles.ctaInner}><div><h2>Stay Updated. Stay Compliant.</h2><p>Get the latest MCA updates, company law insights and expert analysis from Astronis Global.</p></div>
        <form onSubmit={subscribe}><div><label className={styles.srOnly} htmlFor="mca-subscribe-email">Email address</label><input id="mca-subscribe-email" name="email" type="email" placeholder="Enter your email address" required maxLength={180} /><button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" /></button></div><label className={styles.consent}><input type="checkbox" name="consent" value="yes" required />I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{subscribeStatus && <p role="status">{subscribeStatus}</p>}</form>
      </div>
    </section>
  </div>;
}
