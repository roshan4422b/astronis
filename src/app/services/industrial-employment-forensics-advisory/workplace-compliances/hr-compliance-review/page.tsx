import type { Metadata } from "next";
import HrComplianceReviewPage from "./hr-compliance-review-page";

export const metadata: Metadata = {
  title: "HR Compliance Review | Astronis Global",
  description:
    "Review employment documentation, HR policies, payroll practices and applicable labour compliance with a structured HR compliance assessment.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/workplace-compliances/hr-compliance-review",
  },
};

export default function Page() {
  return <HrComplianceReviewPage />;
}
