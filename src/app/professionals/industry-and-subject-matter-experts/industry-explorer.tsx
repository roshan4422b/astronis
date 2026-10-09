"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./industry-experts.module.css";

export type IndustryItem = {
  title: string;
  image: string;
  href: string;
  searchTerms: string;
};

const popularIndustries = [
  ["Financial Services", "Banking, Finance & Insurance"],
  ["Technology", "Technology & IT"],
  ["Manufacturing", "Manufacturing"],
  ["Healthcare", "Healthcare & Life Sciences"],
  ["Infrastructure", "Infrastructure"],
  ["Real Estate", "Real Estate & Construction"],
  ["Retail", "Retail & Consumer"],
  ["Aviation", "Aviation, Aerospace & Defence"],
];

const expertiseOptions = [
  "Regulatory & Compliance",
  "Licensing & Approvals",
  "Transactions & Structuring",
  "Risk & Governance",
  "Disputes & Resolution",
  "Technology & Digital Advisory",
  "Tax & Foreign Exchange",
  "International Expansion",
];

const serviceOptions = [
  "Corporate Advisory",
  "Regulatory & Compliance",
  "Litigation & Disputes",
  "Technology & Digital Advisory",
  "Tax & Foreign Exchange",
];

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function IndustryExplorer({ items }: { items: readonly IndustryItem[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [expertise, setExpertise] = useState("");
  const [service, setService] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [location, setLocation] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ query: "", industry: "", expertise: "", service: "", jurisdiction: "", location: "" });

  const visibleIndustries = useMemo(() => items.filter((item) => {
    const content = normalise(`${item.title} ${item.searchTerms}`);
    return Object.values(appliedFilters).every((filter) => !filter || content.includes(normalise(filter)));
  }), [items, appliedFilters]);

  function applyFilters(event?: FormEvent<HTMLFormElement>, popularIndustry?: string) {
    event?.preventDefault();
    const selectedIndustry = popularIndustry ?? industry;
    if (popularIndustry) setIndustry(popularIndustry);
    setAppliedFilters({ query, industry: selectedIndustry, expertise, service, jurisdiction, location });
    requestAnimationFrame(() => document.getElementById("industry-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return <>
    <section className={styles.searchSection} aria-labelledby="search-title">
      <div className={styles.searchPanel}>
        <h2 id="search-title">Find Professionals by Industry</h2>
        <form className={styles.filters} onSubmit={(event) => applyFilters(event)}>
          <label className={styles.searchInput}><span className={styles.srOnly}>Search an industry, sector, business activity or expertise</span><Icon name="search" /><input type="search" placeholder="Search an industry, sector, business activity or expertise..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label><span className={styles.srOnly}>Industry</span><select value={industry} onChange={(event) => setIndustry(event.target.value)}><option value="">Industry</option>{items.map((item) => <option value={item.title} key={item.title}>{item.title}</option>)}</select></label>
          <label><span className={styles.srOnly}>Expertise</span><select value={expertise} onChange={(event) => setExpertise(event.target.value)}><option value="">Expertise</option>{expertiseOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span className={styles.srOnly}>Service</span><select value={service} onChange={(event) => setService(event.target.value)}><option value="">Service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span className={styles.srOnly}>Jurisdiction</span><select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}><option value="">Jurisdiction</option><option>India</option><option>International</option></select></label>
          <label><span className={styles.srOnly}>Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Location</option><option>India</option></select></label>
          <button className={styles.searchButton} type="submit">Find Professionals <Icon name="arrow" /></button>
        </form>
        <div className={styles.popular}><strong>Popular Industries:</strong>{popularIndustries.map(([label, name]) => <button className={industry === name ? styles.selectedPill : ""} type="button" key={name} onClick={() => applyFilters(undefined, name)}>{label}</button>)}</div>
      </div>
    </section>

    <section className={styles.industriesSection} id="industry-results" aria-labelledby="industries-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Explore Our Industry Expertise</span><h2 id="industries-title">21 Industries. Sector-Focused Professionals.</h2></div><p>Our professionals bring deep sector knowledge, regulatory understanding and multidisciplinary expertise across a wide range of industries.</p></div>
        {visibleIndustries.length > 0 ? <div className={styles.industryGrid}>{visibleIndustries.map((item) => <Link className={styles.industryCard} href={item.href} key={item.title}><Image src={item.image} alt={item.title} fill sizes="(max-width: 620px) 45vw, (max-width: 1000px) 25vw, 12vw" /><span>{item.title}</span></Link>)}</div> : <p className={styles.emptyResults} role="status">No industries match those filters. Adjust your selection and try again.</p>}
        {appliedFilters.query || appliedFilters.industry || appliedFilters.expertise || appliedFilters.service || appliedFilters.jurisdiction || appliedFilters.location ? <button className={styles.clearFilters} type="button" onClick={() => { setQuery(""); setIndustry(""); setExpertise(""); setService(""); setJurisdiction(""); setLocation(""); setAppliedFilters({ query: "", industry: "", expertise: "", service: "", jurisdiction: "", location: "" }); }}>Clear Filters</button> : null}
      </div>
    </section>
  </>;
}
