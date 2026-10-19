import type { Metadata } from "next";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

export const metadata: Metadata = {
  title: "Human Resource Policies | Astronis Global",
  description:
    "Draft, review and implement practical HR policies aligned with employment requirements, workplace practices and organisational governance.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/employment-and-labour/human-resource-policies",
  },
};

const data: EntityFormationPageData = {
  slug: "human-resource-policies",
  title: "Human Resource Policies",
  shortTitle: "Human Resource Policies",
  serviceTitle: "Industrial, Employment & Forensics Advisory",
  serviceHref: "/services/industrial-employment-forensics-advisory",
  categoryTitle: "Employment & Labour",
  categoryHref:
    "/services/industrial-employment-forensics-advisory#employment-and-labour",
  heroEyebrow: "INDUSTRIAL, EMPLOYMENT & FORENSICS ADVISORY",
  heroPrimaryAction: "Schedule an HR Policy Consultation",
  heroPrimaryHref: "/contact",
  heroSecondaryAction: "Request an HR Policy Review",
  heroSecondaryHref: "/professionals/enquiry",
  heroStatement:
    "Building Stronger Workplace Governance. Developing Compliant HR Frameworks. Empowering Responsible Organisations.",
  description:
    "Astronis Global provides integrated legal, regulatory and business advisory services for the development, review and implementation of human resource policies in India. We help organisations establish clear, compliant and practical HR frameworks covering recruitment, onboarding, compensation, leave, workplace conduct, performance management, grievance redressal, disciplinary procedures and separation.",
  introduction:
    "Human resource policies define the internal rules, procedures and governance standards for managing the relationship between an organisation and its employees. They help employers apply workplace practices consistently, support legal compliance and provide a dependable basis for decision-making and employee guidance.",
  image: "/images/services/hr-and-employment-advisory.webp",
  imageAlt: "Business leaders reviewing human resource policies and workplace practices",
  heroNoteEyebrow: "WORKPLACE GOVERNANCE",
  heroNoteTitle: "Clear policies. Consistent workplace practices.",
  heroNoteDescription:
    "Align HR frameworks with your workforce, organisation and applicable requirements.",
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
  benefitsHeading: "Human Resource Policies in India",
  benefits: [
    [
      "document",
      "Consistent and clear workplace rules",
      "Give managers and employees a shared reference for workplace expectations and processes.",
    ],
    [
      "scale",
      "Alignment with statutory requirements",
      "Review policies against applicable employment laws, contracts and organisational practices.",
    ],
    [
      "shield",
      "Reduced employee disputes",
      "Set out transparent procedures for concerns, grievances, discipline and workplace conduct.",
    ],
    [
      "people",
      "Improved workforce administration",
      "Support consistent HR decisions across teams, roles, departments and locations.",
    ],
    [
      "building",
      "Stronger governance and accountability",
      "Clarify responsibilities, approval processes and policy ownership within the organisation.",
    ],
    [
      "chart",
      "Better employee experience",
      "Communicate workplace expectations and available support in a clear and accessible manner.",
    ],
  ],
  servicesHeading: "Our Human Resource Policies Services",
  servicesDescription:
    "Practical support for developing, reviewing and implementing HR policies that reflect your workforce, processes and applicable requirements.",
  serviceCardsThreeColumns: true,
  services: [
    [
      "document",
      "HR Policy Drafting & Legal Review",
      "Develop and review comprehensive HR policies, considering applicable laws and organisational goals.",
    ],
    [
      "people",
      "Recruitment, Onboarding & Employment Policies",
      "Policies for hiring, probation, employee classification, induction and employment documentation.",
    ],
    [
      "file",
      "Compensation, Leave, Benefits & Attendance Policies",
      "Frameworks for salary, benefits, leave, attendance, working hours and related employee entitlements.",
    ],
    [
      "shield",
      "Workplace Conduct, Ethics & Grievance Policies",
      "Codes of conduct, anti-harassment guidance, ethics, workplace complaints and employee accountability.",
    ],
    [
      "checklist",
      "Performance, Disciplinary & Separation Policies",
      "Policies for performance appraisal, misconduct handling, disciplinary procedures and separation processes.",
    ],
    [
      "gear",
      "HR Governance, Compliance Audit & Implementation",
      "Review HR frameworks, statutory alignment, employee communication, documentation and training.",
    ],
  ],
  structureEyebrow: "WHO NEEDS THESE SERVICES?",
  structureHeading: "HR policy support for every stage of growth",
  structurePoints: [
    [
      "building",
      "Companies",
      "Employers developing consistent HR frameworks across functions and departments.",
    ],
    [
      "document",
      "MSMEs",
      "Growing businesses formalising employment rules, benefits and workplace procedures.",
    ],
    [
      "chart",
      "Startups",
      "New organisations establishing scalable people practices and internal governance.",
    ],
    [
      "people",
      "Manufacturers",
      "Employers managing attendance, shifts, workplace conduct and location-specific practices.",
    ],
    [
      "scale",
      "Service sector organisations",
      "Businesses aligning policies across professional, customer-facing or distributed teams.",
    ],
    [
      "network",
      "Multi-location employers",
      "Organisations coordinating policy standards while accounting for location-specific requirements.",
    ],
  ],
  comparisonHeading:
    "HR Policy vs Employee Handbook vs Employment Contract",
  comparisonDescription:
    "These documents serve different purposes and should be reviewed for consistency. The appropriate structure depends on the organisation and its workforce.",
  comparisonNote:
    "This comparison is a general guide. Document scope and legal effect depend on the organisation’s arrangements and applicable law.",
  comparison: [],
  comparisonPanels: [
    {
      heading: "HR Policy vs Employee Handbook vs Employment Contract",
      headers: ["HR Policy", "Employee Handbook", "Employment Contract"],
      rows: [
        [
          "Purpose",
          "Organisation-wide rules and processes",
          "Employee-facing workplace guidance",
          "Individual employment terms",
        ],
        [
          "Scope",
          "Specific HR topics and procedures",
          "Consolidated employee guidance",
          "Terms agreed with an employee",
        ],
        [
          "Typical contents",
          "Leave, conduct, performance and approvals",
          "Workplace rules, benefits and procedures",
          "Role, compensation, duties and notice",
        ],
        [
          "Primary users",
          "HR, managers and employees",
          "Employees and managers",
          "Employer and individual employee",
        ],
        [
          "Review",
          "Update when processes or requirements change",
          "Review as workplace guidance evolves",
          "Amend in accordance with the contract and law",
        ],
      ],
    },
    {
      heading: "Mandatory Compliance Policies vs Management Policies",
      headers: ["Parameter", "Mandatory Compliance Policies", "Management / Optional Policies"],
      rows: [
        [
          "Legal basis",
          "Specific legislation or applicable requirements",
          "Business requirement or organisational choice",
        ],
        [
          "Examples",
          "POSH, safety, equal opportunity",
          "Travel, remote work, dress code",
        ],
        [
          "Applicability",
          "As per statutory coverage",
          "Organisation-specific",
        ],
        [
          "Amendment",
          "Must remain aligned with law",
          "Subject to management approval",
        ],
        [
          "Non-compliance",
          "Potential statutory consequences",
          "Internal or contractual impact",
        ],
        [
          "Audit priority",
          "High",
          "Based on business impact",
        ],
      ],
    },
  ],
  processEyebrow: "HR POLICY DEVELOPMENT PROCESS",
  processHeading: "A structured seven-stage policy development process",
  processDescription:
    "Understand the organisation, map applicable requirements, develop practical policies and support approval, communication and ongoing review.",
  processNumbers: true,
  process: [
    [
      "Assessment",
      "Understand workforce structure, locations, current policies and organisational practices.",
    ],
    [
      "Legal Review",
      "Map applicable labour and employment requirements to the organisation and its workforce.",
    ],
    [
      "Gap Analysis",
      "Review existing policies, contracts and procedures to identify gaps and inconsistencies.",
    ],
    [
      "Drafting",
      "Prepare clear, practical policy documents and supporting procedures.",
    ],
    [
      "Approval",
      "Coordinate management review, stakeholder input and policy finalisation.",
    ],
    [
      "Implementation",
      "Support communication, employee acknowledgement and manager training.",
    ],
    [
      "Review",
      "Plan policy updates as the organisation, workplace or applicable requirements change.",
    ],
  ],
  documentsHeading: "Documents Required (Illustrative)",
  documentsDescription:
    "The information required depends on the organisation, policy scope and workforce. A review commonly starts with:",
  documents: [
    "Incorporation and organisation details",
    "Organisation structure and workforce information",
    "Existing HR policies and employee handbooks",
    "Employment contracts and appointment letters",
    "Payroll, benefits, leave and attendance policies",
    "POSH policy and complaint procedures, where applicable",
    "Disciplinary, performance and grievance procedures",
    "Applicable registrations and statutory employment records",
    "Employee communications and acknowledgement materials",
  ],
  requirementsEyebrow: "STATUTORY TIMELINES (EXAMPLES)",
  requirementsHeading: "Timing depends on the policy and workplace",
  requirements: [
    [
      "calendar",
      "Policy drafting and review",
      "Depends on scope, existing documents and review cycles.",
    ],
    [
      "people",
      "Management approval",
      "Follows the organisation’s internal approval process.",
    ],
    [
      "file",
      "Policy implementation",
      "Timing depends on communication, training and operational readiness.",
    ],
    [
      "shield",
      "POSH committee constitution",
      "As per applicable statutory requirements for the workplace.",
    ],
    [
      "clock",
      "Ongoing policy review",
      "Periodic or event-driven, based on organisational and legal changes.",
    ],
  ],
  pricingEyebrow: "PROFESSIONAL FEES (INDICATIVE)",
  pricingHeading: "HR policy support tailored to your organisation",
  pricingDescription:
    "Fees depend on the number and complexity of policies, workforce size, locations, existing documentation, legal review and implementation support.",
  basicPackageEyebrow: "POLICY REVIEW",
  comprehensivePackageEyebrow: "DEVELOPMENT & IMPLEMENTATION",
  basicPackageName: "HR Policy Review & Drafting",
  comprehensivePackageName: "HR Framework Development",
  basicFeatures: [
    "Review of existing HR policies",
    "Legal and regulatory alignment",
    "Drafting or revision of agreed policies",
    "Consolidated review and recommendations",
  ],
  comprehensiveFeatures: [
    "HR policy framework assessment",
    "Policy drafting and document alignment",
    "Management approval support",
    "Employee communication and training guidance",
    "Periodic review and update planning",
  ],
  advantages: [
    "HR policy drafting and review",
    "Legal and regulatory alignment",
    "Policy implementation support",
    "Management and employee training",
    "Periodic review and updates",
    "HR compliance audit",
  ],
  challenges: [
    "Do not override statutory rights or obligations",
    "Ensure consistency with employment contracts",
    "Tailor policies to the organisation and workforce",
    "Follow fair disciplinary and grievance procedures",
    "Maintain POSH and grievance compliance",
    "Protect employee data and confidentiality",
  ],
  faqDescription:
    "Answers to common questions about HR policies, workplace rules and policy implementation.",
  faqs: [
    [
      "What are HR policies?",
      "HR policies are written workplace rules and procedures that guide employment practices, employee responsibilities and management processes.",
    ],
    [
      "Are HR policies legally mandatory?",
      "Some policies or workplace procedures may be required depending on applicable law, establishment, workforce and activities. Other policies may be adopted to support effective management.",
    ],
    [
      "Can policies be changed without employee consent?",
      "The answer depends on the policy, employment terms, applicable law and the nature of the proposed change. Material changes should be assessed before implementation.",
    ],
    [
      "Do HR policies require government registration?",
      "Not all HR policies require registration. Specific policies, rules or workplace requirements may be subject to approval, filing or other statutory steps.",
    ],
    [
      "What is the difference between an HR policy and an employee handbook?",
      "An HR policy generally describes a specific rule or procedure, while a handbook typically brings employee-facing policies and guidance together.",
    ],
    [
      "Can policies provide for automatic termination?",
      "Employment decisions must be considered against the contract, applicable law and fair process. A policy should not be treated as automatically overriding legal protections.",
    ],
    [
      "How often should HR policies be reviewed?",
      "Review policies periodically and when laws, workplace practices, organisational structures or business activities change.",
    ],
    [
      "Who should review HR policies?",
      "HR, management and relevant legal or compliance advisers should review policies based on their subject matter and organisational impact.",
    ],
    [
      "Can Astronis Global assist with HR policy development?",
      "Yes. Support can include policy review, drafting, legal alignment, implementation guidance and periodic updates, subject to an agreed scope.",
    ],
  ],
  insights: [
    [
      "HR Policies in India: Key Legal and Practical Considerations",
      "",
      "HR Policies",
    ],
    [
      "Workplace Conduct and Grievance Policies: Best Practices",
      "",
      "Workplace Governance",
    ],
    [
      "Leave, Benefits and Attendance Compliance Guide",
      "",
      "Employment Compliance",
    ],
  ],
  insightImages: [
    "/images/services/hr-and-employment-advisory.webp",
    "/images/services/hr-and-employment-advisory.webp",
    "/images/services/hr-and-employment-advisory.webp",
  ],
  resourcesDescription:
    "Guides and checklists for developing, implementing and reviewing workplace policies.",
  resources: [
    ["GUIDE", "HR Policy Framework Guide", "document"],
    ["GUIDE", "Recruitment & Onboarding Guide", "people"],
    ["GUIDE", "Leave & Benefits Policy Guide", "calendar"],
    ["GUIDE", "Workplace Conduct Guide", "shield"],
    ["GUIDE", "Disciplinary & Separation Guide", "scale"],
    ["CHECKLIST", "HR Compliance Checklist", "checklist"],
  ],
  relatedPages: [
    [
      "Employment Advisory",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-advisory",
    ],
    [
      "Employment Contracts",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-contracts",
    ],
    [
      "Labour Law Compliance",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/labour-law-compliance",
    ],
    [
      "Employee Handbook",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employee-handbook",
    ],
    [
      "Termination / Separation Advisory",
      "/services/industrial-employment-forensics-advisory/employment-and-labour/termination-separation-advisory",
    ],
    [
      "HR Compliance Review",
      "/services/industrial-employment-forensics-advisory/workplace-compliances/hr-compliance-review",
    ],
  ],
  finalHeading:
    "Develop Stronger HR Policies with Legal Clarity and Workplace Accountability",
  finalDescription:
    "From recruitment and onboarding to compensation, conduct, grievances and separation, Astronis Global provides integrated legal, regulatory and business advisory for developing and implementing effective HR policy frameworks.",
  finalAction: "Schedule an HR Policy Consultation",
};

export default function HumanResourcePoliciesPage() {
  return <EntityFormationPage data={data} />;
}