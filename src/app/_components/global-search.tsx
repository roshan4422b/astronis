"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchSite } from "@/data/global-search";
import styles from "./global-search.module.css";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const results = searchSite(debouncedQuery).slice(0, 9);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  const submit = () => { if (query.trim()) { setOpen(false); router.push(`/search?q=${encodeURIComponent(query.trim())}`); } };
  const selectResult = (title: string) => { setOpen(false); if (title === "Schedule a Meeting") window.setTimeout(() => window.dispatchEvent(new Event("astronis:open-scheduler")), 350); };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); setActive((n) => Math.min(n + 1, results.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((n) => Math.max(n - 1, 0)); }
    if (event.key === "Enter") { event.preventDefault(); if (open && active >= 0 && results[active]) { router.push(results[active].href); selectResult(results[active].title); } else submit(); setOpen(false); }
  };
  return <section className={styles.searchBand} aria-label="Site search"><div className={styles.searchWrap} ref={root}>
    <form className={styles.inputShell} role="search" onSubmit={(event) => { event.preventDefault(); submit(); }}>
      <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
      <input role="combobox" aria-label="Search Astronis Global" aria-expanded={open && !!query} aria-controls="global-search-results" aria-autocomplete="list" placeholder="Search services, industries, professionals, forms & more..." value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(-1); }} onFocus={() => query && setOpen(true)} onKeyDown={onKeyDown} />
      {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); setOpen(false); setActive(-1); }}>×</button>}
    </form>
    {open && query.trim() && <div className={styles.dropdown} id="global-search-results" role="listbox" aria-label="Search suggestions" aria-live="polite">
      {results.length ? results.map((result, index) => <Link key={`${result.href}-${result.title}`} role="option" aria-selected={active === index} className={styles.result} href={result.href} onClick={() => selectResult(result.title)}>
        <span className={styles.resultText}><small>{result.category}</small><strong>{result.title}</strong>{result.description && <span>{result.description}</span>}</span><span aria-hidden="true" className={styles.arrow}>↗</span>
      </Link>) : <p className={styles.empty} role="status">No matches found. Try another term.</p>}
      <Link className={styles.viewAll} href={`/search?q=${encodeURIComponent(query.trim())}`} onClick={() => setOpen(false)}>View all results <span aria-hidden="true">→</span></Link>
    </div>}
  </div></section>;
}
