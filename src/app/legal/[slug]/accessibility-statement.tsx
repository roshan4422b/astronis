import styles from "./privacy-policy.module.css";

const sections = [
  {
    title: "Introduction and Commitment:",
    paragraphs: [
      "Astronis Global Private Limited (“Astronis Global”, “Company”, “we”, “us” or “our”) is committed to promoting accessibility, inclusiveness and equal access to information through its official website, www.astronisglobal.com. The Company recognises the importance of ensuring that individuals, including persons with disabilities, can access information concerning its corporate, regulatory, legal and business advisory services without unreasonable technological barriers. Astronis Global endeavours to develop, maintain and improve its digital platforms in accordance with applicable Indian laws and recognised accessibility principles.",
    ],
  },
  {
    title: "Applicable Legal and Accessibility Framework:",
    paragraphs: [
      "The Company acknowledges the principles of accessibility and equal opportunity reflected in the Rights of Persons with Disabilities Act, 2016, applicable rules and other relevant legal requirements. In developing and improving its digital platforms, the Company aims to follow recognised international accessibility practices, including the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA, where reasonably practicable. Reference to these guidelines represents an accessibility objective and does not constitute a declaration of independently certified compliance.",
    ],
  },
  {
    title: "Accessibility Features and Standards:",
    paragraphs: ["Subject to technical feasibility, the Website shall endeavour to incorporate accessibility considerations, including:"],
    clauses: [
      { text: "Clear and consistent navigation across webpages." },
      { text: "Readable fonts, appropriate text spacing and sufficient colour contrast." },
      { text: "Proper heading structures and logical organisation of information." },
      { text: "Keyboard-accessible navigation and interactive functions." },
      { text: "Alternative text descriptions for informative images and graphics." },
      { text: "Appropriate labels and instructions for enquiry forms and other interactive elements." },
      { text: "Responsive layouts compatible with commonly used mobile, tablet and desktop devices." },
      { text: "Support for recognised assistive technologies, including screen readers, wherever technically practicable." },
      { text: "Clear identification of links, buttons, error messages and interactive controls." },
      { text: "Accessible presentation of legal policies, professional information and other important website content." },
      { text: "These measures are accessibility objectives and should not be construed as a representation that every feature has already been implemented or independently tested." },
      {
        heading: "Accessibility of Documents and Digital Resources",
      },
      { text: "The Website may contain articles, professional publications, regulatory updates, documents, images, videos and links to external resources." },
      { text: "Astronis Global endeavours to make such information reasonably accessible. However, certain historical documents, scanned records, complex charts, multimedia materials or third-party resources may present accessibility limitations" },
      { text: "Where reasonably feasible, users may request an alternative format or assistance in accessing relevant information." },
    ],
  },
  {
    title: "Accessibility of Forms and Communication Channels:",
    paragraphs: [
      "The Company endeavours to make its digital enquiry and communication facilities reasonably accessible. Where a visitor experiences difficulty using an online form or other website functionality, the visitor may communicate through the Company's published email address or telephone numbers. Alternative communication arrangements may be considered depending upon the nature of the request and available resources.",
    ],
  },
  {
    title: "Third-Party Websites and External Platforms:",
    paragraphs: [
      "The Website may contain links to government portals, regulatory authorities, professional institutions, digital platforms and independent third-party websites. Such external platforms may be subject to accessibility standards and technical arrangements beyond the Company's direct control. Astronis Global does not warrant the accessibility or uninterrupted operation of independent third-party websites.",
    ],
  },
  {
    title: "Continuous Review and Improvement:",
    paragraphs: [
      "Accessibility is an ongoing responsibility. Astronis Global may periodically review its website structure, navigation, design, content and functionality to identify and address accessibility-related concerns. Reasonable corrective measures may be undertaken having regard to applicable legal obligations, technical feasibility and the nature of any reported accessibility barrier. The Company does not guarantee that every webpage, document or digital feature will be free from accessibility limitations at all times.",
    ],
  },
  {
    title: "Reporting Accessibility Issues",
    paragraphs: [
      "Visitors who encounter difficulty accessing any webpage, document, form or digital feature may report the issue to the Company. Such communication should, where practicable, identify the relevant webpage or content, describe the accessibility difficulty and indicate the assistance required. The Company shall endeavour to review genuine accessibility concerns and take appropriate corrective measures within a reasonable period, subject to applicable law.",
    ],
  },
  {
    title: "Contact for Accessibility Assistance",
    contact: true,
  },
  {
    title: "Amendments and Governing Law:",
    paragraphs: [
      "This Accessibility Statement may be amended to reflect changes in applicable law, accessibility standards, website technology or the Company's digital operations. The Statement shall be interpreted in accordance with the applicable laws of India, without prejudice to any mandatory statutory rights or remedies.",
    ],
  },
];

export default function AccessibilityStatement() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>ACCESSIBILITY STATEMENT</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>Last Updated: 17 October 2026</p>
          </div>
        </div>
      </header>
      <article className={styles.document}>
        {sections.map((section, index) => (
          <section className={styles.section} key={section.title}>
            <h2><span>{index + 1}.</span> {section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.clauses && (
              <ol type="a">
                {section.clauses.map((clause) => (
                  <li key={clause.heading ?? clause.text}>
                    {clause.heading ? (
                      <h3 className={styles.subsectionHeading}>{clause.heading}</h3>
                    ) : clause.text}
                  </li>
                ))}
              </ol>
            )}
            {section.contact && (
              <div className={styles.contactDetails}>
                <p>Astronis Global Private Limited</p>
                <p>Email: <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a></p>
                <p>Telephone: <a href="tel:+919311664455">011-465-7-4455 / +91 9311664455</a></p>
                <p>Website: <a href="https://www.astronisglobal.com">www.astronisglobal.com</a></p>
              </div>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
