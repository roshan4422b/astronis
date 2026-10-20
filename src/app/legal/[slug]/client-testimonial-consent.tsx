import styles from "./privacy-policy.module.css";
import PdfDownloadButton from "./pdf-download-button";
import { agreementSections } from "@/content/client-testimonial-consent";

export default function ClientTestimonialConsent() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1 className={styles.agreementTitle}>CLIENT TESTIMONIAL, REVIEW, IMAGE &amp; LOGO PUBLICATION CONSENTAND AUTHORISATION AGREEMENT</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Website: www.astronisglobal.com</p>
            <p>Effective Date: [--Date of Publication--]</p>
          </div>
          <PdfDownloadButton
            endpoint="/api/legal/client-testimonial-consent"
            fileName="Astronis-Global-Client-Testimonial-Consent-and-Authorisation-Agreement.pdf"
          />
        </div>
      </header>
      <article className={styles.document}>
        {agreementSections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <h2><span>{index + 1}.</span> {section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.clauses && (
              <ol type="a">
                {section.clauses.map((clause) => (
                  <li key={clause.heading ?? clause.text}>
                    {clause.heading ? (
                      <strong className={styles.subsectionHeading}>{clause.heading}</strong>
                    ) : section.title === "Contact and Removal Requests:" && clause.text?.startsWith("Website:") ? (
                      <>Website: <a href="https://www.astronisglobal.com">www.astronisglobal.com</a></>
                    ) : section.title === "Contact and Removal Requests:" && clause.text?.startsWith("Email:") ? (
                      <>Email: <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a></>
                    ) : section.title === "Contact and Removal Requests:" && clause.text?.startsWith("Telephone:") ? (
                      <>Telephone: <a href="tel:+919311664455">011-465-7-4455 / +91 9311664455</a></>
                    ) : clause.text}
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}

