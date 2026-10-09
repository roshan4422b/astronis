"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import { testimonials as allTestimonials } from "@/content/testimonials";
import { featuredCaseStudies } from "@/content/featured-case-studies";
import styles from "./case-studies-page.module.css";

const practiceAreas = [
  {
    title: "Corporate & Commercial",
    icon: "building",
    image: "/images/services/corporate-and-commercial-advisory.webp",
    terms: "corporate commercial mergers acquisitions contracts",
    href: "/services/corporate-advisory",
  },
  {
    title: "Litigation & Dispute Resolution",
    icon: "scale",
    image: "/images/services/litigation-and-dispute-resolution.webp",
    terms: "litigation dispute resolution court arbitration",
    href: "/services/litigation-dispute-resolution",
  },
  {
    title: "Regulatory & Compliance",
    icon: "shield",
    image: "/images/services/regulatory-and-compliance.webp",
    terms: "regulatory compliance RBI tax",
    href: "/services/regulatory-and-compliance",
  },
  {
    title: "Arbitration & Conciliation",
    icon: "handshake",
    image: "/images/services/arbitration-and-conciliation.webp",
    terms: "arbitration conciliation litigation dispute",
    href: "/services/arbitration-and-conciliation",
  },
  {
    title: "MSME & Business Advisory",
    icon: "chart",
    image: "/images/services/msme-advisory-and-disputes.webp",
    terms: "MSME business advisory delayed payments",
    href: "/services/business-advisory-consulting",
  },
  {
    title: "Banking, Finance & NBFC",
    icon: "database",
    image: "/images/services/banking-nbfc-and-financial-services-advisory.webp",
    terms: "banking finance NBFC RBI regulatory",
    href: "/services/banking-nbfc-and-financial-services-advisory",
  },
  {
    title: "Real Estate & RERA",
    icon: "building",
    image: "/images/services/rera-and-real-estate-advisory.webp",
    terms: "real estate RERA construction property",
    href: "/services/rera-and-real-estate-advisory",
  },
  {
    title: "IPR & Technology",
    icon: "cpu",
    image: "/images/services/intellectual-property-rights.webp",
    terms: "IPR intellectual property technology trademarks",
    href: "/services/intellectual-property",
  },
] as const;

const popularFilters = [
  "Corporate",
  "Regulatory",
  "Litigation",
  "Arbitration",
  "MSME",
  "Tax",
] as const;

const additionalFilters = [
  "Banking",
  "Real Estate",
  "IPR",
  "Technology",
] as const;

const industries = [
  ["Manufacturing", "/Manufacturing & Industrial .png"],
  ["Financial Services", "/Banking & Financial Services .png"],
  ["Real Estate & Construction", "/Real Estate & Construction .png"],
  ["Healthcare & Pharma", "/Healthcare & Pharmaceuticals .png"],
  ["E-commerce & Technology", "/Retail & E-Commerce .png"],
  ["Infrastructure & Energy", "/Infrastructure & Projects .png"],
] as const;

const resources = [
  {
    icon: "file",
    title: "Case Study Library",
    description: "Detailed case studies and success stories.",
    action: "Explore Library",
    href: "/success-stories",
  },
  {
    icon: "bulb",
    title: "Insights & Analysis",
    description: "Expert opinions on key legal and regulatory matters.",
    action: "Read Insights",
    href: "/insights-events",
  },
  {
    icon: "calendar",
    title: "Events & Webinars",
    description: "Watch recorded sessions and expert discussions.",
    action: "View Events",
    href: "/media",
  },
  {
    icon: "help",
    title: "FAQs & Guides",
    description: "Practical guidance on common legal and business queries.",
    action: "Browse FAQs",
    href: "/faqs",
  },
] as const;

