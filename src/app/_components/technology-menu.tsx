"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./icon";
import styles from "./technology-menu.module.css";
import { clientEnterprisePortalsPath, cloudCollaborationPath, cybersecurityReadinessPath, digitalBusinessPath, digitalSolutions } from "@/content/digital-solutions";
import { regtechPath, regtechSolutions } from "@/content/regtech-solutions";
import { legalTechnologyPath, legalTechnologySolutions } from "@/content/legal-technology";
import { dataAiPath, dataAiSolutions } from "@/content/data-ai-solutions";
import { isRouteActive } from "./navigation-state";

const columns = [
  { title: "Digital Business Solutions", icon: "laptop", links: ["Digital Transformation", "Business Process Digitisation", "Digital Operating Models", "Workflow Solutions", "Client & Enterprise Portals", "Cloud & Collaboration", "Cybersecurity Readiness"] },
  { title: "RegTech & Compliance Technology", icon: "shield", links: ["Compliance Management", "Regulatory Monitoring & Alerts", "Compliance Calendar", "Licensing & Approval Tracking", "Policy & Regulatory Intelligence", "Risk & Governance Technology", "ESG & Sustainability Tools"] },
  { title: "Legal Technology", icon: "file", links: ["Contract Lifecycle Management", "Document Management", "Matter / Case Management", "Legal Workflow Automation", "e-Discovery & Evidence Management", "Knowledge Management", "AI-Assisted Legal Research"] },
  { title: "Data, AI & Automation", icon: "network", links: ["Artificial Intelligence Solutions", "Data Analytics & Visualisation", "Intelligent Automation (RPA)", "Predictive Insights", "Regulatory Data Intelligence", "Business Intelligence Dashboards", "Process Optimisation"] },
];

const explore = [
  ["Explore All Solutions", "/technology-and-digital-solutions"],
  ["Technology Insights", "/technology-and-digital-solutions/technology-insights"],
  ["Digital Transformation", `${digitalBusinessPath}#digital-transformation`],
  ["Global Best Practices", "/global-presence"],
  ["Industries We Serve", "/industries"],
  ["Our Professionals", "/professionals"],
  ["Discuss Your Requirement", "/contact"],
];
const shortcuts = [
  ["gear", "Technology Insights", "/technology-and-digital-solutions/technology-insights"],
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
  "Cloud & Collaboration": "Work together securely.",
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
  if (title === "Client & Enterprise Portals") return clientEnterprisePortalsPath;
  if (title === "Cloud & Collaboration" || title === "Cloud & Collaboration Solutions") return cloudCollaborationPath;
  if (title === "Cybersecurity Readiness") return cybersecurityReadinessPath;
  if (title === "Data, AI & Automation") return dataAiPath;
  const dataSolution = dataAiSolutions.find((solution) => solution.title === title);
  if (dataSolution) return `${dataAiPath}#${dataSolution.id}`;
  if (title === "Legal Technology") return legalTechnologyPath;
  const legalSolution = legalTechnologySolutions.find((solution) => solution.title === title);
  if (legalSolution) return `${legalTechnologyPath}#${legalSolution.id}`;
  if (title === "RegTech & Compliance Technology") return regtechPath;
  const regtechSolution = regtechSolutions.find((solution) => solution.title === title);
  if (regtechSolution) return `${regtechPath}#${regtechSolution.id}`;
  if (title === "Digital Business Solutions") return digitalBusinessPath;
  const digitalSolution = digitalSolutions.find((solution) => solution.title === title);
  if (digitalSolution) return `${digitalBusinessPath}#${digitalSolution.id}`;
  return `/technology-and-digital-solutions?solution=${encodeURIComponent(title)}#enquiry`;
}

export default function TechnologyMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <div className={`mega-menu ${styles.menu}`} id={id}>
      <div className={styles.main}>
        <div className={styles.columns}>
          {columns.map((column) => <section className={styles.column} key={column.title} aria-label={column.title}>
            <Link className={`${styles.heading} ${isRouteActive(pathname, solutionHref(column.title)) ? "active-submenu-item" : ""}`.trim()} href={solutionHref(column.title)} onClick={onNavigate}><Icon name={column.icon} /><h3>{column.title}</h3><Icon name="arrow" /></Link>
            <div className={styles.links}>{column.links.map((title) => {
              const href = solutionHref(title);
              return <Link href={href} key={title} onClick={onNavigate} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><span><strong>{title}</strong><small>{descriptions[title]}</small></span><Icon name="arrow" /></Link>;
            })}</div>
          </section>)}
          <section className={styles.column} aria-label="Explore technology solutions">
            <Link className={`${styles.heading} ${isRouteActive(pathname, "/technology-and-digital-solutions") ? "active-submenu-item" : ""}`.trim()} href="/technology-and-digital-solutions" onClick={onNavigate}><Icon name="compass" /><h3>Explore</h3><Icon name="arrow" /></Link>
            <div className={styles.links}>{explore.map(([title, href]) => <Link href={href} key={title} onClick={onNavigate} className={isRouteActive(pathname, href) ? "active-submenu-item" : undefined}><span><strong>{title}</strong><small>{descriptions[title]}</small></span><Icon name="arrow" /></Link>)}</div>
          </section>
        </div>
        <aside className={styles.feature}>
          <div className={styles.featureCopy}><p>Innovation<br />for a more<br />resilient<br />tomorrow.</p><span>Astronis Global</span></div>
        </aside>
      </div>
    </div>
  );
}
