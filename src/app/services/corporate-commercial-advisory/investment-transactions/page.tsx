import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "investment-transactions");

export const metadata: Metadata = {
  title: "Investment Transactions | Astronis Global",
  description: "Investment transaction support covering diligence, documentation and strategic execution for investors and companies.",
  alternates: { canonical: "/services/corporate-commercial-advisory/investment-transactions" },
};

export default function InvestmentTransactionsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
