import Link from "next/link";
import { serviceGroups, practices, slugify } from "@/content/site";
import { Heading, TextLink } from "../_components/ui";
export default function ServiceDirectory() {
  return (
    <section className="section">
      <div className="container">
        <Heading
          title="Find the Right Expertise"
          text="Explore a practice area and the individual services within it."
        />
        <div className="directory-grid">
          {serviceGroups.map((g) => (
            <article className="directory-card" key={g.slug}>
              <h2>{g.title}</h2>
              <TextLink href={"/services/" + g.slug}>
                Practice overview
              </TextLink>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>
                    <Link href={"/services/" + g.slug + "/" + slugify(item)}>
                      {item}
                      <span>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          {practices
            .filter((p) => !serviceGroups.some((g) => g.slug === p.slug))
            .map((p) => (
              <article className="directory-card" key={p.slug}>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <TextLink href={"/services/" + p.slug}>
                  Explore practice
                </TextLink>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
