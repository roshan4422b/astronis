import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../../corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { financialRegulatoryAdvisoryPages } from "@/data/financial-regulatory-advisory-pages";

const data = financialRegulatoryAdvisoryPages.find(
  (page) => page.slug === "fintech-regulatory-advisory",
);

export const metadata: Metadata = {
  title: "FinTech Regulatory Advisory | Astronis Global",
  description:
    "FinTech regulatory advisory for digital lending, payments, financial partnerships, technology compliance and data protection.",
  alternates: {
    canonical:
      "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/fintech-advisory-and-compliance",
  },
};

export default function FinTechRegulatoryAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
