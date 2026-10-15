import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const corporateDueDiligence = transactionGovernancePages.find(
  (page) => page.slug === "corporate-due-diligence",
);

const data: EntityFormationPageData | undefined = corporateDueDiligence
  ? {
      ...corporateDueDiligence,
      slug: "commercial-due-diligence",
      title: "Commercial Due Diligence",
      shortTitle: "Commercial Due Diligence",
      image: "/images/services/hero.webp",
      imageAlt:
        "Business professionals reviewing commercial and transaction information",
      heroStatement:
        "Investigating commercial risks. Validating business relationships. Supporting informed transactions.",
      description:
        "Astronis Global provides integrated commercial due diligence advisory to help investors, acquirers and businesses evaluate contracts, customers, suppliers, operations and key risks before making strategic investment or acquisition decisions.",
      introduction:
        "Commercial due diligence examines how a business creates value, serves customers and depends on key relationships and operating capabilities. A focused review can help investors and acquirers test transaction assumptions, understand exposure and make better-informed decisions.",
      categoryTitle: "Investment & Transaction Advisory",
      categoryHref:
        "/services/business-advisory-contracts#investment-and-transaction-advisory",
      heroEyebrow:
        "CORPORATE & COMMERCIAL ADVISORY · INVESTMENT & TRANSACTION ADVISORY",
      heroNoteEyebrow: "COMMERCIAL DUE DILIGENCE",
      heroNoteTitle: "Assess. Analyse. Validate. Mitigate. Decide.",
      heroNoteDescription:
        "Bring commercial relationships, operating risks and transaction assumptions into focus.",
      introHeading:
        "Examining the Commercial Foundations of a Proposed Business Transaction",
      benefitCards: true,
      benefitCardsStacked: true,
      introPanelEyebrow: "COMMERCIAL REVIEW",
      introPanelHeading: "Practical insight. Informed decisions.",
      introPanelDescription:
        "Understand the contracts, customers, suppliers and operating dependencies that can shape transaction value and execution.",
      servicesHeading: "Our Commercial Due Diligence Services",
      servicesDescription:
        "Assess the commercial arrangements, operational dependencies and risk factors relevant to your proposed investment or transaction.",
      benefitsHeading: "When Is Commercial Due Diligence Required?",
      benefits: [
        ["chart", "Evaluating an investment or acquisition", "Test key commercial assumptions and identify issues that may influence transaction value or terms."],
        ["network", "Assessing customer and supplier dependencies", "Understand concentration, continuity and reliance on key commercial relationships."],
        ["document", "Reviewing material contracts and commitments", "Identify important obligations, renewal terms, restrictions and change-of-control considerations."],
        ["search", "Evaluating the business model and revenue sustainability", "Review how the business generates revenue and the factors that may affect its resilience."],
        ["shield", "Identifying operational and regulatory risks", "Bring material operating dependencies and relevant compliance considerations into view."],
        ["handshake", "Negotiating transaction terms and protections", "Use diligence findings to inform commercial discussions, risk allocation and follow-up."],
        ["calendar", "Preparing for post-close integration", "Identify continuity, transition and implementation matters to address after completion."],
        ["target", "Making informed investment decisions", "Give stakeholders a clearer basis for evaluating opportunities, uncertainties and next steps."],
      ],
      services: [
        ["document", "Contractual Due Diligence", "Review key commercial agreements, obligations, renewals, restrictions and termination provisions."],
        ["people", "Customer & Revenue Analysis", "Assess customer concentration, revenue dependencies and the commercial basis of key relationships."],
        ["building", "Supplier & Supply Chain Review", "Examine supplier dependencies, continuity risks, procurement arrangements and alternatives."],
        ["chart", "Business Model Assessment", "Evaluate the commercial model, revenue drivers, market assumptions and operating dependencies."],
        ["shield", "Commercial Risk Assessment", "Identify material commercial, operational and transaction risks for further review."],
        ["percent", "Regulatory & Licensing Review", "Map relevant licences, permits and regulatory dependencies to the proposed business activities."],
        ["search", "Due Diligence Reporting", "Present findings, key issues and practical follow-up in a structured report."],
        ["calendar", "Transaction Protection Advisory", "Help connect diligence observations to negotiation priorities, conditions and post-close actions."],
      ],
      structureHeading: "Key Due Diligence Areas",
      structurePoints: [
        ["document", "Commercial contracts and obligations", "Review material customer, supplier, distribution, technology and other business agreements."],
        ["people", "Customer and supplier relationships", "Assess concentration, dependency, renewal and continuity factors across key counterparties."],
        ["chart", "Business model and revenue sustainability", "Consider the revenue model, commercial assumptions, performance drivers and resilience."],
        ["search", "Operational and market risk assessment", "Identify operational dependencies and market-related risks relevant to the transaction."],
        ["shield", "Regulatory and licensing considerations", "Review relevant permissions and obligations in context with the activities being assessed."],
        ["handshake", "Transaction protections and risk allocation", "Highlight findings that may warrant negotiation, additional diligence or implementation planning."],
      ],
      comparisonHeading: "Commercial Due Diligence Review Areas",
      comparisonDescription:
        "A practical framework for examining commercial risks and dependencies. The exact scope is tailored to the business, sector and transaction.",
      comparisonHeaders: [
        "Contracts",
        "Customers",
        "Suppliers",
        "Business Model",
        "Operations",
      ],
      comparison: [
        ["Review focus", "Material terms and obligations", "Revenue and relationship profile", "Supply and vendor dependencies", "Revenue drivers and assumptions", "Processes and operating dependencies"],
        ["Typical questions", "What rights, restrictions and commitments apply?", "How concentrated and sustainable are key relationships?", "Are there single-source or continuity risks?", "What assumptions support the commercial case?", "What could affect continuity after completion?"],
        ["Potential issue", "Change-of-control or termination exposure", "Customer concentration or churn risk", "Supplier disruption or limited alternatives", "Revenue volatility or unsupported assumptions", "Integration, capacity or service continuity gaps"],
        ["Transaction relevance", "Contract consent and risk allocation", "Value and forecast assessment", "Continuity planning and mitigation", "Investment thesis and valuation context", "Closing readiness and post-close planning"],
      ],
      processEyebrow: "OUR DUE DILIGENCE PROCESS",
      processHeading: "A Structured Review from Scope to Recommendations",
      processDescription:
        "A focused process that connects the available information to practical transaction decisions and actions.",
      process: [
        ["Initial Consultation", "Understand the transaction, business context, key questions and decision timeline."],
        ["Scope & Planning", "Set review priorities, information requirements, stakeholders and work plan."],
        ["Document Review", "Review relevant commercial agreements, business information and available records."],
        ["Risk Assessment", "Evaluate key dependencies, obligations, assumptions and issues requiring attention."],
        ["Reporting & Recommendations", "Present prioritised findings and practical questions, mitigations or follow-up actions."],
        ["Transaction & Post-Close Support", "Support diligence follow-up, transaction discussions and relevant post-close planning."],
      ],
      processNumbers: true,
      documentsHeading: "Documents Generally Required",
      documentsDescription:
        "The requested information depends on the business and transaction scope. The review may begin with the following records:",
      documents: [
        "Corporate overview, business plan and financial projections",
        "Customer, supplier and other material commercial agreements",
        "Sales, revenue, customer and product information",
        "Supplier, procurement and supply-chain records",
        "Material licences, permits and regulatory correspondence",
        "Operational, performance and risk information relevant to the business",
        "Existing diligence materials and transaction assumptions",
        "Known disputes, customer concerns or operational issues",
      ],
      requirementsEyebrow: "DUE DILIGENCE READINESS",
      requirementsHeading: "Information to define the review",
      requirements: [
        ["target", "Transaction context", "The proposed investment or acquisition, strategic rationale and key decision dates."],
        ["people", "Business stakeholders", "Relevant management, commercial, finance, operations and advisory contacts."],
        ["file", "Available information", "The contracts, customer and supplier data, business records and materials ready for review."],
        ["shield", "Priority questions", "Known commercial concerns, assumptions or dependencies to assess."],
        ["calendar", "Review timeline", "The required reporting date, diligence milestones and transaction timetable."],
      ],
      basicPrice: "By scope",
      comprehensivePrice: "Tailored",
      pricingEyebrow: "COMMERCIAL DUE DILIGENCE",
      pricingHeading: "A review tailored to your transaction",
      pricingDescription:
        "Scope depends on the business, sector, transaction timeline, available information and depth of review required.",
      basicPackageEyebrow: "FOCUSED REVIEW",
      basicPackageName: "Commercial Risk Assessment",
      basicFeatures: [
        "Initial transaction and scope assessment",
        "Prioritised commercial information review",
        "Identification of key dependencies and issues",
        "Summary of findings and recommended follow-up",
      ],
      comprehensivePackageEyebrow: "EXTENDED REVIEW",
      comprehensivePackageName: "Commercial Due Diligence Support",
      comprehensiveFeatures: [
        "All focused review services",
        "Broader customer, supplier and contract review",
        "Business model and operational risk assessment",
        "Detailed findings and transaction considerations",
        "Diligence follow-up and post-close planning support",
      ],
      priceNote: null,
      featureHeading: "Key Laws, Regulations & Considerations",
      featureItems: [
        "Companies Act, 2013",
        "SEBI Regulations",
        "FEMA and FDI Policy",
        "Competition Act, 2002",
        "MSME Act, 2006",
        "Income-tax Act, 1961",
        "GST laws",
        "Insolvency and Bankruptcy Code, 2016",
        "Sector-specific regulations",
      ],
      resources: [
        ["GUIDE", "Commercial Due Diligence Fundamentals", "document"],
        ["CHECKLIST", "Customer & Supplier Review Checklist", "file"],
        ["FRAMEWORK", "Business Model & Operational Risk Review", "search"],
        ["TOOLKIT", "Diligence Findings & Transaction Protections", "shield"],
      ],
      faqDescription:
        "Answers to common questions about commercial due diligence for investments and business transactions.",
      faqs: [
        ["What is commercial due diligence?", "Commercial due diligence is a focused assessment of a business's commercial position, key relationships, revenue model, operating dependencies and transaction assumptions."],
        ["How is commercial due diligence different from legal due diligence?", "Commercial due diligence focuses on business performance, customer and supplier relationships, commercial contracts and operating risks. Legal due diligence examines legal rights, obligations, compliance and potential legal exposure. The scopes can be coordinated where appropriate."],
        ["When should commercial due diligence be conducted?", "It is commonly considered before an investment, acquisition or other strategic transaction so stakeholders can test assumptions and identify material commercial issues before making decisions."],
        ["How long does a commercial due diligence review take?", "Timing depends on the review scope, business complexity, information readiness and transaction timetable. A proposed work plan can be agreed after an initial scoping discussion."],
        ["What information is needed to begin?", "The initial information may include an overview of the business, key commercial agreements, customer and supplier information, revenue materials, operating records and the main transaction questions."],
        ["Does a due diligence review guarantee that all risks will be identified?", "No. Findings depend on the agreed scope, information made available and review limitations. The work supports informed assessment but cannot guarantee the identification of every risk or future outcome."],
        ["Can you assist after the report is delivered?", "Follow-up support can be agreed for transaction discussions, further diligence questions, mitigation planning and relevant post-close actions."],
      ],
      customHeading: "Transaction-Specific Review",
      customDescription:
        "Add focused support for complex customer or supplier dependencies, cross-border operations, sector-specific requirements, integration planning or transaction follow-up.",
      finalHeading: "Make Informed Decisions with Commercial Due Diligence",
      finalDescription:
        "Discuss your transaction and the commercial questions that matter to your investment or acquisition decision.",
      finalAction: "Request a Due Diligence Consultation",
      relatedPages: [
        ["Investor Coordination", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investor-coordination"],
        ["India Entry Strategy", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/india-entry-strategy"],
        ["Investment Transactions", "/services/corporate-commercial-advisory/investment-transactions"],
      ],
      showTestimonials: false,
      showInsights: true,
      showKnowledge: true,
      showReviewActions: false,
      showFeatures: true,
    }
  : undefined;

export default function CommercialDueDiligencePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}