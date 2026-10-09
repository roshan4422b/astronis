import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const base = transactionGovernancePages.find((page) => page.slug === "mergers-acquisitions");
const data = base
  ? {
      ...base,
      slug: "buy-or-sell-of-companies",
      title: "Buy or Sell of Companies",
      shortTitle: "Buy / Sell",
      heroStatement: "Buy or sell with strategic clarity.",
      description:
        "We advise on buy-side and sell-side company transactions with a practical focus on value, diligence, process discipline and negotiation outcomes.",
      introduction:
        "A company sale or acquisition is rarely a simple transaction; it is a strategic decision with commercial, legal and operational implications. We help frame the deal clearly, identify the issues that matter most and move the process toward a workable, well-supported outcome.",
      heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · BUY OR SELL OF COMPANIES",
      categoryTitle: "Mergers, Acquisitions & Transactions",
      categoryHref: "/services/corporate-commercial-advisory",
    }
  : undefined;

export const metadata: Metadata = {
  title: "Buy or Sell of Companies | Astronis Global",
  description: "Buy-side and sell-side company advisory covering diligence, valuation context, negotiation and execution support.",
  alternates: { canonical: "/services/corporate-commercial-advisory/buy-or-sell-of-companies" },
};

export default function BuyOrSellOfCompaniesPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
