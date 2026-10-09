"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import styles from "./gst-updates.module.css";

const topics = ["GST Notifications", "GST Returns", "ITC", "E-Invoicing", "E-Way Bill", "Rate Changes", "GST Compliance", "Circulars", "Assessment & Audit", "GST Council"] as const;

const categories = [
  ["document", "GST Notifications", "Latest notifications and amendments", "/Part-6 .png", "GST Notifications"],
  ["scale", "Circulars & Clarifications", "CBIC circulars and departmental guidance", "/Part-14 .png", "Circular"],
  ["file", "GST Returns & Filing", "GSTR-1, GSTR-3B, GSTR-9, filing updates and due dates", "/Part-16 .png", "GST Returns"],
  ["handshake", "Input Tax Credit (ITC)", "ITC rules, restrictions and advisories", "/Part-18 .png", "ITC"],
  ["calendar", "E-Invoicing & E-Way Bill", "Implementation updates and compliance requirements", "/Part-8 .png", "E-Invoicing"],
  ["percent", "GST Rates & Valuation", "Rate changes, classification and valuation issues", "/Part-9 .png", "Rate Changes"],
  ["building", "Compliance & Advisory", "Practical guidance for businesses", "/Part-12 .png", "GST Compliance"],
  ["search", "Assessment, Audit & Litigation", "Notices, scrutiny and dispute resolution", "/Part-20 .png", "Assessment"],
] as const;

const updates = [
  { day: "06", month: "Oct 2025", label: "NOTIFICATION", title: "CBIC notifies amendments to GST Rules for e-invoicing", topic: "E-Invoicing", href: "/insights/legal-updates" },
  { day: "28", month: "Sep 2025", label: "CIRCULAR", title: "Clarification on ITC eligibility for input services", topic: "ITC", href: "/insights/legal-updates" },
  { day: "20", month: "Sep 2025", label: "ADVISORY", title: "Extension of GSTR-9 due date for FY 2024-25", topic: "GST Returns", href: "/insights/legal-updates" },
  { day: "12", month: "Sep 2025", label: "RATE UPDATE", title: "GST Council recommends rationalisation of GST rates", topic: "Rate Changes", href: "/insights/legal-updates" },
  { day: "02", month: "Sep 2025", label: "NOTIFICATION", title: "E-way bill system enhancements – key changes", topic: "E-Way Bill", href: "/insights/legal-updates" },
] as const;

const analysis = [
  { label: "ANALYSIS", title: "GST Rate Rationalisation 2025: Sector-wise Impact and Opportunities", date: "28 Sep 2025", read: "8 min read", topic: "Rate Changes", image: "/images/services/gst-and-indirect-tax-regulatory-support.webp" },
  { label: "EXPERT VIEW", title: "ITC on Common Input Services: Recent Clarifications and Practical Takeaways", date: "22 Sep 2025", read: "7 min read", topic: "ITC", image: "/Part-18 .png" },
  { label: "COMPLIANCE GUIDE", title: "GSTR-9 & GSTR-9C Filing: Key Compliance Points for Businesses", date: "15 Sep 2025", read: "6 min read", topic: "GST Returns", image: "/Part-16 .png" },
] as const;

const themes = [
  ["percent", "GST Rates & Classification", "Rate Changes"],
  ["handshake", "ITC & Refunds", "ITC"],
  ["file", "E-Invoicing & E-Way Bill", "E-Invoicing"],
  ["calendar", "Return Filing & Compliance", "GST Returns"],
  ["pin", "Place of Supply & Valuation", "GST Compliance"],
  ["search", "Assessment & Audit", "Assessment"],
  ["scale", "Dispute Resolution & Litigation", "Assessment"],
  ["chart", "Sector-wise Advisories", "GST Compliance"],
] as const;

