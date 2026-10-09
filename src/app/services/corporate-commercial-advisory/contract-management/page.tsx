import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";

const data = contractAndRestructuringPages.find((page) => page.slug === "contract-management");

export const metadata: Metadata = {
  title: "Contract Management | Astronis Global",
  description: "Lifecycle contract management support for governance, renewals, risk review and commercial compliance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/contract-management" },
};

export default function ContractManagementPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
