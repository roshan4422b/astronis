"use client";

import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { professionals } from "../leadership";
import styles from "./insights-by-professional.module.css";

const topics = ["Company Law", "FEMA & FDI", "Banking & NBFC", "GST", "Arbitration", "NCLT", "MSME", "Employment", "IPR", "RERA", "ESG", "Regulatory Updates"];
const categories = ["All", "Legal Updates", "Articles", "Case Studies", "White Papers", "Regulatory Updates", "Market Insights"];
const professionalsList = [
  { name: "Krishna Kumar Mishra", role: "Founder Partner", expertise: "Corporate & Commercial, Disputes, Regulatory", count: 32, slug: "krishna-kumar-mishra" },
  { name: "Priti Mishra", role: "Partner", expertise: "Family & Civil Law, IPR, MSME", count: 18, slug: "priti-mishra" },
  { name: "S. Malla Reddy", role: "Advocate", expertise: "Arbitration & Disputes, NCLT, MSME", count: 16 },
  { name: "S.N. Pandey", role: "Advocate", expertise: "Banking & Financial Disputes, DRT/DRAT", count: 14 },
  { name: "B.G. Pandey", role: "Advocate", expertise: "Regulatory, Compliance, Public Law", count: 12 },
  { name: "Sangeeta Subbaraya", role: "Advocate", expertise: "Employment, HR, ESG & Governance", count: 11 },
].map(person => ({ ...person, image: professionals.find(profile => profile.slug === person.slug)?.image }));

export const professionalInsights = [
  { category: "Legal Update", type: "Legal Updates", title: "RBI Issues New Guidelines for Digital Lending Platforms", description: "Key regulatory provisions and compliance considerations for NBFCs and fintech companies.", author: "Krishna Kumar Mishra", date: "12 Sep 2026", image: "/Banking & Financial Services .png", topics: "banking nbfc regulatory updates", practice: "Banking & NBFC", industry: "Banking & Financial Services", jurisdiction: "India", href: "/insights/legal-updates" },
  { category: "Article", type: "Articles", title: "Recent Developments in MSME Arbitration and MSEFC Jurisdiction", description: "Analysis of maintainability, jurisdiction and key considerations for MSME disputes.", author: "S. Malla Reddy", date: "09 Sep 2026", image: "/images/services/arbitration-and-conciliation.webp", topics: "arbitration msme", practice: "Arbitration & Dispute Resolution", industry: "Manufacturing", jurisdiction: "India", href: "/insights/articles" },
  { category: "Case Study", type: "Case Studies", title: "Cross-Border Investment Structuring for a Technology Company", description: "How a multidisciplinary approach supported a successful outbound investment transaction.", author: "Priti Mishra", date: "02 Sep 2026", image: "/images/services/cross-border-and-international-business-support.webp", topics: "fema fdi technology investment", practice: "FEMA & Foreign Exchange", industry: "Technology & IT", jurisdiction: "India", href: "/success-stories" },
  { category: "Regulatory Update", type: "Regulatory Updates", title: "FEMA Compounding – Key Considerations for Businesses", description: "Recent regulatory trends and practical guidance for handling FEMA contraventions.", author: "S.N. Pandey", date: "28 Aug 2026", image: "/images/services/fema-fdi-and-foreign-exchange-advisory.webp", topics: "fema fdi regulatory updates", practice: "FEMA & Foreign Exchange", industry: "Banking & Financial Services", jurisdiction: "India", href: "/insights/legal-updates" },
  { category: "Article", type: "Articles", title: "ESG Compliance for Indian Businesses", description: "Evolving regulatory framework and opportunities for sustainable growth.", author: "Sangeeta Subbaraya", date: "25 Aug 2026", image: "/images/services/esg-and-sustainability-advisory.webp", topics: "esg employment regulatory updates", practice: "Regulatory & Compliance", industry: "Energy & Infrastructure", jurisdiction: "India", href: "/insights/articles" },
  { category: "White Paper", type: "White Papers", title: "AI Governance and Regulatory Considerations in India", description: "Key legal, regulatory and ethical considerations for AI-driven businesses.", author: "Krishna Kumar Mishra", date: "20 Aug 2026", image: "/Technology&Digital/Banner- Data, AI & Automation .png", topics: "regulatory updates company law", practice: "Corporate & Commercial", industry: "Technology & IT", jurisdiction: "India", href: "/insights/white-papers" },
];

