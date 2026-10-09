import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "wholly-owned-subsidiary");

export const metadata: Metadata = {
  title: "Wholly Owned Subsidiary Company in India",
  description: "Set up a wholly owned subsidiary in India with support for incorporation, FDI compliance and post-incorporation requirements.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/wholly-owned-subsidiary" },
};

export default function WhollyOwnedSubsidiaryPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
