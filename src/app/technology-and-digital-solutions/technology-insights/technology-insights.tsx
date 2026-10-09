"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import TechnologyEnquiryForm from "@/components/forms/TechnologyEnquiryForm";
import styles from "./technology-insights.module.css";

type InsightItem = {
  date: string;
  title: string;
  description: string;
  image: string;
  href: string;
  topic: string;
  industry: string[];
  service: string;
  jurisdiction: string;
  contentType: "Article" | "Service Page";
};

const categories = [
  ["cpu", "AI & Automation"],
  ["shield", "RegTech & Compliance"],
  ["scale", "LegalTech"],
  ["cloud", "Cloud & Digital Infrastructure"],
  ["lock", "Cybersecurity & Data Protection"],
  ["database", "Data & Information Governance"],
  ["chart", "Digital Transformation"],
  ["gear", "Emerging Technologies"],
] as const;

const insightPages: InsightItem[] = [
  {
    date: "2026-09-12",
    title: "India’s Data Protection Regime – Key Developments to Watch",
    description: "Key data protection developments and what they mean for organisations managing personal information.",
    image: "/Technology&Digital/Banner- Technology Insights & Knowledge Hub .png",
    href: "/insights/articles",
    topic: "Data & Information Governance",
    industry: ["Banking & Financial Services", "Technology & E-Commerce", "Healthcare & Life Sciences"],
    service: "Cybersecurity & Data Protection",
    jurisdiction: "India",
    contentType: "Article",
  },
  {
    date: "2026-09-08",
    title: "RegTech 2.0 – From Compliance to Competitive Advantage",
    description: "How regulatory technology can strengthen compliance operations and support better business decisions.",
    image: "/Technology&Digital/Banner-RegTech & Compliance Technology. .png",
    href: "/insights/articles",
    topic: "RegTech & Compliance",
    industry: ["Banking & Financial Services", "Manufacturing"],
    service: "RegTech & Compliance Technology",
    jurisdiction: "India",
    contentType: "Article",
  },
  {
    date: "2026-09-02",
    title: "Cloud Adoption for Indian Businesses – Legal and Regulatory Considerations",
    description: "A practical overview of legal, regulatory and contractual considerations for cloud adoption.",
    image: "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png",
    href: "/insights/articles",
    topic: "Cloud & Digital Infrastructure",
    industry: ["Technology & E-Commerce", "Banking & Financial Services"],
    service: "Cloud & Collaboration Solutions",
    jurisdiction: "India",
    contentType: "Article",
  },
  {
    date: "",
    title: "Technology & Digital Solutions",
    description: "Explore Astronis technology services and digital solutions for businesses.",
    image: "/Technology&Digital/Banner-Technology & Digital.png",
    href: "/technology-and-digital-solutions",
    topic: "Emerging Technologies",
    industry: ["Technology & E-Commerce"],
    service: "Digital Business Solutions",
    jurisdiction: "Global",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "Client & Enterprise Portals",
    description: "Secure digital portals for client collaboration, document management and enterprise workflows.",
    image: "/Technology&Digital/Banner- Client & Enterprise Portals .png",
    href: "/technology-and-digital-solutions/client-enterprise-portals",
    topic: "Digital Transformation",
    industry: ["Banking & Financial Services", "Manufacturing", "Technology & E-Commerce"],
    service: "Digital Business Solutions",
    jurisdiction: "Global",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "Cloud & Collaboration Solutions",
    description: "Cloud and collaboration solutions to support connected, secure ways of working.",
    image: "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png",
    href: "/technology-and-digital-solutions/cloud-and-collaboration",
    topic: "Cloud & Digital Infrastructure",
    industry: ["Manufacturing", "Technology & E-Commerce"],
    service: "Cloud & Collaboration Solutions",
    jurisdiction: "Global",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "Cybersecurity Readiness",
    description: "Practical cybersecurity and data protection support to strengthen organisational readiness.",
    image: "/Technology&Digital/Banner- Cybersecurity & Data Protection .png",
    href: "/technology-and-digital-solutions/cybersecurity-data-protection/cybersecurity-readiness",
    topic: "Cybersecurity & Data Protection",
    industry: ["Banking & Financial Services", "Healthcare & Life Sciences", "Technology & E-Commerce"],
    service: "Cybersecurity & Data Protection",
    jurisdiction: "India",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "Data, AI & Automation",
    description: "Data and AI solutions to help businesses automate processes and make informed decisions.",
    image: "/Technology&Digital/Banner- Data, AI & Automation .png",
    href: "/technology-and-digital-solutions/data-ai-and-automation",
    topic: "AI & Automation",
    industry: ["Banking & Financial Services", "Manufacturing", "Healthcare & Life Sciences", "Technology & E-Commerce"],
    service: "Data, AI & Automation",
    jurisdiction: "Global",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "Digital Business Solutions",
    description: "Digital transformation and business process solutions designed around your organisation.",
    image: "/Technology&Digital/Banner- Technology Implementation & Transformation Approach .png",
    href: "/technology-and-digital-solutions/digital-business-solutions",
    topic: "Digital Transformation",
    industry: ["Manufacturing", "Technology & E-Commerce"],
    service: "Digital Business Solutions",
    jurisdiction: "Global",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "Legal Technology",
    description: "Technology-enabled legal workflows, document management and legal operations support.",
    image: "/Technology&Digital/Banner- Legal Technology .png",
    href: "/technology-and-digital-solutions/legal-technology",
    topic: "LegalTech",
    industry: ["Banking & Financial Services", "Manufacturing", "Technology & E-Commerce"],
    service: "Legal Technology",
    jurisdiction: "India",
    contentType: "Service Page",
  },
  {
    date: "",
    title: "RegTech & Compliance Technology",
    description: "Digital tools and advisory support for regulatory monitoring, compliance and governance.",
    image: "/Technology&Digital/Banner-RegTech & Compliance Technology. .png",
    href: "/technology-and-digital-solutions/regtech-and-compliance-technology",
    topic: "RegTech & Compliance",
    industry: ["Banking & Financial Services", "Manufacturing", "Healthcare & Life Sciences"],
    service: "RegTech & Compliance Technology",
    jurisdiction: "India",
    contentType: "Service Page",
  },
] as const;

