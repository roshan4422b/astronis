import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessStructuringPages } from "@/data/business-structuring-pages";

const data = businessStructuringPages.find((page) => page.slug === "holding-subsidiary-structures");

export const metadata: Metadata = {
  title: "Holding & Subsidiary Structures | Astronis Global",
  description: "Plan holding and subsidiary structures in India and across jurisdictions with coordinated corporate, tax and regulatory support.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/holding-subsidiary-structures" },
};

export default function HoldingSubsidiaryStructuresPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
