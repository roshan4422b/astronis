import AdminWorkspace from "../_components/admin-workspace";
import { getProfessionalApplicationConfig } from "@/app/professionals/submit-profile/professional-application-config";

export const metadata = { title: "Professionals" };

export default function AdminProfessionalsPage() {
  return <AdminWorkspace section="professionals" professionalApplicationConfig={getProfessionalApplicationConfig()} />;
}
