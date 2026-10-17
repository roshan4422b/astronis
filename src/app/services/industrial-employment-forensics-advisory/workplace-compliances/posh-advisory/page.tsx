import type { Metadata } from "next";
import PoshAdvisoryPage from "./posh-advisory-page";

export const metadata: Metadata = {
  title: "POSH Advisory | Astronis Global",
  description:
    "POSH compliance advisory for workplace policies, Internal Committees, employee awareness, complaint inquiries, statutory reporting and audits.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/workplace-compliances/posh-advisory",
  },
};

export default function Page() {
  return <PoshAdvisoryPage />;
}
