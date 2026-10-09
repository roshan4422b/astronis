import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "partnership-firm");

export const metadata: Metadata = {
  title: "Partnership Firm Registration",
  description: "Register your partnership firm with support for partnership deed drafting, registrations and compliance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/partnership-firm" },
};

export default function PartnershipFirmPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
