import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { services } from "@/data/services";
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
import SectionNavigation from "../_template/section-navigation";
import serviceStyles from "../_template/service-template.module.css";
import BusinessAdvisoryDetailPage, { businessAdvisoryMetadata } from "../business-advisory-contracts/business-advisory-detail";
import FemaCrossBorderDetailPage, { femaCrossBorderMetadata } from "../fema-fdi-cross-border/fema-cross-border-detail";
import { Banner } from "../../_components/ui";
import ConsumerRegulatoryDetailPage from "../regulatory-services/consumer-regulatory-detail";
import { regulatoryServices } from "@/data/regulatory-practice";
import EntityFormationPage from "../corporate-commercial-advisory/entity-formation/_components/entity-formation-page";

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

export function generateStaticParams() {
  return [
    ...services.map(service => ({ slug: [service.canonicalSlug] })),
    ...licensingRegistrationPages.map(({ groupSlug, slug }) => ({
      slug: ["licensing-registrations", groupSlug, slug],
    })),
    ...getIntellectualPropertyServiceStaticParams(),
    ...getAdditionalServiceDetailStaticParams(),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugs = (await params).slug;
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
  const hierarchy = resolveHierarchy(slugs);
  if (hierarchy) {
    const { service, group, child } = hierarchy;
    if (!child) permanentRedirect(`/services/${service.canonicalSlug}#${group.slug}`);
    const additionalServicePage = getAdditionalServiceDetailPage(group.slug, serviceAnchor(child));
    if (additionalServicePage) return <EntityFormationPage data={additionalServicePage} />;
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
    const relatedServices = group.children.filter(item => item !== child);
    return <div className={serviceStyles.page} data-service-template>
      <Banner title={child} eyebrow={service.title} text={`${child} support connected to ${service.title.toLowerCase()}.`} />
      <div className={`container ${serviceStyles.detailLayout}`}>
        <aside className={serviceStyles.detailAside}>
          <SectionNavigation
            title="On this page"
            items={[
              { id: "service-overview", title: "Service overview" },
              { id: "related-services", title: "Related services" },
            ]}
          />
        </aside>
        <div className={serviceStyles.detailContent}>
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
          <section className={serviceStyles.childSection} id="related-services">
            <div className={serviceStyles.childHeading}><span>01</span><h2>Related services</h2></div>
            <ul>
              {relatedServices.map(item => (
                <li key={item}>
                  <Link href={group.childRoutes?.[item] || `/services/${service.canonicalSlug}/${group.slug}/${serviceAnchor(item)}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/services/${service.canonicalSlug}`}>Explore {service.title}</Link>
          </section>
        </div>
      </div>
    </div>;
  }

  const practice = slugs.length === 1 ? resolvePractice(slugs)?.practice : undefined;
  if (practice) return <MainServicePage practice={practice} />;
  notFound();
}
