import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

const data: EntityFormationPageData = {
  slug: "employment-advisory",
  title: "Employment Advisory",
  shortTitle: "Employment Advisory",
  heroStatement:
    "Strengthening employment relationships. Managing workplace risks. Building compliant organisations.",
  description:
    "Astronis Global provides integrated legal, regulatory and business advisory services to employers, start-ups, MSMEs and multinational organisations across the employment lifecycle. Our services encompass employment law advisory, contract structuring, HR policies, statutory compliance, disciplinary matters, termination, workforce restructuring and employment disputes, helping organisations build legally compliant, fair and productive workplaces.",
  introduction:
    "Employment advisory connects an organisation's workforce practices with the legal, contractual and regulatory requirements that apply to its people and operations. Advice may cover hiring, workplace policies, wages, statutory obligations, performance, disciplinary processes, restructuring and exits. The appropriate approach depends on the workforce, locations, industry and circumstances.",
  image: "/images/services/hr-and-employment-advisory.webp",
  imageAlt: "Employment professionals reviewing workplace advisory documents",
  basicPrice: "By scope",
  comprehensivePrice: "Tailored",
  categoryTitle: "Employment & Labour",
  categoryHref:
    "/services/industrial-employment-forensics-advisory#employment-and-labour",
  categoryParentTitle: "Industrial, Employment & Forensics Advisory",
  categoryParentHref: "/services/industrial-employment-forensics-advisory",
  heroEyebrow: "INDUSTRIAL, EMPLOYMENT & FORENSICS ADVISORY",
  heroNoteEyebrow: "EMPLOYMENT ADVISORY",
  heroNoteTitle: "Practical advice across the employment lifecycle.",
  heroNoteDescription:
    "Coordinate workforce decisions, workplace policies and applicable compliance responsibilities.",
  introHeading: "Employment Advisory in India",
  introPanelEyebrow: "EMPLOYMENT RELATIONSHIPS",
  introPanelHeading: "Clear terms. Compliant workplaces.",
  introPanelDescription:
    "Connect employment documentation, workplace practices and people-related decisions with your organisation's requirements.",
  benefitCards: true,
  benefitCardsStacked: true,
  showSectionNavigation: true,
  servicesHeading: "Our Employment Advisory Services",
  servicesDescription:
    "Integrated legal and practical support for employment arrangements, labour compliance, HR policies and workplace matters.",
  serviceCardsThreeColumns: true,
  benefitsHeading: "Why is Employment Advisory necessary?",
  benefits: [
    [
      "shield",
      "Ensure legal compliance",
      "Review workplace decisions, employment terms and applicable statutory responsibilities.",
    ],
    [
      "scale",
      "Reduce workplace risks",
      "Identify employment, process and documentation issues that may lead to disputes or regulatory exposure.",
    ],
    [
      "people",
      "Protect employee rights",
      "Support fair and consistent employment practices and appropriate employee protections.",
    ],
    [
      "building",
      "Strengthen HR governance",
      "Align workplace policies, responsibilities and processes with organisational needs.",
    ],
    [
      "file",
      "Manage workforce transitions",
      "Plan disciplinary action, termination and restructuring with appropriate process and documentation.",
    ],
    [
      "handshake",
      "Support productive workplaces",
      "Provide practical guidance for employment relationships, communications and workplace concerns.",
    ],
  ],
  services: [
    [
      "scale",
      "Employment Law & Regulatory Advisory",
      "Interpret applicable labour laws, employer obligations and workplace compliance requirements.",
    ],
    [
      "file",
      "Recruitment, Onboarding & Employment Contracts",
      "Draft and review employment agreements, appointment letters, contractual terms, probation and onboarding compliance.",
    ],
    [
      "people",
      "HR Policies, Employee Benefits & Workplace Governance",
      "Develop workplace policies covering leave, compensation, benefits, conduct and work-related administration.",
    ],
    [
      "document",
      "Labour Law Compliance & Statutory Coordination",
      "Advise on wages, social security, establishment registrations, safety and statutory registrations.",
    ],
    [
      "shield",
      "Disciplinary, Termination & Separation Advisory",
      "Support misconduct enquiries, performance management, retrenchment and separation.",
    ],
    [
      "briefcase",
      "Employment Disputes & Workforce Restructuring",
      "Advise on employment claims, settlement strategies, industrial disputes and organisational restructuring.",
    ],
  ],
  structureHeading: "Who needs these services?",
  structurePoints: [
    [
      "building",
      "Companies",
      "Employers reviewing workforce practices, employment terms and statutory responsibilities.",
    ],
    [
      "document",
      "MSMEs",
      "Growing businesses formalising employment documentation, HR processes and compliance.",
    ],
    [
      "rocket",
      "Start-ups",
      "Founders building employment arrangements and people policies as teams expand.",
    ],
    [
      "globe",
      "Multinationals",
      "Organisations coordinating employment practices across locations and workforce groups.",
    ],
    [
      "people",
      "HR teams",
      "People professionals seeking practical support on workplace processes and employee matters.",
    ],
  ],
  comparisonHeading:
    "Employment Advisory: Employee vs Worker vs Independent Contractor",
  comparisonDescription:
    "Workforce classification depends on the actual relationship, working arrangements and applicable law. This comparison is a general reference and not a substitute for a fact-specific review.",
  comparisonNote:
    "Legal classification and applicable protections depend on the facts, relevant legislation and the nature of the engagement. Contract labels alone may not determine status.",
  comparisonPanels: [
    {
      heading: "Employee vs Worker vs Independent Contractor",
      headers: ["Employee", "Worker", "Independent Contractor", "Contract Labour"],
      rows: [
        ["Governing framework", "Contract and applicable labour laws", "Relevant labour legislation", "Contract law", "Contract labour requirements"],
        ["Control & supervision", "Generally subject to employer direction", "Depends on statutory definition", "Generally greater independence", "By contractor; principal-employer duties may apply"],
        ["Statutory benefits", "As applicable", "Category and statute specific", "No automatic employee benefits", "Applicable protections and obligations"],
        ["Typical arrangement", "Employment relationship", "Status under relevant legislation", "Services under contract", "Services through contractor"],
        ["Key risk", "Non-compliance with employment terms", "Procedural or benefit defaults", "Misclassification", "Principal-employer exposure"],
      ],
    },
    {
      heading: "Employment Contract vs Company Policy vs Employee Handbook",
      headers: ["Employment Contract", "Company Policy", "Employee Handbook"],
      rows: [
        ["Purpose", "Individual terms", "Organisation-wide rules", "Workplace guidance"],
        ["Application", "Individual employee", "Relevant categories or workforce", "Employees covered by the handbook"],
        ["Legal character", "Contractual", "Policy and procedural", "Guidance and policy compilation"],
        ["Typical contents", "Compensation, duties, notice, confidentiality", "Leave, conduct, benefits, grievance", "Workplace standards and information"],
        ["Review", "Requires legal process", "Subject to law and internal approval", "Requires communication and updates"],
      ],
    },
  ],
  comparisonFocusIndex: null,
  comparison: [],
  processEyebrow: "EMPLOYMENT ADVISORY PROCESS",
  processHeading: "A seven-stage process from assessment to ongoing support",
  processDescription:
    "A structured engagement connects workforce context and employment records with practical, legally informed recommendations.",
  processNumbers: true,
  process: [
    [
      "Organisation Assessment",
      "Review business activities, locations, workforce and applicable employment context.",
    ],
    [
      "Legal Due Diligence",
      "Review relevant contracts, policies, statutory compliance and employment practices.",
    ],
    [
      "Risk Identification",
      "Identify employment risks, compliance gaps and development priorities.",
    ],
    [
      "Documentation",
      "Prepare or review employment contracts, policies and handbooks as scoped.",
    ],
    [
      "Statutory Coordination",
      "Support relevant registrations, filings and approvals in coordination with the organisation.",
    ],
    [
      "HR Management",
      "Advise on disciplinary matters, grievances, performance and restructuring.",
    ],
    [
      "Monitoring & Compliance",
      "Support ongoing review of employment practices and relevant changes.",
    ],
  ],
  documentsHeading: "Documents required (illustrative)",
  documentsDescription:
    "The information required depends on the advisory matter, workforce and locations involved.",
  documents: [
    "Constitutional and establishment registration documents",
    "Existing employment contracts and appointment letters",
    "HR policies and employee handbook",
    "Payroll and salary structure documents",
    "Statutory registrations and contribution records",
    "Disciplinary and grievance records",
    "Termination and settlement documents",
    "Pending notices and litigation records",
  ],
  requirementsEyebrow: "STATUTORY TIMELINES (ILLUSTRATIVE)",
  requirementsHeading: "Confirm timelines for each applicable requirement.",
  requirements: [
    [
      "file",
      "Appointment letters",
      "At joining, subject to applicable requirements.",
    ],
    [
      "wallet",
      "Wage payments",
      "As per the applicable wage period and statutory due date.",
    ],
    [
      "building",
      "EPF registration and remittance",
      "Applicability and timing depend on statutory coverage and current rules.",
    ],
    [
      "shield",
      "ESI registration and contribution",
      "As per applicable coverage, contribution periods and prescribed due dates.",
    ],
    [
      "document",
      "Labour returns",
      "Periodic or annual, depending on the applicable requirement.",
    ],
  ],
  basicPackageEyebrow: "EMPLOYMENT ADVISORY",
  basicPackageName: "Focused Advisory",
  basicFeatures: [
    "Initial employment matter discussion",
    "Review of relevant documents and facts",
    "Identification of key legal and process issues",
    "Practical advice on next steps",
  ],
  comprehensivePackageEyebrow: "ONGOING SUPPORT",
  comprehensivePackageName: "Employment Compliance & Advisory",
  comprehensiveFeatures: [
    "Employment documentation and policy review",
    "Workforce and compliance assessment",
    "Advisory on agreed employee matters",
    "Implementation and coordination support",
    "Ongoing employment law updates as scoped",
  ],
  pricingEyebrow: "PROFESSIONAL FEES",
  pricingHeading: "Advisory scope tailored to your organisation",
  pricingDescription:
    "Fees depend on the nature of the matter, workforce size, locations, document volume, urgency and level of ongoing support required.",
  customHeading: "Complex or multi-location requirements",
  customDescription:
    "Request a tailored scope for workforce restructuring, multi-state compliance or ongoing employment advisory.",
  priceNote:
    "Government charges, statutory payments, applicable taxes and third-party costs are separate where relevant. Applicability and timelines depend on current requirements and the facts.",
  featureHeading: "Precautions & legal considerations",
  featureItems: [
    "Verify applicable labour codes and state rules",
    "Avoid employee misclassification",
    "Ensure compliance with mandatory benefits",
    "Use fair disciplinary procedures",
    "Review restrictive covenants for enforceability",
    "Maintain accurate employment records",
    "Address workplace complaints promptly",
    "Plan workforce changes carefully",
  ],
  faqDescription:
    "Answers to common questions about employment advisory and workplace requirements.",
  faqs: [
    [
      "What does Employment Advisory include?",
      "Employment advisory may cover contracts, HR policies, labour compliance, employee benefits, disciplinary matters, restructuring, termination and disputes, depending on the agreed scope.",
    ],
    [
      "Are Indian labour codes enforced?",
      "The applicable legal framework and commencement of provisions should be checked at the time of advice. Requirements may also differ by state, establishment and workforce category.",
    ],
    [
      "Does every business need separate registrations?",
      "Registration requirements depend on the organisation's activities, location, workforce and applicable laws. These should be assessed for each establishment.",
    ],
    [
      "Can an employer terminate an employee at any time?",
      "Termination should be reviewed against the employment agreement, applicable law, employee category, reason for action and any required process or notice.",
    ],
    [
      "Are non-compete clauses enforceable?",
      "Enforceability depends on the clause, timing, circumstances and applicable law. A specific agreement should be reviewed before relying on such a restriction.",
    ],
    [
      "Is an employee handbook legally binding?",
      "A handbook can communicate workplace rules and policies. Its legal effect depends on its terms, how it is incorporated or acknowledged and applicable law.",
    ],
    [
      "Can an independent contractor be treated as an employee?",
      "Classification depends on the actual working relationship, control, responsibilities and applicable legal tests. The contract label alone may not decide status.",
    ],
    [
      "Can Astronis help with employment disputes?",
      "Yes. Subject to an agreed scope, support may include dispute assessment, documentation review, negotiation strategy and representation or coordination where appropriate.",
    ],
  ],
  insights: [
    [
      "India's Labour Codes: Key Changes for Employers",
      "",
      "Employment Compliance",
    ],
    [
      "Employment Contracts in India: Essential Clauses and Legal Risks",
      "",
      "Employment Advisory",
    ],
    [
      "Disciplinary Proceedings and Termination: Legal Safeguards",
      "",
      "Workplace Relations",
    ],
  ],
  insightImages: [
    "/images/services/hr-and-employment-advisory.webp",
    "/Part-14 .png",
    "/Part-10 .png",
  ],
  resources: [
    ["GUIDE", "Labour Codes Guide", "document"],
    ["GUIDE", "Employment Contracts Guide", "file"],
    ["GUIDE", "HR Policies Guide", "shield"],
    ["GUIDE", "Wages & Social Security Guide", "wallet"],
    ["GUIDE", "Disciplinary Proceedings Guide", "scale"],
    ["CHECKLIST", "Compliance Audit Checklist", "document"],
  ],
  relatedPages: [
    [
      "Employment Contracts",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-contracts",
    ],
    [
      "Labour Law Compliance",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/labour-law-compliance",
    ],
    [
      "Human Resource Policies",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/human-resource-policies",
    ],
    [
      "Employee Handbook",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employee-handbook",
    ],
    [
      "Termination / Separation Advisory",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/termination-separation-advisory",
    ],
  ],
  finalHeading:
    "Build Legally Compliant Employment Relationships and Stronger Workplace Governance",
  finalDescription:
    "From employment contracts and statutory compliance to HR policies, disciplinary matters, termination and workforce restructuring, get integrated advice to manage workplace risks and build a compliant organisation.",
  finalAction: "Schedule an Employment Advisory Consultation",
  showTestimonials: false,
  showReviewActions: false,
};

export default function EmploymentAdvisoryPage() {
  return <EntityFormationPage data={data} />;
}
