import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const data = contractAndRestructuringPages.find((page) => page.slug === "employment-consultancy-agreements");

export const metadata: Metadata = {
  title: "Employment / Consultancy Agreements | Astronis Global",
  description: "Support for employment and consultancy agreements, role clarity, IP protection and commercial relationship structuring.",
  alternates: { canonical: "/services/corporate-commercial-advisory/employment-consultancy-agreements" },
};

export default function EmploymentConsultancyAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
