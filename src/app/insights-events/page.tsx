import type { Metadata } from "next";
import InsightsEvents from "./insights-events";
import { getPublishedContent, getPublishedPageMetadata } from "@/lib/supabase/server";
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

export const dynamic = "force-dynamic";

export default async function InsightsEventsPage() {
  const cmsEvents = (await getPublishedContent("insights"))
    .filter((record) => record.data.category === "Events")
    .flatMap((record) => {
      const title = typeof record.data.title === "string" ? record.data.title.trim() : "";
      if (!title) return [];
      return [{
        slug: record.slug,
        title,
        description: typeof record.data.description === "string" ? record.data.description : "",
        featuredImage: typeof record.data.featuredImage === "string" ? record.data.featuredImage : "",
        author: typeof record.data.author === "string" ? record.data.author : "",
      }];
    });

  return <CmsPageRoute path="/insights-events" eyebrow="Insights & Events"><InsightsEvents cmsEvents={cmsEvents} /></CmsPageRoute>;
}
