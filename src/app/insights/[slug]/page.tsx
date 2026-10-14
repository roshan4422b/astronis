import { notFound } from "next/navigation";
import { insightCategories, siteMenu, slugify } from "@/content/site";
import { Banner, Button, TextLink } from "../../_components/ui";
import { corporateArticles } from "@/content/corporate-articles";
import { corporateAdvisoryInsights } from "@/content/corporate-advisory-insights";
import { regulatoryInsights } from "@/content/regulatory-insights";
import { businessAdvisoryInsights } from "@/content/business-advisory-insights";
import { legalAdvisoryInsights } from "@/content/legal-advisory-insights";
import { priorityInsights } from "@/content/priority-insights";
import { rbiNbfcInsights } from "@/content/rbi-nbfc-insights";
import GstUpdates from "../gst-updates";
import McaUpdates from "../mca-updates";
import StartupUpdates from "../startup-updates";
import ComplianceCalendar from "../compliance-calendar";
import UsefulDocuments from "../useful-documents";
import SebiUpdates from "../sebi-updates";
import BusinessUpdates from "../business-updates";
import LegalUpdates from "../legal-updates";
import ArticlesAndResources from "../articles-and-resources";
const categories = [...new Set([...siteMenu.insights, ...insightCategories])];
export function generateStaticParams() {
  return [
    ...categories.filter((t) => slugify(t) !== "government-notifications").map((t) => ({ slug: slugify(t) })),
    { slug: "articles" },
    { slug: "blogs" },
    { slug: "startup-news" },
    { slug: "download-useful-documents" },
    ...corporateArticles.map((article) => ({ slug: article.slug })),
    ...corporateAdvisoryInsights.map((article) => ({ slug: article.slug })),
    ...regulatoryInsights.map((article) => ({ slug: article.slug })),
    ...businessAdvisoryInsights.map((article) => ({ slug: article.slug })),
    ...legalAdvisoryInsights.map((article) => ({ slug: article.slug })),
    ...priorityInsights.map((article) => ({ slug: article.slug })),
    ...rbiNbfcInsights.map((article) => ({ slug: article.slug })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = corporateArticles.find(a => a.slug === slug);
  const advisoryInsight = corporateAdvisoryInsights.find((item) => item.slug === slug);
  const regulatoryInsight = regulatoryInsights.find((item) => item.slug === slug);
  const businessAdvisoryInsight = businessAdvisoryInsights.find((item) => item.slug === slug);
  const legalAdvisoryInsight = legalAdvisoryInsights.find((item) => item.slug === slug);
  const priorityInsight = priorityInsights.find((item) => item.slug === slug);
  const rbiNbfcInsight = rbiNbfcInsights.find((item) => item.slug === slug);
  if (["articles-and-resources", "articles", "blogs"].includes(slug)) {
    return { title: "Articles & Resources", description: "Articles, analysis and practical resources from Astronis Global." };
  }
  if (slug === "gst-updates") return { title: "GST Updates", description: "GST filing, notifications, returns, compliance updates and practical indirect tax guidance from Astronis Global." };
  if (slug === "mca-updates") return { title: "MCA Updates", description: "MCA notifications, circulars, Companies Act amendments, compliance updates and company law insights from Astronis Global." };
  if (slug === "start-up-and-msme-updates" || slug === "startup-news") return { title: "Start-Up and MSME Updates", description: "Start-up and MSME policy updates, schemes, notifications, compliance information and business insights from Astronis Global." };
  if (slug === "compliance-calendar") return { title: "Compliance Calendar", description: "Important compliance deadlines for MCA, GST, Income Tax and other regulatory laws from Astronis Global." };
  if (slug === "download-useful-documents") return { title: "Download – Useful Documents", description: "Ready-to-use legal, corporate and regulatory document templates from Astronis Global." };
  if (slug === "sebi-updates") return { title: "SEBI Updates", description: "SEBI developments, market insights and regulatory impact from Astronis Global." };
  if (slug === "legal-updates") return { title: "Legal Updates", description: "Timely updates on laws, regulations, notifications and judicial developments affecting businesses and stakeholders." };
  if (slug === "business-updates") return { title: "Business Updates", description: "Business, regulatory and policy developments affecting decision-making, compliance and growth across sectors." };
  return { title: article?.title || advisoryInsight?.title || regulatoryInsight?.title || businessAdvisoryInsight?.title || legalAdvisoryInsight?.title || priorityInsight?.title || rbiNbfcInsight?.title || categories.find((t) => slugify(t) === slug), description: article?.excerpt || advisoryInsight?.description || (regulatoryInsight ? `Regulatory focus: ${regulatoryInsight.focus}` : businessAdvisoryInsight ? `Business focus: ${businessAdvisoryInsight.focus}` : legalAdvisoryInsight ? `Legal focus: ${legalAdvisoryInsight.focus}` : priorityInsight ? `${priorityInsight.category} priority insight.` : rbiNbfcInsight ? "Banking, RBI & Financial Services insight." : undefined) };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = corporateArticles.find(a => a.slug === slug);
  const advisoryInsight = corporateAdvisoryInsights.find((item) => item.slug === slug);
  const regulatoryInsight = regulatoryInsights.find((item) => item.slug === slug);
  const businessAdvisoryInsight = businessAdvisoryInsights.find((item) => item.slug === slug);
  const legalAdvisoryInsight = legalAdvisoryInsights.find((item) => item.slug === slug);
  const priorityInsight = priorityInsights.find((item) => item.slug === slug);
  const rbiNbfcInsight = rbiNbfcInsights.find((item) => item.slug === slug);
  if (["articles-and-resources", "articles", "blogs"].includes(slug)) return <ArticlesAndResources />;
  if (slug === "gst-updates") return <GstUpdates />;
  if (slug === "mca-updates") return <McaUpdates />;
  if (slug === "start-up-and-msme-updates" || slug === "startup-news") return <StartupUpdates />;
  if (slug === "compliance-calendar") return <ComplianceCalendar />;
  if (slug === "download-useful-documents") return <UsefulDocuments />;
  if (slug === "sebi-updates") return <SebiUpdates />;
  if (slug === "legal-updates") return <LegalUpdates />;
  if (slug === "business-updates") return <BusinessUpdates />;
  if (advisoryInsight) return <><Banner title={advisoryInsight.title} image={advisoryInsight.image} eyebrow="Corporate Advisory" /><article className="section"><div className="container narrow"><p><strong>{advisoryInsight.audience}</strong></p><div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}><TextLink href="/insights/corporate-advisory">All Corporate Advisory Articles</TextLink><Button href="/contact">Discuss Your Requirements</Button></div></div></article></>;
  if (regulatoryInsight) return <><Banner title={regulatoryInsight.title} image="/Banking & Financial Services .png" eyebrow="Regulatory Intelligence" /><article className="section"><div className="container narrow"><p><strong>Regulatory focus: {regulatoryInsight.focus}</strong></p><div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}><TextLink href="/insights/regulatory-intelligence">All Regulatory Insights</TextLink><Button href="/contact">Discuss Your Requirements</Button></div></div></article></>;
  if (businessAdvisoryInsight) return <><Banner title={businessAdvisoryInsight.title} eyebrow="Business Advisory" /><article className="section"><div className="container narrow"><p><strong>Business focus: {businessAdvisoryInsight.focus}</strong></p><div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}><TextLink href="/insights/business-advisory">All Business Advisory Insights</TextLink><Button href="/contact">Discuss Your Requirements</Button></div></div></article></>;
  if (legalAdvisoryInsight) return <><Banner title={legalAdvisoryInsight.title} eyebrow="Legal Advisory & Dispute Resolution" /><article className="section"><div className="container narrow"><p><strong>Focus: {legalAdvisoryInsight.focus}</strong></p><div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}><TextLink href="/insights/legal-advisory-disputes">All Legal Advisory Insights</TextLink><Button href="/contact">Discuss Your Requirements</Button></div></div></article></>;
  if (priorityInsight) return <><Banner title={priorityInsight.title} image={priorityInsight.image} eyebrow={`${priorityInsight.category} Priority Insight`} /><article className="section"><div className="container narrow"><p><strong>{priorityInsight.category}</strong></p><div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}><TextLink href="/insights/priority-insights">All Priority Insights</TextLink><Button href="/contact">Discuss Your Requirements</Button></div></div></article></>;
  if (rbiNbfcInsight) return <><Banner title={rbiNbfcInsight.title} image="/images/services/banking-nbfc-and-financial-services-advisory.webp" eyebrow="Banking, RBI & Financial Services" /><article className="section"><div className="container narrow"><p><strong>Banking, RBI &amp; Financial Services</strong></p><div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 28 }}><TextLink href="/insights/banking-rbi-regulatory">All Banking &amp; RBI Insights</TextLink><Button href="/contact">Discuss Your Requirements</Button></div></div></article></>;
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
