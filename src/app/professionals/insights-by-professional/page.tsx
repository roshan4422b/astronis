import type { Metadata } from "next";
import InsightsByProfessional from "./page-content";

export const metadata: Metadata = {
  title: { absolute: "Insights by Professional | ASTRONIS Global" },
  description:
    "Explore legal, regulatory, corporate and business insights from ASTRONIS professionals.",
};

export default function InsightsByProfessionalPage() {
  return <InsightsByProfessional />;
}
