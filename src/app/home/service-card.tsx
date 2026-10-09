import Link from "next/link";
import Icon from "../_components/icon";

type Service = {
  title: string;
  description: string;
  slug: string;
  icon: string;
};

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="service-card"
      aria-label={`Explore ${service.title} services`}
    >
      <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="service-card-icon">
        <Icon name={service.icon} />
      </span>
      <span className="service-card-content">
        <span className="service-card-title">{service.title}</span>
        <span className="service-card-description">{service.description}</span>
      </span>
      <span className="service-card-cta">
        Explore Service
        <Icon name="arrow" />
      </span>
    </Link>
  );
}
