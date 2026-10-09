import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessReorganisationPages } from "@/data/business-reorganisation-pages";

const data = businessReorganisationPages.find(
  (page) => page.slug === "business-reorganisation",
);

export const metadata: Metadata = {
  title: "Business Reorganisation | Astronis Global",
  description:
    "Strategic business reorganisation advisory for mergers, demergers, restructuring, regulatory approvals and implementation.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/business-reorganisation",
  },
};

export default function BusinessReorganisationPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
