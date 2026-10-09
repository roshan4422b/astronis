import type { Metadata } from "next";
import InsightsEvents from "./insights-events";

export const metadata: Metadata = {
  title: "Insights & Events",
  description:
    "Explore the latest legal, regulatory, corporate, industry and business insights, publications, case law updates and events from Astronis Global.",
  alternates: {
    canonical: "/insights-events",
  },
  openGraph: {
    title: "Insights & Events | Astronis Global",
    description:
      "Legal, regulatory, corporate and business perspectives from Astronis Global.",
    url: "/insights-events",
    type: "website",
  },
};

export default function InsightsEventsPage() {
  return <InsightsEvents />;
}
