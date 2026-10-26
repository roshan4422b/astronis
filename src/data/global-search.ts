import { industries, countries, slugify, siteMenu } from "@/content/site";
import { services } from "@/data/services";

export type SearchCategory = "Service" | "Industry" | "Professional" | "Form" | "Agreement" | "Insight" | "Other";
export type SearchEntry = { title: string; href: string; category: SearchCategory; description?: string; keywords?: string[] };

const serviceEntries: SearchEntry[] = services.flatMap((service): SearchEntry[] => {
  const root = `/services/${service.canonicalSlug}`;
  return [
    { title: service.title, href: root, category: "Service", description: service.shortDescription },
    ...service.subServices.flatMap((group) => {
      const groupHref = `${root}/${group.slug}`;
      return [
        { title: group.title, href: groupHref, category: "Service" as const, description: `Explore ${group.title} under ${service.title}.`, keywords: [service.title] },
        ...group.children.map((child) => ({
          title: child,
          href: group.childRoutes?.[child] ?? `${groupHref}/${slugify(child)}`,
          category: "Service" as const,
          description: `${child} services within ${group.title}.`,
          keywords: [service.title, group.title],
        })),
      ];
    }),
  ];
});

const industryEntries: SearchEntry[] = industries.map((industry) => ({
  title: industry.title, href: `/industries/${industry.slug}`, category: "Industry",
  description: `Advisory services and industry experience for ${industry.title.toLowerCase()}.`,
}));

const professionalEntries: SearchEntry[] = [
  ["Our Professionals", "/professionals", "Leadership and professional team information."],
  ["Leadership Team", "/professionals/leadership-team", "Meet the Astronis Global leadership team."],
  ["Corporate Advisory Professionals", "/professionals/corporate-advisory", "Professionals supporting corporate advisory matters."],
  ["Experts by Industry", "/professionals/industry-and-subject-matter-experts", "Find expertise by industry and subject matter."],
  ["Experts by Service", "/professionals/experts-by-service", "Find expertise across service areas."],
  ["Experts by Jurisdiction", "/professionals/experts-by-jurisdiction", "Explore professionals and expertise by jurisdiction."],
].map(([title, href, description]) => ({ title, href, category: "Professional" as const, description })).concat([
  { title: "Krishna Kumar Mishra", href: "/professionals/krishna-kumar-mishra", category: "Professional" as const, description: "Founder Partner — corporate, commercial and regulatory advisory." },
  { title: "Priti Mishra", href: "/professionals/priti-mishra", category: "Professional" as const, description: "Founder Partner — litigation, matrimonial matters and compliance." },
  { title: "Krishna Nand Mishra", href: "/professionals/krishna-nand-mishra", category: "Professional" as const, description: "Professional team — legal, regulatory and business advisory." },
  { title: "Puneet Kumar Verma", href: "/professionals/puneet-kumar-verma", category: "Professional" as const, description: "Professional team — legal, regulatory and business advisory." },
]);

const formEntries: SearchEntry[] = [
  { title: "Contact & General Enquiry Form", href: "/contact#enquiry-form", category: "Form", description: "Send a general enquiry to Astronis Global.", keywords: ["contact form", "get in touch"] },
  { title: "Professional Enquiry", href: "/professionals/enquiry", category: "Form", description: "Connect with an Astronis professional.", keywords: ["consultation", "professional consultation"] },
  { title: "Technology Solutions Enquiry", href: "/technology-and-digital-solutions#enquiry", category: "Form", description: "Discuss technology and digital solutions." },
  { title: "Schedule a Meeting", href: "/contact", category: "Form", description: "Request a meeting with the Astronis team.", keywords: ["consultation", "appointment"] },
];

const agreementEntries: SearchEntry[] = [
  ["Privacy Policy", "/legal/privacy-policy"], ["Website Disclaimer", "/legal/disclaimer"],
  ["Terms of Use", "/legal/terms-of-use"], ["Cookie Policy", "/legal/cookie-policy"],
  ["Enquiry, Communication & Consultation Consent Agreement", "/legal/enquiry-communication-consultation-consent"],
  ["Client Testimonial Consent", "/legal/client-testimonial-consent"],
  ["Career & Professional Partnership Consent", "/legal/career-professional-partnership-consent"],
  ["Accessibility Statement", "/legal/accessibility"],
].map(([title, href]) => ({ title, href, category: "Agreement" as const, description: `${title} for Astronis Global website visitors.` }));

const insightEntries: SearchEntry[] = (siteMenu.insights as string[]).map((title) => {
  const href = title === "FAQs" ? "/faqs" : title === "Success Stories" || title === "Case Studies" ? "/success-stories" : `/insights/${slugify(title)}`;
  return { title, href, category: title === "FAQs" ? "Other" : "Insight", description: `Explore Astronis Global ${title.toLowerCase()}.` };
});

const otherEntries: SearchEntry[] = [
  { title: "About Astronis Global", href: "/about", category: "Other", description: "Learn about the company, its approach and values." },
  { title: "FAQs", href: "/faqs", category: "Other", description: "Answers to common questions about Astronis Global." },
  { title: "Global Presence", href: "/global-presence", category: "Other", description: "Explore Astronis Global's international network." },
  { title: "Knowledge Centre", href: "/knowledge-centre", category: "Other", description: "Browse business resources and reference materials." },
  { title: "Business Tools", href: "/business-tools", category: "Other", description: "Explore practical business tools and calculators." },
  { title: "Our Clients", href: "/clients", category: "Other", description: "Learn about organisations Astronis supports." },
  ...countries.map((country) => ({ title: `${country} Global Presence`, href: `/global-presence/${slugify(country)}`, category: "Other" as const, description: `International business and advisory information for ${country}.` })),
];

export const searchIndex: SearchEntry[] = [...serviceEntries, ...industryEntries, ...professionalEntries, ...formEntries, ...agreementEntries, ...insightEntries, ...otherEntries];

export function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/m\s*&\s*a/g, "mergers acquisitions").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}

export function searchSite(query: string, category?: string) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const terms = normalized.split(/\s+/).filter((term) => term !== "and");
  return searchIndex.map((entry, order) => {
    if (category && category !== "All" && entry.category !== category) return null;
    const title = normalizeSearch(entry.title);
    const body = normalizeSearch([entry.description, ...(entry.keywords ?? []), entry.category].join(" "));
    if (!terms.every((term) => title.includes(term) || body.includes(term))) return null;
    const score = terms.reduce((sum, term) => sum + (title === term ? 12 : title.startsWith(term) ? 7 : title.includes(term) ? 4 : 0) + (body.includes(term) ? 1 : 0), 0);
    return { entry, score, order };
  }).filter((result): result is { entry: SearchEntry; score: number; order: number } => result !== null)
    .sort((a, b) => b.score - a.score || a.order - b.order).map(({ entry }) => entry);
}
