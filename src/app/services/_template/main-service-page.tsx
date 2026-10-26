import Link from "next/link";
import Icon from "../../_components/icon";
import { services } from "@/data/services";
import { corporateCommercialDirectory } from "@/data/corporate-commercial-directory";
import type { ServicePractice } from "@/data/service-detail-types";
import ServiceHero from "./service-hero";
import ServiceSupport from "./service-support";
import SectionNavigation from "./section-navigation";
import styles from "./service-template.module.css";
import cards from "../corporate-commercial-advisory/page.module.css";

const childSlug = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function MainServicePage({ practice }: { practice: ServicePractice }) {
  const service = services.find(item => item.canonicalSlug === practice.slug);

  if (!service) return <div className={styles.page}><ServiceHero practice={practice} /><ServiceSupport practice={practice} /></div>;

  const groups = service.canonicalSlug === "corporate-commercial-advisory"
    ? corporateCommercialDirectory.map(category => ({
        slug: category.categorySlug,
        title: category.category,
        icon: category.icon,
        description: category.categoryDescription,
        children: category.children.map(child => ({
          title: child.name,
          url: child.url,
          summary: child.description,
        })),
      }))
    : service.subServices.map(group => ({
        slug: group.slug,
        title: group.title,
        icon: service.icon,
        description: `Explore ${group.title.toLowerCase()} services within ${service.title.toLowerCase()}.`,
        children: group.children.map(child => ({
          title: child,
          url: group.childRoutes?.[child] || `/services/${service.canonicalSlug}/${group.slug}/${childSlug(child)}`,
          summary: `Explore advisory support for ${child.toLowerCase()} within ${group.title.toLowerCase()}.`,
        })),
      }));
  const navigationGroups = service.canonicalSlug === "corporate-commercial-advisory"
    ? groups.slice(0, 3)
    : groups;

  return <div className={`${styles.page} ${cards.page}`} data-service-template>
    <ServiceHero practice={practice} />
    <SectionNavigation
      variant="bar"
      showItemNumbers={false}
      title="Explore our capabilities"
      items={navigationGroups.map(group => ({
        id: group.slug,
        title: group.title,
        icon: group.icon,
        description: group.description,
        children: group.children.map(child => ({ title: child.title, url: child.url })),
      }))}
    />
    <section id="service-groups" aria-label={`${service.title} services`}>
      {groups.map((group, index) => {
        return <article className={`${cards.categorySection} ${index % 2 === 0 ? cards.lightCategory : cards.darkCategory}`} id={group.slug} key={group.slug}>
          <div className={cards.categoryInner}>
            <header className={cards.sectionHeader}>
              <div className={cards.sectionMeta}>
                <span className={cards.sectionLabel}>OUR SERVICES</span>
                <h2>{group.title}</h2>
                <span className={cards.sectionAccent} aria-hidden="true" />
                <p className={cards.categoryDescription}>{group.description}</p>
              </div>
              <div className={cards.iconBadge} aria-hidden="true"><Icon name={group.icon} className={cards.icon} /></div>
            </header>
            <div className={cards.cardGrid}>
              {group.children.map(child => {
                return <Link href={child.url} key={child.url} className={cards.serviceCard} aria-label={`${child.title}. ${child.summary}`}>
                  <span className={cards.cardIcon} aria-hidden="true"><Icon name={group.icon} className={cards.cardIconGraphic} /></span>
                  <span className={cards.cardLink}>Explore Service<span className={cards.cardArrow} aria-hidden="true">↗</span></span>
                  <h3>{child.title}</h3>
                  <p>{child.summary}</p>
                </Link>;
              })}
            </div>
          </div>
        </article>;
      })}
    </section>
    <ServiceSupport practice={practice} />
  </div>;
}
