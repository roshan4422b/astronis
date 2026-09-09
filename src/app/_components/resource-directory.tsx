import { slugify } from "@/content/site";
import { TextLink, Heading } from "./ui";
export default function ResourceDirectory({
  title,
  items,
  base,
}: {
  title: string;
  items: string[];
  base: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <Heading title={title} />
        <div className="directory-grid">
          {items.map((t) => (
            <article className="directory-card" key={t}>
              <h3>{t}</h3>
              <TextLink href={base + "/" + slugify(t)}>Explore</TextLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
