import Hero from "./hero";
import Leadership from "./leadership";
import Consultation from "../home/consultation";
import { Button } from "../_components/ui";
import { getPublishedContent, getPublishedPageMetadata } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";
const fallbackMetadata = { title: "Our Professionals" };
export async function generateMetadata() {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/professionals")) };
}
export const dynamic = "force-dynamic";
export default async function ProfessionalsPage() {
  const cmsProfessionals = await getPublishedContent("professionals");
  return (
    <CmsPageRoute path="/professionals" eyebrow="Company">
      <Hero />
      <section className="section" id="leadership">
        <div className="container">
          <div className="section-heading-inline">
            <h2>Meet Our Professionals</h2>
            <Button href="/professionals/enquiry">Connect with a Professional</Button>
          </div>
          <Leadership cmsProfessionals={cmsProfessionals.map((item) => ({ slug: item.slug, name: String(item.data.title || ""), role: String(item.data.designation || ""), expertise: String(item.data.expertise || ""), image: typeof item.data.featuredImage === "string" ? item.data.featuredImage : "" })).filter((item) => item.name)} />
        </div>
      </section>
      <Consultation />
    </CmsPageRoute>
  );
}
