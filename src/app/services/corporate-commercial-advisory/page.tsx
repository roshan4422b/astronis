import type { Metadata } from "next";
import { corporateCommercial } from "@/data/service-practices";
import MainServicePage from "../_template/main-service-page";

export const metadata: Metadata = {
  title: "Corporate & Commercial | Astronis",
  description: "Corporate and commercial advice across entity formation, governance, structuring, mergers, acquisitions and transactions.",
  alternates: { canonical: "/services/corporate-commercial-advisory" },
  openGraph: { title: "Corporate & Commercial | Astronis", description: "Corporate and commercial advice across entity formation, governance, structuring, mergers, acquisitions and transactions.", url: "/services/corporate-commercial-advisory", type: "website" },
};

export default function CorporateCommercialAdvisoryPage() {
  return <MainServicePage practice={corporateCommercial} />;
}
