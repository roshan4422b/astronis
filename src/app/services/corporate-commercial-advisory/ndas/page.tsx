import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const data = contractAndRestructuringPages.find((page) => page.slug === "ndas");

export const metadata: Metadata = {
  title: "Non-Disclosure Agreement (NDA) | Astronis Global",
  description: "Confidentiality and NDA support for commercial discussions, diligence and sensitive business information.",
  alternates: { canonical: "/services/corporate-commercial-advisory/ndas" },
};

export default function NDAsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
