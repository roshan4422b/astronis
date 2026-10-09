"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services } from "@/data/services";
import { searchServiceHierarchy } from "@/data/service-search";
import Icon from "./icon";
import styles from "./services-menu.module.css";
import shared from "./industries-menu.module.css";
import { isRouteActive } from "./navigation-state";

export default function ServicesMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const term = query.trim().toLowerCase();
  const hierarchyMatches = term ? searchServiceHierarchy(term) : [];
  const matches = services.filter(service => `${service.title} ${service.shortDescription} ${service.subServices.flatMap(group => [group.title, ...group.children]).join(" ")}`.toLowerCase().includes(term));

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.body}>
      <div className={shared.main}>
        <div className={styles.columns}>
          {!term && matches.map(service => {
            const href = `/services/${service.canonicalSlug}`;
            return <section className={styles.column} key={service.slug} aria-label={service.title}>
              <div className={styles.groupHeading}><Icon name="building" /><div><h3><Link href={href} onClick={onNavigate}>{service.title}</Link></h3><p>{service.subServices.length} sub-services</p></div></div>
              <div className={styles.links}>{service.subServices.map(group => <Link href={`${href}#${group.slug}`} key={group.slug} onClick={onNavigate} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><span><strong>{group.title}</strong><small>{group.children.slice(0, 3).join(" · ")}</small></span><Icon name="arrow" /></Link>)}</div>
            </section>;
          })}
          {term && <><p className={styles.result} role="status">{hierarchyMatches.length ? `${hierarchyMatches.length} matching services` : "No matching services. Try another keyword."}</p>{hierarchyMatches.slice(0, 30).map((result, index) => <Link className={styles.column} href={result.href} onClick={onNavigate} key={`${result.href}-${index}`}><div className={styles.groupHeading}><Icon name="file" /><div><h3>{result.title}</h3><p>{result.path}</p></div></div></Link>)}</>}
        </div>
        <div className={shared.footer}>
          <span><Icon name="file" /><strong>{services.length}</strong> Main Services</span>
          <span><Icon name="people" /><strong>Integrated</strong> Expertise</span>
          <span><Icon name="globe" /><strong>Cross-border</strong> Perspective</span>
          <span className={shared.footerStatement}>Complex challenges.<br />Practical solutions.</span>
        </div>
      </div>
      <aside className={shared.sidebar} aria-label="Find the right service">
        <span className={shared.sidebarEyebrow}>CONNECTED EXPERTISE</span>
        <h2>Find Your<br /><em>Service.</em></h2>
        <p>Search by service, issue, regulator or business need.</p>
        <div className={shared.search}><input id="service-menu-search" aria-label="Search services in menu" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search services..." /><Icon name="search" /></div>
        <div className={shared.quickLinks}>
          <Link href="/services" onClick={onNavigate} className={isRouteActive(pathname, "/services") ? "active-submenu-item" : undefined}><Icon name="file" /><span><strong>Explore All Services</strong><small>View all {services.length} approved main services</small></span><Icon name="arrow" /></Link>
          <Link href="/insights" onClick={onNavigate}><Icon name="bulb" /><span><strong>Service Insights</strong><small>Articles, guides and publications</small></span><Icon name="arrow" /></Link>
          <Link href="/professionals" onClick={onNavigate}><Icon name="people" /><span><strong>Find a Professional</strong><small>Connect with our experts</small></span><Icon name="arrow" /></Link>
        </div>
        <div className={shared.sidebarBottom}><Icon name="globe" /><span>AN INTEGRATED PERSPECTIVE.<br /><strong>Practical advice.</strong></span></div>
      </aside>
    </div>
  </div>;
}
