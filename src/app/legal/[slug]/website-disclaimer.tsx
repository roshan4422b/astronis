import styles from "./privacy-policy.module.css";
import PdfDownloadButton from "./pdf-download-button";

type DisclaimerSection = {
  title?: string;
  paragraphs?: string[];
  numberedParagraph?: string;
  contacts?: { text: string; href?: string }[];
};

const sections: DisclaimerSection[] = [
  {
    title: "General Disclaimer:",
    paragraphs: ["The information available on www.astronisglobal.com is published by Astronis Global Private Limited for general information, professional awareness and business reference. Although reasonable care is taken in preparing and presenting website materials, Astronis Global does not warrant that every publication, description, reference or regulatory update is complete, current or suitable for a particular purpose."],
  },
  {
    title: "No Legal, Financial or Professional Advice:",
    paragraphs: ["Website materials concerning law, taxation, banking, financial services, corporate governance, regulatory compliance, investment, intellectual property, litigation, arbitration, business strategy and other professional matters do not constitute individual legal, financial, tax, investment or other regulated professional advice. Users should obtain advice from appropriately qualified professionals after consideration of their particular facts, documents, objectives and applicable law."],
  },
  {
    title: "No Advocate–Client or Professional Relationship:",
    paragraphs: ["Accessing this Website, reading publications, submitting an enquiry or communicating with Astronis Global does not automatically establish an advocate–client or other professional relationship. Such relationships are subject to appropriate acceptance of instructions, professional eligibility, conflict checks and engagement arrangements."],
  },
  {
    title: "Professional and Regulatory Compliance:",
    paragraphs: ["Astronis Global provides information concerning corporate, regulatory, legal and business advisory services. Activities reserved for advocates, chartered accountants, company secretaries, insolvency professionals, registered investment advisers or other regulated professionals shall be undertaken only by persons appropriately qualified or authorised under applicable law. No Website statement shall be interpreted as claiming a licence, registration, professional status or regulatory approval not actually held."],
  },
  {
    title: "Professional Advertising and Solicitation:",
    paragraphs: [],
  },
  {
    numberedParagraph: "The Website is intended to provide information about the organisation and its services, subject to applicable professional conduct requirements. Nothing on the Website is intended to constitute prohibited solicitation, an assurance of favourable outcomes or an improper inducement to engage a regulated professional. Where required under applicable professional rules, access to information about legal practitioners may be subject to appropriate user acknowledgements.",
  },
  {
    title: "No Guarantee of Results:",
    paragraphs: ["References to professional experience, service capabilities, representative assignments, transactions, outcomes or client engagements shall not be construed as a guarantee of success in any future matter. Outcomes depend upon individual facts, applicable law, regulatory decisions, judicial processes, market conditions and other circumstances beyond the Company's control."],
  },
  {
    title: "Accuracy and Changes in Law:",
    paragraphs: ["Legal and regulatory information may become outdated due to legislative amendments, judicial decisions, circulars, notifications or changes in administrative practice. Astronis Global does not undertake to provide continuous updates to every publication or webpage."],
  },
  {
    title: "Third-Party Resources:",
    paragraphs: ["References or links to external websites, authorities, institutions or publications are provided for information and convenience. Astronis Global does not assume responsibility for independent third-party content, security practices, availability or accuracy."],
  },
  {
    title: "Publication of Client Logos, Testimonials, Reviews and Related Materials:",
    paragraphs: ["Astronis Global Private Limited (“Company”) may publish or display the names, logos, testimonials, reviews, endorsements and other related materials of its clients, associates or concerned parties, whether in written, photographic, audio or video format, on its official website, subject to obtaining their prior consent or authorisation, either orally or in writing. Such consent or confirmation may be communicated directly to the Directors, Authorised Representatives, employees or partners of the Company. The Company shall endeavour to ensure that such publication is made in good faith, based on the consent or confirmation received from the concerned party, and without any intention to misrepresent an association, professional engagement or endorsement. In the event that any person or entity disputes the publication of its name, logo, testimonial, review or related material, or alleges that such material has been published without requisite consent or authorisation, the concerned party may submit a written objection to the Company at advisory@astronisglobal.com and/or astronisglobal@gmail.com,  specifying the disputed material and the grounds of objection. Upon receipt of such intimation, the Company shall review the objection and, where the publication is found to be unauthorised, inaccurate or otherwise objectionable on legally sustainable grounds, take appropriate corrective measures, including modification or removal of the disputed material, within a maximum period of ninety (90) days from the date of receipt of such intimation, or within any shorter period prescribed by applicable law. Nothing contained herein shall prejudice the statutory rights of any person or entity, including rights relating to privacy, confidentiality, intellectual property, data protection or other remedies available under applicable law."],
  },
  {
    title: "Confidentiality of Enquiries:",
    paragraphs: ["General website forms and unsolicited electronic communications should not be treated as automatically privileged or confidential. Users are advised not to submit sensitive case records, commercially confidential documents or privileged information before an appropriate secure communication or professional engagement arrangement has been established."],
  },
  {
    title: "Intellectual Property:",
    paragraphs: ["The Astronis Global name, ASTRONIS™ brand, logo and original website materials are protected to the extent available under applicable intellectual property law. Unauthorised reproduction, commercial use or misrepresentation of affiliation is prohibited."],
  },
  {
    title: "Limitation of Responsibility:",
    paragraphs: ["To the extent permitted by applicable law, Astronis Global disclaims responsibility for losses resulting from independent reliance upon general website information without obtaining appropriate professional advice. Nothing in this Disclaimer excludes rights, duties or liabilities that cannot lawfully be excluded."],
  },
  {
    title: "Contact",
    contacts: [
      { text: "Astronis Global Private Limited" },
      { text: "Email: advisory@astronisglobal.com", href: "mailto:advisory@astronisglobal.com" },
      { text: "Website: www.astronisglobal.com", href: "https://www.astronisglobal.com" },
      { text: "Telephone: 011-465-7-4455 / +91 9311664455", href: "tel:+919311664455" },
    ],
  },
];

export default function WebsiteDisclaimer() {
  return (
    <div className={styles.page} data-pdf-page="true">
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>WEBSITE DISCLAIMER</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Corporate . Regulatory . Legal . Business Advisory</p>
            <p>Effective Date: 17 October 2026</p>
          </div>
          <PdfDownloadButton />
        </div>
      </header>
      <article className={styles.document}>
        {sections.map((section, index) => (
          <section className={styles.section} key={section.title || `section-${index + 1}`}>
            {section.title && <h2><span>{index + 1}.</span> {section.title}</h2>}
            {section.numberedParagraph && <div className={styles.numberedParagraph}><span>{index + 1}.</span><p>{section.numberedParagraph}</p></div>}
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.contacts?.map((contact) => <p key={contact.text}>{contact.href ? <a href={contact.href}>{contact.text}</a> : contact.text}</p>)}
          </section>
        ))}
      </article>
    </div>
  );
}
