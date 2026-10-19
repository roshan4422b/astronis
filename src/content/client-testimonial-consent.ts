type Clause = { text?: string; heading?: string };
type AgreementSection = {
  title: string;
  paragraphs?: string[];
  clauses?: Clause[];
};

export const agreementSections: AgreementSection[] = [
  {
    title: "Parties and Purpose:",
    clauses: [
      { text: "This Client Testimonial, Review, Image & Logo Publication Consent and Authorisation Agreement (“Agreement”) governs the voluntary submission, publication and permitted use of testimonials, reviews, endorsements, photographs, video recordings, audio recordings, articles, client names, organisation names, company logos and related materials by Astronis Global Private Limited (“Company” or “Astronis Global”)." },
      { text: "“Contributor” means an individual, client, former client, prospective client, professional associate, authorised corporate representative or other person submitting or authorising the relevant material." },
      { text: "The purpose of this Agreement is to establish the scope of permission granted for publication while protecting the legitimate rights of the Contributor, the Company and affected third parties." },
    ],
  },
  {
    title: "Voluntary Submission:",
    clauses: [
      { text: "The Contributor confirms that the relevant testimonial, review or other material is submitted voluntarily and represents the Contributor's genuine opinion, experience or authorised statement." },
      { text: "A Contributor may submit material before, during or after obtaining services from the Company or its associated professionals." },
      { text: "Submission of a review shall not be interpreted as a guarantee of publication." },
      { text: "Where feedback was originally supplied privately, it shall not be treated as authorised for public promotional use merely because it was received by the Company." },
    ],
  },
  {
    title: "Express Publication Authorisation:",
    paragraphs: ["Subject to the specific selections made by the Contributor, the Contributor grants Astronis Global a non-exclusive, royalty-free, worldwide licence to reproduce, publish, display, distribute, communicate to the public and technically adapt the authorised materials for the agreed purposes and duration. The licence may cover:"],
    clauses: [
      { text: "Written testimonials and reviews." },
      { text: "Recorded audio and video or podcast or interview for testimonials or publication others social media platforms." },
      { text: "Photographs and portraits." },
      { text: "Contributor names, designations and professional descriptions." },
      { text: "Organisation names and logos." },
      { text: "Articles, statements and authorised excerpts." },
      { text: "Related material expressly identified and approved for publication." },
      { text: "This licence is subject to the Contributor's authority to grant the relevant rights and to applicable privacy, intellectual property and other mandatory laws." },
    ],
  },
  {
    title: "Permitted Publication Channels:",
    clauses: [
      { text: "The Company may publish authorised materials on its official Website, including testimonial pages, service pages, professional pages and relevant informational sections." },
      { text: "Publication through other channels, including social media, printed brochures, advertising campaigns, promotional presentations or third-party marketing platforms, shall require authorisation covering those channels." },
      { text: "The Contributor may select the permitted publication channels through the applicable consent form or written authorisation." },
    ],
  },
  {
    title: "Permission to Use Name, Photograph and Company Logo:",
    clauses: [
      { text: "Where expressly authorised, the Company may identify the Contributor by name, designation, photograph and organisation." },
      { text: "Use of a company name, trademark or logo shall be limited to the scope of the permission granted by the lawful rights holder or its duly authorised representative." },
      { text: "The Contributor represents that any third-party material submitted is provided with the necessary authority." },
      { text: "The Company shall not knowingly imply that an organisation is a current client, strategic partner or formal endorser where such representation is inaccurate." },
    ],
  },
  {
    title: "Editorial Rights and Accuracy:",
    clauses: [
      { text: "The Company may undertake reasonable editing, cropping, formatting, captioning, subtitling, resizing and technical adaptation necessary for presentation, accessibility and compatibility with publication platforms." },
      { text: "Such changes shall not materially alter the Contributor's intended meaning or create a misleading impression." },
      { text: "The Company shall not knowingly fabricate testimonials, alter a negative review into a positive endorsement or attribute statements to a person who did not make or authorise them." },
    ],
  },
  {
    title: "Remuneration and Consideration:",
    clauses: [
      { text: "Unless otherwise agreed in writing, the Contributor shall not be entitled to remuneration, royalties or other payment solely for the Company's permitted use of voluntarily authorised testimonial materials." },
      { text: "Any incentive, commercial relationship or other material connection requiring disclosure under applicable advertising or consumer protection standards shall be appropriately disclosed." },
    ],
  },
  {
    title: "Duration and Withdrawal of Consent:",
    clauses: [
      { text: "The publication authorisation shall remain effective until its stated expiry, lawful termination or withdrawal, as applicable to the particular permission granted." },
      { text: "Where publication involves personal data processed on the basis of consent, the Contributor may withdraw that consent in accordance with applicable law." },
      { text: "Withdrawal shall not retrospectively invalidate processing lawfully undertaken before withdrawal." },
      { text: "Upon receiving a valid withdrawal or removal request, the Company shall take appropriate steps concerning materials under its control within the timeframe required by applicable law." },
      { text: "The Company may retain records reasonably necessary to demonstrate the original authorisation, comply with legal obligations or establish, exercise or defend lawful claims." },
      { text: "The Company cannot guarantee immediate removal of independent third-party copies, search-engine caches or materials outside its control, but shall comply with any applicable obligations concerning such materials." },
    ],
  },
  {
    title: "Objections, Corrections and Disputed Materials:",
    clauses: [
      { text: "A Contributor or affected rights holder may submit a written objection concerning an inaccurate, misleading, unauthorised or otherwise unlawful publication." },
      { text: "The objection should identify the material, explain the grounds and provide sufficient information to enable reasonable verification." },
      { text: "The Company shall review such objections promptly and take appropriate corrective action, including correction, suspension or removal where warranted." },
      { text: "For routine disputes not requiring immediate action, the Company shall endeavour to complete review and resolution within ninety (90) days of receiving sufficient particulars." },
      { text: "The ninety-day period shall not override any shorter statutory deadline or justify continued publication where applicable law requires earlier restriction or removal." },
    ],
  },
  {
    title: "Confidentiality and Professional Obligations:",
    clauses: [
      { text: "The Contributor shall not submit confidential information, privileged communications, protected client documents or information concerning third parties without appropriate authority." },
      { text: "The Company shall not publish material in violation of applicable professional confidentiality duties or legal restrictions." },
      { text: "Where testimonials concern services performed by advocates or other regulated professionals, publication shall additionally be subject to applicable professional conduct and advertising restrictions." },
      { text: "Consent from a client does not independently authorise publication prohibited by professional regulation." },
    ],
  },
  {
    title: "Intellectual Property Rights",
    clauses: [
      { text: "The Contributor retains ownership of intellectual property lawfully owned by the Contributor, subject to the licence expressly granted under this Agreement." },
      { text: "The Company retains ownership of its original website layout, editorial presentation and independently created materials, subject to the Contributor's underlying rights." },
      { text: "No trademark ownership is transferred merely by authorising display of a name or logo." },
    ],
  },
  {
    title: "Personal Data and International Users:",
    clauses: [
      { text: "Personal information contained in testimonials shall be processed in accordance with the Company's Privacy Policy and applicable law." },
      { text: "Where foreign data protection or personality rights laws mandatorily apply, the relevant rights and restrictions shall be respected." },
      { text: "The Company may request additional written authorisation or provide jurisdiction-specific disclosures where required." },
    ],
  },
  {
    title: "Contributor Representations:",
    paragraphs: ["The Contributor represents, to the best of their knowledge, that:"],
    clauses: [
      { text: "The submitted statements reflect genuine experiences or authorised views." },
      { text: "The Contributor has the legal capacity to grant the relevant permissions." },
      { text: "The material does not knowingly infringe third-party rights." },
      { text: "Any organisation name or logo is submitted with appropriate authority." },
      { text: "The submission is not intentionally false, defamatory or misleading." },
      { text: "The Company remains responsible for its own publication decisions and compliance obligations." },
    ],
  },
  {
    title: "No Guarantee of Publication:",
    clauses: [
      { text: "The Company may decline, defer, discontinue or remove publication where reasonably necessary for legal, professional, editorial, operational or reputational reasons." },
      { text: "Nothing in this Agreement obliges the Company to publish every submitted review or endorsement." },
      { heading: "Electronic and Written Authorisation" },
      { text: "Authorisation may be documented through an affirmative electronic acceptance, a signed release or another legally valid and verifiable method." },
      { text: "For company logos, identifiable photographs, promotional videos and materials involving third-party rights, written or electronically recorded authorisation is strongly preferred." },
      { text: "The Company may retain records of the authorisation, including the relevant content, consent selections, date, time and document version, subject to applicable law." },
    ],
  },
  {
    title: "Governing Law and Jurisdiction:",
    clauses: [
      { text: "This Agreement shall be governed by the laws of India, subject to mandatory applicable privacy, intellectual property, consumer protection and other laws." },
      { text: "Subject to mandatory jurisdictional protections, disputes arising under this Agreement shall be subject to competent courts at New Delhi, India." },
    ],
  },
  {
    title: "Contact and Removal Requests:",
    clauses: [
      { text: "Astronis Global Private Limited" },
      { text: "Website: www.astronisglobal.com" },
      { text: "Email: advisory@astronisglobal.com" },
      { text: "Telephone: 011-465-7-4455 / +91 9311664455" },
    ],
  },
  {
    title: "Contributor Declaration:",
    paragraphs: [
      "I confirm that I have voluntarily submitted the identified testimonial, review or other material and grant Astronis Global Private Limited permission to publish it through the channels expressly selected by me.",
      "I confirm that I possess the necessary rights and authority over the material submitted and understand my applicable rights concerning personal data, publication and withdrawal of consent.",
      "I acknowledge that any permitted publication shall remain subject to applicable law and professional conduct requirements.",
    ],
  },
];

