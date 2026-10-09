import type { Service } from "./services";
import { services } from "./services";

// Practices can belong to several disciplines. Filtering must not hide a
// transaction or regulatory capability merely because its primary label differs.
const normalize = (value: string) => value.toLowerCase().replace(/m\s*&\s*a/g, "mergers acquisitions").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
export function matchesService(service: Service, query: string, category: string) {
  const searchable = normalize([service.title, service.shortDescription, ...service.subServices.flatMap(group => [group.title, ...group.children])].join(" "));
  if (category !== "All" && !searchable.includes(normalize(category))) return false;
  const tokens = normalize(query).split(/\s+/).filter(token => token && token !== "and");
  return tokens.every(token => searchable.includes(token));
}

export type ServiceSearchResult = { title: string; path: string; href: string };

export function searchServiceHierarchy(query: string): ServiceSearchResult[] {
  const tokens = normalize(query).split(/\s+/).filter(token => token && token !== "and");
  if (!tokens.length) return [];
  const results: ServiceSearchResult[] = [];
  for (const service of services) {
    const mainPath = `/services/${service.canonicalSlug}`;
    const mainText = normalize(service.title);
    if (tokens.every(token => mainText.includes(token))) results.push({ title: service.title, path: service.title, href: mainPath });
    for (const group of service.subServices) {
      const groupPath = `${mainPath}/${group.slug}`;
      const groupText = normalize(group.title);
      if (tokens.every(token => groupText.includes(token))) results.push({ title: group.title, path: `${service.title} → ${group.title}`, href: groupPath });
      for (const child of group.children) {
        if (tokens.every(token => normalize(child).includes(token))) results.push({ title: child, path: `${service.title} → ${group.title} → ${child}`, href: `${groupPath}/${child.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` });
      }
    }
  }
  return results;
}