const filters = [
  { label: "Topic", key: "topic", placeholder: "Select Topic", options: categories.map(([, title]) => title) },
  { label: "Industry", key: "industry", placeholder: "Select Industry", options: [...new Set(insightPages.flatMap((item) => item.industry))] },
  { label: "Service", key: "service", placeholder: "Select Service", options: [...new Set(insightPages.map((item) => item.service))] },
  { label: "Jurisdiction", key: "jurisdiction", placeholder: "Select Jurisdiction", options: [...new Set(insightPages.map((item) => item.jurisdiction))] },
  { label: "Content Type", key: "contentType", placeholder: "Select Type", options: [...new Set(insightPages.map((item) => item.contentType))] },
  { label: "Date", key: "date", placeholder: "Select Date Range", options: ["Last 30 Days", "Last 6 Months", "Last Year"] },
] as const;

type FilterValues = { topic: string; industry: string; service: string; jurisdiction: string; contentType: string; date: string };
const emptyFilters: FilterValues = { topic: "", industry: "", service: "", jurisdiction: "", contentType: "", date: "" };

const contentTypes = [
  {
    title: "Regulatory & Technology Updates",
    description: "Key legal, regulatory and policy developments impacting technology and digital business.",
    link: "Explore Updates",
    image: "/Technology&Digital/Banner-RegTech & Compliance Technology. .png",
    href: "/insights/legal-updates",
  },
  {
    title: "Research & White Papers",
    description: "In-depth research, thought leadership and white papers on emerging technology issues.",
    link: "View Publications",
    image: "/Technology&Digital/Banner- Technology Insights & Knowledge Hub .png",
    href: "/resources",
  },
  {
    title: "Practical Guides",
    description: "Actionable guides and checklists for businesses on technology adoption, compliance and risk management.",
    link: "View Guides",
    image: "/Technology&Digital/Banner- Technology Implementation & Transformation Approach .png",
    href: "/resources",
  },
  {
    title: "Technology Case Studies",
    description: "Real-world examples of how we help clients solve complex technology and regulatory challenges.",
    link: "View Case Studies",
    image: "/professional-collaboration-hero.png",
    href: "/success-stories",
  },
] as const;

const industries = [
  ["Banking & Financial Services", "/Banking & Financial Services .png", "/industries/financial-services"],
  ["Manufacturing", "/Manufacturing & Industrial .png", "/industries/manufacturing"],
  ["Healthcare & Life Sciences", "/Healthcare & Pharmaceuticals .png", "/industries/healthcare"],
  ["Technology & E-Commerce", "/Technology, IT & ITES .png", "/industries/it-and-ites"],
] as const;

