import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./service-child-hero.module.css";

export default function ServiceChildHero({
  serviceTitle,
  serviceHref,
  groupTitle,
  groupHref,
  title,
  subtitle,
  image,
}: {
  serviceTitle: string;
  serviceHref: string;
  groupTitle: string;
  groupHref: string;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className={`${styles.hero} service-child-page-hero`} id="overview">
      <Image src={image} alt="" fill priority sizes="100vw" className={styles.image} />
      <div className={`container ${styles.inner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/services">Services</Link><span>/</span>
          <Link href={serviceHref}>{serviceTitle}</Link><span>/</span>
          <Link href={groupHref}>{groupTitle}</Link><span>/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{serviceTitle} · {groupTitle}</span>
          <h1>{title}</h1>
          <h2 className="service-child-hero-subtitle">{subtitle}</h2>
          <Link className={styles.button} href="/contact">
            Schedule a Consultation <Icon name="calendar" />
          </Link>
        </div>
      </div>
    </section>
  );
}
