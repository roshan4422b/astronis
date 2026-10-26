"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { matchesService, searchServiceHierarchy } from "@/data/service-search";
import ServiceCard from "./service-card";
import { ExpertiseBanner } from "./hub-sections";
import styles from "./hub.module.css";

const categories = ["All", "Corporate", "Regulatory", "Legal", "Compliance", "Transactions", "International", "Technology", "Risk"];
type CmsService = { slug: string; title: string; category: string };
export default function ServicesExplorer({ cmsServices = [] }: { cmsServices?: CmsService[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const cmsSlugs = new Set(cmsServices.map((item) => item.slug));
  const matches = services.filter(service => !cmsSlugs.has(service.canonicalSlug) && matchesService(service, query, category));
  const exactMatches = query.trim() ? searchServiceHierarchy(query) : [];
  const matchingCms = cmsServices.filter((item) => (category === "All" || item.category.toLowerCase() === category.toLowerCase()) && `${item.title} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  const serviceCategories = [...categories, ...new Set(cmsServices.map((item) => item.category).filter((item) => !categories.includes(item)))];
  const subServiceCount = services.reduce((count, service) => count + service.subServices.length, 0);
  const childServiceCount = services.reduce((count, service) => count + service.subServices.reduce((total, group) => total + group.children.length, 0), 0);
  return <section id="all-services" className={styles.directory} aria-labelledby="services-title"><div className="container">
    <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR SERVICE PORTFOLIO</span><h2 id="services-title">Find the expertise<br />you need.</h2></div><p>Explore {matches.length + matchingCms.length} main services, {subServiceCount} sub-services and {childServiceCount} child services.<br />One connected perspective on your business.</p></div>
    <div className={styles.filters}><label htmlFor="hub-service-search">Search by service, regulation or business need</label><input id="hub-service-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try corporate structuring, DPDP, FEMA…" /><div className={styles.filterButtons} aria-label="Filter services">{serviceCategories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
    <p className={styles.result} role="status">{query.trim() ? `${exactMatches.length + matchingCms.length} matching services` : `${matches.length + matchingCms.length} main services in the approved portfolio`}</p>
    {query.trim() ? exactMatches.length || matchingCms.length ? <div className={styles.grid}>{exactMatches.map((result, index) => <Link className={styles.card} href={result.href} key={`${result.href}-${index}`}><div className={styles.cardBody}><h3>{result.title}</h3><p>{result.path}</p><span className={styles.cardAction}>Explore service <span aria-hidden="true">→</span></span></div></Link>)}{matchingCms.map((item) => <Link className={styles.card} href={`/services/${item.slug}`} key={item.slug}><div className={styles.cardBody}><h3>{item.title}</h3><p>{item.category}</p><span className={styles.cardAction}>Explore service <span aria-hidden="true">→</span></span></div></Link>)}</div> : <div className={styles.empty}><h3>No matching services</h3><p>Try a broader term or explore the complete portfolio.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear search</button></div> : matches.length || matchingCms.length ? <><div className={styles.grid}>{matches.slice(0, 6).map(service => <ServiceCard key={service.slug} service={service} />)}{matchingCms.map((item) => <Link className={styles.card} href={`/services/${item.slug}`} key={item.slug}><div className={styles.cardBody}><h3>{item.title}</h3><p>{item.category}</p><span className={styles.cardAction}>Explore service <span aria-hidden="true">→</span></span></div></Link>)}</div>{category === "All" && <ExpertiseBanner />}<div className={styles.grid}>{matches.slice(6).map(service => <ServiceCard key={service.slug} service={service} />)}</div></> : <div className={styles.empty}><h3>No matching services</h3><p>Choose another filter.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
  </div></section>;
}
