import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getServiceChildPageData, getServiceChildPageMetadata } from "@/data/service-child-pages";

const slug = "it-agreements";
export const metadata = getServiceChildPageMetadata(slug);

export default function ITAgreementsPage() {
  return <EntityFormationPage data={getServiceChildPageData(slug)} />;
}
