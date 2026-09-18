"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import type { industries } from "@/content/site";
import styles from "./by-industry.module.css";

type Industry = (typeof industries)[number];

export default function IndustryExplorer({ items }: { items: Industry[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [expanded, setExpanded] = useState(false);
  const matches = items.filter(item => (!selected || item.slug === selected) && item.title.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = expanded || selected || query ? matches : matches.slice(0, 8);

  return <>
    <div className={styles.filters}><label><span>Search industries</span><span className={styles.searchInput}><Icon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Search by industry" /></span></label><label><span>Choose an industry</span><select value={selected} onChange={event => setSelected(event.target.value)}><option value="">All industries</option>{items.map(item=><option value={item.slug} key={item.slug}>{item.title}</option>)}</select></label><button type="button" onClick={() => { setQuery(""); setSelected(""); setExpanded(false); }}>Reset filters</button></div>
    <div className={styles.resultsHeading}><strong>{matches.length} {matches.length === 1 ? "industry" : "industries"}</strong><span>Choose a sector to explore its advisory page.</span></div>
    {visible.length ? <div className={styles.industryGrid}>{visible.map(item=><Link href={`/industries/${item.slug}`} key={item.slug}><span className={styles.industryImage}><Image src={item.image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></span><span className={styles.industryName}>{item.title}<Icon name="arrow" /></span></Link>)}</div> : <p className={styles.empty}>No industries match that search. Try a broader term.</p>}
    {!expanded && !selected && !query && matches.length > visible.length && <button className={styles.moreButton} type="button" onClick={() => setExpanded(true)}>Show all industries <Icon name="arrow" /></button>}
  </>;
}