const episodes = [
  {
    title: "Manageability: Scaling a Manufacturing Business",
    date: "12 Sep 2025",
    views: "1.2K views",
    duration: "28:15",
    image: "/images/services/business-advisory-and-consulting.webp",
  },
  {
    title: "Navigating RBI Regulations for NBFCs",
    date: "05 Sep 2025",
    views: "980 views",
    duration: "32:40",
    image: "/images/services/banking-nbfc-and-financial-services-advisory.webp",
  },
  {
    title: "MSME Growth: Opportunities and Legal Support",
    date: "28 Aug 2025",
    views: "760 views",
    duration: "26:18",
    image: "/images/services/msme-advisory-and-disputes.webp",
  },
  {
    title: "Dispute Resolution in Commercial Contracts",
    date: "20 Aug 2025",
    views: "690 views",
    duration: "24:10",
    image: "/images/services/arbitration-and-conciliation.webp",
  },
] as const;

const approvedTestimonials = allTestimonials.filter(
  (testimonial) =>
    testimonial.publicationConsent && testimonial.status === "approved",
);

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
      <Link href={href}>
        {action} <Icon name="arrow" />
      </Link>
    </div>
  );
}

export default function CaseStudiesPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visiblePracticeAreas = useMemo(
    () =>
      practiceAreas.filter((area) => {
        const searchable = `${area.title} ${area.terms}`.toLocaleLowerCase();
        return (
          (!normalizedQuery || searchable.includes(normalizedQuery)) &&
          (!activeFilter ||
            searchable.includes(activeFilter.toLocaleLowerCase()))
        );
      }),
    [activeFilter, normalizedQuery],
  );

  const visibleCaseStudies = useMemo(
    () =>
      featuredCaseStudies.filter((study) => {
        const searchable =
          `${study.category} ${study.title} ${study.description} ${study.practice} ${study.searchTerms}`.toLocaleLowerCase();
        return (
          (!normalizedQuery || searchable.includes(normalizedQuery)) &&
          (!activeFilter ||
            searchable.includes(activeFilter.toLocaleLowerCase()))
        );
      }),
    [activeFilter, normalizedQuery],
  );

  function toggleFilter(filter: string) {
    setActiveFilter((current) =>
      current.toLocaleLowerCase() === filter.toLocaleLowerCase() ? "" : filter,
    );
  }

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setEmailStatus("");
    try {
      const response = await fetch("/api/insights-subscribe", {
        method: "POST",
        body: new FormData(form),
      });
      const result: { message?: string } = await response.json();
      setEmailStatus(
        result.message || "We could not process your request. Please try again.",
      );
      if (response.ok) form.reset();
    } catch {
      setEmailStatus(
        "We could not send your request. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <AssetImage
          src="/legal-professionals-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/insights-events">Insights &amp; Resources</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Case Studies &amp; Success Story</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1>
              Case Studies &amp;
              <br />
              Success Story
            </h1>
            <h2>Real Challenges. Practical Solutions. Measurable Impact.</h2>
            <p>
              Explore how Astronis Global has helped businesses, institutions
              and individuals navigate complex legal and regulatory challenges
              to achieve successful outcomes.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#featured-case-studies">
                Explore Case Studies <Icon name="arrow" />
              </a>
              <Link className={styles.secondaryButton} href="/contact">
                Submit Your Success Story <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.searchPanel} aria-label="Search and filter">
          <label className={styles.searchBox}>
            <span className={styles.srOnly}>
              Search case studies by practice area, industry, challenge or
              keyword
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search case studies by practice area, industry, challenge or keyword..."
            />
            <Icon name="search" />
          </label>
          <div className={styles.popularFilters}>
            <strong>Popular Filters:</strong>
            <div>
              {popularFilters.map((filter) => (
                <button
                  className={activeFilter === filter ? styles.activeFilter : ""}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </button>
              ))}
              <button
                type="button"
                aria-expanded={showMoreFilters}
                onClick={() => setShowMoreFilters((visible) => !visible)}
              >
                More <Icon name="chevron" />
              </button>
              {showMoreFilters &&
                additionalFilters.map((filter) => (
                  <button
                    className={
                      activeFilter === filter ? styles.activeFilter : ""
                    }
                    type="button"
                    aria-pressed={activeFilter === filter}
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              {(query || activeFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("");
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        <section className={styles.section} id="practice-areas">
          <SectionHeading
            title="Explore Case Studies by Practice Area"
            href="/services"
            action="View All Practice Areas"
          />
          <div className={styles.practiceGrid}>
            {visiblePracticeAreas.map((area) => (
              <Link
                className={styles.practiceCard}
                href={area.href}
                key={area.title}
              >
                <span className={styles.practiceImage}>
                  <AssetImage src={area.image} alt="" fill sizes="14vw" />
                </span>
                <span className={styles.practiceIcon}>
                  <Icon name={area.icon} />
                </span>
                <strong>{area.title}</strong>
              </Link>
            ))}
            {visiblePracticeAreas.length === 0 && (
              <p className={styles.emptyState}>
                No practice areas match your search or filter.
              </p>
            )}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.shaded}`}
          id="featured-case-studies"
        >
          <SectionHeading
            title="Featured Case Studies"
            href="/success-stories"
            action="View All Case Studies"
          />
          <div className={styles.featuredGrid}>
            {visibleCaseStudies.map((study) => (
              <article className={styles.featuredCard} key={study.slug}>
                <Link
                  className={styles.featuredImage}
                  href={`/success-stories/${study.slug}`}
                  aria-label={`Read ${study.title}`}
                >
                  <AssetImage src={study.image} alt="" fill sizes="25vw" />
                </Link>
                <div className={styles.featuredBody}>
                  <span className={styles.badge}>{study.category}</span>
                  <h3>{study.title}</h3>
                  <p>{study.description}</p>
                  <Link
                    className={styles.readLink}
                    href={`/success-stories/${study.slug}`}
                  >
                    Read Full Story <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            ))}
            {visibleCaseStudies.length === 0 && (
              <p className={styles.emptyState}>
                No case studies match your search or filter. Try another
                keyword or clear your filters.
              </p>
            )}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="impact-heading">
          <h2 className={styles.impactTitle} id="impact-heading">
            Our Impact in Numbers
          </h2>
          <div className={styles.impactStrip}>
            {[
              ["trophy", "1000+", "Advisory Assignments"],
              ["people", "11+", "Years Experience"],
              ["building", "Pan India", "Presence"],
              ["globe", "Global", "Advisory Network"],
              ["file", "High", "Client Satisfaction"],
            ].map(([icon, value, label]) => (
              <div className={styles.impactItem} key={label}>
                <Icon name={icon} />
                <span>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded}`}>
          <SectionHeading
            title="Success Stories"
            href="/success-stories"
            action="View All Success Stories"
          />
          <div className={styles.storyGrid}>
            {[
              {
                category: "START-UP & TECHNOLOGY",
                title: "From Idea to Funded Enterprise",
                description:
                  "“Astronis Global provided end-to-end legal and regulatory support for our start-up. Their practical guidance and responsiveness helped us raise funds and scale confidently.”",
                author: "Founder, Technology Start-up",
                image: "/Startups & Emerging Businesses .png",
              },
              {
                category: "REAL ESTATE & RERA",
                title: "Resolution of Project Delays",
                description:
                  "“The team’s in-depth knowledge of RERA and real estate laws helped us resolve a complex project delay issue and protect our investment.”",
                author: "Real Estate Developer",
                image: "/Real Estate & Construction .png",
              },
              {
                category: "BANKING & FINANCIAL SERVICES",
                title: "Regulatory Clarity for New Product",
                description:
                  "“Astronis Global helped us navigate RBI regulations for a new financial product with clear, actionable advice and timely support.”",
                author: "NBFC, Financial Services",
                image: "/Banking & Financial Services .png",
              },
            ].map((story) => (
              <article className={styles.storyCard} key={story.title}>
                <span className={styles.storyImage}>
                  <AssetImage src={story.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
                </span>
                <div className={styles.storyCopy}>
                  <span className={styles.badge}>{story.category}</span>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <strong>– {story.author}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading
            title="Success Stories by Industry"
            href="/industries"
            action="View All Industries"
          />
          <div className={styles.industryGrid}>
            {industries.map(([title, image]) => (
              <Link
                className={styles.industryCard}
                href="/industries"
                key={title}
              >
                <AssetImage src={image} alt="" fill sizes="16vw" />
                <span>{title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shaded}`}>
          <SectionHeading
            title="Knowledge Centre"
            href="/knowledge-centre"
            action="View All Resources"
          />
          <div className={styles.resourceGrid}>
            {resources.map((resource) => (
              <Link
                className={styles.resourceCard}
                href={resource.href}
                key={resource.title}
              >
                <Icon name={resource.icon} />
                <span>
                  <strong>{resource.title}</strong>
                  <small>{resource.description}</small>
                  <em>
                    {resource.action} <Icon name="arrow" />
                  </em>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading
            title="ASTRONIS IN CONVERSATION"
            href="/media"
            action="View All Episodes"
            subtitle="Watch. Listen. Discover."
          />
          <div className={styles.conversationGrid}>
            {episodes.map((episode) => (
              <article className={styles.episodeCard} key={episode.title}>
                <Link
                  className={styles.episodeImage}
                  href="/media"
                  aria-label={`Watch ${episode.title}`}
                >
                  <AssetImage src={episode.image} alt="" fill sizes="20vw" />
                  <span className={styles.playButton}>
                    <Icon name="play" />
                  </span>
                  <small>{episode.duration}</small>
                </Link>
                <div className={styles.episodeBody}>
                  <strong>{episode.title}</strong>
                  <span>
                    <Icon name="calendar" />
                    {episode.date}
                    <i />
                    <Icon name="play" />
                    {episode.views}
                  </span>
                </div>
              </article>
            ))}
            <aside className={styles.promoPanel}>
              <span>Conversations with</span>
              <strong>
                Industry Experts,
                <br />
                Business Leaders
                <br />
                and Policy Makers.
              </strong>
              <Link href="/media">
                Explore All Episodes <Icon name="arrow" />
              </Link>
            </aside>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.shaded} ${styles.testimonials}`}
        >
          <SectionHeading
            title="Client Testimonials"
            href="/testimonials"
            action="View All Testimonials"
          />
          <InsightsTestimonials
            items={approvedTestimonials.slice(0, 3).flatMap((testimonial) =>
              testimonial.quote
                ? [{
                    quote: testimonial.quote,
                    company: testimonial.name,
                    designation: [testimonial.designation, testimonial.company]
                      .filter(Boolean)
                      .join(" · "),
                    rating: testimonial.rating,
                  }]
                : [],
            )}
          />
        </section>
      </div>

      <section className={styles.subscribe}>
        <AssetImage
          src="/corporate-regulatory-hero.png"
          alt=""
          fill
          sizes="100vw"
        />
        <div className={styles.subscribeShade} />
        <div className={styles.subscribeInner}>
          <div>
            <h2>Real Outcomes. Lasting Partnerships.</h2>
            <p>
              Discover how Astronis Global turns complex challenges into
              meaningful success stories.
            </p>
          </div>
          <form onSubmit={subscribe}>
            <div className={styles.emailRow}>
              <label className={styles.srOnly} htmlFor="story-subscribe-email">
                Enter your email address
              </label>
              <input
                id="story-subscribe-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                required
                maxLength={180}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Subscribe"}
                <Icon name="arrow" />
              </button>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" value="yes" required />
              <span>
                I agree to receive updates.{" "}
                <Link href="/legal/privacy-policy">Privacy Policy</Link>
              </span>
            </label>
            {emailStatus && <p role="status">{emailStatus}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
