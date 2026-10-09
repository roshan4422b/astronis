"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import styles from "./page.module.css";

const categories = ["All", "Articles", "Regulatory Updates", "Market Insights", "Jurisdiction Guides", "Events", "Publications"] as const;
export const globalPresenceInsights = [
  { title: "EU Regulatory Trends: Key Developments for Global Businesses", date: "12 Sep 2026", category: "Regulatory Update", description: "An overview of recent regulatory changes in the European Union and their potential impact on international businesses.", href: "/global-presence/european-union", image: "europe" },
  { title: "UAE: A Strategic Gateway for Global Investment", date: "05 Sep 2026", category: "Market Insight", description: "Key opportunities, legal considerations and sectoral outlook for businesses expanding in the UAE.", href: "/global-presence/uae", image: "uae" },
  { title: "India–Middle East Trade Corridor: Opportunities and Challenges", date: "28 Aug 2026", category: "Trade & Policy", description: "How evolving trade dynamics are creating new avenues for cooperation between India and the Middle East.", href: "/global-presence/middle-east", image: "trade" },
  { title: "Cross-Border Regulatory Support", date: "", category: "Regulatory Updates", description: "Understand the services available for foreign exchange, investment and cross-border matters.", href: "/services/fema-fdi-and-foreign-exchange-advisory", image: "regulation" },
  { title: "Preparing Your Business for Due Diligence", date: "", category: "Articles", description: "Approach transaction discussions with a more organised information process.", href: "/insights/preparing-business-for-due-diligence", image: "diligence" },
  { title: "Events, Seminars & Webinars", date: "", category: "Events", description: "Find discussions and updates from across the Astronis Global community.", href: "/media", image: "eventsImage" },
  { title: "Business Guides & Downloads", date: "", category: "Publications", description: "Browse practical resources for planning your next business decision.", href: "/resources", image: "publicationsImage" },
] as const;

export default function IdeasDirectory() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const filtered = globalPresenceInsights.filter((card) => (category === "All" || card.category === category) && `${card.title} ${card.description} ${card.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = category === "All" && !query.trim() ? filtered.slice(0, 3) : filtered;

  return <>
    <div className={styles.toolbar}><div className={styles.toolbarInner}><div className={styles.tabs} role="group" aria-label="Filter insights by category">{categories.map((item) => <button type="button" key={item} className={category === item ? styles.selected : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className={styles.search}><span className={styles.srOnly}>Search insights</span><input type="search" placeholder="Search insights..." value={query} onChange={(event) => setQuery(event.target.value)} /><Icon name="search" /></label></div></div>
    <section className={styles.featured} id="featured"><div className={styles.sectionHeading}><h2>{category === "All" ? "Featured Insights" : category}</h2><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div><div className={styles.cardGrid}>{visible.map((card) => <Link href={card.href} key={card.title} className={styles.card}><span className={`${styles.cardImage} ${styles[card.image]}`} aria-hidden="true" /><span className={styles.cardBody}><small>{card.date && <>{card.date}<span aria-hidden="true">　|　</span></>}{card.category}</small><strong>{card.title}</strong><span>{card.description}</span><em>Read More <Icon name="arrow" /></em></span></Link>)}</div>{visible.length === 0 && <div className={styles.empty} role="status">No matching insights found. Try another category or search term.</div>}</section>
  </>;
}
