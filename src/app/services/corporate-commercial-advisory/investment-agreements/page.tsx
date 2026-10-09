import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { commercialContractPages } from "@/data/commercial-contract-pages";

const data = commercialContractPages.find((page) => page.slug === "investment-agreements");

export const metadata: Metadata = {
  title: "Investment Agreements | Astronis Global",
  description: "Strategic support for investment agreements, rights frameworks and capital structuring.",
  alternates: { canonical: "/services/corporate-commercial-advisory/investment-agreements" },
};

export default function InvestmentAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
