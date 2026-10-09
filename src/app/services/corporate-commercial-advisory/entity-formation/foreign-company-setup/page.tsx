import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "foreign-company-setup");

export const metadata: Metadata = {
  title: "Foreign Company Setup in India",
  description: "Plan a foreign company's India market entry with establishment route, RBI, incorporation, tax and regulatory support.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/foreign-company-setup" },
};

export default function ForeignCompanySetupPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
