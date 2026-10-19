import type { Metadata } from "next";
import IndiaEntryStrategyPage from "./india-entry-strategy-page";

export const metadata: Metadata = {
  title: "India Entry Strategy | Astronis Global",
  description:
    "Plan a compliant India market entry with support for market assessment, investment structures, regulatory approvals and post-entry operations.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/investment-and-transaction-advisory/india-entry-strategy",
  },
};

export default function Page() {
  return <IndiaEntryStrategyPage />;
}
