import { services } from "@/data/services";
import styles from "./hub.module.css";

export default function ServiceCapabilities({ slug }: { slug: string }) {
  const service = services.find(item => item.slug === slug);
  if (!service) return null;
  return <section className={styles.capabilities} aria-label={`${service.title} capabilities`}><div className="container"><span className={styles.eyebrow}>SCOPE OF SUPPORT</span><h2>Explore our capabilities</h2><p>{service.shortDescription}</p><div className={styles.capabilityGrid}>{service.subServices.map(group => <details key={group.title}><summary>{group.title}<span aria-hidden="true">+</span></summary>{group.children.length ? <ul>{group.children.map(child => <li key={child}>{child}</li>)}</ul> : <p>Discuss your {group.title.toLowerCase()} requirements with our advisory team.</p>}</details>)}</div></div></section>;
}
