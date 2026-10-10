export type ChildServiceContent = {
  paragraphs: [string, string];
  covers: string[];
  when: string;
  considerations: string;
  assistance: string;
};

export type DetailedChildService = ChildServiceContent & { title: string; slug: string };
export type DetailedServiceGroup = {
  seoTitle?: string;
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  introduction: string;
  image: string;
  icon: string;
  cta: string;
  badges: string[];
  children: DetailedChildService[];
  faqs: { question: string; answer: string }[];
};

export type ServicePractice = {
  seoTitle?: string;
  heroEyebrow?: string;
  introEyebrow?: string;
  visual?: "regulatory";
  darkGroupIndex?: number;
  knowledgeCTA?: string;
  knowledgeLinks?: {title: string; href: string}[];
  finalSecondaryCTA?: string;
  title: string;
  slug: string;
  heroImage: string;
  description: string;
  heroStatement: string;
  introHeading: string;
  introduction: string;
  lifecycle: string[];
  badges: string[];
  groups: DetailedServiceGroup[];
  knowledgeTitle: string;
  enquiryHeading: string;
  finalHeading: string;
  finalDescription: string;
  relatedSlugs: string[];
  expertSlugs?: string[];
};

export const serviceAnchor = (title: string) => title.toLowerCase()
  .replace(/\([^)]*\)/g, "")
  .replace(/&/g, " ")
  .replace(/'/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

export const practicePath = (practice: Pick<ServicePractice, "slug">) => `/services/${practice.slug}`;
export const groupPath = (practice: Pick<ServicePractice, "slug">, group: Pick<DetailedServiceGroup, "slug">) => `${practicePath(practice)}/${group.slug}`;
