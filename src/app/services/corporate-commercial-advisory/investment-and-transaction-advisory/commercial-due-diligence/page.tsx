import type { Metadata } from "next";
import CommercialDueDiligencePage from "./commercial-due-diligence-page";

export const metadata: Metadata = {
  title: "Commercial Due Diligence | Astronis Global",
  description:
    "Assess commercial risks, customer and supplier relationships, business models and transaction assumptions with commercial due diligence support.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/investment-and-transaction-advisory/commercial-due-diligence",
  },
};

export default function Page() {
  return <CommercialDueDiligencePage />;
}