const resources = [
  ["file", "Guides & Toolkits", "Practical guides, checklists and step-by-step resources.", "Explore Guides", "/Part-14 .png", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "View Calendar", "/Part-6 .png", "/insights/compliance-calendar"],
  ["document", "Research & Reports", "In-depth research and analytical reports.", "View Reports", "/Part-16 .png", "/resources"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key GST questions.", "Browse FAQs", "/Part-18 .png", "/faqs"],
] as const;

const episodes = [
  { title: "GST 2.0: Key Changes and What Businesses Should Do", date: "12 Sep 2025", views: "1.2K views", duration: "28:15", image: "/images/services/gst-and-indirect-tax-regulatory-support.webp" },
  { title: "ITC Disputes: Practical Insights from Industry Experts", date: "05 Sep 2025", views: "980 views", duration: "32:40", image: "/Part-18 .png" },
  { title: "E-Invoicing & E-Way Bill: Compliance Strategy for 2025", date: "28 Aug 2025", views: "760 views", duration: "26:18", image: "/Part-16 .png" },
  { title: "GST for Startups: Opportunities and Compliance Challenges", date: "20 Aug 2025", views: "690 views", duration: "24:10", image: "/Part-14 .png" },
] as const;

const testimonials = [
  ["Astronis Global’s GST insights help us stay compliant and take timely action on regulatory changes.", "Manufacturing Company (India)"],
  ["Clear, practical and business-focused analysis on GST developments. Their updates are extremely useful.", "E-commerce Company (India)"],
  ["The team provides timely alerts and concise explanations, helping us manage compliance with confidence.", "NBFC (India)"],
] as const;

function SectionHeading({ title, href, action, subtitle }: { title: string; href: string; action: string; subtitle?: string }) {
  return <div className={styles.sectionHeading}><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link href={href}>{action}<Icon name="arrow" /></Link></div>;
}

function matchesTopic(topic: string, title: string, label: string, selectedTopic: string) {
  if (!selectedTopic || selectedTopic === "GST Compliance") return true;
  if (selectedTopic === "GST Notifications") return label.includes("NOTIFICATION");
  if (selectedTopic === "Circulars" || selectedTopic === "Circular") return label.includes("CIRCULAR");
  if (selectedTopic === "Assessment & Audit" || selectedTopic === "Assessment") return /assessment|audit|litigation|dispute/i.test(`${title} ${topic}`);
  if (selectedTopic === "GST Council") return /council|rate changes/i.test(`${title} ${topic}`);
  if (selectedTopic === "E-Invoicing & E-Way Bill") return topic === "E-Invoicing" || topic === "E-Way Bill";
  if (selectedTopic === "GST Rates & Valuation") return topic === "Rate Changes";
  if (selectedTopic === "Compliance & Advisory") return selectedTopic === topic || topic === "GST Returns";
  return topic === selectedTopic || title.toLowerCase().includes(selectedTopic.toLowerCase());
}

export default function GstUpdates() {
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
      <AssetImage src="/images/services/gst-and-indirect-tax-regulatory-support.webp" alt="" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Resources</Link><span>›</span><span>GST Updates</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Insights &amp; Resources</span>
          <h1>GST Updates</h1>
          <h2>GST Filing, News, Returns and Advisory.</h2>
          <p>Stay informed with the latest GST notifications, circulars, rate changes, compliance updates and practical guidance to manage your tax obligations efficiently.</p>
          <div className={styles.heroActions}><Link href="#latest-updates">View Latest GST Updates <Icon name="arrow" /></Link><Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <div className={styles.content}>
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><span className={styles.srOnly}>Search GST updates</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search GST notifications, circulars, returns, compliance or keywords..." /><Icon name="search" /></label>
        <div className={styles.popularTopics}><strong>Popular Topics:</strong><div>{topics.slice(0, showMoreTopics ? topics.length : 7).map((topic) => <button type="button" key={topic} aria-pressed={selectedTopic === topic} className={selectedTopic === topic ? styles.activeTopic : ""} onClick={() => selectTopic(topic)}>{topic}</button>)}<button type="button" aria-expanded={showMoreTopics} onClick={() => setShowMoreTopics((value) => !value)}>{showMoreTopics ? "Less" : "More"} <Icon name="chevron" /></button></div></div>
      </div>

      <section className={styles.section} id="categories">
        <SectionHeading title="Explore GST Updates by Category" href="#categories" action="View All Categories" />
        <div className={styles.categoryGrid}>{categories.map(([icon, title, description, image, topic]) => <Link href="#latest-updates" className={styles.categoryCard} key={title} onClick={() => setSelectedTopic(topic)}>
          <span className={styles.categoryImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 12vw" /></span><span className={styles.categoryIcon}><Icon name={icon} /></span><strong>{title}</strong><span>{description}</span>
        </Link>)}</div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.featuredLatest}`} id="latest-updates">
        <div>
          <SectionHeading title="Featured GST Update" href="#insights-analysis" action="Read Full Analysis" />
          <article className={styles.featuredArticle}>
            <div className={styles.featuredImage}><AssetImage src="/images/services/gst-and-indirect-tax-regulatory-support.webp" alt="GST compliance and indirect tax advisory" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
            <div className={styles.featuredBody}><span className={styles.badge}>FEATURED UPDATE</span><h3>GST Council recommends key rate rationalisation measures</h3><p>Overview of proposed GST rate changes, sector-wise impact and next steps for businesses.</p><div className={styles.meta}><span><Icon name="calendar" />28 Sep 2025</span><span><Icon name="clock" />8 min read</span><span><Icon name="person" />Astronis Global Editorial Team</span></div><Link href="#insights-analysis" className={styles.readLink}>Read Full Analysis <Icon name="arrow" /></Link></div>
          </article>
        </div>
        <div className={styles.latestColumn}>
          <SectionHeading title="Latest GST Updates" href="/insights/legal-updates" action="View All Updates" />
          <div className={styles.updateList}>{visibleUpdates.map((item) => <Link href={item.href} className={styles.updateItem} key={item.title}>
            <span className={styles.updateDate}><strong>{item.day}</strong><small>{item.month}</small></span><span className={styles.updateText}><small>{item.label}</small><strong>{item.title}</strong></span><Icon name="arrow" />
          </Link>)}{visibleUpdates.length === 0 && <p className={styles.emptyState}>No GST updates match your search. Try a different keyword or topic.</p>}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.analysisThemes}`} id="insights-analysis">
        <div><SectionHeading title="Insights &amp; Analysis" href="/insights" action="View All Insights" />
          <div className={styles.analysisGrid}>{visibleAnalysis.map((item) => <article className={styles.analysisCard} key={item.title}>
            <AssetImage src={item.image} alt="" fill sizes="(max-width: 600px) 90vw, 30vw" /><div className={styles.analysisOverlay} /><div className={styles.analysisBody}><span className={styles.badge}>{item.label}</span><h3>{item.title}</h3><div className={styles.meta}><span><Icon name="calendar" />{item.date}</span><span><Icon name="clock" />{item.read}</span></div><Link href="/insights/legal-updates" className={styles.readLink}>Read Analysis <Icon name="arrow" /></Link></div>
          </article>)}{visibleAnalysis.length === 0 && <p className={styles.emptyState}>No analysis matches your search or selected topic.</p>}</div>
        </div>
        <div className={styles.themes}>
          <SectionHeading title="Key GST Themes" href="#categories" action="View All Themes" />
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
        </article>)}<aside className={styles.promoPanel}><span>Conversations with</span><strong>Industry Experts,<br />Tax Professionals<br />and Business Leaders.</strong><Link href="/media">Explore All Episodes <Icon name="arrow" /></Link></aside></div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
        <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
      </section>
    </div>

    <section className={styles.cta}>
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaShade} /><div className={styles.ctaInner}><div><h2>Stay Compliant. Stay Ahead.</h2><p>Get the latest GST updates, compliance insights and expert analysis from Astronis Global.</p></div>
        <form onSubmit={subscribe}><div><label className={styles.srOnly} htmlFor="gst-subscribe-email">Email address</label><input id="gst-subscribe-email" name="email" type="email" placeholder="Enter your email address" required maxLength={180} /><button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" /></button></div><label className={styles.consent}><input type="checkbox" name="consent" value="yes" required />I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{subscribeStatus && <p role="status">{subscribeStatus}</p>}</form>
      </div>
    </section>
  </div>;
}
