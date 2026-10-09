"use client";

import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { professionals } from "../leadership";
import styles from "./experts-by-jurisdiction.module.css";

const jurisdictions = [
  { name: "India", description: "Comprehensive on-ground expertise.", image: "/images/market-india.jpg", href: "/global-presence/india", terms: "india south asia market entry" },
  { name: "UAE", description: "Strategic access to the Middle East.", image: "/images/uae-dubai-skyline.jpg", href: "/global-presence/uae", terms: "uae united arab emirates middle east" },
  { name: "Singapore", description: "Gateway to Asia-Pacific.", image: "/images/market-singapore.jpg", href: "/global-presence/singapore", terms: "singapore asia pacific" },
  { name: "United Kingdom", description: "European markets and international advisory.", image: "/images/market-uk.jpg", href: "/global-presence/uk", terms: "united kingdom uk europe" },
  { name: "United States", description: "Cross-border business and regulatory support.", image: "/images/market-usa.jpg", href: "/global-presence/usa", terms: "united states usa north america" },
  { name: "European Union", description: "Access to EU regulatory and commercial framework.", image: "/images/market-eu.jpg", href: "/global-presence/european-union", terms: "european union eu europe" },
  { name: "Middle East", description: "Regional expertise across key markets.", image: "/images/uae-dubai-skyline.jpg", href: "/global-presence/middle-east", terms: "middle east uae gulf mena" },
  { name: "Asia-Pacific", description: "Growing markets and strategic opportunities.", image: "/images/singapore-marina-bay.jpg", href: "/global-presence", terms: "asia pacific asia" },
  { name: "Africa", description: "Emerging markets and regulatory support.", image: "/globalpresence.png", href: "/global-presence", terms: "africa emerging markets" },
  { name: "Offshore Jurisdictions", description: "Structuring and international compliance.", image: "/international-regions.png", href: "/global-presence", terms: "offshore international compliance" },
  { name: "South Asia", description: "Regional business environments.", image: "/images/india-presence/india-gate.jpg", href: "/global-presence", terms: "south asia india regional" },
  { name: "Other Jurisdictions", description: "Global network for cross-border matters.", image: "/international-network-hero.png", href: "/global-presence", terms: "other jurisdictions global cross border" },
];

const featuredJurisdictions = [
  { name: "India", description: "Corporate, regulatory, litigation and sectoral expertise.", image: "/images/india-presence/india-gate.jpg", link: "Meet India Experts", href: "/global-presence/india" },
  { name: "UAE", description: "Market entry, licensing, regulatory and investment support.", image: "/images/uae-dubai-skyline.jpg", link: "Meet UAE Experts", href: "/global-presence/uae" },
  { name: "Singapore", description: "Corporate, financial, regulatory and technology advisory.", image: "/images/singapore-marina-bay.jpg", link: "Meet Singapore Experts", href: "/global-presence/singapore" },
  { name: "United States", description: "Cross-border transactions, regulatory and dispute support.", image: "/images/usa-liberty.jpg", link: "Meet US Experts", href: "/global-presence/usa" },
];

const capabilities = [
  ["building", "Market Entry & Structuring"],
  ["shield", "Regulatory Compliance"],
  ["file", "Licensing & Approvals"],
  ["globe", "Cross-Border Transactions"],
  ["scale", "Disputes & Arbitration"],
  ["percent", "Tax & Foreign Exchange"],
] as const;

const insights = [
  { type: "Legal Update", date: "10 Sep 2026", title: "UAE Commercial Companies Law: Key Amendments and Opportunities", image: "/images/uae-dubai-skyline.jpg", href: "/insights" },
  { type: "Article", date: "06 Sep 2026", title: "Cross-Border Investment Considerations in Singapore", image: "/images/singapore-marina-bay.jpg", href: "/insights" },
  { type: "Case Study", date: "30 Aug 2026", title: "Regulatory Landscape for FinTech in the United Kingdom", image: "/images/market-uk.jpg", href: "/insights" },
];

const faqs = [
  "How can I find professionals for a specific jurisdiction?",
  "Does Astronis have international professionals or network partners?",
  "Can you assist with cross-border transactions?",
  "Do you provide regulatory and compliance support in foreign jurisdictions?",
  "Can I connect with professionals for multiple jurisdictions?",
  "How do you ensure local legal and regulatory understanding?",
];

