import Image from "@/app/_components/asset-image";
import { Heading, TextLink } from "../_components/ui";
import Leadership from "../professionals/leadership";
import styles from "./professionals.module.css";
import { getPublishedContent, getUnpublishedSourceContentSlugs } from "@/lib/supabase/server";

export default async function Professionals() {
  const [cmsProfessionals, suppressedSlugs] = await Promise.all([
    getPublishedContent("professionals"),
    getUnpublishedSourceContentSlugs("professionals"),
  ]);
  const people = cmsProfessionals.map((item) => ({
    slug: item.slug,
    name: String(item.data.title || ""),
    role: String(item.data.designation || ""),
    expertise: String(item.data.expertise || ""),
    description: String(item.data.description || item.data.content || ""),
    image: typeof item.data.featuredImage === "string" ? item.data.featuredImage : "",
  })).filter((item) => item.name);
  return (
    <section className="section professionals-section">
      <div className="professional-banner">
        <Image
          src="/Professional & Business Services .png"
          alt=""
          fill
          sizes="100vw"
          className="backdrop"
        />
        <div className="container relative">
          <Heading
            title="Our Professionals. Your Partners in Success."
            text="Experienced professionals bringing legal, regulatory and commercial perspective to complex business matters."
            light
          />
        </div>
      </div>
      <div className="container">
        <div className={styles.professionalDirectory}>
          <Leadership limit={3} cmsProfessionals={people} suppressedSlugs={[...suppressedSlugs]} />
        </div>
        <div className="center">
          <TextLink href="/professionals">View All Professionals</TextLink>
        </div>
      </div>
    </section>
  );
}
