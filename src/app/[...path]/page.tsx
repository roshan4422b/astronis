import { notFound } from "next/navigation";
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
  return { title: resolve((await params).path) };
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const title = resolve(path);
  if (!title) notFound();
  return (
    <>
      <Banner
        title={title}
        text="Resources and support from Astronis Global."
        image="/Part-18 .png"
      />
      <section className="section">
        <div className="container narrow empty-state">
          <h2>
            {path[0] === "business-tools"
              ? "Discuss your requirements"
              : "Stay connected with Astronis Global"}
          </h2>
          <p>
            {path[0] === "business-tools"
              ? "This online tool is not available yet. Our team can discuss your requirements and the appropriate next steps."
              : "There are no published items in this section yet. Contact our team for information about this resource."}
          </p>
          <Button href="/contact">Contact Our Team</Button>
          <div className="center">
            <TextLink href={"/" + path[0]}>Back to All Resources</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
