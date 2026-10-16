import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "financial-services-regulatory");

export const metadata: Metadata = {
  title: "Financial Services Regulatory | Astronis Global",
  description: "Regulatory classification, licensing, governance, compliance and enforcement advisory for financial services in India.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/financial-services-regulatory",
  },
};

export default function FinancialServicesRegulatoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
