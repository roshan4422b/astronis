import { notFound } from "next/navigation";
import { practices, serviceGroups, slugify } from "@/content/site";
import { Banner } from "../../_components/ui";
import Overview from "./overview";
function resolve(slugs: string[]) {
  const group = serviceGroups.find((g) => g.slug === slugs[0]);
  const practice = practices.find((p) => p.slug === slugs[0]);
  if (slugs.length > 2 || (!group && !practice)) return null;
  const item =
    slugs.length === 2
      ? group?.items.find((i) => slugify(i) === slugs[1])
      : undefined;
  if (slugs.length === 2 && !item) return null;
  const title = item || group?.title || practice!.title;
  return {
    title,
    description: item
      ? `${title} support as part of our ${group!.title.toLowerCase()} practice. Connect with Astronis Global to discuss your business needs.`
      : practice?.description ||
        `Business-focused support across ${title.toLowerCase()}, with legal, regulatory and commercial perspective.`,
    group: slugs[0],
    items: item ? [] : group?.items || [],
  };
}
export function generateStaticParams() {
  return [
    ...serviceGroups.flatMap((g) => [
      { slug: [g.slug] },
      ...g.items.map((i) => ({ slug: [g.slug, slugify(i)] })),
    ]),
    ...practices
      .filter((p) => !serviceGroups.some((g) => g.slug === p.slug))
      .map((p) => ({ slug: [p.slug] })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const data = resolve((await params).slug);
  return { title: data?.title || "Service", description: data?.description };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const data = resolve((await params).slug);
  if (!data) notFound();
  return (
    <>
      <Banner title={data.title} text={data.description} eyebrow="Services" />
      <Overview {...data} />
    </>
  );
}
