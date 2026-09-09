import Image from "@/app/_components/asset-image";
import { practices } from "@/content/site";
import { Heading, TextLink } from "../_components/ui";
import Icon from "../_components/icon";
const images = [
  "Part-10 .png",
  "overnment, Public Sector & Institutions .png",
  "Part-6 .png",
  "Part-16 .png",
  "Part-18 .png",
  "Part-4 .png",
  "Part-9 .png",
  "Part-14 .png",
];
export default function Services() {
  return (
    <section className="section pale practice-section">
      <div className="container">
        <Heading
          title="Our Practice Areas"
          text="Integrated legal, regulatory and business advisory capabilities for evolving enterprises."
        />
        <div className="practice-grid">
          {practices.map((p, i) => (
            <article className="practice-card" key={p.slug}>
              <div className="card-image">
                <Image
                  src={"/" + images[i]}
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