const refineOptions = {
  professional: professionalsList.map(person => person.name),
  practice: ["Corporate & Commercial", "Regulatory & Compliance", "FEMA & Foreign Exchange", "Banking & NBFC", "Arbitration & Dispute Resolution", "GST & Indirect Tax", "IPR & Registrations", "Employment & HR", "MSME & RERA", "NCLT & Insolvency"],
  industry: ["Banking & Financial Services", "Technology & IT", "Real Estate & Construction", "Manufacturing", "Healthcare & Life Sciences", "E-commerce & Digital Business", "Energy & Infrastructure", "Aviation, Aerospace & Defence", "Retail & Consumer", "Media & Broadcasting"],
  jurisdiction: ["India", "UAE", "Singapore", "United Kingdom", "United States"],
  type: ["Legal Updates", "Articles", "Case Studies", "White Papers", "Regulatory Updates", "Market Insights"],
};

const practiceAreas = [
  ["Corporate & Commercial", 42, "building", "/services/corporate-commercial-advisory"],
  ["Regulatory & Compliance", 38, "shield", "/services"],
  ["FEMA & Foreign Exchange", 26, "globe", "/services/fema-fdi-cross-border"],
  ["Banking & NBFC", 24, "chart", "/services/banking-rbi-financial-services"],
  ["Arbitration & Dispute Resolution", 22, "scale", "/services/litigation-dispute-resolution"],
  ["GST & Indirect Tax", 20, "percent", "/services/taxation-compliance"],
  ["IPR & Registrations", 18, "gem", "/services/intellectual-property"],
  ["Employment & HR", 16, "people", "/services/hr-employment-labour"],
  ["MSME & RERA", 15, "building", "/services"],
  ["NCLT & Insolvency", 14, "file", "/services/insolvency-restructuring"],
] as const;
const practiceTiles = [
  ["building", "Corporate & Commercial", "/services/corporate-commercial-advisory"],
  ["shield", "Regulatory & Compliance", "/services"],
  ["scale", "Disputes & Arbitration", "/services/litigation-dispute-resolution"],
  ["globe", "FEMA & Foreign Exchange", "/services/fema-fdi-cross-border"],
  ["chart", "Banking & Financial Services", "/services/banking-rbi-financial-services"],
  ["percent", "GST & Indirect Tax", "/services/taxation-compliance"],
  ["gem", "Intellectual Property Rights", "/services/intellectual-property"],
  ["people", "Employment & HR", "/services/hr-employment-labour"],
] as const;
const industryTiles = [
  ["Financial Services", "/Banking & Financial Services .png", "/industries"],
  ["Technology & IT", "/Technology, IT & ITES .png", "/industries"],
  ["Healthcare", "/Banner-Healthcare & Medical Scien .png", "/industries"],
  ["Real Estate", "/Real Estate & Construction .png", "/industries"],
] as const;
const jurisdictionTiles = [
  ["India", "/images/market-india.jpg", "/global-presence/india"],
  ["UAE", "/images/uae-dubai-skyline.jpg", "/global-presence/uae"],
  ["Singapore", "/images/singapore-marina-bay.jpg", "/global-presence/singapore"],
  ["United Kingdom", "/images/uk-london-westminster.jpg", "/global-presence/uk"],
] as const;
const contentTypeTiles = [
  ["Legal Updates", "/images/services/regulatory-and-compliance.webp", "/insights/legal-updates"],
  ["Articles", "/images/services/corporate-and-commercial-advisory.webp", "/insights/articles"],
  ["Case Studies", "/images/services/business-advisory-and-consulting.webp", "/success-stories"],
  ["White Papers", "/Technology&Digital/Banner- Data, AI & Automation .png", "/insights"],
  ["Regulatory Updates", "/images/services/fema-fdi-and-foreign-exchange-advisory.webp", "/insights/legal-updates"],
  ["Market Insights", "/images/services/cross-border-and-international-business-support.webp", "/insights"],
] as const;

