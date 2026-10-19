import type { Metadata } from "next";
import EmploymentDisputesPage from "./employment-disputes-page";

export const metadata: Metadata = {
  title: "Employment Disputes | Astronis Global",
  description:
    "Employment dispute advisory for workplace grievances, termination claims, wage and benefit disputes, industrial relations and litigation support.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/workplace-compliances/employment-disputes",
  },
};

export default function Page() {
  return <EmploymentDisputesPage />;
}
