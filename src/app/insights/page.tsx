import Hero from "./hero";
import InsightDirectory from "./insight-directory";
import { getPublishedContent } from "@/lib/supabase/server";
export const metadata = { title: "Insights & Resources" };
export const dynamic = "force-dynamic";
export default async function InsightsPage() {
  const cmsEntries = await getPublishedContent("insights");
  return (
    <>
      <Hero />
      <InsightDirectory cmsEntries={cmsEntries.map((item) => ({ title: String(item.data.title || ""), slug: item.slug, category: String(item.data.category || "Insights") })).filter((item) => item.title)} />
    </>
  );
}
