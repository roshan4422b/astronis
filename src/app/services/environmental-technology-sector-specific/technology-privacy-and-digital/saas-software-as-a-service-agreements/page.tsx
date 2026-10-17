import type { Metadata } from "next";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

export const metadata: Metadata = {
  title: "SaaS (Software as a Service) Agreements | Astronis Global",
  description:
    "Drafting, review and negotiation of SaaS agreements covering cloud software subscriptions, data protection, cybersecurity, service levels and exit rights.",
  alternates: {
    canonical:
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/saas-software-as-a-service-agreements",
  },
};

const data: EntityFormationPageData = {
  slug: "saas-software-as-a-service-agreements",
  title: "SaaS (Software as a Service) Agreements",
  shortTitle: "SaaS Agreements",
  serviceTitle: "Environmental, Technology & Sector Specific",
  serviceHref: "/services/environmental-technology-sector-specific",
  categoryTitle: "Technology, Privacy & Digital",
  categoryHref:
    "/services/environmental-technology-sector-specific#technology-privacy-and-digital",
  heroEyebrow: "TECHNOLOGY, PRIVACY & DIGITAL",
  heroPrimaryAction: "Schedule a SaaS Agreements Consultation",
  heroPrimaryHref: "/contact",
  heroSecondaryAction: "Request a SaaS Contract Review",
  heroSecondaryHref: "/professionals/enquiry",
  heroStatement:
    "Structuring Cloud-Based Software Relationships. Protecting Digital Assets. Strengthening Subscription and Service Accountability.",
  description:
    "Astronis Global provides integrated corporate, regulatory, legal and business advisory for drafting, reviewing, negotiating and managing SaaS agreements. We assist SaaS providers, cloud software developers, startups, enterprise customers, technology purchasers, financial institutions and other organisations with subscription agreements, platform licensing, data processing, cybersecurity, service-level commitments, pricing, renewals, termination and exit management.",
  introduction:
    "A SaaS agreement governs access to cloud-hosted software and the responsibilities of the provider and customer. Well-structured terms address subscription scope, service availability, data handling, security, pricing, support, liability and exit arrangements, while reflecting the parties’ business model and applicable legal requirements.",
  image: "/Technology, IT & ITES .png",
  imageAlt: "Technology professionals reviewing cloud software and SaaS services",
  heroNoteEyebrow: "SAAS AGREEMENTS",
  heroNoteTitle: "Build stronger SaaS relationships.",
  heroNoteDescription:
    "Protect software, data and service commitments throughout the subscription lifecycle.",
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
  benefitsHeading: "SaaS Agreements in India",
  benefits: [
    [
      "shield",
      "Clear subscription and licensing rights",
      "Define authorised users, permitted use, restrictions and the scope of access to the service.",
    ],
    [
      "document",
      "Better protection of software and customer data",
      "Set out data handling, confidentiality, security and intellectual property obligations.",
    ],
    [
      "checklist",
      "Measurable service levels and support commitments",
      "Clarify availability, maintenance, support response and service credit mechanisms.",
    ],
    [
      "scale",
      "Reduced contractual and regulatory risks",
      "Address allocation of liability, indemnities, security incidents and compliance obligations.",
    ],
    [
      "calendar",
      "Stronger renewal, termination and exit arrangements",
      "Plan notice periods, transition assistance, data export and deletion at the end of service.",
    ],
    [
      "chart",
      "Support for scalable SaaS relationships",
      "Create terms that can support enterprise procurement, service growth and ongoing operations.",
    ],
  ],
  servicesHeading: "Our SaaS Agreements Services",
  servicesDescription:
    "Drafting and negotiation support for SaaS providers, customers and technology partners, from subscription scope to renewal and exit.",
  serviceCardsThreeColumns: true,
  services: [
    [
      "document",
      "SaaS Subscription Agreement Drafting & Negotiation",
      "Prepare and negotiate subscription terms, enterprise agreements, user rights, fees, renewals and termination.",
    ],
    [
      "cloud",
      "Cloud Licensing, IP & Platform Usage Advisory",
      "Define platform ownership, licence scope, authorised users, restrictions, integrations and IP safeguards.",
    ],
    [
      "shield",
      "Data Processing, Privacy & Cybersecurity Clauses",
      "Address customer data, privacy obligations, subprocessors, security safeguards and incident cooperation.",
    ],
    [
      "target",
      "Service-Level Agreements & Performance Commitments",
      "Structure uptime, support, maintenance, service credits, remedies and operational continuity commitments.",
    ],
    [
      "scale",
      "SaaS Pricing, Liability & Commercial Risk Advisory",
      "Review subscription models, billing, warranties, indemnities, liability caps and commercial protections.",
    ],
    [
      "network",
      "SaaS Renewal, Termination & Exit Management",
      "Support contract lifecycle management, data export, transition assistance, dispute handling and renewal planning.",
    ],
  ],
  structureEyebrow: "WHO NEEDS THESE SERVICES?",
  structureHeading: "SaaS agreement support across the digital ecosystem",
  structurePoints: [
    [
      "cloud",
      "SaaS providers",
      "Software businesses licensing cloud-hosted products to consumers or enterprise customers.",
    ],
    [
      "building",
      "Enterprise customers",
      "Organisations procuring cloud platforms and managing vendor, security and service risks.",
    ],
    [
      "bank",
      "Financial institutions",
      "Regulated businesses assessing outsourcing, data, security and continuity requirements.",
    ],
    [
      "shield",
      "Healthcare and EdTech",
      "Digital service providers handling sensitive user data and mission-critical services.",
    ],
    [
      "globe",
      "Multinational enterprises",
      "Businesses coordinating SaaS terms across jurisdictions, entities and service locations.",
    ],
    [
      "people",
      "Startups and technology teams",
      "Growing companies formalising subscription terms, platform rights and customer commitments.",
    ],
  ],
  comparisonHeading:
    "SaaS Agreement vs Software Licensing vs Cloud Hosting",
  comparisonDescription:
    "These arrangements may overlap but address different service models and responsibilities. The contract should reflect how the software is accessed, operated and supported.",
  comparisonNote:
    "This is a general comparison. Contract terms and legal obligations depend on the service model, data flows, parties and applicable law.",
  comparison: [],
  comparisonPanels: [
    {
      heading: "SaaS Agreements vs Software Licensing vs Cloud Hosting",
      headers: ["Parameter", "SaaS Agreement", "Software Licensing", "Cloud Hosting Agreement"],
      rows: [
        [
          "Main purpose",
          "Access to hosted software",
          "Permission to use software",
          "Provision of computing infrastructure",
        ],
        [
          "Software operation",
          "Provider-managed",
          "Customer or provider operated",
          "Customer or third-party software",
        ],
        [
          "Commercial model",
          "Subscription or usage-based",
          "Subscription or perpetual",
          "Resource-based",
        ],
        [
          "Service availability",
          "Key contractual issue",
          "Depends on support terms",
          "Infrastructure availability",
        ],
        [
          "Key risks",
          "Uptime, data, security and exit",
          "IP rights, scope and restrictions",
          "Infrastructure and security",
        ],
      ],
    },
    {
      heading: "Indian Laws vs International Frameworks",
      headers: ["Parameter", "India (Key Laws)", "EU / US (Selected)"],
      rows: [
        [
          "Contract law",
          "Indian Contract Act, 1872",
          "Common law / civil law",
        ],
        [
          "Data protection",
          "DPDP Act, 2023, as applicable",
          "GDPR / CCPA",
        ],
        [
          "IP rights",
          "Copyright Act, 1957; Patents Act, 1970",
          "EU / US IP laws",
        ],
        [
          "Cybersecurity",
          "IT Act and applicable directions",
          "NIS2 / sectoral rules",
        ],
        [
          "Tax and foreign exchange",
          "Income-tax, GST and FEMA, as applicable",
          "Applicable local laws",
        ],
        [
          "Consumer protection",
          "Consumer Protection Act, 2019, as applicable",
          "EU / US consumer laws",
        ],
      ],
    },
  ],
  processEyebrow: "SAAS AGREEMENTS ADVISORY PROCESS",
  processHeading: "A structured seven-stage agreement process",
  processDescription:
    "Understand the service and data flows, assess legal and operational requirements, and negotiate clear terms through execution and ongoing contract management.",
  processNumbers: true,
  process: [
    [
      "Initial Consultation & Scoping",
      "Understand business objectives, platform features, users, data and service model.",
    ],
    [
      "Regulatory & Legal Assessment",
      "Review applicable laws, privacy, cybersecurity and sector-specific considerations.",
    ],
    [
      "Contract Architecture & Risk Allocation",
      "Define scope, service levels, data obligations, IP rights, liability and remedies.",
    ],
    [
      "Drafting & Documentation",
      "Prepare or review the SaaS agreement, schedules, SLA and data processing terms.",
    ],
    [
      "Negotiation & Finalisation",
      "Evaluate counterpart proposals and resolve commercial and legal issues.",
    ],
    [
      "Execution & Implementation",
      "Confirm authority, final documents, operational owners and implementation steps.",
    ],
    [
      "Contract Management & Dispute Support",
      "Monitor renewals, changes, service issues, data obligations and disputes.",
    ],
  ],
  documentsHeading: "Documents Required (Illustrative)",
  documentsDescription:
    "The review checklist depends on the parties, product, data flows and intended agreement scope.",
  documents: [
    "Corporate and signatory details",
    "Product and service descriptions",
    "Existing agreements and proposals",
    "IP ownership and licensing records",
    "Data processing and security policies",
    "Data flow and subprocessor information",
    "Pricing and payment terms",
    "Service-level and support commitments",
    "Vendor due diligence documents",
  ],
  requirementsEyebrow: "CONTRACTUAL TIMELINES (EXAMPLES)",
  requirementsHeading: "Timelines follow agreement milestones",
  requirements: [
    [
      "document",
      "Agreement drafting",
      "Agreed timeline based on scope and review rounds.",
    ],
    [
      "people",
      "Execution and signing",
      "As per the parties’ approval and signature process.",
    ],
    [
      "percent",
      "Stamp duty payment",
      "As per applicable law and the instrument and jurisdiction.",
    ],
    [
      "checklist",
      "Onboarding and implementation",
      "As per the contract, service configuration and operational readiness.",
    ],
    [
      "calendar",
      "SLA measurement and renewal",
      "Monthly, quarterly or as specified in the agreement.",
    ],
  ],
  pricingEyebrow: "GOVERNMENT & STATUTORY FEES (EXAMPLES)",
  pricingHeading: "Fees depend on agreement scope and service model",
  pricingDescription:
    "Professional fees depend on agreement complexity, data and security requirements, negotiation rounds, service schedules and cross-border issues. Stamp duty, registration charges, arbitration and litigation fees are separate where applicable.",
  basicPackageEyebrow: "AGREEMENT REVIEW",
  comprehensivePackageEyebrow: "DRAFTING & NEGOTIATION",
  basicPackageName: "SaaS Agreement Review",
  comprehensivePackageName: "SaaS Contract Structuring",
  basicFeatures: [
    "Initial consultation and risk assessment",
    "Review of existing agreement",
    "Key commercial and legal risk summary",
    "Recommended negotiation points",
  ],
  comprehensiveFeatures: [
    "Agreement drafting or review",
    "Negotiation support",
    "Data protection and security clauses",
    "SLA and service-level structuring",
    "Renewal, termination and exit support",
  ],
  advantages: [
    "Initial consultation and risk assessment",
    "Agreement drafting or review",
    "Negotiation support",
    "Data protection and security clauses",
    "IP and licensing advisory",
    "Service-level agreement structuring",
    "Ongoing contract management support",
  ],
  challenges: [
    "Define clear service scope and licensing rights",
    "Protect customer data and privacy",
    "Negotiate balanced liability and indemnity provisions",
    "Address service levels and support obligations",
    "Ensure practical data portability and exit rights",
    "Verify regulatory and sector-specific requirements",
    "Review pricing and renewal terms",
    "Monitor contract lifecycle and changes",
  ],
  faqDescription:
    "Answers to common questions about SaaS contracts, cloud services, data protection and subscription terms.",
  faqs: [
    [
      "What is a SaaS agreement?",
      "A SaaS agreement sets the terms for accessing cloud-hosted software, including service scope, subscription fees, user rights, data handling, security, support and termination.",
    ],
    [
      "How is a SaaS agreement different from a software licence?",
      "A SaaS agreement commonly covers provider-hosted software accessed as an ongoing service. A software licence may instead grant rights to install or operate software under separate delivery and support arrangements.",
    ],
    [
      "Is government registration required for SaaS agreements?",
      "There is no general registration requirement for every SaaS agreement. Applicable formalities, stamp duty and regulatory obligations depend on the agreement, parties and service.",
    ],
    [
      "Who owns customer data in a SaaS arrangement?",
      "The contract should clearly address customer data rights, provider processing permissions, permitted use, retention, return and deletion.",
    ],
    [
      "Can a SaaS provider change prices or services?",
      "The agreement should specify how fees, features, service levels and terms may change, including notice, consent and termination rights where relevant.",
    ],
    [
      "What should an SLA cover?",
      "An SLA may address availability, maintenance, support response, incident handling, measurement, service credits and remedies.",
    ],
    [
      "What happens to data when a SaaS agreement ends?",
      "The agreement should set out data export, transition assistance, retention, deletion and any applicable legal or regulatory exceptions.",
    ],
    [
      "Can a SaaS agreement be used for international customers?",
      "It may be, but the contract should address applicable jurisdictions, data transfers, local regulatory obligations, tax and dispute resolution.",
    ],
    [
      "How can Astronis Global assist with SaaS agreements?",
      "Support may include drafting, review, negotiation and lifecycle advisory covering service scope, IP, data protection, security, SLAs, liability and exit arrangements.",
    ],
  ],
  insights: [
    [
      "SaaS Agreements in India: Key Clauses and Legal Risks",
      "",
      "SaaS Agreements",
    ],
    [
      "SaaS Data Protection and Cybersecurity: Contractual Responsibilities",
      "",
      "Data Protection",
    ],
    [
      "SaaS Renewal and Exit Management: Preventing Vendor Lock-In",
      "",
      "Contract Management",
    ],
  ],
  insightImages: [
    "/Technology, IT & ITES .png",
    "/images/services/hero.webp",
    "/Technology, IT & ITES .png",
  ],
  resourcesDescription:
    "Guides and checklists for SaaS subscription terms, service levels, data protection and contract lifecycle management.",
  resources: [
    ["GUIDE", "SaaS Agreement Legal Framework Guide", "document"],
    ["CHECKLIST", "SaaS Subscription Contract Checklist", "checklist"],
    ["GUIDE", "SaaS IP & Licensing Guide", "shield"],
    ["GUIDE", "Data Processing & Cybersecurity Guide", "lock"],
    ["GUIDE", "Service Levels & Liability Guide", "scale"],
    ["CHECKLIST", "Renewal & Termination Exit Guide", "calendar"],
  ],
  relatedPages: [
    [
      "Technology Contracts",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/technology-contracts",
    ],
    [
      "IT Agreements",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/it-agreements",
    ],
    [
      "Data Protection & Privacy",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-protection-and-privacy",
    ],
    [
      "DPDP Compliance",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/dpdp-compliance",
    ],
    [
      "Data Processing Agreements",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-processing-agreements",
    ],
    [
      "Cybersecurity Regulatory Advisory",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/cybersecurity-regulatory-advisory",
    ],
  ],
  finalHeading:
    "Build Stronger SaaS Relationships. Protect Software and Data.",
  finalDescription:
    "From subscription contracts and enterprise licensing to data protection, cybersecurity, service levels, pricing, renewals and exit management, Astronis Global provides integrated advisory to support clear, commercially balanced and legally informed SaaS arrangements.",
  finalAction: "Schedule a SaaS Agreements Consultation",
};

export default function SaaSAgreementsPage() {
  return <EntityFormationPage data={data} />;
}
