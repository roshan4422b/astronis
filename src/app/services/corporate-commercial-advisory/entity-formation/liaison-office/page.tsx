import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "liaison-office");

export const metadata: Metadata = {
  title: "Liaison Office of Foreign Company in India | Astronis Global",
  description: "Establish a foreign company's Liaison Office in India with support for RBI approval, documentation and ongoing compliance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/liaison-office" },
};

export default function LiaisonOfficePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
