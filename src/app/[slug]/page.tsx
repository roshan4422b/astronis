import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedCmsPage, getPublishedContentMetadata } from "@/lib/supabase/server";
import CmsContentPage from "@/app/_components/cms-content-page";

export const dynamic = "force-dynamic";

async function findPage(slug: string) {
  return getPublishedCmsPage(`/${slug}`);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = await findPage(slug);
  if (!record) return {};
  return getPublishedContentMetadata(
    { slug: record.slug, data: record.data },
    `/${record.slug}`,
  );
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = await findPage(slug);
  if (!record) notFound();
  return <CmsContentPage record={record} eyebrow={String(record.data.category || "Astronis Global")} />;
}
