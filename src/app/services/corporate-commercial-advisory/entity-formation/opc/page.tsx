import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { entityFormationPages } from "@/data/entity-formation-pages";

const data = entityFormationPages.find((page) => page.slug === "opc");

export const metadata: Metadata = {
  title: "One Person Company (OPC) Formation",
  description: "Plan One Person Company formation with support for eligibility review, incorporation documents, ROC filing and post-formation guidance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/opc" },
};

export default function OnePersonCompanyPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
