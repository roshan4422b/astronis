import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const data = contractAndRestructuringPages.find((page) => page.slug === "corporate-exit-plan");

export const metadata: Metadata = {
  title: "Corporate Exit Plan | Astronis Global",
  description: "Corporate exit planning support covering strategy, continuity, stakeholder review and transition execution.",
  alternates: { canonical: "/services/corporate-commercial-advisory/corporate-exit-plan" },
};

export default function CorporateExitPlanPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
