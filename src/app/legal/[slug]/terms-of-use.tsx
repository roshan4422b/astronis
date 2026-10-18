import styles from "./privacy-policy.module.css";
import PdfDownloadButton from "./pdf-download-button";

type TermsSection = {
  title?: string;
  paragraphs?: string[];
  clauses?: string[];
  contacts?: { text: string; href?: string }[];
};

const sections: TermsSection[] = [
  {
    title: "Acceptance of Terms:",
    paragraphs: [
      "Welcome to www.astronisglobal.com (“Website”), operated by Astronis Global Private Limited (“Astronis Global”, “Company”, “we”, “us” or “our”). By accessing or using this Website, visitors agree to comply with these Terms of Use and applicable laws. Individuals who do not agree with these Terms should discontinue use of the Website.",
    ],
  },
  {
    title: "About Astronis Global:",
    paragraphs: [
      "Astronis Global operates in the fields of corporate advisory, regulatory services, legal and litigation support, business consultancy, commercial transactions, investment advisory, licensing, compliance, intellectual property and related professional services. Services involving regulated professional activities are undertaken by appropriately qualified, authorised or enrolled professionals, as applicable. Descriptions of services on this Website do not constitute a representation that the Company independently holds every professional licence or regulatory authorisation that may be required for a particular activity.",
    ],
  },
  {
    title: "Informational Nature of the Website:",
    paragraphs: [
      "The Website provides general information regarding our organisation, service areas, professional capabilities, industries, publications, regulatory developments and business-related matters. The contents are intended for general informational purposes and should not be treated as professional advice tailored to any particular person, organisation, transaction or dispute.",
    ],
  },
  {
    title: "No Automatic Professional Relationship:",
    paragraphs: [
      "Accessing the Website, submitting an enquiry, downloading information, communicating through an online form or receiving an initial response does not, by itself, create an advocate–client, consultant–client, fiduciary or other professional engagement relationship. A professional engagement shall arise only upon appropriate acceptance of instructions and completion of applicable onboarding, conflict checks and engagement formalities.",
    ],
  },
  {
    title: "Permitted Use:",
    paragraphs: ["Users may access the Website for lawful informational, professional and business purposes. Users shall not:"],
    clauses: [
      "Use the Website for unlawful, fraudulent or misleading purposes.",
      "Attempt unauthorised access to systems, accounts, servers or databases.",
      "Introduce malware, malicious scripts or harmful software.",
      "Interfere with the Website's security or functionality.",
      "Misrepresent their identity or professional affiliation.",
      "Infringe intellectual property, privacy or confidentiality rights.",
      "Reproduce substantial Website content for commercial exploitation without permission.",
      "Use automated extraction or scraping in a manner that violates applicable law or disrupts Website operations.",
    ],
  },
  {
    title: "Intellectual Property Rights:",
    paragraphs: [
      "Unless otherwise stated, the Website's content, branding, trademarks, logos, design elements, original publications, graphics, service descriptions and other proprietary materials belong to Astronis Global or their respective lawful owners. The name ASTRONIS™ & ASTRONIS GLOBAL™, its associated logo and brand identifiers may not be used, reproduced or represented as affiliated with another organisation without prior written authorisation. The use of the ™ symbol does not, by itself, constitute a representation of registered trademark status. Visitors may view and make limited personal or internal reference copies of publicly available content, subject to applicable law, proper attribution and these Terms.",
    ],
  },
  {
    title: "Publications and Regulatory Updates:",
    paragraphs: [
      "Articles, insights, legal updates, regulatory summaries, checklists, newsletters, Calanders and other publications are prepared for general information. Laws, regulations, administrative practices and judicial interpretations may change. Astronis Global™ does not undertake to update every publication immediately following a legal or regulatory development. Users should obtain advice based on current law and their specific circumstances before relying on such materials. Enquiries and User Submissions. Users submitting enquiries, applications, business proposals or other materials must ensure that the information provided is accurate and that they have authority to disclose it. Submission of information does not oblige Astronis Global or Astronis Global Private Limited to accept an engagement, respond within a particular timeframe or provide a requested service. Users should not transmit privileged, highly sensitive or confidential information through unsecured general enquiry channels without prior arrangements.",
    ],
  },
  {
    title: "Professional Fees and Engagement Terms:",
    paragraphs: [
      "Professional fees / Consultancy fee / Retainer-ship fees, deliverables, timelines, responsibilities and other engagement conditions shall be governed by the relevant proposal, quotation, engagement letter or separate written agreement. Any illustrative fee, service package or timeframe published on the Website is subject to applicable conditions, statutory charges, scope of work and subsequent confirmation.",
    ],
  },
  {
    title: "Third-Party Links and Services:",
    paragraphs: [
      "The Website may contain links to government authorities, courts, regulators, professional institutions, external resources and third-party service providers. Such links are provided for convenience and do not automatically constitute endorsement, partnership or responsibility for third-party content.",
    ],
  },
  {
    title: "Website Availability:",
    paragraphs: [
      "We endeavour to maintain the Website's availability and functionality but do not guarantee uninterrupted access or freedom from technical errors. We may modify, suspend, restrict or discontinue any feature, page or service where reasonably necessary.",
    ],
  },
  {
    title: "Limitation of Liability:",
    paragraphs: [
      "To the maximum extent permitted by applicable law, Astronis Global shall not be liable for losses arising solely from reliance upon general Website information, temporary unavailability, unauthorised third-party interference or external links, except where liability cannot lawfully be excluded. Nothing in these Terms excludes liability for fraud, wilful misconduct, statutory obligations or other liability that cannot lawfully be limited. Any professional liability arising from a separately accepted engagement shall be governed by applicable law and the relevant engagement terms.",
    ],
  },
  {
    title: "Privacy and Cookies:",
    paragraphs: [
      "Use of the Website is also subject to our Privacy Policy and Cookie Policy, which explain the handling of personal information and applicable website technologies.",
    ],
  },
  {
    title: "Amendments:",
    paragraphs: [
      "Astronis Global may amend these Terms to reflect changes in operations, services, law or website functionality. Updated Terms shall be published on the Website with an appropriate revision date.",
    ],
  },
  {
    title: "Governing Law and Jurisdiction:",
    paragraphs: [
      "These Terms shall be governed by the laws of India. Subject to mandatory statutory provisions and the jurisdiction of competent regulatory or judicial authorities, disputes arising specifically from Website access or these Terms shall be subject to the jurisdiction of competent courts at New Delhi, India.",
    ],
  },
  {
    title: "Contact Information",
    contacts: [
      { text: "Astronis Global Private Limited" },
      { text: "Website: www.astronisglobal.com", href: "https://www.astronisglobal.com" },
      { text: "Email: advisory@astronisglobal.com", href: "mailto:advisory@astronisglobal.com" },
      { text: "Telephone: 011-465-7-4455 / +91 9311664455", href: "tel:+919311664455" },
    ],
  },
];

export default function TermsOfUse() {
  return (
    <div className={styles.page} data-pdf-page="true">
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>TERMS OF USE</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Effective Date: 17 October 2026</p>
          </div>
          <PdfDownloadButton />
        </div>
      </header>
      <article className={styles.document}>
        {sections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            {section.title && <h2><span>{index + 1}.</span> {section.title}</h2>}
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.clauses && <ol type="a">{section.clauses.map((clause) => <li key={clause}>{clause}</li>)}</ol>}
            {section.contacts?.map((contact) => <p key={contact.text}>{contact.href ? <a href={contact.href}>{contact.text}</a> : contact.text}</p>)}
          </section>
        ))}
      </article>
    </div>
  );
}
