import { notFound } from "next/navigation";
import { insightCategories, siteMenu, slugify } from "@/content/site";
import { Banner, Button, TextLink } from "../../_components/ui";
const categories = [...new Set([...siteMenu.insights, ...insightCategories])];
export function generateStaticParams() {
  return categories.map((t) => ({ slug: slugify(t) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: categories.find((t) => slugify(t) === slug) };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = categories.find((t) => slugify(t) === slug);
  if (!title) notFound();
  return (
    <>
      <Banner
        title={title}
        eyebrow="Insights & Resources"
        image="/Part-14 .png"
      />
      <section className="section">
        <div className="container narrow empty-state">
          <h2>Stay informed with Astronis Global</h2>
          <p>
            There are no published resources in this category yet. For a
            specific question or requirement, connect with our advisory team.
          </p>
          <Button href="/contact">Ask Our Team</Button>
          <div className="center">
            <TextLink href="/insights">All Insights & Resources</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
