"use client";

import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { professionals } from "../leadership";
import styles from "./experts-by-service.module.css";

const serviceCards = [
  { title: "Corporate &\nCommercial Advisory", image: "/images/services/corporate-and-commercial-advisory.webp", href: "/services/corporate-and-commercial-advisory", tags: "corporate advisory m&a contracts company commercial" },
  { title: "Regulatory &\nCompliance", image: "/images/services/regulatory-and-compliance.webp", href: "/services/regulatory-and-compliance", tags: "licensing governance regulatory compliance" },
  { title: "Litigation &\nDispute Resolution", image: "/images/services/litigation-and-dispute-resolution.webp", href: "/services/litigation-dispute-resolution", tags: "arbitration disputes nclt drt" },
  { title: "Banking, Finance &\nInvestment", image: "/images/services/banking-nbfc-and-financial-services-advisory.webp", href: "/services/banking-rbi-financial-services", tags: "banking nbfc financial investment" },
  { title: "FEMA, FDI &\nForeign Exchange", image: "/images/services/fema-fdi-and-foreign-exchange-advisory.webp", href: "/services/fema-fdi-cross-border", tags: "fema fdi foreign exchange investment" },
  { title: "GST &\nIndirect Taxation", image: "/images/services/gst-and-indirect-tax-regulatory-support.webp", href: "/services/taxation-compliance", tags: "gst tax taxation regulatory" },
  { title: "Intellectual Property\n& Registrations", image: "/images/services/intellectual-property-rights.webp", href: "/services/intellectual-property", tags: "ipr intellectual property registrations" },
  { title: "MSME & RERA\nAdvisory", image: "/images/services/msme-advisory-and-disputes.webp", href: "/services/msme-advisory-and-disputes", tags: "msme rera advisory disputes" },
  { title: "Employment &\nHR Advisory", image: "/images/services/hr-and-employment-advisory.webp", href: "/services/hr-employment-labour", tags: "employment hr labour" },
  { title: "Risk, Governance\n& Compliance", image: "/images/services/risk-governance-and-forensic-advisory.webp", href: "/services/risk-governance-and-forensic-advisory", tags: "risk governance compliance" },
  { title: "Technology &\nDigital Advisory", image: "/Technology&Digital/Banner- Technology & Digital Solutions.png", href: "/technology-and-digital-solutions", tags: "technology digital ai cybersecurity" },
  { title: "International &\nCross-Border Services", image: "/images/services/cross-border-and-international-business-support.webp", href: "/services/cross-border-and-international-business-support", tags: "international cross-border foreign exchange" },
];

const popularServices = ["Corporate Advisory", "Regulatory Compliance", "FEMA & FDI", "Banking & NBFC", "GST", "IPR", "Arbitration", "MSME", "NCLT", "Employment"];

const featuredServices = [
  { title: "M&A and Corporate Restructuring", description: "Strategic transactions, structuring, due diligence and regulatory support.", image: "/images/services/corporate-and-commercial-advisory.webp", link: "Meet M&A Experts" },
  { title: "FEMA, FDI & Cross-Border Investments", description: "Foreign investment, ECB, cross-border structuring and regulatory compliance.", image: "/images/services/fema-fdi-and-foreign-exchange-advisory.webp", link: "Meet FEMA Experts" },
  { title: "Arbitration & Alternative Dispute Resolution", description: "Commercial arbitration, conciliation and tribunal proceedings.", image: "/images/services/arbitration-and-conciliation.webp", link: "Meet Dispute Resolution Experts" },
  { title: "Technology & Digital Solutions", description: "AI, data protection, cybersecurity, RegTech and digital business advisory.", image: "/Technology&Digital/Banner- Technology & Digital Solutions.png", link: "Meet Technology Experts" },
];

const industries = [
  ["Banking & Financial Services", "/Banking & Financial Services .png", "/industries/financial-services"],
  ["Technology & IT", "/Technology, IT & ITES .png", "/industries/it-and-ites"],
  ["Healthcare & Life Sciences", "/Banner-Healthcare & Medical Scien .png", "/industries/healthcare-and-pharma"],
  ["Manufacturing", "/Manufacturing & Industrial .png", "/industries/manufacturing"],
  ["Real Estate & Construction", "/Real Estate & Construction .png", "/industries/real-estate-and-construction"],
  ["Retail & Consumer", "/Banner- Indus- Retail & Consumer .png", "/industries/retail-and-consumer"],
  ["Energy & Infrastructure", "/Banner-Infrastructure & Projects .png", "/industries/infrastructure"],
  ["Aviation, Aerospace & Defence", "/Banner-Indus- Aviation, Aerospace & Defence .png", "/industries/aviation-aerospace-and-defence"],
];

