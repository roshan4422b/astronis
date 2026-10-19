import type { Metadata } from "next";
import ComplianceInvestigationsPage from "./compliance-investigations-page";

export const metadata: Metadata = {
  title: "Compliance Investigations | Astronis Global",
  description:
    "Compliance investigation support for regulatory enquiries, internal breaches, policy violations, governance concerns and remediation.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/compliance-investigations",
  },
};

export default function Page() {
  return <ComplianceInvestigationsPage />;
}
