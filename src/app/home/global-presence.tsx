import Image from "@/app/_components/asset-image";
import { Button } from "../_components/ui";
export default function GlobalPresence() {
  return (
    <section className="global-section">
      <Image
        src="/Part-9 .png"
        alt="Connected globe and international business skyline"
        fill
        sizes="100vw"
        className="backdrop"
      />
      <div className="container relative">
        <div className="global-copy">
          <span className="eyebrow">CONNECTED ACROSS BORDERS</span>
          <h2>
            Global Mindset.
            <br />
            Local Insight.
          </h2>
          <span className="heading-line" />
          <p>
            Combining cross-border perspective with jurisdiction-specific
            understanding, Astronis Global helps businesses navigate
            opportunities and regulatory complexity across markets.
          </p>
          <div className="button-row">
            <Button href="/global-presence#countries">
              Choose Your Country
            </Button>
            <Button href="/global-presence/local-insight" secondary>
              Global Mindset. Local Insight.
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
