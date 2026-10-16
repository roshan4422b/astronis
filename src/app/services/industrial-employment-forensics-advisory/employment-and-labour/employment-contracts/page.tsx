import type { Metadata } from "next";
import EmploymentContractsPage from "./employment-contracts-page";

export const metadata: Metadata = {
  title: "Employment Contracts | Astronis Global",
  description:
    "Employment contract drafting, review and advisory for appointment terms, compensation, confidentiality, intellectual property, restrictive covenants and separation.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-contracts",
  },
};

export default function Page() {
  return <EmploymentContractsPage />;
}
