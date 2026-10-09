import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "project-office");

export const metadata: Metadata = {
  title: "Project Office of Foreign Company in India | Astronis Global",
  description: "Set up a foreign company's Project Office in India with support for project eligibility, RBI approval, registrations and compliance.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-formation/project-office" },
};

export default function ProjectOfficePage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
