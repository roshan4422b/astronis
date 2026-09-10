import Image from "@/app/_components/asset-image";
import { Heading, TextLink } from "../_components/ui";
import Leadership from "../professionals/leadership";
export default function Professionals() {
  return (
    <section className="section professionals-section">
      <div className="professional-banner">
        <Image
          src="/Professional & Business Services .png"
          alt=""
          fill
          sizes="100vw"
          className="backdrop"
        />
        <div className="container relative">
          <Heading
            title="Our Professionals. Your Partners in Success."
            text="Experienced professionals bringing legal, regulatory and commercial perspective to complex business matters."
            light
          />
        </div>
      </div>
      <div className="container">
        <Leadership limit={3} />
        <div className="center">
          <TextLink href="/professionals">View All Professionals</TextLink>
        </div>
      </div>
    </section>
  );
}
