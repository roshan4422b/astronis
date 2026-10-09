import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const base = contractAndRestructuringPages.find((page) => page.slug === "contract-management");
const data = base
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
      categoryTitle: "Commercial Contracts",
      categoryHref: "/services/corporate-commercial-advisory",
    }
  : undefined;

export const metadata: Metadata = {
  title: "Contract Drafting, Review & Negotiations | Astronis Global",
  description: "Commercial contract drafting, review and negotiation support for businesses and strategic partnerships.",
  alternates: { canonical: "/services/corporate-commercial-advisory/contract-drafting-review-negotiations" },
};

export default function ContractDraftingReviewNegotiationsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
