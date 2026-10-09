import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { entityFormationPages } from "@/data/entity-formation-pages";

const data = entityFormationPages.find((page) => page.slug === "section-8-company");

export const metadata: Metadata = {
  title: "Section 8 Company Formation",
  description: "Plan Section 8 Company formation with support for purpose, governance, incorporation, registrations and funding-related requirements.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/section-8-company" },
};

export default function Section8CompanyPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
