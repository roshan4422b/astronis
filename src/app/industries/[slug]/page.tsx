import { notFound } from "next/navigation";
import { industries } from "@/content/site";
import { Banner } from "../../_components/ui";
import Overview from "./overview";
import Consultation from "../../home/consultation";
import Manufacturing from "../manufacturing";
import RealEstate from "../real-estate";
import Education from "../education";
import Hospitality from "../hospitality";
import Infrastructure from "../infrastructure";
import Automotive from "../automotive";
import Mining from "../mining";
import Telecommunications from "../telecommunications";
import Technology from "../technology";
import Healthcare from "../healthcare";
import Startups from "../startups";
import Logistics from "../logistics";
import MediaEntertainment from "../media-entertainment";
import Government from "../government";
import Textiles from "../textiles";
import Ecommerce from "../e-commerce";
import FinancialServices from "../financial-services";
import Fintech from "../fintech";
import ProfessionalServices from "../professional-services";
import ArtificialIntelligence from "../artificial-intelligence";
import Aviation from "../aviation";
import RetailConsumer from "../retail-consumer";
import RenewableEnergy from "../renewable-energy";
import Agriculture from "../agriculture";
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
  if (slug === "infrastructure") return <Infrastructure />;
  if (slug === "automotive-and-mobility") return <Automotive />;
  if (slug === "mining-metals-and-natural-resources") return <Mining />;
  if (slug === "telecommunications") return <Telecommunications />;
  if (slug === "it-and-ites") return <Technology />;
  if (slug === "healthcare-and-pharma") return <Healthcare />;
  if (slug === "startups") return <Startups />;
  if (slug === "logistics") return <Logistics />;
  if (slug === "media-and-entertainment") return <MediaEntertainment />;
  if (slug === "government-and-public-sector") return <Government />;
  if (slug === "textiles-apparel-and-lifestyle") return <Textiles />;
  if (slug === "e-commerce") return <Ecommerce />;
  if (slug === "financial-services") return <FinancialServices />;
  if (slug === "fintech-and-digital-finance") return <Fintech />;
  if (slug === "professional-and-business-services") return <ProfessionalServices />;
  if (slug === "artificial-intelligence") return <ArtificialIntelligence />;
  if (slug === "aviation-aerospace-and-defence") return <Aviation />;
  if (slug === "retail-and-consumer") return <RetailConsumer />;
  if (slug === "renewable-energy") return <RenewableEnergy />;
  if (slug === "agriculture-and-agri-business") return <Agriculture />;
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
