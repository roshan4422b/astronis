import { notFound } from "next/navigation";
import { stories } from "@/content/site";
import { Banner } from "../../_components/ui";
import CaseStudy from "./case-study";
export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: stories.find((s) => s.slug === slug)?.title };
}
export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
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
