import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessReorganisationPages } from "@/data/business-reorganisation-pages";

const data = businessReorganisationPages.find(
  (page) => page.slug === "corporate-conversion",
);

export const metadata: Metadata = {
  title: "Corporate Conversion | Astronis Global",
  description:
    "Corporate conversion services for changing entity type, planning statutory approvals and implementing a compliant transition.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/corporate-conversion",
  },
};

export default function CorporateConversionPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
