import { notFound } from "next/navigation";
import { siteMenu, slugify } from "@/content/site";
import { Banner, Button } from "../../_components/ui";
import Story from "../story";
import WhyChooseAstronis from "../why-choose-astronis";
import LeadershipPage from "../leadership-page";
import GlobalPresence from "../../home/global-presence";
import AboutAstronisGlobal from "../about-astronis-global";
import OurStory from "../our-story";
import VisionMission from "../vision-mission";
import AboutResources from "../about-resources";
import CoreValues from "../core-values";
import AstronisDifference from "../astronis-difference";
import IndiaPresence from "../india-presence";
import IntegratedAdvisoryModel from "../integrated-advisory-model";
import InternationalNetwork from "../international-network";
import StrategicInitiatives from "../strategic-initiatives";
const legacySlugs: Record<string, string> = {
  "vision-and-mission": "mission-vision-and-purpose",
  "core-values": "core-values-and-professionals-principles",
  leadership: "leadership-and-professionals",
  "leadership-professionals": "leadership-and-professionals",
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
    ...(resolvedSlug === "why-choose-astronis-global" ? {
      description: "Discover the Astronis difference: integrated expertise, practical advice, transparent communication and lasting business partnerships.",
      alternates: { canonical: "/about/why-choose-astronis-global" },
    } : {}),
    ...(resolvedSlug === "projects-innovation-and-strategic-initiatives" ? {
      description: "Explore Astronis Global's projects, innovation and strategic initiatives supporting business growth, collaboration and sustainable impact.",
      alternates: { canonical: "/about/projects-innovation-and-strategic-initiatives" },
    } : {}),
    ...(resolvedSlug === "global-perspective-and-international-network" ? {
      description: "Explore Astronis Global's international network, cross-border advisory and local insight for businesses pursuing opportunities across markets.",
      alternates: { canonical: "/about/global-perspective-and-international-network" },
    } : {}),
    ...(resolvedSlug === "our-integrated-advisory-model" ? {
      description: "Discover how Astronis Global integrates corporate, regulatory, legal and business advisory to support your business at every stage.",
      alternates: { canonical: "/about/our-integrated-advisory-model" },
    } : {}),
    ...(resolvedSlug === "india-presence" ? {
      description: "Explore Astronis Global’s India presence: a New Delhi office and regional advisory support across key business centres in India.",
      alternates: { canonical: "/about/india-presence" },
    } : {}),
    ...(resolvedSlug === "leadership-and-professionals" ? {
      description: "Meet the leadership and professionals at Astronis Global, bringing legal, regulatory and commercial insight together with a shared commitment to client service.",
      alternates: { canonical: "/about/leadership-and-professionals" },
    } : {}),
    ...(resolvedSlug === "core-values-and-professionals-principles" ? {
      description: "Explore the core values and professional principles that guide Astronis Global: integrity, client commitment, excellence and responsible advisory.",
      alternates: { canonical: "/about/core-values-professionals-principles" },
    } : {}),
    ...(resolvedSlug === "mission-vision-and-purpose" ? {
      description: "Discover Astronis Global’s purpose, vision and mission, and the principles that guide our commitment to clients, people and a better tomorrow.",
      alternates: { canonical: "/about/mission-vision-and-purpose" },
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
  const title = resolvedSlug === "careers" ? "Careers" : siteMenu.about.find((t) => slugify(t) === resolvedSlug);
  if (!title) notFound();
  if (resolvedSlug === "about-astronis-global") return <AboutAstronisGlobal />;
  if (resolvedSlug === "our-story") return <OurStory />;
  if (resolvedSlug === "core-values-and-professionals-principles") return <CoreValues />;
  if (resolvedSlug === "leadership-and-professionals") return <LeadershipPage />;
  if (resolvedSlug === "mission-vision-and-purpose") return <VisionMission />;
  if (resolvedSlug === "the-astronis-difference") return <AstronisDifference />;
  if (resolvedSlug === "india-presence") return <IndiaPresence />;
  if (resolvedSlug === "why-choose-astronis-global") return <WhyChooseAstronis />;
  if (resolvedSlug === "projects-innovation-and-strategic-initiatives") return <StrategicInitiatives />;
  if (resolvedSlug === "global-perspective-and-international-network") return <InternationalNetwork />;
  if (resolvedSlug === "our-integrated-advisory-model") return <IntegratedAdvisoryModel />;
  return (
    <>
      <Banner title={title} eyebrow="About Us" />
      {resolvedSlug === "global-reach" ? (
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