const jurisdictions = [
  ["India", "/images/market-india.jpg", "/global-presence/india"],
  ["UAE", "/images/uae-dubai-skyline.jpg", "/global-presence/uae"],
  ["Singapore", "/images/singapore-marina-bay.jpg", "/global-presence/singapore"],
  ["United Kingdom", "/images/uk-london-westminster.jpg", "/global-presence/uk"],
  ["United States", "/images/usa-liberty.jpg", "/global-presence/usa"],
  ["European Union", "/images/european-union-institutions.jpg", "/global-presence/european-union"],
  ["Middle East", "/images/uae-dubai-skyline.jpg", "/global-presence/middle-east"],
];

const insights = [
  { type: "Legal Update", date: "09 Sep 2026", title: "Key Regulatory Changes in the Auto Industry for Tech Sector", author: "By Astronis Team", image: "/Automotive & Mobility S .png", href: "/insights/legal-updates" },
  { type: "Article", date: "05 Sep 2026", title: "FEMA Compliance for Outbound Investments", author: "By Priti Mishra", image: "/images/services/fema-fdi-and-foreign-exchange-advisory.webp", href: "/insights/articles" },
  { type: "Case Study", date: "02 Sep 2026", title: "Successful Resolution in a Corporate Litigation", author: "By Krishna Kumar Mishra", image: "/images/services/litigation-and-dispute-resolution.webp", href: "/insights/case-studies" },
];

const faqs = [
  "How can I find professionals for a specific service?",
  "Can I filter professionals by industry or jurisdiction?",
  "Does Astronis provide end-to-end advisory for a service?",
  "Can a multidisciplinary team be assigned?",
  "How do I contact a particular professional?",
];

