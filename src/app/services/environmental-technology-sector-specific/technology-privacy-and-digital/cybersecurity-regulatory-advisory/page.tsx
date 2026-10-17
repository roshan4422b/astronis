import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getServiceChildPageData, getServiceChildPageMetadata } from "@/data/service-child-pages";

const slug = "cybersecurity-regulatory-advisory";
export const metadata = getServiceChildPageMetadata(slug);

export default function CybersecurityRegulatoryAdvisoryPage() {
  return <EntityFormationPage data={getServiceChildPageData(slug)} />;
}
