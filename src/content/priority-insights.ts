export type PriorityInsight = {
  slug: string;
  category: "Regulatory" | "Corporate" | "Legal" | "Business";
  title: string;
  image: string;
};

const images = {
  regulatory: "/images/services/regulatory-and-compliance.webp",
  corporate: "/images/services/corporate-and-commercial-advisory.webp",
  legal: "/images/services/arbitration-and-conciliation.webp",
  business: "/images/services/business-advisory-and-consulting.webp",
};

export const priorityInsights = [
  {
    slug: "priority-rbi-nbfc-regulatory-framework",
    category: "Regulatory",
    title: "RBI's Regulatory Framework for NBFCs: Understanding Scale-Based Regulation, Governance and Compliance Priorities",
    image: images.regulatory,
  },
  {
    slug: "priority-mergers-acquisitions-india",
    category: "Corporate",
    title: "Mergers & Acquisitions in India: From Deal Structuring and Due Diligence to Closing and Post-Merger Integration",
    image: images.corporate,
  },
  {
    slug: "priority-msme-payment-disputes-msefc",
    category: "Legal",
    title: "MSME Payment Disputes: MSEFC Jurisdiction, Statutory Interest and Arbitration under the MSMED Act",
    image: images.legal,
  },
  {
    slug: "priority-india-market-entry-strategy",
    category: "Business",
    title: "India Market Entry Strategy: Subsidiary, Joint Venture, Branch Office, Project Office or Liaison Office?",
    image: images.business,
  },
  {
    slug: "priority-sebi-aif-regulatory-architecture-2026",
    category: "Regulatory",
    title: "SEBI's 2026 Regulatory Architecture for AIFs: What Fund Managers, Sponsors and Investors Need to Know",
    image: images.regulatory,
  },
  {
    slug: "priority-shareholders-agreements-india",
    category: "Corporate",
    title: "Shareholders' Agreements in India: Founder Control, Investor Protection, Exit Rights and Deadlock Resolution",
    image: images.corporate,
  },
  {
    slug: "priority-cheque-bounce-and-civil-recovery",
    category: "Legal",
    title: "Cheque-Bounce Proceedings and Civil Recovery: Can Section 138 NI Act and Recovery Proceedings Continue Together?",
    image: images.legal,
  },
  {
    slug: "priority-investment-readiness-fundraising",
    category: "Business",
    title: "Investment Readiness: 20 Legal, Corporate and Compliance Issues Businesses Should Fix Before Fund-Raising",
    image: images.business,
  },
  {
    slug: "priority-digital-lending-rbi-compliance",
    category: "Regulatory",
    title: "Digital Lending in India: RBI Compliance Architecture for Banks, NBFCs, FinTechs and Lending Service Providers",
    image: images.regulatory,
  },
  {
    slug: "priority-legal-corporate-due-diligence-ma",
    category: "Corporate",
    title: "Legal & Corporate Due Diligence in M&A: A Practical Risk Checklist for Buyers and Investors",
    image: images.corporate,
  },
  {
    slug: "priority-ibc-or-debt-recovery",
    category: "Legal",
    title: "IBC or Debt Recovery? Choosing Between Insolvency, DRT, Arbitration and Civil Recovery Proceedings",
    image: images.legal,
  },
  {
    slug: "priority-family-business-succession",
    category: "Business",
    title: "Family Business Succession: Building an Ownership, Governance and Management Transition Framework",
    image: images.business,
  },
  {
    slug: "priority-gift-city-ifsca-funds-roadmap",
    category: "Regulatory",
    title: "GIFT City & IFSCA: Regulatory Roadmap for Funds, Financial Institutions and Global Investors",
    image: images.regulatory,
  },
  {
    slug: "priority-share-purchase-slump-sale-business-transfer",
    category: "Corporate",
    title: "Share Purchase, Slump Sale or Business Transfer? Choosing the Right Acquisition Structure",
    image: images.corporate,
  },
  {
    slug: "priority-personal-guarantors-under-ibc",
    category: "Legal",
    title: "Personal Guarantors under the IBC: Liability, Insolvency Proceedings and Emerging Judicial Principles",
    image: images.legal,
  },
  {
    slug: "priority-joint-ventures-india-governance",
    category: "Business",
    title: "Joint Ventures in India: Structuring Ownership, Governance, Reserved Matters, Exit and Dispute Resolution",
    image: images.business,
  },
  {
    slug: "priority-india-data-protection-dpdp-framework",
    category: "Regulatory",
    title: "India's Data Protection Compliance Framework: A Practical DPDP Implementation Roadmap for Businesses",
    image: images.regulatory,
  },
  {
    slug: "priority-related-party-transactions-board-compliance",
    category: "Corporate",
    title: "Related Party Transactions: Approval, Governance, Disclosure and Board-Level Compliance Risks",
    image: images.corporate,
  },
  {
    slug: "priority-director-liability-india",
    category: "Legal",
    title: "Director Liability in India: When Can Directors Be Personally Exposed for Company Defaults and Regulatory Violations?",
    image: images.legal,
  },
  {
    slug: "priority-compliance-as-business-strategy",
    category: "Business",
    title: "Compliance as a Business Strategy: Why Strong Governance Improves Investment Readiness, Lending and Enterprise Value",
    image: images.business,
  },
] as const satisfies readonly PriorityInsight[];