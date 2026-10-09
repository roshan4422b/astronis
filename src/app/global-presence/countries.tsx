import Link from "next/link";
import { countries, slugify } from "@/content/site";
import { Heading } from "../_components/ui";
import Icon from "../_components/icon";
export default function Countries() {
  return (
    <section className="section" id="countries">
      <div className="container">
        <Heading
          title="Choose Your Country / Jurisdiction"
          text="Explore our country desks and discuss support for domestic and cross-border business requirements."
        />
        <div className="country-grid">
          {countries.map((c) => (
            <Link
              className="country-card"
              href={"/global-presence/" + slugify(c)}
              key={c}
            >
              <Icon name="globe" />
              <div>
                <h3>{c}</h3>
                <p>Explore country desk →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
