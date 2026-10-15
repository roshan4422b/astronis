export type RbiNbfcInsight = {
  slug: string;
  title: string;
  icon: string;
};

export const rbiNbfcInsights = [
  {
    slug: "rbi-digital-lending-framework-nbfcs-fintechs-lsps",
    title: "RBI Digital Lending Framework: What NBFCs, FinTechs and LSPs Must Build into Their Compliance Architecture",
    icon: "bank",
  },
  {
    slug: "sebi-2026-aif-framework-compliance-fund-structuring",
    title: "SEBI's 2026 AIF Framework: Key Compliance and Fund-Structuring Considerations for Alternative Investment Funds",
    icon: "chart",
  },
  {
    slug: "ibc-due-diligence-requirements-ibbi-circular-2026",
    title: "IBC Due-Diligence Requirements: What Insolvency Professionals and Stakeholders Should Reassess After IBBI's September 2026 Circular",
    icon: "scale",
  },
  {
    slug: "dpdp-compliance-indian-companies-2025-rules",
    title: "DPDP Compliance for Indian Companies: Building a Practical Implementation Roadmap under the 2025 Rules",
    icon: "shield",
  },
  {
    slug: "sebi-2026-regulatory-reset-capital-market-intermediaries",
    title: "SEBI's 2026 Regulatory Reset for Capital-Market Intermediaries: Key Changes Across AIFs, Merchant Bankers, Investment Advisers, Research Analysts and Debenture Trustees",
    icon: "chart",
  },
  {
    slug: "digital-lending-india-rbi-compliance-nbfcs-fintechs",
    title: "Digital Lending in India: RBI Compliance Architecture for NBFCs, FinTechs and LSPs",
    icon: "bank",
  },
  {
    slug: "nbfc-licensing-india-entry-requirements-rbi-approval",
    title: "NBFC Licensing in India: Entry Requirements, Business Models and RBI Approval Process",
    icon: "building",
  },
  {
    slug: "rbi-compliance-calendar-nbfcs",
    title: "RBI Compliance Calendar for NBFCs: Returns, Governance and Periodic Obligations",
    icon: "calendar",
  },
  {
    slug: "kyc-aml-nbfcs-customer-due-diligence",
    title: "KYC & AML for NBFCs: Customer Due Diligence, Beneficial Ownership and Transaction Monitoring",
    icon: "shield",
  },
  {
    slug: "nbfc-fintech-partnerships-regulatory-risks",
    title: "NBFC-FinTech Partnerships: Regulatory Risks in Digital Lending and Outsourcing",
    icon: "people",
  },
  {
    slug: "prompt-corrective-action-nbfcs-board-risk-management",
    title: "Prompt Corrective Action for NBFCs: Triggers, Restrictions and Board-Level Risk Management",
    icon: "chart",
  },
  {
    slug: "key-facts-statement-loans-nbfcs",
    title: "Key Facts Statement for Loans: What NBFCs Need to Build into the Customer Journey",
    icon: "file",
  },
  {
    slug: "nbfc-governance-board-cco-risk-committee",
    title: "NBFC Governance: Board, CCO, Risk Committee and Fit-and-Proper Requirements",
    icon: "building",
  },
] as const satisfies readonly RbiNbfcInsight[];

export function splitRbiNbfcHeadline(title: string) {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return { lead: title, continuation: "" };
  return {
    lead: title.slice(0, colonIndex + 1),
    continuation: title.slice(colonIndex + 1).trimStart(),
  };
}