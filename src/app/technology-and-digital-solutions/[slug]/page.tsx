import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedContent, getPublishedContentMetadata } from "@/lib/supabase/server";
import CmsContentPage from "@/app/_components/cms-content-page";

export const dynamic = "force-dynamic";

async function findRecord(slug: string) {
  return (await getPublishedContent("technology")).find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = await findRecord(slug);
  return record
    ? getPublishedContentMetadata(record, `/technology-and-digital-solutions/${record.slug}`)
    : {};
}

export default async function TechnologyCmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = await findRecord(slug);
  if (!record) notFound();
  return <CmsContentPage record={record} eyebrow="Technology & Digital Solutions" />;
}
