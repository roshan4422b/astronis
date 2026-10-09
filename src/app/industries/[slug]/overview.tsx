import { practices } from "@/content/site";
import { TextLink, Heading } from "../../_components/ui";
export default function Overview({ title }: { title: string }) {
  return (
    <section className="section">
      <div className="container">
        <Heading
          title={`Advisory for ${title}`}
          text="Sector understanding, integrated expertise and a practical approach to your business requirements."
        />
        <div className="directory-grid">
          {practices.map((p) => (
            <article className="directory-card" key={p.slug}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <TextLink href={"/services/" + p.slug}>Explore Service</TextLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
