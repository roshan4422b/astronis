import { industries } from "@/content/site";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "../_components/icon";
import { Heading, Button } from "../_components/ui";
export default function Industries() {
  return (
    <section className="section industries-section">
      <div className="industry-heading">
        <Image
          src="/hero_section.png"
          alt=""
          fill
          sizes="100vw"
          className="backdrop"
        />
        <div className="container relative">
          <Heading
            title="Industries We Serve"
            text="Astronis Global supports businesses and stakeholders across diverse sectors, combining sector understanding with legal, regulatory and commercial perspective."
            light
          />
        </div>
      </div>
      <div className="container">
        <div className="industries-grid">
          {industries.slice(0, 14).map((s, i) => (
            <Link
              href={"/industries/" + s.slug}
              key={s.slug}
              className="industry-tile"
            >
              <span className="round-icon">
                <Icon
                  name={
                    [
                      "building",
                      "document",
                      "chart",
                      "building",
                      "shield",
                      "scale",
                      "file",
                      "bulb",
                      "globe",
                      "building",
                      "globe",
                      "file",
                      "building",
                      "play",
                    ][i]
                  }
                />
              </span>
              <h3>{s.title}</h3>
              <span className="heading-line" />
            </Link>
          ))}
        </div>
        <div className="ribbon">
          <Icon name="globe" />
          <h3>
            Diverse Industries.
            <br />
            Focused Solutions.
          </h3>
          <p>
            Sector understanding. Practical advice. Support for sustainable
            growth and long-term value.
          </p>
          <Button href="/industries" secondary>
            View All Industries
          </Button>
        </div>
      </div>
    </section>
  );
}
