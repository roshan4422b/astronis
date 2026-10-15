import hierarchy from "./service-hierarchy.json";

export type Capability = {
  title: string;
  slug: string;
  children: string[];
  childRoutes?: Record<string, string>;
};

const corporateTransactionChildRoutes: Record<string, string> = {
  "Mergers & Acquisitions": "/services/corporate-commercial-advisory/mergers-acquisitions",
  "Buy or Sell business entity": "/services/corporate-commercial-advisory/buy-or-sell-of-companies",
  "NGO Registration": "/services/corporate-commercial-advisory/mergers-acquisitions-and-transactions/ngo-registration",
  "Transaction Structuring": "/services/corporate-commercial-advisory/transaction-structuring",
  "Private Equity Transactions": "/services/corporate-commercial-advisory/private-equity-transactions",
  "Investment Transactions": "/services/corporate-commercial-advisory/investment-transactions",
  "Governance Framework & Corporate Policies": "/services/corporate-commercial-advisory/governance-framework-corporate-policies",
  "Shareholder Matters": "/services/corporate-commercial-advisory/shareholder-matters",
  "Board & Committee Processes": "/services/corporate-commercial-advisory/board-committee-processes",
  "Corporate Due Diligence": "/services/corporate-commercial-advisory/corporate-due-diligence",
  "Legal Due Diligence": "/services/corporate-commercial-advisory/legal-due-diligence",
};

const corporateGovernanceChildRoutes: Record<string, string> = {
  "Corporate Exit Plan": "/services/corporate-commercial-advisory/corporate-exit-plan",
  "Demerger & Amalgamation": "/services/corporate-commercial-advisory/demerger-amalgamation",
  "Slump Sale": "/services/corporate-commercial-advisory/slump-sale",
};

const investmentAndTransactionChildRoutes: Record<string, string> = {
  "Investor Coordination":
    "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investor-coordination",
  "Commercial Due Diligence":
    "/services/corporate-commercial-advisory/investment-and-transaction-advisory/commercial-due-diligence",
  "India Entry Strategy":
    "/services/corporate-commercial-advisory/investment-and-transaction-advisory/india-entry-strategy",
  "Investment Structuring":
    "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investment-structuring",
};

const workplaceComplianceChildRoutes: Record<string, string> = {
  "Employment Disputes":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/employment-disputes",
  "POSH Advisory":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/posh-advisory",
  "Workplace Investigations":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/workplace-investigations",
  "HR Compliance Review":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/hr-compliance-review",
  "Payroll / Statutory Coordination":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/payroll-statutory-coordination",
};

const employmentAndLabourChildRoutes: Record<string, string> = {
  "Employee Handbook":
    "/services/industrial-employment-forensics-advisory/employment-and-labour/employee-handbook",
  "Termination / Separation Advisory":
    "/services/industrial-employment-forensics-advisory/employment-and-labour/termination-separation-advisory",
};

const riskForensicsChildRoutes: Record<string, string> = {
  "Fraud Risk & Forensic Review":
    "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/fraud-risk-and-forensic-review",
  "Corporate Investigations":
    "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/corporate-investigations",
  "Compliance Investigations":
    "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/compliance-investigations",
  "Due Diligence / Background Review":
    "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/due-diligence-background-review",
  "White-Collar Advisory":
    "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/white-collar-advisory",
  "Anti-Bribery / Ethics Framework":
    "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/anti-bribery-ethics-framework",
};

const descriptions = [
  "Support across business formation, corporate structuring, transactions and governance.",
  "Practical guidance on corporate, financial and consumer regulatory obligations.",
  "Strategic representation and dispute support across courts, tribunals and arbitration.",
  "Connected advice on business strategy, commercial contracts, investment and transactions.",
  "Coordinate registrations, licences and approvals for businesses, products and institutions.",
  "Protect and manage trademarks, copyright, designs, patents and wider IP portfolios.",
  "Coordinate FEMA, FDI, ODI, external borrowing and cross-border business requirements.",
  "Coordinate direct, indirect and international tax obligations with business decisions.",
  "Advisory across banking, financial regulation, insolvency and restructuring matters.",
  "Employment, workplace, labour, forensic and investigation advisory for organisations.",
  "Connected sustainability, technology, privacy and sector-specific business advisory.",
];

