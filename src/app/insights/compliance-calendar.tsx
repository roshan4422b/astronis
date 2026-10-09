"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import styles from "./gst-updates.module.css";
import calendarStyles from "./compliance-calendar.module.css";

const quickLinks = ["MCA", "GST", "Income Tax", "RBI", "SEBI", "Labour Laws", "Other Compliances", "Start-up & MSME"];

const categories = [
  ["building", "MCA Compliance Dates", "/governance-secretarial-hero.png", "MCA"],
  ["percent", "GST Compliance Dates", "/images/services/gst-and-indirect-tax-regulatory-support.webp", "GST"],
  ["file", "Income Tax Compliance Dates", "/images/services/taxation-compliance.svg", "Income Tax"],
  ["database", "RBI Compliance Dates", "/images/services/banking-rbi-financial-services.svg", "RBI"],
  ["chart", "SEBI Compliance Dates", "/Part-14 .png", "SEBI"],
  ["people", "Labour Laws Compliance Dates", "/images/services/regulatory-and-compliance.webp", "Labour Laws"],
  ["rocket", "Start-up & MSME Compliance Dates", "/images/services/startup-and-investment-advisory.webp", "Start-up & MSME"],
  ["document", "Other Regulatory Compliances", "/corporate-regulatory-hero.png", "Other Compliances"],
] as const;

type ComplianceRow = { date: string; compliance: string; reference: string };
type ComplianceGroup = { id: string; title: string; icon: string; rows: ComplianceRow[]; href: string };

const complianceGroups: ComplianceGroup[] = [
  {
    id: "MCA", title: "MCA Compliance Calendar", icon: "building", href: "/insights/legal-updates",
    rows: [
      { date: "14 Oct 2025", compliance: "Issue of shares (private placement / rights)", reference: "PAS-3" },
      { date: "15 Oct 2025", compliance: "Charge creation/modification (within 30 days)", reference: "CHG-1" },
      { date: "25 Oct 2025", compliance: "Return of deposits", reference: "DPT-3" },
      { date: "30 Oct 2025", compliance: "Board meeting for financial results (if applicable)", reference: "Companies Act" },
      { date: "31 Oct 2025", compliance: "Annual return for certain dormant companies", reference: "MGT-7A" },
    ],
  },
  {
    id: "GST", title: "GST Compliance Calendar", icon: "file", href: "/insights/legal-updates",
    rows: [
      { date: "10 Oct 2025", compliance: "GSTR-7 (TDS) for Sep 2025", reference: "GSTR-7" },
      { date: "11 Oct 2025", compliance: "GSTR-1 (Monthly) for Sep 2025", reference: "GSTR-1" },
      { date: "13 Oct 2025", compliance: "GSTR-6 (ISD) for Sep 2025", reference: "GSTR-6" },
      { date: "20 Oct 2025", compliance: "GSTR-3B (Monthly) for Sep 2025", reference: "GSTR-3B" },
      { date: "22 Oct 2025", compliance: "GSTR-5 (Non-resident Taxable Person) for Sep 2025", reference: "GSTR-5" },
    ],
  },
  {
    id: "Income Tax", title: "Income Tax Compliance Calendar", icon: "database", href: "/insights/legal-updates",
    rows: [
      { date: "07 Oct 2025", compliance: "TDS/TCS payment for Sep 2025", reference: "Challan 281" },
      { date: "15 Oct 2025", compliance: "Advance Tax (Quarter 2) for FY 2025-26", reference: "Challan 280" },
      { date: "15 Oct 2025", compliance: "Issue of TDS Certificate for Q2 (Jul-Sep)", reference: "Form 16A / 16B" },
      { date: "31 Oct 2025", compliance: "ITR filing (belated for AY 2025-26)", reference: "ITR-1 to ITR-7" },
      { date: "31 Oct 2025", compliance: "Statement of Financial Transaction (SFT)", reference: "Form 61A/61B" },
    ],
  },
];

const resources = [
  ["file", "Compliance Checklist", "Step-by-step checklists for businesses.", "Explore Checklists", "/Part-14 .png", "/resources/compliance-checklists"],
  ["calendar", "Regulatory Updates", "Latest notifications and amendments.", "Read Updates", "/Part-6 .png", "/insights/legal-updates"],
  ["globe", "Sector-wise Compliance", "Industry specific compliance requirements.", "Explore Sectors", "/Professional & Business Services .png", "/industries"],
  ["bulb", "FAQ’s & Guidance", "Expert answers to common compliance queries.", "Browse FAQs", "/Part-18 .png", "/faqs"],
] as const;

