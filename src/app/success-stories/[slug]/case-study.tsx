import { stories } from "@/content/site";
import { Button, TextLink } from "../../_components/ui";
export default function CaseStudy({
  story,
}: {
  story: (typeof stories)[number];
}) {
  return (
    <section className="section">
      <div className="container article-layout">
        <article className="article-copy">
          <h2>Engagement Overview</h2>
          <p>{story.description}</p>
          <h2>Our Approach</h2>
          <p>
            Understand the business requirement, assess the relevant
            considerations, develop a practical course of action and coordinate
            implementation with clear communication.
          </p>
          <h2>Related Services</h2>
          <TextLink href={"/services/" + story.service}>
            {story.category}
          </TextLink>
          <h2>Related Insights</h2>
          <TextLink href="/insights">Explore Insights & Resources</TextLink>
        </article>
        <aside className="article-aside">
          <h3>Facing a similar challenge?</h3>
          <p>Discuss your requirements with our team.</p>
          <Button href="/contact">Talk to Our Experts</Button>
        </aside>
      </div>
    </section>
  );
}
