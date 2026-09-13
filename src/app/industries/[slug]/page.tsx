import { notFound } from "next/navigation";
import { industries } from "@/content/site";
import { Banner } from "../../_components/ui";
import Overview from "./overview";
import Consultation from "../../home/consultation";
import Manufacturing from "../manufacturing";
import RealEstate from "../real-estate";
import Education from "../education";
import Hospitality from "../hospitality";
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
  if (slug === "manufacturing") return <Manufacturing />;
  if (slug === "real-estate-and-construction") return <RealEstate />;
  if (slug === "education") return <Education />;
  if (slug === "hospitality") return <Hospitality />;
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
