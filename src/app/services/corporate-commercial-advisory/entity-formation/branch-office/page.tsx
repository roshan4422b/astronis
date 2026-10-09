import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "branch-office");

export const metadata: Metadata = {
  title: "Branch Office of Foreign Company in India | Astronis Global",
  description: "Establish a foreign company's Branch Office in India with RBI approval, ROC registration, tax and compliance support.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/branch-office" },
};

export default function BranchOfficePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