const services = [
  ["RegTech & Compliance Technology", "/Technology&Digital/Banner-RegTech & Compliance Technology. .png", "/technology-and-digital-solutions/regtech-and-compliance-technology"],
  ["Legal Technology", "/Technology&Digital/Banner- Legal Technology .png", "/technology-and-digital-solutions/legal-technology"],
  ["Data, AI & Automation", "/Technology&Digital/Banner- Data, AI & Automation .png", "/technology-and-digital-solutions/data-ai-and-automation"],
  ["Cloud & Digital Infrastructure", "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png", "/technology-and-digital-solutions/cloud-and-collaboration"],
] as const;

const professionals = [
  {
    name: "Krishna Kumar Mishra",
    role: "Founder Partner",
    expertise: "Technology, Regulatory & Digital Advisory",
    image: "/Professionals/krishna_kumar_mishra.jpeg",
    href: "/professionals/krishna-kumar-mishra",
  },
  {
    name: "Priti Mishra",
    role: "Partner",
    expertise: "Digital Strategy & Compliance",
    image: "/Professionals/pritimishra.jpeg",
    href: "/professionals/priti-mishra",
  },
  {
    name: "Our Extended Team",
    role: "Lawyers | CS | CAs",
    expertise: "Technology & Industry Experts",
    image: "/professional-collaboration-hero.png",
    href: "/professionals",
  },
] as const;

const trending = [
  "AI and the Future of Legal Services in India",
  "Draft DPDP Rules – Key Compliance Takeaways",
  "Cybersecurity for MSMEs – A Practical Guide",
  "Global RegTech Trends and India’s Readiness",
  "Cloud Contracts – Key Legal Clauses to Negotiate",
] as const;

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.arrowLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

