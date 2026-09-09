import { notFound } from "next/navigation";
import { industries } from "@/content/site";
import { Banner } from "../../_components/ui";
import Overview from "./overview";
import Consultation from "../../home/consultation";
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: industries.find((i) => i.slug === slug)?.title };
}
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = industries.find((i) => i.slug === slug);
  if (!item) notFound();
  return (
    <>
      <Banner
        title={item.title}
        image={item.image}
        text="Legal, regulatory and business advisory for your sector."
        eyebrow="Industries"
      />
      <Overview title={item.title} />
      <Consultation />
    </>
  );
}
