import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const base = transactionGovernancePages.find((page) => page.slug === "board-committee-processes");
const data = base
  ? {
      ...base,
      slug: "governance-framework-corporate-policies",
      title: "Governance Framework & Corporate Policies",
      shortTitle: "Governance",
      heroStatement: "Practical governance. Clear accountability.",
      description:
        "We help businesses build governance frameworks and implement corporate policies that clarify decision-making, responsibilities and compliance expectations.",
      introduction:
        "A strong governance framework helps directors, management and stakeholders work with clarity and consistency. The right corporate policies align obligations, approvals and operating discipline with the business’s actual structure and decision pathways.",
      heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · CORPORATE GOVERNANCE",
      categoryTitle: "Corporate Governance",
      categoryHref: "/services/corporate-commercial-advisory",
    }
  : undefined;

export const metadata: Metadata = {
  title: "Governance Framework & Corporate Policies | Astronis Global",
  description: "Corporate governance and policy advisory covering board processes, authority, accountability and practical compliance frameworks.",
  alternates: { canonical: "/services/corporate-commercial-advisory/governance-framework-corporate-policies" },
};

export default function GovernanceFrameworkCorporatePoliciesPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
