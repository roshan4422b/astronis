import type { Metadata } from "next";
import WhiteCollarAdvisoryPage from "./white-collar-advisory-page";

export const metadata: Metadata = {
  title: "White-Collar Advisory | Astronis Global",
  description:
    "White-collar legal and regulatory advisory for economic offences, regulatory investigations, financial misconduct allegations and enforcement proceedings.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/white-collar-advisory",
  },
};

export default function Page() {
  return <WhiteCollarAdvisoryPage />;
}
