import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "financial-institution-advisory");

export const metadata: Metadata = {
  title: "Financial Institution Advisory | Astronis Global",
  description: "Integrated legal, regulatory and business advisory for banks, NBFCs, housing finance companies and other financial institutions.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/financial-institution-advisory",
  },
};

export default function FinancialInstitutionAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
