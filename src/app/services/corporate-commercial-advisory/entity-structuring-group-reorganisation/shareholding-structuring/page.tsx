import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessStructuringPages } from "@/data/business-structuring-pages";

const data = businessStructuringPages.find((page) => page.slug === "shareholding-structuring");

export const metadata: Metadata = {
  title: "Shareholding Structuring | Astronis Global",
  description: "Plan shareholding, investment, control and governance arrangements with corporate and regulatory support.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/shareholding-structuring" },
};

export default function ShareholdingStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
