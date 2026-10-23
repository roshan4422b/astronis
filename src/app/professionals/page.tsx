import Hero from "./hero";
import Link from "next/link";
import Leadership from "./leadership";
import Consultation from "../home/consultation";
import styles from "./professionals-page.module.css";
export const metadata = { title: "Our Professionals" };
export default function ProfessionalsPage() {
  return (
    <div className={styles.page}>
      <Hero />
      <section className={styles.directory} id="leadership" aria-labelledby="directory-title">
        <div className="container">
          <div className={styles.directoryHeading}>
            <div><span className={styles.eyebrow}>Meet the team</span><h2 id="directory-title">Our professionals</h2><p>Get to know the people who can help you navigate your next business decision.</p></div>
            <Link className={styles.connectLink} href="/professionals/enquiry">Connect with a Professional</Link>
          </div>
          <Leadership variant="premium" />
        </div>
      </section>
      <Consultation />
    </div>
  );
}
