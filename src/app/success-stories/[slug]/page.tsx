import { notFound } from "next/navigation";
import { stories } from "@/content/site";
import { Banner } from "../../_components/ui";
import CaseStudy from "./case-study";
import { featuredCaseStudies } from "@/content/featured-case-studies";

export function generateStaticParams() {
  return [
    ...stories.map((s) => ({ slug: s.slug })),
    ...featuredCaseStudies.map((s) => ({ slug: s.slug })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  const featured = featuredCaseStudies.find((s) => s.slug === slug);
  return {
    title: story?.title || featured?.title || "Success Story",
    description: story?.description || featured?.description,
  };
}
export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  const featured = featuredCaseStudies.find((s) => s.slug === slug);
  if (featured) {
    return (
      <>
        <Banner
          title={featured.title}
          text={featured.category}
          image={featured.image}
          eyebrow="Case Studies & Success Story"
        />
        <section className="section">
          <div className="container narrow">
            <p>{featured.description}</p>
          </div>
        </section>
      </>
    );
  }
  if (!story) notFound();
  return (
    <>
      <Banner
        title={story.title}
        text={story.category}
        image={story.image}
        eyebrow="Success Stories"
      />
      <CaseStudy story={story} />
    </>
  );
}
