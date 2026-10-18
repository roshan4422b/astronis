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

const workplaceComplianceChildRoutes: Record<string, string> = {
  "Employment Disputes":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/employment-disputes",
  "POSH Advisory":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/posh-advisory",
  "Workplace Investigations":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/workplace-investigations",
  "A workplace whistleblower policy":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/a-workplace-whistleblower-policy",
  "HR Compliance Review":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/hr-compliance-review",
  "Payroll / Statutory Coordination":
    "/services/industrial-employment-forensics-advisory/workplace-compliances/payroll-statutory-coordination",
};

const employmentAndLabourChildRoutes: Record<string, string> = {
  "Employment Advisory":
    "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-advisory",
  "Employment Contracts":
    "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-contracts",
  "Labour Law Compliance":
    "/services/industrial-employment-forensics-advisory/employment-and-labour/labour-law-compliance",
  "Human Resource Policies":
    "/services/industrial-employment-forensics-advisory/employment-and-labour/human-resource-policies",
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

const insolvencyRestructuringChildRoutes: Record<string, string> = {
  "Debt Restructuring":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/debt-restructuring",
  "Distressed Business Advisory":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/distressed-business-advisory",
  "Debt & Restructuring Advisory":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/debt-and-restructuring-advisory",
  "IBC Strategy & Advisory":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/ibc-strategy-and-advisory",
  "CIRP-related Advisory":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/cirp-related-advisory",
  "Resolution Planning Support":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/resolution-planning-support",
  "NCLT & NCLAT Advisory":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/nclt-and-nclat-advisory",
  "Liquidation / Closure Support":
    "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/liquidation-closure-support",
};

const bankingFinancialServicesChildRoutes: Record<string, string> = {
  "Financial Services Regulatory":
    "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/financial-services-regulatory",
  "Banking - Loan/Security Documentation":
    "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/banking-loan-security-documentation",
  "Financial Institution Advisory":
    "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/financial-institution-advisory",
};

const technologyPrivacyChildRoutes: Record<string, string> = {
  "DPDP (Digital Personal Data Protection) Compliance":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/dpdp-compliance",
  "Data Protection & Privacy":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-protection-and-privacy",
  "Data Processing Agreements":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-processing-agreements",
  "AI Governance & Regulatory Advisory":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/ai-governance-regulatory-advisory",
  "Technology Contracts":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/technology-contracts",
  "IT Agreements":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/it-agreements",
  "Cybersecurity Regulatory Advisory":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/cybersecurity-regulatory-advisory",
  "E-Commerce Regulatory":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/e-commerce-regulatory",
  "SaaS (Software as a Service) Agreements":
    "/services/environmental-technology-sector-specific/technology-privacy-and-digital/saas-software-as-a-service-agreements",
};

const sustainabilityChildRoutes: Record<string, string> = {
  "Sustainability Reporting Coordination":
    "/services/environmental-technology-sector-specific/esg-and-sustainability/sustainability-reporting-coordination",
};

const ngoInstitutionalChildRoutes: Record<string, string> = {
  "NGO Registration, Nonprofit Compliance & Institutional Advisory":
    "/services/licensing-registrations/ngo-institutional/ngo-registration-nonprofit-compliance-institutional-advisory",
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

const serviceHeroImages: Record<string, string> = {
  "corporate-commercial-advisory": "Futuristic Blue Boardroom Skyline.png",
  "regulatory-services": "Confidential Documents in a Blue Office.png",
  "litigation-dispute-resolution": "sr Contract Management .png",
  "business-advisory-contracts": "Corporate Contract Signing in Blue.png",
  "licensing-registrations": "sr Shareholders' Agreements .png",
  "intellectual-property-right-services": "sr Share Subscription Agreements .png",
  "fema-fdi-cross-border": "Global Business Partnership In Blue.png",
  "taxation-compliance": "Global Finance in Blue Light.png",
  "banking-insolvency-restructuring-advisory": "sr Investment Agreements .png",
  "industrial-employment-forensics-advisory": "sr oint Venture Agreements .png",
  "environmental-technology-sector-specific": "sr .png",
};

const serviceChildHeroImages: Record<string, string> = {
  "amfi-regulatory-advisory": "AMFI Finance by the Waterfront.png",
  "airports-economic-regulatory-advisory": "Midnight Blue Airport Operations.png",
  "banking-advisory": "Banking Advisory services .png",
  "bis-isi-regulatory-advisory": "BIS Testing Laboratory.png",
  "bis-bureau-of-indian-standards": "BIS Testing Laboratory.png",
  "board-committee-processes": "Futuristic Blue Boardroom Skyline.png",
  "banking-insolvency-restructuring-advisory:fintech-advisory-and-compliance": "Global Finance in Blue Light.png",
  "banking-insolvency-restructuring-advisory:nbfc-compliance": "Reserve Bank of India Night Finance Scene.png",
  "banking-insolvency-restructuring-advisory:nbfc-formation-licensing-advisory": "Reserve Bank of India Night Finance Scene.png",
  "banking-insolvency-restructuring-advisory:rbi-regulatory": "Reserve Bank of India Night Finance Scene.png",
  "business-advisory-contracts:business-market-entry-advisory": "India Market Entry Strategy.png",
  "business-advisory-contracts:investment-structuring": "Global Finance in Blue Light.png",
  "business-advisory-contracts:investor-coordination": "Global Business Partnership In Blue.png",
  "central-administrative-tribunal": "Central Administrative Tribunal at Dusk.png",
  "commercial-due-diligence": "Commercial Due Diligence.png",
  "contract-drafting-review-negotiations": "Corporate Contract Signing in Blue.png",
  "contract-management": "sr Contract Management .png",
  "corporate-compliance": "Corporate regulatory services '.png",
  "corporate-litigation": "Cinematic Blue-Toned Legal Office.png",
  "brand-protection": "Cinematic Blue-Toned Legal Office.png",
  "entity-structuring": "Organisational Structuring .png",
  "governance-framework-corporate-policies": "Governance & Management Framework .png",
  "india-entry-strategy": "India Entry Strategy .png",
  "import-export": "Import-Export .png",
  "investment-agreements": "sr Investment Agreements .png",
  "ip-due-diligence": "Due Diligence in Blue.png",
  "ip-portfolio-management": "Due Diligence in Blue.png",
  "joint-venture-agreements": "sr oint Venture Agreements .png",
  "legal-due-diligence": "Due Diligence in Blue.png",
  "logistics": "Logistics Advisory services .png",
  "mca21-roc-matters": "Confidential Documents in a Blue Office.png",
  "prevention-of-money-laundring": "Prevention of Money Laundring .png",
  "rbi-regulatory": "Reserve Bank of India Night Finance Scene.png",
  "rbi-regulatory-advisory": "Reserve Bank of India Night Finance Scene.png",
  "shareholders-agreements": "sr Shareholders' Agreements .png",
  "share-subscription-agreements": "sr Share Subscription Agreements .png",
  "trade-health-licence": "Trade Health license .png",
  "udyam-msme": "MSME .png",
  "corporate-commercial-advisory:private-limited-company-incorporation": "Corporate regulatory services '.png",
  "corporate-commercial-advisory:private-limited": "Corporate regulatory services '.png",
  "corporate-commercial-advisory:one-person-company-opc": "Organisational Structuring .png",
  "corporate-commercial-advisory:opc": "Organisational Structuring .png",
  "corporate-commercial-advisory:public-limited-company": "sr Share Subscription Agreements .png",
  "corporate-commercial-advisory:section-8-company": "Corporate regulatory services '.png",
  "corporate-commercial-advisory:llp-formation": "Organisational Structuring .png",
  "corporate-commercial-advisory:partnership-firm": "Global Business Partnership In Blue.png",
  "corporate-commercial-advisory:sole-proprietorship": "MSME .png",
  "corporate-commercial-advisory:proprietorship": "MSME .png",
  "corporate-commercial-advisory:wholly-owned-subsidiary": "Organisational Structuring .png",
  "corporate-commercial-advisory:foreign-company-setup": "Global Business Partnership In Blue.png",
  "corporate-commercial-advisory:branch-office": "India Entry Strategy .png",
  "corporate-commercial-advisory:liaison-office": "India Market Entry Strategy.png",
  "corporate-commercial-advisory:project-office": "India Entry Strategy .png",
  "corporate-commercial-advisory:entity-structuring": "Organisational Structuring .png",
  "corporate-commercial-advisory:group-structuring": "Governance & Management Framework .png",
  "corporate-commercial-advisory:holding-subsidiary-structures": "Organisational Structuring .png",
  "corporate-commercial-advisory:holding-and-subsidiary-structures": "Organisational Structuring .png",
  "corporate-commercial-advisory:shareholding-structuring": "sr Shareholders' Agreements .png",
  "corporate-commercial-advisory:capital-structuring": "Global Finance in Blue Light.png",
  "corporate-commercial-advisory:business-reorganisation": "Governance & Management Framework .png",
  "corporate-commercial-advisory:corporate-conversion": "Corporate regulatory services '.png",
  "corporate-commercial-advisory:succession-family-business-structuring": "Organisational Structuring .png",
  "corporate-commercial-advisory:succession-and-family-business-structuring": "Organisational Structuring .png",
  "corporate-commercial-advisory:corporate-exit-plan": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:demerger-amalgamation": "Global Finance in Blue Light.png",
  "corporate-commercial-advisory:slump-sale": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:mergers-acquisitions": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:buy-or-sell-business-entity": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:buy-or-sell-of-companies": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:ngo-registration": "Cinematic Blue-Toned Legal Office.png",
  "corporate-commercial-advisory:transaction-structuring": "Global Finance in Blue Light.png",
  "corporate-commercial-advisory:private-equity-transactions": "sr Investment Agreements .png",
  "corporate-commercial-advisory:investment-transactions": "sr Investment Agreements .png",
  "corporate-commercial-advisory:governance-framework-corporate-policies": "Governance & Management Framework .png",
  "corporate-commercial-advisory:governance-framework-and-corporate-policies": "Governance & Management Framework .png",
  "corporate-commercial-advisory:shareholder-matters": "sr Shareholders' Agreements .png",
  "corporate-commercial-advisory:board-committee-processes": "Futuristic Blue Boardroom Skyline.png",
  "corporate-commercial-advisory:board-and-committee-processes": "Futuristic Blue Boardroom Skyline.png",
  "corporate-commercial-advisory:governance-due-diligence-review": "Due Diligence in Blue.png",
  "corporate-commercial-advisory:corporate-due-diligence": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:legal-due-diligence": "Due Diligence in Blue.png",
  "corporate-commercial-advisory:contract-drafting-review-negotiations": "Corporate Contract Signing in Blue.png",
  "corporate-commercial-advisory:contract-management": "sr Contract Management .png",
  "corporate-commercial-advisory:shareholders-agreements": "sr Shareholders' Agreements .png",
  "corporate-commercial-advisory:share-subscription-agreements": "sr Share Subscription Agreements .png",
  "corporate-commercial-advisory:joint-venture-agreements": "sr oint Venture Agreements .png",
  "corporate-commercial-advisory:investment-agreements": "sr Investment Agreements .png",
  "corporate-commercial-advisory:vendor-supply-agreements": "Corporate Contract Signing in Blue.png",
  "corporate-commercial-advisory:distribution-agreements": "Global Business Partnership In Blue.png",
  "corporate-commercial-advisory:franchise-agreements": "Global Business Partnership In Blue.png",
  "corporate-commercial-advisory:ndas": "Confidential Documents in a Blue Office.png",
  "corporate-commercial-advisory:employment-consultancy-agreements": "Corporate Contract Signing in Blue.png",
  "corporate-commercial-advisory:corporate-closure-exit": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:commercial-due-diligence": "Commercial Due Diligence.png",
  "corporate-commercial-advisory:india-entry-strategy": "India Entry Strategy .png",
  "corporate-commercial-advisory:investment-structuring": "Global Finance in Blue Light.png",
  "corporate-commercial-advisory:investor-coordination": "Global Business Partnership In Blue.png",
  "fema-fdi-cross-border:investment-structuring": "Global Business Partnership In Blue.png",
  "fema-fdi-cross-border:international-joint-ventures": "Global Business Partnership In Blue.png",
  "fema-fdi-cross-border:overseas-joint-venture": "Global Business Partnership In Blue.png",
};

const serviceChildHeroFallbacks: Record<string, string> = {
  "corporate-commercial-advisory": "Corporate regulatory services '.png",
  "regulatory-services": "Confidential Documents in a Blue Office.png",
  "litigation-dispute-resolution": "Cinematic Blue-Toned Legal Office.png",
  "business-advisory-contracts": "India Entry Strategy .png",
  "licensing-registrations": "Trade Health license .png",
  "intellectual-property-right-services": "Due Diligence in Blue.png",
  "fema-fdi-cross-border": "Global Business Partnership In Blue.png",
  "taxation-compliance": "Global Finance in Blue Light.png",
  "banking-insolvency-restructuring-advisory": "Reserve Bank of India Night Finance Scene.png",
  "industrial-employment-forensics-advisory": "Governance & Management Framework .png",
  "environmental-technology-sector-specific": "Logistics Advisory services .png",
};

const childHeroAssetDirectory = "/services/child page of services/Corporate & Commercial";

export function getServiceChildHeroImage(slug: string, serviceSlug?: string): string {
  const filename = (serviceSlug && serviceChildHeroImages[`${serviceSlug}:${slug}`])
    || serviceChildHeroImages[slug]
    || (serviceSlug && serviceChildHeroFallbacks[serviceSlug])
    || "Corporate regulatory services '.png";
  return `${childHeroAssetDirectory}/${filename}`;
}

export const services = hierarchy.map((service, index) => ({
  ...service,
  canonicalSlug: service.slug,
  number: service.number,
  shortDescription: descriptions[index],
  description: descriptions[index],
  icon: icons[index],
  image: images[index],
  heroImage: `/services/services hero banner/${serviceHeroImages[service.slug]}`,
  category: service.title,
  subServices: service.subServices.map((group) => ({
    ...group,
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
