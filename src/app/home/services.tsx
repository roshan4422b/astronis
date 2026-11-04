import Image from "@/app/_components/asset-image";
import { practices, serviceBanners } from "@/content/site";
import { Heading, TextLink } from "../_components/ui";
import Icon from "../_components/icon";
import { getPublishedContent, getUnpublishedSourceContentSlugs } from "@/lib/supabase/server";

export default async function Services() {
  const [cmsServices, suppressedSlugs] = await Promise.all([
    getPublishedContent("services"),
    getUnpublishedSourceContentSlugs("services"),
  ]);
  const publishedBySlug = new Map(cmsServices.map((item) => [item.slug, item.data]));
  const featuredPractices = practices.slice(0, 8).filter((practice) => !suppressedSlugs.has(practice.canonicalSlug));
  return (
    <section className="section pale practice-section">
      <div className="container">
        <Heading
          title="Our Capabilities"
          text="Integrated legal, regulatory and business advisory capabilities for evolving enterprises."
        />
        <div className="practice-grid">
          {featuredPractices.map((practice) => {
            const cms = publishedBySlug.get(practice.canonicalSlug);
            const title = typeof cms?.title === "string" && cms.title ? cms.title : practice.title;
            const description = typeof cms?.description === "string" && cms.description ? cms.description : practice.description;
            const image = typeof cms?.featuredImage === "string" && cms.featuredImage
              ? cms.featuredImage
              : serviceBanners[practice.slug] ?? "/explore_services.png";
            return (
              <article className="practice-card" key={practice.slug}>
                <div className="card-image">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                  />
                </div>
                <span className="round-icon">
                  <Icon name={practice.icon} />
                </span>
                <div className="card-body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <TextLink href={"/services/" + practice.slug}>Explore</TextLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
