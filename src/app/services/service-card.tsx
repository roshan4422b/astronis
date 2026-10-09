import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import type { Service } from "@/data/services";
import styles from "./hub.module.css";

export default function ServiceCard({ service }: { service: Service }) {
  return <article className={styles.card}>
    <Link href={`/services/${service.canonicalSlug}`} className={styles.cardAnchor}>
      <div className={styles.cardImage}><Image src={service.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" /><span className={styles.number}>{service.number}</span><span className={styles.imageLabel}>{service.category}</span></div>
      <div className={styles.cardBody}><h3>{service.title}</h3><p>{service.shortDescription}</p><span className={styles.cardAction}><span>Explore Service</span><Icon name="arrow" /></span></div>
    </Link>
  </article>;
}
