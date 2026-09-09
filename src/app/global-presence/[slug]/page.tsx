import { notFound } from "next/navigation";
import { countries, siteMenu, slugify } from "@/content/site";
import { Banner, Button, TextLink } from "../../_components/ui";
const entries = [...countries, ...siteMenu.global, "Local Insight"];
export function generateStaticParams() {
  return entries.map((t) => ({ slug: slugify(t) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: entries.find((t) => slugify(t) === slug) };
}
export default async function Desk({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = entries.find((t) => slugify(t) === slug);
  if (!title) notFound();
  return (
    <>
      <Banner
        title={countries.includes(title) ? title + " Country Desk" : title}
        text="Cross-border perspective. Jurisdiction-specific understanding."
        image="/Part-9 .png"
      />
      <section className="section">
        <div className="container article-layout">
          <article className="article-copy">
            <h2>Supporting your business across markets</h2>
            <p>
              Astronis Global helps businesses navigate domestic and
              cross-border requirements through legal, regulatory and business
              advisory. Discuss your target market, entity structure and
              transaction requirements with our team.
            </p>
            <h2>Our advisory capabilities</h2>
            <ul>
              {siteMenu.global.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <TextLink href="/services/foreign-investment">
              Explore Foreign Investment Advisory
            </TextLink>
          </article>
          <aside className="article-aside">
            <h3>Connect with the country desk</h3>
            <p>Tell us about your jurisdiction, plans and requirements.</p>
            <Button href="/contact">Get in Touch</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
