import Link from "next/link";
import Image from "../_components/asset-image";
import styles from "./professionals-page.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="professionals-title">
      <Image src="/Professional & Business Services .png" alt="A contemporary business environment" fill preload sizes="(max-width: 800px) 100vw, 50vw" className={styles.heroImage} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Professionals</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Our people</span>
          <h1 id="professionals-title">The people behind your next strategic move</h1>
          <p>Meet the Astronis professionals bringing legal, regulatory and commercial insight to the questions that shape your business.</p>
        </div>
        <div className={styles.heroIndex} aria-hidden="true"><span>ASTRONIS GLOBAL</span><i /></div>
      </div>
    </section>
  );
}
