import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const data = transactionGovernancePages.find((page) => page.slug === "mergers-acquisitions");

export const metadata: Metadata = {
  title: "Mergers & Acquisitions | Astronis Global",
  description: "Strategic M&A advice covering transaction planning, diligence, structuring and execution support.",
  alternates: { canonical: "/services/corporate-commercial-advisory/mergers-acquisitions" },
};

export default function MergersAcquisitionsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
