import { industries, practices } from "./site";
import { dataAiSolutions, dataAiPath } from "./data-ai-solutions";
import { digitalBusinessPath, digitalSolutions } from "./digital-solutions";
import { legalTechnologyPath, legalTechnologySolutions } from "./legal-technology";
import { regtechPath, regtechSolutions } from "./regtech-solutions";

export type EnquiryCategory =
  | "service"
  | "industry"
  | "technology"
  | "international"
  | "other";

export const enquiryCategoryOptions = [
  { value: "service", label: "Service" },
  { value: "industry", label: "Industry-specific Requirement" },
  { value: "technology", label: "Technology & Digital" },
  { value: "international", label: "Cross-Border / International Requirement" },
  { value: "other", label: "Other" },
] as const;

export const serviceOptions = practices.map((service) => ({
  value: service.title,
  label: service.title,
  slug: service.slug,
}));

export const industryOptions = industries.map((industry) => ({
  value: industry.title,
  label: industry.title,
  slug: industry.slug,
}));

export const technologyOptions = [
  {
    value: "Digital Business Solutions",
    label: "Digital Business Solutions",
    slug: digitalBusinessPath,
    children: digitalSolutions.map((solution) => ({
      value: solution.title,
      label: solution.title,
      slug: solution.id,
    })),
  },
  {
    value: "RegTech & Compliance Technology",
    label: "RegTech & Compliance Technology",
    slug: regtechPath,
    children: regtechSolutions.map((solution) => ({
      value: solution.title,
      label: solution.title,
      slug: solution.id,
    })),
  },
  {
    value: "Legal Technology",
    label: "Legal Technology",
    slug: legalTechnologyPath,
    children: legalTechnologySolutions.map((solution) => ({
      value: solution.title,
      label: solution.title,
      slug: solution.id,
    })),
  },
  {
    value: "Data, AI & Automation",
    label: "Data, AI & Automation",
    slug: dataAiPath,
    children: dataAiSolutions.map((solution) => ({
      value: solution.title,
      label: solution.title,
      slug: solution.id,
    })),
  },
] as const;

export const serviceRequirementMap: Record<string, string[]> = {
  "Corporate & Commercial Advisory": [
    "Entity Structuring",
    "Corporate Governance",
    "Commercial Contracts",
    "Mergers & Acquisitions",
    "Joint Ventures",
    "Corporate Restructuring",
    "Fund Raising / Capital",
    "Due Diligence",
    "General Corporate Advisory",
    "Cross-Border Transactions",
    "Other",
  ],
  "Business Advisory & Consulting": [
    "Strategic Planning",
    "Growth Strategy",
    "Operational Improvement",
    "Risk Management",
    "Market Entry",
    "Transformation Advisory",
    "Other",
  ],
  "Banking, NBFC & Financial Services Advisory": [
    "NBFC / HFC Advisory",
    "RBI / Regulatory Advisory",
    "Risk & Governance",
    "Digital Lending",
    "Commercial Contracts",
    "Due Diligence",
    "Other",
  ],
  "Startup & Investment Advisory": [
    "Entity Structuring",
    "Fundraising",
    "Investor Documents",
    "Founders’ Arrangements",
    "Growth Advisory",
    "Investment Review",
    "Other",
  ],
  "Intellectual Property Rights": [
    "Trademark",
    "Copyright",
    "Patent",
    "Industrial Design",
    "IP Strategy",
    "Licensing",
    "Assignment",
    "Infringement",
    "Opposition",
    "Portfolio Management",
    "Other",
  ],
  "RERA & Real Estate Advisory": [
    "RERA Compliance",
    "Project Approvals",
    "Land / Title Review",
    "Development Agreements",
    "Leasing",
    "Joint Development",
    "Due Diligence",
    "Dispute Support",
    "Other",
  ],
  "Regulatory & Compliance Services": [
    "Licensing & Registrations",
    "Compliance Review",
    "Regulatory Representation",
    "Approval Support",
    "Policy Review",
    "Ongoing Compliance",
    "Other",
  ],
  "Licensing & Registrations": [
    "New Licence",
    "Registration",
    "Renewal",
    "Modification",
    "Approval",
    "Compliance Support",
    "Unsure / Need Consultation",
  ],
  "FEMA, FDI & Foreign Exchange Advisory": [
    "Foreign Direct Investment",
    "Overseas Direct Investment",
    "External Commercial Borrowing",
    "Foreign Remittance",
    "Share Transfer",
    "Cross-Border Acquisition",
    "Investment Restructuring",
    "RBI Approval / Filing",
    "Other",
  ],
  "GST & Indirect Tax Regulatory Support": [
    "GST Registration",
    "Compliance Review",
    "Notice / Assessment Support",
    "Input Tax Credit",
    "Audit Support",
    "Other",
  ],
  "NCLT & NCLAT Advisory": [
    "Corporate Insolvency",
    "Restructuring",
    "Reorganisation",
    "Representation",
    "Advisory",
    "Other",
  ],
  "MSME Advisory & Disputes": [
    "Business Advisory",
    "Dispute Resolution",
    "Compliance Support",
    "Credit / Recovery Support",
    "Other",
  ],
  "Arbitration & Conciliation": [
    "Commercial Arbitration",
    "Domestic Arbitration",
    "International Arbitration",
    "Live Matter Support",
    "Pre-Litigation Advice",
    "Other",
  ],
  "DRT & DRAT Matters": [
    "Debt Recovery",
    "Enforcement",
    "Representation",
    "Appeal / Review",
    "Strategic Advice",
    "Other",
  ],
  "AFT & CAT Advisory Matters": [
    "Tribunal Advisory",
    "Appeal Support",
    "Review / Representation",
    "Documentation",
    "Other",
  ],
  "HR & Employment Advisory": [
    "Employment Contracts",
    "Policies & Compliance",
    "Workforce Structuring",
    "Employment Disputes",
    "HR Transformation",
    "Other",
  ],
  "Risk, Governance & Forensic Advisory": [
    "Risk Assessment",
    "Governance Review",
    "Internal Controls",
    "Forensic Review",
    "Investigations",
    "Other",
  ],
  "ESG & Sustainability": [
    "ESG Advisory",
    "ESG Strategy",
    "Sustainability Framework",
    "ESG Compliance",
    "Environmental Regulatory",
    "Governance Advisory",
    "ESG Risk Assessment",
    "ESG Due Diligence",
    "Sustainability Reporting Coordination",
    "Responsible Business Advisory",
    "Other",
  ],
  "Cross-Border & International Business Support": [
    "India Market Entry",
    "Overseas Expansion",
    "Foreign Investment",
    "Cross-Border Transaction",
    "International Partnership",
    "Regulatory Compliance",
    "Tax Coordination",
    "Other",
  ],
};

