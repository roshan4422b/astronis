import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { entityFormationPages } from "@/data/entity-formation-pages";

const data = entityFormationPages.find((page) => page.slug === "llp-formation");

export const metadata: Metadata = {
  title: "LLP Formation and Registration",
  description: "Plan LLP formation with support for partner arrangements, LLP agreement, incorporation filings, registrations and ongoing compliance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/llp-formation" },
};

export default function LLPFormationPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
