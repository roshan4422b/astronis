import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const data = contractAndRestructuringPages.find((page) => page.slug === "franchise-agreements");

export const metadata: Metadata = {
  title: "Franchise Agreements | Astronis Global",
  description: "Franchise agreement drafting, review and expansion support for growth-oriented business models.",
  alternates: { canonical: "/services/corporate-commercial-advisory/franchise-agreements" },
};

export default function FranchiseAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
