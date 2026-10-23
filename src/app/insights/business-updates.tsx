"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import EmailOtpVerification from "@/app/_components/email-otp-verification";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import styles from "./business-updates.module.css";

const regulators = ["All", "RBI", "MCA", "SEBI", "IFSCA", "FEMA", "GST"] as const;
const additionalRegulators = ["IRDAI", "PFRDA", "CERC"] as const;

const updates = [
  {
    regulator: "RBI",
    title: "RBI issues revised guidelines on Digital Lending for NBFCs",
    date: "06 Oct 2025",
    description: "Enhanced borrower protection and compliance requirements.",
    subject: "Digital Lending Guidelines for NBFCs",
    keywords: "finance fintech lending digital borrower protection",
    image: "/Banking & Financial Services1 .png",
    href: "/insights/rbi-circulars",
  },
  {
    regulator: "MCA",
    title: "MCA notifies revised forms and filing requirements",
    date: "04 Oct 2025",
    description: "Key changes in corporate filings and compliance timelines.",
    subject: "Revised Forms under Companies Act",
    keywords: "company corporate forms filing governance",
    image: "/governance-secretarial-hero.png",
    href: "/insights/mca-updates",
  },
  {
    regulator: "SEBI",
    title: "SEBI enhances disclosure norms for listed entities",
    date: "02 Oct 2025",
    description: "Revised LODR requirements to improve transparency.",
    subject: "Enhanced Disclosure for Listed Entities",
    keywords: "securities listed entities capital markets transparency",
    image: "/FinTech & Digital Finance .png",
    href: "/insights/sebi-updates",
  },
  {
    regulator: "IFSCA",
    title: "IFSCA issues new framework for Fund Management Entities",
    date: "30 Sep 2025",
    description: "Updated eligibility and operational guidelines in GIFT City.",
    subject: "Fund Management Regulations",
    keywords: "gift city global funds cross-border finance",
    image: "/images/services/cross-border-and-international-business-support.webp",
    href: "/insights/legal-updates",
  },
  {
    regulator: "FEMA",
    title: "RBI updates FEMA (ODI) Rules for overseas investments",
    date: "28 Sep 2025",
    description: "Procedural relaxations and reporting requirements.",
    subject: "Revised ODI Reporting Requirements",
    keywords: "foreign exchange overseas investment cross-border",
    image: "/images/services/fema-fdi-and-foreign-exchange-advisory.webp",
    href: "/insights/legal-updates",
  },
  {
    regulator: "GST",
    title: "GST Council recommends rate rationalisation in select sectors",
    date: "25 Sep 2025",
    description: "Changes to benefit manufacturing and export-oriented businesses.",
    subject: "GST rate rationalisation",
    keywords: "tax taxation gst manufacturing exports",
    image: "/images/services/gst-and-indirect-tax-regulatory-support.webp",
    href: "/insights/gst-updates",
  },
  {
    regulator: "IRDAI",
    title: "IRDAI updates governance requirements for insurers",
    date: "20 Sep 2025",
    description: "Updated governance expectations for insurance providers.",
    subject: "Insurance governance requirements",
    keywords: "insurance governance risk",
    image: "/Banners-Banking, Financial Services & Insurance .png",
    href: "/insights/legal-updates",
  },
  {
    regulator: "PFRDA",
    title: "PFRDA issues revised guidance for pension intermediaries",
    date: "18 Sep 2025",
    description: "Clarifications on conduct, oversight and reporting.",
    subject: "Pension intermediary guidance",
    keywords: "pension retirement reporting",
    image: "/Part-13 .png",
    href: "/insights/legal-updates",
  },
  {
    regulator: "CERC",
    title: "CERC revises market and grid connectivity procedures",
    date: "15 Sep 2025",
    description: "Changes to support transparent power market operations.",
    subject: "Power market procedures",
    keywords: "energy power electricity market",
    image: "/Banner-Energy, Power & Renewables .png",
    href: "/insights/legal-updates",
  },
] as const;

