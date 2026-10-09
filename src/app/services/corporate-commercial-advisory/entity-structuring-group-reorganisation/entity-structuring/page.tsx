import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessStructuringPages } from "@/data/business-structuring-pages";

const data = businessStructuringPages.find((page) => page.slug === "entity-structuring");

export const metadata: Metadata = {
  title: "Business Entity Structuring | Astronis Global",
  description: "Design and implement a business entity structure aligned with commercial goals, tax considerations and regulatory requirements.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/entity-structuring" },
};

export default function BusinessEntityStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
