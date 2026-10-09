import { stories } from "@/content/site";
import Image from "@/app/_components/asset-image";
import { Heading, TextLink } from "../_components/ui";
export default function SuccessStories() {
  return (
    <section className="section">
      <div className="container">
        <Heading
          title="Success Stories"
          text="Real-world examples of how Astronis Global has helped businesses navigate legal, regulatory and strategic challenges."
        />
        <div className="insight-grid">
          {stories.map((s) => (
            <article className="insight-card" key={s.slug}>
              <div className="card-image">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
              </div>
              <div className="card-body">
                <span className="eyebrow">{s.category}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <TextLink href={"/success-stories/" + s.slug}>
                  Read More
                </TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="center">
          <TextLink href="/success-stories">View All Success Stories</TextLink>
        </div>
      </div>
    </section>
  );
}
