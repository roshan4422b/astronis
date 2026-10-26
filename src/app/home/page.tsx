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
import { getPublishedPageMetadata } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";

const fallbackMetadata = { alternates: { canonical: "/" } };
export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/")) };
}

export default function HomePage() {
  return (
    <CmsPageRoute path="/" eyebrow="Main website">
    <div className="home-page">
      <Hero />
      <QuickServices />
      <WhyChooseUs />
      <Services />
      <Industries />
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
