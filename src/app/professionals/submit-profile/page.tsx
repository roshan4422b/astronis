import type { Metadata } from "next";
import ProfessionalApplicationForm from "./professional-application-form";
import { getProfessionalApplicationConfig } from "./professional-application-config";
import styles from "./professional-application.module.css";

export const metadata: Metadata = {
  title: "Professional Application",
  description: "Share your professional background and explore career, advisory and international network opportunities with Astronis Global.",
};

export default function ProfessionalApplicationPage() {
  const applicationConfig = getProfessionalApplicationConfig();

  return <div className={styles.page}>
    <section className={styles.applicationIntro} aria-labelledby="application-title">
      <div className={styles.introInner}>
        <span className={styles.eyebrow}>Astronis Global | Professional Application</span>
        <h1 id="application-title">Build Your Professional Future with Astronis Global</h1>
        <p>Explore opportunities across corporate, regulatory, legal and business advisory, or join our global professional network. Share your professional background, expertise and preferred engagement with our team for consideration.</p>
        <p className={styles.disclaimer}>Submitting an application does not guarantee employment, partnership, appointment or a professional designation.</p>
      </div>
    </section>
    <ProfessionalApplicationForm {...applicationConfig} />
  </div>;
}
