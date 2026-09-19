"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./icon";
import styles from "./technology-menu.module.css";
import { digitalBusinessPath, digitalSolutions } from "@/content/digital-solutions";
import { regtechPath, regtechSolutions } from "@/content/regtech-solutions";

const columns = [
  { title: "Digital Business Solutions", icon: "laptop", links: ["Digital Transformation", "Business Process Digitisation", "Digital Operating Models", "Workflow Solutions", "Client & Enterprise Portals", "Cloud & Collaboration Solutions", "Cybersecurity Readiness"] },
  { title: "RegTech & Compliance Technology", icon: "shield", links: ["Compliance Management", "Regulatory Monitoring & Alerts", "Compliance Calendar", "Licensing & Approval Tracking", "Policy & Regulatory Intelligence", "Risk & Governance Technology", "ESG & Sustainability Tools"] },
  { title: "Legal Technology", icon: "file", links: ["Contract Lifecycle Management", "Document Management", "Matter / Case Management", "Legal Workflow Automation", "e-Discovery & Evidence Management", "Knowledge Management", "AI-Assisted Legal Research"] },
  { title: "Data, AI & Automation", icon: "network", links: ["Artificial Intelligence Solutions", "Data Analytics & Visualisation", "Intelligent Automation (RPA)", "Predictive Insights", "Regulatory Data Intelligence", "Business Intelligence Dashboards", "Process Optimisation"] },
];

const explore = [
  ["Explore All Solutions", "/technology-and-digital-solutions"],
  ["Technology Insights", "/insights"],
  ["Digital Transformation", `${digitalBusinessPath}#digital-transformation`],
  ["Global Best Practices", "/global-presence"],
  ["Industries We Serve", "/industries"],
  ["Our Professionals", "/professionals"],
  ["Discuss Your Requirement", "/contact"],
];
const shortcuts = [
  ["gear", "Technology Insights", "/insights"],
  ["people", "Industries", "/industries"],
  ["person", "Our Professionals", "/professionals"],
  ["message", "Discuss Your Requirement", "/contact"],
];

const descriptions: Record<string, string> = {
  "Digital Transformation": "Modernise your business.",
  "Business Process Digitisation": "Move processes online.",
  "Digital Operating Models": "Build connected operations.",
  "Workflow Solutions": "Streamline everyday tasks.",
  "Client & Enterprise Portals": "Connect teams and clients.",
  "Cloud & Collaboration Solutions": "Work together securely.",
  "Cybersecurity Readiness": "Prepare for cyber threats.",
  "Compliance Management": "Track your obligations.",
  "Regulatory Monitoring & Alerts": "Stay ahead of changes.",
  "Compliance Calendar": "Keep deadlines in view.",
  "Licensing & Approval Tracking": "Monitor every approval.",
  "Policy & Regulatory Intelligence": "Understand policy impacts.",
  "Risk & Governance Technology": "Strengthen risk oversight.",
  "ESG & Sustainability Tools": "Measure sustainable progress.",
  "Contract Lifecycle Management": "Manage every contract stage.",
  "Document Management": "Organise and retrieve files.",
  "Matter / Case Management": "Keep casework connected.",
  "Legal Workflow Automation": "Simplify legal processes.",
  "e-Discovery & Evidence Management": "Find and organise evidence.",
  "Knowledge Management": "Make expertise accessible.",
  "AI-Assisted Legal Research": "Accelerate legal discovery.",
  "Artificial Intelligence Solutions": "Apply AI to business needs.",
  "Data Analytics & Visualisation": "Turn data into clear insights.",
  "Intelligent Automation (RPA)": "Automate repetitive tasks.",
  "Predictive Insights": "Anticipate emerging trends.",
  "Regulatory Data Intelligence": "Analyse compliance data.",
  "Business Intelligence Dashboards": "See performance at a glance.",
  "Process Optimisation": "Improve operational efficiency.",
  "Explore All Solutions": "Discover digital capabilities.",
  "Technology Insights": "Explore ideas and updates.",
  "Global Best Practices": "Learn from global experience.",
  "Industries We Serve": "Find sector-focused support.",
  "Industries": "Find sector-focused support.",
  "Our Professionals": "Meet our advisory experts.",
  "Discuss Your Requirement": "Talk through your next step.",
};

