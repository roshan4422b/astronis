import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "debt-and-restructuring-advisory");

export const metadata: Metadata = {
  title: "Debt & Restructuring Advisory | Astronis Global",
  description: "Advisory for debt restructuring, creditor negotiations, stressed assets, refinancing, security restructuring and resolution strategy.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/debt-and-restructuring-advisory",
  },
};

export default function DebtAndRestructuringAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
