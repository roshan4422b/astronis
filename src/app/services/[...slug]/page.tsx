import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { services } from "@/data/services";
import { resolvePractice } from "@/data/service-practices";
import { practicePath } from "@/data/service-detail-types";
import MainServicePage from "../_template/main-service-page";
import { Banner } from "../../_components/ui";

function resolveHierarchy(slugs: string[]) {
  const service = services.find(item => item.canonicalSlug === slugs[0]);
  if (!service || slugs.length < 2 || slugs.length > 3) return null;
  const group = service.subServices.find(item => item.slug === slugs[1]);
  if (!group) return null;
  const child = slugs.length === 3
    ? group.children.find(item => slugify(item) === slugs[2])
    : undefined;
  if (slugs.length === 3 && !child) return null;
  return { service, group, child };
}

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function generateStaticParams() {
  return services.map(service => ({ slug: [service.canonicalSlug] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugs = (await params).slug;
  const hierarchy = resolveHierarchy(slugs);
  if (hierarchy) {
    const title = hierarchy.child || hierarchy.group.title;
    const canonical = `/services/${hierarchy.service.canonicalSlug}/${hierarchy.group.slug}${hierarchy.child ? `/${slugify(hierarchy.child)}` : ""}`;
    return {
      title: `${title} | ${hierarchy.service.title} | Astronis`,
      description: `${title} support within ${hierarchy.service.title}, with connected legal, regulatory and business advisory.`,
      alternates: { canonical },
      openGraph: { title: `${title} | ${hierarchy.service.title} | Astronis`, description: `${title} support within ${hierarchy.service.title}, with connected legal, regulatory and business advisory.`, url: canonical, type: "website" },
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
    return <>
      <Banner title={child || group.title} eyebrow={service.title} text={`${child || group.title} support connected to ${service.title.toLowerCase()}.`} />
      <section className="section"><div className="container">
        <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}><Link href="/services">Services</Link> <span aria-hidden="true">›</span> <Link href={`/services/${service.canonicalSlug}`}>{service.title}</Link> <span aria-hidden="true">›</span> <Link href={`/services/${service.canonicalSlug}#${group.slug}`}>{group.title}</Link> <span aria-hidden="true">›</span> <span aria-current="page">{child}</span></nav>
        <p>{child} sits within <Link href={`/services/${service.canonicalSlug}#${group.slug}`}>{group.title}</Link>.</p><Link href={`/services/${service.canonicalSlug}`}>Explore {service.title}</Link>
      </div></section>
    </>;
  }

  const practice = slugs.length === 1 ? resolvePractice(slugs)?.practice : undefined;
  if (practice) return <MainServicePage practice={practice} />;
  notFound();
}
