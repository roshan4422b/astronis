import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const investmentData = transactionGovernancePages.find(
  (page) => page.slug === "investment-transactions",
);

const data: EntityFormationPageData | undefined = investmentData
  ? {
      ...investmentData,
      slug: "investor-coordination",
      title: "Investor Coordination",
      shortTitle: "Investor Coordination",
      image: "/images/services/hero.webp",
      imageAlt:
        "Business leaders coordinating an investment transaction in a modern office",
      heroStatement:
        "Connecting stakeholders. Streamlining transactions. Strengthening investment execution.",
      description:
        "Astronis Global provides integrated investor coordination services to help businesses manage investment discussions, due diligence, documentation and closing with clarity, structure and accountability.",
      introduction:
        "We assist startups, MSMEs and growing companies in coordinating investor interactions, managing information requests, organising due diligence, supporting negotiations and facilitating transaction execution through structured and transparent processes.",
      categoryTitle: "Investment & Transaction Advisory",
      categoryHref:
        "/services/business-advisory-contracts#investment-and-transaction-advisory",
      heroEyebrow:
        "CORPORATE & COMMERCIAL ADVISORY · INVESTMENT & TRANSACTION ADVISORY",
      heroNoteEyebrow: "INVESTOR COORDINATION",
      heroNoteTitle: "Discuss. Diligence. Negotiate. Close. Grow.",
      heroNoteDescription:
        "Coordinate communication, documentation, decisions and execution across the investment lifecycle.",
      introHeading:
        "A Coordinated Framework for Investment Discussions & Transaction Completion",
      benefitCards: true,
      benefitCardsStacked: true,
      introPanelEyebrow: "INVESTOR COORDINATION",
      introPanelHeading: "Clear communication. Organised execution.",
      introPanelDescription:
        "Bring investors, founders, management and advisors together around transparent information and agreed transaction milestones.",
      servicesHeading: "Our Investor Coordination Services",
      servicesDescription:
        "Coordinate each stakeholder and workstream from the first investor discussion through closing and post-investment support.",
      benefitsHeading: "When Is Investor Coordination Required?",
      benefits: [
        ["people", "Managing investor discussions and information requests", "Keep conversations, responses and follow-up organised across the investment process."],
        ["document", "Preparing and organising due diligence documents", "Coordinate diligence materials and maintain a clear record of shared information."],
        ["network", "Coordinating multiple stakeholders and advisors", "Align founders, investors, management teams and professional advisors around agreed actions."],
        ["calendar", "Tracking transaction milestones and approvals", "Maintain visibility of decisions, dependencies and upcoming transaction dates."],
        ["handshake", "Supporting term sheets and investment agreements", "Coordinate review and negotiation workstreams with the relevant business and legal advisors."],
        ["shield", "Supporting regulatory and closing requirements", "Track relevant approvals, compliance actions and closing deliverables."],
        ["globe", "Handling cross-border investor coordination", "Organise communication and information flow across international stakeholders."],
        ["chart", "Managing post-investment governance and reporting", "Support ongoing information, governance and reporting coordination after completion."],
      ],
      services: [
        ["people", "Investor Communication & Coordination", "Manage communications and information flow between investors, founders, management and advisors."],
        ["calendar", "Transaction Planning & Tracking", "Plan transaction workstreams, responsibilities, dependencies and milestones."],
        ["document", "Documentation & Data-Room Support", "Organise transaction records, investor materials and controlled data-room workflows."],
        ["search", "Due Diligence Coordination", "Track diligence questions, supporting evidence, responses and outstanding requests."],
        ["handshake", "Term Sheet & Agreement Coordination", "Coordinate review, negotiation and documentation with the relevant professional teams."],
        ["network", "Stakeholder Management", "Keep decision-makers and transaction participants aligned on actions and status."],
        ["shield", "Closing & Compliance Support", "Track closing deliverables, approvals and relevant compliance workstreams."],
        ["chart", "Post-Investment Coordination", "Support post-close governance, reporting, information rights and follow-up."],
      ],
      structureHeading: "Key Investor Coordination Areas",
      structurePoints: [
        ["people", "Stakeholder communication protocols", "Set clear responsibilities and channels for investor, founder, management and advisor communication."],
        ["document", "Documentation and data-room management", "Organise information, access, versions and responses throughout the transaction."],
        ["search", "Due diligence request coordination", "Track requests, owners, deadlines and supporting documents in a coordinated workflow."],
        ["handshake", "Term sheet and agreement negotiations", "Coordinate commercial, legal and decision-making inputs as terms develop."],
        ["calendar", "Approvals, closing and compliance tracking", "Maintain a view of required decisions, conditions, approvals and closing actions."],
        ["shield", "Post-investment governance support", "Coordinate reporting, governance actions and agreed investor follow-up after closing."],
      ],
      comparisonHeading: "Investor Coordination Across the Transaction Lifecycle",
      comparisonDescription:
        "A practical view of the workstreams that may need coordination at each stage. The scope depends on the transaction, participants and applicable requirements.",
      comparisonHeaders: [
        "Prepare",
        "Coordinate",
        "Diligence",
        "Negotiate",
        "Close",
        "Grow",
      ],
      comparison: [
        ["Primary focus", "Define the investment process and readiness", "Align stakeholders, owners and milestones", "Manage requests and information exchange", "Coordinate term discussions and documentation", "Track conditions, approvals and deliverables", "Support governance and reporting coordination"],
        ["Typical work", "Investor materials and process planning", "Communication and meeting follow-up", "Data-room and diligence tracking", "Term sheets and agreement workflow", "Closing checklist and completion status", "Post-investment information and actions"],
        ["Key participants", "Founders and management", "Investors, founders and advisors", "Investor and company diligence teams", "Business, legal and financial advisors", "Transaction parties and relevant advisors", "Company teams and investors"],
        ["Coordination outcome", "Clear scope and prepared information", "Shared understanding of next steps", "Organised and traceable responses", "Documented positions and open decisions", "Visible completion responsibilities", "Structured post-close follow-through"],
      ],
      processEyebrow: "OUR INVESTOR COORDINATION PROCESS",
      processHeading: "A Clear Path from Consultation to Post-Investment Support",
      processDescription:
        "Coordinate communications, documentation and decisions at each stage of the investment transaction.",
      process: [
        ["Initial Consultation", "Understand investment objectives, transaction scope, key participants and current stage."],
        ["Stakeholder Mapping", "Identify investors, founders, management, advisors, decision-makers and communication owners."],
        ["Documentation & Due Diligence", "Organise transaction information, diligence requests, responses and document tracking."],
        ["Negotiation Support", "Coordinate discussions, open points, approvals and documentation workstreams."],
        ["Closing Coordination", "Track closing conditions, agreed actions, required approvals and completion deliverables."],
        ["Post-Investment Support", "Coordinate post-close governance, reporting and continuing stakeholder communication."],
      ],
      processNumbers: true,
      documentsHeading: "Documents Generally Required",
      documentsDescription:
        "The documents required depend on the investment structure, transaction stage, sector and diligence scope.",
      documents: [
        "Corporate, constitutional and financial records",
        "Shareholding, capitalisation and beneficial ownership details",
        "Material commercial contracts, licences and agreements",
        "Due diligence records and supporting business information",
        "Regulatory filings, approvals and compliance records",
        "Investor proposals, term sheets and draft transaction documents",
      ],
      requirementsEyebrow: "TRANSACTION READINESS",
      requirementsHeading: "Information to get started",
      requirements: [
        ["target", "Investment objectives", "The funding or strategic goals, expected transaction scope and current stage."],
        ["people", "Stakeholder details", "The investors, founders, management and advisors involved in the process."],
        ["file", "Available information", "Relevant corporate, financial, commercial and compliance records."],
        ["calendar", "Transaction status", "Current discussions, open requests, decisions and important dates."],
        ["shield", "Known requirements", "Any identified diligence, approval, confidentiality or closing considerations."],
      ],
      basicPrice: "By scope",
      comprehensivePrice: "Tailored",
      pricingEyebrow: "INVESTOR COORDINATION SUPPORT",
      pricingHeading: "A scope aligned to your transaction",
      pricingDescription:
        "Engagement scope depends on the transaction stage, stakeholder group, diligence requirements and level of coordination needed.",
      basicPackageEyebrow: "FOUNDATION",
      basicPackageName: "Coordination Essentials",
      basicFeatures: [
        "Initial transaction and stakeholder assessment",
        "Communication and action tracking",
        "Document and information request coordination",
        "Milestone and next-step overview",
      ],
      comprehensivePackageEyebrow: "END-TO-END WORKSTREAM",
      comprehensivePackageName: "Transaction Coordination",
      comprehensiveFeatures: [
        "All Coordination Essentials support",
        "Due diligence and data-room coordination",
        "Negotiation and documentation workflow tracking",
        "Closing deliverables and approval coordination",
        "Post-investment governance and reporting follow-up",
      ],
      priceNote: null,
      featureHeading: "Key Laws, Regulations & Considerations",
      featureItems: [
        "Companies Act, 2013",
        "FEMA, FDI & FPI Policy",
        "SEBI Regulations",
        "MSME Act, 2006",
        "Income-tax Act, 1961",
        "GST laws",
        "Insolvency and Bankruptcy Code, 2016",
        "Competition Act, 2002",
        "Sector-specific regulations",
      ],
      customHeading: "Cross-Border & Complex Transactions",
      customDescription:
        "Add coordination for multi-investor processes, cross-border stakeholders, sector-specific approvals or complex governance and reporting workstreams.",
      finalHeading:
        "Coordinate Your Next Investment Transaction with Confidence",
      finalDescription:
        "Work with our team to organise investor communication, due diligence and transaction execution with a clear, accountable process.",
      finalAction: "Request a Consultation",
      faqDescription:
        "Answers to common questions about investor coordination and investment transaction support.",
      faqs: [
        ["What is investor coordination?", "Investor coordination is the organised management of communications, information requests, diligence, transaction milestones and stakeholder follow-up during an investment process."],
        ["How is investor coordination different from fundraising advisory?", "Fundraising advisory may cover capital strategy, investor targeting and fundraising readiness. Investor coordination focuses on keeping the communication, documentation and transaction workstreams organised. The exact scope can be agreed for each engagement."],
        ["Does investor coordination guarantee funding?", "No. Coordination can support a clearer and more organised process, but investment decisions remain with the prospective investors and funding cannot be guaranteed."],
        ["Can Astronis introduce investors?", "Any investor introductions depend on the agreed scope and suitability of the opportunity. An introduction does not imply investor interest, due diligence approval or a funding commitment."],
        ["What documents are required?", "Requirements vary, but may include corporate and financial records, shareholding details, material contracts, compliance information, investor proposals and transaction documents."],
        ["Can you coordinate cross-border investment discussions?", "Coordination can include international stakeholders. Applicable foreign investment, exchange control, tax and sector requirements should be assessed for the specific transaction."],
      ],
      relatedPages: [
        ["Start-Up/MSME Investment Advisory", "/services/business-advisory-contracts#investment-and-transaction-advisory"],
        ["Investment Transactions", "/services/corporate-commercial-advisory/investment-transactions"],
        ["India Entry Strategy", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/india-entry-strategy"],
      ],
      showTestimonials: true,
      showInsights: true,
      showKnowledge: true,
      showReviewActions: false,
      showFeatures: true,
    }
  : undefined;

export default function InvestorCoordinationPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}