import type { Metadata } from "next";
import AntiBriberyEthicsFrameworkPage from "./anti-bribery-ethics-framework-page";

export const metadata: Metadata = {
  title: "Anti-Bribery / Ethics Framework | Astronis Global",
  description:
    "Anti-bribery and ethics advisory for corruption risk assessment, policies, third-party integrity, whistleblower procedures, training and monitoring.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/risk-forensics-and-investigations/anti-bribery-ethics-framework",
  },
};

export default function Page() {
  return <AntiBriberyEthicsFrameworkPage />;
}
