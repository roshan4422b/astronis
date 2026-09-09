import Image from "@/app/_components/asset-image";
import Link from "next/link";
import { practices } from "@/content/site";
import Icon from "../_components/icon";
import { Heading } from "../_components/ui";
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
          {practices.map((p) => (
            <Link href={"/services/" + p.slug} key={p.slug}>
              <Icon name={p.icon} />
              <h3>{p.title}</h3>
              <span className="heading-line" />
              <Icon name="arrow" />
            </Link>
          ))}
        </div>
        <div className="quick-extra">
          <Link href="/insights">Insights & Resources →</Link>
          <Link href="/contact">Get in Touch →</Link>
        </div>
      </div>
    </section>
  );
}
