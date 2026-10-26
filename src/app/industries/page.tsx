import Hero from "./hero";
import IndustryDirectory from "./industry-directory";
import Services from "../home/services";
import Insights from "../home/insights";
import FAQ from "../home/faq";
import Professionals from "../home/professionals";
import Consultation from "../home/consultation";
import IndustryEnquiryForm from "@/components/forms/IndustryEnquiryForm";
import { getPublishedContent, getPublishedPageMetadata } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";
const fallbackMetadata = {
  title: "Industries",
  description:
    "Explore sector-focused legal, regulatory and business advisory across 24 industries.",
};
export async function generateMetadata() {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/industries")) };
}
export const dynamic = "force-dynamic";
export default async function IndustriesPage() {
  const cmsIndustries = await getPublishedContent("industries");
  return (
    <CmsPageRoute path="/industries" eyebrow="Industries">
      <Hero />
      <IndustryDirectory cmsIndustries={cmsIndustries.map((item) => ({ slug: item.slug, title: String(item.data.title || ""), image: typeof item.data.featuredImage === "string" ? item.data.featuredImage : "" })).filter((item) => item.title)} />
      <Services />
      <Insights />
      <FAQ />
      <Professionals />
      <div style={{ padding: "0 1rem 2rem" }}>
        <IndustryEnquiryForm />
      </div>
      <Consultation />
    </CmsPageRoute>
  );
}
