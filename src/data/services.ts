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
  "/Part-10 .png",
  "/Part-8 .png",
  "/Part-6 .png",
  "/Part-16 .png",
  "/Part-7 .png",
  "/images/services/intellectual-property.webp",
  "/images/services/fema-fdi-and-foreign-exchange-advisory.webp",
  "/images/services/gst-and-indirect-tax-regulatory-support.webp",
  "/images/services/banking-nbfc-and-financial-services-advisory.webp",
  "/images/services/hr-and-employment-advisory.webp",
  "/images/services/esg-and-sustainability-advisory.webp",
];

const heroImages = [
  "/images/services/corporate-and-commercial-advisory.webp",
  "/images/services/regulatory-and-compliance.webp",
  "/images/services/litigation-and-dispute-resolution.webp",
  "/images/services/business-advisory-and-consulting.webp",
  "/images/services/licensing-and-registrations.webp",
  "/images/services/intellectual-property-rights.webp",
  "/images/services/fema-fdi-and-foreign-exchange-advisory.webp",
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
    ...(service.slug === "corporate-commercial-advisory" && group.slug === "mergers-acquisitions-and-transactions"
      ? { childRoutes: corporateTransactionChildRoutes }
      : {}),
    ...(service.slug === "corporate-commercial-advisory" && group.slug === "corporate-governance-and-entity-structuring"
      ? { childRoutes: corporateGovernanceChildRoutes }
      : {}),
  })) as Capability[],
  highlights: service.subServices.slice(0, 4).map((group) => group.title),
}));

export type Service = (typeof services)[number];
export const serviceBanners = Object.fromEntries(
  services.map(({ canonicalSlug, image }) => [canonicalSlug, image]),
);
