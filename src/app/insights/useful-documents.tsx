"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import styles from "./gst-updates.module.css";
import documentStyles from "./useful-documents.module.css";

const quickLinks = ["Legal Documents", "Corporate Documents", "Regulatory Forms", "Client Onboarding", "Other Templates"];

const categories = [
  ["building", "Firm & Profile Documents", "Profile, brochures and corporate information", "/corporate-regulatory-hero.png", "Legal Documents"],
  ["people", "Authority & Representation", "Vakalatnama, Authority Letter, Power of Attorney", "/legal-professionals-hero.png", "Legal Documents"],
  ["file", "Corporate & Secretarial Forms", "Board resolutions, shareholder resolutions and company forms", "/governance-secretarial-advisory.png", "Corporate Documents"],
  ["scale", "Regulatory & Compliance", "MCA, RBI, SEBI, GST and other regulatory forms", "/images/services/regulatory-and-compliance.webp", "Regulatory Forms"],
  ["document", "Contracts & Agreements", "NDAs, service agreements and commercial templates", "/images/services/corporate-and-commercial-advisory.webp", "Corporate Documents"],
  ["trophy", "Litigation & Court Forms", "Affidavits, applications and court-related templates", "/Part-14 .png", "Legal Documents"],
  ["person", "Client Onboarding & KYC", "Client information forms and KYC documents", "/Part-6 .png", "Client Onboarding"],
  ["folder", "Other Useful Templates", "HR, property, due diligence and more", "/Part-16 .png", "Other Templates"],
] as const;

type FeaturedDocument = { title: string; description: string; image: string; category: string };

const featuredDocuments: FeaturedDocument[] = [
  { title: "Profile of Astronis Global", description: "Firm profile, key services and industry focus.", image: "/corporate-regulatory-hero.png", category: "Legal Documents" },
  { title: "Authority Letter", description: "Format for authorising representation.", image: "/legal-professionals-hero.png", category: "Legal Documents" },
  { title: "Vakalatnama", description: "Standard format for filing in courts.", image: "/Part-14 .png", category: "Legal Documents" },
  { title: "General Power of Attorney", description: "Format for general authorisation.", image: "/Part-18 .png", category: "Legal Documents" },
  { title: "Special Power of Attorney", description: "Format for specific transactions.", image: "/Part-16 .png", category: "Legal Documents" },
  { title: "Board Resolution (Company)", description: "Format for key corporate actions.", image: "/governance-secretarial-advisory.png", category: "Corporate Documents" },
];

const usefulDocuments = [
  ["Client Information Form", "Client Onboarding", "file"],
  ["KYC Checklist (Individual & Entity)", "Client Onboarding", "document"],
  ["Non-Disclosure Agreement (NDA)", "Corporate Documents", "lock"],
  ["Service Agreement", "Corporate Documents", "pencil"],
  ["Engagement Letter", "Legal Documents", "file"],
  ["Retainer Agreement", "Corporate Documents", "document"],
  ["Board Resolution (GST Registration)", "Corporate Documents", "building"],
  ["Shareholder Resolution", "Corporate Documents", "people"],
  ["Compliance Undertaking", "Regulatory Forms", "shield"],
  ["Declaration & Affidavit", "Legal Documents", "document"],
  ["Due Diligence Checklist", "Other Templates", "search"],
  ["IPR Appointment Letter", "Legal Documents", "award"],
] as const;

