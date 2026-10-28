import { industries, practices, countries, siteMenu } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { professionals } from "@/app/professionals/leadership";
import { corporateArticles } from "@/content/corporate-articles";
import { corporateAdvisoryInsights } from "@/content/corporate-advisory-insights";
import { regulatoryInsights } from "@/content/regulatory-insights";
import { businessAdvisoryInsights } from "@/content/business-advisory-insights";
import { legalAdvisoryInsights } from "@/content/legal-advisory-insights";
import { priorityInsights } from "@/content/priority-insights";
import { rbiNbfcInsights } from "@/content/rbi-nbfc-insights";

type Collection =
  | "pages"
  | "services"
  | "industries"
  | "professionals"
  | "global-presence"
  | "technology"
  | "insights"
  | "testimonials"
  | "seo";

export type SourceContentRecord = {
  id: string;
  collection: Collection;
  slug: string;
  status: string;
  data: Record<string, unknown> & { sourceDefined: true };
  metadata: Record<string, unknown>;
  created_at: null;
  updated_at: null;
  source_defined: true;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function record(
  collection: Collection,
  slug: string,
  data: Record<string, unknown>,
  status = "published",
): SourceContentRecord {
  return {
    id: `source:${collection}:${slug}`,
    collection,
    slug,
    status,
    data: { ...data, sourceDefined: true },
    metadata: {},
    created_at: null,
    updated_at: null,
    source_defined: true,
  };
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function articleContent(value: unknown): string {
  const article = asObject(value);
  if (typeof article.content === "string") return article.content;
  if (!Array.isArray(article.sections)) return "";
  return article.sections
    .map((section) => {
      if (!Array.isArray(section)) return "";
      const [heading, body] = section;
      return [asText(heading), asText(body)].filter(Boolean).join("\n");
    })
    .filter(Boolean)
    .join("\n\n");
}

const insightSources: readonly (readonly unknown[])[] = [
  corporateArticles,
  corporateAdvisoryInsights,
  regulatoryInsights,
  businessAdvisoryInsights,
  legalAdvisoryInsights,
  priorityInsights,
  rbiNbfcInsights,
];

const pageSources = [
  { title: "Home", path: "/", category: "Main website" },
  { title: "About Astronis", path: "/about", category: "Company" },
  { title: "Services", path: "/services", category: "Services" },
  { title: "Industries", path: "/industries", category: "Company" },
  { title: "Professionals", path: "/professionals", category: "Company" },
  { title: "Insights & Events", path: "/insights-events", category: "Insights" },
  { title: "Global Presence", path: "/global-presence", category: "Global" },
  { title: "Technology & Digital Solutions", path: "/technology-and-digital-solutions", category: "Technology" },
  { title: "Contact", path: "/contact", category: "Contact" },
];

const pageMetadata: Record<string, { title: string; description: string; canonical: string }> = {
  "/": {
    title: "Astronis Global | Corporate, Regulatory & Business Advisory",
    description: "Strategic legal, regulatory and business advisory solutions. Pan-India presence and global perspective to navigate complexity, mitigate risk and accelerate growth.",
    canonical: "/",
  },
  "/services": {
    title: "Corporate, Legal, Regulatory & Business Advisory Services | Astronis",
    description: "Explore Astronis advisory services across corporate law, regulatory compliance, business strategy, licensing, intellectual property, FEMA, taxation, banking, technology, risk, ESG and cross-border matters.",
    canonical: "/services",
  },
  "/industries": {
    title: "Industries",
    description: "Explore sector-focused legal, regulatory and business advisory across 24 industries.",
    canonical: "/industries",
  },
  "/professionals": {
    title: "Our Professionals",
    description: "",
    canonical: "/professionals",
  },
  "/insights": {
    title: "Insights & Resources",
    description: "",
    canonical: "/insights",
  },
  "/global-presence": {
    title: "Global Presence & International Advisory Network | Astronis",
    description: "Explore Astronis Global's international advisory network across India, UAE, Singapore, UK, USA, Europe and the Middle East, supporting cross-border investment, India entry, overseas expansion and international business requirements.",
    canonical: "/global-presence",
  },
  "/technology-and-digital-solutions": {
    title: "Technology & Digital Solutions",
    description: "Integrated technology, legal, regulatory and business expertise. Explore digital business solutions, RegTech, legal technology, data and automation.",
    canonical: "/technology-and-digital-solutions",
  },
};

export function getSourceContentRecords(collection?: string): SourceContentRecord[] {
  const records: SourceContentRecord[] = [];

  for (const page of pageSources) {
    const slug = page.path === "/" ? "home" : page.path.slice(1);
    const seo = pageMetadata[page.path];
    records.push(
      record("pages", slug, {
        title: page.title,
        category: page.category,
        description: seo?.description ?? "",
        content: "",
        sourcePath: page.path,
        seoTitle: seo?.title ?? "",
        seoDescription: seo?.description ?? "",
        canonicalUrl: seo?.canonical ?? page.path,
      }),
    );
  }

  for (const practice of practices) {
    records.push(
      record("services", practice.canonicalSlug, {
        title: practice.title,
        category: practice.category,
        description: practice.description,
        content: practice.description,
        featuredImage: practice.heroImage,
        seoTitle: "",
        seoDescription: practice.description,
        sourcePath: `/services/${practice.canonicalSlug}`,
      }),
    );
  }

  for (const industry of industries) {
    records.push(
      record("industries", industry.slug, {
        title: industry.title,
        category: "Industry directory",
        description: "",
        content: "",
        featuredImage: industry.image,
        sourcePath: `/industries/${industry.slug}`,
      }),
    );
  }

  for (const person of professionals) {
    records.push(
      record("professionals", person.slug, {
        title: person.name,
        category: person.role,
        designation: person.role,
        expertise: person.expertise,
        description: person.description,
        content: person.description,
        featuredImage: person.image,
        education: person.education,
        enrolment: person.enrolment,
        sourcePath: `/professionals/${person.slug}`,
      }),
    );
  }

  for (const title of [...new Set([...countries, ...siteMenu.global])]) {
    const slug = slugify(title);
    records.push(
      record("global-presence", slug, {
        title,
        category: "Jurisdiction",
        jurisdiction: title,
        description: "",
        content: "",
        sourcePath: `/global-presence/${slug}`,
      }),
    );
  }

  const technologySources = [
    { title: "Digital Business Solutions", category: "Digital solutions", slug: "digital-business-solutions", description: "Streamline operations, enhance efficiency and enable growth through technology.", featuredImage: "/Technology, IT & ITES .png" },
    { title: "RegTech & Compliance Technology", category: "RegTech", slug: "regtech-and-compliance-technology", description: "Stay ahead of regulatory change with intelligent compliance solutions.", featuredImage: "/hero_section.png" },
    { title: "Legal Technology", category: "Legal technology", slug: "legal-technology", description: "Simplify legal operations with innovative tools and workflows.", featuredImage: "/Part-14 .png" },
    { title: "Data, AI & Automation", category: "Emerging technology", slug: "data-ai-and-automation", description: "Transform data into insights and drive smarter decisions.", featuredImage: "/Banner - Indus - Artificial Intelligence .png" },
  ];
  for (const technology of technologySources) {
    records.push(
      record("technology", technology.slug, {
        ...technology,
        content: "",
        sourcePath: `/technology-and-digital-solutions/${technology.slug}`,
      }),
    );
  }

  const seenInsights = new Set<string>();
  for (const source of insightSources) {
    for (const value of source) {
      const article = asObject(value);
      const slug = asText(article.slug);
      const title = asText(article.title);
      if (!slug || !title || seenInsights.has(slug)) continue;
      seenInsights.add(slug);
      records.push(
        record("insights", slug, {
          ...article,
          title,
          category: asText(article.category) || "Insights",
          description: asText(article.excerpt) || asText(article.description),
          content: articleContent(article),
          author: asText(article.author) || "Editorial team",
          featuredImage: asText(article.image) || asText(article.featuredImage),
          seoTitle: asText(article.seoTitle) || title,
          seoDescription: asText(article.seoDescription) || asText(article.excerpt) || asText(article.description),
          sourcePath: `/insights/${slug}`,
        }),
      );
    }
  }

  for (const testimonial of testimonials) {
    if (testimonial.status !== "approved" || !testimonial.publicationConsent) continue;
    records.push(
      record("testimonials", testimonial.id, {
        id: testimonial.id,
        name: testimonial.name,
        company: testimonial.company,
        designation: testimonial.designation ?? "",
        service: testimonial.service,
        text: testimonial.quote ?? "",
        excerpt: testimonial.quote ?? "",
        rating: testimonial.rating ?? 0,
        videoUrl: testimonial.videoUrl ?? "",
        duration: testimonial.duration ?? "",
        consent: true,
        identityPublicationConsent: true,
        sourcePath: "/testimonials",
      }),
    );
  }

  return collection ? records.filter((item) => item.collection === collection) : records;
}

export function getSourceSeoRecords(): SourceContentRecord[] {
  return Object.entries(pageMetadata).map(([path, metadata]) =>
    record("seo", path === "/" ? "home" : path.slice(1).replaceAll("/", "-"), {
      title: metadata.title,
      seoTitle: metadata.title,
      seoDescription: metadata.description,
      canonicalUrl: metadata.canonical,
      robotsIndex: true,
      robotsFollow: true,
      sourcePath: path,
    }),
  );
}
