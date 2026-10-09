import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessStructuringPages } from "@/data/business-structuring-pages";

const data = businessStructuringPages.find((page) => page.slug === "capital-structuring");

export const metadata: Metadata = {
  title: "Capital Structuring Advisory | Astronis Global",
  description: "Assess equity, debt and hybrid funding structures against capital needs, governance and regulatory requirements.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/capital-structuring" },
};

export default function CapitalStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
