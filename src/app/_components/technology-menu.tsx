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
  { title: "Digital Business Solutions", links: ["Client & Enterprise Portals", "Cloud & Collaboration", "Cybersecurity Readiness"] },
  { title: "RegTech & Compliance Technology", links: ["Compliance Management", "Regulatory Monitoring & Alerts", "Compliance Calendar", "Licensing & Approval Tracking", "Policy & Regulatory Intelligence", "Risk & Governance Technology", "ESG & Sustainability Tools"] },
  { title: "Legal Technology", links: ["Document Management", "Matter / Case Management", "Legal Workflow Automation"] },
  { title: "Data, AI & Automation", links: ["Predictive Insights", "Regulatory Data Intelligence"] },
];

const explore = [
  ["Explore All Solutions", "/technology-and-digital-solutions"],
  ["Technology Insights", "/technology-and-digital-solutions/technology-insights"],
  ["Digital Transformation", digitalBusinessPath],
  ["Global Best Practices", "/global-presence"],
  ["Industries We Serve", "/industries"],
  ["Our Professionals", "/professionals"],
  ["Discuss Your Requirement", "/contact"],
];

const allLinks = [
  ...columns.flatMap((column) => column.links.map((title) => ({ title, href: solutionHref(title) }))),
  ...explore.map(([title, href]) => ({ title, href })),
];
const menuColumns = [
  allLinks.slice(0, 6),
  allLinks.slice(6, 12),
  allLinks.slice(12, 17),
  allLinks.slice(17),
];

const shortcuts = [
  ["gear", "Technology Insights", "/technology-and-digital-solutions/technology-insights"],
  ["people", "Industries", "/industries"],
  ["person", "Our Professionals", "/professionals"],
  ["message", "Discuss Your Requirement", "/contact"],
];

const descriptions: Record<string, string> = {
  "Digital Transformation": "Modernise your business.",
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
  "Document Management": "Organise and retrieve files.",
  "Matter / Case Management": "Keep casework connected.",
  "Legal Workflow Automation": "Simplify legal processes.",
  "Predictive Insights": "Anticipate emerging trends.",
  "Regulatory Data Intelligence": "Analyse compliance data.",
  "Explore All Solutions": "Discover digital capabilities.",
  "Technology Insights": "Explore ideas and updates.",
  "Global Best Practices": "Learn from global experience.",
  "Industries We Serve": "Find sector-focused support.",
  "Industries": "Find sector-focused support.",
  "Our Professionals": "Meet our advisory experts.",
  "Discuss Your Requirement": "Talk through your next step.",
};

const exploreIcons: Record<string, string> = {
  "Explore All Solutions": "compass",
  "Technology Insights": "bulb",
  "Global Best Practices": "globe",
  "Industries We Serve": "building",
  "Our Professionals": "people",
  "Discuss Your Requirement": "message",
};

const technologySolutions = [...digitalSolutions, ...regtechSolutions, ...legalTechnologySolutions, ...dataAiSolutions];

function solutionIcon(title: string) {
  const solution = technologySolutions.find((item) => item.title === title || (title === "Cloud & Collaboration" && item.title === "Cloud & Collaboration Solutions"));
  return solution?.icon ?? exploreIcons[title] ?? "globe";
}

function solutionHref(title: string) {
  if (title === "Compliance Calendar") return "/technology-and-digital-solutions/compliance-calendar";
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
          {menuColumns.map((column, index) => <section className={styles.column} key={index} aria-label={`Technology menu column ${index + 1}`}>
            <div className={styles.links}>{column.map(({ title, href }) => <Link href={href} key={title} onClick={onNavigate} className={`${styles.solution} ${isRouteActive(pathname, href) ? "active-submenu-item" : ""}`}>
              <span className={styles.solutionIcon} aria-hidden="true"><Icon name={solutionIcon(title)} /></span>
              <span className={styles.copy}><strong title={title}>{title}</strong><small>{descriptions[title]}</small></span>
              <Icon name="arrow" />
            </Link>)}</div>
          </section>)}
        </div>
        <aside className={styles.feature}>
          <div className={styles.featureCopy}><p>Innovation<br />for a more<br />resilient<br />tomorrow.</p><span>Astronis Global</span></div>
        </aside>
      </div>
    </div>
  );
}
