import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

const data: EntityFormationPageData = {
  slug: "posh-advisory",
  title: "POSH Advisory",
  shortTitle: "POSH Advisory",
  heroStatement:
    "Promoting safe workplaces. Strengthening statutory compliance. Ensuring fair and confidential redressal.",
  description:
    "Astronis Global provides comprehensive legal, regulatory and business advisory under India's Prevention of Sexual Harassment (POSH) framework. We assist organisations with policy drafting, Internal Committee constitution, employee awareness, complaint handling, inquiry procedures, statutory reporting and compliance audits to create safer, respectful and legally compliant workplaces.",
  introduction:
    "The POSH framework requires covered employers to take steps to prevent and redress workplace sexual harassment. Effective implementation brings together a compliant policy, a properly constituted Internal Committee where required, awareness initiatives, a fair complaint process and appropriate records and reporting.",
  image: "/images/services/hr-and-employment-advisory.webp",
  imageAlt: "Workplace team reviewing POSH compliance documents",
  basicPrice: "By scope",
  comprehensivePrice: "Tailored",
  categoryTitle: "Workplace Compliances",
  categoryHref:
    "/services/industrial-employment-forensics-advisory#workplace-compliances",
  categoryParentTitle: "Industrial, Employment & Forensics Advisory",
  categoryParentHref: "/services/industrial-employment-forensics-advisory",
  heroEyebrow: "WORKPLACE COMPLIANCES",
  heroNoteEyebrow: "POSH ADVISORY",
  heroNoteTitle: "Build a safer, more accountable workplace.",
  heroNoteDescription:
    "Connect prevention, Internal Committee readiness, fair inquiry procedures and ongoing compliance.",
  introHeading: "POSH advisory in India",
  introPanelEyebrow: "PREVENTION & REDRESSAL",
  introPanelHeading: "Make policy work in practice.",
  introPanelDescription:
    "Support respectful workplaces through clear procedures, trained stakeholders and a fair, confidential complaint process.",
  benefitCards: true,
  benefitCardsStacked: true,
  benefitCardsThreeColumns: true,
  servicesHeading: "Our POSH Advisory Services",
  servicesDescription:
    "Practical support for POSH policies, Internal Committees, prevention and awareness, complaint handling, inquiry processes and statutory records.",
  serviceCardsThreeColumns: true,
  benefitsHeading: "Why is POSH compliance necessary?",
  benefits: [
    [
      "shield",
      "Fulfil statutory duties",
      "Review applicable employer responsibilities, Internal Committee requirements, procedures and reporting obligations.",
    ],
    [
      "people",
      "Ensure safe workplaces",
      "Support prevention measures and respectful workplace practices through clear policies and awareness.",
    ],
    [
      "scale",
      "Protect employee rights",
      "Promote access to a fair, impartial and timely complaint redressal process.",
    ],
    [
      "search",
      "Reduce legal and regulatory risk",
      "Identify gaps in committee constitution, records, training or complaint-handling procedures.",
    ],
    [
      "document",
      "Promote dignity and respect",
      "Set clear expectations and make reporting channels and workplace standards understood.",
    ],
    [
      "building",
      "Strengthen workplace governance",
      "Support accountability, appropriate recordkeeping and considered follow-up by the organisation.",
    ],
  ],
  services: [
    [
      "document",
      "POSH Policy Drafting & Regulatory Compliance",
      "Prepare and review POSH policies, complaint procedures, workplace notices and statutory documentation.",
    ],
    [
      "people",
      "Internal Committee Constitution & Governance",
      "Advise on Internal Committee composition, external member eligibility, appointment orders, tenure and committee functioning.",
    ],
    [
      "award",
      "POSH Awareness, Training & Capacity Building",
      "Deliver employee sensitisation, management awareness and IC training for effective implementation.",
    ],
    [
      "scale",
      "Sexual Harassment Complaints & Inquiry Advisory",
      "Support complaint assessment, inquiry procedure, interim relief, evidence and recommendations.",
    ],
    [
      "file",
      "POSH Audit, Reporting & Statutory Coordination",
      "Review records, annual reports, employer disclosures and compliance audit support.",
    ],
    [
      "shield",
      "POSH Disputes, Appeals & Workplace Risk Advisory",
      "Advise on procedural challenges, appeals, retaliation risks and related workplace dispute matters.",
    ],
  ],
  structureHeading: "The POSH compliance framework",
  structurePoints: [
    [
      "document",
      "Policy and workplace communication",
      "Maintain an appropriate policy, communicate prohibited conduct and make complaint channels accessible.",
    ],
    [
      "people",
      "Internal Committee constitution",
      "Review whether an IC is required and, where applicable, its composition, appointment and functioning against the law.",
    ],
    [
      "award",
      "Prevention and awareness",
      "Plan employee awareness and IC capacity building appropriate to the organisation and its workplaces.",
    ],
    [
      "scale",
      "Complaint inquiry and safeguards",
      "Follow the applicable statutory process, confidentiality requirements, interim measures and procedural fairness.",
    ],
    [
      "file",
      "Records, reporting and follow-up",
      "Maintain required records and reporting, and consider recommendations and corrective steps in accordance with law.",
    ],
  ],
  comparisonHeading: "POSH Compliance & Complaint Handling",
  comparisonDescription:
    "The applicable committee and process depend on the employer, workplace and circumstances under the POSH Act. The following comparisons are a general guide; confirm applicability for each matter.",
  comparisonNote:
    "Applicability, committee jurisdiction and complaint procedures depend on the workplace and facts. Confirm the current statutory requirements for each matter.",
  comparisonPanels: [
    {
      heading: "Internal Committee vs Local Committee",
      headers: ["Internal Committee (IC)", "Local Committee (LC)"],
      rows: [
        ["Constitution", "By the employer at a workplace where required by law", "By the District Officer for the district"],
        ["Applicability", "Workplaces with ten or more employees, subject to the Act", "Workplaces with fewer than ten workers or where the complaint is against the employer, as provided by the Act"],
        ["Composition", "Presiding Officer, employee members and an external member as prescribed", "Composition prescribed for the district-level committee under the Act"],
        ["Jurisdiction", "Complaints relating to the relevant workplace", "Complaints within the Local Committee's statutory jurisdiction"],
        ["Reporting", "Annual report and employer disclosures as applicable", "Annual reporting and district-level coordination as applicable"],
        ["Key consideration", "Correct constitution, independence and capacity", "Correct jurisdiction, referral and statutory procedure"],
      ],
    },
    {
      heading: "POSH Complaint vs General Workplace Grievance",
      headers: ["POSH Complaint", "General Workplace Grievance"],
      rows: [
        ["Legal basis", "Sexual Harassment of Women at Workplace Act, 2013", "Internal policy, employment law or another applicable framework"],
        ["Coverage", "Sexual harassment of a woman at the workplace within the Act", "Broader workplace concerns and employment issues"],
        ["Forum", "Internal Committee or Local Committee, as applicable", "HR, grievance mechanism or another appropriate forum"],
        ["Procedure", "Statutory inquiry process and safeguards", "Organisational procedure and applicable law"],
        ["Confidentiality", "Specific statutory confidentiality obligations apply", "Handled under relevant policy and applicable legal duties"],
        ["Outcome", "Findings and recommendations under the statutory framework", "Internal resolution or further action as applicable"],
      ],
    },
  ],
  comparisonFocusIndex: null,
  comparison: [],
  processEyebrow: "POSH COMPLIANCE PROCESS",
  processHeading: "A practical seven-stage compliance cycle",
  processDescription:
    "A structured cycle helps organisations maintain prevention, awareness, redressal and review. Requirements and timelines should be checked against the current law and facts.",
  processNumbers: true,
  process: [
    [
      "Applicability Assessment",
      "Identify workplaces, workforce strength and applicable statutory responsibilities.",
    ],
    [
      "Policy & Committee Setup",
      "Draft or review the policy and constitute the Internal Committee where required.",
    ],
    [
      "Gap Analysis",
      "Review existing policies, committee records, awareness, complaint procedures and reporting.",
    ],
    [
      "Training & Awareness",
      "Conduct employee awareness and build IC capacity for effective and fair implementation.",
    ],
    [
      "Complaint Handling",
      "Support intake, interim measures and inquiry in accordance with the applicable statutory process.",
    ],
    [
      "Reporting & Implementation",
      "Maintain appropriate records, prepare applicable reports and consider recommendations.",
    ],
    [
      "Ongoing Review",
      "Periodically audit the framework and update it for organisational and legal changes.",
    ],
  ],
  documentsHeading: "Documents required (illustrative)",
  documentsDescription:
    "The checklist depends on the organisation, workplace and scope. Commonly relevant materials include:",
  documents: [
    "Organisation and establishment details, including workplace locations",
    "Employee strength and workplace coverage information",
    "Existing POSH policy and related HR policies",
    "Internal Committee constitution orders and member details",
    "External member engagement and eligibility records",
    "Awareness and training materials, attendance and completion records",
    "Complaint register and inquiry records, with access appropriately restricted",
    "Annual reports and employer disclosures, where applicable",
    "Records of recommendations, action taken and follow-up",
    "Prior audit findings, notices or related proceedings, where relevant",
  ],
  requirementsEyebrow: "WHO NEEDS THESE SERVICES",
  requirementsHeading: "Employers building compliant workplaces",
  requirements: [
    [
      "building",
      "Companies and employers",
      "Organisations reviewing prevention, complaint handling and statutory compliance.",
    ],
    [
      "people",
      "HR and people teams",
      "Teams implementing policies, training, complaint channels and appropriate records.",
    ],
    [
      "rocket",
      "Startups and MSMEs",
      "Growing employers seeking to establish a POSH framework appropriate to their workplaces.",
    ],
    [
      "globe",
      "Multi-location organisations",
      "Employers coordinating consistent POSH measures across offices and establishments.",
    ],
    [
      "handshake",
      "Internal Committee members",
      "Committees seeking capacity building and procedural guidance for their responsibilities.",
    ],
  ],
  basicPackageEyebrow: "FOCUSED REVIEW",
  basicPackageName: "POSH Compliance Review",
  basicFeatures: [
    "Initial applicability and scope discussion",
    "Review of policy and committee records",
    "Gap assessment of key compliance measures",
    "Prioritised recommendations for follow-up",
  ],
  comprehensivePackageEyebrow: "COMPREHENSIVE SUPPORT",
  comprehensivePackageName: "POSH Framework & Implementation Support",
  comprehensiveFeatures: [
    "Policy drafting or review",
    "Internal Committee constitution and governance support",
    "Employee and committee training",
    "Complaint procedure and statutory record review",
    "Annual reporting and ongoing compliance advisory",
  ],
  pricingEyebrow: "PROFESSIONAL FEES",
  pricingHeading: "POSH support tailored to your organisation",
  pricingDescription:
    "Fees depend on workplace locations, employee strength, policy requirements, committee support, training needs and whether complaint or inquiry assistance is required.",
  customHeading: "Multi-location or inquiry support",
  customDescription:
    "Request a tailored scope for multiple establishments, policy implementation, committee capacity building, compliance audits or support on a specific complaint.",
  priceNote:
    "Any statutory payments, travel or third-party costs are separate where applicable. Complaint matters are handled within an agreed scope and applicable statutory requirements.",
  featureHeading: "POSH compliance considerations",
  featureItems: [
    "Workplace applicability and coverage",
    "Internal Committee constitution",
    "Policy and complaint channels",
    "Employee awareness and training",
    "Fair inquiry procedure and safeguards",
    "Confidentiality and record access",
    "Annual reporting and disclosures",
    "Recommendations and follow-up",
  ],
  faqDescription:
    "Answers to common questions about POSH compliance, Internal Committees and complaint handling.",
  faqs: [
    [
      "What is POSH compliance?",
      "It refers to an employer's applicable duties under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, including prevention, complaint redressal and related measures.",
    ],
    [
      "Is an Internal Committee mandatory?",
      "The Act requires an employer to constitute an Internal Committee at each office or administrative unit of a workplace with ten or more employees. Applicability should be assessed for the organisation and its workplaces.",
    ],
    [
      "Does POSH require government registration?",
      "There is no general central registration requirement under the Act for every Internal Committee. State or local directions and other applicable requirements should be checked.",
    ],
    [
      "Can a complaint be filed after three months?",
      "The Act generally provides a three-month period from the incident, or the last incident in a series, with a possible extension of up to a further three months for reasons recorded in writing, subject to the Act.",
    ],
    [
      "Can a complaint be settled through conciliation?",
      "The Act permits conciliation at the request of the aggrieved woman before the inquiry begins, subject to statutory safeguards. Monetary settlement cannot be the basis of conciliation.",
    ],
    [
      "Is the inquiry process confidential?",
      "The Act restricts publication or disclosure of specified complaint, inquiry and action-related information. Organisations should control access and communications in accordance with the law.",
    ],
    [
      "What is the Internal Committee's annual reporting obligation?",
      "The Act and Rules provide for annual reporting by the Internal Committee to the employer and District Officer, with applicable information. The organisation should confirm current filing and disclosure requirements.",
    ],
    [
      "Can Astronis assist with POSH compliance and training?",
      "Yes. Depending on the agreed scope, support can include policy and committee review, awareness and capacity building, compliance assessment and procedural advisory.",
    ],
  ],
  insights: [
    [
      "POSH Compliance in India: Employer Duties and Reporting",
      "",
      "Workplace Compliance",
    ],
    [
      "Handling POSH Complaints: Inquiry Procedure and Legal Safeguards",
      "",
      "Employment Advisory",
    ],
    [
      "Building Safer Workplaces Through Awareness and Training",
      "",
      "Workplace Governance",
    ],
  ],
  insightImages: [
    "/images/services/hr-and-employment-advisory.webp",
    "/Part-14 .png",
    "/Part-10 .png",
  ],
  resources: [
    ["GUIDE", "POSH Act Compliance Guide", "document"],
    ["PROCEDURE", "Internal Committee Setup Guide", "file"],
    ["CHECKLIST", "Complaint & Inquiry Checklist", "search"],
    ["CALENDAR", "POSH Statutory Timelines Guide", "calendar"],
  ],
  relatedPages: [
    [
      "Employment Disputes",
      "/services/industrial-employment-forensics-advisory/workplace-compliances/employment-disputes",
    ],
    [
      "Workplace Investigations",
      "/services/industrial-employment-forensics-advisory/workplace-compliances/workplace-investigations",
    ],
    [
      "HR Compliance Review",
      "/services/industrial-employment-forensics-advisory/workplace-compliances/hr-compliance-review",
    ],
  ],
  finalHeading: "Build a Safer Workplace with Stronger POSH Compliance",
  finalDescription:
    "Discuss your policy, Internal Committee, awareness and complaint-handling priorities to plan a practical POSH compliance framework.",
  finalAction: "Schedule a POSH Compliance Consultation",
  showTestimonials: false,
  showReviewActions: false,
};

export default function PoshAdvisoryPage() {
  return <EntityFormationPage data={data} />;
}
