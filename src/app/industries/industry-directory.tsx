"use client";
import { useState } from "react";
import Image from "@/app/_components/asset-image";
import { industries } from "@/content/site";
import { TextLink } from "../_components/ui";
export default function IndustryDirectory() {
  const [search, setSearch] = useState("");
  const results = industries.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="section">
      <div className="container">
        <div className="search-toolbar">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search industries…"
            aria-label="Search industries"
          />
        </div>
        <p role="status" style={{ marginBottom: 22 }}>
          {results.length} industries
        </p>
        <div className="directory-grid">
          {results.map((i) => (
            <article className="insight-card" key={i.slug}>
              <div className="card-image">
                <Image
                  src={i.image}
                  alt={i.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="card-body">
                <h3>{i.title}</h3>
                <TextLink href={"/industries/" + i.slug}>
                  Explore Industry
                </TextLink>
              </div>
            </article>
          ))}
        </div>
        {!results.length && (
          <div className="empty-state">
            <h3>No matching industries</h3>
            <p>
              Try another search or contact our team to discuss your sector.
            </p>
            <button className="button" onClick={() => setSearch("")}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
