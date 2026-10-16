import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages, type EntityFormationPageData } from "@/data/entity-formation-pages";

const advisoryData = allEntityFormationPages.find((page) => page.slug === "debt-and-restructuring-advisory");

export const metadata: Metadata = {
  title: "Debt Restructuring | Astronis Global",
  description: "Advisory for debt restructuring, repayment plans, creditor negotiations, refinancing and implementation support.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/debt-restructuring",
  },
};

export default function DebtRestructuringPage() {
  if (!advisoryData) notFound();

  const data: EntityFormationPageData = {
    ...advisoryData,
    slug: "debt-restructuring",
    title: "Debt Restructuring",
    shortTitle: "Debt Restructuring",
    heroEyebrow: "INSOLVENCY & RESTRUCTURING",
    heroPrimaryAction: "Schedule a Debt Restructuring Consultation",
    heroSecondaryAction: "Request a Restructuring Assessment",
    heroStatement: "Restructuring Financial Obligations. Strengthening Business Continuity. Supporting Sustainable Recovery.",
    description: "Astronis Global provides integrated corporate, regulatory, legal and business advisory for structuring and implementing debt restructuring arrangements involving corporate borrowers, MSMEs, banks, NBFCs, financial institutions, investors and other creditors. Our services cover loan rescheduling, refinancing, debt consolidation, inter-creditor arrangements, security modification, settlement and implementation of commercially and legally sustainable solutions.",
    heroNoteEyebrow: "DEBT RESTRUCTURING",
    heroNoteTitle: "Restructure debt with clarity and confidence.",
    heroNoteDescription: "Coordinate financial obligations, creditor priorities and sustainable repayment options.",
    benefitsHeading: "Debt Restructuring in India",
    benefits: [
      ["chart", "Realistic and sustainable repayment arrangements", "Assess repayment capacity and develop revised terms that respond to the business’s financial position."],
      ["people", "Improved business continuity and liquidity", "Consider restructuring options that may support viable operations while addressing creditor obligations."],
      ["network", "Better creditor coordination and negotiation", "Coordinate discussions, approvals and documentation across lenders and other stakeholders."],
      ["shield", "Reduced enforcement and insolvency risks", "Identify contractual defaults, security rights, recovery exposure and applicable resolution pathways."],
      ["document", "Legally documented and compliant restructuring", "Record agreed terms, approvals, revised obligations and implementation conditions."],
      ["scale", "Support for long-term financial stability", "Establish clear milestones and monitoring for the agreed restructuring plan."],
    ],
    benefitCardsFourColumns: false,
    servicesHeading: "Our Debt Restructuring Services",
    servicesDescription: "Practical support across repayment revision, creditor negotiations, refinancing, security restructuring and implementation.",
    structureHeading: "Who needs debt restructuring services?",
    structurePoints: [
      ["building", "Corporate borrowers", "Businesses managing financial stress, defaults or repayment challenges."],
      ["document", "MSMEs", "Small and medium enterprises seeking sustainable repayment arrangements."],
      ["bank", "Banks & NBFCs", "Lenders coordinating repayment, refinancing, recovery and restructuring proposals."],
      ["people", "Promoters & directors", "Leadership teams assessing business continuity and stakeholder obligations."],
      ["scale", "Creditors & investors", "Stakeholders evaluating claims, restructuring terms and recovery prospects."],
    ],
    comparisonHeading: "Debt Restructuring vs Refinancing vs OTS vs IBC",
    comparisonDescription: "Compare potential financial distress routes at a high level. Eligibility, creditor consent and outcomes depend on the facts and applicable law.",
    comparisonNote: "This comparison is a general guide, not a recommendation or determination of eligibility. Obtain advice based on the debt, security, creditor position and current law.",
    comparisonPanels: [
      {
        heading: "Debt Restructuring — Available Approaches",
        headers: ["Debt Restructuring", "Refinancing", "One-Time Settlement", "IBC Resolution"],
        rows: [
          ["Objective", "Modify existing repayment terms", "Replace or reorganise financing", "Agree a compromise of debt", "Resolve insolvency through statutory process"],
          ["Approvals", "Lender consent as required", "New lender and existing creditor approvals", "Relevant creditor approval", "As provided under IBC process"],
          ["Debt treatment", "Revised repayment obligations", "New or revised financing terms", "Agreed settlement amount", "Resolution plan or statutory outcome"],
          ["Security impact", "May continue or be modified", "May be released, replaced or continued", "As recorded in settlement", "Governed by applicable process"],
          ["Key consideration", "Repayment feasibility", "Availability and cost of finance", "Ability to meet settlement terms", "Eligibility, timelines and process outcome"],
        ],
      },
      {
        heading: "Single-Lender vs Multi-Lender Restructuring",
        headers: ["Parameter", "Single-Lender", "Multi-Lender"],
        rows: [
          ["Creditor coordination", "One lender", "Multiple lenders"],
          ["Approval process", "Lender internal approvals", "Collective or individual approvals"],
          ["Documentation", "Facility-specific amendments", "Coordinated agreements and inter-creditor arrangements"],
          ["Security", "Existing lender security", "Shared or multiple securities"],
          ["Complexity", "Relatively straightforward", "More complex negotiation"],
          ["Key consideration", "Repayment feasibility", "Creditor alignment and enforceable structure"],
        ],
      },
    ],
    processEyebrow: "DEBT RESTRUCTURING PROCESS",
    processHeading: "A coordinated seven-stage restructuring process",
    processDescription: "Assess financial stress, evaluate options, align creditors and implement a documented, sustainable restructuring plan.",
    process: [
      ["Financial Stress & Debt Assessment", "Review debt, defaults, liabilities, security and repayment capacity."],
      ["Legal, Contractual & Regulatory Review", "Examine agreements, notices, guarantees and applicable requirements."],
      ["Restructuring Proposal Development", "Evaluate options and develop revised repayment terms."],
      ["Lender Engagement & Negotiation", "Present proposals and coordinate creditor approvals."],
      ["Documentation & Approvals", "Draft, review and execute restructuring documents."],
      ["Implementation & Filings", "Complete conditions, filings, registrations and implementation steps."],
      ["Monitoring & Ongoing Support", "Track obligations, reporting, covenants and future actions."],
    ],
    documentsHeading: "Documents Required (Illustrative)",
    documents: [
      "Incorporation and constitutional documents",
      "Loan agreements and sanction letters",
      "Financial statements and cash-flow projections",
      "Account statements and repayment history",
      "Security and guarantee documents",
      "ROC and CERSAI charge records",
      "Lender correspondence and notices",
      "Proposed restructuring terms and business plan",
    ],
    requirementsEyebrow: "STATUTORY TIMELINES (KEY EXAMPLES)",
    requirementsHeading: "Timelines depend on approvals and process",
    requirements: [
      ["calendar", "Proposal submission", "Timing depends on document readiness and lender requirements."],
      ["people", "Lender review and assessment", "Review periods vary by creditor and transaction complexity."],
      ["checklist", "Regulatory approvals", "Prior approvals or notifications may be required in some cases."],
      ["file", "Documentation and filings", "Complete within agreed schedules and applicable statutory periods."],
    ],
    pricingEyebrow: "PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Fees aligned to restructuring scope",
    pricingDescription: "Fees depend on debt profile, number of creditors, security structure, negotiation complexity, proceedings and implementation support. Government charges and third-party expenses are separate.",
    basicPackageName: "Debt Assessment & Strategy",
    comprehensivePackageName: "Restructuring & Implementation",
    basicFeatures: ["Debt assessment and legal review", "Creditor and security overview", "Restructuring options discussion", "Recommended next steps"],
    comprehensiveFeatures: ["Restructuring strategy and proposal", "Creditor negotiation support", "Documentation and approval coordination", "Implementation and monitoring support"],
    faqDescription: "Answers to common questions about debt restructuring, creditor negotiations and implementation.",
    relatedPages: [
      ["Debt & Restructuring Advisory", "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/debt-and-restructuring-advisory"],
      ["IBC Strategy & Advisory", "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/ibc-strategy-and-advisory"],
      ["CIRP-related Advisory", "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/cirp-related-advisory"],
      ["Resolution Planning Support", "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/resolution-planning-support"],
      ["NCLT & NCLAT Advisory", "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/nclt-and-nclat-advisory"],
      ["Distressed Business Advisory", "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/distressed-business-advisory"],
    ],
  };

  return <EntityFormationPage data={data} />;
}
