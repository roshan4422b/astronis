import Link from "next/link";
import Icon from "../../_components/icon";
import { services } from "@/data/services";
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

  return <div className={`${styles.page} ${cards.page}`} data-service-template>
    <ServiceHero practice={practice} />
    <SectionNavigation
      variant="bar"
      showItemNumbers={false}
      title="Explore our capabilities"
      items={service.subServices.map(group => ({
        id: group.slug,
        title: group.title,
        icon: service.icon,
        description: `Explore ${group.title.toLowerCase()} services within ${service.title.toLowerCase()}.`,
        children: group.children.map(child => ({
          title: child,
          url: group.childRoutes?.[child] || `/services/${service.canonicalSlug}/${group.slug}/${childSlug(child)}`,
        })),
      }))}
    />
    <section id="service-groups" aria-label={`${service.title} services`}>
      {service.subServices.map((group, index) => {
        const details = practice.groups.find(item => item.slug === group.slug);
        return <article className={`${cards.categorySection} ${index % 2 === 0 ? cards.lightCategory : cards.darkCategory}`} id={group.slug} key={group.slug}>
          <div className={cards.categoryInner}>
            <header className={cards.sectionHeader}>
              <div className={cards.sectionMeta}>
                <span className={cards.sectionLabel}>OUR SERVICES</span>
                <h2>{group.title}</h2>
                <span className={cards.sectionAccent} aria-hidden="true" />
                <p className={cards.categoryDescription}>{details?.description || `Explore ${group.title.toLowerCase()} services within ${service.title.toLowerCase()}.`}</p>
              </div>
              <div className={cards.iconBadge} aria-hidden="true"><Icon name={details?.icon || service.icon} className={cards.icon} /></div>
            </header>
            <div className={cards.cardGrid}>
              {group.children.map(child => {
                const childDetails = details?.children.find(item => item.title === child);
                const summary = childDetails?.paragraphs[0] || `Explore advisory support for ${child.toLowerCase()} within ${group.title.toLowerCase()}.`;
                return <Link href={group.childRoutes?.[child] || `/services/${service.canonicalSlug}/${group.slug}/${childDetails?.slug || childSlug(child)}`} key={child} className={cards.serviceCard} aria-label={`${child}. ${summary}`}>
                  <span className={cards.cardIcon} aria-hidden="true"><Icon name={details?.icon || service.icon} className={cards.cardIconGraphic} /></span>
                  <span className={cards.cardLink}>Explore Service<span className={cards.cardArrow} aria-hidden="true">↗</span></span>
                  <h3>{child}</h3>
                  <p>{summary}</p>
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
