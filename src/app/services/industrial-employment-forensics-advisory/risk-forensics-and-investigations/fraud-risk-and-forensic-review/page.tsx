import type { Metadata } from "next";
import FraudRiskForensicReviewPage from "../fraud-risk-forensic-review/fraud-risk-forensic-review-page";

export const metadata: Metadata = {
  title: "Fraud Risk & Forensic Review | Astronis Global",
  description:
    "Fraud risk assessment and forensic review for financial irregularities, suspected misconduct, evidence coordination and governance remediation.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/fraud-risk-and-forensic-review",
  },
};

export default function Page() {
  return <FraudRiskForensicReviewPage />;
}
