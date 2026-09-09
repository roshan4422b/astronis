import { reasons } from "@/content/site";
import { Heading } from "../_components/ui";
export default function Values() {
  return (
    <section className="section pale">
      <div className="container">
        <Heading
          title="What We Stand For"
          text="Integrity, professional excellence and long-term client partnership."
        />
        <div className="directory-grid">
          {reasons.map(([title, text]) => (
            <article className="directory-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
