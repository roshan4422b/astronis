export type BusinessAdvisoryInsight = {
  slug: string;
  title: string;
  focus: string;
  icon: string;
};

export const businessAdvisoryInsights = [
  {
    slug: "starting-a-business-india-roadmap",
    title: "Starting a Business in India: Legal, Tax, Regulatory and Commercial Roadmap",
    focus: "Entrepreneurs",
    icon: "building",
  },
  {
    slug: "india-market-entry-strategy-foreign-companies",
    title: "India Market Entry Strategy for Foreign Companies: Subsidiary, JV, Branch, Project or Liaison Office?",
    focus: "Foreign investors",
    icon: "globe",
  },
  {
    slug: "business-expansion-strategy-restructure-before-scaling",
    title: "Business Expansion Strategy: When Should a Company Restructure Before Scaling?",
    focus: "Growth",
    icon: "chart",
  },
  {
    slug: "investment-readiness-company-investors",
    title: "Investment Readiness: How to Prepare Your Company Before Approaching Investors",
    focus: "Start-ups/SMEs",
    icon: "file",
  },
  {
    slug: "fund-raising-strategy-equity-debt-convertible-private-equity",
    title: "Fund-Raising Strategy: Equity, Debt, Convertible Instruments or Private Equity?",
    focus: "Capital",
    icon: "chart",
  },
  {
    slug: "investor-due-diligence-readiness-fund-raising",
    title: "Investor Due Diligence Readiness: 20 Things Companies Should Fix Before Fund-Raising",
    focus: "Investment",
    icon: "shield",
  },
  {
    slug: "joint-ventures-india-partner-structure-governance",
    title: "Joint Ventures in India: Choosing the Right Partner, Structure and Governance Model",
    focus: "JV",
    icon: "people",
  },
  {
    slug: "franchise-expansion-legal-commercial-architecture",
    title: "Franchise Expansion: Legal and Commercial Architecture for Building a Scalable Network",
    focus: "Franchise",
    icon: "building",
  },
  {
    slug: "distribution-strategy-business-model",
    title: "Distribution Strategy: Distributor, Dealer, Agent or Franchise - Which Model Fits Your Business?",
    focus: "Market expansion",
    icon: "globe",
  },
  {
    slug: "contract-management-business-tool",
    title: "Contract Management as a Business Tool: Reducing Leakage, Disputes and Compliance Risk",
    focus: "Operations",
    icon: "file",
  },
  {
    slug: "vendor-risk-management-critical-suppliers",
    title: "Vendor Risk Management: Due Diligence Before Appointing Critical Suppliers",
    focus: "Supply chain",
    icon: "shield",
  },
  {
    slug: "business-risk-mapping-india",
    title: "Business Risk Mapping: Identifying Legal, Regulatory, Financial and Operational Exposure",
    focus: "Enterprise risk",
    icon: "scale",
  },
  {
    slug: "compliance-growth-strategy-governance",
    title: "Compliance as a Growth Strategy: Why Governance Matters to Investors and Lenders",
    focus: "Governance",
    icon: "building",
  },
  {
    slug: "family-business-governance-ownership-management",
    title: "Family Business Governance: Separating Ownership, Management and Family Interests",
    focus: "Family enterprise",
    icon: "people",
  },
  {
    slug: "succession-planning-business-continuity",
    title: "Succession Planning: Protecting Business Continuity Beyond the Founder",
    focus: "Succession",
    icon: "calendar",
  },
  {
    slug: "business-turnaround-reorganisation-strategy",
    title: "Business Turnaround & Reorganisation: Early Warning Signs and Strategic Options",
    focus: "Distress",
    icon: "chart",
  },
  {
    slug: "preparing-business-for-sale-value-enhancement",
    title: "Preparing a Business for Sale: Legal, Financial and Operational Value Enhancement",
    focus: "Exit/M&A",
    icon: "handshake",
  },
  {
    slug: "esg-indian-businesses-commercial-advantage",
    title: "ESG for Indian Businesses: From Compliance Requirement to Commercial Advantage",
    focus: "ESG",
    icon: "shield",
  },
  {
    slug: "cross-border-business-expansion-risks",
    title: "Cross-Border Business Expansion: Regulatory, Contractual and Tax Risks to Plan For",
    focus: "International",
    icon: "globe",
  },
  {
    slug: "board-level-risk-management-quarterly-review",
    title: "Board-Level Risk Management: What Promoters and Directors Should Review Every Quarter",
    focus: "Board governance",
    icon: "scale",
  },
] as const satisfies readonly BusinessAdvisoryInsight[];

export function splitBusinessAdvisoryHeadline(title: string) {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return { lead: title, continuation: "" };
  return {
    lead: title.slice(0, colonIndex + 1),
    continuation: title.slice(colonIndex + 1).trimStart(),
  };
}