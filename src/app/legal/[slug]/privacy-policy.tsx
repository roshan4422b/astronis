import styles from "./privacy-policy.module.css";

const sections = [
  {
    title: "Introduction:",
    paragraphs: [
      "Astronis Global Private Limited (“Astronis Global”, “Company”, “we”, “us” or “our”) respects the privacy and confidentiality of individuals who visit our website, communicate with us or seek our Corporate, Regulatory, Legal, Financial, Business Advisory and related professional services. This Privacy Policy explains how we collect, use, process, store, disclose and protect personal information through our website, digital communication channels, enquiry forms, professional interactions and related online services. We are committed to handling personal information responsibly and in accordance with applicable Indian laws, including the Information Technology Act, 2000, applicable rules thereunder and the Digital Personal Data Protection Act, 2023, together with the provisions and rules brought into force from time to time.",
    ],
  },
  {
    title: "Scope and Applicability:",
    paragraphs: [
      "This Policy applies to website visitors, prospective and existing clients, professional associates, business partners, consultants, applicants, subscribers and other individuals who interact with Astronis Global through its website or associated digital channels. Where personal information is processed under a separate professional engagement, confidentiality agreement, employment arrangement or contractual relationship, the relevant terms shall apply in addition to this Policy, subject to applicable law.",
    ],
  },
  {
    title: "Information We May Collect",
    paragraphs: ["Depending on the nature of the interaction, we may collect:"],
    clauses: [
      "Identification and contact details: Name, designation, organisation, email address, telephone number, business address and related contact information.",
      "Professional and business information: Industry, company details, nature of enquiry, business requirements and information relevant to a requested service.",
      "Documents and communications: Information voluntarily provided through correspondence, enquiries, professional consultations, document submissions or client interactions.",
      "Technical information: IP address, browser type, device characteristics, website usage information, referral sources and technical logs, where collected through the website's systems.",
      "Recruitment information: Qualifications, employment history, professional experience and other information submitted in connection with career opportunities.",
      "Other information: Information reasonably necessary for identity verification, due diligence, regulatory compliance, contractual performance or professional engagements.",
    ],
    ending: "We request that individuals avoid submitting sensitive or confidential documents through general website enquiry forms unless an appropriate secure communication channel has been established.",
  },
  {
    title: "Purposes of Processing:",
    paragraphs: ["We may process personal information for legitimate and lawful purposes, including:"],
    clauses: [
      "Responding to enquiries and communicating with prospective clients.",
      "Evaluating service requirements and professional engagement requests.",
      "Providing corporate, regulatory, legal and business advisory services under appropriate arrangements.",
      "Conducting conflict checks, due diligence and applicable client onboarding.",
      "Maintaining client and professional relationships.",
      "Managing recruitment, internships and professional collaborations.",
      "Sending requested publications, newsletters, invitations and regulatory updates, subject to applicable consent and communication requirements.",
      "Maintaining website functionality, security and operational performance.",
      "Preventing fraud, unauthorised access and misuse.",
      "Meeting applicable statutory, regulatory, professional, accounting and recordkeeping obligations.",
      "Establishing, exercising or defending lawful rights and claims.",
      "Personal information shall not be processed for unrelated purposes without an appropriate legal basis or further consent where required.",
    ],
  },
  {
    title: "Consent and Lawful Processing:",
    paragraphs: [
      "Where consent is required under applicable law, Astronis Global will seek consent through an appropriate notice or affirmative action identifying the relevant processing purpose. Where the law permits processing on another applicable ground, information may be processed in accordance with that ground and its statutory conditions. Individuals may withdraw consent through the relevant website mechanism, where available, or by contacting us. Withdrawal shall not invalidate processing lawfully undertaken before withdrawal and may affect services that depend on the relevant information.",
    ],
  },
  {
    title: "Disclosure of Information",
    paragraphs: ["We may disclose personal information, where reasonably necessary and legally permissible, to:"],
    clauses: [
      "Authorised employees, directors and professional personnel.",
      "Independent advocates, chartered accountants, company secretaries, consultants and other engaged professionals.",
      "Approved technology, hosting, communications, document management and administrative service providers.",
      "Regulatory authorities, courts, tribunals, law enforcement agencies and other public authorities where disclosure is legally required or permitted.",
      "Professional associates or overseas advisers involved in a requested cross-border engagement, subject to applicable confidentiality and data protection requirements.",
      "We do not sell personal information to third parties.",
      "Information sharing with external professional advisers is subject to applicable engagement terms, confidentiality obligations and legal restrictions.",
    ],
  },
  {
    title: "International Data Transfers:",
    paragraphs: [
      "Given the cross-border nature of certain advisory services, personal information may be processed or accessed outside India where necessary for an authorised purpose. Such transfers shall be undertaken subject to applicable Indian data protection requirements, any restrictions notified by the Government of India and relevant contractual or confidentiality safeguards. Where foreign privacy laws apply to a particular engagement, additional notices or contractual protections may be provided.",
    ],
  },
  {
    title: "Data Security and Confidentiality:",
    paragraphs: [
      "Astronis Global endeavours to implement reasonable technical, organisational and administrative safeguards proportionate to the nature of the information and risks involved. These may include access controls, authorised personnel restrictions, secure communications, appropriate vendor arrangements, backups and incident response procedures. No internet-based transmission or electronic storage system can be guaranteed to be completely secure. Users should exercise appropriate care when submitting information electronically. Any personal data breach will be assessed and addressed in accordance with the notification, mitigation and other obligations applicable at the relevant time.",
    ],
  },
  {
    title: "Retention of Personal Information:",
    paragraphs: [
      "Personal information shall be retained only for the period reasonably necessary to fulfil its processing purpose, satisfy applicable statutory or regulatory obligations, maintain relevant professional records, resolve disputes or protect lawful interests. Retention periods may differ depending on the category of information, nature of engagement, applicable legal requirements and relevant limitation periods. Upon expiry of the applicable retention period, information shall be deleted, anonymised or otherwise securely disposed of, subject to lawful retention requirements.",
    ],
  },
  {
    title: "Rights of Individuals:",
    paragraphs: [
      "Subject to applicable law and the commencement of relevant statutory provisions, individuals may have rights concerning access to information about processing, correction, updating, erasure, withdrawal of consent, grievance redressal and nomination. Requests may be submitted to advisory@astronisglobal.com. We may request reasonable verification of identity and additional information necessary to process a request. Responses shall be provided in accordance with applicable legal requirements.",
    ],
  },
  {
    title: "Cookies and Similar Technologies:",
    paragraphs: [
      "Our website may use cookies or similar technologies for functionality, performance, security, preferences and other purposes described in our separate Cookie Policy. Where legally required, non-essential technologies shall be subject to appropriate notice and consent arrangements.",
    ],
  },
  {
    title: "Third-Party Websites:",
    paragraphs: [
      "Our website may contain links to government portals, regulatory authorities, professional organisations, external publications and other third-party websites. We do not control the privacy practices of independent third-party websites. Users should review their respective privacy policies before providing personal information.",
    ],
  },
  {
    title: "Children's Personal Information:",
    paragraphs: [
      "Our website and professional services are principally intended for adults, businesses and professional users. We do not intentionally solicit personal information directly from children through general marketing or enquiry facilities. Where processing children's personal information becomes necessary, appropriate safeguards and legally required parental or guardian consent arrangements shall be followed.",
    ],
  },
  {
    title: "Marketing Communications:",
    paragraphs: [
      "Individuals who subscribe to updates or request information may receive relevant communications from Astronis Global. Recipients may request discontinuation of optional marketing communications by using an available unsubscribe mechanism or contacting advisory@astronisglobal.com. Operational, contractual or legally required communications may continue where permitted by law.",
    ],
  },
  {
    title: "Changes to This Policy:",
    paragraphs: [
      "Astronis Global may revise this Policy to reflect changes in applicable law, technology, operational practices or services. The revised version will be published on this website with an updated effective or revision date. Material changes will be communicated through appropriate means where required by law.",
    ],
  },
  {
    title: "Privacy Enquiries and Grievance Redressal:",
    paragraphs: ["For privacy enquiries, requests, complaints or concerns, please contact:"],
    contacts: [
      { text: "Astronis Global Private Limited" },
      { text: "Email: advisory@astronisglobal.com", href: "mailto:advisory@astronisglobal.com" },
      { text: "Telephone: 011-465-7-4455 / +91 9311664455", href: "tel:+919311664455" },
      { text: "Website: www.astronisglobal.com", href: "https://www.astronisglobal.com" },
    ],
  },
  {
    title: "Designated Privacy / Grievance Contact:",
    paragraphs: [
      "Details to be published upon formal designation. Where applicable law provides a right to approach a competent authority or the Data Protection Board of India, individuals may exercise that right in accordance with the applicable statutory procedure.",
    ],
  },
  {
    title: "Governing Law:",
    paragraphs: [
      "This Policy shall be interpreted in accordance with applicable laws of India, without prejudice to mandatory data protection rights or remedies available under applicable law.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>PRIVACY POLICY</h1>
          <div className={styles.metadata}>
            <p>ASTRONIS GLOBAL PRIVATE LIMITED</p>
            <p>WEBSITE: WWW.ASTRONISGLOBAL.COM</p>
            <p>EFFECTIVE DATE: 17 OCTOBER 2026</p>
          </div>
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
