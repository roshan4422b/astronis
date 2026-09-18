"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import styles from "./page.module.css";

const categories = ["All", "Articles", "Regulatory Updates", "Market Insights", "Jurisdiction Guides", "Events", "Publications"] as const;
const cards = [
  { title: "Exploring European Markets", category: "Jurisdiction Guides", description: "Navigate the European business and regulatory landscape with a connected perspective.", href: "/global-presence/eu", image: "europe" },
  { title: "UAE: A Strategic Gateway", category: "Market Insights", description: "Explore opportunities and considerations for businesses looking towards the UAE.", href: "/global-presence/uae", image: "uae" },
  { title: "Aligning Joint Venture Partners Before the Deal", category: "Articles", description: "Build a shared commercial understanding around objectives, contributions and decisions.", href: "/insights/aligning-joint-venture-partners", image: "trade" },
  { title: "Cross-Border Regulatory Support", category: "Regulatory Updates", description: "Understand the services available for foreign exchange, investment and cross-border matters.", href: "/services/fema-fdi-and-foreign-exchange-advisory", image: "regulation" },
  { title: "Preparing Your Business for Due Diligence", category: "Articles", description: "Approach transaction discussions with a more organised information process.", href: "/insights/preparing-business-for-due-diligence", image: "diligence" },
  { title: "Events, Seminars & Webinars", category: "Events", description: "Find discussions and updates from across the Astronis Global community.", href: "/media", image: "eventsImage" },
  { title: "Business Guides & Downloads", category: "Publications", description: "Browse practical resources for planning your next business decision.", href: "/resources", image: "publicationsImage" },
] as const;

export default function IdeasDirectory() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const filtered = cards.filter((card) => (category === "All" || card.category === category) && `${card.title} ${card.description} ${card.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  const visible = category === "All" && !query.trim() ? filtered.slice(0, 3) : filtered;

  return <>
    <div className={styles.toolbar}><div className={styles.toolbarInner}><div className={styles.tabs} role="group" aria-label="Filter insights by category">{categories.map((item) => <button type="button" key={item} className={category === item ? styles.selected : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className={styles.search}><span className={styles.srOnly}>Search insights</span><input type="search" placeholder="Search insights..." value={query} onChange={(event) => setQuery(event.target.value)} /><Icon name="search" /></label></div></div>
    <section className={styles.featured} id="featured"><div className={styles.sectionHeading}><h2>{category === "All" ? "Featured Insights" : category}</h2><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div><div className={styles.cardGrid}>{visible.map((card) => <Link href={card.href} key={card.title} className={styles.card}><span className={`${styles.cardImage} ${styles[card.image]}`} aria-hidden="true" /><span className={styles.cardBody}><small>{card.category}</small><strong>{card.title}</strong><span>{card.description}</span><em>Explore <Icon name="arrow" /></em></span></Link>)}</div>{visible.length === 0 && <div className={styles.empty} role="status">No matching insights found. Try another category or search term.</div>}</section>
  </>;
}
