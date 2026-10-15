import type { Metadata } from "next";
import CorporateInvestigationsPage from "./corporate-investigations-page";

export const metadata: Metadata = {
  title: "Corporate Investigations | Astronis Global",
  description:
    "Corporate investigation support for internal misconduct, financial irregularities, whistleblower concerns, governance failures and remediation.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/corporate-investigations",
  },
};

export default function Page() {
  return <CorporateInvestigationsPage />;
}
