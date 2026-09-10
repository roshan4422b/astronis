import Image from "@/app/_components/asset-image";
import { practices } from "@/content/site";
import { Button, Heading } from "../_components/ui";
import ServiceCard from "./service-card";
export default function QuickServices() {
  return (
    <section className="quick-services section">
      <Image
        src="/explore_services.png"
        alt=""
        fill
        sizes="100vw"
        className="backdrop"
      />
      <div className="container relative">
        <Heading
          title="Explore Our Services"
          text="Integrated legal, regulatory and business advisory capabilities for evolving enterprises."
          light
        />
        <div className="quick-grid">
          {practices.map((service, index) => (
            <ServiceCard service={service} index={index} key={service.slug} />
          ))}
        </div>
        <div className="quick-extra">
          <Button href="/insights" secondary>
            Insights & Resources
          </Button>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </div>
    </section>
  );
}