function solutionHref(title: string) {
  if (title === "RegTech & Compliance Technology") return regtechPath;
  const regtechSolution = regtechSolutions.find((solution) => solution.title === title);
  if (regtechSolution) return `${regtechPath}#${regtechSolution.id}`;
  if (title === "Digital Business Solutions") return digitalBusinessPath;
  const digitalSolution = digitalSolutions.find((solution) => solution.title === title);
  if (digitalSolution) return `${digitalBusinessPath}#${digitalSolution.id}`;
  return `/technology-and-digital-solutions?solution=${encodeURIComponent(title)}#enquiry`;
}

export default function TechnologyMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matches = (title: string) => `${title} ${descriptions[title]}`.toLowerCase().includes(search);
  const count = columns.reduce((total, column) => total + column.links.filter(matches).length, 0);

  return (
    <div className={`mega-menu ${styles.menu}`} id={id}>
      <div className={styles.intro}>
        <div><h2>Technology &amp; Digital Solutions</h2><p>Leveraging technology for smarter legal, regulatory and business outcomes.</p></div>
        <span className={styles.motto}>People. Process. Technology.<br />A stronger tomorrow.</span>
      </div>
      <div className={styles.main}>
        <div className={styles.columns}>
          {columns.map((column) => <section className={styles.column} key={column.title} aria-label={column.title}>
            <Link className={styles.heading} href={solutionHref(column.title)} onClick={onNavigate}><Icon name={column.icon} /><h3>{column.title}</h3><Icon name="arrow" /></Link>
            <div className={styles.links}>{column.links.filter(matches).map((title) => <Link href={solutionHref(title)} key={title} onClick={onNavigate}><span><strong>{title}</strong><small>{descriptions[title]}</small></span><Icon name="arrow" /></Link>)}</div>
          </section>)}
          <section className={styles.column} aria-label="Explore technology solutions">
            <Link className={styles.heading} href="/technology-and-digital-solutions" onClick={onNavigate}><Icon name="compass" /><h3>Explore</h3><Icon name="arrow" /></Link>
            <div className={styles.links}>{explore.map(([title, href]) => <Link href={href} key={title} onClick={onNavigate}><span><strong>{title}</strong><small>{descriptions[title]}</small></span><Icon name="arrow" /></Link>)}</div>
          </section>
        </div>
        <aside className={styles.feature}><p>Innovation<br />for a more<br />resilient<br />tomorrow.</p><span>Astronis Global</span></aside>
      </div>
      <div className={styles.footer}>
        <div className={styles.search}>
          <label htmlFor={`${id}-search`}>Find the Right Solution</label>
          <div className={styles.searchField}><Icon name="search" /><input id={`${id}-search`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search technology, business challenge or solution..." /><Icon name="arrow" /></div>
          <p className={styles.searchStatus} role="status">{search ? count ? `${count} matching solution${count === 1 ? "" : "s"}` : "No matching solutions. Discuss your requirement with our team." : ""}</p>
        </div>
        <div className={styles.signature}><span>Connect<br />Explore<br />Implement<br />Grow</span><small>With Astronis Global</small></div>
        <div className={styles.shortcuts}>{shortcuts.map(([icon, title, href]) => <Link href={href} key={title} onClick={onNavigate}><Icon name={icon} /><span><strong>{title}</strong><small>{descriptions[title]}</small></span><Icon name="arrow" className={styles.shortcutArrow} /></Link>)}</div>
      </div>
    </div>
  );
}
