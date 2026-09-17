"use client";

import { useState } from "react";
import Link from "next/link";
import { industries } from "@/content/site";
import Icon from "./icon";
import styles from "./industries-menu.module.css";

const groups = [
  { title: "Financial & Professional", caption: "Capital. Trust. Expertise.", icon: "chart", names: ["Financial Services", "FinTech & Digital Finance", "Professional & Business Services", "Real Estate & Construction"] },
  { title: "Technology & Innovation", caption: "Ideas. Platforms. Transformation.", icon: "bulb", names: ["IT & ITES", "Artificial Intelligence", "Startups", "Media & Entertainment", "Telecommunications"] },
  { title: "Industrial & Infrastructure", caption: "Build. Operate. Sustain.", icon: "building", names: ["Manufacturing", "Automotive & Mobility", "Infrastructure", "Renewable Energy", "Aviation, Aerospace & Defence", "Logistics", "Mining, Metals & Natural Resources", "Agriculture & Agri-Business"] },
  { title: "Consumer & People", caption: "People. Markets. Opportunities.", icon: "people", names: ["Retail & Consumer", "E-Commerce", "Healthcare & Pharma", "Education", "Hospitality", "Textiles, Apparel & Lifestyle", "Government & Public Sector"] },
] as const;

const descriptions: Record<string, string> = {
  "Financial Services": "Banking · NBFCs · Insurance",
  "FinTech & Digital Finance": "Digital lending · Payments · RegTech",
  "Professional & Business Services": "Consulting · Professional firms",
  "Real Estate & Construction": "Projects · RERA · Development",
  "IT & ITES": "Software · Platforms · Digital business",
  "Artificial Intelligence": "AI solutions · Governance",
  Startups: "Founders · Investment · Growth",
  "Media & Entertainment": "Broadcasting · Digital media",
  Telecommunications: "Connectivity · Digital infrastructure",
  Manufacturing: "Industry · Operations · Growth",
  "Automotive & Mobility": "OEMs · Components · Mobility",
  Infrastructure: "Projects · Development · Delivery",
  "Renewable Energy": "Power · Clean energy · Transition",
  "Aviation, Aerospace & Defence": "Aviation · Aerospace · Defence",
  Logistics: "Transport · Warehousing · Supply chains",
  "Mining, Metals & Natural Resources": "Resources · Metals · Operations",
  "Agriculture & Agri-Business": "Agriculture · Food systems",
  "Retail & Consumer": "Retail · FMCG · Consumer products",
  "E-Commerce": "Marketplaces · Online commerce",
  "Healthcare & Pharma": "Healthcare · Pharma · Life sciences",
  Education: "Education · EdTech · Learning",
  Hospitality: "Hotels · Travel · Tourism",
  "Textiles, Apparel & Lifestyle": "Textiles · Apparel · Manufacturing",
  "Government & Public Sector": "Public institutions · Governance",
};

export default function IndustriesMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const matches = (name: string) => !term || `${name} ${descriptions[name]}`.toLowerCase().includes(term);
  const resultCount = industries.filter((industry) => matches(industry.title)).length;

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.main}>
      <div className={styles.heading}>
        <h2>Our Industries</h2>
        <p>Sector-focused insight. Integrated advisory capability.</p>
        <Link href="/industries" onClick={onNavigate}>Explore All Industries <Icon name="arrow" /></Link>
      </div>
      <div className={styles.columns}>
        {groups.map((group) => <section className={styles.column} key={group.title} aria-label={group.title}>
          <div className={styles.groupHeading}><Icon name={group.icon} /><div><h3>{group.title}</h3><p>{group.caption}</p></div></div>
          <div className={styles.links}>
            {group.names.filter(matches).map((name) => {
              const industry = industries.find((item) => item.title === name);
              if (!industry) return null;
              return <Link href={`/industries/${industry.slug}`} key={industry.slug} onClick={onNavigate}>
                <span><strong>{name}</strong><small>{descriptions[name]}</small></span><Icon name="arrow" />
              </Link>;
            })}
          </div>
        </section>)}
      </div>
      {term && <p className={styles.result} role="status">{resultCount ? `${resultCount} matching industries` : "No matching industries. Try another keyword."}</p>}
      <div className={styles.footer}>
        <span><Icon name="globe" /><strong>{industries.length}</strong> Industry Verticals</span>
        <span><Icon name="people" /><strong>Multi-sector</strong> Advisory Expertise</span>
        <span><Icon name="shield" /><strong>Trusted Partner</strong> Since 2015</span>
        <Link href="/contact" onClick={onNavigate}>Complex industries. Practical solutions. <Icon name="arrow" /></Link>
      </div>
    </div>
    <aside className={styles.sidebar} aria-label="Find your industry">
      <h2>Find Your Industry</h2>
      <p>Search industries, sectors or keywords</p>
      <div className={styles.search}><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search industries or sectors..." aria-label="Search industries in menu" /><Icon name="search" /></div>
      <div className={styles.quickLinks}>
        <Link href="/industries" onClick={onNavigate}><Icon name="globe" /><span><strong>Explore All Industries</strong><small>View complete industry directory</small></span><Icon name="arrow" /></Link>
        <Link href="/insights" onClick={onNavigate}><Icon name="file" /><span><strong>Industry Insights</strong><small>Articles, guides and publications</small></span><Icon name="arrow" /></Link>
        <Link href="/insights/legal-updates" onClick={onNavigate}><Icon name="document" /><span><strong>Regulatory Updates</strong><small>Latest developments by sector</small></span><Icon name="arrow" /></Link>
        <Link href="/professionals" onClick={onNavigate}><Icon name="search" /><span><strong>Find a Professional</strong><small>Connect with our experts</small></span><Icon name="arrow" /></Link>
      </div>
      <Link className={styles.contact} href="/contact" onClick={onNavigate}><Icon name="mail" /><span><strong>Discuss Your Industry Requirement</strong><small>Get tailored advisory support</small></span><Icon name="arrow" /></Link>
      <div className={styles.sidebarBottom}><span>GLOBAL PERSPECTIVE.<br />INDUSTRY FOCUS.</span></div>
    </aside>
  </div>;
}
