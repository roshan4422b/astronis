import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { commercialContractPages } from "@/data/commercial-contract-pages";

const data = commercialContractPages.find((page) => page.slug === "shareholders-agreements");

export const metadata: Metadata = {
  title: "Shareholders' Agreements | Astronis Global",
  description: "Drafting and advisory support for shareholders' agreements, governance rights and value protection.",
  alternates: { canonical: "/services/corporate-commercial-advisory/shareholders-agreements" },
};

export default function ShareholdersAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
