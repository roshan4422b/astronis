import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const base = transactionGovernancePages.find((page) => page.slug === "board-committee-processes");
const data = base
  ? {
      ...base,
      slug: "governance-due-diligence-review",
      title: "Governance Due Diligence & Review",
      shortTitle: "Governance Review",
      heroStatement: "Review governance before risk becomes a constraint.",
      description:
        "We conduct governance reviews to assess board practices, committee arrangements, process discipline and the adequacy of existing control frameworks.",
      introduction:
        "Governance review is not only a compliance exercise; it is a practical check on whether the company’s current structures support sound decision-making and accountability. A structured review can surface gaps before they become operational, legal or reputational risk.",
      heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · GOVERNANCE REVIEW",
      categoryTitle: "Corporate Governance",
      categoryHref: "/services/corporate-commercial-advisory",
    }
  : undefined;

export const metadata: Metadata = {
  title: "Governance Due Diligence & Review | Astronis Global",
  description: "Governance due diligence and review support for boards, committees, policies and decision-making practices.",
  alternates: { canonical: "/services/corporate-commercial-advisory/governance-due-diligence-review" },
};

export default function GovernanceDueDiligenceReviewPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
