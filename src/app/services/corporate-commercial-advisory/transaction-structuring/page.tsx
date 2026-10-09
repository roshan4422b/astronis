import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "transaction-structuring");

export const metadata: Metadata = {
  title: "Transaction Structuring | Astronis Global",
  description: "Deal structuring advice aligned to tax, control, governance and transaction execution objectives.",
  alternates: { canonical: "/services/corporate-commercial-advisory/transaction-structuring" },
};

export default function TransactionStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
