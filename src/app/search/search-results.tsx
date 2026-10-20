"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { searchSite, type SearchCategory } from "@/data/global-search";
import styles from "./search-results.module.css";

const filters: { value: "All" | SearchCategory; label: string }[] = [
  { value: "All", label: "All" }, { value: "Service", label: "Services" }, { value: "Industry", label: "Industries" },
  { value: "Professional", label: "Professionals" }, { value: "Form", label: "Forms" }, { value: "Agreement", label: "Agreements" },
  { value: "Insight", label: "Insights" }, { value: "Other", label: "Other" },
];

export default function SearchResults({ query }: { query: string }) {
  const [category, setCategory] = useState("All");
  const results = useMemo(() => searchSite(query, category), [query, category]);
  return <section className={styles.page}><div className="container">
    <span className="eyebrow">ASTRONIS GLOBAL SEARCH</span><h1>Search results</h1>
    {query.trim() ? <p className={styles.summary}>Showing <strong>{results.length}</strong> {results.length === 1 ? "result" : "results"} for <strong>“{query}”</strong></p> : <p className={styles.summary}>Enter a search term to explore services, industries, professionals and resources.</p>}
    <div className={styles.filters} aria-label="Filter results by category">{filters.map((item) => <button type="button" key={item.value} aria-pressed={category === item.value} onClick={() => setCategory(item.value)}>{item.label}</button>)}{category !== "All" && <button type="button" className={styles.clear} onClick={() => setCategory("All")}>Clear filters</button>}</div>
    <div className={styles.results} aria-live="polite">{results.length ? results.map((entry) => <Link className={styles.card} href={entry.href} key={`${entry.href}:${entry.title}`} onClick={() => { if (entry.title === "Schedule a Meeting") window.setTimeout(() => window.dispatchEvent(new Event("astronis:open-scheduler")), 350); }}><span>{entry.category}</span><h2>{entry.title}</h2>{entry.description && <p>{entry.description}</p>}<b aria-hidden="true">↗</b></Link>) : <div className={styles.noResults}><h2>{query.trim() ? "No matching results" : "Start with a search"}</h2><p>{query.trim() ? "Try a broader term or clear the category filter." : "Use the search field above to find a page or service."}</p></div>}</div>
  </div></section>;
}
