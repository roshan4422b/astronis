export type FemaCrossBorderDetail = {
  slug: string;
  groupSlug: "fema-compliance-and-support" | "fdi-compliance-and-support";
  title: string;
  subtitle: string;
  description: string;
  overviewTitle: string;
  overview: string;
  services: { title: string; text: string }[];
  whyNeeded: string[];
  benefits: { title: string; text: string }[];
  framework: string[];
  comparison: { heading: string; columns: string[]; rows: string[][] };
  process: { title: string; text: string }[];
  documents: string[];
  timelines: { matter: string; typical: string }[];
  fees: { matter: string; basis: string }[];
  precautions: string[];
  faqs: { question: string; answer: string }[];
  finalHeading: string;
};

const sharedProcess = [
  { title: "Transaction assessment", text: "Understand parties, purpose, amounts, jurisdictions and proposed transaction." },
  { title: "Regulatory classification", text: "Identify the applicable FEMA, RBI, FDI or reporting framework." },
  { title: "Documentation review", text: "Collect and verify transaction records, approvals and supporting evidence." },
  { title: "Submission preparation", text: "Prepare the relevant filing or application with the authorised dealer bank." },
  { title: "Implementation", text: "Coordinate the transaction steps, approvals and reporting responsibilities." },
  { title: "Ongoing compliance", text: "Track acknowledgements, timelines, follow-up and continuing obligations." },
];

const sharedDocuments = [
  "Corporate and incorporation documents",
  "Shareholding, ownership and beneficial ownership details",
  "Transaction agreements and board approvals",
  "Bank statements and remittance records",
  "Valuation and pricing support, where applicable",
  "Investor, counterparty and KYC information",
  "Previous regulatory filings and correspondence",
];

const sharedPrecautions = [
  "Confirm the applicable route and permissions before funds or securities move.",
  "Use consistent transaction details across agreements, bank records and filings.",
  "Keep approvals, acknowledgements and supporting evidence together.",
  "Track reporting dates and any conditions attached to an approval.",
  "Obtain current tax, valuation and authorised dealer bank inputs where needed.",
];

const sharedTimelines = [
  { matter: "Initial assessment", typical: "3–5 working days" },
  { matter: "Document review and preparation", typical: "5–10 working days" },
  { matter: "Bank / authority processing", typical: "Depends on the matter" },
  { matter: "Follow-up and reporting", typical: "As per applicable timelines" },
];

const sharedFees = [
  { matter: "Regulatory assessment", basis: "Scoped after initial review" },
  { matter: "Filing / reporting support", basis: "Based on transaction complexity" },
  { matter: "Application / approval support", basis: "Quoted for the specific matter" },
];

const makeDetail = (
  detail: Omit<FemaCrossBorderDetail, "process" | "documents" | "timelines" | "fees" | "precautions"> &
    Partial<Pick<FemaCrossBorderDetail, "process" | "documents" | "timelines" | "fees" | "precautions">>,
): FemaCrossBorderDetail => ({
  ...detail,
  process: detail.process ?? sharedProcess,
  documents: detail.documents ?? sharedDocuments,
  timelines: detail.timelines ?? sharedTimelines,
  fees: detail.fees ?? sharedFees,
  precautions: detail.precautions ?? sharedPrecautions,
});

