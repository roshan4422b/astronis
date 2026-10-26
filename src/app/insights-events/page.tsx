import type { Metadata } from "next";
import InsightsEvents from "./insights-events";
import { getPublishedPageMetadata } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";

const fallbackMetadata: Metadata = {
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
export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/insights-events")) };
}

export default function InsightsEventsPage() {
  return <CmsPageRoute path="/insights-events" eyebrow="Insights & Events"><InsightsEvents /></CmsPageRoute>;
}
