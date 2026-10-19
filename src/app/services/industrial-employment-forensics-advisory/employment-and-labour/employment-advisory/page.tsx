import type { Metadata } from "next";
import EmploymentAdvisoryPage from "./employment-advisory-page";

export const metadata: Metadata = {
  title: "Employment Advisory | Astronis Global",
  description:
    "Employment advisory for workplace relationships, employment contracts, labour compliance, HR policies, workforce restructuring and disputes.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employment-advisory",
  },
};

export default function Page() {
  return <EmploymentAdvisoryPage />;
}
