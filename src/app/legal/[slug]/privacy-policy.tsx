import styles from "./privacy-policy.module.css";
import PdfDownloadButton from "./pdf-download-button";
import { privacyPolicySections } from "./privacy-policy-content";

const sections = privacyPolicySections;

export default function PrivacyPolicy() {
  return (
    <div className={styles.page} data-pdf-page="true">
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>PRIVACY POLICY</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>WEBSITE: WWW.ASTRONISGLOBAL.COM</p>
            <p>EFFECTIVE DATE: 17 OCTOBER 2026</p>
          </div>
          <PdfDownloadButton endpoint="/api/legal/privacy-policy" fileName="Astronis-Global-Privacy-Policy.pdf" />
        </div>
      </header>
      <article className={styles.document}>
        {sections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <h2><span>{index + 1}.</span> {section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.clauses && <ol type="a">{section.clauses.map((clause) => <li key={clause}>{clause}</li>)}</ol>}
            {section.ending && <p>{section.ending}</p>}
            {section.contacts && <ol type="a">{section.contacts.map((contact) => <li key={contact.text}>{contact.href ? <a href={contact.href}>{contact.text}</a> : contact.text}</li>)}</ol>}
          </section>
        ))}
      </article>
    </div>
  );
}
