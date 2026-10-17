import type { Metadata } from "next";
import WorkplaceWhistleblowerPolicyPage from "./workplace-whistleblower-policy-page";

export const metadata: Metadata = {
  title: "Workplace Whistleblower Policy | Astronis Global",
  description:
    "Whistleblower policy advisory for reporting channels, confidentiality, vigil mechanisms, investigations, anti-retaliation safeguards and governance.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/workplace-compliances/a-workplace-whistleblower-policy",
  },
};

export default function Page() {
  return <WorkplaceWhistleblowerPolicyPage />;
}