export const femaCrossBorderDetails: FemaCrossBorderDetail[] = [
  makeDetail({
    slug: "fema-advisory",
    groupSlug: "fema-compliance-and-support",
    title: "FEMA Advisory",
    subtitle: "Navigate Foreign Exchange Regulations. Structure Cross-Border Transactions. Strengthen Regulatory Compliance.",
    description: "Astronis Global provides comprehensive advisory under the Foreign Exchange Management Act (FEMA), covering foreign exchange transactions, cross-border investments, overseas direct investment, remittances, reporting, approvals and ongoing compliance for businesses, investors and individuals.",
    overviewTitle: "Understanding FEMA Advisory in India",
    overview: "FEMA regulates foreign exchange transactions, cross-border investments and remittances in India. A transaction can involve the Act, rules, regulations, RBI directions and authorised dealer bank procedures. We help assess the proposed activity, identify applicable requirements and coordinate implementation and reporting workstreams.",
    services: [
      { title: "FEMA Applicability Assessment", text: "Review the parties, transaction purpose, funds flow and relevant jurisdictions." },
      { title: "FEMA Advisory & Structuring", text: "Consider compliant options for investment, borrowing and cross-border transactions." },
      { title: "Current & Capital Account Transaction Advisory", text: "Assess transaction classification and related permissions or conditions." },
      { title: "Foreign Investment Advisory", text: "Coordinate FEMA considerations for inbound and outbound investment." },
      { title: "Cross-Border Payments & Remittance Advisory", text: "Review supporting records, permitted routes and bank documentation." },
      { title: "FEMA Compliances, Reporting & Ongoing Support", text: "Map reporting, filing and continuing responsibilities." },
    ],
    whyNeeded: ["Planning an inbound or outbound investment", "Making or receiving a cross-border remittance", "Structuring a foreign borrowing or capital transaction", "Addressing delayed or pending FEMA reporting", "Preparing for a transaction, diligence or regulatory review"],
    benefits: [
      { title: "Regulatory certainty", text: "Understand the likely regulatory pathway before acting." },
      { title: "Reduced compliance risk", text: "Identify reporting and documentation gaps early." },
      { title: "Structured transaction planning", text: "Connect commercial objectives with the applicable route." },
      { title: "Support for implementation", text: "Coordinate bank, corporate and regulatory workstreams." },
    ],
    framework: ["Foreign Exchange Management Act, 1999", "FEMA (Non-Debt Instruments) Rules, 2019", "FEMA (Overseas Investment) Rules and Regulations, 2022", "Foreign Exchange Management (Borrowing and Lending) Regulations", "RBI Master Directions and circulars", "Authorised Dealer bank procedures"],
    comparison: {
      heading: "Capital account and current account transactions",
      columns: ["Parameter", "Capital account transaction", "Current account transaction"],
      rows: [
        ["Typical purpose", "Investment, borrowing or capital movement", "Trade, travel or service payment"],
        ["Regulatory approach", "Route, pricing and reporting conditions may apply", "Permitted purpose and restrictions may apply"],
        ["Examples", "Equity investment, loan or overseas investment", "Import payment, service fee or travel remittance"],
        ["Key records", "Approvals, valuation and transaction documents", "Invoice, purpose code and payment support"],
      ],
    },
    faqs: [
      { question: "What is FEMA advisory?", answer: "It is guidance on the Indian foreign exchange framework as it applies to a proposed transaction, investment or remittance." },
      { question: "Does every foreign remittance require RBI approval?", answer: "Not necessarily. The route depends on the purpose, parties, amount and applicable rules; an authorised dealer bank may also require supporting information." },
      { question: "Can you help with delayed FEMA reporting?", answer: "We can review the facts and records and help identify potential corrective steps, subject to the applicable framework." },
      { question: "When should FEMA advice be obtained?", answer: "Ideally before funds or securities move, so that route, documentation and reporting requirements can be planned." },
    ],
    finalHeading: "Navigate FEMA Requirements with Confidence",
  }),
  makeDetail({
    slug: "fema-compliance",
    groupSlug: "fema-compliance-and-support",
    title: "FEMA Compliance",
    subtitle: "Strengthen Foreign Exchange Compliance. Manage Regulatory Obligations. Protect Cross-Border Operations.",
    description: "Astronis Global provides comprehensive FEMA compliance support for Indian companies, foreign investors, global corporate groups and financial institutions, helping coordinate transaction reporting, documentation, regulatory filings and ongoing compliance.",
    overviewTitle: "Understanding FEMA Compliance in India",
    overview: "FEMA compliance connects cross-border transactions with reporting, documentation and operational responsibilities. Requirements can vary by transaction, entity and route. A coordinated compliance process helps businesses maintain complete records, meet applicable reporting dates and respond to authorised dealer bank or regulator queries.",
    services: [
      { title: "FEMA Compliance Review & Regulatory Assessment", text: "Review the transaction history and identify open compliance items." },
      { title: "Foreign Investment & Overseas Investment Compliance", text: "Coordinate applicable inbound and outbound investment reporting." },
      { title: "RBI Reporting & Filing Compliance", text: "Prepare and monitor relevant reporting workstreams." },
      { title: "Foreign Exchange Transactions Documentation", text: "Organise supporting records for remittances and cross-border payments." },
      { title: "FEMA Compliances, Remediation & Regularisation", text: "Assess potential correction or regularisation steps for gaps." },
      { title: "Ongoing FEMA Compliance Support", text: "Maintain a compliance calendar and follow-up responsibilities." },
    ],
    whyNeeded: ["Managing inbound or outbound investments", "Completing RBI and authorised dealer bank reporting", "Reviewing historical transactions and records", "Addressing late or incomplete submissions", "Preparing for an audit, investment or diligence exercise"],
    benefits: [
      { title: "Regulatory clarity", text: "Understand compliance responsibilities across transactions." },
      { title: "Reduced penalty exposure", text: "Identify and triage potential gaps promptly." },
      { title: "Consistent documentation", text: "Keep filings aligned with company and bank records." },
      { title: "Ongoing monitoring", text: "Track requirements as transactions and rules evolve." },
    ],
    framework: ["Foreign Exchange Management Act, 1999", "FEMA (Non-Debt Instruments) Rules, 2019", "FEMA (Overseas Investment) Rules, 2022", "RBI reporting directions and forms", "RBI Master Directions on reporting", "Authorised Dealer bank documentation requirements"],
    comparison: {
      heading: "FEMA compliance and reporting overview",
      columns: ["Area", "Typical responsibility", "Evidence to maintain"],
      rows: [
        ["Foreign investment", "Report issue or transfer of eligible instruments", "Valuation, allotment and investor records"],
        ["Overseas investment", "Complete investment and periodic reporting", "Board approvals, remittance and investee records"],
        ["Remittances", "Support permitted transactions and bank processing", "Invoices, declarations and payment records"],
        ["Ongoing compliance", "Monitor changes, deadlines and open items", "Calendar, acknowledgements and correspondence"],
      ],
    },
    faqs: [
      { question: "What does FEMA compliance involve?", answer: "It may include transaction classification, supporting documentation, reporting, approvals and ongoing monitoring." },
      { question: "Can historical FEMA gaps be reviewed?", answer: "Yes. A review can map the transaction chronology, available evidence and potential next steps." },
      { question: "Does filing an application guarantee regularisation?", answer: "No. Any decision or relief rests with the competent authority under the applicable process." },
      { question: "Can compliance support be ongoing?", answer: "Yes. A continuing scope can include agreed calendars, reporting coordination and regulatory updates." },
    ],
    finalHeading: "Maintain FEMA Compliance. Enable Cross-Border Growth.",
  }),
  makeDetail({
    slug: "rbi-reporting",
    groupSlug: "fema-compliance-and-support",
    title: "RBI Reporting",
    subtitle: "Accurate Regulatory Reporting. Timely FEMA Filings. Stronger Cross-Border Compliance.",
    description: "Astronis Global provides end-to-end reporting support for RBI and FEMA requirements, helping businesses organise transaction information, prepare filings and coordinate follow-up through the authorised dealer bank.",
    overviewTitle: "Understanding RBI Reporting under FEMA",
    overview: "Cross-border investment and foreign exchange transactions can create reporting obligations through RBI-prescribed systems and authorised dealer banks. Correct forms and information depend on the transaction type, instrument, entity and reporting event. We help map these requirements to the supporting records and track the process.",
    services: [
      { title: "FC-GPR & FC-TRS Reporting", text: "Coordinate reporting for relevant issue and transfer of Indian equity instruments." },
      { title: "FIRMS Portal & SMF Support", text: "Organise entity, user and transaction information for applicable filings." },
      { title: "Annual FLA Return", text: "Support preparation of foreign liabilities and assets reporting where applicable." },
      { title: "Overseas Investment Reporting", text: "Coordinate applicable ODI reporting and periodic information." },
      { title: "ECB Reporting", text: "Support reporting workstreams relating to external commercial borrowings." },
      { title: "Delayed Filing & LSF Calculation", text: "Review delay details and help assess applicable late submission fee processes." },
    ],
    whyNeeded: ["Receiving foreign investment or transferring shares", "Making an overseas direct investment", "Reporting external commercial borrowing", "Preparing annual foreign liabilities and assets information", "Correcting delayed, rejected or incomplete reporting"],
    benefits: [
      { title: "Timely statutory obligations", text: "Track applicable reporting events and dates." },
      { title: "Reduced compliance risk", text: "Use consistent information and supporting records." },
      { title: "Smooth authorised dealer coordination", text: "Organise responses to bank queries and requirements." },
      { title: "Better filing visibility", text: "Monitor acknowledgements, status and outstanding actions." },
    ],
    framework: ["FEMA, 1999 and applicable regulations", "RBI reporting directions and master directions", "Foreign investment reporting through FIRMS", "Overseas investment reporting framework", "External commercial borrowing reporting requirements", "Applicable forms, user manuals and authorised dealer procedures"],
    comparison: {
      heading: "Key RBI reporting categories",
      columns: ["Reporting", "Typical event", "Timing consideration"],
      rows: [
        ["FC-GPR", "Issue of eligible equity instruments to a non-resident", "Applicable event-based deadline"],
        ["FC-TRS", "Transfer of eligible instruments between resident and non-resident", "Applicable event-based deadline"],
        ["FLA Return", "Foreign liabilities or assets reporting", "Annual reporting cycle"],
        ["ODI / ECB reporting", "Overseas investment or external borrowing activity", "Transaction and periodic reporting conditions"],
      ],
    },
    faqs: [
      { question: "What is FC-GPR reporting?", answer: "It is reporting associated with the issue of eligible Indian equity instruments to a person resident outside India." },
      { question: "What is the difference between FC-GPR and FC-TRS?", answer: "They relate to different events—issue of instruments and certain transfers, respectively. Applicability depends on the transaction." },
      { question: "What if an RBI filing is delayed?", answer: "The available route depends on the form, delay and current rules; the facts should be reviewed before corrective action." },
      { question: "Do you coordinate with the authorised dealer bank?", answer: "The agreed support can include preparing information and coordinating bank queries and filing follow-up." },
    ],
    finalHeading: "Simplify RBI Reporting. Strengthen Cross-Border Compliance.",
  }),
  makeDetail({
    slug: "foreign-exchange-transactions",
    groupSlug: "fema-compliance-and-support",
    title: "Foreign Exchange Transactions",
    subtitle: "Navigate International Payments. Structure Foreign Exchange Transactions. Maintain Regulatory Compliance.",
    description: "Astronis Global provides integrated legal, regulatory and transaction advisory for foreign exchange, cross-border payments, remittances, import and export transactions, international investments and foreign currency arrangements.",
    overviewTitle: "Understanding Foreign Exchange Transactions in India",
    overview: "Foreign exchange transactions in India are governed by FEMA and related RBI regulations. Their treatment depends on the purpose, counterparties, funds flow and transaction structure. We help identify the relevant route and documentation and coordinate with authorised dealer banks and other advisers.",
    services: [
      { title: "International Remittance & Payment Advisory", text: "Review payment purpose, supporting records and applicable restrictions." },
      { title: "Import & Export Foreign Exchange Transactions", text: "Coordinate foreign exchange and documentation considerations for trade." },
      { title: "Foreign Currency Receipts & Repatriation", text: "Assess receipt, retention and repatriation requirements." },
      { title: "Cross-Border Service, Royalty & Licensing Payments", text: "Review contractual basis, tax inputs and payment documentation." },
      { title: "Investment-Related Foreign Exchange Transactions", text: "Connect investment structures with permitted remittance and reporting routes." },
      { title: "RBI / AD Bank Approvals & Transaction Compliance", text: "Prepare information and coordinate bank or regulatory follow-up." },
    ],
    whyNeeded: ["Making or receiving international payments", "Paying for imports, services, royalties or licences", "Receiving export proceeds or foreign currency", "Funding an overseas or inbound investment", "Planning a cross-border loan or capital movement"],
    benefits: [
      { title: "Transaction permissibility clarity", text: "Understand the regulatory route for the proposed payment." },
      { title: "Reduced regulatory risk", text: "Identify restrictions and required supporting documents." },
      { title: "Support for import and export", text: "Coordinate foreign exchange considerations with trade records." },
      { title: "Efficient bank coordination", text: "Prepare a clear information set for authorised dealer processing." },
    ],
    framework: ["Foreign Exchange Management Act, 1999", "FEMA Current Account Transactions Rules, 2000", "FEMA regulations for capital account transactions", "RBI Master Directions on import and export of goods and services", "RBI directions on remittances and authorised dealer banks", "Applicable tax and withholding considerations"],
    comparison: {
      heading: "Current account and capital account transactions",
      columns: ["Parameter", "Current account", "Capital account"],
      rows: [
        ["Purpose", "Trade, services, travel and other payments", "Investment, borrowing and capital movement"],
        ["Examples", "Import payment, service fee or travel remittance", "Equity, loan or overseas investment"],
        ["Key review", "Permitted purpose, restrictions and evidence", "Route, pricing, approval and reporting"],
        ["Typical records", "Invoice, contract and purpose information", "Approvals, valuation and transaction documents"],
      ],
    },
    faqs: [
      { question: "What is a foreign exchange transaction?", answer: "It broadly includes transactions involving payments or receipts in foreign exchange, subject to the applicable FEMA framework." },
      { question: "Can a company make any overseas payment?", answer: "Permissibility depends on purpose, route, restrictions, documentation and any applicable approval requirements." },
      { question: "What documents do banks commonly request?", answer: "Requirements vary but can include contracts, invoices, declarations, tax information and transaction details." },
      { question: "Can you support export proceeds and repatriation?", answer: "Yes. The scope can include review of receipt, realisation and repatriation obligations." },
    ],
    finalHeading: "Simplify Foreign Exchange Transactions. Strengthen Cross-Border Compliance.",
  }),
  makeDetail({
    slug: "entry-route-advisory",
    groupSlug: "fdi-compliance-and-support",
    title: "Entry Route Advisory",
    subtitle: "Choose the Right FDI Entry Route. Meet Regulatory Requirements. Build a Strong Investment Framework.",
    description: "Astronis Global provides expert advisory on foreign direct investment (FDI) entry routes, including automatic route, government approval route, sectoral caps, entry conditions, investment instruments and regulatory compliance.",
    overviewTitle: "FDI Entry Routes in India",
    overview: "Foreign direct investment in India is permitted under the automatic route or the government approval route, subject to applicable sectoral caps, entry conditions and other restrictions. The appropriate route depends on the investor, sector, instrument, beneficial ownership and transaction structure.",
    services: [
      { title: "Automatic Route Advisory", text: "Assess whether a proposed investment may proceed without prior approval." },
      { title: "Government Approval Route", text: "Identify approval dependencies and coordinate application preparation." },
      { title: "Sectoral Cap & Entry Condition Assessment", text: "Review ownership limits and sector-specific investment conditions." },
      { title: "Investment Structure & Shareholding Advisory", text: "Consider structure, ownership and eligible instruments." },
      { title: "Transaction Documentation", text: "Coordinate investment agreements, approvals and supporting records." },
      { title: "FEMA, Reporting & Ongoing Compliance", text: "Map post-investment reporting and continuing requirements." },
    ],
    whyNeeded: ["Planning an investment into an Indian company", "Assessing automatic versus government approval route", "Entering a regulated or restricted sector", "Reviewing sectoral caps or investment conditions", "Structuring ownership, instruments or investor participation"],
    benefits: [
      { title: "Right route identification", text: "Clarify the likely route before investment commitments." },
      { title: "Regulatory certainty", text: "Identify caps, conditions and approval dependencies." },
      { title: "Reduced transaction risk", text: "Align documents and implementation with the assessed route." },
      { title: "Long-term business readiness", text: "Plan reporting and continuing compliance from the outset." },
    ],
    framework: ["Foreign Exchange Management Act, 1999", "FEMA Non-Debt Instruments Rules, 2019", "Consolidated FDI Policy and amendments", "Press Notes and sector-specific conditions", "Government approval procedures and competent authorities", "Companies Act and applicable reporting requirements"],
    comparison: {
      heading: "Automatic route and government approval route",
      columns: ["Parameter", "Automatic route", "Government approval route"],
      rows: [
        ["Prior approval", "Generally not required, subject to conditions", "Approval required before investment"],
        ["Sectoral restrictions", "Caps and conditions may apply", "Caps and conditions may apply"],
        ["Typical assessment", "Investor, sector and instrument eligibility", "Eligibility plus approval application"],
        ["Implementation", "Complete transaction and reporting steps", "Obtain approval, then implement conditions"],
      ],
    },
    faqs: [
      { question: "What are the FDI entry routes in India?", answer: "Investment may fall under the automatic route or require government approval, depending on sector, investor and applicable policy." },
      { question: "How do sectoral caps affect investment?", answer: "A cap can limit foreign ownership in a sector and may be accompanied by additional entry conditions." },
      { question: "When must government approval be obtained?", answer: "Approval requirements depend on the current FDI policy, sector, investor and transaction facts; the route should be assessed in advance." },
      { question: "Can the entry route change over time?", answer: "Policy and sector conditions can change, so the position should be confirmed at the time of the proposed transaction." },
    ],
    finalHeading: "Make the Right Investment Decision with the Right Advice",
  }),
  makeDetail({
    slug: "foreign-investment-compliance",
    groupSlug: "fdi-compliance-and-support",
    title: "Foreign Investment Compliance",
    subtitle: "Manage Foreign Investment Obligations. Strengthen FEMA Compliance. Support Sustainable Growth.",
    description: "Astronis Global provides integrated legal, regulatory and investment advisory for foreign investment compliance in India, covering sectoral conditions, reporting, approvals and ongoing corporate and FEMA obligations.",
    overviewTitle: "Understanding Foreign Investment Compliance in India",
    overview: "Foreign investment compliance involves more than confirming the entry route. A company may need to satisfy sectoral conditions, pricing and instrument requirements, reporting, corporate approvals and continuing obligations. We help map these requirements to the transaction and the company's records.",
    services: [
      { title: "FDI Eligibility & Sectoral Compliance", text: "Review the investor, activity, sectoral cap and entry conditions." },
      { title: "Foreign Investment Reporting & FEMA Compliance", text: "Coordinate applicable reporting and supporting records." },
      { title: "Investor KYC & Documentation", text: "Organise investor information and transaction documents." },
      { title: "Share Issue & Transfer Compliance", text: "Review relevant corporate actions, pricing and reporting requirements." },
      { title: "Ongoing Foreign Investment Compliance", text: "Track continuing conditions, filings and changes in ownership." },
      { title: "Post-Investment Compliance Support", text: "Coordinate post-closing records and statutory follow-up." },
    ],
    whyNeeded: ["Receiving foreign investment into an Indian entity", "Issuing or transferring shares to a non-resident", "Reviewing compliance with sectoral conditions", "Preparing for investor or regulatory diligence", "Addressing delayed reporting or record inconsistencies"],
    benefits: [
      { title: "Regulatory compliance clarity", text: "Understand the obligations attached to investment." },
      { title: "Reduced risk", text: "Identify gaps in approvals, pricing or reporting." },
      { title: "Smoother transactions", text: "Coordinate corporate and regulatory steps together." },
      { title: "Long-term readiness", text: "Maintain records for future funding, audit and diligence." },
    ],
    framework: ["FEMA, 1999 and Non-Debt Instruments Rules", "Consolidated FDI Policy and sectoral conditions", "RBI foreign investment reporting requirements", "Companies Act and corporate approval requirements", "Pricing, valuation and instrument conditions", "Applicable beneficial ownership and KYC requirements"],
    comparison: {
      heading: "Foreign investment compliance checkpoints",
      columns: ["Checkpoint", "Typical review", "Key evidence"],
      rows: [
        ["Investor eligibility", "Investor status and applicable restrictions", "KYC and beneficial ownership details"],
        ["Sector and route", "Entry route, cap and conditions", "Business activity and sector assessment"],
        ["Issue or transfer", "Instrument, pricing and approvals", "Valuation, agreements and resolutions"],
        ["Reporting", "Event-based and ongoing filings", "Acknowledgements and company records"],
      ],
    },
    faqs: [
      { question: "What is included in foreign investment compliance?", answer: "It may include route and sector assessment, corporate approvals, pricing, reporting and ongoing condition monitoring." },
      { question: "Does every foreign investment require approval?", answer: "Not always. It depends on the sector, investor, ownership and applicable route and conditions." },
      { question: "What happens if investment reporting is delayed?", answer: "The facts and applicable rules should be reviewed to assess possible corrective processes." },
      { question: "Should compliance be reviewed after the investment closes?", answer: "Yes. Post-closing reporting, records and continuing conditions may remain relevant." },
    ],
    finalHeading: "Strengthen Foreign Investment Compliance. Support Sustainable Growth.",
  }),
  makeDetail({
    slug: "investment-structuring",
    groupSlug: "fdi-compliance-and-support",
    title: "Investment Structuring",
    subtitle: "Design Strategic Investment Structures. Align Capital, Ownership and Governance. Navigate India’s Regulatory Framework.",
    description: "Astronis Global provides integrated legal, corporate and regulatory advisory for domestic and cross-border investment structuring, helping businesses, investors and corporate groups plan compliant and commercially workable arrangements.",
    overviewTitle: "Understanding Investment Structuring in India",
    overview: "Investment structuring determines how capital is contributed, ownership is held, rights are allocated and regulatory responsibilities are met. The structure should reflect commercial objectives while considering corporate law, FEMA, tax, governance and future financing or exit plans.",
    services: [
      { title: "Investment Vehicle & Ownership Structuring", text: "Assess entity and ownership options for the proposed investment." },
      { title: "Equity, Convertible & Hybrid Instrument Structuring", text: "Compare eligible instruments and their commercial implications." },
      { title: "Shareholder Agreements & Governance", text: "Coordinate investor rights, decision-making and governance terms." },
      { title: "Joint Venture, Acquisition & Restructuring Structuring", text: "Support investment structures for strategic transactions." },
      { title: "Investment Pricing, Valuation & FEMA Compliance", text: "Identify applicable pricing, valuation and foreign exchange requirements." },
      { title: "FEMA, Regulatory & Compliance Advisory", text: "Map approval, reporting and continuing obligations." },
    ],
    whyNeeded: ["Planning a domestic or cross-border investment", "Choosing between equity and other permitted instruments", "Establishing a joint venture or investment vehicle", "Aligning investor rights and management control", "Preparing for future funding, restructuring or exit"],
    benefits: [
      { title: "Strategic alignment", text: "Connect the chosen structure with investment objectives." },
      { title: "Regulatory clarity", text: "Assess applicable corporate, FEMA and sectoral requirements." },
      { title: "Stronger governance", text: "Define ownership, rights and decision processes." },
      { title: "Future flexibility", text: "Consider later financing, transfers and exit pathways." },
    ],
    framework: ["Companies Act, 2013", "FEMA and Non-Debt Instruments Rules", "Foreign investment policy and reporting", "Tax and valuation considerations", "Competition and sector-specific requirements", "Shareholder and transaction documentation"],
    comparison: {
      heading: "Common investment structures",
      columns: ["Structure", "Typical use", "Key consideration"],
      rows: [
        ["Equity investment", "Ownership capital and participation", "Share rights, pricing and dilution"],
        ["Convertible instruments", "Capital with conversion features", "Terms, conversion triggers and compliance"],
        ["Joint venture", "Shared commercial activity or market entry", "Control, governance and reserved matters"],
        ["Investment vehicle", "Holding or pooling investment interests", "Purpose, ownership and ongoing obligations"],
      ],
    },
    faqs: [
      { question: "What is investment structuring?", answer: "It is the design of ownership, capital, rights and governance arrangements for an investment." },
      { question: "Which investment instrument is best?", answer: "The appropriate instrument depends on objectives, parties, company status, pricing and applicable laws." },
      { question: "Can structuring support cross-border investments?", answer: "Yes. Cross-border arrangements require review of FEMA, FDI policy, tax and reporting considerations." },
      { question: "Should exit planning be considered at the start?", answer: "Considering transfer, liquidity and exit provisions early can help parties align expectations." },
    ],
    finalHeading: "Structure Investments with Clarity. Build for Long-Term Growth.",
  }),
  makeDetail({
    slug: "share-issue-transfer",
    groupSlug: "fdi-compliance-and-support",
    title: "Share Issue / Transfer",
    subtitle: "Structure Equity Transactions. Protect Shareholder Interests. Ensure FEMA & Corporate Compliance.",
    description: "Astronis Global provides integrated legal, corporate and regulatory advisory for share issuance, allotment, transfer and shareholder transactions, including foreign investment, pricing, documentation and reporting requirements.",
    overviewTitle: "Share Issue and Share Transfer in India",
    overview: "The issue or transfer of shares can involve company law, FEMA, pricing, valuation, approvals and reporting. Requirements depend on the parties, instrument, consideration and whether a non-resident is involved. Coordinating these elements helps keep corporate records and regulatory filings consistent.",
    services: [
      { title: "Fresh Share Issue & Equity Allotment", text: "Coordinate approvals, allotment records and applicable filings." },
      { title: "Resident–Non-Resident Share Transfers", text: "Assess transfer route, pricing and foreign investment requirements." },
      { title: "Share Valuation & FEMA Pricing Compliance", text: "Identify valuation evidence and pricing conditions for review." },
      { title: "Share Subscription & Purchase Documentation", text: "Coordinate transaction agreements and supporting documents." },
      { title: "Corporate Approvals & Governance Compliance", text: "Organise board, shareholder and statutory record requirements." },
      { title: "FC-GPR / FC-TRS & Post-Transaction Compliance", text: "Coordinate applicable RBI reporting and post-transaction follow-up." },
    ],
    whyNeeded: ["Issuing new shares to an investor", "Transferring shares between shareholders", "Completing resident and non-resident share transactions", "Preparing valuation and pricing support", "Updating corporate records and RBI reporting"],
    benefits: [
      { title: "Legally compliant transactions", text: "Coordinate corporate approvals and applicable regulatory steps." },
      { title: "Reduced execution risk", text: "Identify pricing, documentation and reporting dependencies." },
      { title: "Accurate records", text: "Align share registers, filings and transaction documents." },
      { title: "Efficient completion", text: "Plan responsibilities and submissions across the transaction." },
    ],
    framework: ["Companies Act, 2013 and applicable rules", "FEMA Non-Debt Instruments Rules, 2019", "FDI policy, pricing and sectoral conditions", "RBI FC-GPR and FC-TRS reporting", "Valuation and tax considerations", "Shareholder agreements and transaction terms"],
    comparison: {
      heading: "Fresh issue and share transfer",
      columns: ["Parameter", "Fresh issue / allotment", "Share transfer"],
      rows: [
        ["Transaction", "Company issues new shares", "Existing holder transfers shares"],
        ["Corporate action", "Approvals, allotment and company filings", "Transfer documents and register updates"],
        ["Foreign investment", "Issue and applicable FC-GPR reporting", "Transfer conditions and FC-TRS where applicable"],
        ["Key evidence", "Subscription, valuation and allotment records", "Transfer agreement, consideration and valuation"],
      ],
    },
    faqs: [
      { question: "What is the difference between share issue and share transfer?", answer: "An issue creates new shares allotted by the company; a transfer changes ownership of existing shares." },
      { question: "Is valuation required for every share transaction?", answer: "Valuation requirements depend on the transaction, parties and applicable company, FEMA and tax provisions." },
      { question: "When is FC-GPR or FC-TRS reporting relevant?", answer: "These forms relate to specified foreign investment issue or transfer events; applicability should be checked for the transaction." },
      { question: "What approvals are needed for a share transfer?", answer: "Requirements depend on the articles, agreements, company law and the parties and instrument involved." },
    ],
    finalHeading: "Execute Share Transactions with Confidence",
  }),
  makeDetail({
    slug: "repatriation-exit",
    groupSlug: "fdi-compliance-and-support",
    title: "Repatriation / Exit",
    subtitle: "Plan and Execute Compliant Repatriation. Navigate Regulatory Requirements. Structure Efficient Exit Solutions.",
    description: "Astronis Global provides integrated legal, regulatory and transaction advisory for repatriation of funds, dividend distribution, share transfers and investor exits, helping align FEMA, corporate, tax and transaction requirements.",
    overviewTitle: "Repatriation and Exit from Indian Investments",
    overview: "Repatriation and investor exit transactions may involve share transfers, buybacks, capital reduction, liquidation or dividend payments. The appropriate route depends on the investment, parties, pricing, tax position, corporate approvals and applicable FEMA requirements.",
    services: [
      { title: "Dividend Repatriation Advisory", text: "Coordinate distribution, tax and remittance considerations." },
      { title: "Share Sale & Exit Structuring", text: "Assess transfer routes, transaction terms and applicable approvals." },
      { title: "Buyback, Reduction & Other Exit Transactions", text: "Review corporate and regulatory steps for potential exit routes." },
      { title: "FEMA & RBI Compliance", text: "Map foreign exchange, pricing and reporting responsibilities." },
      { title: "Tax Planning & Documentation", text: "Identify tax inputs and transaction documents requiring review." },
      { title: "Exit Documentation & Implementation", text: "Coordinate approvals, filings, remittance and post-transaction records." },
    ],
    whyNeeded: ["Repatriating proceeds from an Indian investment", "Planning a share sale, transfer or investor exit", "Distributing dividends to a non-resident shareholder", "Evaluating buyback, capital reduction or liquidation", "Completing tax, FEMA and bank documentation"],
    benefits: [
      { title: "Compliant and efficient repatriation", text: "Plan the applicable route and supporting information." },
      { title: "Reduced regulatory risk", text: "Identify pricing, reporting and approval requirements early." },
      { title: "Structured and documented exit", text: "Coordinate corporate steps and transaction documentation." },
      { title: "Support for cross-border transactions", text: "Bring bank, tax, company and FEMA workstreams together." },
    ],
    framework: ["FEMA, 1999 and applicable regulations", "FEMA Non-Debt Instruments Rules and pricing", "Companies Act buyback and capital reduction provisions", "Income-tax and withholding requirements", "RBI / authorised dealer bank remittance procedures", "Sectoral conditions and investment documents"],
    comparison: {
      heading: "Common repatriation and exit routes",
      columns: ["Route", "Typical focus", "Key consideration"],
      rows: [
        ["Dividend", "Distribution from available profits", "Corporate approvals, tax and remittance records"],
        ["Share transfer", "Sale of shares to another holder", "Pricing, transfer conditions and reporting"],
        ["Buyback / capital reduction", "Company-led capital return", "Eligibility, approvals and statutory process"],
        ["Liquidation", "Winding up and distribution of residual assets", "Claims, tax, approvals and distribution priorities"],
      ],
    },
    faqs: [
      { question: "Can a foreign investor repatriate sale proceeds?", answer: "Repatriation depends on the investment route, pricing, taxes, documentation and applicable FEMA requirements." },
      { question: "What is the difference between repatriation and an exit?", answer: "Repatriation concerns transferring eligible funds abroad; an exit is the underlying transaction or event that may generate proceeds." },
      { question: "Can an Indian company buy back shares held by a non-resident?", answer: "A buyback must satisfy company law, FEMA, tax and other applicable conditions; facts should be assessed before proceeding." },
      { question: "What documents help with repatriation?", answer: "Transaction agreements, investment and share records, tax documents, bank records and relevant approvals are commonly reviewed." },
    ],
    finalHeading: "Plan and Execute Repatriation and Exit with Confidence.",
  }),
];

export const getFemaCrossBorderDetail = (slug: string) =>
  femaCrossBorderDetails.find((item) => item.slug === slug);
