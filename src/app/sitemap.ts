import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const childSlug = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.astronisglobal.com";
  return [
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
}