const images = [
  "/services/Corporate & Commercial Advisory.png",
  "/services/Regulatory Services.png",
  "/services/Litigation & Dispute Resolution.png",
  "/services/Business Advisory & Contracts.png",
  "/services/Licensing & Registrations.png",
  "/services/Intellectual Property Right Services.png",
  "/services/FEMA_FDI_CROSS.png",
  "/images/services/gst-and-indirect-tax-regulatory-support.webp",
  "/images/services/banking-nbfc-and-financial-services-advisory.webp",
  "/images/services/hr-and-employment-advisory.webp",
  "/images/services/esg-and-sustainability-advisory.webp",
];

const heroImages = [
  "/services/Corporate & Commercial Advisory.png",
  "/services/Regulatory Services.png",
  "/services/Litigation & Dispute Resolution.png",
  "/services/Business Advisory & Contracts.png",
  "/services/Licensing & Registrations.png",
  "/services/Intellectual Property Right Services.png",
  "/services/FEMA_FDI_CROSS.png",
  "/images/services/gst-and-indirect-tax-regulatory-support.webp",
  "/images/services/banking-nbfc-and-financial-services-advisory.webp",
  "/images/services/risk-governance-and-forensic-advisory.webp",
  "/images/services/esg-and-sustainability-advisory.webp",
];

const icons = ["building", "shield", "scale", "chart", "file", "shield", "globe", "percent", "building", "people", "globe"];

export const services = hierarchy.map((service, index) => ({
  ...service,
  canonicalSlug: service.slug,
  number: service.number,
  shortDescription: descriptions[index],
  description: descriptions[index],
  icon: icons[index],
  image: images[index],
  heroImage: heroImages[index],
  category: service.title,
  subServices: service.subServices.map((group) => ({
    ...group,
    ...(service.slug === "intellectual-property-right-services" && group.slug === "trademark"
      ? { childRoutes: trademarkChildRoutes }
      : {}),
    ...(service.slug === "intellectual-property-right-services" && group.slug === "ip-and-brand-advisory"
      ? { childRoutes: ipBrandAdvisoryChildRoutes }
      : {}),
    ...(service.slug === "litigation-dispute-resolution" && group.slug === "litigation-justice-delivery"
      ? { childRoutes: litigationChildRoutes }
      : {}),
    ...(service.slug === "taxation-compliance" && group.slug === "international-tax"
      ? { childRoutes: internationalTaxChildRoutes }
      : {}),
    ...(service.slug === "corporate-commercial-advisory" && group.slug === "mergers-acquisitions-and-transactions"
      ? { childRoutes: corporateTransactionChildRoutes }
      : {}),
    ...(service.slug === "corporate-commercial-advisory" && group.slug === "corporate-governance-and-entity-structuring"
      ? { childRoutes: corporateGovernanceChildRoutes }
      : {}),
    ...(service.slug === "business-advisory-contracts" && group.slug === "investment-and-transaction-advisory"
      ? { childRoutes: investmentAndTransactionChildRoutes }
      : {}),
    ...(service.slug === "industrial-employment-forensics-advisory" && group.slug === "workplace-compliances"
      ? { childRoutes: workplaceComplianceChildRoutes }
      : {}),
    ...(service.slug === "industrial-employment-forensics-advisory" && group.slug === "employment-and-labour"
      ? { childRoutes: employmentAndLabourChildRoutes }
      : {}),
    ...(service.slug === "industrial-employment-forensics-advisory" && group.slug === "risk-forensics-and-investigations"
      ? { childRoutes: riskForensicsChildRoutes }
      : {}),
  })) as Capability[],
  highlights: service.subServices.slice(0, 4).map((group) => group.title),
}));

export type Service = (typeof services)[number];
export const serviceBanners = Object.fromEntries(
  services.map(({ canonicalSlug, image }) => [canonicalSlug, image]),
);
