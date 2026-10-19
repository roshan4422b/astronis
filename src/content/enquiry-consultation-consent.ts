export type EnquiryConsentSection = {
  title: string;
  paragraphs?: string[];
  clauses?: string[];
};

export const enquiryConsentSections: EnquiryConsentSection[] = [
  {
    title: "Parties and Applicability:",
    paragraphs: [
      "This Enquiry, Communication & Consultation Consent Agreement (\u201cAgreement\u201d) governs the submission of enquiries, requests for information, requests for professional services and consultation or appointment bookings through the website of Astronis Global Private Limited (\u201cCompany\u201d or \u201cAstronis Global\u201d). For the purposes of this Agreement, \u201cUser\u201d includes any website visitor, prospective client, existing client, former client, individual, company, organisation or duly authorised representative submitting information or seeking communication through the Website. By affirmatively accepting this Agreement through the relevant website form, the User agrees to its applicable contractual terms and acknowledges the related Privacy Policy.",
    ],
  },
  {
    title: "Voluntary Submission of Information:",
    paragraphs: [
      "The User confirms that the information submitted through the Website is provided voluntarily and is accurate to the best of the User's knowledge. Such information may include name, organisation, designation, email address, telephone number, location, nature of enquiry, preferred service, appointment details and documents or information voluntarily submitted in connection with the request. Where the User provides information relating to another person or organisation, the User confirms that the disclosure is authorised or otherwise lawful.",
    ],
  },
  {
    title: "Authorisation to Contact and Communicate:",
    paragraphs: [
      "The User expressly requests and authorises Astronis Global, its Directors, authorised representatives, employees, designated professionals and relevant service personnel to contact the User for purposes directly connected with the enquiry, appointment or requested services. Communications may take place through telephone calls, email, SMS, WhatsApp, video conferencing, written correspondence or other contact channels voluntarily provided or selected by the User, subject to applicable law. The authorised purposes include:",
    ],
    clauses: [
      "Acknowledging and clarifying the enquiry.",
      "Discussing professional or business requirements.",
      "Scheduling, confirming, rescheduling or cancelling consultations.",
      "Explaining the nature, scope and availability of services.",
      "Providing quotations, proposals, engagement documentation and fee information.",
      "Conducting preliminary eligibility, conflict-of-interest or onboarding checks.",
      "Requesting documents or information reasonably necessary to evaluate the enquiry.",
      "Communicating regarding an accepted engagement, payment, documentation or service delivery.",
      "The Company may make reasonable follow-up communications concerning the original request. Such authorisation shall not constitute unlimited permission for unrelated marketing or unsolicited promotional contact.",
    ],
  },
  {
    title: "Separate Marketing Consent:",
    paragraphs: [
      "Consent to receive optional newsletters, promotional campaigns, event invitations, general service announcements or other marketing communications shall be obtained separately where required. Refusal or withdrawal of optional marketing consent shall not, by itself, prevent the User from submitting an enquiry or requesting an available service. The User may request discontinuation of optional marketing communications at any time through the published contact details or an available unsubscribe facility",
    ],
  },
  {
    title: "Free and Paid Consultations:",
    paragraphs: [
      "A request for a free consultation shall not create an entitlement to comprehensive legal advice, document review, written opinions, representation or other professional deliverables. Free appointments may be subject to availability, eligibility, reasonable duration limits and the Company's confirmation. Where a paid consultation is selected, the applicable fee, scope, scheduling, cancellation and refund conditions shall be disclosed before payment and governed by the Company's separate Payment, Professional Fees, Cancellation & Refund Agreement and any applicable engagement terms.",
    ],
  },
  {
    title: "No Automatic Professional Engagement:",
    paragraphs: [
      "Submission of an enquiry, exchange of correspondence, booking request or preliminary discussion shall not, by itself, establish an advocate\u2013client, consultant\u2013client, fiduciary or other professional engagement relationship. A professional engagement shall arise only upon acceptance of instructions, completion of applicable formalities and satisfaction of relevant professional or regulatory requirements. The Company reserves the right to decline an enquiry or proposed engagement for lawful professional, commercial, conflict-of-interest or operational reasons.",
    ],
  },
  {
    title: "Confidentiality and Sensitive Information:",
    paragraphs: [
      "The Company shall handle personal information in accordance with its Privacy Policy and applicable confidentiality obligations. The User acknowledges that general website enquiry forms and unsolicited communications may not provide the same confidentiality safeguards as an established professional engagement or an agreed secure communication channel. The User should refrain from submitting privileged, highly sensitive or commercially confidential documents until an appropriate communication arrangement has been confirmed.",
    ],
  },
  {
    title: "Personal Data Processing:",
    paragraphs: [
      "Personal information submitted under this Agreement may be processed for responding to the enquiry, managing appointments, evaluating requested services, maintaining necessary communication records and fulfilling related lawful purposes. The Company's Privacy Policy shall explain applicable processing purposes, disclosures, retention practices, security measures, grievance arrangements and available rights. Where consent is required under applicable data protection law, it shall be obtained and managed in accordance with that law. The User may exercise applicable statutory rights, including withdrawal of consent where available, without affecting the lawfulness of processing undertaken before withdrawal.",
    ],
  },
  {
    title: "International Users:",
    paragraphs: [
      "Users located outside India acknowledge that communications and service-related processing may involve India-based personnel and systems. Where the laws of another jurisdiction mandatorily apply, including relevant privacy, electronic communications or consumer protection requirements, such laws shall prevail to the extent legally required. The Company may provide additional jurisdiction-specific notices or consent options where necessary.",
    ],
  },
  {
    title: "Electronic Acceptance and Records:",
    paragraphs: [
      "The User's affirmative selection of the relevant acceptance checkbox and subsequent form submission may constitute electronic acceptance of this Agreement, subject to applicable law. The Company may retain reasonable evidence of acceptance, including the form reference, date, time, applicable document version and relevant transaction records, in accordance with its Privacy Policy.",
    ],
  },
  {
    title: "Withdrawal of Communication Permission:",
    paragraphs: [
      "The User may request discontinuation of optional or non-essential communications by writing to advisory@astronisglobal.com. Such a request shall be implemented subject to applicable law and shall not prevent communications necessary for an existing contract, legal obligation, dispute or other lawfully permitted purpose.",
    ],
  },
  {
    title: "Limitation of Website Enquiry Services:",
    paragraphs: [
      "The Company does not guarantee that every enquiry will be accepted, that an appointment will be available at a requested time or that any particular professional outcome will be achieved. Nothing in this Agreement excludes liability or rights that cannot lawfully be excluded.",
    ],
  },
  {
    title: "Governing Law and Jurisdiction:",
    paragraphs: [
      "This Agreement shall be governed by the laws of India, subject to any mandatory law applicable to the User or the relevant transaction. Subject to mandatory statutory jurisdiction and any separate valid agreement, disputes concerning this Agreement shall be subject to the competent courts at New Delhi, India.",
    ],
  },
  {
    title: "Contact:",
    clauses: [
      "Astronis Global Private Limited",
      "Website: www.astronisglobal.com",
      "Email: advisory@astronisglobal.com",
      "Telephone: 011-465-7-4455 / +91 9311664455",
    ],
  },
];

export const enquiryUserDeclaration = {
  title: "User Declaration:",
  paragraphs: [
    "I confirm that I have read and understood this Enquiry, Communication & Consultation Consent Agreement, agree to its applicable terms, and authorise Astronis Global Private Limited and its designated personnel to contact me for purposes directly connected with my submitted enquiry or consultation request.",
  ],
  signature: "(User of the website)",
};
