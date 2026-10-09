import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "corporate-due-diligence");

export const metadata: Metadata = {
  title: "Corporate Due Diligence | Astronis Global",
  description: "Corporate due diligence review of ownership, governance, compliance and transaction continuity issues.",
  alternates: { canonical: "/services/corporate-commercial-advisory/corporate-due-diligence" },
};

export default function CorporateDueDiligencePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
