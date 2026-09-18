"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { professionals } from "../leadership";
import styles from "./legal-professionals.module.css";

const focus: Record<string, string[]> = {
  "krishna-kumar-mishra": ["corporate", "commercial", "disputes", "regulatory"],
  "priti-mishra": ["litigation", "family", "matrimonial", "compliance"],
  "krishna-nand-mishra": ["legal-advisory", "regulatory"],
  "puneet-kumar-verma": ["legal-advisory", "regulatory"],
};

export default function LegalDirectory() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [matter, setMatter] = useState("");
  const [location, setLocation] = useState("");
  const visible = professionals.filter((person) => {
    const terms = `${person.name} ${person.role} ${person.expertise} ${person.description}`.toLowerCase();
    const tags = focus[person.slug] ?? [];
    return terms.includes(query.trim().toLowerCase()) && (!area || tags.includes(area)) && (!matter || tags.includes(matter)) && (!location || location === "delhi");
  });
  function reset() { setQuery(""); setArea(""); setMatter(""); setLocation(""); }

  return <>
    <section className={styles.find} id="find" aria-labelledby="find-title"><div className={styles.findIntro}><h2 id="find-title">Find a Legal Professional</h2><p>Search our published profiles by name, practice focus or location.</p></div>
      <div className={styles.filters}>
        <label className={styles.searchField}><span className={styles.srOnly}>Search by name</span><Icon name="search" /><input type="search" placeholder="Search by name" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label><span className={styles.srOnly}>Practice area</span><select value={area} onChange={(event) => setArea(event.target.value)}><option value="">Practice Area</option><option value="corporate">Corporate advisory</option><option value="commercial">Commercial matters</option><option value="litigation">Litigation</option><option value="family">Family matters</option><option value="legal-advisory">Legal advisory</option></select></label>
        <label><span className={styles.srOnly}>Matter type</span><select value={matter} onChange={(event) => setMatter(event.target.value)}><option value="">Matter Type</option><option value="disputes">Dispute resolution</option><option value="matrimonial">Matrimonial matters</option><option value="regulatory">Regulatory matters</option><option value="compliance">Compliance</option></select></label>
        <label><span className={styles.srOnly}>Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Location</option><option value="delhi">New Delhi</option></select></label>
        <a className={styles.searchButton} href="#legal-professionals">View Results <Icon name="arrow" /></a>
        <button className={styles.reset} type="button" onClick={reset}>↻ <span>Reset Filters</span></button>
      </div>
    </section>
    <section className={styles.peopleSection} id="legal-professionals" aria-labelledby="people-title"><div className={styles.sectionHeading}><h2 id="people-title">Our Legal Professionals</h2><span role="status">{visible.length} {visible.length === 1 ? "profile" : "profiles"}</span></div>
      {visible.length ? <div className={styles.peopleGrid}>{visible.map((person) => <article className={styles.personCard} key={person.slug}><Link className={styles.portrait} href={`/professionals/${person.slug}`}><Image src={person.image} alt={person.name} fill sizes="(max-width: 640px) 50vw, (max-width: 900px) 25vw, 20vw" /></Link><div className={styles.cardBody}><h3>{person.name}</h3><span className={styles.role}>{person.role}</span><p>{person.expertise}</p><span className={styles.location}><Icon name="pin" />New Delhi</span><Link className={styles.profileLink} href={`/professionals/${person.slug}`}>View Profile <Icon name="arrow" /></Link></div></article>)}</div> : <div className={styles.noResults}>No published profiles match those filters. <button type="button" onClick={reset}>Clear filters</button> or <Link href="/professionals/enquiry">contact our team</Link>.</div>}
    </section>
  </>;
}
