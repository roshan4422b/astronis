import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "ibc-strategy-and-advisory");

export const metadata: Metadata = {
  title: "IBC Strategy & Advisory | Astronis Global",
  description: "IBC advisory for insolvency strategy, creditor protection, CIRP, NCLT proceedings and resolution planning.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/ibc-strategy-and-advisory",
  },
};

export default function IbcStrategyAndAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
