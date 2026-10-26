import type { ReactNode } from "react";
import CmsContentPage from "@/app/_components/cms-content-page";
import { getPublishedCmsPage } from "@/lib/supabase/server";

export default async function CmsPageRoute({
  path,
  eyebrow,
  children,
}: {
  path: string;
  eyebrow: string;
  children: ReactNode;
}) {
  const record = await getPublishedCmsPage(path);
  return typeof record?.data.content === "string" && record.data.content.trim()
    ? <CmsContentPage record={record} eyebrow={eyebrow} />
    : children;
}