export const industryRequirementMap: Record<string, string[]> = {
  "Financial Services": [
    "RBI / regulatory compliance",
    "NBFC advisory",
    "Licensing",
    "FinTech regulatory support",
    "Insurance regulatory support",
    "Risk & governance",
    "Contracts",
    "Digital lending",
    "Foreign investment",
    "Dispute resolution",
    "ESG / sustainable finance",
    "Other",
  ],
  "Manufacturing": [
    "Business setup / expansion",
    "Industrial licensing",
    "Environmental approvals",
    "Contracts",
    "Supply-chain agreements",
    "Labour & employment",
    "Tax / GST",
    "Customs / import-export",
    "Land / real estate",
    "Corporate compliance",
    "M&A / investment",
    "Technology transformation",
    "Other",
  ],
  "Real Estate & Construction": [
    "RERA",
    "Project approvals",
    "Land / title",
    "Development agreements",
    "Leasing",
    "Joint development",
    "Due diligence",
    "Investment",
    "Dispute",
    "Other",
  ],
  "Healthcare & Pharma": [
    "Licensing",
    "Regulatory compliance",
    "Healthcare contracts",
    "Pharma compliance",
    "Data / privacy",
    "Investment",
    "Employment",
    "IP",
    "Dispute",
    "Other",
  ],
  "Professional & Business Services": [
    "Commercial contracts",
    "Regulatory compliance",
    "Client / vendor arrangements",
    "Employment",
    "Risk & governance",
    "Operations advisory",
    "Expansion",
    "Other",
  ],
  "Technology, IT & ITES": [
    "Digital transformation",
    "Commercial contracts",
    "Data protection",
    "Cybersecurity",
    "Software licensing",
    "Compliance",
    "AI / automation",
    "Vendor management",
    "Other",
  ],
  "Startups": [
    "Entity structuring",
    "Fundraising",
    "Founder documentation",
    "Commercial contracts",
    "Licensing",
    "Growth advisory",
    "Intellectual property",
    "Other",
  ],
  "E-Commerce": [
    "Platform compliance",
    "Commercial contracts",
    "Consumer protection",
    "Payments / fintech",
    "Regulatory reviews",
    "Marketplace arrangements",
    "Data privacy",
    "Other",
  ],
  "Telecommunications": [
    "Licensing",
    "Spectrum / approvals",
    "Regulatory compliance",
    "Infrastructure arrangements",
    "Consumer / telecom contracts",
    "Dispute support",
    "Other",
  ],
  "Renewable Energy": [
    "Project approvals",
    "Contracts",
    "Regulatory compliance",
    "Investment",
    "Land / permits",
    "Supply chain",
    "ESG / sustainability",
    "Other",
  ],
  "Infrastructure": [
    "Project structuring",
    "Approvals",
    "Contracts / EPC",
    "Land / title",
    "Investment",
    "Disputes",
    "Other",
  ],
  "Retail & Consumer": [
    "Commercial contracts",
    "Regulatory advisory",
    "Supplier relationships",
    "Expansion",
    "Consumer issues",
    "Tax / GST",
    "Other",
  ],
  "Education": [
    "Institution setup",
    "Compliance",
    "Partnership agreements",
    "Admissions / student matters",
    "Licensing",
    "Other",
  ],
  "Agriculture & Agri-Business": [
    "Compliance",
    "Farm / land arrangements",
    "Contracts",
    "Investment",
    "Supply chain",
    "Other",
  ],
  "Hospitality": [
    "Licensing",
    "Commercial contracts",
    "Leasing",
    "Resort / operations",
    "Tourism compliance",
    "Other",
  ],
  "Media & Entertainment": [
    "Content / rights",
    "Contracts",
    "Licensing",
    "Regulatory compliance",
    "Investment",
    "Other",
  ],
  "Artificial Intelligence": [
    "AI governance",
    "AI compliance",
    "Model risk",
    "Commercial contracts",
    "Data / privacy",
    "AI strategy",
    "Other",
  ],
};

