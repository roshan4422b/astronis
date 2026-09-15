import { notFound } from "next/navigation";
import { siteMenu, slugify } from "@/content/site";
import { Banner, Button } from "../../_components/ui";
import Story from "../story";
import Values from "../values";
import Leadership from "../../professionals/leadership";
import GlobalPresence from "../../home/global-presence";
import AboutAstronisGlobal from "../about-astronis-global";
import OurStory from "../our-story";
import VisionMission from "../vision-mission";
import AboutResources from "../about-resources";
export function generateStaticParams() {
  return siteMenu.about.map((t) => ({ slug: slugify(t) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: siteMenu.about.find((t) => slugify(t) === slug),
    ...(["mission", "vision-and-mission"].includes(slug) ? {
      description: "Discover Astronis Global’s purpose, vision and mission, and the principles that guide our commitment to clients, people and a better tomorrow.",
      alternates: { canonical: "/about/vision-and-mission" },
    } : {}),
    ...(slug === "our-story" ? {
      description: "Discover the Astronis Global story: a journey from a focused legal practice to integrated corporate, regulatory and business advisory, shaped by purpose and lasting partnerships.",
      alternates: { canonical: "/about/our-story" },
    } : {}),
    ...(slug === "about-astronis-global" ? {
      description: "Meet Astronis Global, an integrated corporate, regulatory, legal and business advisory partner. Global insight, practical solutions and lasting value across India and beyond.",
      alternates: { canonical: "/about/about-astronis-global" },
    } : {}),
  };
}
export default async function AboutDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = siteMenu.about.find((t) => slugify(t) === slug);
  if (!title) notFound();
  if (slug === "about-astronis-global") return <AboutAstronisGlobal />;
  if (slug === "our-story") return <OurStory />;
  if (slug === "mission" || slug === "vision-and-mission") return <VisionMission />;
  return (
    <>
      <Banner title={title} eyebrow="About Us" />
      {slug === "leadership" ? (
        <section className="container">
          <Leadership />
        </section>
      ) : slug === "core-values" || slug === "why-choose-us" ? (
        <Values />
      ) : slug === "global-reach" || slug === "india-presence" ? (
        <GlobalPresence />
      ) : slug === "careers" ? (
        <section className="section">
          <div className="container narrow">
            <h2>Grow with Astronis Global</h2>
            <p style={{ marginBlock: 25 }}>
              We welcome conversations with professionals who share our
              commitment to integrity, practical advice and client service.
              Contact our team to enquire about current opportunities.
            </p>
            <Button href="mailto:advisory@astronisglobal.com?subject=Career%20enquiry">
              Contact Our Team
            </Button>
          </div>
        </section>
      ) : (
        <Story />
      )}
      <AboutResources />
    </>
  );
}
