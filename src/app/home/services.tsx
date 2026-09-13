import Image from "@/app/_components/asset-image";
import { practices, serviceBanners } from "@/content/site";
import { Heading, TextLink } from "../_components/ui";
import Icon from "../_components/icon";
export default function Services() {
  return (
    <section className="section pale practice-section">
      <div className="container">
        <Heading
          title="Our Capabilities"
          text="Integrated legal, regulatory and business advisory capabilities for evolving enterprises."
        />
        <div className="practice-grid">
          {practices.slice(0, 8).map((p) => (
            <article className="practice-card" key={p.slug}>
              <div className="card-image">
                <Image
                  src={"/" + serviceBanners[p.slug]}
                  alt={p.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
              </div>
              <span className="round-icon">
                <Icon name={p.icon} />
              </span>
              <div className="card-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <TextLink href={"/services/" + p.slug}>Explore</TextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