function ImageCard({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return <Link className={styles.imageCard} href={href}>
    <span className={styles.imageCardPhoto}><Image src={image} alt="" fill sizes="(max-width: 720px) 45vw, 13vw" /></span>
    <span className={styles.imageCardTitle}>{title}</span>
  </Link>;
}

export default function TechnologyInsights() {
  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [filterValues, setFilterValues] = useState<FilterValues>(emptyFilters);
  const [activeFilters, setActiveFilters] = useState<FilterValues>(emptyFilters);
  const hasActiveFilters = Boolean(activeSearch || Object.values(activeFilters).some(Boolean));
  const visibleInsights = useMemo(
    () => insightPages.filter((insight) => {
      const searchText = `${insight.title} ${insight.description} ${insight.topic} ${insight.industry.join(" ")} ${insight.service} ${insight.jurisdiction} ${insight.contentType}`.toLowerCase();
      const matchesSearch = searchText.includes(activeSearch.toLowerCase());
      const matchesTopic = !activeFilters.topic || insight.topic === activeFilters.topic;
      const matchesIndustry = !activeFilters.industry || insight.industry.includes(activeFilters.industry);
      const matchesService = !activeFilters.service || insight.service === activeFilters.service;
      const matchesJurisdiction = !activeFilters.jurisdiction || insight.jurisdiction === activeFilters.jurisdiction;
      const matchesContentType = !activeFilters.contentType || insight.contentType === activeFilters.contentType;
      const matchesDate = !activeFilters.date || (insight.date !== "" && (() => {
        const age = Date.now() - new Date(`${insight.date}T00:00:00`).getTime();
        const maxAge = activeFilters.date === "Last 30 Days" ? 30 : activeFilters.date === "Last 6 Months" ? 183 : 365;
        return age >= 0 && age <= maxAge * 24 * 60 * 60 * 1000;
      })());
      return matchesSearch && matchesTopic && matchesIndustry && matchesService && matchesJurisdiction && matchesContentType && matchesDate;
    }).filter((insight) => hasActiveFilters || insight.contentType === "Article").slice(0, hasActiveFilters ? undefined : 3),
    [activeFilters, activeSearch, hasActiveFilters],
  );

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setActiveSearch(String(form.get("search") || "").trim());
    setActiveFilters({
      topic: String(form.get("topic") || ""),
      industry: String(form.get("industry") || ""),
      service: String(form.get("service") || ""),
      jurisdiction: String(form.get("jurisdiction") || ""),
      contentType: String(form.get("contentType") || ""),
      date: String(form.get("date") || ""),
    });
  }

  function resetFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery("");
    setActiveSearch("");
    setFilterValues(emptyFilters);
    setActiveFilters(emptyFilters);
  }

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/Technology&Digital/Banner- Client & Enterprise Portals .png" alt="" fill priority sizes="100vw" />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/technology-and-digital-solutions">Technology &amp; Digital Solutions</Link><span>›</span><span>Technology Insights &amp; Knowledge Hub</span>
        </nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Technology Insights &amp; Knowledge Hub</span>
          <h1>Knowledge<br />for What’s Next.</h1>
          <p>Insights, analysis and practical perspectives<br className={styles.desktopBreak} /> at the intersection of law, regulation, business<br className={styles.desktopBreak} /> and technology.</p>
          <Link href="#latest" className={styles.primaryButton}>Explore Latest Insights <Icon name="arrow" /></Link>
        </div>
        <aside className={styles.heroAside}>Ideas.<br />Insights.<br />Perspectives.<br />Real impact.<i />Astronis<br />Global.</aside>
      </div>
    </section>

    <nav className={styles.categoryBar} aria-label="Technology insight topics">
      {categories.map(([icon, label]) => <a href="#latest" key={label} onClick={(event) => {
        event.preventDefault();
        setFilterValues((current) => ({ ...current, topic: label }));
        setActiveFilters((current) => ({ ...current, topic: label }));
        document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" });
      }}><Icon name={icon} /><span>{label}</span></a>)}
    </nav>

    <div className={styles.contentWrap}>
      <section className={styles.featuredLayout} id="latest">
        <div className={styles.featuredColumn}>
          <h2 className={styles.sectionTitle}>Featured Technology Insight</h2>
          <article className={styles.featuredCard}>
            <div className={styles.featuredImage}><Image src="/Technology&Digital/Banner- Client & Enterprise Portals .png" alt="Digital technology and connected global business" fill sizes="(max-width: 760px) 100vw, 18vw" /></div>
            <div className={styles.featuredCopy}>
              <time dateTime="2026-09-15">15 Sep 2026</time>
              <h3>AI in the Legal and Regulatory Ecosystem – Opportunities, Risks and the Road Ahead</h3>
              <p>Exploring how artificial intelligence is reshaping legal, regulatory and business advisory services in India and globally.</p>
              <ArrowLink href="/insights/articles">Read More</ArrowLink>
            </div>
          </article>
          <div className={styles.sliderControls} aria-label="Featured insight carousel controls">
            <button type="button" aria-label="Previous insight">←</button><span><i className={styles.activeDot} /><i /><i /><i /></span><button type="button" aria-label="Next insight">→</button>
          </div>
        </div>

        <div className={styles.latestColumn}>
          <div className={styles.headingLine}><h2 className={styles.sectionTitle}>Latest Insights</h2><ArrowLink href="/insights">View All Insights</ArrowLink></div>
          <div className={styles.latestGrid}>
            {visibleInsights.map((insight) => <article className={styles.latestCard} key={insight.title}>
              <div className={styles.latestImage}><Image src={insight.image} alt="" fill sizes="(max-width: 760px) 44vw, 12vw" /></div>
              <div className={styles.latestCopy}>{insight.date && <time>{new Date(`${insight.date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</time>}<h3>{insight.title}</h3><p>{insight.description}</p><ArrowLink href={insight.href}>Read More</ArrowLink></div>
            </article>)}
            {visibleInsights.length === 0 && <p className={styles.noResults}>No technology pages match these filters. Try a different combination or reset the filters.</p>}
            {hasActiveFilters && visibleInsights.length > 0 && <p className={styles.resultCount} role="status">{visibleInsights.length} matching {visibleInsights.length === 1 ? "page" : "pages"}</p>}
          </div>
        </div>

        <aside className={styles.filterPanel}>
          <h2 className={styles.sectionTitle}>Search &amp; Filters</h2>
          <form onSubmit={applyFilters} onReset={resetFilters}>
            <label className={styles.searchField}><Icon name="search" /><input name="search" type="search" placeholder="Search insights, articles, reports..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
            {filters.map(({ label, key, placeholder, options }) => <label className={styles.selectField} key={label}><span>{label}</span><select name={key} value={filterValues[key]} onChange={(event) => setFilterValues((current) => ({ ...current, [key]: event.target.value }))}><option value="">{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><Icon name="chevron" /></label>)}
            <div className={styles.filterActions}><button type="submit">Apply Filters <Icon name="arrow" /></button><button type="reset">Reset</button></div>
          </form>
        </aside>
      </section>

      <section className={styles.contentTypes} aria-label="Technology resources">
        {contentTypes.map((item) => <article className={styles.contentType} key={item.title}>
          <h2>{item.title}</h2>
          <Link href={item.href} className={styles.contentTypeImage}><Image src={item.image} alt="" fill sizes="(max-width: 720px) 90vw, 25vw" /></Link>
          <p>{item.description}</p><ArrowLink href={item.href}>{item.link}</ArrowLink>
        </article>)}
      </section>

      <section className={styles.browseGrid}>
        <div className={styles.browseSection}>
          <div className={styles.headingLine}><h2 className={styles.sectionTitle}>Browse by Industry</h2><ArrowLink href="/industries">View All Industries</ArrowLink></div>
          <div className={styles.imageCardGrid}>{industries.map(([title, image, href]) => <ImageCard key={title} title={title} image={image} href={href} />)}</div>
        </div>
        <div className={styles.browseSection}>
          <div className={styles.headingLine}><h2 className={styles.sectionTitle}>Browse by Service</h2><ArrowLink href="/technology-and-digital-solutions">View All Services</ArrowLink></div>
          <div className={styles.imageCardGrid}>{services.map(([title, image, href]) => <ImageCard key={title} title={title} image={image} href={href} />)}</div>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.professionalsSection}>
          <div className={styles.headingLine}><div><span className={styles.expertiseEyebrow}>Connected Expertise</span><h2 className={styles.sectionTitle}>Insights by Professionals</h2></div><ArrowLink href="/professionals">View All Professionals</ArrowLink></div>
          <div className={styles.professionalCards}>{professionals.map((professional, index) => <article className={`${styles.professionalCard} ${index === 2 ? styles.teamProfessional : ""}`} key={professional.name}>
            <Link href={professional.href} className={styles.professionalImage}><Image src={professional.image} alt={professional.name} fill sizes="(max-width: 720px) 80vw, 22vw" /></Link>
            <div className={styles.professionalCopy}><h3>{professional.name}</h3><p>{professional.role}</p><p>{professional.expertise}</p><ArrowLink href={professional.href}>{index === 2 ? "Meet the team" : "View Insights"}</ArrowLink></div>
          </article>)}</div>
        </div>

        <section className={styles.trendingSection}>
          <h2 className={styles.sectionTitle}>Most Read / Trending</h2>
          <ol>{trending.map((title, index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><Link href="/insights/articles">{title}</Link><Icon name="arrow" /></li>)}</ol>
        </section>
      </section>
    </div>

    <section className={styles.enquirySection} id="enquiry">
      <div className={`${styles.contentWrap} ${styles.enquiryGrid}`}>
        <div className={styles.enquiryCopy}>
          <span className={styles.eyebrow}>Let&apos;s explore what&apos;s next</span>
          <h2>Discuss Your Technology Requirements</h2>
          <p>Talk with our team about technology, digital transformation, compliance and your organisation&apos;s next steps.</p>
          <div className={styles.enquiryImage}><Image src="/Technology, IT & ITES .png" alt="Technology and digital solutions for businesses" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
          <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
          <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
        </div>
        <div className={styles.formPanel}>
          <span className={styles.eyebrow}>Start a conversation</span>
          <h3>Tell us about your technology requirements.</h3>
          <p>Share a few details and our team will get in touch to discuss your needs.</p>
          <TechnologyEnquiryForm defaultSolutionArea="Digital Business Solutions" variant="compact" />
        </div>
      </div>
    </section>

    <section className={styles.cta}>
      <Image src="/Technology&Digital/Banner- Technology & Digital Solutions.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaOverlay} />
      <div className={styles.ctaInner}><div><h2>Discuss Your Technology Requirements</h2><p>Looking for tailored insights or want to discuss a specific technology challenge?<br />Our team is here to help.</p></div><Link href="/contact" className={styles.ctaButton}>Get in Touch <Icon name="arrow" /></Link></div>
    </section>
  </div>;
}
