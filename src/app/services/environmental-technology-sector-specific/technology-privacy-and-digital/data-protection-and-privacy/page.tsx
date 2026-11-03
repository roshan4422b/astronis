import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getServiceChildPageData, getServiceChildPageMetadata } from "@/data/service-child-pages";
import styles from "./page.module.css";

const slug = "data-protection-and-privacy";
export const metadata = getServiceChildPageMetadata(slug);

export default function DataProtectionAndPrivacyPage() {
  return <div className={styles.route}><EntityFormationPage data={getServiceChildPageData(slug)} /></div>;
}