export const technologyRequirementMap: Record<string, string[]> = {
  "Digital Business Solutions": [
    "Digital Transformation",
    "Business Process Digitisation",
    "Digital Operating Models",
    "Workflow Solutions",
    "Client & Enterprise Portals",
    "Cloud & Collaboration Solutions",
    "Cybersecurity Readiness",
    "Other",
  ],
  "RegTech & Compliance Technology": [
    "Compliance Management",
    "Regulatory Monitoring & Alerts",
    "Compliance Calendar",
    "Licensing & Approval Tracking",
    "Policy & Regulatory Intelligence",
    "Risk & Governance Technology",
    "ESG & Sustainability Tools",
    "Other",
  ],
  "Legal Technology": [
    "Contract Lifecycle Management",
    "Document Management",
    "Matter / Case Management",
    "Legal Workflow Automation",
    "e-Discovery & Evidence Management",
    "Knowledge Management",
    "AI-Assisted Legal Research",
    "Other",
  ],
  "Data, AI & Automation": [
    "Artificial Intelligence Solutions",
    "Data Analytics & Visualisation",
    "Intelligent Automation (RPA)",
    "AI-Assisted Research",
    "Predictive Insights",
    "Regulatory Data Intelligence",
    "Business Intelligence Dashboards",
    "Process Optimisation",
    "Other",
  ],
};

export const crossBorderOptions = [
  "India market entry",
  "Overseas expansion",
  "Foreign investment",
  "Company setup",
  "Cross-border transaction",
  "Regulatory compliance",
  "FEMA / RBI support",
  "Contracts",
  "Tax coordination",
  "International partnership",
  "Acquisition / investment",
  "Other",
];

export function getPrimaryOptions(category: EnquiryCategory) {
  if (category === "service") return serviceOptions;
  if (category === "industry") return industryOptions;
  if (category === "technology") return technologyOptions;
  if (category === "international") return crossBorderOptions.map((option) => ({ value: option, label: option }));
  return [{ value: "General Enquiry", label: "General Enquiry" }];
}

export function getSecondaryOptions(category: EnquiryCategory, primarySelection: string) {
  if (category === "service") {
    return serviceRequirementMap[primarySelection] ?? ["Other"];
  }
  if (category === "industry") {
    return industryRequirementMap[primarySelection] ?? ["Other"];
  }
  if (category === "technology") {
    return technologyRequirementMap[primarySelection] ?? ["Other"];
  }
  return [];
}

export function inferDefaultContext(pathname: string) {
  const normalized = pathname?.toLowerCase() || "";

  if (normalized.startsWith("/services/")) {
    const slug = pathname.split("/").filter(Boolean).at(-1) ?? "";
    const match = serviceOptions.find((option) => option.slug === slug);
    return { category: "service" as EnquiryCategory, primarySelection: match?.value ?? "" };
  }

  if (normalized.startsWith("/industries/")) {
    const slug = pathname.split("/").filter(Boolean).at(-1) ?? "";
    const match = industryOptions.find((option) => option.slug === slug);
    return { category: "industry" as EnquiryCategory, primarySelection: match?.value ?? "" };
  }

  if (normalized.startsWith("/technology-and-digital-solutions/")) {
    const slug = pathname.split("/").filter(Boolean).at(-1) ?? "";
    const technologyMatch = technologyOptions.find((option) => option.slug === `/${slug}` || option.slug.endsWith(`/${slug}`));
    if (technologyMatch) {
      return { category: "technology" as EnquiryCategory, primarySelection: technologyMatch.value };
    }

    const parentMatch = [
      ["digital-business-solutions", "Digital Business Solutions"],
      ["regtech-and-compliance-technology", "RegTech & Compliance Technology"],
      ["legal-technology", "Legal Technology"],
      ["data-ai-and-automation", "Data, AI & Automation"],
    ].find(([value]) => value === slug);

    if (parentMatch) {
      return { category: "technology" as EnquiryCategory, primarySelection: parentMatch[1] };
    }
  }

  return { category: "service" as EnquiryCategory, primarySelection: "" };
}
