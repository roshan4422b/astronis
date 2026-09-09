import menu from "./service-menu.json";
export { default as siteMenu } from "./site-menu.json";
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const contact = {
  phone: "+91 9311664455",
  phoneHref: "tel:+919311664455",
  email: "advisory@astronisglobal.com",
  landline: "01146574455",
};
export const serviceGroups = menu.map((group) => ({
  ...group,
  slug: slugify(group.title),
}));
export const practices = [
  {
    title: "Corporate & Commercial",
    description:
      "Entity structuring, contracts, joint ventures, M&A and corporate governance.",
    slug: "corporate-advisory",
    icon: "building",
  },
  {
    title: "Regulatory Services",
    description:
      "Regulatory compliance, licensing, approvals, advisory and representation.",
    slug: "regulatory-and-compliance",
    icon: "shield",
  },
  {
    title: "Litigation & Dispute Resolution",
    description:
      "Civil, criminal, commercial litigation and alternative dispute resolution.",
    slug: "litigation-and-dispute-resolution",
    icon: "scale",
  },
  {
    title: "Business Advisory",
    description:
      "Strategic business advisory, risk management, transactions and transformation.",
    slug: "business-advisory",
    icon: "chart",
  },
  {
    title: "Licensing & Registrations",
    description: "End-to-end licences, registrations and statutory approvals.",
    slug: "licensing-and-registrations",
    icon: "file",
  },
  {
    title: "IPR & Other Registrations",
    description:
      "Trademark, copyright, patent, design and intellectual-property protection.",
    slug: "intellectual-property",
    icon: "bulb",
  },
  {
    title: "FEMA / Foreign Exchange",
    description:
      "FEMA, RBI, FDI, ODI, ECB and cross-border transaction advisory.",
    slug: "foreign-investment",
    icon: "globe",
  },
  {
    title: "Taxation & Compliance",
    description:
      "Tax advisory, registrations, compliance and regulatory support.",
    slug: "taxation-and-compliance",
    icon: "document",
  },
];
export const reasons = [
  [
    "Deep Domain Expertise",
    "Strong legal, regulatory and business advisory expertise across diverse sectors.",
  ],
  [
    "Trusted Relationships",
    "Strong relationships with regulators, government authorities, institutions and industry stakeholders.",
  ],
  [
    "Practical & Business-Focused",
    "Solutions designed to be commercially sound, practical, actionable and aligned with business objectives.",
  ],
  [
    "Integrity & Excellence",
    "Committed to the highest standards of integrity, ethics, professional excellence and responsible advisory.",
  ],
  [
    "Pan India & Global Reach",
    "Pan-India presence supported by global collaboration for domestic and cross-border business requirements.",
  ],
  [
    "Dedicated Client Partnership",
    "Long-term relationships built on transparency, responsiveness, accessibility and measurable impact.",
  ],
];
export const statistics = [
  ["Since 2015", "Established & Growing"],
  ["11+ Years", "Professional Experience"],
  ["Pan India", "Presence"],
  ["Global", "Advisory"],
  ["1000+", "Advisory Assignments"],
  ["Multi-sector", "Expertise"],
];
export const industries = [
  ["Manufacturing", "Manufacturing & Industrial .png"],
  ["IT & ITES", "Technology, IT & ITES .png"],
  ["E-Commerce", "Retail & E-Commerce .png"],
  ["Real Estate & Construction", "Real Estate & Construction .png"],
  ["Healthcare & Pharma", "Healthcare & Pharmaceuticals .png"],
  ["Financial Services", "Banking & Financial Services .png"],
  ["Education", "Education & EdTech .png"],
  ["Startups", "Startups & Emerging Businesses .png"],
  ["Renewable Energy", "nergy, Power & Renewables .png"],
  ["Hospitality", "Hospitality, Travel & Tourism .png"],
  ["Logistics", "Logistics, Transportation & Warehousing .png"],
  ["Retail & Consumer", "FMCG FOOD .png"],
  ["Infrastructure", "Infrastructure & Projects .png"],
  ["Media & Entertainment", "Media, Entertainment & Sports .png"],
  ["Agriculture & Agri-Business", "Agriculture & Agri-Business .png"],
  ["Automotive & Mobility", "Automotive & Mobility S .png"],
  ["Aviation, Aerospace & Defence", "Aviation, Aerospace & Defence .png"],
  ["FinTech & Digital Finance", "FinTech & Digital Finance .png"],
  [
    "Mining, Metals & Natural Resources",
    "Mining, Metals & Natural Resources .png",
  ],
  [
    "Government & Public Sector",
    "overnment, Public Sector & Institutions .png",
  ],
  ["Professional & Business Services", "Professional & Business Services .png"],
  ["Telecommunications", "Telecommunications & Digital Infrastructure .png"],
  ["Textiles, Apparel & Lifestyle", "Textiles, Apparel & Lifestyle .png"],
  ["Artificial Intelligence", "Technology, IT & ITES .png"],
].map(([title, image]) => ({
  title,
  image: "/" + image,
  slug: slugify(title),
}));
export const approach = [
  ["Understand", "Understand objectives, business context and requirements."],
  [
    "Assess",
    "Assess legal, regulatory, commercial and operational considerations.",
  ],
  [
    "Strategise",
    "Develop a practical and commercially aligned course of action.",
  ],
  [
    "Execute",
    "Coordinate documentation, applications, transactions, representation and implementation.",
  ],
  ["Monitor", "Track developments, obligations, timelines and emerging risks."],
  [
    "Deliver",
    "Provide outcome-focused support and clear communication throughout the engagement.",
  ],
];
export const faqs = [
  [
    "What services does Astronis Global provide?",
    "Astronis Global provides corporate, regulatory, legal and business advisory services, including corporate and commercial matters, dispute resolution, licensing, intellectual property, FEMA and taxation compliance support.",
  ],
  [
    "Do you assist businesses across India?",
    "Yes. Our pan-India presence supports businesses with legal, regulatory and commercial requirements across sectors and locations. Contact our team to discuss your jurisdiction and requirements.",
  ],
  [
    "Can Astronis Global assist with regulatory approvals and licences?",
    "Yes. Our regulatory and licensing practice supports applications, documentation, statutory approvals, registrations and coordination with relevant authorities.",
  ],
  [
    "Do you provide cross-border and FEMA advisory?",
    "Yes. Our capabilities include FEMA, RBI, FDI, ODI, ECB and cross-border transaction advisory, supported by global collaboration and jurisdiction-specific understanding.",
  ],
  [
    "How can I consult your team?",
    "Call +91 9311664455, email advisory@astronisglobal.com, or use our enquiry form to share your service area, location and requirements.",
  ],
];
export const stories = [
  [
    "Regulatory Approval for Infrastructure Project",
    "Secured critical approvals and clearances from multiple authorities within agreed timelines, enabling smooth project execution.",
    "Regulatory Services",
    "Infrastructure & Projects .png",
    "regulatory-and-compliance",
  ],
  [
    "FDI Advisory for Global Technology Company",
    "Provided end-to-end FDI advisory and RBI compliance support for a foreign investment into an Indian subsidiary.",
    "Foreign Investment",
    "Technology, IT & ITES .png",
    "foreign-investment",
  ],
  [
    "IP Protection for Leading Consumer Brand",
    "Successfully registered trademark across multiple jurisdictions and supported IP enforcement against infringement.",
    "Intellectual Property",
    "FMCG FOOD .png",
    "intellectual-property",
  ],
  [
    "FEMA Compliance for Cross-Border Transactions",
    "Structured and advised on cross-border investments and remittances, supporting FEMA compliance and risk mitigation.",
    "FEMA Advisory",
    "FinTech & Digital Finance .png",
    "foreign-investment",
  ],
].map(([title, description, category, image, service]) => ({
  title,
  description,
  category,
  image: "/" + image,
  service,
  slug: slugify(title),
}));
// No dated articles, named professionals or testimonials were supplied. Publish approved records here.
export const insightCategories = [
  "Legal Update",
  "Regulatory Update",
  "Business Insight",
  "Tax / Compliance Update",
];
export const countries = [
  "India",
  "UAE",
  "Singapore",
  "UK",
  "USA",
  "EU",
  "Middle East",
];
