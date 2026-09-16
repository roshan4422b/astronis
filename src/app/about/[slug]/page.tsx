import { notFound } from "next/navigation";
import { siteMenu, slugify } from "@/content/site";
import { Banner, Button } from "../../_components/ui";
import Story from "../story";
import Values from "../values";
import LeadershipPage from "../leadership-page";
import GlobalPresence from "../../home/global-presence";
import AboutAstronisGlobal from "../about-astronis-global";
import OurStory from "../our-story";
import VisionMission from "../vision-mission";
import AboutResources from "../about-resources";
import CoreValues from "../core-values";
const legacySlugs: Record<string, string> = {
  "vision-and-mission": "mission-vision-purpose",
  "core-values": "core-values-professionals-principles",
  leadership: "leadership-professionals",
  "why-choose-us": "why-choose-astronis-global",
};
const canonicalSlug = (slug: string) => legacySlugs[slug] ?? slug;
export function generateStaticParams() {
  return [
    ...siteMenu.about.map((t) => ({ slug: slugify(t) })),
    ...Object.keys(legacySlugs).map((slug) => ({ slug })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = canonicalSlug(slug);
  return {
    title: siteMenu.about.find((t) => slugify(t) === resolvedSlug),
    ...(resolvedSlug === "leadership-professionals" ? {
      description: "Meet the leadership and professionals at Astronis Global, bringing legal, regulatory and commercial insight together with a shared commitment to client service.",
      alternates: { canonical: "/about/leadership-professionals" },
    } : {}),
    ...(resolvedSlug === "core-values-professionals-principles" ? {
      description: "Explore the core values and professional principles that guide Astronis Global: integrity, client commitment, excellence and responsible advisory.",
      alternates: { canonical: "/about/core-values-professionals-principles" },
    } : {}),
    ...(resolvedSlug === "mission-vision-purpose" ? {
      description: "Discover Astronis Global’s purpose, vision and mission, and the principles that guide our commitment to clients, people and a better tomorrow.",
      alternates: { canonical: "/about/mission-vision-purpose" },
    } : {}),
    ...(resolvedSlug === "our-story" ? {
      description: "Discover the Astronis Global story: a journey from a focused legal practice to integrated corporate, regulatory and business advisory, shaped by purpose and lasting partnerships.",
      alternates: { canonical: "/about/our-story" },
    } : {}),
    ...(resolvedSlug === "about-astronis-global" ? {
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
  const resolvedSlug = canonicalSlug(slug);
  const title = siteMenu.about.find((t) => slugify(t) === resolvedSlug);
  if (!title) notFound();
  if (resolvedSlug === "about-astronis-global") return <AboutAstronisGlobal />;
  if (resolvedSlug === "our-story") return <OurStory />;
  if (resolvedSlug === "core-values-professionals-principles") return <CoreValues />;
  if (resolvedSlug === "leadership-professionals") return <LeadershipPage />;
  if (resolvedSlug === "mission-vision-purpose") return <VisionMission />;
  return (
    <>
      <Banner title={title} eyebrow="About Us" />
      {resolvedSlug === "why-choose-astronis-global" ? (
        <Values />
      ) : resolvedSlug === "global-reach" || resolvedSlug === "india-presence" ? (
        <GlobalPresence />
      ) : resolvedSlug === "careers" ? (
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
