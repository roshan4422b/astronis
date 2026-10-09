export type TechnologyRequirementOption = {
  label: string;
  question?: string;
  options?: string[];
};

export type TechnologyFormEntry = {
  id: string;
  label: string;
  solutions: TechnologyRequirementOption[];
};

export const technologyFormConfig: TechnologyFormEntry[] = [
  {
    id: "digital-business-solutions",
    label: "Digital Business Solutions",
    solutions: [
      { label: "Digital Transformation" },
      { label: "Business Process Digitisation" },
      { label: "Digital Operating Models" },
      { label: "Workflow Solutions" },
      { label: "Client & Enterprise Portals" },
      { label: "Cloud & Collaboration Solutions" },
      { label: "Cybersecurity Readiness" },
      { label: "Other" },
    ],
  },
  {
    id: "regtech-and-compliance-technology",
    label: "RegTech & Compliance Technology",
    solutions: [
      { label: "Compliance Management" },
      { label: "Regulatory Monitoring & Alerts" },
      { label: "Compliance Calendar" },
      { label: "Licensing & Approval Tracking" },
      { label: "Policy & Regulatory Intelligence" },
      { label: "Risk & Governance Technology" },
      { label: "ESG & Sustainability Tools" },
      { label: "Other" },
    ],
  },
  {
    id: "legal-technology",
    label: "Legal Technology",
    solutions: [
      { label: "Contract Lifecycle Management" },
      { label: "Document Management" },
      { label: "Matter / Case Management" },
      { label: "Legal Workflow Automation" },
      { label: "e-Discovery & Evidence Management" },
      { label: "Knowledge Management" },
      { label: "AI-Assisted Legal Research" },
      { label: "Other" },
    ],
  },
  {
    id: "data-ai-and-automation",
    label: "Data, AI & Automation",
    solutions: [
      { label: "Artificial Intelligence Solutions", question: "What is your primary AI use case?", options: ["Customer Support", "Document Analysis", "Internal Automation", "Compliance", "Legal Research", "Data Analytics", "Forecasting", "Knowledge Management", "Process Automation", "Custom Requirement"] },
      { label: "Data Analytics & Visualisation", question: "What is your primary AI use case?", options: ["Customer Support", "Document Analysis", "Internal Automation", "Compliance", "Legal Research", "Data Analytics", "Forecasting", "Knowledge Management", "Process Automation", "Custom Requirement"] },
      { label: "Intelligent Automation (RPA)", question: "What is your primary AI use case?", options: ["Customer Support", "Document Analysis", "Internal Automation", "Compliance", "Legal Research", "Data Analytics", "Forecasting", "Knowledge Management", "Process Automation", "Custom Requirement"] },
      { label: "AI-Assisted Research", question: "What is your primary AI use case?", options: ["Customer Support", "Document Analysis", "Internal Automation", "Compliance", "Legal Research", "Data Analytics", "Forecasting", "Knowledge Management", "Process Automation", "Custom Requirement"] },
      { label: "Predictive Insights" },
      { label: "Regulatory Data Intelligence" },
      { label: "Business Intelligence Dashboards" },
      { label: "Process Optimisation" },
      { label: "Other" },
    ],
  },
];

export const technologyOptions = technologyFormConfig.map((technology) => technology.label);
