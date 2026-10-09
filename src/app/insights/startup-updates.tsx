"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import styles from "./gst-updates.module.css";
import avatarStyles from "./mca-updates.module.css";

const topics = ["Start-up India", "MSME Schemes", "Credit & Finance", "Incubation", "Tax Benefits", "Compliance", "Export Promotion", "Innovation"];

const categories = [
  ["calendar", "Policy Updates & Notifications", "Latest government notifications and policy changes", "/corporate-regulatory-hero.png", "Policy Updates"],
  ["rocket", "Start-up India Initiatives", "Recognitions, incentives and regulatory support", "/images/services/startup-and-investment-advisory.webp", "Start-up India"],
  ["building", "MSME Schemes & Benefits", "Credit support, subsidies and government schemes", "/images/services/msme-advisory-and-disputes.webp", "MSME Schemes"],
  ["handshake", "Funding & Incentives", "Grants, tax benefits and investment opportunities", "/business-financial-advisory.png", "Credit & Finance"],
  ["file", "Compliance & Regulatory", "Statutory requirements, filings and ongoing compliance", "/images/services/regulatory-and-compliance.webp", "Compliance"],
  ["bulb", "Incubation & Innovation", "Incubators, accelerators and innovation programs", "/Startups & Emerging Businesses .png", "Incubation"],
  ["chart", "Sector-specific Updates", "Manufacturing, export, technology and sectoral policies", "/Professional & Business Services .png", "Export Promotion"],
  ["document", "Tenders & Government Support", "Procurement opportunities and government initiatives", "/Agriculture & Agri-Business .png", "Policy Updates"],
] as const;

const updates = [
  { day: "06", month: "Oct 2025", label: "NOTIFICATION", title: "Revision in Start-up India Recognition Criteria – DPIIT Notification", topic: "Start-up India", href: "/insights/legal-updates" },
  { day: "28", month: "Sep 2025", label: "SCHEME UPDATE", title: "Credit Guarantee Scheme for MSMEs – Enhanced Coverage", topic: "MSME Schemes", href: "/insights/legal-updates" },
  { day: "20", month: "Sep 2025", label: "POLICY UPDATE", title: "Changes in MSME Classification – Investment and Turnover Limits", topic: "MSME Schemes", href: "/insights/legal-updates" },
  { day: "12", month: "Sep 2025", label: "REGULATORY", title: "Relaxations for Start-ups under Company Law – MCA Update", topic: "Compliance", href: "/insights/legal-updates" },
  { day: "02", month: "Sep 2025", label: "ADVISORY", title: "MSME Export Promotion – New Incentives and Support Measures", topic: "Export Promotion", href: "/insights/legal-updates" },
] as const;

const analysis = [
  { label: "ANALYSIS", title: "India's Start-Up Ecosystem 2025: Policy Support and Growth Opportunities", date: "28 Sep 2025", read: "6 min read", topic: "Start-up India", image: "/images/services/startup-and-investment-advisory.webp" },
  { label: "EXPERT VIEW", title: "MSME Financing in India: New Schemes and Credit Opportunities", date: "22 Sep 2025", read: "7 min read", topic: "Credit & Finance", image: "/images/services/msme-advisory-and-disputes.webp" },
  { label: "SECTOR FOCUS", title: "Compliance Checklist for Start-ups and MSMEs in 2025", date: "15 Sep 2025", read: "5 min read", topic: "Compliance", image: "/images/services/regulatory-and-compliance.webp" },
] as const;

const themes = [
  ["rocket", "Start-up Recognition & Benefits", "Start-up India"],
  ["database", "MSME Financing & Credit Support", "Credit & Finance"],
  ["percent", "Tax Benefits & Incentives", "Tax Benefits"],
  ["shield", "Regulatory Compliance", "Compliance"],
  ["cpu", "Technology & Innovation", "Innovation"],
  ["globe", "Export Promotion & Global Markets", "Export Promotion"],
  ["chart", "Sector-specific Schemes", "MSME Schemes"],
  ["file", "Tenders & Procurement", "Policy Updates"],
] as const;

