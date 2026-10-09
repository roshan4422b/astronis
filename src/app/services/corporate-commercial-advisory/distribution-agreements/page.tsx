import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { commercialContractPages } from "@/data/commercial-contract-pages";

const data = commercialContractPages.find((page) => page.slug === "distribution-agreements");

export const metadata: Metadata = {
  title: "Distribution Agreements | Astronis Global",
  description: "Distribution agreement support for channel structuring, territory control and market expansion.",
  alternates: { canonical: "/services/corporate-commercial-advisory/distribution-agreements" },
};

export default function DistributionAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
