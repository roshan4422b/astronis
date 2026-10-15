import type { Metadata } from "next";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getAdditionalServiceDetailPage } from "@/data/additional-service-detail-pages";

const page = getAdditionalServiceDetailPage("ip-and-brand-advisory", "assignment")
  ?? (() => { throw new Error("Missing IPR Assignment page data."); })();

export const metadata: Metadata = {
  title: `${page.title} | Intellectual Property Right Services | Astronis`,
  description: page.description,
  alternates: { canonical: "/services/intellectual-property-right-services/ip-and-brand-advisory/assignment" },
};

export default function IprAssignmentPage() {
  return <EntityFormationPage data={page} />;
}
