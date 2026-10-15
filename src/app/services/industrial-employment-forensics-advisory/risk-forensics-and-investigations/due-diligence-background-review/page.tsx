import type { Metadata } from "next";
import DueDiligenceBackgroundReviewPage from "./due-diligence-background-review-page";

export const metadata: Metadata = {
  title: "Due Diligence / Background Review | Astronis Global",
  description:
    "Due diligence and background review for corporate, transaction, investor, promoter, vendor and third-party risk assessment.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/due-diligence-background-review",
  },
};

export default function Page() {
  return <DueDiligenceBackgroundReviewPage />;
}
