import type { Metadata } from "next";
import InvestorCoordinationPage from "./investor-coordination-page";

export const metadata: Metadata = {
  title: "Investor Coordination | Astronis Global",
  description:
    "Coordinate investor communication, due diligence, transaction documentation, closing and post-investment governance with Astronis Global.",
  alternates: {
    canonical:
      "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investor-coordination",
  },
};

export default function Page() {
  return <InvestorCoordinationPage />;
}