const episodes = [
  { title: "Compliance Planning for Growing Businesses", date: "12 Sep 2025", views: "1.2K views", duration: "28:15", image: "/images/services/business-advisory-and-consulting.webp" },
  { title: "Tax and Regulatory Updates – What to Watch", date: "05 Sep 2025", views: "980 views", duration: "32:40", image: "/images/services/gst-and-indirect-tax-regulatory-support.webp" },
  { title: "MCA Reforms 2025 – Impact and Way Forward", date: "28 Aug 2025", views: "760 views", duration: "26:18", image: "/governance-secretarial-hero.png" },
  { title: "GST Compliance – Key Changes Explained", date: "20 Aug 2025", views: "690 views", duration: "24:10", image: "/images/services/regulatory-and-compliance.webp" },
] as const;

const testimonials = [
  ["The compliance calendar from Astronis Global helps us stay ahead of deadlines and avoid penal consequences.", "Manufacturing Company (India)"],
  ["Practical insights and timely updates make regulatory compliance much easier for our finance and legal teams.", "Technology Company (India)"],
  ["Clear, concise and reliable guidance on MCA, GST and Income Tax compliances. Highly valuable for our businesses.", "MSME Company (India)"],
] as const;

const monthFormat = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" });

function SectionHeading({ title, href, action, subtitle }: { title: string; href: string; action: string; subtitle?: string }) {
  return <div className={styles.sectionHeading}><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link href={href}>{action}<Icon name="arrow" /></Link></div>;
}

