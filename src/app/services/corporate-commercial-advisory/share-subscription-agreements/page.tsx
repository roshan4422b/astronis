import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { commercialContractPages } from "@/data/commercial-contract-pages";

const data = commercialContractPages.find((page) => page.slug === "share-subscription-agreements");

export const metadata: Metadata = {
  title: "Share Subscription Agreements | Astronis Global",
  description: "Support for share subscription agreements, investor rights and investment documentation.",
  alternates: { canonical: "/services/corporate-commercial-advisory/share-subscription-agreements" },
};

export default function ShareSubscriptionAgreementsPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
