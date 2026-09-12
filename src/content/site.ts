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
    "Integrated Perspective",
    "Legal, regulatory and business perspectives brought together in one advisory approach.",
  ],
  [
    "Regulatory Relationships",
    "Strong relationships with regulators, authorities, institutions and relevant stakeholders.",
  ],
  [
    "Practical Solutions",
    "Advice designed to be commercially sound, actionable and aligned with business objectives.",
  ],
  [
    "Transparent Communication",
    "Clear, timely and transparent communication throughout every engagement.",
  ],
  [
    "Dedicated Advisory Support",
    "Focused support tailored to the client's specific requirements and priorities.",
  ],
  [
    "Pan-India Presence",
    "Ability to support businesses across jurisdictions throughout India.",
  ],
  [
    "Global Collaboration",
    "Cross-border perspective and international collaboration for global business requirements.",
  ],
  [
    "Multidisciplinary Approach",
    "Integrated capabilities across legal, regulatory, corporate and business advisory matters.",
  ],
  [
    "Long-Term Partnerships",
    "Building enduring client relationships based on trust, responsiveness and measurable value.",
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
export const serviceFaqs: Record<string, [string, string][]> = {
  "business-formation": [
    [
      "Can Astronis Global assist with company incorporation and business setup?",
      "Yes. We assist clients with selecting the right entity structure and establishing companies, LLPs and other permissible business entities with associated registrations and regulatory support.",
    ],
    [
      "What business structure should I choose?",
      "The right structure depends on ownership, investment plans, regulatory exposure, liability needs and business objectives. We assess these factors and advise on the most suitable option.",
    ],
    [
      "Do you help with licensing and registrations after incorporation?",
      "Yes. We can support post-incorporation registrations, licence applications, operational approvals and ongoing compliance requirements based on the business activity.",
    ],
  ],
  "corporate-advisory": [
    [
      "What kind of corporate advisory services do you provide?",
      "Our corporate advisory services include company formation, corporate structuring, governance, shareholder arrangements, joint ventures, restructuring, due diligence, M&A and ongoing corporate compliance support.",
    ],
    [
      "Can Astronis Global draft and review commercial contracts?",
      "Yes. We assist with drafting, reviewing, negotiating and managing commercial agreements such as vendor contracts, service agreements, consultancy agreements, employment arrangements, NDAs and technology contracts.",
    ],
    [
      "Do you provide merger and acquisition advisory?",
      "Yes. Our support can include preliminary structuring, legal and regulatory due diligence, transaction documentation, negotiations, closing requirements and post-transaction compliance.",
    ],
  ],
  "regulatory-and-compliance": [
    [
      "What are regulatory advisory services?",
      "Regulatory advisory involves identifying and managing the laws, licences, approvals, registrations and ongoing requirements applicable to a business or transaction. We help clients understand their obligations and structure a practical compliance framework.",
    ],
    [
      "Can Astronis Global identify licences required for my business?",
      "Yes. Licensing requirements vary by business activity, industry, location and regulatory structure. We can assess the sector and advise on applicable registrations, licences and approvals.",
    ],
    [
      "Do you provide ongoing compliance support?",
      "Yes. Depending on the engagement, we can provide recurring regulatory support to monitor filings, renewals, operational obligations and compliance deadlines.",
    ],
  ],
  "foreign-investment": [
    [
      "Does Astronis Global assist foreign companies entering India?",
      "Yes. We assist foreign businesses and investors with India-entry structures, corporate establishment, foreign investment regulations, approvals and documentation requirements.",
    ],
    [
      "Do you advise on FEMA and FDI matters?",
      "Yes. Our advisory services include FEMA, FDI, ODI, cross-border transactions and related regulatory compliance for domestic and international business structures.",
    ],
    [
      "Can you assist Indian businesses expanding overseas?",
      "Yes. We advise on overseas expansion, foreign investment structures, international collaborations and cross-border legal considerations subject to the relevant jurisdictional requirements.",
    ],
  ],
  "intellectual-property": [
    [
      "Does Astronis Global provide trademark registration services?",
      "Yes. We assist clients with trademark searches, filings, prosecution and related matters based on the facts and requirements of each case.",
    ],
    [
      "Do you handle intellectual property beyond trademarks?",
      "Yes. We may advise on trademarks, copyright, designs, patents and related advisory, registration, commercialisation and enforcement matters, either directly or through appropriate professionals.",
    ],
    [
      "Can you help protect a company’s brand and intellectual property?",
      "Yes. We assist businesses in identifying core IP assets and developing protection strategies through registration, contractual protection, licensing and enforcement measures.",
    ],
  ],
  "litigation-and-dispute-resolution": [
    [
      "Does Astronis Global handle litigation?",
      "Yes. Our legal and dispute-resolution capabilities cover civil, commercial, banking, insolvency, MSME, arbitration and intellectual-property disputes before the appropriate forums.",
    ],
    [
      "Do you represent clients before NCLT and NCLAT?",
      "Yes. We provide representation and advisory support in appropriate matters under the National Company Law Tribunal and National Company Law Appellate Tribunal.",
    ],
    [
      "Can you assist before litigation begins?",
      "Yes. Early assessment can help identify commercial and procedural options before formal proceedings begin, including notices, negotiation and settlement strategy.",
    ],
  ],
  "business-advisory": [
    [
      "How is business advisory different from legal advisory?",
      "Legal advisory addresses rights, obligations, contracts and legal risk, while business advisory considers the broader commercial and operational consequences. We integrate both perspectives to support practical decision-making.",
    ],
    [
      "Can you help businesses plan a regulatory strategy before launching a new service?",
      "Yes. Early regulatory planning is important for businesses in regulated industries. We help identify key obligations and build an implementation roadmap aligned with business goals.",
    ],
    [
      "What is Astronis Global’s approach to client assignments?",
      "We begin by understanding the client’s objectives and facts, then identify the key issues, assess legal and regulatory implications, and develop a practical implementation strategy.",
    ],
  ],
  "banking-rbi-nbfc": [
    [
      "Does Astronis Global advise financial services businesses?",
      "Yes. We provide advisory support concerning banking, NBFC, fintech and financial-services matters depending on the regulatory status and nature of the business.",
    ],
    [
      "Can you assist with RBI-related regulatory matters?",
      "Yes. We advise on RBI-administered frameworks relevant to a client’s activity or transaction, and the requirement for approval or compliance is assessed on a case-specific basis.",
    ],
  ],
  "startup-advisory": [
    [
      "Does Astronis Global work with startups and new businesses?",
      "Yes. We assist entrepreneurs with entity structuring, incorporation, founders’ arrangements, licensing, regulatory compliance and growth planning.",
    ],
    [
      "Can you help with investment and fundraising support?",
      "Yes. We can support startup advisory work related to investment structuring, transaction documentation and regulatory considerations as the business scales.",
    ],
  ],
  "contracts": [
    [
      "Can Astronis Global draft and review commercial contracts?",
      "Yes. We assist with commercial agreements, technology contracts, vendor and service agreements, confidentiality arrangements and key business documents.",
    ],
    [
      "Can you help before disputes arise?",
      "Yes. Early legal review can help prevent disputes by identifying risk areas, clarifying obligations and supporting negotiation before a problem escalates.",
    ],
  ],
  "corporate-transactions": [
    [
      "Do you provide merger and acquisition advisory?",
      "Yes. Depending on the transaction, our support may cover structuring, legal and regulatory due diligence, negotiation and closing requirements.",
    ],
    [
      "Can you assist with due diligence for business transactions?",
      "Yes. We can support transaction due diligence, risk screening and documentation to help clients make informed decisions in acquisitions and commercial deals.",
    ],
  ],
};
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
  [
    "Corporate Restructuring for a Growing Enterprise",
    "Advised on entity restructuring, governance and commercial documentation to support the next stage of business growth.",
    "Corporate & Commercial",
    "Professional & Business Services .png",
    "corporate-advisory",
  ],
  [
    "Licensing Roadmap for a New Market Entry",
    "Coordinated licensing, registrations and statutory approvals for a business entering a regulated market.",
    "Licensing & Registrations",
    "Retail & E-Commerce .png",
    "licensing-and-registrations",
  ],
  [
    "IP Strategy for a Digital Product Portfolio",
    "Built a practical trademark, copyright and design protection strategy for a technology-led product portfolio.",
    "Intellectual Property",
    "Technology, IT & ITES .png",
    "intellectual-property",
  ],
  [
    "Compliance Framework for a Multi-State Business",
    "Designed a coordinated compliance framework covering registrations, tax obligations and recurring regulatory requirements.",
    "Taxation & Compliance",
    "Manufacturing & Industrial .png",
    "taxation-and-compliance",
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
  "Corporate & Commercial Insight",
  "Licensing & Registrations Update",
  "Intellectual Property Insight",
  "FEMA & Cross-Border Insight",
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
