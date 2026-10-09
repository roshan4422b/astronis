import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import type { professionals } from "../leadership";
import styles from "./industry-experts.module.css";

type Professional = (typeof professionals)[number];

export default function ProfessionalsCarousel({ people }: { people: readonly Professional[] }) {
  return <div className={styles.professionalGrid}>
    {people.map((person) => <article className={styles.professionalCard} key={person.slug}>
      <Link className={styles.professionalPhoto} href={`/professionals/${person.slug}`}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" /></Link>
      <div className={styles.professionalInfo}>
        <h3>{person.name}</h3>
        <span>{person.role}</span>
        <p>{person.expertise}</p>
        <small><Icon name="pin" />New Delhi</small>
        <Link className={styles.profileLink} href={`/professionals/${person.slug}`}>View Profile <Icon name="arrow" /></Link>
      </div>
    </article>)}
  </div>;
}
