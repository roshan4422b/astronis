import Image from "@/app/_components/asset-image";
import { reasons } from "@/content/site";
import Icon from "../_components/icon";
export default function WhyChooseUs() {
  const icons = [
    "bulb",
    "chart",
    "shield",
    "globe",
    "mail",
    "people",
    "pin",
    "document",
    "building",
    "phone",
  ];

  return (
    <section className="why-section">
      <div className="why-intro">
        <Image
          src="/hero_section.png"
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, 40vw"
          className="backdrop"
        />
        <div className="relative">
          <span className="eyebrow">WHY CHOOSE</span>
          <h2>
            Astronis
            <br />
            Global
          </h2>
          <span className="heading-line" />
          <p>
            We combine legal insight, regulatory understanding and business
            perspective to deliver practical solutions for complex and evolving
            business environments.
          </p>
        </div>
      </div>
      <div className="reasons-grid">
        {reasons.map(([title, text], i) => (
          <article key={title}>
            <span className="number-badge">{i + 1}</span>
            <Icon name={icons[i] ?? "globe"} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
