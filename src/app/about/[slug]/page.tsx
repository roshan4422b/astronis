import { notFound } from "next/navigation";
import { siteMenu, slugify } from "@/content/site";
import { Banner, Button } from "../../_components/ui";
import Story from "../story";
import Values from "../values";
import Leadership from "../../professionals/leadership";
import GlobalPresence from "../../home/global-presence";
export function generateStaticParams() {
  return siteMenu.about.map((t) => ({ slug: slugify(t) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: siteMenu.about.find((t) => slugify(t) === slug) };
}
export default async function AboutDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = siteMenu.about.find((t) => slugify(t) === slug);
  if (!title) notFound();
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
      ) : slug === "mission" || slug === "vision-and-mission" ? (
        <section className="section">
          <div className="container narrow">
            <h2>Our Vision & Mission</h2>
            <p style={{ marginBlock: 25 }}>
              To support businesses through legal insight, regulatory
              understanding and practical commercial perspective. We build
              long-term relationships through integrity, professional excellence
              and responsible advisory.
            </p>
            <Values />
          </div>
        </section>
      ) : (
        <Story />
      )}
    </>
  );
}
