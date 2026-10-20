import styles from "./privacy-policy.module.css";
import PdfDownloadButton from "./pdf-download-button";

type CookieSection = {
  title: string;
  paragraphs?: string[];
  clauses?: string[];
};

const sections: CookieSection[] = [
  {
    title: "Introduction and Scope:",
    paragraphs: [
      "Astronis Global Private Limited (“Astronis Global”, “Company”, “we”, “us” or “our”) respects the privacy of individuals accessing its official website, www.astronisglobal.com (“Website”). This Cookie Policy explains the nature, purpose and use of cookies and similar technologies that may be employed in connection with the Website, including the measures available to visitors for managing their preferences. This Policy shall be read together with the Company's Privacy Policy and Terms of Use and shall be interpreted in accordance with applicable Indian laws, including the Information Technology Act, 2000 and applicable provisions of the Digital Personal Data Protection Act, 2023 and the rules framed thereunder, as brought into force from time to time.",
    ],
  },
  {
    title: "Meaning and Nature of Cookies:",
    paragraphs: [
      "Cookies are small electronic files or pieces of information that may be stored on a user's computer, mobile device or browser when accessing a website. Cookies and similar technologies may facilitate website navigation, security, technical functionality, user preferences, performance monitoring and other permitted purposes. Cookies may be temporary, remaining active during a browsing session, or persistent, remaining on a device for a specified period.",
    ],
  },
  {
    title: "Current Use of Cookies:",
    paragraphs: [
      "As represented in the Website's current Cookie Policy, Astronis Global does not presently deploy advertising trackers or analytics cookies. However, certain essential technical mechanisms may be used by the Website, hosting infrastructure or associated service providers to support security, website functionality, network operations and reliable delivery of digital content. The Company shall not represent that a particular cookie or tracking technology is deployed unless such technology is actually implemented. Any future introduction of analytics, advertising, marketing or other non-essential tracking technologies shall be accompanied by appropriate amendments to this Policy and applicable consent arrangements.",
    ],
  },
  {
    title: "Categories of Cookies and Similar Technologies:",
    paragraphs: ["Depending upon the Website's technical configuration, the following categories may be applicable:"],
    clauses: [
      "Strictly Necessary Cookies - These support essential functions such as security, website navigation, session integrity, fraud prevention and technical operations. Disabling these technologies may affect website functionality.",
      "Functional Cookies - These may remember user preferences, language settings, accessibility choices or other selected features to improve the browsing experience.",
      "Analytics and Performance Cookies - These may be used in the future to understand website traffic, technical performance, navigation patterns and user interaction. Such technologies are not presently represented as active.",
      "Advertising and Marketing Cookies - These may be introduced for campaign measurement, advertising attribution or related purposes, subject to applicable legal requirements and appropriate user choices. The above descriptions identify possible categories and do not constitute confirmation that every category is currently in use.",
    ],
  },
  {
    title: "Purpose and Lawful Use:",
    paragraphs: [
      "Where implemented, cookies and similar technologies may be used for maintaining website functionality, protecting digital infrastructure, improving accessibility, remembering preferences and supporting other clearly identified purposes. Where cookie-derived information constitutes personal data, its processing shall be subject to the applicable requirements of Indian data protection law. The Company shall endeavour to limit such processing to lawful, specified and reasonably necessary purposes.",
    ],
  },
  {
    title: "Consent and User Preferences:",
    paragraphs: [
      "Where applicable law requires consent for a particular technology or associated personal data processing, the Company shall implement an appropriate mechanism for obtaining and managing such consent. Where implemented, users may be provided with options to accept, reject or modify preferences relating to non-essential cookies. Withdrawal of consent shall be facilitated in accordance with applicable law and shall not retrospectively invalidate lawful processing undertaken before withdrawal. Cookies necessary for lawful and essential website operations may continue to function to the extent permitted by applicable law.",
    ],
  },
  {
    title: "Third-Party Technologies",
    paragraphs: [
      "The Website may contain links to government authorities, regulators, professional institutions, external publications and other independent websites. The Website may also incorporate third-party functionality, where implemented, such as embedded videos, external forms, maps or communication services. Such third parties may operate under their own privacy and cookie policies. Astronis Global shall not be responsible for independent third-party websites beyond the extent of responsibility imposed by applicable law.",
    ],
  },
  {
    title: "Managing and Disabling Cookies:",
    paragraphs: [
      "Users may manage or delete cookies through their browser settings. Most modern browsers permit users to block cookies, delete stored information or restrict particular tracking technologies. Restricting essential technologies may affect website functionality or the availability of certain features. Browser controls may not necessarily disable all forms of tracking or information processing.",
    ],
  },
  {
    title: "Retention and Protection of Information:",
    paragraphs: [
      "Any information collected through cookies or similar technologies shall be retained only for an appropriate period having regard to its purpose, technical requirements and applicable law. Where such information constitutes personal data, the Company shall apply appropriate confidentiality, access control, security and retention measures in accordance with its Privacy Policy and applicable statutory requirements.",
    ],
  },
  {
    title: "Amendments to Cookie Policy:",
    paragraphs: [
      "Astronis Global reserves the right to revise this Policy to reflect changes in website functionality, technology, applicable law, service providers or internal practices. Any revised Policy shall be published on the Website with an updated revision date. Where legally required, appropriate notice or renewed consent shall be obtained before introducing materially different processing activities.",
    ],
  },
  {
    title: "Contact and Grievance Communication:",
    paragraphs: ["For enquiries, concerns or requests relating to cookies and website privacy, visitors may contact:"],
    clauses: [
      "Astronis Global Private Limited",
      "First Level: advisory@astronisglobal.com",
      "Final Level: astronisglobal@gmail.com",
      "Telephone: 011-465-7-4455 / +91 9311664455",
      "Website: www.astronisglobal.com",
      "Privacy-related grievances shall be handled in accordance with the Company's Privacy Policy and applicable law.",
    ],
  },
  {
    title: "Governing Law:",
    paragraphs: [
      "This Cookie Policy shall be governed by and interpreted in accordance with the applicable laws of India, without prejudice to mandatory statutory rights and remedies available to users.",
    ],
  },
];

export default function CookiePolicy() {
  return (
    <div className={styles.page} data-pdf-page="true">
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>COOKIE POLICY</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Last Updated: 17 October 2026</p>
          </div>
          <PdfDownloadButton />
        </div>
      </header>
      <article className={styles.document}>
        {sections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <h2><span>{index + 1}.</span> {section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.clauses && <ol type="a">{section.clauses.map((clause) => <li key={clause}>{clause}</li>)}</ol>}
          </section>
        ))}
      </article>
    </div>
  );
}
