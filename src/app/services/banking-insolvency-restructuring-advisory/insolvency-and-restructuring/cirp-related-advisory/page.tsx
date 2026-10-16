import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "cirp-related-advisory");

export const metadata: Metadata = {
  title: "CIRP-related Advisory | Astronis Global",
  description: "Advisory for CIRP commencement, creditor claims, CoC proceedings, resolution plans, insolvency litigation and post-CIRP implementation.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/cirp-related-advisory",
  },
};

export default function CirpRelatedAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