const popularJurisdictions = ["India", "UAE", "Singapore", "United Kingdom", "United States", "European Union", "Middle East", "Asia-Pacific", "Africa", "Offshore"];
const expertiseOptions = ["Corporate", "Regulatory", "Financial", "Commercial", "Litigation", "Disputes", "Tax", "Technology"];
const serviceOptions = ["Corporate Advisory", "Regulatory Compliance", "Cross-Border Transactions", "FEMA & FDI", "Banking & Financial Services", "Disputes & Arbitration"];
const industryOptions = ["Banking & Financial Services", "Technology & IT", "Healthcare & Life Sciences", "Manufacturing", "Real Estate & Construction"];
const locationOptions = ["New Delhi", "Mumbai", "Bengaluru", "Singapore", "Dubai", "London", "New York"];
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function ExpertsByJurisdiction() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ jurisdiction: "", expertise: "", service: "", industry: "", location: "" });
  const [applied, setApplied] = useState({ query: "", jurisdiction: "", expertise: "", service: "", industry: "", location: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const filteredJurisdictions = useMemo(() => jurisdictions.filter(item => {
    const content = normalise(`${item.name} ${item.description} ${item.terms}`);
    return [applied.query, applied.jurisdiction, applied.expertise, applied.service, applied.industry, applied.location]
      .filter(Boolean).every(value => content.includes(normalise(value)));
  }), [applied]);

  function applyFilters(event?: FormEvent<HTMLFormElement>, popular?: string) {
    event?.preventDefault();
    const nextFilters = popular
      ? { jurisdiction: "", expertise: "", service: "", industry: "", location: "" }
      : filters;
    const nextQuery = popular ?? query;
    if (popular) {
      setQuery(popular);
      setFilters(nextFilters);
    }
    setApplied({ query: nextQuery, ...nextFilters });
    requestAnimationFrame(() => document.getElementById("jurisdiction-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const selectedFile = values.get("upload");
    if (selectedFile instanceof File && selectedFile.size > 5 * 1024 * 1024) {
      setFormStatus("Upload Supporting Document must be 5 MB or smaller.");
      return;
    }

    setSubmitting(true);
    setFormStatus("");
    const message = [
      `Jurisdiction: ${String(values.get("jurisdiction") || "")}`,
      `Expertise Required: ${String(values.get("expertise") || "")}`,
      `Service Required: ${String(values.get("service") || "")}`,
      `Industry: ${String(values.get("industry") || "")}`,
      String(values.get("message") || ""),
    ].filter(Boolean).join("\n");
    const data = new FormData();
    data.set("connectWith", "jurisdiction");
    data.set("location", String(values.get("jurisdiction") || ""));
    data.set("service", String(values.get("service") || ""));
    data.set("industry", String(values.get("industry") || ""));
    data.set("name", String(values.get("name") || ""));
    data.set("company", String(values.get("organisation") || ""));
    data.set("email", String(values.get("email") || ""));
    data.set("countryCode", "");
    data.set("phone", String(values.get("phone") || ""));
    data.set("message", message);
    data.set("preferredMode", "email");
    data.set("consent", "yes");
    data.set("website", "");
    if (selectedFile instanceof File && selectedFile.size > 0) data.append("documents", selectedFile);

    try {
      const response = await fetch("/api/professional-enquiry", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Your enquiry could not be sent. Please try again.");
      setFormStatus(result.message);
      form.reset();
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "Your enquiry could not be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/international-regions.png" alt="Connected global markets and international business jurisdictions" fill loading="eager" sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Experts by Jurisdiction</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>GLOBAL JURISDICTIONAL EXPERTISE</span>
          <h1>Professionals with<br />a Global Perspective.</h1>
          <p>Our professionals provide legal, regulatory, corporate, financial and business advisory support across key jurisdictions, combining local insight with international experience.</p>
          <div className={styles.heroActions}><a className={styles.goldButton} href="#jurisdiction-results">Find by Jurisdiction <Icon name="arrow" /></a><a className={styles.outlineButton} href="#professionals">Find a Professional <Icon name="arrow" /></a></div>
        </div>
      </div>
    </section>

    <section className={styles.searchSection} aria-labelledby="search-heading">
      <div className={styles.searchPanel}>
        <h2 id="search-heading">Find Professionals by Jurisdiction</h2>
        <form className={styles.filters} onSubmit={event => applyFilters(event)}>
          <label className={styles.searchInput}><span className={styles.srOnly}>Search a country, region, jurisdiction, regulatory regime or expertise</span><Icon name="search" /><input type="search" placeholder="Search a country, region, jurisdiction, regulatory regime or expertise..." value={query} onChange={event => setQuery(event.target.value)} /></label>
          <label><span className={styles.srOnly}>Jurisdiction</span><select value={filters.jurisdiction} onChange={event => setFilters({ ...filters, jurisdiction: event.target.value })}><option value="">Jurisdiction</option>{popularJurisdictions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span className={styles.srOnly}>Expertise</span><select value={filters.expertise} onChange={event => setFilters({ ...filters, expertise: event.target.value })}><option value="">Expertise</option>{expertiseOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span className={styles.srOnly}>Service</span><select value={filters.service} onChange={event => setFilters({ ...filters, service: event.target.value })}><option value="">Service</option>{serviceOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span className={styles.srOnly}>Industry</span><select value={filters.industry} onChange={event => setFilters({ ...filters, industry: event.target.value })}><option value="">Industry</option>{industryOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span className={styles.srOnly}>Location</span><select value={filters.location} onChange={event => setFilters({ ...filters, location: event.target.value })}><option value="">Location</option>{locationOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <button className={styles.searchButton} type="submit">Find Professionals <Icon name="arrow" /></button>
        </form>
        <div className={styles.popular}><strong>Popular Jurisdictions:</strong>{popularJurisdictions.map(item => <button type="button" key={item} onClick={() => applyFilters(undefined, item)}>{item}</button>)}</div>
      </div>
    </section>

    <section className={styles.jurisdictionsSection} id="jurisdiction-results" aria-labelledby="jurisdictions-heading">
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>EXPLORE OUR JURISDICTIONAL EXPERTISE</span><h2 id="jurisdictions-heading">Key Jurisdictions. Local Insight. Global Reach.</h2></div><p>Access professionals with in-depth knowledge of legal, regulatory and business frameworks across major global jurisdictions.</p></div>
        <div className={styles.jurisdictionGrid}>{filteredJurisdictions.length ? filteredJurisdictions.map(item => <Link className={styles.jurisdictionCard} href={item.href} key={item.name}><span className={styles.jurisdictionImage}><Image src={item.image} alt={`${item.name} jurisdiction`} fill sizes="(max-width: 620px) 45vw, 16vw" /></span><span className={styles.jurisdictionBody}><strong>{item.name}</strong><span>{item.description}</span><Icon name="arrow" /></span></Link>) : <p className={styles.noResults}>No jurisdictions match your search. Try another jurisdiction or search term.</p>}</div>
      </div>
    </section>

    <section className={styles.featuredSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>FEATURED JURISDICTIONS</span><h2>Jurisdictional Expertise in Focus.</h2></div><p>Selected jurisdictions where our professionals actively advise on corporate, regulatory and cross-border matters.</p></div>
        <div className={styles.featuredGrid}>{featuredJurisdictions.map(item => <article className={styles.featuredCard} key={item.name}><Link className={styles.featuredImage} href={item.href}><Image src={item.image} alt={item.name} fill sizes="(max-width: 620px) 100vw, 25vw" /></Link><div><h3>{item.name}</h3><p>{item.description}</p><Link href="#professionals">{item.link} <Icon name="arrow" /></Link></div></article>)}</div>
      </div>
    </section>

    <section className={styles.professionalsSection} id="professionals">
      <div className={styles.wrap}>
        <div className={`${styles.sectionHeading} ${styles.professionalHeading}`}><h2>Our Legal Professionals</h2><span>{professionals.length} profiles</span></div>
        <div className={styles.professionalGrid}>{professionals.map(person => <article className={styles.professionalCard} key={person.slug}>
          <Link className={styles.professionalPhoto} href={`/professionals/${person.slug}`}><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" /></Link>
          <div className={styles.professionalInfo}><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><small><Icon name="pin" />New Delhi</small><Link className={styles.profileLink} href={`/professionals/${person.slug}`}>View Profile <Icon name="arrow" /></Link></div>
        </article>)}</div>
      </div>
    </section>

    <section className={styles.networkSection}>
      <div className={styles.wrap}>
        <div className={styles.capabilitiesColumn}><h2>Our Jurisdictional Capabilities</h2><div className={styles.capabilityGrid}>{capabilities.map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div></div>
        <div className={styles.networkColumn}><h2>Global Advisory Network</h2><p>Through our network of international professionals, we support clients across 30+ countries.</p><Link className={styles.mapImage} href="/global-presence"><Image src="/globalpresence.png" alt="Global map showing Astronis international advisory network" fill sizes="(max-width: 760px) 100vw, 32vw" /></Link><Link className={styles.textLink} href="/global-presence">Explore Our Global Presence <Icon name="arrow" /></Link></div>
      </div>
    </section>

    <section className={styles.insightsSection}>
      <div className={styles.wrap}>
        <div className={styles.insightsHeading}><div><span className={styles.eyebrow}>JURISDICTIONAL INSIGHTS</span><h2>Jurisdictional Insights</h2><p>Legal, regulatory and business updates from our professionals.</p></div><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div>
        <div className={styles.insightGrid}>{insights.map(item => <article className={styles.insightCard} key={item.title}><Link className={styles.insightImage} href={item.href}><Image src={item.image} alt={item.title} fill sizes="(max-width: 720px) 100vw, 33vw" /></Link><div><div className={styles.insightMeta}><span>{item.type}</span><time>{item.date}</time></div><h3>{item.title}</h3><Link href={item.href}>Read Insight <Icon name="arrow" /></Link></div></article>)}</div>
      </div>
    </section>

    <section className={styles.faqSection}>
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <div className={styles.faqIntro}><span className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</span><h2>Frequently Asked Questions</h2><Link className={styles.textLink} href="/faqs">View All FAQs <Icon name="arrow" /></Link></div>
        <div className={styles.faqList}>{faqs.map((question, index) => <div className={styles.faqItem} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <Link href="#enquiry">Discuss Your Jurisdictional Requirement <Icon name="arrow" /></Link>}</div>)}</div>
      </div>
    </section>

    <section className={styles.enquirySection} id="enquiry">
      <div className={`${styles.wrap} ${styles.enquiryGrid}`}>
        <div className={styles.enquiryCopy}><h2>Discuss Your Jurisdictional Requirement</h2><div className={styles.enquiryImage}><Image src="/international-network-hero.png" alt="International professionals coordinating cross-border matters" fill sizes="(max-width: 720px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div>
        <div className={styles.formPanel}><form className={styles.enquiryForm} onSubmit={submitEnquiry}>
          <label>Name *<input name="name" autoComplete="name" minLength={2} required /></label><label>Organisation *<input name="organisation" autoComplete="organization" required /></label>
          <label>Email *<input name="email" type="email" autoComplete="email" required /></label><label>Phone *<input name="phone" type="tel" minLength={7} required /></label>
          <label>Jurisdiction *<select name="jurisdiction" required defaultValue=""><option value="" disabled>Select</option>{popularJurisdictions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Expertise Required<select name="expertise" defaultValue=""><option value="">Select</option>{expertiseOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Service Required<select name="service" defaultValue=""><option value="">Select</option>{serviceOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Industry<select name="industry" defaultValue=""><option value="">Select</option>{industryOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className={styles.requirement}>Brief Description of Requirement *<textarea name="message" minLength={10} required /></label>
          <label className={styles.upload}>Upload Supporting Document<input name="upload" type="file" accept=".pdf,.doc,.docx" /></label>
          <small className={styles.uploadNote}>PDF, DOC, DOCX · Max 5 MB</small>
          <label className={styles.consent}><input name="consent" type="checkbox" value="yes" required /><span>I agree to the processing of my personal data in accordance with the <Link href="/legal/privacy-policy">Privacy Policy</Link>.</span></label>
          <button className={styles.submitButton} type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Enquiry"} <Icon name="arrow" /></button>{formStatus && <p className={styles.formStatus} role="status">{formStatus}</p>}
        </form></div>
      </div>
    </section>

    <section className={styles.finalCta}><div className={`${styles.wrap} ${styles.ctaInner}`}><div><h2>Global Markets. Local Insight. Right Expertise.</h2><p>Connect with professionals who understand the legal, regulatory, commercial and cultural dimensions of your target jurisdiction.</p></div><div className={styles.ctaActions}><Link className={styles.goldButton} href="#professionals">Find a Professional <Icon name="arrow" /></Link><Link className={styles.outlineButton} href="#enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
