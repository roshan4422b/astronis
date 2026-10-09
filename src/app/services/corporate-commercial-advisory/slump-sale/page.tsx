import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const data = contractAndRestructuringPages.find((page) => page.slug === "slump-sale");

export const metadata: Metadata = {
  title: "Slump Sale | Astronis Global",
  description: "Advisory for slump sale transactions, business transfer structuring and continuity planning.",
  alternates: { canonical: "/services/corporate-commercial-advisory/slump-sale" },
};

export default function SlumpSalePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
