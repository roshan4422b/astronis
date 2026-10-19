import type { Metadata } from "next";
import WorkplaceInvestigationsPage from "./workplace-investigations-page";

export const metadata: Metadata = {
  title: "Workplace Investigations | Astronis Global",
  description:
    "Independent, evidence-led workplace investigation support for misconduct, harassment, whistleblower complaints, fraud concerns and workplace governance.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/workplace-compliances/workplace-investigations",
  },
};

export default function Page() {
  return <WorkplaceInvestigationsPage />;
}
