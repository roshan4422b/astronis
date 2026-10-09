import { services } from "./services";
import type { DetailedServiceGroup, ServicePractice } from "./service-detail-types";

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function createGroups(service: (typeof services)[number]): DetailedServiceGroup[] {
  return service.subServices.map((group) => {
    const coveredServices = group.children.join(", ");
    return {
      seoTitle: `${group.title} | ${service.title} | Astronis`,
      title: group.title,
      slug: group.slug,
      shortTitle: group.title,
      description: `Explore ${group.title.toLowerCase()} support${coveredServices ? `, including ${coveredServices}` : ""}.`,
      introduction: `This service group brings together ${group.title.toLowerCase()} requirements within ${service.title.toLowerCase()}.`,
      image: service.image,
      icon: service.icon,
      cta: `Explore ${group.title}`,
      badges: group.children.slice(0, 4),
      children: group.children.map((title) => ({
        title,
        slug: slugify(title),
        paragraphs: [
          `Support for ${title.toLowerCase()} within ${group.title.toLowerCase()}.`,
          "The appropriate scope and requirements depend on the business activity and the facts of the matter.",
        ],
        covers: [],
        when: `When ${title.toLowerCase()} support may be relevant depends on the business context and applicable requirements.`,
        considerations: "Scope, documentation and regulatory requirements should be confirmed for the specific matter.",
        assistance: "Contact our team to discuss the requirement and identify the appropriate advisory support.",
      })),
      faqs: [],
    };
  });
}

const connectedServices = services.map((service, index): ServicePractice => {
  const related = [services[index - 1], services[index + 1]].filter(Boolean);
  return {
    title: service.title,
    slug: service.canonicalSlug,
    seoTitle: `${service.title} | Astronis`,
    description: service.shortDescription,
    heroStatement: service.shortDescription,
    introHeading: `Connected advice for ${service.title.toLowerCase()}`,
    introduction: service.shortDescription,
    lifecycle: ["Assess", "Structure", "Implement", "Review"],
    badges: service.subServices.map(group => group.title),
    groups: createGroups(service),
    knowledgeTitle: `${service.title} Knowledge Centre`,
    enquiryHeading: `Discuss your ${service.title.toLowerCase()} requirement`,
    finalHeading: `Need support with ${service.title.toLowerCase()}?`,
    finalDescription: "Share your requirements and our team will connect you with the appropriate advisory support.",
    relatedSlugs: related.map(item => item.canonicalSlug),
  };
});

export const servicePractices = connectedServices;

const getPractice = (slug: string) => servicePractices.find(practice => practice.slug === slug)!;

export const corporateCommercial = servicePractices.find(
  practice => practice.slug === "corporate-commercial-advisory",
)!;
export const bankingRbiFinancialServices = getPractice("banking-insolvency-restructuring-advisory");
export const businessAdvisoryConsulting = getPractice("business-advisory-contracts");
export const femaFdiCrossBorder = getPractice("fema-fdi-cross-border");
export const hrEmploymentLabour = getPractice("industrial-employment-forensics-advisory");
export const insolvencyRestructuring = bankingRbiFinancialServices;
export const intellectualProperty = getPractice("intellectual-property-right-services");
export const licensingRegistrations = getPractice("licensing-registrations");
export const litigationDisputeResolution = getPractice("litigation-dispute-resolution");
export const taxationCompliance = getPractice("taxation-compliance");

export function resolvePractice(slugs: string[]) {
  if (slugs.length !== 1) return null;
  const practice = servicePractices.find(item => item.slug === slugs[0]);
  return practice ? { practice, group: undefined } : null;
}
