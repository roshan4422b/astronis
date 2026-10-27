"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import EmailOtpVerification from "@/app/_components/email-otp-verification";
import styles from "./legal-updates.module.css";

const popularSearches = [
  "Supreme Court",
  "NCLT",
  "NCLAT",
  "RBI",
  "SEBI",
  "GST",
  "FEMA",
  "Arbitration",
  "NI Act",
] as const;

const categories: {
  title: string;
  description: string;
  icon: string;
  image: string;
  tags: string[];
}[] = [
  {
    title: "Supreme Court Judgments",
    description: "Landmark rulings and legal principles.",
    icon: "scale",
    image: "/corporate-regulatory-hero.png",
    tags: ["Supreme Court Judgments"],
  },
  {
    title: "High Court Judgments",
    description: "Important decisions and implications.",
    icon: "building",
    image: "/legal-professionals-hero.png",
    tags: ["High Court Judgments"],
  },
  {
    title: "Tribunal Decisions (NCLT, NCLAT, DRT, etc.)",
    description: "Tribunal rulings and industry impact.",
    icon: "document",
    image: "/images/services/nclt-and-nclat-matters.webp",
    tags: ["Tribunal Decisions"],
  },
  {
    title: "Regulatory Changes",
    description: "New rules, notifications and circulars.",
    icon: "shield",
    image: "/images/services/regulatory-and-compliance.webp",
    tags: ["Regulatory Changes"],
  },
  {
    title: "Legislative Developments",
    description: "New laws and amendments.",
    icon: "file",
    image: "/governance-secretarial-hero.png",
    tags: ["Legislative Developments"],
  },
  {
    title: "Arbitration & Dispute Resolution",
    description: "Key arbitral and court decisions.",
    icon: "scale",
    image: "/images/services/arbitration-and-conciliation.webp",
    tags: ["Arbitration & Dispute Resolution"],
  },
  {
    title: "Sector-specific Legal Updates",
    description: "Energy, real estate, finance, technology etc.",
    icon: "chart",
    image: "/images/services/litigation-and-dispute-resolution.webp",
    tags: ["Sector-specific Legal Updates"],
  },
  {
    title: "Compliance Alerts",
    description: "Time-sensitive legal and regulatory updates.",
    icon: "calendar",
    image: "/Banking & Financial Services1 .png",
    tags: ["Compliance Alerts"],
  },
];

const latestUpdates = [
  {
    category: "DELHI HIGH COURT",
    date: "02 Oct 2025",
    title: "Order VII Rule 11 – Scope and Maintainability in Commercial Suits",
    readingTime: "4 min read",
    court: "Delhi High Court",
    tags: ["High Court Judgments", "Commercial", "Civil"],
    image: "/images/services/litigation-and-dispute-resolution.webp",
  },
  {
    category: "NCLAT",
    date: "28 Sep 2025",
    title: "Home Buyers' Rights in Insolvency Proceedings",
    readingTime: "6 min read",
    court: "NCLAT",
    tags: ["Tribunal Decisions", "Insolvency", "Company Law"],
    image: "/images/services/nclt-and-nclat-matters.webp",
  },
  {
    category: "ARBITRATION",
    date: "20 Sep 2025",
    title: "Post-Conciliation Arbitration without Section 8 – Key Principles",
    readingTime: "5 min read",
    court: "Arbitration",
    tags: ["Arbitration & Dispute Resolution", "Arbitration", "Commercial"],
    image: "/images/services/arbitration-and-conciliation.webp",
  },
  {
    category: "NI ACT",
    date: "12 Sep 2025",
    title: "Effect of Civil Decree on Section 138 Proceedings",
    readingTime: "4 min read",
    court: "NI Act",
    tags: ["High Court Judgments", "NI Act", "Civil", "Commercial"],
    image: "/images/services/corporate-and-commercial-advisory.webp",
  },
] as const;

