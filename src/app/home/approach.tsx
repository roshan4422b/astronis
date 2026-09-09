import { approach } from "@/content/site";
import Icon from "../_components/icon";
import { Heading } from "../_components/ui";
export default function Approach() {
  return (
    <section className="section approach-section">
      <div className="container">
        <Heading
          title="Our Approach"
          text="A proven process. Measurable impact. Built on clarity, collaboration and commitment."
          light
        />
        <div className="approach-grid">
          {approach.map(([title, text], i) => (
            <article key={title}>
              <span className="number-badge">0{i + 1}</span>
              <Icon
                name={
                  ["search", "file", "bulb", "people", "chart", "shield"][i]
                }
              />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="approach-note">
          Your goals drive our actions.{" "}
          <strong>Let’s build your success story together.</strong>
        </p>
      </div>
    </section>
  );
}
