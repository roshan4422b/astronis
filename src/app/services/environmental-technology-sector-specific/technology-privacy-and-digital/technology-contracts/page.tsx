import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getServiceChildPageData, getServiceChildPageMetadata } from "@/data/service-child-pages";

const slug = "technology-contracts";
export const metadata = getServiceChildPageMetadata(slug);

export default function TechnologyContractsPage() {
  return <EntityFormationPage data={getServiceChildPageData(slug)} />;
}