type RefineState = { professional: string; practice: string; industry: string; jurisdiction: string; type: string; from: string; to: string };
const emptyRefinements: RefineState = { professional: "", practice: "", industry: "", jurisdiction: "", type: "", from: "", to: "" };
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const parseDate = (value: string) => new Date(value.replace(/(\d{1,2}) (\w{3}) (\d{4})/, "$2 $1, $3")).getTime();
const insightValue = (item: (typeof professionalInsights)[number], key: string) =>
  key === "professional" ? item.author : item[key as keyof (typeof professionalInsights)[number]] ?? "";

export default function InsightsByProfessional() {
  const [query, setQuery] = useState("");
  const [topFilters, setTopFilters] = useState({ professional: "", practice: "", industry: "", type: "", jurisdiction: "" });
  const [appliedFilters, setAppliedFilters] = useState<RefineState>(emptyRefinements);
  const [activeCategory, setActiveCategory] = useState("All");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [appliedTop, setAppliedTop] = useState(topFilters);

  const filteredInsights = useMemo(() => professionalInsights.filter(item => {
    const text = normalise(`${item.title} ${item.description} ${item.author} ${item.category} ${item.topics} ${item.practice} ${item.industry} ${item.jurisdiction}`);
    const matchesText = !appliedQuery || text.includes(normalise(appliedQuery));
    const matchesTop = Object.entries(appliedTop).every(([key, value]) => !value || normalise(insightValue(item, key)).includes(normalise(value)));
    const matchesRefine = Object.entries(appliedFilters).filter(([key]) => key !== "from" && key !== "to").every(([key, value]) => !value || normalise(insightValue(item, key)).includes(normalise(value)));
    const date = parseDate(item.date);
    const matchesFrom = !appliedFilters.from || date >= new Date(`${appliedFilters.from}T00:00:00`).getTime();
    const matchesTo = !appliedFilters.to || date <= new Date(`${appliedFilters.to}T23:59:59`).getTime();
    return matchesText && matchesTop && matchesRefine && matchesFrom && matchesTo && (activeCategory === "All" || item.type === activeCategory);
  }), [activeCategory, appliedFilters, appliedQuery, appliedTop]);

  function submitTopFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedQuery(query);
    setAppliedTop(topFilters);
  }
  function submitRefinements(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedFilters(refinements);
  }
  const [refinements, setRefinements] = useState<RefineState>(emptyRefinements);
  function chooseTopic(topic: string) {
    setQuery(topic);
    setAppliedQuery(topic);
    setAppliedTop({ professional: "", practice: "", industry: "", type: "", jurisdiction: "" });
    setTopFilters({ professional: "", practice: "", industry: "", type: "", jurisdiction: "" });
  }

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/international-network-hero.png" alt="Professionals discussing business with a global markets backdrop" fill loading="eager" sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Insights by Professional</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>KNOWLEDGE FROM OUR PROFESSIONALS</span><h1>Insights by Our<br />Professionals.</h1><p>Perspectives, analysis and updates from our multidisciplinary professionals on legal, regulatory, corporate and business matters.</p><div className={styles.heroActions}><Link className={styles.goldButton} href="#latest-insights">Explore Insights <Icon name="arrow" /></Link><Link className={styles.outlineButton} href="/professionals">Find a Professional <Icon name="arrow" /></Link></div></div>
      </div>
    </section>

    <section className={styles.searchSection}>
      <div className={styles.searchPanel}>
        <h2>Find Insights by Professional</h2>
        <form className={styles.topFilters} onSubmit={submitTopFilters}>
          <label className={styles.searchInput}><span className={styles.srOnly}>Search by keyword, topic, professional name or industry...</span><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Search by keyword, topic, professional name or industry..." /></label>
          {(["professional", "practice", "industry", "type", "jurisdiction"] as const).map((key, index) => <label key={key}><span className={styles.srOnly}>{["Professional", "Practice Area / Expertise", "Industry", "Content Type", "Jurisdiction"][index]}</span><select value={topFilters[key]} onChange={event => setTopFilters({ ...topFilters, [key]: event.target.value })}><option value="">{["Professional", "Practice Area / Expertise", "Industry", "Content Type", "Jurisdiction"][index]}</option>{refineOptions[key].map(option => <option key={option}>{option}</option>)}</select></label>)}
          <button className={styles.searchButton} type="submit">Search Insights <Icon name="arrow" /></button>
        </form>
        <div className={styles.popularTopics}><strong>Popular Topics:</strong>{topics.map(topic => <button type="button" key={topic} onClick={() => chooseTopic(topic)}>{topic}</button>)}</div>
      </div>
    </section>

    <section className={styles.professionalsSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><h2>Featured Professionals &amp; Their Latest Insights</h2><Link href="/professionals">View All Professionals <Icon name="arrow" /></Link></div>
        <div className={styles.professionalGrid}>{professionalsList.map(person => <article className={styles.professionalCard} key={person.name}>
          <div className={styles.professionalPhoto}>{person.image ? <Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" /> : <span aria-hidden="true">{person.name.split(" ").map(part => part[0]).join("").replace(/\./g, "").slice(0, 2)}</span>}</div>
          <div className={styles.professionalInfo}><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><Link href={person.slug ? `/professionals/${person.slug}` : "#latest-insights"}>{person.count} Insights <Icon name="arrow" /></Link></div>
        </article>)}</div>
      </div>
    </section>

    <section className={styles.latestSection} id="latest-insights">
      <div className={styles.wrap}>
        <div className={styles.latestLayout}>
          <div className={styles.mainInsights}>
            <h2>Latest Insights by Our Professionals</h2>
            <div className={styles.categoryTabs} role="tablist" aria-label="Insight categories">{categories.map(category => <button type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? styles.activeTab : ""} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
            {filteredInsights.length ? <div className={styles.insightGrid}>{filteredInsights.map(item => { const person = professionalsList.find(profile => profile.name === item.author); return <article className={styles.insightCard} key={item.title}><Link className={styles.insightImage} href={item.href}><Image src={item.image} alt={item.title} fill sizes="(max-width: 720px) 100vw, 30vw" /></Link><div className={styles.insightBody}><span className={styles.contentLabel}>{item.category}</span><h3><Link href={item.href}>{item.title}</Link></h3><p>{item.description}</p><div className={styles.insightByline}>{person?.image ? <Image src={person.image} alt="" width={32} height={32} /> : <span aria-hidden="true">{item.author.split(" ").map(part => part[0]).join("").replace(/\./g, "").slice(0, 2)}</span>}<strong>{item.author}</strong><time>{item.date}</time></div><Link className={styles.readLink} href={item.href}>Read Insight <Icon name="arrow" /></Link></div></article>; })}</div> : <p className={styles.emptyState} role="status">No matching insights found.</p>}
          </div>
          <aside className={styles.sidebar}>
            <form className={styles.refinePanel} onSubmit={submitRefinements}><h3>Refine Your Search</h3>{(["professional", "practice", "industry", "jurisdiction", "type"] as const).map((key, index) => <label key={key}><span className={styles.srOnly}>{["Professional", "Practice Area / Expertise", "Industry", "Jurisdiction", "Content Type"][index]}</span><select value={refinements[key]} onChange={event => setRefinements({ ...refinements, [key]: event.target.value })}><option value="">{["Professional", "Practice Area / Expertise", "Industry", "Jurisdiction", "Content Type"][index]}</option>{refineOptions[key].map(option => <option key={option}>{option}</option>)}</select></label>)}<div className={styles.dateFields}><label><span className={styles.srOnly}>From Date</span><input type="date" aria-label="From Date" value={refinements.from} onChange={event => setRefinements({ ...refinements, from: event.target.value })} /></label><label><span className={styles.srOnly}>To Date</span><input type="date" aria-label="To Date" value={refinements.to} onChange={event => setRefinements({ ...refinements, to: event.target.value })} /></label></div><button className={styles.applyButton} type="submit">Apply Filters <Icon name="arrow" /></button></form>
            <PopularList title="Popular Practice Areas" items={practiceAreas} action="View All Practice Areas" href="/services" styles={styles} />
          </aside>
        </div>
        <section className={styles.practiceSection}>
          <div className={styles.sectionHeading}><h2>Insights by Practice Area</h2><Link href="/insights">View All Practice Area Insights <Icon name="arrow" /></Link></div>
          <div className={styles.practiceGrid}>{practiceTiles.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div>
        </section>
        <section className={styles.discoverySection}>
          <div className={styles.discoveryGroupsGrid}>
            <DiscoveryGroup title="Insights by Industry" action="View All Industry Insights" href="/insights" items={industryTiles} styles={styles} />
            <DiscoveryGroup title="Insights by Jurisdiction" action="View All Jurisdictional Insights" href="/insights" items={jurisdictionTiles} styles={styles} />
            <DiscoveryGroup title="Insights by Content Type" action="View All Content Types" href="/insights" items={contentTypeTiles} styles={styles} />
          </div>
        </section>
      </div>
    </section>

    <section className={styles.finalCta}><Image className={styles.ctaImage} src="/international-network-hero.png" alt="" fill sizes="100vw" /><div className={styles.ctaShade} /><div className={`${styles.wrap} ${styles.ctaInner}`}><div><h2>Knowledge. Perspective. Practical Insight.</h2><p>Stay informed with insights from our professionals on legal, regulatory, corporate and business developments.</p></div><div className={styles.ctaActions}><Link className={styles.goldButton} href="/insights">Explore All Insights <Icon name="arrow" /></Link><Link className={styles.outlineButton} href="/professionals">Find a Professional <Icon name="arrow" /></Link></div></div></section>
  </div>;
}

type ListStyles = typeof styles;
function PopularList({ title, items, action, href, styles }: { title: string; items: readonly (readonly [string, number, ...string[]])[]; action: string; href: string; styles: ListStyles }) {
  return <section className={styles.popularList}><h3>{title}</h3><ul>{items.map(item => { const [name, count] = item; const destination = item[item.length - 1]; if (typeof destination !== "string") return null; return <li key={name}><Link href={destination}>{name}</Link><span>{count}</span></li>; })}</ul><Link className={styles.listAction} href={href}>{action} <Icon name="arrow" /></Link></section>;
}

type DiscoveryItem = readonly [string, string, string];
function DiscoveryGroup({ title, action, href, items, styles }: { title: string; action: string; href: string; items: readonly DiscoveryItem[]; styles: ListStyles }) {
  return <section className={styles.discoveryGroup}><div className={styles.discoveryHeading}><h2>{title}</h2></div><div className={styles.discoveryGrid}>{items.map(([name, image, destination]) => <Link className={styles.discoveryCard} href={destination} key={name}><span><Image src={image} alt="" fill sizes="(max-width: 720px) 45vw, 15vw" /></span><strong>{name}</strong></Link>)}</div><Link className={styles.discoveryAction} href={href}>{action} <Icon name="arrow" /></Link></section>;
}
