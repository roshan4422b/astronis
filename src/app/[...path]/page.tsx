import { siteMenu, slugify } from "@/content/site";
import { Banner, Button, TextLink } from "../_components/ui";
const groups: Record<string, string[]> = {
  resources: siteMenu.resources,
  media: siteMenu.media,
  "knowledge-centre": siteMenu.knowledgeTools,
  "business-tools": siteMenu.businessTools,
};
function resolve(path: string[]) {
  return path.length === 2
    ? groups[path[0]]?.find((t) => slugify(t) === path[1])
    : undefined;
}
function readablePath(path: string[]) {
  return path.map(segment => segment.replace(/[-_]+/g, " ").replace(/\b\w/g, letter => letter.toUpperCase())).join(" / ");
}
export function generateStaticParams() {
  return Object.entries(groups).flatMap(([base, items]) =>
    items.map((t) => ({ path: [base, slugify(t)] })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const path = (await params).path;
  return { title: resolve(path) || readablePath(path) };
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const title = resolve(path) || readablePath(path);
  return (
    <>
      <Banner
        title={title}
        text="Resources and support from Astronis Global."
        image="/Part-18 .png"
      />
      <section className="section">
        <div className="container narrow empty-state">
          <span className="eyebrow">UNDER DEVELOPMENT</span>
          <h2>{title}</h2>
          <p>
            This page is being prepared. Contact our team to discuss your requirements and the next steps.
          </p>
          <Button href="/contact">Contact Our Team</Button>
          <div className="center">
            <TextLink href={"/" + path[0]}>Back to {readablePath([path[0]])}</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