export default function ComplianceCalendar() {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const currentMonth = new Date(2025, 9 + monthOffset, 1);
  const isOctober = monthOffset === 0;
  const normalizedQuery = query.trim().toLowerCase();
  const visibleGroups = useMemo(() => complianceGroups
    .filter((group) => !selectedArea || group.id === selectedArea)
    .map((group) => ({
      ...group,
      rows: group.rows.filter((row) => !normalizedQuery || `${row.date} ${row.compliance} ${row.reference} ${group.title}`.toLowerCase().includes(normalizedQuery)),
    }))
    .filter((group) => group.rows.length || !normalizedQuery), [normalizedQuery, selectedArea]);

  function selectArea(area: string) {
    setSelectedArea((current) => current === area ? "" : area);
    document.getElementById("calendar-tables")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <div className={`${styles.heroShade} ${calendarStyles.heroShade}`} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/insights-events">Insights &amp; Resources</Link><span>›</span><span>Compliance Calendar</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Insights &amp; Resources</span>
          <h1>Compliance Calendar</h1>
          <h2>Key Compliance Dates.</h2>
          <p>Stay ahead with important compliance deadlines for MCA, GST, Income Tax and other regulatory laws. Never miss a due date with our updated compliance calendar.</p>
          <div className={styles.heroActions}><Link href="#calendar-tables">View Full Compliance Calendar <Icon name="arrow" /></Link><Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link></div>
        </div>
      </div>
    </section>

    <div className={styles.content}>
      <div className={styles.searchPanel}>
        <label className={styles.searchBox}><span className={styles.srOnly}>Search compliance dates</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search compliance dates, notifications, filings or keywords..." /><Icon name="search" /></label>
        <div className={styles.popularTopics}><strong>Quick Links:</strong><div>{quickLinks.slice(0, showMoreLinks ? quickLinks.length : 7).map((area) => <button type="button" key={area} aria-pressed={selectedArea === area} className={selectedArea === area ? styles.activeTopic : ""} onClick={() => selectArea(area)}>{area}</button>)}<button type="button" aria-expanded={showMoreLinks} onClick={() => setShowMoreLinks((shown) => !shown)}>{showMoreLinks ? "Less" : "More"} <Icon name="chevron" /></button></div></div>
      </div>

      <section className={styles.section} id="categories">
        <SectionHeading title="Explore Compliance Calendar by Category" href="#categories" action="View All Categories" />
        <div className={`${styles.categoryGrid} ${calendarStyles.categoryGrid}`}>{categories.map(([icon, title, image, area]) => <button type="button" className={styles.categoryCard} key={title} onClick={() => selectArea(area)}>
          <span className={styles.categoryImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 12vw" /></span><span className={styles.categoryIcon}><Icon name={icon} /></span><strong>{title}</strong>
        </button>)}</div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${calendarStyles.monthSection}`} id="calendar-tables">
        <div className={`${styles.sectionHeading} ${calendarStyles.monthHeading}`}><div><h2>Monthly Compliance Calendar</h2></div>
        <div className={calendarStyles.monthToolbar}>
          <button type="button" aria-label="Previous month" onClick={() => setMonthOffset((month) => month - 1)}><Icon name="arrow" className={calendarStyles.previousArrow} /></button>
          <strong className={calendarStyles.currentMonth}><Icon name="calendar" />{monthFormat.format(currentMonth)}</strong>
          <button type="button" aria-label="Next month" onClick={() => setMonthOffset((month) => month + 1)}><Icon name="arrow" /></button>
          <Link href="#calendar-tables">View Full Year Calendar <Icon name="arrow" /></Link>
        </div>
        </div>
        {!isOctober && <p className={calendarStyles.monthMessage}>Showing October 2025 deadlines. More monthly dates will be added to the calendar.</p>}
        <div className={calendarStyles.calendarGrid}>{visibleGroups.map((group) => <article className={calendarStyles.calendarCard} key={group.id}>
          <header className={calendarStyles.calendarCardHeader}><Icon name={group.icon} /><h3>{group.title}</h3><Link href={group.href}>View All <Icon name="arrow" /></Link></header>
          {group.rows.length > 0 ? <div className={calendarStyles.tableScroll}><table className={calendarStyles.calendarTable}><thead><tr><th>Date</th><th>Compliance</th><th>Form / Reference</th></tr></thead><tbody>{group.rows.map((row) => <tr key={`${group.id}-${row.date}-${row.reference}`}><td>{row.date}</td><td>{row.compliance}</td><td>{row.reference}</td></tr>)}</tbody></table></div> : <p className={calendarStyles.noCalendarRows}>No compliance dates match your search.</p>}
          <Link className={calendarStyles.tableCta} href={group.href}>View Complete {group.id} Compliance Calendar <Icon name="arrow" /></Link>
        </article>)}</div>
        {visibleGroups.length === 0 && <p className={calendarStyles.noCalendarRows}>No compliance dates match your search. Try another keyword.</p>}
      </section>

      <section className={`${styles.section} ${styles.shaded}`} id="knowledge-centre">
        <SectionHeading title="Key Compliance Resources" href="/resources" action="View All Resources" />
        <div className={styles.resourceGrid}>{resources.map(([icon, title, description, action, image, href]) => <Link href={href} className={styles.resourceCard} key={title}>
          <span className={styles.resourceImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 90vw, 25vw" /></span><span className={styles.resourceIcon}><Icon name={icon} /></span><span className={styles.resourceBody}><strong>{title}</strong><span>{description}</span><em>{action} <Icon name="arrow" /></em></span>
        </Link>)}</div>
      </section>

      <section className={styles.section} id="conversation">
        <SectionHeading title="ASTRONIS IN CONVERSATION" href="/media" action="View All Episodes" subtitle="Watch. Listen. Discover." />
        <div className={styles.conversationGrid}>{episodes.map((episode) => <article className={styles.episodeCard} key={episode.title}>
          <Link href="/media" className={styles.episodeImage} aria-label={`Play ${episode.title}`}><AssetImage src={episode.image} alt="" fill sizes="(max-width: 600px) 90vw, 20vw" /><span className={styles.playButton}><Icon name="play" /></span><small>{episode.duration}</small></Link>
          <div className={styles.episodeBody}><strong>{episode.title}</strong><span><Icon name="calendar" />{episode.date}<i /><Icon name="play" />{episode.views}</span></div>
        </article>)}<aside className={styles.promoPanel}><span>Conversations with</span><strong>Industry Experts,<br />Regulators and<br />Policy Leaders.</strong><Link href="/media">Explore All Episodes <Icon name="arrow" /></Link></aside></div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
        <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
      </section>
    </div>

    <section className={styles.cta}>
      <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaShade} /><div className={styles.ctaInner}><div><h2>Stay Compliant. Stay Ahead.</h2><p>Get the latest compliance dates, regulatory updates and expert analysis from Astronis Global.</p></div>
        <form onSubmit={subscribe}><div><label className={styles.srOnly} htmlFor="calendar-subscribe-email">Email address</label><input id="calendar-subscribe-email" name="email" type="email" placeholder="Enter your email address" required maxLength={180} /><button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" /></button></div><label className={styles.consent}><input type="checkbox" name="consent" value="yes" required />I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{subscribeStatus && <p role="status">{subscribeStatus}</p>}</form>
      </div>
    </section>
  </div>;
}
