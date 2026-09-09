import Image from "@/app/_components/asset-image";
import { statistics } from "@/content/site";
import Icon from "../_components/icon";
import { Button } from "../_components/ui";
export default function Hero() {
  return (
    <section className="hero">
      <Image
        src="/Part-10 .png"
        alt="Modern boardroom overlooking a city skyline"
        fill
        sizes="100vw"
        preload
        className="backdrop"
      />
      <div className="hero-shade" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>
            Strategic Legal.
            <br />
            Regulatory Excellence.
            <br />
            Business Impact.
          </h1>
          <span className="heading-line" />
          <p className="hero-tagline">
            Corporate <b>•</b> Regulatory <b>•</b> Business Advisory
          </p>
          <p>
            Astronis Global delivers end-to-end legal, regulatory and advisory
            solutions that empower businesses to navigate complexity, mitigate
            risk and accelerate growth.
          </p>
          <div className="button-row">
            <Button href="/services">Explore Our Services</Button>
            <Button href="/contact" secondary>
              Talk to Our Experts
            </Button>
          </div>
        </div>
        <div className="hero-statistics">
          {statistics.map(([value, label], i) => (
            <div className="stat" key={value}>
              <Icon
                name={
                  ["calendar", "people", "pin", "globe", "file", "building"][i]
                }
              />
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
