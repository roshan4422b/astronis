import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getServiceChildPageData, getServiceChildPageMetadata } from "@/data/service-child-pages";

const slug = "ngo-registration-nonprofit-compliance-institutional-advisory";
export const metadata = getServiceChildPageMetadata(slug);

export default function NgoRegistrationPage() {
  return <EntityFormationPage data={getServiceChildPageData(slug)} />;
}
