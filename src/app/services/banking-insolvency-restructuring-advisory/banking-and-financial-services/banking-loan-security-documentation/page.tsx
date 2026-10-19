import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const data = allEntityFormationPages.find((page) => page.slug === "banking-loan-security-documentation");

export const metadata: Metadata = {
  title: "Banking - Loan/Security Documentation | Astronis Global",
  description: "Legal and transaction documentation advisory for loan agreements, security creation, guarantees, registrations and enforcement readiness.",
  alternates: {
    canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/banking-loan-security-documentation",
  },
};

export default function BankingLoanSecurityDocumentationPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
