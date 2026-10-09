import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import { businessStructuringPages } from "@/data/business-structuring-pages";

const data = businessStructuringPages.find((page) => page.slug === "group-structuring");

export const metadata: Metadata = {
  title: "Group Structuring Services | Astronis Global",
  description: "Design scalable, compliant business group structures aligned with tax strategy, operations and expansion plans.",
  alternates: { canonical: "/services/corporate-commercial-advisory/entity-structuring-group-reorganisation/group-structuring" },
};

export default function GroupStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
