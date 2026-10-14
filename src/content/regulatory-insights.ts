export type RegulatoryInsight = {
  slug: string;
  title: string;
  focus: string;
};

export const regulatoryInsights = [
  {
    slug: "rbi-regulatory-outlook-2026",
    title: "RBI Regulatory Outlook 2026: Key Compliance Priorities for Banks, NBFCs and FinTechs",
    focus: "RBI",
  },
  {
    slug: "nbfc-regulation-india-licensing-scale-based-compliance",
    title: "NBFC Regulation in India: Licensing, Scale-Based Regulation and Ongoing Compliance",
    focus: "RBI/NBFC",
  },
  {
    slug: "digital-lending-india-regulatory-architecture",
    title: "Digital Lending in India: Regulatory Architecture, LSPs, REs and Borrower Protection",
    focus: "RBI/FinTech",
  },
  {
    slug: "payment-aggregators-payment-systems-compliance",
    title: "Payment Aggregators and Payment Systems: RBI Authorisation and Compliance Roadmap",
    focus: "RBI/PSS",
  },
  {
    slug: "kyc-aml-beneficial-ownership-compliance",
    title: "KYC, AML and Beneficial Ownership: A Compliance Framework for Regulated Businesses",
    focus: "RBI/PMLA/FIU",
  },
  {
    slug: "fema-compliance-indian-businesses",
    title: "FEMA Compliance for Indian Businesses: Capital Account, Current Account and Reporting Risks",
    focus: "RBI/FEMA",
  },
  {
    slug: "foreign-investment-india-fdi-routes",
    title: "Foreign Investment into India: FDI Entry Routes, Pricing, Reporting and Downstream Investment",
    focus: "FEMA/DPIIT/RBI",
  },
  {
    slug: "external-commercial-borrowings-india",
    title: "External Commercial Borrowings: How Indian Companies Can Raise Overseas Debt",
    focus: "RBI/FEMA",
  },
  {
    slug: "sebi-regulatory-outlook-listed-companies",
    title: "SEBI Regulatory Outlook: What Listed Companies and Market Intermediaries Need to Watch",
    focus: "SEBI",
  },
  {
    slug: "lodr-compliance-listed-companies",
    title: "LODR Compliance: Governance and Disclosure Obligations for Listed Companies",
    focus: "SEBI",
  },
  {
    slug: "alternative-investment-funds-india-framework",
    title: "Alternative Investment Funds in India: Regulatory Framework and 2026 Developments",
    focus: "SEBI/AIF",
  },
  {
    slug: "gift-city-ifsca-financial-services-business",
    title: "GIFT City & IFSCA: Building an International Financial Services Business from India",
    focus: "IFSCA",
  },
  {
    slug: "ifsca-market-abuse-regulations-2026",
    title: "IFSCA Market-Abuse Regulations 2026: What Capital-Market Participants Need to Know",
    focus: "IFSCA",
  },
  {
    slug: "gst-compliance-litigation-india",
    title: "GST Compliance & Litigation: Registration, ITC, E-Invoicing, Assessment and Appeals",
    focus: "CBIC/GST",
  },
  {
    slug: "startup-msme-regulatory-framework-india",
    title: "Start-up & MSME Regulatory Framework: Recognition, Incentives, Credit and Compliance",
    focus: "DPIIT/MSME",
  },
  {
    slug: "dpdp-compliance-framework-india",
    title: "India's DPDP Compliance Framework: What Businesses Should Implement Now",
    focus: "MeitY/data protection",
  },
  {
    slug: "regulatory-change-management-businesses",
    title: "Regulatory Change Management: How Businesses Should Track, Assess and Implement New Rules",
    focus: "Cross-regulator",
  },
  {
    slug: "regulatory-risk-assessment-compliance-matrix",
    title: "Regulatory Risk Assessment: Building a Compliance Risk Matrix for Indian Businesses",
    focus: "Enterprise compliance",
  },
  {
    slug: "electricity-regulatory-framework-india",
    title: "Electricity Regulatory Framework in India: Licensing, Open Access, Tariffs and Regulatory Disputes",
    focus: "CERC/SERC",
  },
  {
    slug: "multi-regulator-compliance-framework",
    title: "Multi-Regulator Compliance: Building One Framework Across MCA, RBI, SEBI, GST, FEMA and Sector Regulators",
    focus: "Enterprise groups",
  },
] as const satisfies readonly RegulatoryInsight[];

export function splitRegulatoryHeadline(title: string) {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return { lead: title, continuation: "" };
  return {
    lead: title.slice(0, colonIndex + 1),
    continuation: title.slice(colonIndex + 1).trimStart(),
  };
}