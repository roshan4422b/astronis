"use client";
import { useState } from "react";
import Image from "@/app/_components/asset-image";
import { industries } from "@/content/site";
import { Heading, TextLink } from "../_components/ui";
type DirectoryIndustry = { slug: string; title: string; image: string };
export default function IndustryDirectory({ cmsIndustries = [] }: { cmsIndustries?: DirectoryIndustry[] }) {
  const [search, setSearch] = useState("");
  const merged = [...cmsIndustries, ...industries.filter((industry) => !cmsIndustries.some((item) => item.slug === industry.slug))];
  const results = merged.filter((industry) => industry.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="section industry-directory">
      <div className="container">
        <Heading
          title={`Explore ${merged.length} Industries`}
          text="Sector-focused legal, regulatory and business advisory for the markets and environments in which your organisation operates."
        />
        <div className="search-toolbar">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search industries…"
            aria-label="Search industries"
          />
        </div>
        <p className="industry-results-count" role="status">
          Showing {results.length} of {merged.length} industries
        </p>
        <div className="industry-directory-grid">
          {results.map((i) => (
            <article className="industry-directory-card" key={i.slug}>
              {i.image ? <div className="industry-directory-image">
                <Image
                  src={i.image}
                  alt={i.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
              </div> : null}
              <div className="industry-directory-body">
                <span className="industry-directory-number">
                  {String(merged.indexOf(i) + 1).padStart(2, "0")}
                </span>
                <h3>{i.title}</h3>
                <TextLink href={"/industries/" + i.slug}>
                  Explore industry
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
