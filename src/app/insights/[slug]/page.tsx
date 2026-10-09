import { notFound } from "next/navigation";
import { insightCategories, siteMenu, slugify } from "@/content/site";
import { Banner, Button, TextLink } from "../../_components/ui";
import { corporateArticles } from "@/content/corporate-articles";
import GstUpdates from "../gst-updates";
import McaUpdates from "../mca-updates";
import StartupUpdates from "../startup-updates";
import ComplianceCalendar from "../compliance-calendar";
import UsefulDocuments from "../useful-documents";
import SebiUpdates from "../sebi-updates";
const categories = [...new Set([...siteMenu.insights, ...insightCategories])];
export function generateStaticParams() {
  return [...categories.map((t) => ({ slug: slugify(t) })), { slug: "startup-news" }, { slug: "download-useful-documents" }, ...corporateArticles.map(a => ({ slug: a.slug }))];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = corporateArticles.find(a => a.slug === slug);
  if (slug === "gst-updates") return { title: "GST Updates", description: "GST filing, notifications, returns, compliance updates and practical indirect tax guidance from Astronis Global." };
  if (slug === "mca-updates") return { title: "MCA Updates", description: "MCA notifications, circulars, Companies Act amendments, compliance updates and company law insights from Astronis Global." };
  if (slug === "start-up-and-msme-updates" || slug === "startup-news") return { title: "Start-Up and MSME Updates", description: "Start-up and MSME policy updates, schemes, notifications, compliance information and business insights from Astronis Global." };
  if (slug === "compliance-calendar") return { title: "Compliance Calendar", description: "Important compliance deadlines for MCA, GST, Income Tax and other regulatory laws from Astronis Global." };
  if (slug === "download-useful-documents") return { title: "Download – Useful Documents", description: "Ready-to-use legal, corporate and regulatory document templates from Astronis Global." };
  if (slug === "sebi-updates") return { title: "SEBI Updates", description: "SEBI developments, market insights and regulatory impact from Astronis Global." };
  return { title: article?.title || categories.find((t) => slugify(t) === slug), description: article?.excerpt };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = corporateArticles.find(a => a.slug === slug);
  if (slug === "gst-updates") return <GstUpdates />;
  if (slug === "mca-updates") return <McaUpdates />;
  if (slug === "start-up-and-msme-updates" || slug === "startup-news") return <StartupUpdates />;
  if (slug === "compliance-calendar") return <ComplianceCalendar />;
  if (slug === "download-useful-documents") return <UsefulDocuments />;
  if (slug === "sebi-updates") return <SebiUpdates />;
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
