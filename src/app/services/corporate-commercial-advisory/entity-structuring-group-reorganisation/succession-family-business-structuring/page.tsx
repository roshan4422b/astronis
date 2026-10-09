import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessReorganisationPages } from "@/data/business-reorganisation-pages";

const data = businessReorganisationPages.find(
  (page) => page.slug === "succession-family-business-structuring",
);

export const metadata: Metadata = {
  title: "Succession & Family Business Structuring | Astronis Global",
  description:
    "Succession and family business structuring for ownership transition, governance, wealth planning and long-term continuity.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/succession-family-business-structuring",
  },
};

export default function SuccessionFamilyBusinessStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
