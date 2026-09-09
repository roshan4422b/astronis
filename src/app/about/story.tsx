import Image from "@/app/_components/asset-image";
import { TextLink } from "../_components/ui";
export default function Story() {
  return (
    <section className="section">
      <div className="container split-section">
        <div>
          <span className="eyebrow">OUR STORY · SINCE 2015</span>
          <h2 style={{ marginTop: 15 }}>
            Legal insight.
            <br />
            Business perspective.
          </h2>
          <p>
            Astronis Global delivers end-to-end legal, regulatory and advisory
            solutions that empower businesses to navigate complexity, mitigate
            risk and accelerate growth.
          </p>
          <p>
            We bring together corporate, regulatory and commercial understanding
            to provide practical, actionable support. Our pan-India presence is
            supported by global collaboration for domestic and cross-border
            business requirements.
          </p>
          <TextLink href="/contact">Start a Conversation</TextLink>
        </div>
        <div className="split-image">
          <Image
            src="/Part-11 .png"
            alt="Office with a world map and city views"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
