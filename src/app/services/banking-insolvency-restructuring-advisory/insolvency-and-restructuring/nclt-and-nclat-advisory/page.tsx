import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "nclt-and-nclat-advisory");

export const metadata: Metadata = {
  title: "NCLT & NCLAT Advisory | Astronis Global",
  description: "Advisory for NCLT and NCLAT proceedings, corporate insolvency, company law disputes, appeals and tribunal order implementation.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/insolvency-and-restructuring/nclt-and-nclat-advisory",
  },
};

export default function NcltAndNclatAdvisoryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