const judgments = [
  {
    title: "Pashchimanchal Vidyut Vitran v. Raman Ispat",
    court: "Supreme Court",
    date: "15 May 2019",
    description: "Electricity dues, recovery and regulatory jurisdiction.",
    areas: ["Civil", "Commercial", "Regulatory"],
  },
  {
    title: "Sanjha Bij Bhandar v. Rakesh Bala",
    court: "Supreme Court",
    date: "2025",
    description: "Loan, property and commercial transactions.",
    areas: ["Civil", "Commercial"],
  },
  {
    title: "Recent Judgments on MSME and Arbitration",
    court: "Various Courts",
    date: "2025",
    description: "Latest rulings shaping MSME disputes and arbitration practice.",
    areas: ["Commercial", "Arbitration", "Company Law"],
  },
] as const;

const practiceAreas = [
  "Civil",
  "Commercial",
  "Company Law",
  "Insolvency",
  "Arbitration",
  "NI Act",
  "Criminal",
  "Regulatory",
  "Constitutional",
] as const;

const regulatoryUpdates = [
  {
    date: "06 Oct 2025",
    regulator: "RBI",
    title: "RBI – New Guidelines on Digital Lending for NBFCs",
    keywords: "banking digital lending NBFC",
  },
  {
    date: "04 Oct 2025",
    regulator: "MCA",
    title: "MCA – Revised Forms and Filing Requirements",
    keywords: "company law filings",
  },
  {
    date: "02 Oct 2025",
    regulator: "SEBI",
    title: "SEBI – Enhanced Disclosure Requirements",
    keywords: "securities listed entities",
  },
  {
    date: "30 Sep 2025",
    regulator: "IFSCA",
    title: "IFSCA – Updated Fund Management Regulations",
    keywords: "fund management GIFT City",
  },
  {
    date: "28 Sep 2025",
    regulator: "GST",
    title: "GST – Rate Rationalisation in Selected Sectors",
    keywords: "tax taxation",
  },
] as const;

const regulatorFilters = ["All", "RBI", "MCA", "SEBI", "IFSCA", "FEMA", "GST"] as const;

const resources = [
  {
    icon: "file",
    title: "Guides & Toolkits",
    description: "Practical guides and step-by-step resources.",
    cta: "Explore Guides",
    href: "/resources/business-guides",
  },
  {
    icon: "calendar",
    title: "Compliance Calendar",
    description: "Important due dates and regulatory timelines.",
    cta: "View Calendar",
    href: "/insights/compliance-calendar",
  },
  {
    icon: "document",
    title: "Research & Reports",
    description: "In-depth research and legal publications.",
    cta: "View Reports",
    href: "/resources",
  },
  {
    icon: "bulb",
    title: "FAQs & Explainers",
    description: "Plain-language answers to key legal questions.",
    cta: "Browse FAQs",
    href: "/faqs",
  },
] as const;

const episodes = [
  {
    title: "Recent Legal Developments in Banking & NBFC Sector",
    date: "12 Sep 2025",
    duration: "28 min",
    image: "/Banking & Financial Services1 .png",
  },
  {
    title: "Arbitration Trends and Dispute Resolution in India",
    date: "05 Sep 2025",
    duration: "32 min",
    image: "/images/services/arbitration-and-conciliation.webp",
  },
  {
    title: "Regulatory Outlook 2025: RBI, SEBI and Beyond",
    date: "28 Aug 2025",
    duration: "26 min",
    image: "/images/services/regulatory-and-compliance.webp",
  },
  {
    title: "ESG, Compliance and Sustainable Growth",
    date: "20 Aug 2025",
    duration: "24 min",
    image: "/images/services/esg-and-sustainability-advisory.webp",
  },
] as const;

