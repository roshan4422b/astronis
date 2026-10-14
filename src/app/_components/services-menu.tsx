"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services } from "@/data/services";
import Icon from "./icon";
import styles from "./services-menu.module.css";
import shared from "./industries-menu.module.css";
import { isRouteActive } from "./navigation-state";

export default function ServicesMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const term = query.trim().toLowerCase();
  const matches = services.filter(service => `${service.title} ${service.shortDescription}`.toLowerCase().includes(term));

  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.body}>
      <div className={shared.main}>
        <div className={styles.columns}>
          {matches.map(service => {
            const href = `/services/${service.canonicalSlug}`;
            return <Link href={href} key={service.canonicalSlug} onClick={onNavigate} className={`${styles.service} ${isRouteActive(pathname, href) ? "active-submenu-item" : ""}`}>
              <span className={styles.serviceIcon} aria-hidden="true"><Icon name={service.icon} /></span>
              <span className={styles.copy}><strong>{service.title}</strong><small>{service.shortDescription}</small></span>
              <Icon name="arrow" />
            </Link>;
          })}
          {term && <p className={styles.result} role="status">{matches.length ? `${matches.length} matching main services` : "No matching main services. Try another keyword."}</p>}
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
        <p>Search across our main services.</p>
        <div className={shared.search}><input id="service-menu-search" aria-label="Search main services in menu" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search services..." /><Icon name="search" /></div>
        <div className={shared.quickLinks}>
          <Link href="/services" onClick={onNavigate} className={`${styles.quickLink} ${isRouteActive(pathname, "/services") ? "active-submenu-item" : ""}`}><Icon name="file" /><span><strong>Explore All Services</strong><small>View all {services.length} approved main services</small></span><Icon name="arrow" /></Link>
          <Link href="/insights" onClick={onNavigate} className={styles.quickLink}><Icon name="bulb" /><span><strong>Service Insights</strong><small>Articles, guides and publications</small></span><Icon name="arrow" /></Link>
          <Link href="/professionals" onClick={onNavigate} className={styles.quickLink}><Icon name="people" /><span><strong>Find a Professional</strong><small>Connect with our experts</small></span><Icon name="arrow" /></Link>
        </div>
        <div className={shared.sidebarBottom}><Icon name="globe" /><span>AN INTEGRATED PERSPECTIVE.<br /><strong>Practical advice.</strong></span></div>
      </aside>
    </div>
  </div>;
}
