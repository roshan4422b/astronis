import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "proprietorship");

export const metadata: Metadata = {
  title: "Sole Proprietorship Firm Registration",
  description: "Set up a proprietorship firm with support for applicable registrations, business setup and compliance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/proprietorship" },
};

export default function ProprietorshipPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
