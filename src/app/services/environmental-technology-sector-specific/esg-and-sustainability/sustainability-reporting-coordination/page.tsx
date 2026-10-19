import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getServiceChildPageData, getServiceChildPageMetadata } from "@/data/service-child-pages";

const slug = "sustainability-reporting-coordination";
export const metadata = getServiceChildPageMetadata(slug);

export default function SustainabilityReportingCoordinationPage() {
  return <EntityFormationPage data={getServiceChildPageData(slug)} />;
}