const resources = [
  ["file", "Guides & Toolkits", "Step-by-step guides, checklists and templates.", "Explore Guides", "/Part-14 .png", "/resources/business-guides"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory filings.", "View Calendar", "/Part-6 .png", "/insights/compliance-calendar"],
  ["document", "Research & Reports", "In-depth research on legal and regulatory topics.", "View Reports", "/images/services/corporate-and-commercial-advisory.webp", "/resources"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to common regulatory questions.", "Browse FAQs", "/Part-18 .png", "/faqs"],
] as const;

const episodes = [
  { title: "Key Legal Documents Every Business Should Have", date: "12 Sep 2025", views: "1.2K views", duration: "28:15", image: "/images/services/corporate-and-commercial-advisory.webp" },
  { title: "Power of Attorney – When and How to Use", date: "05 Sep 2025", views: "980 views", duration: "32:40", image: "/legal-professionals-hero.png" },
  { title: "Contract Basics for Startups and MSMEs", date: "28 Aug 2025", views: "760 views", duration: "26:18", image: "/images/services/business-advisory-and-consulting.webp" },
  { title: "Regulatory Compliance Documents Explained", date: "20 Aug 2025", views: "690 views", duration: "24:10", image: "/images/services/regulatory-and-compliance.webp" },
] as const;

const testimonials = [
  ["The document templates provided by Astronis Global are practical, easy to use and save significant time for our team.", "Technology Company (India)"],
  ["Clear, well-structured templates and guidance. The documents helped us streamline our compliance processes.", "Manufacturing Company (India)"],
  ["Highly useful resource section with updated templates and regulatory forms. Very professional and reliable.", "Start-up Company (India)"],
] as const;

function SectionHeading({ title, href, action, subtitle }: { title: string; href: string; action: string; subtitle?: string }) {
  return <div className={styles.sectionHeading}><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link href={href}>{action}<Icon name="arrow" /></Link></div>;
}

export default function UsefulDocuments() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleFeatured = useMemo(
    () => featuredDocuments.filter((item) => (!selectedCategory || item.category === selectedCategory)
      && (!normalizedQuery || `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedCategory],
  );
  const visibleUseful = useMemo(
    () => usefulDocuments.filter(([title, category]) => (!selectedCategory || category === selectedCategory)
      && (!normalizedQuery || `${title} ${category}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedCategory],
  );
  const visibleCategories = useMemo(
    () => categories.filter(([, title, description, , category]) => (!selectedCategory || category === selectedCategory)
      && (!normalizedQuery || `${title} ${description} ${category}`.toLowerCase().includes(normalizedQuery))),
    [normalizedQuery, selectedCategory],
  );

  function selectCategory(category: string) {
    setSelectedCategory((current) => current === category ? "" : category);
    document.getElementById("featured-documents")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function requestDownload(title: string) {
    setDownloadNotice(`${title}: the document file is not available yet. Please contact us for assistance.`);
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
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill priority sizes="100vw" />
      <div className={`${styles.heroShade} ${documentStyles.heroShade}`} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/resources">Knowledge Centre</Link><span>›</span><span>Download - Useful Documents</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Knowledge Centre</span>
          <h1 className={documentStyles.heroTitle}>Download – Useful Documents</h1>
          <h2>Key Templates for Your Legal and Business Needs.</h2>
          <p>Access ready-to-use legal, corporate and regulatory document templates to simplify your business and legal processes. Download, customise and use with confidence.</p>
          <div className={styles.heroActions}><Link href="#featured-documents">Browse All Documents <Icon name="arrow" /></Link><Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <div className={styles.content}>
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><span className={styles.srOnly}>Search documents</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents (e.g., Vakalatnama, Power of Attorney, Board Resolution...)" /><Icon name="search" /></label>
        <div className={styles.popularTopics}><strong>Quick Links:</strong><div>{quickLinks.slice(0, showMoreLinks ? quickLinks.length : 5).map((category) => <button type="button" key={category} aria-pressed={selectedCategory === category} className={selectedCategory === category ? styles.activeTopic : ""} onClick={() => selectCategory(category)}>{category}</button>)}<button type="button" aria-expanded={showMoreLinks} onClick={() => setShowMoreLinks((shown) => !shown)}>{showMoreLinks ? "Less" : "More"} <Icon name="chevron" /></button></div></div>
      </div>

      <section className={styles.section} id="categories">
        <SectionHeading title="Explore Documents by Category" href="#categories" action="View All Categories" />
        <div className={`${styles.categoryGrid} ${documentStyles.categoryGrid}`}>{visibleCategories.map(([icon, title, description, image, category]) => <button type="button" className={styles.categoryCard} key={title} onClick={() => selectCategory(category)}>
          <span className={styles.categoryImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 12vw" /></span><span className={styles.categoryIcon}><Icon name={icon} /></span><strong>{title}</strong><span>{description}</span>
        </button>)}</div>
        {visibleCategories.length === 0 && <p className={documentStyles.emptyState}>No document categories match your search.</p>}
      </section>

      <section className={`${styles.section} ${styles.shaded}`} id="featured-documents">
        <SectionHeading title="Featured Documents" href="#more-documents" action="View All Documents" />
        <div className={documentStyles.featuredGrid}>{visibleFeatured.map((document) => <article className={documentStyles.documentCard} key={document.title}>
          <span className={documentStyles.documentImage}><AssetImage src={document.image} alt="" fill sizes="(max-width: 600px) 45vw, 17vw" /><span className={documentStyles.pdfBadge}>PDF</span></span>
          <div className={documentStyles.documentBody}><strong>{document.title}</strong><p>{document.description}</p><button type="button" onClick={() => requestDownload(document.title)}>Download <Icon name="arrow" /></button></div>
        </article>)}</div>
        {visibleFeatured.length === 0 && <p className={documentStyles.emptyState}>No featured documents match your search.</p>}
      </section>

      <section className={styles.section} id="more-documents">
        <SectionHeading title="More Useful Documents" href="#more-documents" action="View All Documents" />
        <div className={documentStyles.usefulGrid}>{visibleUseful.map(([title]) => <button type="button" className={documentStyles.usefulCard} key={title} onClick={() => requestDownload(title)}><Icon name="document" /><span>{title}</span><Icon name="arrow" /></button>)}</div>
        {visibleUseful.length === 0 && <p className={documentStyles.emptyState}>No useful documents match your search.</p>}
        {downloadNotice && <p className={documentStyles.downloadNotice} role="status">{downloadNotice}</p>}
      </section>

      <section className={`${styles.section} ${styles.shaded}`} id="knowledge-centre">
        <SectionHeading title="Knowledge Centre" href="/resources" action="View All Resources" />
        <div className={styles.resourceGrid}>{resources.map(([icon, title, description, action, image, href]) => <Link href={href} className={styles.resourceCard} key={title}>
          <span className={styles.resourceImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 90vw, 25vw" /></span><span className={styles.resourceIcon}><Icon name={icon} /></span><span className={`${styles.resourceBody} ${documentStyles.knowledgeResourceBody}`}><strong>{title}</strong><span>{description}</span><em>{action} <Icon name="arrow" /></em></span>
        </Link>)}</div>
      </section>

      <section className={styles.section} id="conversation">
        <SectionHeading title="ASTRONIS IN CONVERSATION" href="/media" action="View All Episodes" subtitle="Watch. Listen. Discover." />
        <div className={styles.conversationGrid}>{episodes.map((episode) => <article className={styles.episodeCard} key={episode.title}>
          <Link href="/media" className={styles.episodeImage} aria-label={`Play ${episode.title}`}><AssetImage src={episode.image} alt="" fill sizes="(max-width: 600px) 90vw, 20vw" /><span className={styles.playButton}><Icon name="play" /></span><small>{episode.duration}</small></Link>
          <div className={styles.episodeBody}><strong>{episode.title}</strong><span><Icon name="calendar" />{episode.date}<i /><Icon name="play" />{episode.views}</span></div>
        </article>)}<aside className={styles.promoPanel}><span>Conversations with</span><strong>Industry Experts,<br />Legal Professionals<br />and Business Leaders.</strong><Link href="/media">Explore All Episodes <Icon name="arrow" /></Link></aside></div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
        <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
      </section>
    </div>

    <section className={styles.cta}>
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaShade} /><div className={styles.ctaInner}><div><h2>Simplify Your Legal and Compliance Processes</h2><p className={documentStyles.ctaDescription}>Download essential documents, guides and templates from Astronis Global.</p></div>
        <form onSubmit={subscribe}><div><label className={styles.srOnly} htmlFor="documents-subscribe-email">Email address</label><input id="documents-subscribe-email" name="email" type="email" placeholder="Enter your email address" required maxLength={180} /><button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" /></button></div><label className={styles.consent}><input type="checkbox" name="consent" value="yes" required />I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{subscribeStatus && <p role="status">{subscribeStatus}</p>}</form>
      </div>
    </section>
  </div>;
}
