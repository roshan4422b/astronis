import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const base = contractAndRestructuringPages.find((page) => page.slug === "contract-management");
export const contractDraftingPageData: EntityFormationPageData | undefined = base
  ? {
      ...base,
      slug: "contract-drafting-review-negotiations",
      title: "Contract Drafting, Review & Negotiations",
      shortTitle: "Contracts",
      heroStatement: "Well-drafted contracts. Better commercial outcomes.",
      description:
        "We support businesses with contract drafting, review and negotiation to protect commercial intent while keeping operational and legal risks properly balanced.",
      introduction:
        "A well-structured contract is not only a legal document; it is the practical framework for how parties will work together. We help shape terms that reflect commercial realities, mitigate risk and strengthen the enforceability of agreed positions.",
      heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · COMMERCIAL CONTRACTS",
      heroNoteEyebrow: "COMMERCIAL CONTRACTS",
      heroNoteTitle: "Clear terms. Stronger relationships.",
      heroNoteDescription: "Practical drafting, review and negotiation support from brief to execution.",
      categoryTitle: "Commercial Contracts",
      categoryHref: "/services/business-advisory-contracts#commercial-contracts",
      servicesHeading: "Our services in contract drafting, review & negotiations",
      servicesDescription:
        "Practical contract support from the first commercial discussion through negotiation, signing and ongoing performance.",
      benefitsHeading: "Key benefits for your business",
      basicPrice: "₹9,999/- Onwards",
      comprehensivePrice: "Customised",
      pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
      pricingHeading: "Contract advisory aligned to scope and complexity",
      pricingDescription:
        "Fees vary by agreement type, document length, number of parties, negotiation requirements and urgency.",
      basicPackageEyebrow: "CORE REVIEW",
      basicPackageName: "Standard Contract Review",
      comprehensivePackageEyebrow: "CUSTOM SCOPE",
      comprehensivePackageName: "Complex / Multi-Party Contracts",
      basicFeatures: [
        "Initial agreement review",
        "Key risk and clause assessment",
        "Recommended revisions and next steps",
      ],
      comprehensiveFeatures: [
        "Tailored drafting and negotiation",
        "Connected agreement and diligence review",
        "Execution and implementation support",
      ],
      finalHeading: "Stronger contracts. Better business relationships.",
      finalDescription:
        "Get practical support to turn commercial intent into clear, balanced and workable agreements.",
      finalAction: "Schedule a Contract Consultation",
      requirementsEyebrow: "CONTRACT REVIEW",
      requirementsHeading: "Key precautions before signing",
      comparisonHeading: "Contract drafting vs review vs negotiation",
      comparisonDescription:
        "Choose the right support for the stage of your commercial agreement.",
      comparisonHeaders: ["Contract Drafting", "Contract Review", "Contract Negotiation"],
      comparisonFocusIndex: 2,
      benefits: [
        ["document", "Clarity of terms and obligations", "Make each party's responsibilities, deliverables and expectations easier to understand."],
        ["shield", "Reduced legal and commercial risk", "Identify and address avoidable exposure before it affects the business relationship."],
        ["people", "Stronger negotiation position", "Prepare a clear and consistent position on the terms that matter to your business."],
        ["calendar", "Cost and time efficiency", "Resolve issues early and reduce avoidable delays during implementation."],
        ["file", "Regulatory compliance", "Consider applicable legal, regulatory and sector-specific requirements."],
        ["shield", "Protection of intellectual property", "Address ownership, permitted use and confidentiality where relevant."],
      ],
      services: [
        ["document", "Contract Drafting", "Prepare an agreement around the agreed commercial model, responsibilities and protections."],
        ["search", "Contract Review & Redrafting", "Review proposed or existing terms, identify risk and recommend clear revisions."],
        ["people", "Negotiation Support", "Help prioritise open issues and communicate practical contract positions."],
        ["file", "Term Sheets & Memoranda of Understanding", "Document principal commercial terms and clarify which provisions are intended to bind."],
        ["building", "Commercial Agreements", "Support customer, vendor, services, outsourcing and other business arrangements."],
        ["shield", "Confidentiality & Intellectual Property", "Address confidential information, ownership, licensing and permitted use."],
      ],
      structurePoints: [
        ["document", "Indian Contract Act, 1872", "Contract formation and enforceability depend on the agreement, parties and applicable law."],
        ["scale", "Specific Relief Act, 1963", "Remedies and specific enforcement depend on the terms and circumstances."],
        ["shield", "Information and intellectual property laws", "Privacy, confidentiality and IP requirements may apply to the subject matter."],
        ["globe", "Stamp duty and sector-specific requirements", "Applicable formalities and regulatory rules depend on the document and transaction."],
      ],
      comparison: [
        ["Purpose", "Prepare a new contract for the business objective", "Identify risks and gaps in an existing draft", "Reach mutually agreed commercial and legal terms"],
        ["Key focus", "Structure, scope and risk allocation", "Risk identification, clarity and compliance", "Resolve open issues and balance positions"],
        ["When required", "Before entering into a new arrangement", "Before signing a counterparty draft", "During discussions and document revisions"],
        ["Typical outcome", "A tailored draft agreement", "An issue list and proposed revisions", "Agreed terms ready for finalisation"],
        ["Indicative timing", "Depends on scope and complexity", "Depends on document length and complexity", "Depends on the number of open issues and parties"],
      ],
      process: [
        ["Understand the business objective", "Clarify the parties, transaction scope and intended commercial outcome."],
        ["Review background and documents", "Examine proposals, prior drafts, policies and relevant business context."],
        ["Draft or review key clauses", "Address scope, payment, performance, liability, confidentiality and exit."],
        ["Prepare negotiation positions", "Prioritise material issues and develop practical proposed wording."],
        ["Finalise terms and approvals", "Resolve revisions and coordinate required internal authorisations."],
        ["Execute and maintain records", "Complete signing formalities and keep the final agreement and related records."],
      ],
      documents: [
        "Business proposal, term sheet or transaction summary",
        "Draft agreement and counterparty comments, if available",
        "Scope, deliverables, pricing and payment assumptions",
        "Relevant prior contracts, policies and operating procedures",
        "Internal approval and authorised signatory details",
        "Applicable licences, technical schedules or compliance requirements",
      ],
      requirements: [
        ["file", "Clear scope", "Define services, deliverables, milestones and acceptance criteria."],
        ["people", "Party authority", "Confirm the correct legal entities and authorised signatories."],
        ["shield", "Risk allocation", "Review liability, indemnity, warranties, confidentiality and remedies."],
        ["calendar", "Performance and exit", "Address timelines, changes, renewal, termination and transition."],
        ["scale", "Legal formalities", "Check applicable stamping, registration and sector-specific requirements."],
      ],
      faqs: [
        ["What is the difference between contract drafting, review and negotiation?", "Drafting creates the agreement, review assesses a proposed document for gaps and risk, and negotiation helps the parties resolve differences in their terms."],
        ["How long does it take to draft or review a contract?", "Timing depends on the document, complexity, information available and how quickly the parties resolve open issues."],
        ["What documents are required to draft a commercial contract?", "A proposal or term sheet, party details, scope, pricing, delivery expectations and relevant approval requirements are useful starting points."],
        ["Can you negotiate a contract on our behalf?", "Negotiation support can include issue prioritisation, proposed wording and coordination with the counterparty, subject to the agreed scope."],
        ["Do you provide industry-specific contract templates?", "Templates can be tailored to the business model and industry, but should be reviewed against the specific transaction and current requirements."],
      ],
    }
  : undefined;

export const metadata: Metadata = {
  title: "Contract Drafting, Review & Negotiations | Astronis Global",
  description: "Commercial contract drafting, review and negotiation support for businesses and strategic partnerships.",
  alternates: { canonical: "/services/corporate-commercial-advisory/contract-drafting-review-negotiations" },
};

export default function ContractDraftingReviewNegotiationsPage() {
  if (!contractDraftingPageData) notFound();
  return <EntityFormationPage data={contractDraftingPageData} />;
}
