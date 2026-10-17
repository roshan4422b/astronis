import type { Metadata } from "next";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

export const metadata: Metadata = {
  title: "Data Processing Agreements | Astronis Global",
  description:
    "Drafting, review and negotiation of data processing agreements covering controller and processor responsibilities, privacy, security, subprocessors and cross-border transfers.",
  alternates: {
    canonical:
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-processing-agreements",
  },
};

const data: EntityFormationPageData = {
  slug: "data-processing-agreements",
  title: "Data Processing Agreements",
  shortTitle: "Data Processing Agreements",
  serviceTitle: "Environmental, Technology & Sector Specific",
  serviceHref: "/services/environmental-technology-sector-specific",
  categoryTitle: "Technology, Privacy & Digital",
  categoryHref:
    "/services/environmental-technology-sector-specific#technology-privacy-and-digital",
  heroEyebrow: "TECHNOLOGY, PRIVACY & DIGITAL",
  heroPrimaryAction: "Schedule a Data Processing Consultation",
  heroPrimaryHref: "/contact",
  heroSecondaryAction: "Request a DPA Review",
  heroSecondaryHref: "/professionals/enquiry",
  heroStatement:
    "Protecting Personal Data. Defining Processing Responsibilities. Strengthening Regulatory Accountability.",
  description:
    "Astronis Global provides integrated corporate, regulatory, legal and business advisory for drafting, reviewing, negotiating and managing Data Processing Agreements (DPAs). We assist businesses in structuring data processing relationships, ensuring compliance with applicable laws, and developing clear obligations around processing, subprocessors, retention, deletion, audit rights and data governance.",
  introduction:
    "A Data Processing Agreement sets out how a processor handles personal data on behalf of a controller. Clear terms help define each party’s responsibilities, permitted processing, security measures, subprocessor controls, incident response, cross-border transfers and the return or deletion of data.",
  image: "/Technology&Digital/Banner- Cybersecurity & Data Protection .png",
  imageAlt:
    "Data protection and cybersecurity safeguards for personal data processing",
  heroNoteEyebrow: "DATA PROCESSING AGREEMENTS",
  heroNoteTitle: "Define responsibilities. Protect data.",
  heroNoteDescription:
    "Build accountable processing relationships with clear privacy, security and governance terms.",
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
  benefitsHeading: "Why Data Processing Agreements are Necessary",
  benefits: [
    [
      "document",
      "Clear allocation of processing responsibilities",
      "Document controller and processor roles, instructions, permitted purposes and responsibilities.",
    ],
    [
      "shield",
      "Better protection of personal data",
      "Set appropriate technical, organisational and confidentiality safeguards for data handling.",
    ],
    [
      "checklist",
      "Stronger security and incident response",
      "Define breach notification, cooperation, investigation and remediation expectations.",
    ],
    [
      "scale",
      "Regulatory compliance and reduced legal risk",
      "Align processing terms with applicable privacy laws and relevant contractual obligations.",
    ],
    [
      "network",
      "Effective subprocessor governance",
      "Address authorisation, flow-down terms, oversight and accountability across vendor chains.",
    ],
    [
      "calendar",
      "Structured retention, deletion and data management",
      "Plan data return, deletion, retention periods and audit evidence during and after the engagement.",
    ],
  ],
  servicesHeading: "Our Data Processing Agreements Services",
  servicesDescription:
    "Support for controllers, processors and vendors from drafting and negotiation through cross-border governance and incident response.",
  serviceCardsThreeColumns: true,
  services: [
    [
      "document",
      "Data Processing Agreement Drafting & Negotiation",
      "Prepare or negotiate DPAs that reflect the parties, processing activities, risk profile and commercial relationship.",
    ],
    [
      "network",
      "Data Fiduciary, Processor & Subprocessor Advisory",
      "Assess processing roles and responsibilities, vendor chains, authorisations and flow-down obligations.",
    ],
    [
      "shield",
      "Privacy, Data Security & Breach Response",
      "Set safeguards, incident notification, investigation cooperation and remediation responsibilities.",
    ],
    [
      "globe",
      "Cross-Border Data Processing & Transfer Advisory",
      "Review international processing, transfer arrangements and applicable local requirements.",
    ],
    [
      "calendar",
      "Data Retention, Deletion & Audit Rights",
      "Define data lifecycle controls, return or deletion, verification and proportionate audit arrangements.",
    ],
    [
      "scale",
      "DPA Compliance, Vendor Governance & Disputes",
      "Support contract audits, privacy compliance, vendor risk management and processing-related disputes.",
    ],
  ],
  structureEyebrow: "WHO NEEDS THESE SERVICES?",
  structureHeading: "DPA support across data-driven businesses",
  structurePoints: [
    [
      "cloud",
      "SaaS and cloud providers",
      "Technology providers processing customer or end-user data through hosted platforms.",
    ],
    [
      "building",
      "Enterprises and corporate groups",
      "Businesses engaging vendors and coordinating processing across entities and departments.",
    ],
    [
      "bank",
      "Financial institutions",
      "Regulated organisations assessing privacy, outsourcing and information-security obligations.",
    ],
    [
      "people",
      "Healthcare and life sciences",
      "Organisations handling sensitive personal information through service providers and research partners.",
    ],
    [
      "globe",
      "Multinational businesses",
      "Organisations managing data flows, vendors and privacy requirements across jurisdictions.",
    ],
    [
      "network",
      "Processors and service providers",
      "Vendors seeking clear instructions, safeguards, subprocessor terms and liability boundaries.",
    ],
  ],
  comparisonHeading: "Comparative Analysis — DPA vs NDA vs Service Agreement",
  comparisonDescription:
    "A DPA addresses personal-data processing responsibilities, while confidentiality and service agreements cover different or broader contractual concerns.",
  comparisonNote:
    "The documents may operate together. Their scope should be coordinated to avoid gaps or conflicting obligations.",
  comparison: [],
  comparisonPanels: [
    {
      heading: "Data Processing Agreement vs NDA vs Service Agreement",
      headers: [
        "Parameter",
        "Data Processing Agreement",
        "Non-Disclosure Agreement",
        "IT / Service Agreement",
      ],
      rows: [
        [
          "Primary purpose",
          "Govern processing of personal data",
          "Protect confidential information",
          "Define services and deliverables",
        ],
        [
          "Data protection focus",
          "Controller and processor duties",
          "Confidentiality obligations",
          "May include privacy clauses",
        ],
        [
          "Key parties",
          "Data fiduciary/controller and processor",
          "Disclosing and receiving parties",
          "Service provider and customer",
        ],
        [
          "Typical clauses",
          "Instructions, security, breach and deletion",
          "Use, disclosure and confidentiality periods",
          "Scope, SLA, fees, IP and liability",
        ],
        [
          "Subprocessors / vendors",
          "Authorisation and flow-down controls",
          "Usually not addressed in detail",
          "May cover subcontracting generally",
        ],
        [
          "Regulatory relevance",
          "Privacy and data protection laws",
          "Contractual confidentiality framework",
          "Service and commercial requirements",
        ],
      ],
    },
    {
      heading: "Indian Laws vs International Frameworks",
      headers: ["Parameter", "India (Key Laws)", "EU / UK / Other Selected"],
      rows: [
        [
          "Data protection",
          "Digital Personal Data Protection Act, 2023, as applicable",
          "GDPR / UK GDPR",
        ],
        [
          "Contract law",
          "Indian Contract Act, 1872",
          "Applicable local contract laws",
        ],
        [
          "Cybersecurity",
          "IT Act, CERT-In directions and applicable rules",
          "NIS2 / sector-specific requirements",
        ],
        [
          "Processing terms",
          "Applicable privacy and sector requirements",
          "GDPR Article 28 / local equivalents",
        ],
        [
          "Cross-border transfers",
          "Applicable DPDP Act requirements and rules",
          "GDPR transfer mechanisms / local laws",
        ],
        [
          "Breach response",
          "Applicable reporting and incident directions",
          "Regulator and affected-person notification rules",
        ],
      ],
    },
  ],
  processEyebrow: "DPA ADVISORY PROCESS",
  processHeading: "A structured seven-stage agreement process",
  processDescription:
    "Map processing activities, assess legal and operational requirements, and establish practical privacy and security terms through implementation and ongoing governance.",
  processNumbers: true,
  process: [
    [
      "Initial Consultation & Scoping",
      "Understand the business relationship, processing purpose, data categories and parties.",
    ],
    [
      "Legal & Regulatory Assessment",
      "Identify applicable privacy, cybersecurity, sector and cross-border requirements.",
    ],
    [
      "Data Mapping & Risk Allocation",
      "Review data flows, processing roles, vendors, safeguards and key risks.",
    ],
    [
      "Drafting & Documentation",
      "Prepare or review the DPA, processing schedules, security terms and subprocessor provisions.",
    ],
    [
      "Negotiation & Finalisation",
      "Resolve commercial and legal positions, including liability, audit rights and incident obligations.",
    ],
    [
      "Execution & Implementation",
      "Coordinate approvals, contract execution and practical controls with responsible teams.",
    ],
    [
      "Ongoing Monitoring & Dispute Support",
      "Review changes in processing, vendor compliance, incidents and applicable requirements.",
    ],
  ],
  documentsHeading: "Documents Required (Illustrative)",
  documentsDescription:
    "The documents and information required depend on processing activities, data types, parties and applicable jurisdictions.",
  documents: [
    "Corporate and authorised signatory details",
    "Processing purpose and activity description",
    "Personal data categories and data subject groups",
    "Data flow diagrams and processing locations",
    "Existing customer, vendor and service agreements",
    "Privacy notices, policies and consent materials",
    "Information security policies and control descriptions",
    "Subprocessor list and vendor due diligence records",
    "Data retention, deletion and incident-response procedures",
  ],
  requirementsEyebrow: "STATUTORY TIMELINES (EXAMPLES)",
  requirementsHeading: "Timelines depend on processing and legal requirements",
  requirements: [
    [
      "document",
      "DPA negotiation",
      "As per the parties’ procurement, review and approval timelines.",
    ],
    [
      "shield",
      "Security safeguards",
      "Implement appropriate measures before or during the processing relationship.",
    ],
    [
      "people",
      "Incident reporting",
      "Within applicable statutory and contractual timelines based on incident and law.",
    ],
    [
      "checklist",
      "Subprocessor approval",
      "Before engagement or changes, as set out in the agreement and applicable requirements.",
    ],
    [
      "calendar",
      "Data return or deletion",
      "At termination or expiry, subject to agreed terms and applicable retention obligations.",
    ],
  ],
  pricingEyebrow: "GOVERNMENT & STATUTORY FEES (EXAMPLES)",
  pricingHeading: "Fees depend on agreement scope and data complexity",
  pricingDescription:
    "Professional fees depend on processing complexity, data sensitivity, number of vendors and jurisdictions, negotiation rounds and required schedules. Stamp duty, registration, technical audits and third-party charges are separate where applicable.",
  basicPackageEyebrow: "AGREEMENT REVIEW",
  comprehensivePackageEyebrow: "DRAFTING & IMPLEMENTATION",
  basicPackageName: "DPA Review",
  comprehensivePackageName: "DPA Structuring & Support",
  basicFeatures: [
    "Initial consultation and processing overview",
    "Review of existing DPA or privacy clauses",
    "Key contractual and compliance risk summary",
    "Recommended negotiation and remediation points",
  ],
  comprehensiveFeatures: [
    "DPA drafting or detailed review",
    "Processing and security schedule support",
    "Subprocessor and cross-border transfer clauses",
    "Negotiation and execution assistance",
    "Vendor governance and ongoing advisory",
  ],
  advantages: [
    "Processing role and responsibility assessment",
    "DPA drafting, review and negotiation",
    "Privacy and security clause development",
    "Subprocessor and vendor governance",
    "Cross-border data processing advisory",
    "Incident response and regulatory support",
    "Retention, deletion and audit-right planning",
  ],
  challenges: [
    "Identify all processing activities and data flows",
    "Define controller, fiduciary and processor responsibilities",
    "Align security commitments with operational capabilities",
    "Establish incident notification and cooperation procedures",
    "Assess subprocessors and vendor chain risks",
    "Review international transfers and data locations",
    "Agree workable audit and evidence requirements",
    "Coordinate retention, deletion and liability terms",
  ],
  faqDescription:
    "Answers to common questions about Data Processing Agreements, privacy obligations, processors and cross-border processing.",
  faqs: [
    [
      "What is a Data Processing Agreement?",
      "A Data Processing Agreement (DPA) is a contract or set of terms governing a service provider’s processing of personal data on behalf of another organisation, including instructions, safeguards and each party’s responsibilities.",
    ],
    [
      "Is a DPA mandatory under the DPDP Act?",
      "The obligations depend on the parties’ roles, processing arrangement and applicable provisions. Organisations should assess the current law and rules and document appropriate terms for their processing relationships.",
    ],
    [
      "How is a DPA different from an NDA?",
      "An NDA primarily protects confidential information. A DPA addresses personal data processing, including instructions, security, subprocessors, incident response and data lifecycle obligations.",
    ],
    [
      "Can personal data be processed outside India?",
      "Cross-border processing should be assessed against applicable Indian requirements, contractual commitments and the laws that apply in the relevant jurisdictions.",
    ],
    [
      "What should be included in a DPA?",
      "A DPA may cover processing details, instructions, confidentiality, security, subprocessors, breach response, data subject requests, audits, transfers and return or deletion of data.",
    ],
    [
      "Who is responsible for a data breach?",
      "Responsibility depends on the facts, the parties’ roles, applicable law and contract terms. A DPA should set notification, cooperation, investigation and remediation processes.",
    ],
    [
      "Are subprocessors allowed under a DPA?",
      "They may be permitted subject to the agreement, applicable law and appropriate approval, oversight and flow-down obligations.",
    ],
    [
      "How long does it take to draft or review a DPA?",
      "Timing depends on the complexity of processing, number of parties and vendors, negotiation rounds and internal approval process.",
    ],
    [
      "How can Astronis Global assist with DPAs?",
      "Support may include data-processing assessments, drafting and negotiation, vendor and subprocessor terms, cross-border review and incident or compliance advisory based on agreed scope.",
    ],
  ],
  insights: [
    [
      "Data Processing Agreements: Key Clauses and Controller Responsibilities",
      "",
      "Data Processing Agreements",
    ],
    [
      "Cross-Border Data Processing and International Transfer Requirements",
      "",
      "Privacy & Data Transfers",
    ],
    [
      "Subprocessor Governance: Security, Contracts and Compliance",
      "",
      "Vendor Governance",
    ],
  ],
  insightImages: [
    "/Technology&Digital/Banner- Cybersecurity & Data Protection .png",
    "/Technology&Digital/Banner- Data, AI & Automation .png",
    "/Technology, IT & ITES .png",
  ],
  resourcesDescription:
    "Guides and checklists for processing roles, vendor governance, data security and international data flows.",
  resources: [
    ["GUIDE", "Data Processing Agreement Guide", "document"],
    ["CHECKLIST", "DPA Review Checklist", "checklist"],
    ["GUIDE", "Processing Roles & Responsibilities Guide", "network"],
    ["CHECKLIST", "Subprocessor Governance Checklist", "shield"],
    ["GUIDE", "Cross-Border Data Processing Guide", "globe"],
    ["CHECKLIST", "Data Retention & Deletion Checklist", "calendar"],
  ],
  relatedPages: [
    [
      "Data Protection & Privacy",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/data-protection-and-privacy",
    ],
    [
      "DPDP (Digital Personal Data Protection) Compliance",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/dpdp-compliance",
    ],
    [
      "SaaS (Software as a Service) Agreements",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/saas-software-as-a-service-agreements",
    ],
    [
      "Cybersecurity Regulatory Advisory",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/cybersecurity-regulatory-advisory",
    ],
    [
      "Technology Contracts",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/technology-contracts",
    ],
    [
      "E-Commerce Regulatory",
      "/services/environmental-technology-sector-specific/technology-privacy-and-digital/e-commerce-regulatory",
    ],
  ],
  finalHeading:
    "Protect Personal Data. Strengthen Compliance. Build Trusted Relationships.",
  finalDescription:
    "From processing roles and vendor governance to security, cross-border transfers, retention and incident response, Astronis Global helps organisations establish clear and accountable data processing relationships.",
  finalAction: "Schedule a Data Processing Consultation",
};

export default function DataProcessingAgreementsPage() {
  return <EntityFormationPage data={data} />;
}
