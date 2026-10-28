import Hero from "./hero";
import Link from "next/link";
import Leadership from "./leadership";
import Consultation from "../home/consultation";
import { getPublishedContent, getPublishedPageMetadata, getUnpublishedSourceContentSlugs } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";
import styles from "./professionals-page.module.css";
const fallbackMetadata = { title: "Our Professionals" };
export async function generateMetadata() {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/professionals")) };
}
export const dynamic = "force-dynamic";
export default async function ProfessionalsPage() {
  const [cmsProfessionals, suppressedSlugs] = await Promise.all([
    getPublishedContent("professionals"),
    getUnpublishedSourceContentSlugs("professionals"),
  ]);
  const directoryProfessionals = cmsProfessionals.map((item) => ({
    slug: item.slug,
    name: String(item.data.title || ""),
    role: String(item.data.designation || ""),
    expertise: String(item.data.expertise || ""),
    description: String(item.data.description || item.data.content || ""),
    image: typeof item.data.featuredImage === "string" ? item.data.featuredImage : "",
  })).filter((item) => item.name);
  return (
    <CmsPageRoute path="/professionals" eyebrow="Company">
      <Hero />
      <section className={styles.directory} id="leadership" aria-labelledby="directory-title">
        <div className="container">
          <div className={styles.directoryHeading}>
            <div><span className={styles.eyebrow}>Meet the team</span><h2 id="directory-title">Our professionals</h2><p>Get to know the people who can help you navigate your next business decision.</p></div>
            <Link className={styles.connectLink} href="/professionals/enquiry">Connect with a Professional</Link>
          </div>
          <Leadership cmsProfessionals={directoryProfessionals} suppressedSlugs={[...suppressedSlugs]} />
        </div>
      </section>
      <Consultation />
    </CmsPageRoute>
  );
}
