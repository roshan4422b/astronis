import type { Metadata } from "next";
import PayrollStatutoryCoordinationPage from "./payroll-statutory-coordination-page";

export const metadata: Metadata = {
  title: "Payroll / Statutory Coordination | Astronis Global",
  description:
    "Payroll and statutory coordination for wages, social security contributions, employee benefits, deductions, filings and compliance reviews.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/workplace-compliances/payroll-statutory-coordination",
  },
};

export default function Page() {
  return <PayrollStatutoryCoordinationPage />;
}
