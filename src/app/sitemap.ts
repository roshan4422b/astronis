import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getSourceContentRecords } from "@/lib/cms/source-content";
import { getPublishedContent } from "@/lib/supabase/server";

const childSlug = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.astronisglobal.com";
  const existingEntries: MetadataRoute.Sitemap = [
    ...getSourceContentRecords()
      .map((record) => record.data.sourcePath)
      .filter((path): path is string => typeof path === "string")
      .map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...services.flatMap(service => {
      const root = `/services/${service.canonicalSlug}`;
      return [
        { url: `${base}${root}`, changeFrequency: "monthly" as const, priority: 0.8 },
        ...service.subServices.flatMap(group => {
          const groupPath = `${root}/${group.slug}`;
          return group.children.map(child => ({ url: `${base}${group.childRoutes?.[child] || `${groupPath}/${childSlug(child)}`}`, changeFrequency: "monthly" as const, priority: 0.6 }));
        }),
      ];
    }),
  ];
  const sections = [
    ["services", "/services"],
    ["industries", "/industries"],
    ["professionals", "/professionals"],
    ["global-presence", "/global-presence"],
    ["technology", "/technology-and-digital-solutions"],
    ["insights", "/insights"],
  ] as const;
  const publishedEntries = await Promise.all(
    sections.map(async ([collection, route]) =>
      (await getPublishedContent(collection)).map(({ slug }) => ({
        url: `${base}${route}/${slug}`,
        changeFrequency: "monthly" as const,
        priority: collection === "insights" ? 0.6 : 0.7,
      })),
    ),
  );
  const urls = new Set(existingEntries.map(({ url }) => url));
  return [
    ...existingEntries,
    ...publishedEntries.flat().filter(({ url }) => {
      if (urls.has(url)) return false;
      urls.add(url);
      return true;
    }),
  ];
}
