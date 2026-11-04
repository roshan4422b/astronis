import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../../corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { financialRegulatoryAdvisoryPages } from "@/data/financial-regulatory-advisory-pages";

const data = financialRegulatoryAdvisoryPages.find(
  (page) => page.slug === "rbi-regulatory-advisory",
);

export const metadata: Metadata = {
  title: "RBI Regulatory Advisory | Astronis Global",
  description:
    "RBI regulatory advisory for licensing, approvals, compliance frameworks and financial services operations in India.",
  alternates: {
    canonical:
      "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/rbi-regulatory",
  },
};

export default function RbiRegulatoryAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
