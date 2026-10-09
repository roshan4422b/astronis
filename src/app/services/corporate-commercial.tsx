// Backwards-compatible component entry point for the shared service template.
import { corporateCommercial } from "@/data/service-practices";
import MainServicePage from "./_template/main-service-page";
export default function CorporateCommercial() {
  return <MainServicePage practice={corporateCommercial} />;
}
