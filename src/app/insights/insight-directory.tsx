"use client";
import { useState } from "react";
import { siteMenu, slugify } from "@/content/site";
import { TextLink } from "../_components/ui";
const entries = siteMenu.insights.map((title) => ({
  title,
  category: ["Articles", "Blogs", "White Papers", "Downloads"].includes(title)
    ? "Publications"
    : ["Case Studies", "Success Stories"].includes(title)
      ? "Case Studies"
      : "Updates & Resources",
  href:
    title === "FAQs"
      ? "/faqs"
      : ["Case Studies", "Success Stories"].includes(title)
        ? "/success-stories"
        : "/insights/" + slugify(title),
}));
export default function InsightDirectory() {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("All");
  const filtered = entries.filter(
    (e) =>
      (category === "All" || e.category === category) &&
      e.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="section">
      <div className="container">
        <div className="search-toolbar">
          <input
            type="search"
            aria-label="Search insights and resources"
            placeholder="Search insights and resources…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["All", "Publications", "Case Studies", "Updates & Resources"].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </div>
        <p role="status" style={{ marginBottom: 25 }}>
          {filtered.length} resource categories
        </p>
        <div className="directory-grid">
          {filtered.map((e) => (
            <article className="directory-card" key={e.title}>
              <span className="eyebrow">{e.category}</span>
              <h2 style={{ marginTop: 12 }}>{e.title}</h2>
              <TextLink href={e.href}>Explore</TextLink>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <h3>No matching resources</h3>
            <p>Try a different search term or category.</p>
            <button
              className="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
