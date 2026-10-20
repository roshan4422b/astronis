import styles from "./privacy-policy.module.css";
import {
  enquiryConsentSections,
  enquiryUserDeclaration,
} from "@/content/enquiry-consultation-consent";

const title = "ENQUIRY, COMMUNICATION & CONSULTATION CONSENT AGREEMENT";

function renderParagraph(text: string) {
  const email = "advisory@astronisglobal.com";
  const emailIndex = text.indexOf(email);
  if (emailIndex === -1) return text;
  return <>{text.slice(0, emailIndex)}<a href={`mailto:${email}`}>{email}</a>{text.slice(emailIndex + email.length)}</>;
}

function AgreementClauses({ clauses }: { clauses: string[] }) {
  return (
    <ol type="a">
      {clauses.map((clause) => (
        <li key={clause}>
          {clause.startsWith("Website:") ? (
            <>Website: <a href="https://www.astronisglobal.com">www.astronisglobal.com</a></>
          ) : clause.startsWith("Email:") ? (
            <>Email: <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a></>
          ) : clause.startsWith("Telephone:") ? (
            <>Telephone: <a href="tel:+919311664455">011-465-7-4455 / +91 9311664455</a></>
          ) : clause}
        </li>
      ))}
    </ol>
  );
}

export default function EnquiryConsultationConsent() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1 className={styles.agreementTitle}>{title}</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Website: www.astronisglobal.com</p>
            <p>Effective Date: [--Date of Publication--]</p>
          </div>
        </div>
      </header>
      <article className={styles.document}>
        {enquiryConsentSections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <h2><span>{index + 1}.</span> {section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{renderParagraph(paragraph)}</p>)}
            {section.clauses && <AgreementClauses clauses={section.clauses} />}
          </section>
        ))}
        <section className={styles.section}>
          <h2>{enquiryUserDeclaration.title}</h2>
          {enquiryUserDeclaration.paragraphs.map((paragraph) => <p key={paragraph}>{renderParagraph(paragraph)}</p>)}
          <p>{enquiryUserDeclaration.signature}</p>
        </section>
      </article>
    </div>
  );
}
