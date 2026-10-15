import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

const data: EntityFormationPageData = {
  slug: "compliance-investigations",
  title: "Compliance Investigations",
  shortTitle: "Compliance Investigations",
  heroStatement:
    "Investigating compliance concerns. Ensuring regulatory adherence. Strengthening ethical governance.",
  description:
    "Astronis Global provides integrated legal, regulatory and business advisory for compliance investigations, regulatory enquiries, internal compliance breaches, policy violations and governance failures across India. We assist organisations in examining alleged non-compliance with laws, regulations, licences, internal policies and industry standards, identifying root causes, assessing legal exposure, coordinating with regulators and implementing corrective and preventive measures.",
  introduction:
    "A compliance investigation is a structured review of an alleged or suspected breach of applicable laws, regulations, licences, policies or governance requirements. The investigation should be scoped to the concern, preserve relevant evidence, assess the facts fairly and support proportionate remediation.",
  image: "/images/services/risk-governance-and-forensic-advisory.webp",
  imageAlt: "Compliance professionals reviewing regulatory and governance documents",
  basicPrice: "By scope",
  comprehensivePrice: "Tailored",
  categoryTitle: "Risk, Forensics & Investigations",
  categoryHref:
    "/services/industrial-employment-forensics-advisory#risk-forensics-and-investigations",
  categoryParentTitle: "Industrial, Employment & Forensics Advisory",
  categoryParentHref: "/services/industrial-employment-forensics-advisory",
  heroEyebrow: "RISK, FORENSICS & INVESTIGATIONS",
  heroNoteEyebrow: "COMPLIANCE INVESTIGATIONS",
  heroNoteTitle: "Independent review. Practical remediation.",
  heroNoteDescription:
    "Coordinate fact-finding, regulatory response and corrective action with a clear investigation mandate.",
  introHeading: "Compliance Investigations in India",
  introPanelEyebrow: "REGULATORY ADHERENCE",
  introPanelHeading: "Find the facts and address the cause.",
  introPanelDescription:
    "Understand the concern, applicable requirements, evidence and control environment before deciding the response.",
  benefitCards: true,
  benefitCardsStacked: true,
  benefitCardsThreeColumns: true,
  servicesHeading: "Our Compliance Investigation Services",
  servicesDescription:
    "Independent investigation and advisory for regulatory concerns, internal breaches, licence conditions, policies and governance processes.",
  serviceCardsThreeColumns: true,
  benefitsHeading: "Why are compliance investigations necessary?",
  benefits: [
    [
      "search",
      "Identify compliance gaps and control weaknesses",
      "Examine the concern and relevant processes to understand how a potential breach occurred.",
    ],
    [
      "shield",
      "Prevent regulatory and enforcement risk",
      "Assess applicable requirements and support a timely, considered response to potential non-compliance.",
    ],
    [
      "scale",
      "Protect business reputation",
      "Address compliance concerns through a documented process and proportionate corrective steps.",
    ],
    [
      "people",
      "Ensure governance accountability",
      "Clarify responsibilities, decision-making and oversight relevant to the matter.",
    ],
    [
      "document",
      "Support informed management decisions",
      "Present evidence-based findings and options to responsible decision-makers.",
    ],
    [
      "building",
      "Strengthen internal compliance frameworks",
      "Use investigation outcomes to improve policies, controls, training and ongoing monitoring.",
    ],
  ],
  services: [
    [
      "search",
      "Regulatory Non-Compliance Investigations",
      "Investigate suspected breaches of laws, rules, regulations, licences and regulatory obligations.",
    ],
    [
      "shield",
      "Policy & Governance Breach Investigations",
      "Review internal policy violations, ethical misconduct, control failures and governance lapses.",
    ],
    [
      "gear",
      "Sector-Specific Compliance Investigations",
      "Review industry-specific compliance requirements and alleged breaches across regulated sectors.",
    ],
    [
      "building",
      "Licence, Approval & Reporting Investigations",
      "Investigate issues relating to statutory licences, approvals, regulatory filings and reporting obligations.",
    ],
    [
      "scale",
      "Contractual & Third-Party Compliance Investigations",
      "Assess vendor, distributor, agent and third-party compliance risks and suspected breaches.",
    ],
    [
      "file",
      "Corrective Action & Compliance Remediation",
      "Report findings, assign legal assessment, coordinate remediation and support implementation of remedial measures.",
    ],
  ],
  structureHeading: "The compliance investigation framework",
  structurePoints: [
    [
      "document",
      "Applicable requirements and investigation mandate",
      "Identify relevant laws, regulations, licence conditions, policies and the specific issues to be examined.",
    ],
    [
      "search",
      "Evidence preservation and review",
      "Identify relevant records, preserve material appropriately and assess information against the issues in scope.",
    ],
    [
      "people",
      "Independence and procedural fairness",
      "Consider conflicts, investigator roles, participant safeguards and appropriate opportunities to provide information.",
    ],
    [
      "scale",
      "Regulatory engagement and legal exposure",
      "Assess reporting duties, response timelines and the potential regulatory or legal implications of findings.",
    ],
    [
      "shield",
      "Corrective action and monitoring",
      "Develop proportionate remediation, responsibility allocation and follow-up monitoring.",
    ],
  ],
  comparisonHeading: "Compliance Review & Investigation Responses",
  comparisonDescription:
    "The appropriate response depends on the concern, applicable requirements, authority involvement and procedural stage. The following comparisons are general guidance only.",
  comparisonNote:
    "Applicable reporting obligations, authority powers and investigation procedures vary by sector, law, licence and matter-specific facts.",
  comparisonPanels: [
    {
      heading: "Internal Audit vs Compliance Investigation",
      headers: ["Internal Audit", "Compliance Investigation"],
      rows: [
        ["Primary purpose", "Assess systems and controls", "Examine specific compliance concerns"],
        ["Scope", "Routine review across functions", "Focused on an allegation or risk-based issue"],
        ["Conducted by", "Internal audit team", "Independent or internal investigators, as appropriate"],
        ["Output", "Audit report with recommendations", "Investigation findings and remediation plan"],
        ["Typical trigger", "Periodic audit plan", "Complaint, regulatory concern or suspected breach"],
      ],
    },
    {
      heading: "Regulatory Enquiry vs Internal Investigation vs Litigation-Ready Review",
      headers: ["Regulatory Enquiry", "Internal Investigation", "Litigation-Ready Review"],
      rows: [
        ["Initiated by", "Regulatory authority", "Organisation", "Organisation or legal counsel"],
        ["Main focus", "Compliance with specific laws", "Internal fact-finding", "Evidence preservation and legal defence"],
        ["Powers", "Statutory powers may apply", "Organisational mandate", "Legal strategy and evidentiary support"],
        ["Outcome", "Enforcement action may be possible", "Management report", "Materials for potential litigation"],
        ["Typical risk", "Penalties, suspension or licence action", "Internal disciplinary or remedial action", "Civil or criminal proceedings, as applicable"],
      ],
    },
  ],
  comparisonFocusIndex: null,
  comparison: [],
  processEyebrow: "COMPLIANCE INVESTIGATION PROCESS",
  processHeading: "A seven-stage investigation from intake to follow-up",
  processDescription:
    "A clear process supports appropriate fact-finding, regulatory coordination and corrective action. Timelines depend on the matter, evidence, participants and applicable requirements.",
  processNumbers: true,
  process: [
    [
      "Initial Assessment",
      "Review the allegation, applicable requirements, urgency and any immediate legal or operational risks.",
    ],
    [
      "Mandate & Planning",
      "Define scope, independence, investigator roles, evidence sources and reporting lines.",
    ],
    [
      "Evidence Collection",
      "Preserve and collect relevant records, communications and other evidence within the mandate.",
    ],
    [
      "Analysis & Evaluation",
      "Assess the facts against applicable laws, policies, licence conditions and compliance controls.",
    ],
    [
      "Findings & Reporting",
      "Prepare reasoned findings and report with conclusions and recommendations.",
    ],
    [
      "Remediation Support",
      "Coordinate corrective action and compliance improvements based on the findings.",
    ],
    [
      "Ongoing Advisory",
      "Monitor implementation, regulatory updates and any required follow-up.",
    ],
  ],
  documentsHeading: "Documents required (illustrative)",
  documentsDescription:
    "The records required depend on the allegation, sector and agreed scope. Typical starting materials include:",
  documents: [
    "Corporate documents and governance records",
    "Applicable licences, approvals and regulatory filings",
    "Regulatory correspondence and notices",
    "Policies, SOPs and compliance manuals",
    "Contracts and third-party agreements",
    "Financial and operational records",
    "Internal audit and risk reports",
    "Relevant email and electronic records",
    "Whistleblower complaints and related materials",
    "Prior investigation reports and remediation records",
  ],
  requirementsEyebrow: "WHO NEEDS THESE SERVICES",
  requirementsHeading: "Organisations addressing compliance concerns",
  requirements: [
    [
      "building",
      "Companies and organisations",
      "Businesses responding to internal compliance breaches or regulatory concerns.",
    ],
    [
      "document",
      "MSMEs",
      "Growing businesses reviewing policies, licences, controls and compliance responsibilities.",
    ],
    [
      "rocket",
      "Startups",
      "Teams establishing governance and compliance processes as operations expand.",
    ],
    [
      "globe",
      "Financial institutions",
      "Regulated entities assessing compliance allegations, regulatory enquiries or control gaps.",
    ],
    [
      "award",
      "Regulated and public-sector organisations",
      "Organisations coordinating obligations across licences, approvals and sector rules.",
    ],
  ],
  basicPackageEyebrow: "INITIAL REVIEW",
  basicPackageName: "Compliance Investigation Assessment",
  basicFeatures: [
    "Initial allegation and scope discussion",
    "Review of priority records and requirements",
    "Preliminary risk and process assessment",
    "Recommended investigation and response priorities",
  ],
  comprehensivePackageEyebrow: "END-TO-END SUPPORT",
  comprehensivePackageName: "Investigation & Remediation Support",
  comprehensiveFeatures: [
    "Investigation mandate and work plan",
    "Evidence collection and document review coordination",
    "Fact-finding and analysis",
    "Findings report and regulatory coordination as scoped",
    "Corrective action and ongoing monitoring support",
  ],
  pricingEyebrow: "PROFESSIONAL FEES",
  pricingHeading: "Fees aligned to the investigation scope",
  pricingDescription:
    "Fees depend on the allegations, applicable regulations, evidence volume, locations, participants, urgency and whether regulatory response or remediation support is required.",
  customHeading: "Regulatory or multi-location investigations",
  customDescription:
    "Request a tailored scope for concurrent authority enquiries, multiple locations, sector-specific licensing matters or complex third-party concerns.",
  priceNote:
    "Government charges, statutory payments and third-party costs are separate where applicable. Findings and outcomes depend on the evidence, scope and applicable requirements.",
  featureHeading: "Investigation safeguards",
  featureItems: [
    "Defined mandate and investigation scope",
    "Applicable laws, licences and policies",
    "Independence and conflict assessment",
    "Evidence preservation and access controls",
    "Fair fact-finding and documentation",
    "Regulatory response and reporting duties",
    "Corrective action and accountability",
    "Ongoing monitoring and review",
  ],
  faqDescription:
    "Answers to common questions about compliance investigations and regulatory response.",
  faqs: [
    [
      "What is a compliance investigation?",
      "It is a structured fact-finding process to examine a suspected breach of applicable law, regulation, licence conditions, policy or governance requirements.",
    ],
    [
      "How is a compliance investigation different from an internal audit?",
      "An internal audit typically assesses systems and controls, while a compliance investigation focuses on specific allegations or suspected breaches. The scopes may overlap depending on the circumstances.",
    ],
    [
      "When should an independent investigator be appointed?",
      "Independence may be appropriate where conflicts, seniority of those involved, sensitivity or stakeholder confidence warrants it. The decision depends on the facts and investigation mandate.",
    ],
    [
      "Does every compliance issue need to be reported to a regulator?",
      "Reporting obligations vary by law, licence, sector and facts. Organisations should assess applicable duties and deadlines promptly rather than assume that every issue has the same reporting requirement.",
    ],
    [
      "How long does a compliance investigation take?",
      "There is no universal timeline. Duration depends on the concern, evidence, participants, locations, authority requirements and agreed scope.",
    ],
    [
      "Can the investigation guarantee that there will be no enforcement action?",
      "No. An investigation can help establish facts and support an informed response, but it cannot guarantee regulatory or legal outcomes.",
    ],
    [
      "Can Astronis support corrective action after the investigation?",
      "Yes. Depending on the agreed scope, support may include remediation planning, policy and control improvements, regulatory coordination and ongoing monitoring.",
    ],
  ],
  insights: [
    [
      "Compliance Investigations in India: Legal Framework and Best Practices",
      "",
      "Risk & Forensics",
    ],
    [
      "Responding to Regulatory Notices: Practical Steps for Organisations",
      "",
      "Regulatory Advisory",
    ],
    [
      "Building a Stronger Compliance Governance Framework",
      "",
      "Corporate Governance",
    ],
  ],
  insightImages: [
    "/images/services/risk-governance-and-forensic-advisory.webp",
    "/Part-14 .png",
    "/Part-10 .png",
  ],
  resources: [
    ["GUIDE", "Compliance Investigation Guide", "document"],
    ["GUIDE", "Regulatory Enquiry Guide", "file"],
    ["CHECKLIST", "Evidence Management Guide", "search"],
    ["FRAMEWORK", "Corporate Governance Guide", "shield"],
    ["GUIDE", "Regulatory Reporting Guide", "scale"],
    ["CHECKLIST", "Compliance Investigation Checklist", "calendar"],
  ],
  relatedPages: [
    [
      "Fraud Risk & Forensic Review",
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/fraud-risk-forensic-review",
    ],
    [
      "Corporate Investigations",
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/corporate-investigations",
    ],
    [
      "Financial Fraud Investigations",
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/financial-fraud-investigations",
    ],
    [
      "Due Diligence / Background Review",
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/due-diligence-background-review",
    ],
    [
      "White-Collar Advisory",
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/white-collar-advisory",
    ],
    [
      "Anti-Bribery / Ethics Framework",
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/anti-bribery-ethics-framework",
    ],
  ],
  finalHeading: "Ensure Regulatory Compliance with Independent Investigation",
  finalDescription:
    "From compliance risk assessment and investigation to regulatory coordination and governance strengthening, plan a practical response to compliance concerns.",
  finalAction: "Schedule a Compliance Investigation Consultation",
  showTestimonials: false,
  showReviewActions: false,
};

export default function ComplianceInvestigationsPage() {
  return <EntityFormationPage data={data} />;
}
