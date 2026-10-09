import type { Metadata } from "next";
import ExpertsByService from "./page-content";

export const metadata: Metadata = {
  title: { absolute: "Experts by Service | ASTRONIS Global" },
  description:
    "Find experienced legal, regulatory, financial and business advisory professionals across corporate, compliance, dispute resolution, taxation, technology and other specialist services.",
};

export default function ExpertsByServicePage() {
  return <ExpertsByService />;
}