const serviceOptions = ["Corporate Advisory", "Regulatory Compliance", "FEMA & FDI", "Banking & NBFC", "GST", "IPR", "Arbitration", "MSME", "NCLT", "Employment"];
const expertiseOptions = ["Corporate & Commercial", "Regulatory & Compliance", "Litigation & Dispute Resolution", "Banking, Finance & Investment", "FEMA, FDI & Foreign Exchange", "GST & Indirect Taxation", "Intellectual Property & Registrations"];
const industryOptions = ["Banking & Financial Services", "Technology & IT", "Healthcare & Life Sciences", "Manufacturing", "Real Estate & Construction", "Retail & Consumer", "Energy & Infrastructure", "Aviation, Aerospace & Defence"];
const jurisdictionOptions = ["India", "UAE", "Singapore", "United Kingdom", "United States", "European Union", "Middle East"];
const locationOptions = ["New Delhi", "Mumbai", "Bengaluru", "Across India"];
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function ServiceCardTitle({ title }: { title: string }) {
  return <span>{title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</span>;
}

export default function ExpertsByService() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ service: "", expertise: "", industry: "", jurisdiction: "", location: "" });
  const [applied, setApplied] = useState({ query: "", service: "", expertise: "", industry: "", jurisdiction: "", location: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const visibleServices = useMemo(() => serviceCards.filter((card) => {
    const haystack = normalise(`${card.title.replace("\n", " ")} ${card.tags}`);
    return [applied.query, applied.service, applied.expertise, applied.industry, applied.jurisdiction, applied.location]
      .filter(Boolean).every(value => haystack.includes(normalise(value)));
  }), [applied]);

  function findServices(event?: FormEvent<HTMLFormElement>, popular?: string) {
    event?.preventDefault();
    const nextQuery = popular ?? query;
    if (popular) setQuery(popular);
    const selectedFilters = popular ? { service: "", expertise: "", industry: "", jurisdiction: "", location: "" } : filters;
    if (popular) setFilters(selectedFilters);
    setApplied({ query: nextQuery, ...selectedFilters });
    requestAnimationFrame(() => document.getElementById("service-expertise")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const file = values.get("upload");
    const details = `${String(values.get("message") || "")}${file instanceof File && file.name ? `\nSelected file: ${file.name}` : ""}`;
    setSubmitting(true);
    setFormStatus("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "service",
          name: values.get("name"),
          email: values.get("email"),
          company: values.get("organisation"),
          phone: values.get("phone"),
          service: values.get("service"),
          industry: values.get("industry"),
          country: values.get("jurisdiction"),
          message: details,
          consent: "yes",
          website: "",
          pageUrl: window.location.href,
          pathname: window.location.pathname,
          pageTitle: document.title,
          referrer: document.referrer,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "We couldn't submit your enquiry.");
      setFormStatus(result.message);
      form.reset();
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "We couldn't submit your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/images/services/hero.webp" alt="Professionals advising on corporate and regulatory services" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span>Experts by Service</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>SERVICE EXPERTISE</span>
          <h1>Find the Right Professionals<br />for Your Specific Requirement.</h1>
          <p>Our professionals bring deep expertise across legal, regulatory, corporate, financial and business advisory services to help you address complex challenges with practical and effective solutions.</p>
          <div className={styles.heroActions}><a className={styles.goldButton} href="#service-expertise">Explore Our Services <Icon name="arrow" /></a><a className={styles.outlineButton} href="#professionals">Find a Professional <Icon name="arrow" /></a></div>
        </div>
        <div className={styles.hexPanel} aria-hidden="true">
          <div className={styles.hex}><Icon name="document" /><span>Corporate<br />&amp; Commercial</span></div>
          <div className={styles.hex}><Icon name="shield" /><span>Regulatory<br />Services</span></div>
          <div className={styles.hex}><Icon name="scale" /><span>Litigation &amp;<br />Dispute Resolution</span></div>
          <div className={styles.hex}><Icon name="globe" /><span>Tax &amp; Foreign<br />Exchange</span></div>
          <div className={styles.hex}><Icon name="chart" /><span>Banking, Finance<br />&amp; Investment</span></div>
        </div>
      </div>
    </section>

    <section className={styles.searchSection} aria-labelledby="search-title">
      <div className={styles.searchPanel}>
        <h2 id="search-title">Find Professionals by Service</h2>
        <form className={styles.filters} onSubmit={event => findServices(event)}>
          <label className={styles.searchInput}><span className={styles.srOnly}>Search a service, practice area, specific requirement or keyword</span><Icon name="search" /><input type="search" placeholder="Search a service, practice area, specific requirement or keyword..." value={query} onChange={event => setQuery(event.target.value)} /></label>
          <label><span className={styles.srOnly}>Service</span><select value={filters.service} onChange={event => setFilters({ ...filters, service: event.target.value })}><option value="">Service</option>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span className={styles.srOnly}>Expertise</span><select value={filters.expertise} onChange={event => setFilters({ ...filters, expertise: event.target.value })}><option value="">Expertise</option>{expertiseOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span className={styles.srOnly}>Industry</span><select value={filters.industry} onChange={event => setFilters({ ...filters, industry: event.target.value })}><option value="">Industry</option>{industryOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span className={styles.srOnly}>Jurisdiction</span><select value={filters.jurisdiction} onChange={event => setFilters({ ...filters, jurisdiction: event.target.value })}><option value="">Jurisdiction</option>{jurisdictionOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span className={styles.srOnly}>Location</span><select value={filters.location} onChange={event => setFilters({ ...filters, location: event.target.value })}><option value="">Location</option>{locationOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <button className={styles.searchButton} type="submit">Find Professionals <Icon name="arrow" /></button>
        </form>
        <div className={styles.popular}><strong>Popular Services:</strong>{popularServices.map(service => <button type="button" key={service} onClick={() => findServices(undefined, service)}>{service}</button>)}</div>
      </div>
    </section>

    <section className={styles.serviceSection} id="service-expertise" aria-labelledby="service-heading">
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>EXPLORE OUR SERVICE EXPERTISE</span><h2 id="service-heading">Comprehensive Services. Sector-Focused Professionals.</h2></div><p>Discover professionals with expertise across our full range of legal, regulatory and business advisory services.</p></div>
        {visibleServices.length ? <div className={styles.serviceGrid}>{visibleServices.map(card => <Link className={styles.serviceCard} href={card.href} key={card.title}><span className={styles.serviceImage}><Image src={card.image} alt={card.title.replace("\n", " ")} fill sizes="(max-width: 620px) 50vw, 16vw" /></span><span className={styles.serviceTitle}><ServiceCardTitle title={card.title} /><Icon name="arrow" /></span></Link>)}</div> : <p className={styles.noResults} role="status">No matching services.</p>}
      </div>
    </section>

    <section className={styles.featuredSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>FEATURED SERVICES</span><h2>Key Service Areas in Focus.</h2></div><p>Strategic service areas where our professionals provide end-to-end advisory, regulatory and transactional support.</p></div>
        <div className={styles.featuredGrid}>{featuredServices.map(card => <article className={styles.featuredCard} key={card.title}><Link className={styles.featuredImage} href="/services"><Image src={card.image} alt={card.title} fill sizes="(max-width: 620px) 100vw, 25vw" /></Link><div><h3>{card.title}</h3><p>{card.description}</p><Link href="/professionals/experts-by-service#professionals">{card.link} <Icon name="arrow" /></Link></div></article>)}</div>
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

    <section className={styles.compactSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>SERVICES BY INDUSTRY</span><h2>Industry-Specific Service Expertise.</h2></div><p>Our services are tailored to the regulatory, financial and commercial requirements of diverse industries.</p><Link href="/industries">Explore All Industries <Icon name="arrow" /></Link></div>
        <div className={styles.industryGrid}>{industries.map(([title, image, href]) => <Link className={styles.industryCard} href={href} key={title}><Image src={image} alt={title} fill sizes="(max-width: 600px) 44vw, 12vw" /><span>{title}</span></Link>)}</div>
      </div>
    </section>

    <section className={styles.compactSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>SERVICES BY JURISDICTION</span><h2>Global Reach. Local Expertise.</h2></div><span /><Link href="/global-presence">Explore All Jurisdictions <Icon name="arrow" /></Link></div>
        <div className={styles.jurisdictionGrid}>{jurisdictions.map(([title, image, href]) => <Link className={styles.jurisdictionCard} href={href} key={title}><Image src={image} alt={title} fill sizes="(max-width: 600px) 44vw, 14vw" /><span>{title}</span></Link>)}</div>
      </div>
    </section>

    <section className={styles.insightsSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>LATEST INSIGHTS BY SERVICE</span><p>Perspectives, legal updates and analysis from our professionals.</p></div><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div>
        <div className={styles.insightGrid}>{insights.map(item => <article className={styles.insightCard} key={item.title}><Link className={styles.insightImage} href={item.href}><Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 100vw, 30vw" /></Link><div className={styles.insightCopy}><div className={styles.insightMeta}><span>{item.type}</span><time>{item.date}</time></div><h3>{item.title}</h3><small>{item.author}</small><Link href={item.href}>Read Insight <Icon name="arrow" /></Link></div></article>)}</div>
      </div>
    </section>

    <section className={styles.faqSection}>
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <div className={styles.faqIntro}><span className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</span><h2>Frequently Asked Questions</h2><Link className={styles.allFaqs} href="/faqs">View All FAQs <Icon name="arrow" /></Link></div>
        <div className={styles.faqList}>{faqs.map((question, index) => <div className={styles.faqItem} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button></div>)}</div>
      </div>
    </section>

    <section className={styles.enquirySection} id="enquiry">
      <div className={`${styles.wrap} ${styles.enquiryGrid}`}>
        <div className={styles.enquiryCopy}>
          <h2>Discuss Your Service Requirement.</h2>
          <div className={styles.enquiryImage}><Image src="/images/services/hero.webp" alt="Professional service advisory" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
          <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
          <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
        </div>
        <div className={styles.formPanel}><form className={styles.enquiryForm} onSubmit={submitEnquiry}>
          <label>Name *<input name="name" autoComplete="name" required /></label><label>Organisation *<input name="organisation" autoComplete="organization" required /></label>
          <label>Email *<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>Service Required *<select name="service" required defaultValue=""><option value="" disabled>Select</option>{serviceOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Industry<select name="industry" defaultValue=""><option value="">Select</option>{industryOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Jurisdiction<select name="jurisdiction" defaultValue=""><option value="">Select</option>{jurisdictionOptions.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className={styles.requirement}>Brief Description of Requirement *<textarea name="message" required /></label>
          <label className={styles.upload}><span className={styles.srOnly}>Choose File</span><input name="upload" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" /></label>
          <button className={styles.submitButton} type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Enquiry"} <Icon name="arrow" /></button>{formStatus && <p className={styles.formStatus} role="status">{formStatus}</p>}
        </form></div>
      </div>
    </section>

    <section className={styles.finalCta}><div className={styles.ctaInner}><div><h2>Your Business Challenges Deserve the Right Expertise.</h2><p>Connect with our professionals for tailored solutions across legal, regulatory, financial and business advisory services.</p></div><div className={styles.ctaActions}><Link className={styles.goldButton} href="#professionals">Find a Professional <Icon name="arrow" /></Link><Link className={styles.outlineButton} href="#enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
