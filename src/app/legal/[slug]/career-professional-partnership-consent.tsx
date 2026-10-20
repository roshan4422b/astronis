import styles from "./privacy-policy.module.css";
import {
  applicantDeclaration,
  careerAgreementSections,
} from "@/content/career-professional-partnership-consent";

const title = "CAREER, PROFESSIONAL ASSOCIATION & PARTNERSHIP APPLICATION CONSENT AGREEMENT";

function AgreementClauses({ clauses }: { clauses: string[] }) {
  return (
    <ol type="a">
      {clauses.map((clause) => (
        <li key={clause}>
          {clause.startsWith("Website:") ? (
            <>Website: <a href="https://www.astronisglobal.com">www.astronisglobal.com</a></>
          ) : clause.startsWith("Email:") ? (
            <>Email: <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a></>
          ) : clause.startsWith("Applicants may exercise") ? (
            <>Applicants may exercise available privacy and data protection rights by contacting <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a>.</>
          ) : clause.startsWith("Telephone:") ? (
            <>Telephone: <a href="tel:+919311664455">011-465-7-4455 / +91 9311664455</a></>
          ) : clause}
        </li>
      ))}
    </ol>
  );
}

export default function CareerProfessionalPartnershipConsent() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1 className={styles.agreementTitle}>{title}</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Website: www.astronisglobal.com</p>
            <p>Effective Date: [---Date of Publication--]</p>
          </div>
        </div>
      </header>
      <article className={styles.document}>
        {careerAgreementSections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <h2><span>{index + 1}.</span> {section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.clauses && <AgreementClauses clauses={section.clauses} />}
          </section>
        ))}
        <section className={styles.section}>
          <h2>{applicantDeclaration.title}</h2>
          <AgreementClauses clauses={applicantDeclaration.clauses} />
          <p>{applicantDeclaration.signature}</p>
        </section>
      </article>
    </div>
  );
}