const circulars = [
  {
    date: "06 Oct 2025",
    regulator: "RBI",
    reference: "RBI/2025-26/123",
    subject: "Digital Lending Guidelines for NBFCs",
    impact: "NBFC / FinTech",
    keywords: "digital lending borrower protection",
  },
  {
    date: "04 Oct 2025",
    regulator: "MCA",
    reference: "G.S.R. 658(E)",
    subject: "Revised Forms under Companies Act",
    impact: "Corporate Compliance",
    keywords: "company filing forms",
  },
  {
    date: "02 Oct 2025",
    regulator: "SEBI",
    reference: "SEBI/LAD-NRO/GN/2025",
    subject: "Enhanced Disclosure for Listed Entities",
    impact: "Capital Markets",
    keywords: "securities listed",
  },
  {
    date: "30 Sep 2025",
    regulator: "IFSCA",
    reference: "IFSCA/IL/2025/12",
    subject: "Fund Management Regulations",
    impact: "GIFT City / Global Funds",
    keywords: "fund manager investment",
  },
  {
    date: "28 Sep 2025",
    regulator: "RBI (FEMA)",
    reference: "A.P. (DIR Series)",
    subject: "Revised ODI Reporting Requirements",
    impact: "Overseas Investment",
    keywords: "FEMA foreign exchange overseas investment",
  },
] as const;

const themes = [
  ["building", "Financial Services & NBFC Regulation"],
  ["scale", "Corporate & Company Law"],
  ["chart", "Securities Market & Capital Markets"],
  ["globe", "Cross-Border & IFSCA"],
  ["plane", "Foreign Exchange & FEMA"],
  ["percent", "Taxation & GST"],
  ["shield", "Insurance, PFRDA & IRDAI"],
  ["network", "Sectoral Regulators (CERC, TRAI, etc.)"],
] as const;

const resources = [
  {
    icon: "file",
    title: "Regulatory Guides",
    description: "Practical guides on key regulations and compliance requirements.",
    cta: "Explore Guides",
    href: "/resources",
  },
  {
    icon: "calendar",
    title: "Compliance Checklists",
    description: "Ready-to-use checklists for businesses.",
    cta: "View Checklists",
    href: "/resources",
  },
  {
    icon: "network",
    title: "Research & Reports",
    description: "In-depth research and regulatory reports.",
    cta: "View Reports",
    href: "/knowledge-centre",
  },
  {
    icon: "bulb",
    title: "FAQs & Explainers",
    description: "Plain-language answers to common regulatory questions.",
    cta: "Browse FAQs",
    href: "/faqs",
  },
] as const;

const conversations = [
  {
    title: "India’s Regulatory Outlook 2025",
    date: "12 Sep 2025",
    duration: "28 min",
    image: "/corporate-regulatory-hero.png",
  },
  {
    title: "RBI’s Regulatory Priorities for NBFCs and FinTechs",
    date: "05 Sep 2025",
    duration: "32 min",
    image: "/Banking & Financial Services1 .png",
  },
  {
    title: "Opportunities in GIFT City for Global Investors",
    date: "28 Aug 2025",
    duration: "26 min",
    image: "/images/services/cross-border-and-international-business-support.webp",
  },
  {
    title: "FEMA Developments and Cross-Border Structuring",
    date: "20 Aug 2025",
    duration: "24 min",
    image: "/images/services/fema-fdi-and-foreign-exchange-advisory.webp",
  },
] as const;

const testimonials = [
  {
    quote:
      "Astronis Global has been a trusted partner in our regulatory compliance journey. Their insights are practical, timely and business-focused.",
    company: "Manufacturing Company (India)",
  },
  {
    quote:
      "Clear and concise analysis on regulatory updates. The team's support on our compliance process was extremely valuable.",
    company: "FinTech Company (India)",
  },
  {
    quote:
      "Their regulatory updates help us stay ahead of changes. A highly responsive and professional team with deep domain knowledge.",
    company: "Renewable Energy Developer",
  },
] as const;

