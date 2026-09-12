import { notFound } from "next/navigation";
import { insightCategories, siteMenu, slugify } from "@/content/site";
import { Banner, Button, TextLink } from "../../_components/ui";
import { corporateArticles } from "@/content/corporate-articles";
const categories = [...new Set([...siteMenu.insights, ...insightCategories])];
export function generateStaticParams() {
  return [...categories.map((t) => ({ slug: slugify(t) })), ...corporateArticles.map(a => ({ slug: a.slug }))];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = corporateArticles.find(a => a.slug === slug);
  return { title: article?.title || categories.find((t) => slugify(t) === slug), description: article?.excerpt };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = corporateArticles.find(a => a.slug === slug);
  if (article) return <><Banner title={article.title} text={article.excerpt} image={article.image} eyebrow="Corporate & Commercial Insights" /><article className="section"><div className="container narrow"><TextLink href="/services/corporate-advisory">Corporate & Commercial Services</TextLink>{article.sections.map(([heading, text]) => <section key={heading} style={{ marginBlock: 32 }}><h2 style={{ fontSize: 28, marginBottom: 14 }}>{heading}</h2><p>{text}</p></section>)}<Button href="/contact">Discuss Your Requirements</Button></div></article></>;
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
