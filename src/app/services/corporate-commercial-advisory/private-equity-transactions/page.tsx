import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "private-equity-transactions");

export const metadata: Metadata = {
  title: "Private Equity Transactions | Astronis Global",
  description: "Advisory support for private equity investments, buyouts, exits and portfolio governance matters.",
  alternates: { canonical: "/services/corporate-commercial-advisory/private-equity-transactions" },
};

export default function PrivateEquityTransactionsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
