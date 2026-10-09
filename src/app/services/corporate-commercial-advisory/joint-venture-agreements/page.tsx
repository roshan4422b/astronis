import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { commercialContractPages } from "@/data/commercial-contract-pages";

const data = commercialContractPages.find((page) => page.slug === "joint-venture-agreements");

export const metadata: Metadata = {
  title: "Joint Venture Agreements | Astronis Global",
  description: "Advice on joint venture agreements, governance, controls and commercial collaboration structures.",
  alternates: { canonical: "/services/corporate-commercial-advisory/joint-venture-agreements" },
};

export default function JointVentureAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
