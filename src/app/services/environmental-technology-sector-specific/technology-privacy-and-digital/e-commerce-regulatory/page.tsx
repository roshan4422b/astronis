import type { Metadata } from "next";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

export const metadata: Metadata = {
  title: "E-Commerce Regulatory | Astronis Global",
  description:
    "Legal and regulatory advisory for e-commerce marketplaces, online sellers, digital platforms, consumer protection, payments, data and cross-border operations.",
  alternates: {
    canonical:
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/e-commerce-regulatory",
  },
};

const data: EntityFormationPageData = {
  slug: "e-commerce-regulatory",
  title: "E-Commerce Regulatory",
  shortTitle: "E-Commerce Regulatory",
  serviceTitle: "Environmental, Technology & Sector Specific",
  serviceHref: "/services/environmental-technology-sector-specific",
  categoryTitle: "Technology, Privacy & Digital",
  categoryHref:
    "/services/environmental-technology-sector-specific#technology-privacy-and-digital",
  heroEyebrow: "TECHNOLOGY, PRIVACY & DIGITAL",
  heroPrimaryAction: "Schedule an E-Commerce Regulatory Consultation",
  heroPrimaryHref: "/contact",
  heroSecondaryAction: "Request an E-Commerce Compliance Review",
  heroSecondaryHref: "/professionals/enquiry",
  heroStatement:
    "Enabling Compliant Digital Commerce. Protecting Consumer Interests. Strengthening Marketplace Governance.",
  description:
    "Astronis Global provides integrated corporate, regulatory, legal and business advisory for establishing, operating and expanding e-commerce businesses in India and international markets. We assist online marketplaces, D2C brands, digital retailers, technology platforms, logistics partners and payment businesses with business models, consumer protection, product compliance, digital advertising, data protection, foreign investment, payments, taxation, regulatory notices and dispute management.",
  introduction:
    "E-commerce businesses operate across consumer, technology, payment, logistics and product-regulatory frameworks. The applicable obligations depend on the business model, seller relationships, products, customer data, payment flows and whether the platform operates as a marketplace, inventory-based or direct-to-consumer business.",
  image: "/Banner-E-Commerce & Digital Platforms .png",
  imageAlt:
    "Digital commerce professionals reviewing marketplace and consumer compliance requirements",
  heroNoteEyebrow: "E-COMMERCE REGULATORY ADVISORY",
  heroNoteTitle: "Build compliant digital marketplaces.",
  heroNoteDescription:
    "Protect consumers and support responsible e-commerce growth across the business lifecycle.",
  basicPrice: "By scope",
  comprehensivePrice: "Tailored",
  showSectionNavigation: true,
  showIntro: false,
  showTestimonials: false,
  showReviewActions: false,
  showFeatures: false,
  showInsights: true,
  showKnowledge: true,
  benefitCards: true,
  benefitCardsStacked: true,
  benefitCardsThreeColumns: true,
  benefitsHeading: "Why E-Commerce Regulatory Advisory is Necessary",
  benefits: [
    [
      "scale",
      "Clearer regulatory positioning and reduced legal risk",
      "Assess applicable obligations based on platform model, products, customers and transaction flows.",
    ],
    [
      "shield",
      "Stronger consumer trust and brand reputation",
      "Review disclosures, grievance handling, refunds and consumer-facing practices.",
    ],
    [
      "people",
      "Compliant seller and platform governance",
      "Clarify platform and seller responsibilities, onboarding standards and contractual controls.",
    ],
    [
      "checklist",
      "Better alignment of payments, tax and FDI requirements",
      "Consider regulatory and operational requirements across the e-commerce business model.",
    ],
    [
      "document",
      "Reduced risk of regulatory notices and disputes",
      "Review policies, product listings, advertising claims and complaint-response processes.",
    ],
    [
      "chart",
      "Enable sustainable digital commerce growth",
      "Build compliance considerations into new products, markets and platform operations.",
    ],
  ],
  servicesHeading: "Our E-Commerce Regulatory Services",
  servicesDescription:
    "Advisory across business models, consumer protection, sellers, advertising, payments, taxation and regulatory response.",
  serviceCardsThreeColumns: true,
  services: [
    [
      "document",
      "E-Commerce Business Model & Regulatory Advisory",
      "Assess marketplace, inventory, D2C, hybrid and platform arrangements under applicable Indian laws and regulations.",
    ],
    [
      "shield",
      "Consumer Protection & Marketplace Compliance",
      "Review disclosures, seller information, grievance mechanisms, refunds, returns and platform obligations.",
    ],
    [
      "checklist",
      "Seller Onboarding, Platform Policies & Contracts",
      "Draft seller agreements, customer policies, platform rules and commercial safeguards.",
    ],
    [
      "target",
      "Digital Advertising, Pricing & Product Compliance",
      "Assess online advertisements, product descriptions, pricing, labelling and sector-specific requirements.",
    ],
    [
      "globe",
      "FDI, Payments, Taxation & Cross-Border E-Commerce",
      "Review foreign investment, payment arrangements, GST, customs and international sales structures.",
    ],
    [
      "scale",
      "Regulatory Notices, Audits & Disputes",
      "Support compliance assessments, consumer complaints, regulatory correspondence and dispute resolution.",
    ],
  ],
  structureEyebrow: "WHO NEEDS THESE SERVICES?",
  structureHeading: "E-commerce compliance for digital business participants",
  structurePoints: [
    [
      "building",
      "Online marketplaces",
      "Platforms connecting sellers and buyers and managing marketplace responsibilities.",
    ],
    [
      "document",
      "D2C brands",
      "Brands selling directly to consumers through online channels and digital storefronts.",
    ],
    [
      "chart",
      "Online retailers",
      "Businesses operating inventory-based or hybrid online retail models.",
    ],
    [
      "network",
      "Logistics and investors",
      "Service providers and investors supporting digital commerce operations and growth.",
    ],
    [
      "globe",
      "Global enterprises",
      "International businesses entering, supplying or expanding in Indian digital markets.",
    ],
    [
      "bank",
      "Payment and technology partners",
      "Businesses supporting online transactions, payment flows and platform infrastructure.",
    ],
  ],
  comparisonHeading: "E-Commerce Business Models",
  comparisonDescription:
    "Marketplace, inventory-based and direct-to-consumer models can involve different roles, obligations and regulatory considerations.",
  comparisonNote:
    "This comparison is indicative. Legal treatment depends on the actual operating model, contractual arrangements, products and applicable rules.",
  comparison: [],
  comparisonPanels: [
    {
      heading: "Marketplace vs Inventory-Based vs Direct-to-Consumer (D2C)",
      headers: ["Parameter", "Marketplace", "Inventory-Based", "Direct-to-Consumer (D2C)"],
      rows: [
        [
          "Business model",
          "Platform for third-party sellers",
          "Owns inventory and sells",
          "Brand sells directly to consumers",
        ],
        [
          "Product ownership",
          "Third-party sellers",
          "Platform entity",
          "Brand or its entity",
        ],
        [
          "Key compliance focus",
          "Seller governance and disclosures",
          "Product sale and inventory",
          "Product, advertising and customer terms",
        ],
        [
          "FDI consideration",
          "Specific marketplace conditions",
          "Restrictions may apply",
          "Sector-dependent",
        ],
        [
          "Customer interface",
          "Multiple sellers",
          "Single platform entity",
          "Brand-owned experience",
        ],
      ],
    },
    {
      heading: "Indian Laws vs International Frameworks",
      headers: ["Parameter", "India (Key Laws)", "EU / US (Selected)"],
      rows: [
        [
          "Consumer protection",
          "Consumer Protection Act, 2019 and E-Commerce Rules",
          "EU Consumer Rights / FTC",
        ],
        [
          "Data protection",
          "DPDP Act, 2023, as applicable",
          "GDPR / CCPA",
        ],
        [
          "E-commerce rules",
          "E-Commerce Rules, 2020",
          "Platform Regulation / EU rules",
        ],
        [
          "Payments",
          "RBI payment directions",
          "PSD2 / global frameworks",
        ],
        [
          "Taxation",
          "GST, income tax and TCS, as applicable",
          "Sales tax / VAT regimes",
        ],
        [
          "Foreign investment",
          "FDI Policy and FEMA",
          "Country-specific rules",
        ],
      ],
    },
  ],
  processEyebrow: "E-COMMERCE REGULATORY ADVISORY PROCESS",
  processHeading: "A structured seven-stage compliance process",
  processDescription:
    "Assess the business model and applicable rules, strengthen platform policies, and support compliant operations and ongoing monitoring.",
  processNumbers: true,
  process: [
    [
      "Initial Consultation & Business Profiling",
      "Understand business model, products, platform features, customers and transaction flows.",
    ],
    [
      "Legal & Regulatory Assessment",
      "Map applicable laws, responsibilities and compliance obligations.",
    ],
    [
      "Risk Analysis & Compliance Planning",
      "Review business-model risks and prioritise practical controls.",
    ],
    [
      "Policy, Contract & Documentation",
      "Prepare platform policies, seller agreements and customer documentation.",
    ],
    [
      "Implementation Support",
      "Coordinate with internal teams and operational stakeholders to apply agreed controls.",
    ],
    [
      "Regulatory Review & Audit Support",
      "Assist with compliance assessments, evidence, notices and investigations.",
    ],
    [
      "Ongoing Monitoring & Dispute Support",
      "Track regulatory changes and support complaints, disputes and compliance updates.",
    ],
  ],
  documentsHeading: "Documents Required (Illustrative)",
  documentsDescription:
    "The information required depends on the platform model, products, payment flows and markets served.",
  documents: [
    "Corporate and entity documents",
    "Business model and platform structure",
    "Seller and vendor agreements",
    "Product catalogue and compliance documents",
    "GST and tax registrations",
    "Payment gateway agreements",
    "Privacy and data protection documents",
    "Advertising and promotional materials",
    "Consumer grievance and refund records",
  ],
  requirementsEyebrow: "STATUTORY TIMELINES (EXAMPLES)",
  requirementsHeading: "Timelines depend on registration and activity",
  requirements: [
    [
      "file",
      "GST registration",
      "As per applicable statutory process and business requirements.",
    ],
    [
      "document",
      "FSSAI registration",
      "Category-specific timelines where food products are involved.",
    ],
    [
      "people",
      "Consumer grievance response",
      "Within applicable timelines under the relevant rules and policies.",
    ],
    [
      "checklist",
      "Advertising and product claims",
      "Review before publication and update when products or claims change.",
    ],
    [
      "clock",
      "Cyber incident reporting",
      "As per applicable CERT-In directions and incident requirements.",
    ],
  ],
  pricingEyebrow: "GOVERNMENT & STATUTORY FEES (EXAMPLES)",
  pricingHeading: "Fees vary by registration, product and scope",
  pricingDescription:
    "Professional fees depend on platform complexity, products and sectors, jurisdictions, contracts, registrations, consumer issues and regulatory support. Government fees and third-party charges are separate and confirmed against the applicable requirements.",
  basicPackageEyebrow: "COMPLIANCE ASSESSMENT",
  comprehensivePackageEyebrow: "IMPLEMENTATION & ONGOING SUPPORT",
  basicPackageName: "E-Commerce Compliance Review",
  comprehensivePackageName: "Digital Commerce Regulatory Support",
  basicFeatures: [
    "Business-model and regulatory assessment",
    "Initial compliance gap review",
    "Platform and consumer policy review",
    "Recommended action plan",
  ],
  comprehensiveFeatures: [
    "Policy and contract drafting support",
    "Consumer and seller compliance support",
    "Payments, tax and cross-border advisory",
    "Regulatory notice and dispute support",
    "Ongoing compliance monitoring",
  ],
  advantages: [
    "Initial consultation and regulatory assessment",
    "Business-model and FDI advisory",
    "Policy and contract drafting",
    "Product and advertising compliance review",
    "Payments, tax and cross-border advisory",
    "Regulatory notice and dispute support",
    "Ongoing compliance monitoring",
  ],
  challenges: [
    "Verify applicable business model and FDI rules",
    "Ensure accurate product information and labelling",
    "Avoid misleading advertisements and dark patterns",
    "Strengthen seller verification and governance",
    "Maintain clear refund and return policies",
    "Align privacy, cybersecurity and payment controls",
    "Review cross-border and tax implications",
    "Monitor regulatory changes and sector requirements",
  ],
  faqDescription:
    "Answers to common questions about e-commerce business models, consumer protection, payments and compliance.",
  faqs: [
    [
      "What is e-commerce regulatory advisory?",
      "It is legal and regulatory support to assess and manage obligations affecting online marketplaces, retailers, sellers, platforms and digital commerce transactions.",
    ],
    [
      "Is a separate e-commerce licence mandatory?",
      "There is no single general e-commerce licence for every business. Registrations and approvals depend on the business, products, activities and applicable sector laws.",
    ],
    [
      "What is the difference between a marketplace and inventory-based model?",
      "A marketplace generally facilitates transactions between third-party sellers and buyers, while an inventory-based model involves the platform entity owning inventory and selling to customers. The actual structure and applicable rules should be assessed.",
    ],
    [
      "Can a foreign-owned entity operate an e-commerce marketplace in India?",
      "Foreign investment and operating conditions depend on the business model, sector, ownership and applicable FDI policy and FEMA requirements.",
    ],
    [
      "What consumer protection rules apply to online platforms?",
      "Relevant obligations may arise under consumer protection laws and e-commerce rules, including disclosures, grievance processes, refunds and fair trade practices.",
    ],
    [
      "Are GST and payment authorisations mandatory?",
      "GST registration and payment-related requirements depend on the business activities, turnover, transaction flows and applicable laws and directions.",
    ],
    [
      "What should an e-commerce seller agreement cover?",
      "It may address seller onboarding, product information, legal compliance, pricing, fulfilment, returns, complaints, intellectual property and suspension or termination.",
    ],
    [
      "Are dark patterns and misleading claims regulated?",
      "Consumer protection and advertising requirements may apply to interface design, claims and disclosures. Businesses should review practices against current guidance and law.",
    ],
    [
      "How can Astronis Global assist?",
      "Support may include business-model assessment, policy and contract drafting, compliance reviews, regulatory response and ongoing advisory based on agreed scope.",
    ],
  ],
  insights: [
    [
      "E-Commerce Regulatory Compliance in India: Marketplace and Seller Responsibilities",
      "",
      "E-Commerce Compliance",
    ],
    [
      "Product Listings, Advertising and Dark Patterns",
      "",
      "Consumer Protection",
    ],
    [
      "Cross-Border E-Commerce: FDI, Payments, GST and International Trade",
      "",
      "Cross-Border Commerce",
    ],
  ],
  insightImages: [
    "/Retail & E-Commerce .png",
    "/Banner-E-Commerce & Digital Platforms .png",
    "/Technology, IT & ITES .png",
  ],
  resourcesDescription:
    "Guides and checklists for platform models, consumer protection, seller governance, payments and product compliance.",
  resources: [
    ["GUIDE", "E-Commerce Regulatory Guide", "document"],
    ["CHECKLIST", "Marketplace Model Compliance Checklist", "checklist"],
    ["GUIDE", "Consumer Protection Guide", "shield"],
    ["GUIDE", "Product Compliance & Advertising Guide", "target"],
    ["GUIDE", "FDI, Payments & Tax Guide", "globe"],
    ["CHECKLIST", "Seller Contracts & Platform Policies", "file"],
  ],
  relatedPages: [
    [
      "Data Protection & Privacy",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-protection-and-privacy",
    ],
    [
      "DPDP Compliance",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/dpdp-compliance",
    ],
    [
      "AI Governance & Regulatory Advisory",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/ai-governance-regulatory-advisory",
    ],
    [
      "Technology Contracts",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/technology-contracts",
    ],
    [
      "SaaS Agreements",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/saas-software-as-a-service-agreements",
    ],
    [
      "Cybersecurity Regulatory Advisory",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/cybersecurity-regulatory-advisory",
    ],
  ],
  finalHeading:
    "Build Compliant Digital Marketplaces. Protect Consumer Trust.",
  finalDescription:
    "From marketplace and D2C business models to consumer protection, product compliance, FDI, payments, taxation, privacy and regulatory disputes, Astronis Global provides integrated legal and regulatory advisory for sustainable digital commerce.",
  finalAction: "Schedule an E-Commerce Regulatory Consultation",
};

export default function ECommerceRegulatoryPage() {
  return <EntityFormationPage data={data} />;
}