const resources = [
  ["file", "Guides & Toolkits", "Practical guides, checklists and step-by-step resources.", "Explore Guides", "/Part-14 .png", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "View Calendar", "/Part-6 .png", "/insights/compliance-calendar"],
  ["document", "Research & Reports", "In-depth research on start-up and MSME policies.", "View Reports", "/images/services/business-advisory-and-consulting.webp", "/resources"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key regulatory questions.", "Browse FAQs", "/Part-18 .png", "/faqs"],
] as const;

const episodes = [
  { title: "Start-up India 2.0: What Founders Should Know", date: "12 Sep 2025", views: "1.2K views", duration: "28:15", image: "/images/services/startup-and-investment-advisory.webp" },
  { title: "MSME Financing Options and Credit Schemes", date: "05 Sep 2025", views: "980 views", duration: "32:40", image: "/images/services/msme-advisory-and-disputes.webp" },
  { title: "Compliance for Start-ups: Key Legal and Regulatory Steps", date: "28 Aug 2025", views: "760 views", duration: "26:18", image: "/images/services/regulatory-and-compliance.webp" },
  { title: "Export Opportunities for Indian MSMEs", date: "20 Aug 2025", views: "690 views", duration: "24:10", image: "/images/services/cross-border-and-international-business-support.webp" },
] as const;

const testimonials = [
  ["Astronis Global’s insights on start-up and MSME policies have been extremely helpful for our compliance and growth planning.", "Technology Start-up (India)"],
  ["Timely updates and practical analysis on MSME schemes and regulatory changes help us take informed business decisions.", "Manufacturing MSME (India)"],
  ["Clear, concise and actionable guidance. Their research and advisory support is highly valuable for our operations.", "Export-oriented MSME (India)"],
] as const;

function SectionHeading({ title, href, action, subtitle }: { title: string; href: string; action: string; subtitle?: string }) {
  return <div className={styles.sectionHeading}><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link href={href}>{action}<Icon name="arrow" /></Link></div>;
}

function matchesTopic(topic: string, title: string, selectedTopic: string) {
  if (!selectedTopic) return true;
  if (selectedTopic === "Tax Benefits") return /tax|benefit|incentive/i.test(`${title} ${topic}`);
  if (selectedTopic === "Innovation") return /innovation|incubat|technology/i.test(`${title} ${topic}`);
  if (selectedTopic === "Policy Updates") return /policy|government|tender|support/i.test(`${title} ${topic}`);
  return topic === selectedTopic || `${title} ${topic}`.toLowerCase().includes(selectedTopic.toLowerCase());
}

export default function StartupUpdates() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleUpdates = useMemo(
    () => updates.filter((item) => matchesTopic(item.topic, item.title, selectedTopic)
      && (!normalizedQuery || `${item.title} ${item.label} ${item.topic}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedTopic],
  );
  const visibleAnalysis = useMemo(
    () => analysis.filter((item) => matchesTopic(item.topic, item.title, selectedTopic)
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
      <AssetImage src="/Banner-Startups & Emerging Businesses .png" alt="" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Resources</Link><span>›</span><span>Start-Up and MSME Updates</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Insights &amp; Resources</span>
          <h1 className={avatarStyles.startupHeroTitle}>Start-Up and MSME</h1>
          <h2>Updates &amp; Notification.</h2>
          <p>Stay informed with the latest policy updates, notifications, schemes and regulatory developments for Start-ups and MSMEs. Insights to help businesses grow, comply and seize new opportunities.</p>
          <div className={styles.heroActions}><Link href="#latest-updates">View Latest Start-Up &amp; MSME Updates <Icon name="arrow" /></Link><Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <div className={styles.content}>
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><span className={styles.srOnly}>Search Start-Up and MSME updates</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search start-up and MSME updates, schemes, notifications or topics..." /><Icon name="search" /></label>
        <div className={styles.popularTopics}><strong>Popular Topics:</strong><div>{topics.slice(0, showMoreTopics ? topics.length : 6).map((topic) => <button type="button" key={topic} aria-pressed={selectedTopic === topic} className={selectedTopic === topic ? styles.activeTopic : ""} onClick={() => selectTopic(topic)}>{topic}</button>)}<button type="button" aria-expanded={showMoreTopics} onClick={() => setShowMoreTopics((value) => !value)}>{showMoreTopics ? "Less" : "More"} <Icon name="chevron" /></button></div></div>
      </div>

      <section className={styles.section} id="categories">
        <SectionHeading title="Explore Start-Up and MSME Updates by Category" href="#categories" action="View All Categories" />
        <div className={styles.categoryGrid}>{categories.map(([icon, title, description, image, topic]) => <Link href="#latest-updates" className={styles.categoryCard} key={title} onClick={() => setSelectedTopic(topic)}>
          <span className={styles.categoryImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 12vw" /></span><span className={styles.categoryIcon}><Icon name={icon} /></span><strong>{title}</strong><span>{description}</span>
        </Link>)}</div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.featuredLatest}`} id="latest-updates">
        <div>
          <SectionHeading title="Featured Update" href="#insights-analysis" action="Read Full Analysis" />
          <article className={styles.featuredArticle}>
            <div className={styles.featuredImage}><AssetImage src="/images/services/msme-advisory-and-disputes.webp" alt="MSME advisory and business support" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
            <div className={styles.featuredBody}><span className={styles.badge}>FEATURED UPDATE</span><h3>New MSME Classification and Enhanced Benefits</h3><p>Revised investment and turnover limits to enable greater access to credit, technology and government schemes.</p><div className={styles.meta}><span><Icon name="calendar" />28 Sep 2025</span><span><Icon name="clock" />8 min read</span><span><Icon name="person" />Astronis Global Editorial Team</span></div><Link href="#insights-analysis" className={styles.readLink}>Read Full Analysis <Icon name="arrow" /></Link></div>
          </article>
        </div>
        <div className={styles.latestColumn}>
          <SectionHeading title="Latest Start-Up &amp; MSME Updates" href="/insights/legal-updates" action="View All Updates" />
          <div className={styles.updateList}>{visibleUpdates.map((item) => <Link href={item.href} className={styles.updateItem} key={item.title}>
            <span className={styles.updateDate}><strong>{item.day}</strong><small>{item.month}</small></span><span className={styles.updateText}><small>{item.label}</small><strong>{item.title}</strong></span><Icon name="arrow" />
          </Link>)}{visibleUpdates.length === 0 && <p className={styles.emptyState}>No updates match your search. Try a different keyword or topic.</p>}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.analysisThemes}`} id="insights-analysis">
        <div><SectionHeading title="Insights &amp; Analysis" href="/insights" action="View All Insights" />
          <div className={styles.analysisGrid}>{visibleAnalysis.map((item) => <article className={styles.analysisCard} key={item.title}>
            <AssetImage src={item.image} alt="" fill sizes="(max-width: 600px) 90vw, 30vw" /><div className={styles.analysisOverlay} /><div className={styles.analysisBody}><span className={styles.badge}>{item.label}</span><h3>{item.title}</h3><div className={styles.meta}><span><Icon name="calendar" />{item.date}</span><span><Icon name="clock" />{item.read}</span></div><Link href="/insights/legal-updates" className={styles.readLink}>Read Analysis <Icon name="arrow" /></Link></div>
          </article>)}{visibleAnalysis.length === 0 && <p className={styles.emptyState}>No analysis matches your search or selected topic.</p>}</div>
        </div>
        <div className={styles.themes}>
          <SectionHeading title="Key Themes" href="#categories" action="View All Themes" />
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
        </article>)}<aside className={styles.promoPanel}><span>Conversations with</span><strong>Industry Experts,<br />Founders and<br />Policy Leaders.</strong><Link href="/media">Explore All Episodes <Icon name="arrow" /></Link></aside></div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
        <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
      </section>
    </div>

    <section className={styles.cta}>
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaShade} /><div className={styles.ctaInner}><div><h2>Empowering Start-ups. Enabling MSMEs.</h2><p>Get the latest updates, insights and expert analysis from Astronis Global.</p></div>
        <form onSubmit={subscribe}><div><label className={styles.srOnly} htmlFor="startup-subscribe-email">Email address</label><input id="startup-subscribe-email" name="email" type="email" placeholder="Enter your email address" required maxLength={180} /><button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" /></button></div><label className={styles.consent}><input type="checkbox" name="consent" value="yes" required />I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{subscribeStatus && <p role="status">{subscribeStatus}</p>}</form>
      </div>
    </section>
  </div>;
}
