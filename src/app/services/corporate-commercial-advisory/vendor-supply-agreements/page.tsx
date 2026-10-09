import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { commercialContractPages } from "@/data/commercial-contract-pages";

const data = commercialContractPages.find((page) => page.slug === "vendor-supply-agreements");

export const metadata: Metadata = {
  title: "Vendor Supply Agreements | Astronis Global",
  description: "Development of vendor supply agreements covering quality, delivery, risk allocation and commercial continuity.",
  alternates: { canonical: "/services/corporate-commercial-advisory/vendor-supply-agreements" },
};

export default function VendorSupplyAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
