import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "shareholder-matters");

export const metadata: Metadata = {
  title: "Shareholder Matters | Astronis Global",
  description: "Shareholder governance, rights, dispute resolution and strategic relationship support for complex ownership structures.",
  alternates: { canonical: "/services/corporate-commercial-advisory/shareholder-matters" },
};

export default function ShareholderMattersPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
