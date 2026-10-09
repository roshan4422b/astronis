import type { Metadata } from "next";
import TechnologyInsights from "./technology-insights";

export const metadata: Metadata = {
  title: "Technology Insights & Knowledge Hub",
  description:
    "Insights, analysis and practical perspectives at the intersection of law, regulation, business and technology.",
};

export default function TechnologyInsightsPage() {
  return <TechnologyInsights />;
}
