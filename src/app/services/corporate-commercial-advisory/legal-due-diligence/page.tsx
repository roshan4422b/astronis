import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "legal-due-diligence");

export const metadata: Metadata = {
  title: "Legal Due Diligence | Astronis Global",
  description: "Legal due diligence covering contracts, ownership, compliance, regulatory matters and transaction exposure.",
  alternates: { canonical: "/services/corporate-commercial-advisory/legal-due-diligence" },
};

export default function LegalDueDiligencePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
