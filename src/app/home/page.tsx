import type { Metadata } from "next";
import Hero from "./hero";
import QuickServices from "./quick-services";
import WhyChooseUs from "./why-choose-us";
import Services from "./services";
import Industries from "./industries";
import GlobalPresence from "./global-presence";
import Approach from "./approach";
import Professionals from "./professionals";
import Insights from "./insights";
import FAQ from "./faq";
import Clients from "./clients";
import SuccessStories from "./success-stories";
import Testimonials from "./testimonials";
import MediaSpotlight from "./media-spotlight";
import KnowledgeCentre from "./knowledge-centre";
import Consultation from "./consultation";
import Contact from "./contact";
import Connect from "./connect";
import { getPublishedContent, getPublishedPageMetadata, getUnpublishedSourceContentSlugs } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";

const fallbackMetadata = { alternates: { canonical: "/" } };
export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/")) };
}

export default async function HomePage() {
  const [cmsIndustries, suppressedIndustries] = await Promise.all([
    getPublishedContent("industries"),
    getUnpublishedSourceContentSlugs("industries"),
  ]);
  const homeIndustries = cmsIndustries.map((item) => ({
    slug: item.slug,
    title: String(item.data.title || ""),
    description: String(item.data.description || ""),
    image: typeof item.data.featuredImage === "string" ? item.data.featuredImage : "",
  })).filter((item) => item.title);
  return (
    <CmsPageRoute path="/" eyebrow="Main website">
    <div className="home-page">
      <Hero />
      <QuickServices />
      <WhyChooseUs />
      <Services />
      <Industries cmsIndustries={homeIndustries} suppressedSlugs={[...suppressedIndustries]} />
      <GlobalPresence />
      <Approach />
      <Professionals />
      <Insights />
      <FAQ />
      <Clients />
      <SuccessStories />
      <MediaSpotlight />
      <Testimonials />
      <KnowledgeCentre />
      <Consultation />
      <Contact />
      <Connect />
    </div>
    </CmsPageRoute>
  );
}
