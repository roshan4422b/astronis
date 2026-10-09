"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import type { professionals } from "../leadership";
import styles from "../advisory-professionals.module.css";

type Person = (typeof professionals)[number];

export default function AdvisorDirectory({ people }: { people: Person[] }) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("");
  const [location, setLocation] = useState("");
  const visible = people.filter((person) => {
    const text = `${person.name} ${person.expertise} ${person.description}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (!focus || text.includes(focus)) && (!location || location === "delhi");
  });
  function reset() { setQuery(""); setFocus(""); setLocation(""); }

  return <section className={styles.directory} id="find" aria-labelledby="find-title">
    <div className={styles.directoryHeading}><h2 id="find-title">Find a Business & Financial Advisor</h2><p>Search published profiles by name, expertise or location.</p></div>
    <div className={styles.filters}>
      <label><span className={styles.srOnly}>Search by name</span><span className={styles.searchInput}><Icon name="search" /><input type="search" placeholder="Search by name" value={query} onChange={(event) => setQuery(event.target.value)} /></span></label>
      <label><span className={styles.srOnly}>Area of expertise</span><select value={focus} onChange={(event) => setFocus(event.target.value)}><option value="">Area of Expertise</option><option value="business">Business advisory</option><option value="corporate">Corporate advisory</option><option value="regulatory">Regulatory advisory</option><option value="commercial">Commercial advisory</option></select></label>
      <label><span className={styles.srOnly}>Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Location</option><option value="delhi">New Delhi</option></select></label>
      <a className={styles.searchButton} href="#advisors">View Advisors <Icon name="arrow" /></a>
      <button className={styles.resetButton} type="button" onClick={reset}>↻ Reset Filters</button>
    </div>
    <div className={styles.results} id="advisors"><div><span className={styles.eyebrow}>Meet our team</span><h2>Our Business & Financial Advisory Professionals</h2></div><span role="status">{visible.length} {visible.length === 1 ? "profile" : "profiles"}</span></div>
    {visible.length ? <div className={styles.peopleGrid}>{visible.map((person) => <article className={styles.personCard} key={person.slug}><Link className={styles.portrait} href={`/professionals/${person.slug}`}><Image src={person.image} alt={person.name} fill sizes="(max-width: 650px) 50vw, 24vw" /></Link><div className={styles.personBody}><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><small><Icon name="pin" />New Delhi</small><Link href={`/professionals/${person.slug}`}>View Profile <Icon name="arrow" /></Link></div></article>)}</div> : <p className={styles.empty}>No published profiles match those filters. <button type="button" onClick={reset}>Clear filters</button> or <Link href="/professionals/enquiry">contact our team</Link>.</p>}
  </section>;
}
