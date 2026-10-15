import type { Metadata } from "next";
import InvestmentStructuringPage from "./investment-structuring-page";

export const metadata: Metadata = {
  title: "Investment Structuring | Astronis Global",
  description:
    "Structure equity, debt, convertible and strategic investments with considered ownership, governance, regulatory and transaction support.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investment-structuring",
  },
};

export default function Page() {
  return <InvestmentStructuringPage />;
}
