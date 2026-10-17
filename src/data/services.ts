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

const commercialContractChildRoutes: Record<string, string> = {
  "Contract Drafting, Review & Negotiations": "/services/corporate-commercial-advisory/contract-drafting-review-negotiations",
  "Contract Management": "/services/corporate-commercial-advisory/contract-management",
  "Shareholders' Agreements": "/services/corporate-commercial-advisory/shareholders-agreements",
  "Share Subscription Agreements": "/services/corporate-commercial-advisory/share-subscription-agreements",
  "Joint Venture Agreements": "/services/corporate-commercial-advisory/joint-venture-agreements",
  "Investment Agreements": "/services/corporate-commercial-advisory/investment-agreements",
  "Vendor Supply Agreements": "/services/corporate-commercial-advisory/vendor-supply-agreements",
  "Distribution Agreements": "/services/corporate-commercial-advisory/distribution-agreements",
  "Franchise Agreements": "/services/corporate-commercial-advisory/franchise-agreements",
  "Non-Disclosure Agreement": "/services/corporate-commercial-advisory/ndas",
  "Employment / Consultancy Agreements": "/services/corporate-commercial-advisory/employment-consultancy-agreements",
};

const trademarkChildRoutes: Record<string, string> = {
  "Trademark Search & Filing": "/services/intellectual-property-right-services/trademark/trademark-search-filing",
  Opposition: "/services/intellectual-property-right-services/trademark/opposition",
  "Reply to Examination Response": "/services/intellectual-property-right-services/trademark/reply-to-examination-response",
  Renewal: "/services/intellectual-property-right-services/trademark/renewal",
  "Prosecution & Enforcement": "/services/intellectual-property-right-services/trademark/prosecution-enforcement",
};

const ipBrandAdvisoryChildRoutes: Record<string, string> = {
  Licensing: "/services/intellectual-property-right-services/ip-and-brand-advisory/licensing",
  Assignment: "/services/intellectual-property-right-services/ip-and-brand-advisory/assignment",
};

const litigationChildRoutes: Record<string, string> = {
  "Corporate Litigation": "/services/litigation-dispute-resolution/litigation-justice-delivery/corporate-litigation",
  "Commercial Litigation": "/services/litigation-dispute-resolution/litigation-justice-delivery/commercial-litigation",
  "Labour & Industrial Litigation": "/services/litigation-dispute-resolution/litigation-justice-delivery/labour-industrial-litigation",
  "White-Collar Crime Litigation": "/services/litigation-dispute-resolution/litigation-justice-delivery/white-collar-crime-litigation",
  "Criminal Litigation": "/services/litigation-dispute-resolution/litigation-justice-delivery/criminal-litigation",
};

const internationalTaxChildRoutes: Record<string, string> = {
  "Cross-Border Tax Coordination": "/services/taxation-compliance/international-tax/cross-border-tax-coordination",
  "Transfer Pricing Coordination": "/services/taxation-compliance/international-tax/transfer-pricing-coordination",
  "International Transaction Support": "/services/taxation-compliance/international-tax/international-transaction-support",
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

const icons = ["building", "shield", "scale", "chart", "file", "shield", "globe", "percent", "building", "people", "globe"];

const corporateChildHeroImages: Record<string, string> = {
  "private-limited-company-incorporation": "1.1.png",
  opc: "1.2.png",
  "public-limited-company": "1.3.png",
  "section-8-company": "1.4.png",
  "llp-formation": "1.5.png",
  "partnership-firm": "1.6.png",
  proprietorship: "1.7.png",
  "wholly-owned-subsidiary": "1.8.png",
  "foreign-company-setup": "1.9.png",
  "branch-office": "1.10.png",
  "liaison-office": "1.11.png",
  "project-office": "1.12.png",
  "entity-structuring": "1.13.png",
  "group-structuring": "1.14.png",
  "holding-subsidiary-structures": "1.15.png",
  "shareholding-structuring": "1.16.png",
  "capital-structuring": "1.17.png",
  "business-reorganisation": "1.18.png",
  "corporate-conversion": "1.19.png",
  "succession-family-business-structuring": "1.20.png",
  "corporate-exit-plan": "1.21.png",
  "demerger-amalgamation": "1.22.png",
  "slump-sale": "1.23.png",
  "mergers-acquisitions": "1.24.png",
};

export function getCorporateChildHeroImage(slug: string) {
  const filename = corporateChildHeroImages[slug];
  return filename
    ? `/services/child page of services/Corporate & Commercial/${filename}`
    : undefined;
}

export const services = hierarchy.map((service, index) => ({
  ...service,
  canonicalSlug: service.slug,
  number: service.number,
  shortDescription: descriptions[index],
  description: descriptions[index],
  icon: icons[index],
  image: images[index],
  heroImage: `/services/services hero banner/${Number(service.number)}s.png`,
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
    ...(service.slug === "business-advisory-contracts" && group.slug === "commercial-contracts"
      ? { childRoutes: commercialContractChildRoutes }
      : {}),
  })) as Capability[],
  highlights: service.subServices.slice(0, 4).map((group) => group.title),
}));

export type Service = (typeof services)[number];
export const serviceBanners = Object.fromEntries(
  services.map(({ canonicalSlug, image }) => [canonicalSlug, image]),
);