function SectionHeading({
  title,
  href,
  action,
}: {
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <h2>{title}</h2>
      {href && action && (
        <Link href={href}>
          {action} <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}

function matchesRegulator(itemRegulator: string, selectedRegulator: string) {
  if (selectedRegulator === "All") return true;
  return itemRegulator.split(/[(),/ ]+/).includes(selectedRegulator);
}

export default function BusinessUpdates() {
  const [query, setQuery] = useState("");
  const [selectedRegulator, setSelectedRegulator] = useState("All");
  const [showMoreRegulators, setShowMoreRegulators] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredUpdates = useMemo(
    () =>
      updates.filter((item) => {
        const searchable = [
          item.title,
          item.regulator,
          item.subject,
          item.description,
          item.keywords,
          item.date,
        ]
          .join(" ")
          .toLowerCase();
        return (
          matchesRegulator(item.regulator, selectedRegulator) &&
          (!normalizedQuery || searchable.includes(normalizedQuery))
        );
      }),
    [normalizedQuery, selectedRegulator],
  );
  const filteredCirculars = useMemo(
    () =>
      circulars.filter((item) => {
        const searchable = [
          item.date,
          item.regulator,
          item.reference,
          item.subject,
          item.impact,
          item.keywords,
        ]
          .join(" ")
          .toLowerCase();
        return (
          matchesRegulator(item.regulator, selectedRegulator) &&
          (!normalizedQuery || searchable.includes(normalizedQuery))
        );
      }),
    [normalizedQuery, selectedRegulator],
  );

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubscribeStatus("");

    try {
      const response = await fetch("/api/insights-subscribe", {
        method: "POST",
        body: new FormData(form),
      });
      const result: { message?: string } = await response.json();
      setSubscribeStatus(
        result.message ||
          (response.ok
            ? "Thank you for subscribing."
            : "We could not process your subscription request."),
      );
      if (response.ok) form.reset();
    } catch {
      setSubscribeStatus("We could not send your request. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  const visibleUpdates =
    selectedRegulator === "All" && !normalizedQuery
      ? filteredUpdates.slice(0, 6)
      : filteredUpdates;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <AssetImage
          src="/corporate-regulatory-hero.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/insights-events">Insights &amp; Resources</Link>
            <span>›</span>
            <span>Business Updates</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Insights &amp; Resources</span>
            <h1>Regulatory Updates</h1>
            <h2>Stay informed. Stay compliant. Stay ahead.</h2>
            <p>
              Timely updates on laws, regulations, circulars, notifications and policy
              developments from key regulators in India and globally, with practical
              analysis and business impact.
            </p>
            <div className={styles.heroActions}>
              <Link href="#latest-updates">
                Browse Latest Updates <Icon name="arrow" />
              </Link>
              <Link href="#knowledge-centre">
                Explore Knowledge Centre <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className={styles.regulatorShowcase} aria-label="Featured regulators">
            {[
              ["building", "RBI"],
              ["document", "MCA"],
              ["chart", "SEBI"],
              ["globe", "IFSCA"],
              ["plane", "FEMA"],
              ["percent", "GST"],
              ["scale", "Other Regulators"],
            ].map(([icon, name]) => (
              <span key={name}>
                <Icon name={icon} />
                <strong>{name}</strong>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.searchPanel}>
          <label className={styles.searchBox}>
            <span className={styles.srOnly}>Search regulatory updates</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search regulatory updates, notifications, circulars or topics..."
            />
            <Icon name="search" />
          </label>
          <div className={styles.regulatorFilters}>
            <strong>Filter by Regulator:</strong>
            <div>
              {regulators.map((regulator) => (
                <button
                  type="button"
                  key={regulator}
                  aria-pressed={selectedRegulator === regulator}
                  className={selectedRegulator === regulator ? styles.activeFilter : ""}
                  onClick={() => setSelectedRegulator(regulator)}
                >
                  {regulator}
                </button>
              ))}
              {showMoreRegulators &&
                additionalRegulators.map((regulator) => (
                  <button
                    type="button"
                    key={regulator}
                    aria-pressed={selectedRegulator === regulator}
                    className={selectedRegulator === regulator ? styles.activeFilter : ""}
                    onClick={() => setSelectedRegulator(regulator)}
                  >
                    {regulator}
                  </button>
                ))}
              <button
                type="button"
                aria-expanded={showMoreRegulators}
                onClick={() => setShowMoreRegulators((visible) => !visible)}
              >
                {showMoreRegulators ? "Less" : "More"} <Icon name="chevron" />
              </button>
            </div>
          </div>
        </div>

        <section className={`${styles.section} ${styles.shaded}`} id="latest-updates">
          <SectionHeading
            title="Latest Regulatory Updates"
            href="/insights/legal-updates"
            action="View All Updates"
          />
          <div className={styles.updateGrid}>
            {visibleUpdates.map((item) => (
              <article className={styles.updateCard} key={`${item.regulator}-${item.title}`}>
                <Link href={item.href} className={styles.updateImage}>
                  <AssetImage src={item.image} alt="" fill sizes="(max-width: 700px) 90vw, 17vw" />
                  <span className={styles.regulatorBadge}>{item.regulator}</span>
                </Link>
                <div className={styles.updateBody}>
                  <h3>{item.title}</h3>
                  <span className={styles.updateDate}>
                    <Icon name="calendar" /> {item.date}
                  </span>
                  <p>{item.description}</p>
                  <Link href={item.href} className={styles.readLink}>
                    Read Update <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            ))}
            {visibleUpdates.length === 0 && (
              <p className={styles.emptyState}>
                No regulatory updates match your search or selected regulator.
              </p>
            )}
          </div>
        </section>

        <section className={styles.section} id="insights-analysis">
          <SectionHeading
            title="Regulatory Insights & Analysis"
            href="/insights"
            action="View All Insights"
          />
          <article className={styles.featuredAnalysis}>
            <AssetImage
              src="/Banking & Financial Services1 .png"
              alt="Financial district and regulatory institutions"
              fill
              sizes="100vw"
            />
            <div className={styles.featuredShade} />
            <div className={styles.featuredBody}>
              <span className={styles.featuredBadge}>FEATURED ANALYSIS</span>
              <h3>RBI’s Scale-Based Regulation for NBFCs: Implications for Growth and Compliance</h3>
              <p>
                A detailed analysis of RBI’s four-layer regulatory framework and its
                impact on NBFCs, FinTechs and financial services businesses.
              </p>
              <div className={styles.featuredMeta}>
                <span><Icon name="calendar" /> 12 Sep 2025</span>
                <span><Icon name="clock" /> 8 min read</span>
                <span><Icon name="person" /> Astronis Global Editorial Team</span>
              </div>
              <Link href="/insights/rbi-circulars" className={styles.featuredLink}>
                Read Full Analysis <Icon name="arrow" />
              </Link>
            </div>
          </article>
        </section>

        <section className={`${styles.section} ${styles.shaded}`} id="regulatory-themes">
          <SectionHeading title="Key Regulatory Themes" href="#regulatory-themes" action="View All" />
          <div className={styles.themeGrid}>
            {themes.map(([icon, title]) => (
              <Link
                href="/insights/legal-updates"
                className={styles.themeCard}
                key={title}
              >
                <Icon name={icon} />
                <span>{title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.circularSection}`}>
          <SectionHeading
            title="Recent Circulars, Notifications & Guidelines"
            href="/insights/legal-updates"
            action="View All"
          />
          <div className={styles.tableScroller}>
            <table className={styles.circularTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Regulator</th>
                  <th>Reference No.</th>
                  <th>Title / Subject</th>
                  <th>Impact Area</th>
                </tr>
              </thead>
              <tbody>
                {filteredCirculars.map((item) => (
                  <tr key={`${item.date}-${item.reference}`}>
                    <td>{item.date}</td>
                    <td>{item.regulator}</td>
                    <td>{item.reference}</td>
                    <td>{item.subject}</td>
                    <td>{item.impact}</td>
                  </tr>
                ))}
                {filteredCirculars.length === 0 && (
                  <tr>
                    <td colSpan={5}>No circulars match your search or selected regulator.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded} ${styles.quickLinksSection}`}>
          <SectionHeading title="Quick Links" />
          <div className={styles.quickLinkGrid}>
            {[
              ["calendar", "Regulatory Compliance Calendar", "/insights/compliance-calendar"],
              ["people", "Important Regulatory Contacts", "/contact"],
              ["chart", "Sector-wise Regulatory Matrix", "/industries"],
              ["file", "Downloadable Compliance Checklists", "/resources"],
            ].map(([icon, title, href]) => (
              <Link href={href} key={title} className={styles.quickLink}>
                <Icon name={icon} />
                <span>{title}</span>
                <Icon name="arrow" />
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded}`} id="knowledge-centre">
          <SectionHeading title="Knowledge Centre" href="/resources" action="View All Resources" />
          <div className={styles.resourceGrid}>
            {resources.map((resource) => (
              <Link
                href={resource.href}
                className={styles.resourceCard}
                key={resource.title}
              >
                <span className={styles.resourceIcon}><Icon name={resource.icon} /></span>
                <span className={styles.resourceBody}>
                  <strong>{resource.title}</strong>
                  <span>{resource.description}</span>
                  <em>{resource.cta} <Icon name="arrow" /></em>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="conversation">
          <SectionHeading
            title="ASTRONIS IN CONVERSATION"
            href="/media"
            action="View All Episodes"
          />
          <div className={styles.conversationGrid}>
            {conversations.map((video) => (
              <article className={styles.episodeCard} key={video.title}>
                <div className={styles.episodeImage}>
                  <AssetImage src={video.image} alt="" fill sizes="(max-width: 700px) 90vw, 17vw" />
                  <button
                    type="button"
                    className={styles.playButton}
                    aria-label={`${video.title}: video preview unavailable`}
                    title="Video preview unavailable"
                    disabled
                  >
                    <Icon name="play" />
                  </button>
                </div>
                <div className={styles.episodeBody}>
                  <strong>{video.title}</strong>
                  <span>
                    <Icon name="calendar" /> {video.date}
                    <i />
                    <Icon name="clock" /> {video.duration}
                  </span>
                </div>
              </article>
            ))}
            <aside className={styles.promoPanel}>
              <span>Conversations with</span>
              <strong>Industry Experts, Regulators and Thought Leaders.</strong>
              <Link href="/media">
                Explore All Episodes <Icon name="arrow" />
              </Link>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
          <SectionHeading
            title="Client Testimonials"
            href="/testimonials"
            action="View All Testimonials"
          />
          <InsightsTestimonials items={testimonials} />
        </section>
      </div>

      <section className={styles.newsletter}>
        <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
        <div className={styles.newsletterShade} />
        <div className={styles.newsletterInner}>
          <div>
            <h2>Stay Ahead of Regulatory Change</h2>
            <p>
              Get the latest regulatory updates, insights and expert analysis from
              Astronis Global.
            </p>
          </div>
          <form onSubmit={subscribe}>
            <div className={styles.subscribeFields}>
              <label className={styles.srOnly} htmlFor="business-updates-email">
                Email address
              </label>
              <input
                id="business-updates-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                maxLength={180}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" />
              </button>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" value="yes" required />
              I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link>
            </label>
            <EmailOtpVerification />
            {subscribeStatus && <p role="status">{subscribeStatus}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
