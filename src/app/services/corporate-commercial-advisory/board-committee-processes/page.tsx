import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "board-committee-processes");

export const metadata: Metadata = {
  title: "Board & Committee Processes | Astronis Global",
  description: "Governance framework support for board operations, committee charters, process design and stakeholder alignment.",
  alternates: { canonical: "/services/corporate-commercial-advisory/board-committee-processes" },
};

export default function BoardCommitteeProcessesPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
