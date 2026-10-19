import type { Metadata } from "next";
import LabourLawCompliancePage from "./labour-law-compliance-page";

export const metadata: Metadata = {
  title: "Labour Law Compliance | Astronis Global",
  description:
    "Labour law compliance advisory for establishment registrations, wages, social security, workplace safety, statutory records, returns and audits.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/employment-and-labour/labour-law-compliance",
  },
};

export default function Page() {
  return <LabourLawCompliancePage />;
}
