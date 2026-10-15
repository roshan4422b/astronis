import type { Metadata } from "next";
import TerminationSeparationAdvisoryPage from "./termination-separation-advisory-page";

export const metadata: Metadata = {
  title: "Termination / Separation Advisory | Astronis Global",
  description:
    "Employment termination and separation advisory for legal review, disciplinary processes, restructuring, statutory dues, settlements and dispute support.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/employment-and-labour/termination-separation-advisory",
  },
};

export default function Page() {
  return <TerminationSeparationAdvisoryPage />;
}
