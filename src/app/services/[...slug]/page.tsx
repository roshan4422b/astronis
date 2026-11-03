import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getServiceChildHeroImage, services } from "@/data/services";
import { resolvePractice } from "@/data/service-practices";
import { practicePath, serviceAnchor } from "@/data/service-detail-types";
import { getConsumerRegulatoryDetail } from "@/data/consumer-regulatory-details";
import { getCorporateRegulatoryDetail } from "@/data/corporate-regulatory-details";
import { getBusinessAdvisoryDetail } from "@/data/business-advisory-details";
import { getFemaCrossBorderDetail } from "@/data/fema-cross-border-details";
import { getLicensingRegistrationPage, licensingRegistrationPages } from "@/data/licensing-registration-pages";
import {
  getIntellectualPropertyServicePage,
  getIntellectualPropertyServiceStaticParams,
} from "@/data/intellectual-property-service-pages";
import {
  getAdditionalServiceDetailPage,
  getAdditionalServiceDetailStaticParams,
} from "@/data/additional-service-detail-pages";
import MainServicePage from "../_template/main-service-page";
import ServiceChildPageLayout from "../_template/service-child-page-layout";
import serviceStyles from "../_template/service-template.module.css";
import ServiceChildHero from "../_template/service-child-hero";
import BusinessAdvisoryDetailPage, { businessAdvisoryMetadata } from "../business-advisory-contracts/business-advisory-detail";
import FemaCrossBorderDetailPage, { femaCrossBorderMetadata } from "../fema-fdi-cross-border/fema-cross-border-detail";
import ConsumerRegulatoryDetailPage from "../regulatory-services/consumer-regulatory-detail";
import { regulatoryServices } from "@/data/regulatory-practice";
import EntityFormationPage from "../corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import { getPublishedContent, getPublishedContentMetadata, getUnpublishedSourceContentSlugs } from "@/lib/supabase/server";
import CmsContentPage from "@/app/_components/cms-content-page";
import PrivateStyleAdvisoryPage from "../_template/private-style-advisory-page";
import {
  getPrivateStyleAdvisoryPage,
  getPrivateStyleAdvisoryStaticParams,
} from "@/data/private-style-advisory-pages";
import {
  getReferenceServicePageData,
  getReferenceServicePageMetadata,
} from "@/data/reference-service-pages";
import {
  getRequestedServicePage,
  getRequestedServicePageMetadata,
  getRequestedServicePageStaticParams,
} from "@/data/requested-service-pages";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { commercialContractPages } from "@/data/commercial-contract-pages";
import { contractAndRestructuringPages } from "@/data/contract-and-restructuring-pages";
import { businessStructuringPages } from "@/data/business-structuring-pages";
import { businessReorganisationPages } from "@/data/business-reorganisation-pages";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";
import { contractDraftingPageData } from "../corporate-commercial-advisory/_components/contract-drafting-review-negotiations-page";
export const dynamic = "force-dynamic";

function resolveHierarchy(slugs: string[]) {
  const service = services.find(item => item.canonicalSlug === slugs[0]);
  if (!service || slugs.length < 2 || slugs.length > 3) return null;
  const group = service.subServices.find(item => item.slug === slugs[1]);
  if (!group) return null;
  const child = slugs.length === 3
    ? group.children.find(item =>
      serviceAnchor(item) === slugs[2]
      || item.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slugs[2],
    )
    : undefined;
  if (slugs.length === 3 && !child) return null;
  return { service, group, child };
}

function getHierarchyPageData(
  serviceSlug: string,
  groupSlug: string,
  childSlug: string,
): EntityFormationPageData | undefined {
  if (serviceSlug === "business-advisory-contracts" && groupSlug === "commercial-contracts") {
    if (childSlug === "contract-drafting-review-negotiations") return contractDraftingPageData;
    return [...commercialContractPages, ...contractAndRestructuringPages]
      .find((page) => (
        page.categoryTitle === "Commercial Contracts"
        && (page.slug === childSlug || serviceAnchor(page.title) === childSlug)
      ));
  }

  if (serviceSlug === "corporate-commercial-advisory") {
    if (groupSlug === "corporate-governance-and-entity-structuring") {
      return [...businessStructuringPages, ...businessReorganisationPages, ...contractAndRestructuringPages]
        .find((page) => page.slug === childSlug);
    }

    if (groupSlug === "mergers-acquisitions-and-transactions") {
      return transactionGovernancePages.find((page) => page.slug === childSlug);
    }
  }
}

