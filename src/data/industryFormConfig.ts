export type IndustryFormEntry = {
  id: string;
  label: string;
  requirements: string[];
};

export const industryFormConfig: IndustryFormEntry[] = [
  { id: "financial-services", label: "Financial Services", requirements: ["RBI & Regulatory Compliance", "NBFC Advisory", "Licensing", "FinTech Regulatory Support", "Corporate Advisory", "Risk & Governance", "Foreign Investment", "Dispute Resolution", "Technology Transformation", "Other"] },
  { id: "fintech-digital-finance", label: "FinTech & Digital Finance", requirements: ["Digital Lending", "Payments & Regulatory Compliance", "Licensing", "Risk & Governance", "Data Privacy", "Commercial Contracts", "Expansion", "Technology Advisory", "Other"] },
  { id: "professional-business-services", label: "Professional & Business Services", requirements: ["Commercial Contracts", "Regulatory Compliance", "Client / Vendor Arrangements", "Employment", "Risk & Governance", "Operations Advisory", "Expansion", "Other"] },
  { id: "real-estate-construction", label: "Real Estate & Construction", requirements: ["RERA", "Project Approval", "Land / Title", "Development Agreement", "Leasing", "Due Diligence", "Investment", "Dispute", "Other"] },
  { id: "aviation-aerospace-defence", label: "Aviation, Aerospace & Defence", requirements: ["Regulatory Approvals", "Commercial Contracts", "Defence / Security Compliance", "Operating Licences", "Land & Infrastructure", "Dispute Support", "Expansion", "Other"] },
  { id: "it-ites", label: "IT & ITES", requirements: ["Digital Transformation", "Commercial Contracts", "Data Protection", "Cybersecurity", "Software Licensing", "Compliance", "AI / Automation", "Vendor Management", "Other"] },
  { id: "artificial-intelligence", label: "Artificial Intelligence", requirements: ["AI Governance", "AI Compliance", "Model Risk", "Commercial Contracts", "Data / Privacy", "AI Strategy", "Other"] },
  { id: "startups", label: "Startups", requirements: ["Entity Structuring", "Fundraising", "Founder Documentation", "Commercial Contracts", "Licensing", "Growth Advisory", "Intellectual Property", "Other"] },
  { id: "media-entertainment", label: "Media & Entertainment", requirements: ["Content / Rights", "Contracts", "Licensing", "Regulatory Compliance", "Investment", "Other"] },
  { id: "telecommunications", label: "Telecommunications", requirements: ["Licensing", "Spectrum / Approvals", "Regulatory Compliance", "Infrastructure Arrangements", "Consumer / Telecom Contracts", "Dispute Support", "Other"] },
  { id: "education", label: "Education", requirements: ["Institution Setup", "Compliance", "Partnership Agreements", "Admissions / Student Matters", "Licensing", "Other"] },
  { id: "renewable-energy", label: "Renewable Energy", requirements: ["Project Approvals", "Contracts", "Regulatory Compliance", "Investment", "Land / Permits", "Supply Chain", "ESG / Sustainability", "Other"] },
  { id: "manufacturing", label: "Manufacturing", requirements: ["Business Setup / Expansion", "Industrial Licensing", "Environmental Compliance", "Contracts", "Supply Chain Agreements", "Labour & Employment", "Tax / GST", "Customs / Import-Export", "Land / Real Estate", "Corporate Compliance", "M&A / Investment", "Technology Transformation", "Other"] },
  { id: "automotive-mobility", label: "Automotive & Mobility", requirements: ["Commercial Contracts", "Regulatory Compliance", "Supply Chain", "Licensing", "Manufacturing / Production", "Investment", "Technology Adoption", "Other"] },
  { id: "infrastructure", label: "Infrastructure", requirements: ["Project Structuring", "Approvals", "Contracts / EPC", "Land / Title", "Investment", "Disputes", "Other"] },
  { id: "logistics", label: "Logistics", requirements: ["Fleet / Operating Models", "Regulatory Compliance", "Contracts", "Cross-Border Trade", "Supply Chain Support", "Land / Warehousing", "Other"] },
  { id: "mining-metals-natural-resources", label: "Mining, Metals & Natural Resources", requirements: ["Licensing", "Regulatory Advisory", "Contracts", "Land / Mining Rights", "Environmental Compliance", "Investment", "Disputes", "Other"] },
  { id: "agriculture-agri-business", label: "Agriculture & Agri-Business", requirements: ["Compliance", "Farm / Land Arrangements", "Contracts", "Investment", "Supply Chain", "Other"] },
  { id: "retail-consumer", label: "Retail & Consumer", requirements: ["Commercial Contracts", "Regulatory Advisory", "Supplier Relationships", "Expansion", "Consumer Issues", "Tax / GST", "Other"] },
  { id: "e-commerce", label: "E-Commerce", requirements: ["Platform Compliance", "Commercial Contracts", "Consumer Protection", "Payments / FinTech", "Regulatory Reviews", "Marketplace Arrangements", "Data Privacy", "Other"] },
  { id: "healthcare-pharma", label: "Healthcare & Pharma", requirements: ["Licensing", "Regulatory Compliance", "Healthcare Contracts", "Pharma Compliance", "Data / Privacy", "Investment", "Employment", "IP", "Dispute", "Other"] },
  { id: "hospitality", label: "Hospitality", requirements: ["Licensing", "Commercial Contracts", "Leasing", "Resort / Operations", "Tourism Compliance", "Other"] },
  { id: "textiles-apparel-lifestyle", label: "Textiles, Apparel & Lifestyle", requirements: ["Commercial Contracts", "Regulatory Compliance", "Supply Chain", "Licensing", "Employment", "Export / Import", "Other"] },
  { id: "government-public-sector", label: "Government & Public Sector", requirements: ["Policy Advisory", "Procurement", "Contracts", "Compliance", "Project Structuring", "Partnerships", "Other"] },
];

export const industryOptions = industryFormConfig.map((industry) => industry.label);
