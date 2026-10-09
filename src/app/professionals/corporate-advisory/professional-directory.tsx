"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import type { professionals } from "../leadership";
import styles from "./corporate-advisory.module.css";

type Person = (typeof professionals)[number];

export default function ProfessionalDirectory({ people }: { people: Person[] }) {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState("");
  const [location, setLocation] = useState("");
  const visible = people.filter(person => {
    const text = `${person.name} ${person.role} ${person.expertise} ${person.description}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (!focus || text.includes(focus)) && (!location || location === "delhi");
  });
  function reset() { setQuery(""); setFocus(""); setLocation(""); }

  return <>
    <div className={styles.searchBar}><label><span>Search by name</span><span className={styles.searchInput}><Icon name="search" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search professionals" /></span></label><label><span>Area of expertise</span><select value={focus} onChange={event => setFocus(event.target.value)}><option value="">All expertise</option><option value="corporate">Corporate advisory</option><option value="regulatory">Regulatory advisory</option><option value="compliance">Compliance</option><option value="litigation">Litigation & disputes</option><option value="business">Business advisory</option></select></label><label><span>Location</span><select value={location} onChange={event => setLocation(event.target.value)}><option value="">All locations</option><option value="delhi">New Delhi</option></select></label><a className={styles.searchSubmit} href="#profiles">View Results <Icon name="arrow" /></a><button type="button" onClick={reset}>Reset filters</button></div>
    <div className={styles.resultsHeading} id="profiles"><div><span className={styles.eyebrow}>Meet our team</span><h3>Our Corporate & Regulatory Professionals</h3></div><span role="status">{visible.length} {visible.length === 1 ? "profile" : "profiles"}</span></div>
    {visible.length ? <div className={styles.peopleGrid}>{visible.map(person => <article key={person.slug} className={styles.personCard}><Link href={`/professionals/${person.slug}`} className={styles.personImage}><Image src={person.image} alt={person.name} fill sizes="(max-width: 650px) 50vw, 25vw" /></Link><div><h4>{person.name}</h4><span>{person.role}</span><p>{person.expertise}</p><small><Icon name="pin" />New Delhi, India</small><Link href={`/professionals/${person.slug}`}>View profile <Icon name="arrow" /></Link></div></article>)}</div> : <p className={styles.empty}>No published profiles match those filters. Try a broader search or <Link href="/professionals/enquiry">contact our team</Link>.</p>}
  </>;
}