export function generateStaticParams() {
  return [
    ...services.map(service => ({ slug: [service.canonicalSlug] })),
    ...licensingRegistrationPages.map(({ groupSlug, slug }) => ({
      slug: ["licensing-registrations", groupSlug, slug],
    })),
    ...getIntellectualPropertyServiceStaticParams(),
    ...getAdditionalServiceDetailStaticParams(),
    ...getPrivateStyleAdvisoryStaticParams(),
    ...getRequestedServicePageStaticParams(),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugs = (await params).slug;
  const cmsService = slugs.length === 1 ? (await getPublishedContent("services")).find((item) => item.slug === slugs[0]) : undefined;
  if (cmsService) return getPublishedContentMetadata(cmsService, `/services/${cmsService.slug}`);
  const privateStylePage = getPrivateStyleAdvisoryPage(slugs);
  if (privateStylePage) {
    const canonical = `/services/${privateStylePage.route.join("/")}`;
    return {
      title: `${privateStylePage.title} | ${privateStylePage.serviceTitle} | Astronis`,
      description: privateStylePage.description,
      alternates: { canonical },
      openGraph: { title: privateStylePage.title, description: privateStylePage.description, url: canonical, type: "website" },
    };
  }
  const requestedMetadata = getRequestedServicePageMetadata(`/services/${slugs.join("/")}`);
  if (requestedMetadata) return requestedMetadata;
  const referenceServiceMetadata = getReferenceServicePageMetadata(`/services/${slugs.join("/")}`);
  if (referenceServiceMetadata) return referenceServiceMetadata;
  const hierarchy = resolveHierarchy(slugs);
  if (hierarchy) {
    const title = hierarchy.child || hierarchy.group.title;
    const additionalServicePage = hierarchy.child
      ? getAdditionalServiceDetailPage(hierarchy.group.slug, serviceAnchor(hierarchy.child))
      : undefined;
    if (additionalServicePage) {
      const canonical = `/services/${hierarchy.service.canonicalSlug}/${hierarchy.group.slug}/${additionalServicePage.slug}`;
      return {
        title: `${additionalServicePage.title} | ${hierarchy.service.title} | Astronis`,
        description: additionalServicePage.description,
        alternates: { canonical },
        openGraph: {
          title: `${additionalServicePage.title} | ${hierarchy.service.title} | Astronis`,
          description: additionalServicePage.description,
          url: canonical,
          type: "website",
        },
      };
    }
    const hierarchyPageData = hierarchy.child
      ? getHierarchyPageData(
        hierarchy.service.canonicalSlug,
        hierarchy.group.slug,
        serviceAnchor(hierarchy.child),
      )
      : undefined;
    if (hierarchyPageData) {
      const canonical = `/services/${hierarchy.service.canonicalSlug}/${hierarchy.group.slug}/${serviceAnchor(hierarchy.child!)}`;
      return {
        title: `${hierarchyPageData.title} | ${hierarchy.service.title} | Astronis`,
        description: hierarchyPageData.description,
        alternates: { canonical },
        openGraph: {
          title: `${hierarchyPageData.title} | ${hierarchy.service.title} | Astronis`,
          description: hierarchyPageData.description,
          url: canonical,
          type: "website",
        },
      };
    }
    const intellectualPropertyPage = hierarchy.child
      && hierarchy.service.canonicalSlug === "intellectual-property-right-services"
      ? getIntellectualPropertyServicePage(hierarchy.group.slug, serviceAnchor(hierarchy.child))
      : undefined;
    if (intellectualPropertyPage) {
      const canonical = `/services/${hierarchy.service.canonicalSlug}/${hierarchy.group.slug}/${serviceAnchor(hierarchy.child!)}`;
      return {
        title: `${intellectualPropertyPage.title} | Intellectual Property Right Services | Astronis`,
        description: intellectualPropertyPage.description,
        alternates: { canonical },
        openGraph: {
          title: `${intellectualPropertyPage.title} | Intellectual Property Right Services | Astronis`,
          description: intellectualPropertyPage.description,
          url: canonical,
          type: "website",
        },
      };
    }
    const licensingRegistrationPage = hierarchy.child
      && hierarchy.service.canonicalSlug === "licensing-registrations"
      ? getLicensingRegistrationPage(slugs[2])
      : undefined;
    if (licensingRegistrationPage) {
      const canonical = `/services/licensing-registrations/${licensingRegistrationPage.groupSlug}/${licensingRegistrationPage.slug}`;
      return {
        title: `${licensingRegistrationPage.title} | Licensing & Registrations | Astronis`,
        description: licensingRegistrationPage.description,
        alternates: { canonical },
        openGraph: {
          title: `${licensingRegistrationPage.title} | Licensing & Registrations | Astronis`,
          description: licensingRegistrationPage.description,
          url: canonical,
          type: "website",
        },
      };
    }
    const femaDetail = hierarchy.child
      && hierarchy.service.canonicalSlug === "fema-fdi-cross-border"
      ? getFemaCrossBorderDetail(slugs[2])
      : undefined;
    if (femaDetail) return femaCrossBorderMetadata(femaDetail);
    const businessAdvisoryDetail = hierarchy.child
      && hierarchy.service.canonicalSlug === "business-advisory-contracts"
      && hierarchy.group.slug === "business-strategy"
      ? getBusinessAdvisoryDetail(slugs[2])
        || getBusinessAdvisoryDetail(serviceAnchor(hierarchy.child))
      : undefined;
    if (businessAdvisoryDetail) return businessAdvisoryMetadata(businessAdvisoryDetail);
    const regulatoryDetail = hierarchy.child && hierarchy.service.canonicalSlug === "regulatory-services"
      ? getConsumerRegulatoryDetail(serviceAnchor(hierarchy.child))
        || (hierarchy.group.slug === "corporate-regulatory" ? getCorporateRegulatoryDetail(serviceAnchor(hierarchy.child)) : undefined)
      : undefined;
    const pageTitle = regulatoryDetail?.title || title;
    const description = regulatoryDetail?.description || `${title} support within ${hierarchy.service.title}, with connected legal, regulatory and business advisory.`;
    const canonical = `/services/${hierarchy.service.canonicalSlug}/${hierarchy.group.slug}${hierarchy.child ? `/${businessAdvisoryDetail ? slugs[2] : serviceAnchor(hierarchy.child)}` : ""}`;
    return {
      title: `${pageTitle} | ${hierarchy.service.title} | Astronis`,
      description,
      alternates: { canonical },
      openGraph: { title: `${pageTitle} | ${hierarchy.service.title} | Astronis`, description, url: canonical, type: "website" },
    };
  }
  const practice = slugs.length === 1 ? resolvePractice(slugs)?.practice : undefined;
  if (practice) {
    return {
      title: { absolute: practice.seoTitle || `${practice.title} Services | Astronis` },
      description: practice.description,
      alternates: { canonical: practicePath(practice) },
    };
  }
  return { title: "Service | Astronis" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugs = (await params).slug;
  const [publishedServices, suppressedSlugs] = await Promise.all([
    slugs.length === 1 ? getPublishedContent("services") : Promise.resolve([]),
    getUnpublishedSourceContentSlugs("services"),
  ]);
  const cmsService = publishedServices.find((item) => item.slug === slugs[0]);
  if (suppressedSlugs.has(slugs[0])) notFound();
  if (cmsService?.data.sourceDefined === true) {
    const sourcePractice = resolvePractice(slugs)?.practice;
    if (sourcePractice) {
      return <MainServicePage practice={{
        ...sourcePractice,
        title: typeof cmsService.data.title === "string" && cmsService.data.title ? cmsService.data.title : sourcePractice.title,
        description: typeof cmsService.data.content === "string" && cmsService.data.content ? cmsService.data.content : sourcePractice.description,
        seoTitle: typeof cmsService.data.seoTitle === "string" && cmsService.data.seoTitle ? cmsService.data.seoTitle : sourcePractice.seoTitle,
        heroImage: typeof cmsService.data.featuredImage === "string" && cmsService.data.featuredImage ? cmsService.data.featuredImage : sourcePractice.heroImage,
      }} />;
    }
  }
  if (cmsService) return <CmsContentPage record={cmsService} eyebrow="Services" />;
  const privateStylePage = getPrivateStyleAdvisoryPage(slugs);
  if (privateStylePage) return <PrivateStyleAdvisoryPage data={privateStylePage} />;
  const requestedPage = getRequestedServicePage(`/services/${slugs.join("/")}`);
  if (requestedPage) return <EntityFormationPage data={requestedPage} />;
  const referenceServicePage = getReferenceServicePageData(`/services/${slugs.join("/")}`);
  if (referenceServicePage) return <EntityFormationPage data={referenceServicePage} />;
  const hierarchy = resolveHierarchy(slugs);
  if (hierarchy) {
    const { service, group, child } = hierarchy;
    if (!child) permanentRedirect(`/services/${service.canonicalSlug}#${group.slug}`);
    const childRoute = group.childRoutes?.[child];
    if (childRoute && childRoute.split("/").at(-1) !== slugs[2]) permanentRedirect(childRoute);
    const additionalServicePage = getAdditionalServiceDetailPage(group.slug, serviceAnchor(child));
    if (additionalServicePage) return <EntityFormationPage data={additionalServicePage} />;
    const hierarchyPageData = getHierarchyPageData(
      service.canonicalSlug,
      group.slug,
      serviceAnchor(child),
    );
    if (hierarchyPageData) return <EntityFormationPage data={hierarchyPageData} />;
    const intellectualPropertyPage = service.canonicalSlug === "intellectual-property-right-services"
      ? getIntellectualPropertyServicePage(group.slug, serviceAnchor(child))
      : undefined;
    if (intellectualPropertyPage) return <EntityFormationPage data={intellectualPropertyPage} />;
    const licensingRegistrationPage = service.canonicalSlug === "licensing-registrations"
      ? getLicensingRegistrationPage(slugs[2])
      : undefined;
    if (licensingRegistrationPage) return <EntityFormationPage data={licensingRegistrationPage} />;
    const femaDetail = service.canonicalSlug === "fema-fdi-cross-border"
      ? getFemaCrossBorderDetail(slugs[2])
      : undefined;
    if (femaDetail) return <FemaCrossBorderDetailPage detail={femaDetail} />;
    const businessAdvisoryDetail = service.canonicalSlug === "business-advisory-contracts" && group.slug === "business-strategy"
      ? getBusinessAdvisoryDetail(slugs[2])
        || getBusinessAdvisoryDetail(serviceAnchor(child))
      : undefined;
    if (businessAdvisoryDetail) return <BusinessAdvisoryDetailPage detail={businessAdvisoryDetail} />;
    const regulatoryDetail = service.canonicalSlug === "regulatory-services"
      ? getConsumerRegulatoryDetail(serviceAnchor(child))
        || (group.slug === "corporate-regulatory" ? getCorporateRegulatoryDetail(serviceAnchor(child)) : undefined)
      : undefined;
    const regulatoryGroup = regulatoryServices.groups.find(item => item.slug === group.slug);
    if (regulatoryDetail && regulatoryGroup) {
      return <ConsumerRegulatoryDetailPage detail={regulatoryDetail} group={regulatoryGroup} practice={regulatoryServices} />;
    }
    const childHeroImage = getServiceChildHeroImage(serviceAnchor(child), service.canonicalSlug);
    return <div className={serviceStyles.page} data-service-template>
      <ServiceChildHero
        serviceTitle={service.title}
        serviceHref={`/services/${service.canonicalSlug}`}
        groupTitle={group.title}
        groupHref={`/services/${service.canonicalSlug}#${group.slug}`}
        title={child}
        subtitle={`Practical guidance for ${child}, shaped around your organisation and requirements.`}
        image={childHeroImage}
      />
      <ServiceChildPageLayout
        items={[
          { id: "service-overview", label: "Service overview" },
        ]}
      >
          <section className={serviceStyles.detailIntro} id="service-overview">
            <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
              <Link href="/services">Services</Link> <span aria-hidden="true">›</span>{" "}
              <Link href={`/services/${service.canonicalSlug}`}>{service.title}</Link>{" "}
              <span aria-hidden="true">›</span>{" "}
              <Link href={`/services/${service.canonicalSlug}#${group.slug}`}>{group.title}</Link>{" "}
              <span aria-hidden="true">›</span> <span aria-current="page">{child}</span>
            </nav>
            <h2>{child}</h2>
            <p>{child} sits within {group.title}. Our team can help assess the requirements and coordinate next steps.</p>
            <Link href={`/services/${service.canonicalSlug}#${group.slug}`}>Explore {group.title}</Link>
          </section>
      </ServiceChildPageLayout>
    </div>;
  }

  const practice = slugs.length === 1 ? resolvePractice(slugs)?.practice : undefined;
  if (practice) return <MainServicePage practice={practice} />;
  notFound();
}