const testimonials = [
  {
    quote:
      "Astronis Global has been a trusted partner for our regulatory and compliance matters. Their insights are timely, well-researched and extremely practical.",
    company: "Manufacturing Company (India)",
  },
  {
    quote:
      "Clear and concise analysis on complex legal and regulatory issues. The team's support during critical transactions has been invaluable.",
    company: "FinTech Company (India)",
  },
  {
    quote:
      "Their regular legal updates help us stay ahead of regulatory changes. The advisory approach is solution-oriented and business-focused.",
    company: "Renewable Energy Developer",
  },
] as const;

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
      {href && action && (
        <Link href={href}>
          {action}
          <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}

function matchesSearch(values: readonly string[], query: string) {
  return !query || values.join(" ").toLowerCase().includes(query);
}

export default function LegalUpdates() {
  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activePractice, setActivePractice] = useState("");
  const [activeRegulator, setActiveRegulator] = useState<(typeof regulatorFilters)[number]>("All");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredLatest = useMemo(
    () =>
      latestUpdates.filter((item) => {
        const searchMatch = matchesSearch(
          [item.category, item.date, item.title, item.court, ...item.tags],
          normalizedQuery,
        );
        const categoryMatch = !activeCategory || item.tags.some((tag) => tag === activeCategory);
        return searchMatch && categoryMatch;
      }),
    [activeCategory, normalizedQuery],
  );

  const filteredJudgments = useMemo(
    () =>
      judgments.filter(
        (item) =>
          (!activePractice || item.areas.some((area) => area === activePractice)) &&
          matchesSearch([item.title, item.court, item.date, item.description, ...item.areas], normalizedQuery),
      ),
    [activePractice, normalizedQuery],
  );

  const filteredRegulatory = useMemo(
    () =>
      regulatoryUpdates.filter((item) => {
        const regulatorMatch = activeRegulator === "All" || item.regulator === activeRegulator;
        return regulatorMatch && matchesSearch([item.date, item.regulator, item.title, item.keywords], normalizedQuery);
      }),
    [activeRegulator, normalizedQuery],
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

  function chooseSearch(term: string) {
    setQuery(term);
    setActiveSearch(term);
    setActiveCategory("");
    setActivePractice("");
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <AssetImage src="/corporate-regulatory-hero.png" alt="" fill loading="eager" sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/insights">Insights &amp; Resources</Link>
            <span>›</span>
            <span aria-current="page">Legal Updates</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Insights &amp; Resources</span>
            <h1>Legal Updates</h1>
            <h2>Key Judgments and Regulatory Changes.</h2>
            <p>
              Stay updated with the latest judgments, legal developments and regulatory changes from the
              Supreme Court, High Courts, Tribunals and key regulators, with practical analysis and business impact.
            </p>
            <div className={styles.heroActions}>
              <Link href="#latest-updates">
                Explore Latest Legal Updates <Icon name="arrow" />
              </Link>
              <Link href="#knowledge-centre">
                Explore Knowledge Centre <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className={styles.heroCourtNote}>
            <Icon name="scale" />
            <span>Judgments, legislation &amp; regulatory intelligence</span>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.searchPanel} aria-label="Search legal updates">
          <label className={styles.searchBox}>
            <span className={styles.srOnly}>Search legal updates</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveSearch("");
              }}
              placeholder="Search judgments, laws, regulations, tribunals, topics or keywords..."
            />
            <Icon name="search" />
          </label>
          <div className={styles.popularSearches}>
            <strong>Popular searches:</strong>
            <div>
              {popularSearches.map((term) => (
                <button
                  type="button"
                  key={term}
                  aria-pressed={activeSearch === term}
                  className={activeSearch === term ? styles.activeChip : ""}
                  onClick={() => chooseSearch(activeSearch === term ? "" : term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.categoriesSection}`} id="categories">
          <SectionHeading
            title="Explore Legal Updates by Category"
            href="#categories"
            action="View All Categories"
          />
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <button
                className={`${styles.categoryCard} ${activeCategory === category.title ? styles.selectedCategory : ""}`}
                type="button"
                key={category.title}
                aria-pressed={activeCategory === category.title}
                onClick={() =>
                  setActiveCategory(activeCategory === category.title ? "" : category.title)
                }
              >
                <span className={styles.categoryImage}>
                  <AssetImage src={category.image} alt="" fill sizes="(max-width: 720px) 45vw, 12vw" />
                </span>
                <span className={styles.categoryIcon}><Icon name={category.icon} /></span>
                <span className={styles.categoryBody}>
                  <strong>{category.title}</strong>
                  <span>{category.description}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.featuredSection}`} id="latest-updates">
          <SectionHeading
            title="Latest Legal Updates"
            href="#latest-updates"
            action="View All Updates"
          />
          <article className={styles.featuredUpdate}>
            <AssetImage
              src="/images/services/litigation-and-dispute-resolution.webp"
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <div className={styles.featuredShade} />
            <div className={styles.featuredBody}>
              <span className={styles.featuredBadge}>SUPREME COURT</span>
              <h2>Surendra B. Jiwarajka v. Omkara ARC Pvt. Ltd.</h2>
              <strong>Supreme Court <i /> 15 May 2019</strong>
              <p>
                Important principles on recovery proceedings, rights of borrowers and the role of asset
                reconstruction companies.
              </p>
              <div className={styles.featuredMeta}>
                <span><Icon name="calendar" />15 May 2019</span>
                <span><Icon name="clock" />8 min read</span>
              </div>
              <Link href="/insights/legal-updates#judgments" className={styles.featuredLink}>
                Read Case Analysis <Icon name="arrow" />
              </Link>
            </div>
          </article>

          <div className={styles.latestPanel}>
            <div className={styles.latestGrid}>
              {filteredLatest.map((item) => (
                <article className={styles.latestCard} key={item.title}>
                  <Link href="/insights/legal-updates#latest-updates" className={styles.latestImage} aria-label={item.title}>
                    <AssetImage src={item.image} alt="" fill sizes="(max-width: 700px) 35vw, 12vw" />
                  </Link>
                  <div className={styles.latestBody}>
                    <div className={styles.latestMeta}>
                      <span>{item.category}</span>
                      <time>{item.date}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <div className={styles.latestFooter}>
                      <span>{item.readingTime}</span>
                      <Link
                        href="/insights/legal-updates#judgments"
                        aria-label={`Read ${item.title}`}
                        className={styles.roundArrow}
                      >
                        <Icon name="arrow" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
              {filteredLatest.length === 0 && (
                <p className={styles.emptyState}>No legal updates match your search or category.</p>
              )}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.judgmentsSection}`} id="judgments">
          <div className={styles.judgmentsPanel}>
            <SectionHeading title="Key Judgments by Practice Area" />
            <div className={styles.practiceFilters} aria-label="Filter judgments by practice area">
              {practiceAreas.map((area) => (
                <button
                  type="button"
                  key={area}
                  aria-pressed={activePractice === area}
                  className={activePractice === area ? styles.activeChip : ""}
                  onClick={() => setActivePractice(activePractice === area ? "" : area)}
                >
                  {area}
                </button>
              ))}
            </div>
            <div className={styles.judgmentGrid}>
              {filteredJudgments.map((item) => (
                <article className={styles.judgmentCard} key={item.title}>
                  <span><Icon name="scale" />{item.court}</span>
                  <h3>{item.title}</h3>
                  <time>{item.date}</time>
                  <p>{item.description}</p>
                  <Link href="/insights/legal-updates#judgments">Read Analysis <Icon name="arrow" /></Link>
                </article>
              ))}
              {filteredJudgments.length === 0 && (
                <p className={styles.emptyState}>No judgments match your search or practice area.</p>
              )}
            </div>
          </div>

          <div className={styles.developmentsPanel}>
            <SectionHeading
              title="Regulatory & Legislative Developments"
              href="#regulatory-developments"
              action="View All Updates"
            />
            <div className={styles.regulatorFilters} aria-label="Filter updates by regulator">
              {regulatorFilters.map((regulator) => (
                <button
                  type="button"
                  key={regulator}
                  aria-pressed={activeRegulator === regulator}
                  className={activeRegulator === regulator ? styles.activeChip : ""}
                  onClick={() => setActiveRegulator(regulator)}
                >
                  {regulator}
                </button>
              ))}
            </div>
            <div className={styles.developmentTableWrap} id="regulatory-developments">
              <table className={styles.developmentTable}>
                <thead>
                  <tr><th>Date</th><th>Regulator</th><th>Update</th></tr>
                </thead>
                <tbody>
                  {filteredRegulatory.map((item) => (
                    <tr key={item.title}>
                      <td>{item.date}</td>
                      <td><span className={styles.regulatorBadge}>{item.regulator}</span></td>
                      <td><Link href="/insights/legal-updates#regulatory-developments">{item.title}</Link></td>
                    </tr>
                  ))}
                  {filteredRegulatory.length === 0 && (
                    <tr><td colSpan={3}>No developments match your search or regulator.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.resourcesSection}`} id="knowledge-centre">
          <SectionHeading title="Knowledge Centre" href="/resources" action="Explore All Resources" />
          <div className={styles.resourceGrid}>
            {resources.map((resource) => (
              <Link href={resource.href} className={styles.resourceCard} key={resource.title}>
                <span className={styles.resourceIcon}><Icon name={resource.icon} /></span>
                <span className={styles.resourceBody}>
                  <strong>{resource.title}</strong>
                  <span>{resource.description}</span>
                  <em>{resource.cta}<Icon name="arrow" /></em>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.conversationSection}`} id="conversation">
          <SectionHeading title="ASTRONIS IN CONVERSATION" subtitle="Watch. Listen. Discover." />
          <div className={styles.conversationGrid}>
            {episodes.map((episode) => (
              <article className={styles.episodeCard} key={episode.title}>
                <div className={styles.episodeImage}>
                  <AssetImage src={episode.image} alt="" fill sizes="(max-width: 700px) 45vw, 17vw" />
                  <span className={styles.playButton} aria-hidden="true"><Icon name="play" /></span>
                </div>
                <div className={styles.episodeBody}>
                  <strong>{episode.title}</strong>
                  <span><Icon name="calendar" />{episode.date}<i /><Icon name="clock" />{episode.duration}</span>
                </div>
              </article>
            ))}
            <aside className={styles.promoPanel}>
              <span>Conversations with</span>
              <strong>Industry Experts, Legal Professionals and Thought Leaders.</strong>
              <Link href="/media">Explore All Episodes <Icon name="arrow" /></Link>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.testimonialsSection}`} id="client-testimonials">
          <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
          <div className={styles.testimonialGrid}>
            {testimonials.map((item) => (
              <article className={styles.testimonialCard} key={item.company}>
                <span className={styles.quoteMark} aria-hidden="true">“</span>
                <span className={styles.avatar}><Icon name="person" /></span>
                <div className={styles.rating} role="img" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{item.quote}”</blockquote>
                <strong>{item.company}</strong>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.newsletter}>
        <AssetImage src="/images/uae-dubai-skyline.jpg" alt="" fill sizes="100vw" />
        <div className={styles.newsletterShade} />
        <div className={styles.newsletterInner}>
          <div>
            <span className={styles.newsletterEyebrow}>ASTRONIS GLOBAL</span>
            <h2>Stay Ahead of Legal &amp; Regulatory Change.</h2>
            <p>Get the latest judgments, regulatory updates and expert insights from Astronis Global.</p>
          </div>
          <form onSubmit={subscribe}>
            <div className={styles.subscribeFields}>
              <label className={styles.srOnly} htmlFor="legal-updates-email">Email address</label>
              <input
                id="legal-updates-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                maxLength={180}
              />
              <button type="submit" disabled={submitting || !captchaToken}>
                {submitting ? "Submitting…" : "Subscribe"} <Icon name="arrow" />
              </button>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" value="yes" required />
              I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link>
            </label>
            <EmailOtpVerification onCaptchaToken={setCaptchaToken} />
            {subscribeStatus && <p role="status">{subscribeStatus}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
