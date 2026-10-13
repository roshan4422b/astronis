import type { ConsumerRegulatoryDetail } from "./consumer-regulatory-details";

type CopyPair = [string, string];

type CorporateRegulatoryCopy = Omit<
  ConsumerRegulatoryDetail,
  "highlights" | "services" | "framework" | "stakeholders" | "process" | "considerations" | "faqs"
> & {
  highlights: [string, string, string][];
  services: CopyPair[];
  framework: CopyPair[];
  stakeholders: CopyPair[];
  process: CopyPair[];
  considerations: CopyPair[];
  faqs: CopyPair[];
};

const detail = (copy: CorporateRegulatoryCopy): ConsumerRegulatoryDetail => ({
  ...copy,
  highlights: copy.highlights.map(([title, text, icon]) => ({ title, text, icon })),
  services: copy.services.map(([title, text]) => ({ title, text })),
  framework: copy.framework.map(([title, text]) => ({ title, text })),
  stakeholders: copy.stakeholders.map(([title, text]) => ({ title, text })),
  process: copy.process.map(([title, text]) => ({ title, text })),
  considerations: copy.considerations.map(([title, text]) => ({ title, text })),
  faqs: copy.faqs.map(([question, answer]) => ({ question, answer })),
});

const commonStakeholders: CopyPair[] = [
  ["Private and public companies", "Companies and their directors managing statutory and governance responsibilities."],
  ["LLPs and partnerships", "Other registered entities with corporate records, filings or compliance requirements."],
  ["Investors and lenders", "Stakeholders reviewing governance, ownership, filings or compliance exposure."],
  ["Startups and growing businesses", "Teams building reliable processes as their operations and obligations expand."],
];

export const corporateRegulatoryDetails: ConsumerRegulatoryDetail[] = [
  detail({
    slug: "insolvency-bankruptcy",
    title: "Insolvency & Bankruptcy",
    subtitle: "Strategic Solutions for Financial Distress. Protecting Value. Enabling Recovery.",
    description: "We provide end-to-end advisory and representation under the Insolvency and Bankruptcy Code, 2016 (IBC) to help businesses, lenders, investors and stakeholders navigate financial distress, resolution and restructuring.",
    image: "/images/services/nclt-and-nclat-advisory.webp",
    imageAlt: "Legal professionals reviewing an insolvency and restructuring matter",
    overview: {
      heading: "A considered response to financial distress",
      paragraphs: [
        "Insolvency situations can affect business continuity, creditor recoveries, employees and stakeholder value. The right approach depends on the financial position, available evidence, the parties involved and the applicable process.",
        "Astronis helps assess options, organise the factual and financial record, and coordinate advisory and representation workstreams through the relevant resolution or restructuring process.",
      ],
    },
    highlights: [
      ["IBC, NCLT & NCLAT proceedings", "Support shaped around the applicable insolvency process.", "scale"],
      ["Strategic restructuring", "Assess resolution and restructuring pathways.", "chart"],
      ["Stakeholder interests", "Keep creditor, investor and business considerations in view.", "shield"],
      ["End-to-end support", "Coordinate from early assessment through implementation.", "people"],
    ],
    services: [
      ["IBC advisory and strategy", "Review the circumstances, stakeholders and possible routes before key decisions."],
      ["Resolution and restructuring", "Coordinate resolution planning, proposals and supporting documentation."],
      ["Creditor and stakeholder support", "Organise claims, records and communications for the relevant process."],
      ["NCLT / NCLAT representation", "Coordinate case preparation and representation with the appropriate professionals."],
    ],
    framework: [
      ["Insolvency and Bankruptcy Code, 2016", "The principal framework for corporate and individual insolvency processes in India."],
      ["National Company Law Tribunal", "The adjudicating forum for relevant corporate insolvency matters."],
      ["Insolvency and Bankruptcy Board of India", "Regulations and directions applicable to insolvency professionals and processes."],
      ["Process-specific rules and regulations", "Applicable requirements depend on the debtor, process, stakeholder and current law."],
    ],
    frameworkNote: "The available route, timelines and stakeholder rights depend on the facts, entity and stage of the matter. A specific review is needed before action is taken.",
    stakeholders: [
      ["Corporate debtors", "Businesses assessing distress, restructuring or a resolution process."],
      ["Creditors and lenders", "Financial and operational creditors evaluating claims and recovery options."],
      ["Investors and resolution applicants", "Parties considering participation in a resolution or restructuring."],
      ["Directors and stakeholders", "People seeking clarity on responsibilities, records and process steps."],
    ],
    process: [
      ["Understand the position", "Review the business, financial information, liabilities and immediate priorities."],
      ["Map stakeholders and options", "Identify relevant parties, process dependencies and potential routes."],
      ["Prepare the record", "Organise supporting documents, claims, chronology and decision materials."],
      ["Coordinate the proceedings", "Support filings, representation and responses through the applicable process."],
      ["Plan implementation", "Track approved actions, stakeholder responsibilities and follow-through."],
    ],
    considerations: [
      ["Act on reliable information", "Financial records and a clear chronology help frame realistic options."],
      ["Understand stakeholder rights", "Creditor classes and other interests can affect the process and outcome."],
      ["Preserve business value", "Consider continuity, assets, employees and counterparties alongside recovery."],
      ["Plan for process milestones", "Deadlines and approvals should be tracked with accountable owners."],
    ],
    comparison: {
      heading: "Insolvency routes at a glance",
      columns: ["Route", "Typical focus", "Key consideration"],
      rows: [
        ["Corporate Insolvency Resolution Process (CIRP)", "Resolution of a corporate debtor", "Eligibility, claims and process milestones"],
        ["Pre-packaged Insolvency Resolution Process", "Resolution for eligible MSME corporate debtors", "Eligibility and creditor approvals"],
        ["Liquidation", "Realisation and distribution of assets", "Asset value, costs and statutory priorities"],
        ["Voluntary liquidation", "Winding up a solvent corporate person", "Solvency declarations and member approvals"],
      ],
    },
    faqs: [
      ["What is the Insolvency and Bankruptcy Code?", "The IBC establishes processes for insolvency resolution and liquidation in India. The applicable process depends on the debtor and circumstances."],
      ["Can a business be restructured without insolvency proceedings?", "Some businesses may explore restructuring outside a formal insolvency process. Feasibility depends on the financial position, creditor arrangements and applicable law."],
      ["How long does a resolution process take?", "Timelines depend on the process, case complexity, tribunal schedule and statutory requirements; no particular outcome or duration can be guaranteed."],
      ["Can you advise creditors as well as companies?", "Yes. The scope can be tailored to corporate debtors, creditors, investors and other stakeholders."],
    ],
  }),
  detail({
    slug: "mca21-roc-matters",
    title: "MCA21 / ROC Matters",
    subtitle: "Compliant Companies. Stronger Governance. Sustainable Growth.",
    description: "We provide end-to-end advisory and execution support for company law compliance, filings and regulatory matters under the Ministry of Corporate Affairs (MCA) and Registrar of Companies (ROC), helping businesses stay compliant and focus on growth.",
    image: "/corporate-regulatory-hero.png",
    imageAlt: "Corporate records and regulatory documentation",
    overview: {
      heading: "Clear and consistent MCA and ROC records",
      paragraphs: [
        "MCA and Registrar of Companies matters often connect electronic submissions with underlying corporate records. Inconsistent particulars, unresolved queries and incomplete supporting documents can require a structured review.",
        "A chronology of submissions and correspondence, including acknowledgements and resubmission requests, helps distinguish a record correction from a wider compliance issue and identify the right next step.",
      ],
    },
    highlights: [
      ["Company incorporation", "Support for company formation and initial compliance.", "building"],
      ["MCA21 filings", "Coordinate filings and supporting documentation.", "file"],
      ["Corporate governance", "Connect statutory records with governance processes.", "shield"],
      ["ROC query support", "Organise responses and follow-up on authority correspondence.", "document"],
    ],
    services: [
      ["Company incorporation and registration", "Coordinate incorporation filings, records and related company law requirements."],
      ["MCA21 and ROC filings", "Review filing applicability, supporting information and submission status."],
      ["ROC notices and queries", "Organise correspondence, prepare factual responses and track follow-up."],
      ["Corporate record regularisation", "Identify inconsistencies and coordinate appropriate corrective steps."],
    ],
    framework: [
      ["Companies Act, 2013", "The central corporate law framework for companies and their statutory responsibilities."],
      ["MCA rules and forms", "Applicable rules, electronic forms and filing procedures should be confirmed for each matter."],
      ["Registrar of Companies", "The relevant ROC jurisdiction depends on the company's registered office and issue."],
      ["Company records and resolutions", "Filings should align with underlying approvals, registers and supporting documents."],
    ],
    frameworkNote: "Portal status and authority correspondence should be checked directly. A submission or acknowledgement does not by itself establish acceptance or resolve a substantive issue.",
    stakeholders: commonStakeholders,
    process: [
      ["Review the issue", "Understand the filing, corporate event, portal status and business objective."],
      ["Collect the record", "Gather forms, acknowledgements, correspondence and supporting company documents."],
      ["Identify the pathway", "Separate a filing correction, pending submission, query or substantive compliance concern."],
      ["Prepare and submit", "Coordinate accurate documents and responses with the relevant internal owners."],
      ["Track completion", "Monitor authority updates, record changes and remaining obligations."],
    ],
    considerations: [
      ["Confirm the correct entity and jurisdiction", "Company details and the relevant ROC determine the filing pathway."],
      ["Reconcile filings with records", "Board approvals, registers and financial information should remain consistent."],
      ["Track portal status", "Keep acknowledgements, resubmissions and query deadlines together."],
      ["Avoid unsupported assumptions", "An upload does not necessarily mean the authority has accepted a filing."],
    ],
    comparison: {
      heading: "Common MCA / ROC workstreams",
      columns: ["Matter", "Typical focus", "Supporting record"],
      rows: [
        ["Company incorporation", "Formation and initial registrations", "Constitutional documents and subscriber details"],
        ["Annual compliance", "Periodic company filings", "Financial statements and annual return information"],
        ["Event-based filing", "Changes in directors, capital or particulars", "Approvals, registers and event documents"],
        ["Notice or resubmission", "Authority query or pending filing", "Correspondence, acknowledgement and chronology"],
      ],
    },
    faqs: [
      ["What documents should we share for an ROC matter?", "Share the company details, relevant filing, portal status, supporting records and any ROC correspondence."],
      ["Can a rejected filing be resubmitted?", "The available next step depends on the rejection reason, applicable timelines and the underlying records."],
      ["Does an MCA acknowledgement confirm approval?", "Not necessarily. The filing status and any further authority action should be checked for the specific form."],
      ["Can you help with historical filing gaps?", "Yes. A review can establish the period, missing records and potential corrective steps."],
    ],
  }),
  detail({
    slug: "statutory-return-filings",
    title: "Statutory Return Filings",
    subtitle: "Stay Compliant. Avoid Penalties. Focus on Growth.",
    description: "We provide end-to-end support for preparation and filing of statutory returns across ROC, Income Tax, GST, labour and other applicable laws to help your business remain compliant, updated and risk-free.",
    image: "/corporate-regulatory-hero.png",
    imageAlt: "Preparing statutory returns and compliance records",
    overview: {
      heading: "Accurate returns, supported by a reliable record",
      paragraphs: [
        "Statutory returns translate periodic reporting and corporate events into a formal record. Applicability and timing vary by entity, activity, jurisdiction and the event being reported.",
        "A shared calendar, clear review owners and retained acknowledgements help teams prepare information, reconcile supporting records and respond to filing dependencies in good time.",
      ],
    },
    highlights: [
      ["Timely compliance", "Map periodic and event-based filing responsibilities.", "calendar"],
      ["Penalty risk awareness", "Identify filing gaps and deadlines that need attention.", "shield"],
      ["Accurate documentation", "Reconcile return information with supporting records.", "file"],
      ["Ongoing filing support", "Coordinate preparation, submission and follow-up.", "people"],
    ],
    services: [
      ["ROC and MCA returns", "Coordinate annual and event-based company law filings."],
      ["Income tax and GST filings", "Organise return information and supporting financial or tax records."],
      ["Labour law returns", "Map applicable reporting responsibilities to the workforce and operating locations."],
      ["Compliance calendar and tracking", "Maintain filing dates, review steps, acknowledgements and internal owners."],
    ],
    framework: [
      ["Companies Act and MCA rules", "Company filings depend on entity status, annual reporting and reportable events."],
      ["Income tax requirements", "Applicable return and reporting responsibilities depend on taxpayer status and activity."],
      ["GST laws and rules", "Return frequency and reporting depend on registration, turnover and applicable provisions."],
      ["Labour and sector-specific laws", "State, workforce and business activity can create additional return obligations."],
    ],
    frameworkNote: "Filing frequency, forms and due dates can change. The applicable position should be verified for the entity, period and jurisdiction before filing.",
    stakeholders: [
      ["Private and public companies", "Companies coordinating annual and event-based statutory reporting."],
      ["LLPs and partnerships", "Registered entities with recurring tax or regulatory returns."],
      ["Employers and operators", "Businesses with labour, tax or sector-specific reporting responsibilities."],
      ["Finance and compliance teams", "Internal teams coordinating information, approvals and filing evidence."],
    ],
    process: [
      ["Map obligations", "Confirm the entity, activity, registrations, jurisdictions and reporting period."],
      ["Set the filing calendar", "Record due dates, information owners and review milestones."],
      ["Collect and reconcile data", "Check source records and resolve inconsistencies before preparation."],
      ["Review and file", "Coordinate internal approval, submission and acknowledgement retention."],
      ["Track follow-up", "Monitor queries, corrections and the next reporting cycle."],
    ],
    considerations: [
      ["Check applicability first", "Not every return applies to every entity or reporting period."],
      ["Use reconciled information", "Returns should align with books, corporate records and prior submissions."],
      ["Allow time for review", "A clear internal review step helps reduce avoidable errors and late filings."],
      ["Retain filing evidence", "Acknowledgements and supporting schedules help with future reviews."],
    ],
    comparison: {
      heading: "Common statutory return categories",
      columns: ["Return type", "Typical applicability", "Reporting focus"],
      rows: [
        ["MCA / ROC returns", "Companies and LLPs", "Annual and event-based corporate information"],
        ["Income tax returns", "Applicable taxpayers", "Income, deductions and tax position"],
        ["GST returns", "Registered persons", "Supplies, tax liability and input tax credit"],
        ["Labour law returns", "Applicable employers", "Workforce and establishment compliance"],
      ],
    },
    faqs: [
      ["Which statutory returns apply to my business?", "Applicability depends on entity type, registrations, activities, workforce, turnover and location."],
      ["Can a missed return still be filed?", "The options depend on the form, period, applicable law, current status and any notices received."],
      ["What information is needed to prepare returns?", "Typically, entity and registration particulars, accounting data, transaction records and relevant supporting documents."],
      ["Do you provide ongoing filing reminders?", "A scoped compliance calendar can track recurring due dates, information owners and filing evidence."],
    ],
  }),
  detail({
    slug: "corporate-compliance",
    title: "Corporate Compliance",
    subtitle: "Compliant Today. Stronger Tomorrow.",
    description: "We help businesses stay compliant with applicable laws, regulations and governance requirements, enabling sustainable growth and reduced legal and regulatory risk.",
    image: "/images/services/corporate-and-commercial-advisory.webp",
    imageAlt: "Corporate governance and compliance records",
    overview: {
      heading: "Compliance embedded in everyday business",
      paragraphs: [
        "Corporate compliance means adhering to applicable laws, regulations, rules, guidelines and internal policies governing business operations, governance, financial reporting, taxation, employment and other activities.",
        "A practical compliance programme connects obligations to the people, records and decisions that support them, with regular reviews as the organisation, its activities and requirements change.",
      ],
    },
    highlights: [
      ["Timely compliance", "Organise recurring filings and operating responsibilities.", "calendar"],
      ["Reduced legal and regulatory risk", "Identify obligations and potential gaps early.", "shield"],
      ["Structured governance", "Connect approvals, records and delegated responsibilities.", "building"],
      ["End-to-end support", "Coordinate compliance management across the business.", "people"],
    ],
    services: [
      ["Regulatory and legal compliance", "Map relevant obligations to entities, activities and operating locations."],
      ["Legal compliance", "Review corporate records, approvals and statutory responsibilities."],
      ["Secretarial and ROC compliance", "Coordinate governance processes, registers and company law filings."],
      ["Policy and governance support", "Develop practical controls, responsibility matrices and review routines."],
    ],
    framework: [
      ["Companies Act and MCA requirements", "Corporate governance, records and reporting responsibilities."],
      ["Tax and employment laws", "Applicable requirements depend on registrations, workforce and business operations."],
      ["Sector-specific regulation", "Industry rules and licences can add operational obligations."],
      ["Internal governance policies", "Controls should reflect the organisation's structure, risks and decision-making."],
    ],
    frameworkNote: "Applicable responsibilities differ across entities and sectors. A compliance map should be confirmed against current law and the organisation's actual activities.",
    stakeholders: commonStakeholders,
    process: [
      ["Understand the business", "Review entities, activities, locations and current governance processes."],
      ["Map obligations", "Identify applicable laws, filings, approvals and internal controls."],
      ["Assign ownership", "Define responsible teams, review points and escalation channels."],
      ["Monitor implementation", "Track due dates, evidence, changes and open compliance actions."],
      ["Review and improve", "Refresh the programme as the business and regulatory landscape evolve."],
    ],
    considerations: [
      ["Make responsibilities clear", "Each obligation needs an accountable owner and review point."],
      ["Maintain accurate records", "Evidence should support approvals, filings and compliance activity."],
      ["Update for business changes", "New activities, locations and entities may change the compliance perimeter."],
      ["Address gaps proportionately", "Prioritise remediation by exposure, urgency and available evidence."],
    ],
    comparison: {
      heading: "Compliant and non-compliant operating practices",
      columns: ["Area", "Structured compliance", "Unaddressed gaps"],
      rows: [
        ["Legal risk", "Obligations mapped and monitored", "Higher exposure to notices and penalties"],
        ["Reputation", "Consistent governance and reporting", "Reduced stakeholder confidence"],
        ["Business operations", "Clear approval and control processes", "Disruption and avoidable delays"],
        ["Growth readiness", "Reliable records and defined responsibilities", "Diligence gaps and uncertainty"],
      ],
    },
    faqs: [
      ["What is corporate compliance?", "It is the process of meeting legal, regulatory and governance requirements applicable to an organisation."],
      ["Which laws apply to my company?", "Applicability depends on entity type, activities, locations, workforce, registrations and other facts."],
      ["What happens if a filing is missed?", "Consequences and available remedies depend on the specific requirement, delay and current law."],
      ["Can compliance be outsourced?", "A business can obtain external support, while internal accountability and oversight should remain clear."],
    ],
  }),
  detail({
    slug: "compliance-framework",
    title: "Compliance Framework",
    subtitle: "Build a Stronger, Safer and Future-Ready Business.",
    description: "We design and implement customised compliance frameworks to help businesses meet applicable legal and regulatory requirements, manage risk, ensure good governance and enable sustainable growth.",
    image: "/images/services/regulatory-and-compliance.webp",
    imageAlt: "A structured compliance framework for business operations",
    overview: {
      heading: "A framework people can use",
      paragraphs: [
        "A compliance framework is a structured system of policies, processes, controls and responsibilities designed to ensure that a business complies with all applicable laws, regulations, industry standards and internal policies.",
        "The framework should fit the organisation's actual activities and make obligations, owners, evidence, review points and escalation routes visible to the people responsible for carrying them out.",
      ],
    },
    highlights: [
      ["Comprehensive compliance management", "Connect obligations, controls and ownership.", "file"],
      ["Industry-specific solutions", "Adapt the framework to activities and applicable regulation.", "building"],
      ["Risk identification and mitigation", "Prioritise gaps and proportionate controls.", "shield"],
      ["Ongoing monitoring", "Build regular review, reporting and improvement into the programme.", "chart"],
    ],
    services: [
      ["Obligation and risk mapping", "Identify applicable requirements and assess key exposure areas."],
      ["Policy and procedure development", "Create practical controls and standard processes for teams."],
      ["Compliance calendar and monitoring", "Set responsibilities, deadlines, evidence and review frequency."],
      ["Training and implementation", "Help teams understand roles, escalation and day-to-day expectations."],
    ],
    framework: [
      ["Applicable laws and regulations", "Define the legal and regulatory perimeter for each entity and activity."],
      ["Policies and procedures", "Document processes that make requirements operational and consistent."],
      ["Responsibilities and reporting", "Assign control owners, approvers and escalation responsibilities."],
      ["Monitoring and improvement", "Use periodic reviews and evidence to identify and address control gaps."],
    ],
    frameworkNote: "A useful framework must be proportionate to the organisation and maintainable by its teams. Its scope should be reviewed when business activities or regulations change.",
    stakeholders: [
      ["Growing businesses", "Organisations building formal compliance arrangements as they scale."],
      ["Multi-entity groups", "Groups coordinating obligations across subsidiaries and locations."],
      ["Compliance and legal teams", "Teams seeking clearer ownership, processes and reporting."],
      ["Boards and management", "Decision-makers seeking oversight of compliance and key risks."],
    ],
    process: [
      ["Map the operating model", "Understand entities, activities, locations and existing controls."],
      ["Identify obligations and risks", "Build an applicability register and prioritise material exposures."],
      ["Design controls and policies", "Define workable procedures, owners, review points and escalation."],
      ["Implement and train", "Introduce the framework with practical guidance for affected teams."],
      ["Monitor and improve", "Review evidence, update for change and track corrective actions."],
    ],
    considerations: [
      ["Design for the real business", "Controls should reflect actual workflows rather than generic checklists."],
      ["Make accountability explicit", "Owners and escalation routes help actions move to completion."],
      ["Keep evidence accessible", "Records support oversight, review and consistent implementation."],
      ["Build in change monitoring", "New laws, products and locations can change the framework."],
    ],
    comparison: {
      heading: "Reactive compliance and a structured framework",
      columns: ["Area", "Ad hoc / reactive", "Structured framework"],
      rows: [
        ["Approach", "Issue-based and reactive", "Systematic and proactive"],
        ["Risk management", "Limited visibility", "Comprehensive and ongoing"],
        ["Governance", "Unstructured ownership", "Defined roles, policies and controls"],
        ["Business growth", "May face delays and regulatory hurdles", "Supports expansion with clear responsibilities"],
      ],
    },
    faqs: [
      ["What is included in a compliance framework?", "A framework commonly includes obligation mapping, policies, controls, responsibilities, monitoring and reporting."],
      ["How often should a framework be reviewed?", "Review frequency depends on the business and risk profile, with updates when activities or requirements change."],
      ["Can an existing framework be improved?", "Yes. A scoped assessment can identify gaps, duplication and opportunities to clarify ownership."],
      ["Does one framework work for every industry?", "No. The framework should reflect the organisation's activities, jurisdictions, size and risk profile."],
    ],
  }),
  detail({
    slug: "regulatory-compliance-review",
    title: "Regulatory Compliance Review",
    subtitle: "Assess. Align. Strengthen. Stay Ahead.",
    description: "We conduct comprehensive regulatory compliance reviews to help businesses identify gaps, mitigate risks and ensure adherence to applicable laws, regulations and industry standards.",
    image: "/corporate-regulatory-hero.png",
    imageAlt: "Reviewing regulatory requirements and compliance records",
    overview: {
      heading: "A fact-based view of compliance",
      paragraphs: [
        "A regulatory compliance review is a systematic assessment of an organisation's operations, policies, processes and records against applicable legal and regulatory requirements.",
        "Agreeing the scope, period and evidence at the outset helps distinguish confirmed gaps from information limitations and gives management an actionable view of risk and next steps.",
      ],
    },
    highlights: [
      ["Independent assessment", "Review compliance against a defined scope and period.", "shield"],
      ["Identify gaps and risks", "Prioritise findings by impact and urgency.", "search"],
      ["Actionable recommendations", "Translate findings into clear remediation steps.", "file"],
      ["Implementation support", "Coordinate monitoring and follow-up after the review.", "people"],
    ],
    services: [
      ["Scope and evidence planning", "Define entities, activities, review period and information sources."],
      ["Obligation and control testing", "Compare applicable requirements with policies, records and operating practice."],
      ["Findings and risk assessment", "Document gaps, evidence limitations and potential impact."],
      ["Corrective action planning", "Prioritise remediation, assign owners and track closure."],
    ],
    framework: [
      ["Corporate and company law", "Review relevant entity, governance, filing and record responsibilities."],
      ["Tax and employment requirements", "Consider applicable reporting and operational obligations."],
      ["Sector rules and licences", "Assess relevant approvals, conditions and regulated activities."],
      ["Internal policies and controls", "Compare documented controls with available implementation evidence."],
    ],
    frameworkNote: "The review is bounded by the agreed scope and available evidence. Findings should not be treated as a guarantee that every possible non-compliance has been identified.",
    stakeholders: commonStakeholders,
    process: [
      ["Agree the review scope", "Confirm entities, activities, period, objectives and information access."],
      ["Collect and assess evidence", "Review records, controls, filings, licences and relevant correspondence."],
      ["Validate observations", "Discuss factual points and distinguish confirmed gaps from open questions."],
      ["Prioritise actions", "Assess risk and define proportionate corrective actions and owners."],
      ["Monitor remediation", "Track implementation and update the compliance record."],
    ],
    considerations: [
      ["Define boundaries", "A clear perimeter supports useful, proportionate findings."],
      ["Use current records", "Outdated or incomplete information can limit the assessment."],
      ["Validate factual observations", "Give relevant teams an opportunity to clarify evidence and context."],
      ["Assign remediation owners", "Findings are actionable when accountability and timing are explicit."],
    ],
    comparison: {
      heading: "Compliance with and without a structured review",
      columns: ["Area", "Without review", "With review"],
      rows: [
        ["Regulatory risk", "Potential gaps may remain unidentified", "Issues can be identified and prioritised"],
        ["Penalties and legal action", "Higher chance of delayed response", "Corrective steps can be planned sooner"],
        ["Business continuity", "Disruption from unresolved requirements", "More informed operating decisions"],
        ["Investor confidence", "Uncertainty in compliance records", "Clearer evidence and remediation status"],
      ],
    },
    faqs: [
      ["What does a regulatory compliance review cover?", "It covers the obligations, entities, activities, period and records agreed in the review scope."],
      ["How often should a review take place?", "Frequency depends on regulatory change, business risk, prior findings and internal governance."],
      ["Will a review identify every compliance issue?", "No review can guarantee that every issue will be identified; findings depend on scope and available evidence."],
      ["Can you help implement recommendations?", "Yes. Remediation support can be scoped around the agreed findings and internal responsibilities."],
    ],
  }),
  detail({
    slug: "insolvency-related-proceedings",
    title: "Insolvency-related Proceedings",
    subtitle: "Strategic Solutions for Distressed Businesses.",
    description: "We provide end-to-end advisory and representation in insolvency and restructuring matters to help businesses navigate financial distress, protect value and achieve sustainable resolution.",
    image: "/images/services/nclt-and-nclat-matters.webp",
    imageAlt: "Insolvency proceedings and business restructuring documents",
    overview: {
      heading: "Proceedings informed by the facts and the objective",
      paragraphs: [
        "Insolvency-related proceedings may involve the NCLT, NCLAT, creditors, resolution professionals and other stakeholders. The appropriate course depends on the process, the financial position and the relief sought.",
        "Early organisation of financial records, claims, notices and prior actions helps establish the issues and coordinate a focused strategy for the relevant proceeding.",
      ],
    },
    highlights: [
      ["IBC and tribunal expertise", "Support for relevant insolvency proceedings.", "scale"],
      ["Resolution-focused approach", "Connect legal steps with restructuring and recovery objectives.", "chart"],
      ["Stakeholder protection", "Consider rights, evidence and process responsibilities.", "shield"],
      ["End-to-end representation", "Coordinate preparation, proceedings and follow-through.", "people"],
    ],
    services: [
      ["NCLT and NCLAT proceedings", "Coordinate case preparation and representation in relevant matters."],
      ["Creditor applications and responses", "Organise supporting records for applications, replies and objections."],
      ["Resolution plan support", "Review process documents and coordinate stakeholder input."],
      ["Restructuring and settlement", "Assess potential consensual or process-based resolution options."],
    ],
    framework: [
      ["Insolvency and Bankruptcy Code, 2016", "The statutory framework governing relevant corporate insolvency processes."],
      ["NCLT and NCLAT procedures", "Tribunal rules and directions relevant to filing and hearing processes."],
      ["IBBI regulations", "Regulations applicable to insolvency processes and relevant professionals."],
      ["Case-specific directions", "Orders, notices and process milestones must be reviewed for each proceeding."],
    ],
    frameworkNote: "Procedural rights, forum and relief depend on the nature and stage of the matter. Representation and outcomes remain subject to the applicable process and tribunal decision.",
    stakeholders: [
      ["Corporate debtors", "Companies responding to or participating in insolvency proceedings."],
      ["Financial and operational creditors", "Creditors assessing claims, applications and recovery routes."],
      ["Resolution applicants", "Parties reviewing eligibility, process materials and plan requirements."],
      ["Directors and other stakeholders", "People coordinating records, decisions and participation in a process."],
    ],
    process: [
      ["Review notices and case status", "Establish the forum, process stage, deadlines and relief involved."],
      ["Organise the evidence", "Compile financial records, contracts, claims and prior correspondence."],
      ["Set the case strategy", "Identify issues, supporting material and required specialist inputs."],
      ["Prepare and represent", "Coordinate submissions and representation through the process."],
      ["Follow through", "Track directions, orders, agreed actions and implementation requirements."],
    ],
    considerations: [
      ["Protect response deadlines", "Notices and tribunal directions require prompt review."],
      ["Substantiate claims", "Reconciled financial records and supporting documents are important."],
      ["Coordinate stakeholder positions", "Different interests may need distinct advice and representation."],
      ["Consider practical outcomes", "Process strategy should account for recovery, continuity and implementation."],
    ],
    comparison: {
      heading: "Common insolvency proceedings",
      columns: ["Proceeding", "Primary focus", "Typical participants"],
      rows: [
        ["CIRP", "Resolution of a corporate debtor", "Debtor, creditors and resolution professional"],
        ["Pre-packaged process", "Resolution for eligible MSME debtors", "Debtor and creditors"],
        ["Liquidation", "Realisation and distribution of assets", "Liquidator and stakeholders"],
        ["Appeal or related application", "Review of a relevant order or process issue", "Affected parties and tribunal"],
      ],
    },
    faqs: [
      ["Which tribunal handles corporate insolvency proceedings?", "Relevant corporate insolvency matters are generally before the NCLT, with appeals before the NCLAT, subject to applicable law."],
      ["Can a creditor initiate insolvency proceedings?", "The availability of a process depends on eligibility, the debt, default and statutory requirements."],
      ["What records help prepare for a proceeding?", "Relevant notices, agreements, statements, claims, corporate records and a chronology of events are useful."],
      ["Can you represent both creditors and debtors?", "The engagement scope is tailored to the client and conflict checks; each party's interests are addressed separately."],
    ],
  }),
  detail({
    slug: "regulatory-risk-assessment",
    title: "Regulatory Risk Assessment",
    subtitle: "Identify Risks. Ensure Compliance. Make Informed Decisions.",
    description: "We help businesses identify, assess and mitigate regulatory risks to ensure smooth operations, protect stakeholder interests and enable sustainable growth.",
    image: "/images/services/risk-governance-and-forensic-advisory.webp",
    imageAlt: "Assessing regulatory risk and business compliance",
    overview: {
      heading: "Risk visibility for better business decisions",
      paragraphs: [
        "A regulatory risk assessment identifies and evaluates risks arising from applicable laws, regulations, licences, industry guidelines and regulatory changes.",
        "By mapping obligations to business activities and controls, organisations can prioritise material exposures, strengthen ownership and make more informed decisions about mitigation and monitoring.",
      ],
    },
    highlights: [
      ["Proactive risk identification", "Map regulatory exposure across business activities.", "shield"],
      ["Industry-specific insights", "Consider sector, location and operating context.", "chart"],
      ["Practical recommendations", "Prioritise actions based on likelihood and impact.", "file"],
      ["Decision support", "Give management a clear view of key obligations and risks.", "people"],
    ],
    services: [
      ["Regulatory landscape mapping", "Identify laws, regulators, licences and applicable obligations."],
      ["Gap and control analysis", "Assess existing controls, evidence and compliance readiness."],
      ["Risk prioritisation", "Evaluate potential impact, likelihood and business continuity implications."],
      ["Mitigation and monitoring plan", "Define practical actions, owners and review triggers."],
    ],
    framework: [
      ["Corporate and tax requirements", "Consider entity, reporting and tax-related regulatory exposure."],
      ["Sectoral regulations", "Review rules that apply to the specific business activity and industry."],
      ["Labour and employment laws", "Assess relevant workforce and establishment responsibilities."],
      ["Data, ESG and product standards", "Include cross-functional obligations where relevant to the business."],
    ],
    frameworkNote: "The assessment is based on agreed activities, records and criteria. Risk ratings are a planning aid and do not replace legal advice on a specific issue.",
    stakeholders: commonStakeholders,
    process: [
      ["Understand the operating model", "Review activities, entities, jurisdictions and business priorities."],
      ["Identify applicable requirements", "Map regulations, licences, reporting duties and change triggers."],
      ["Assess controls and exposure", "Review evidence, control design and implementation gaps."],
      ["Prioritise and recommend", "Set out risk priorities and practical mitigation actions."],
      ["Monitor the risk profile", "Agree owners and review points as the business or regulation changes."],
    ],
    considerations: [
      ["Use a defined scope", "Clear activities and boundaries improve relevance."],
      ["Include operating teams", "Their input helps reveal how processes work in practice."],
      ["Distinguish risk from confirmed breach", "An exposure assessment is not by itself a finding of non-compliance."],
      ["Reassess after material change", "New products, locations and rules can alter the risk profile."],
    ],
    comparison: {
      heading: "Operating with and without regulatory risk assessment",
      columns: ["Area", "Without assessment", "With assessment"],
      rows: [
        ["Compliance readiness", "Gaps may remain unidentified", "Obligations and priorities become clearer"],
        ["Business continuity", "Disruption may be harder to anticipate", "Controls can address key dependencies"],
        ["Decision-making", "Limited regulatory inputs", "More informed planning and approvals"],
        ["Cost management", "Late corrective work may be expensive", "Earlier action can support proportionate mitigation"],
      ],
    },
    faqs: [
      ["What is included in a regulatory risk assessment?", "It typically includes scope definition, obligation mapping, control review, prioritisation and recommendations."],
      ["Which industries can be assessed?", "Assessments can be tailored to the organisation's sector, activities, location and regulatory footprint."],
      ["How often should the assessment be refreshed?", "Refresh it after material business or regulatory change and at intervals suited to the risk profile."],
      ["Does an assessment guarantee compliance?", "No. It supports better visibility and action, but ongoing compliance depends on implementation and changing circumstances."],
    ],
  }),
  detail({
    slug: "regulatory-change-management",
    title: "Regulatory Change Management",
    subtitle: "Stay Compliant. Stay Ahead. Turn Change into Opportunity.",
    description: "We help businesses anticipate, assess and adapt to regulatory changes across laws, regulations and industry frameworks, ensuring continuity, reduced risk and sustainable growth.",
    image: "/images/services/regulatory-and-compliance.webp",
    imageAlt: "Planning for changes in regulatory requirements",
    overview: {
      heading: "Translate regulatory updates into business action",
      paragraphs: [
        "New laws, amendments, notifications and regulatory directions can affect products, processes, reporting and business responsibilities. Understanding what changed is only the first step.",
        "A structured change process identifies affected activities, assesses impact, assigns actions and tracks implementation so that relevant updates are reflected in business policies and controls.",
      ],
    },
    highlights: [
      ["Monitor regulatory updates", "Track relevant changes across sectors and jurisdictions.", "file"],
      ["Assess business impact", "Connect new requirements to actual operations.", "chart"],
      ["Pragmatic compliance plans", "Turn changes into sequenced, owned actions.", "shield"],
      ["Implementation and training", "Support teams as updated processes take effect.", "people"],
    ],
    services: [
      ["Regulatory landscape monitoring", "Identify updates relevant to entities, activities and locations."],
      ["Impact and gap assessment", "Determine which teams, policies, controls and systems are affected."],
      ["Policy and procedure updates", "Coordinate revisions and supporting implementation materials."],
      ["Training and change tracking", "Communicate responsibilities and monitor adoption."],
    ],
    framework: [
      ["Legislative and regulatory updates", "Review enacted laws, amendments, rules and effective dates."],
      ["Regulator circulars and directions", "Identify relevant authority communications and expectations."],
      ["Sector-specific standards", "Monitor applicable codes, technical standards and industry guidance."],
      ["Internal change controls", "Record impact decisions, action owners, approvals and completion evidence."],
    ],
    frameworkNote: "Not every update applies to every organisation. Applicability, commencement and transition arrangements should be checked against the actual business and current source materials.",
    stakeholders: commonStakeholders,
    process: [
      ["Monitor relevant changes", "Identify updates from relevant regulators and authoritative sources."],
      ["Screen for applicability", "Map the change to entities, products, processes and jurisdictions."],
      ["Assess impact and gaps", "Identify required policy, system, control and reporting changes."],
      ["Implement actions", "Assign owners, approvals, training and target dates."],
      ["Verify and report", "Retain evidence and review implementation after the effective date."],
    ],
    considerations: [
      ["Confirm effective dates", "Transition periods and commencement can affect sequencing."],
      ["Assess operational impact", "Changes may affect multiple functions, systems and locations."],
      ["Coordinate communications", "Relevant teams need clear and timely guidance."],
      ["Retain a decision trail", "Record applicability, approvals and completion evidence."],
    ],
    comparison: {
      heading: "Reactive and proactive regulatory change management",
      columns: ["Area", "Reactive approach", "Proactive approach"],
      rows: [
        ["Regulatory updates", "Respond after enforcement or deadline", "Monitor and anticipate changes"],
        ["Compliance status", "Higher risk of late implementation", "Timely and continuous compliance"],
        ["Business continuity", "Disruption from urgent changes", "Controlled and predictable transition"],
        ["Strategic opportunity", "Missed opportunities and uncertainty", "Early identification and adaptation"],
      ],
    },
    faqs: [
      ["How do you identify relevant regulatory changes?", "Monitoring is scoped to the organisation's activities, jurisdictions, regulators and agreed sources."],
      ["How quickly can a change be assessed?", "Timing depends on complexity, available information and the number of affected operations."],
      ["Do you update internal policies?", "Policy and procedure updates can be included in an agreed implementation scope."],
      ["How can implementation be tracked?", "An action register can record owners, deadlines, approvals, training and completion evidence."],
    ],
  }),
  detail({
    slug: "ongoing-compliance-support",
    title: "Ongoing Compliance Support",
    subtitle: "Continuous Compliance. Confident Growth.",
    description: "We provide end-to-end ongoing compliance support to help businesses meet their statutory, regulatory and governance obligations on time, reduce risk and focus on growth.",
    image: "/images/services/regulatory-and-compliance.webp",
    imageAlt: "Ongoing compliance monitoring and reporting",
    overview: {
      heading: "Steady support for recurring responsibilities",
      paragraphs: [
        "Ongoing compliance support provides a continuous advisory and execution service to help businesses comply with applicable laws, regulations, requirements, filings and governance standards.",
        "A practical programme combines a compliance calendar, document readiness, assigned owners, regular updates and review points that keep the organisation informed as obligations and operations change.",
      ],
    },
    highlights: [
      ["Timely filings and renewals", "Track recurring submissions, licences and renewal dates.", "calendar"],
      ["Proactive regulatory updates", "Identify changes that may affect ongoing obligations.", "file"],
      ["Dedicated advisory support", "Coordinate questions and compliance actions over time.", "people"],
      ["Reduced non-compliance risk", "Use regular reviews and clear follow-through.", "shield"],
    ],
    services: [
      ["Compliance calendar and alerts", "Maintain upcoming dates, information owners and review milestones."],
      ["Statutory filings and returns", "Coordinate periodic and event-based filing workstreams."],
      ["Licence and registration renewals", "Track renewal requirements, conditions and supporting documents."],
      ["Audit support and representation", "Organise compliance evidence and follow-up for reviews or queries."],
    ],
    framework: [
      ["Company law and ROC filings", "Track corporate records, annual returns and reportable events."],
      ["Tax and labour requirements", "Coordinate recurring duties based on registrations and workforce."],
      ["Sector-specific obligations", "Include applicable licences, renewals and regulatory reporting."],
      ["Governance and internal policies", "Maintain review cycles, ownership and supporting evidence."],
    ],
    frameworkNote: "Ongoing support is scoped to agreed entities, locations and responsibilities. Management retains oversight of its obligations and timely provision of complete information.",
    stakeholders: [
      ["Private and public companies", "Businesses managing recurring company law and governance duties."],
      ["LLPs and partnership firms", "Registered entities coordinating periodic statutory requirements."],
      ["Startups and MSMEs", "Growing teams seeking a consistent compliance operating routine."],
      ["Multi-location businesses", "Organisations coordinating requirements across operations and jurisdictions."],
    ],
    process: [
      ["Map the compliance perimeter", "Confirm entities, activities, locations and registrations."],
      ["Set the compliance calendar", "Record filings, renewals, information needs and owners."],
      ["Prepare and review", "Collect documents, resolve gaps and coordinate internal approval."],
      ["File and monitor", "Track submissions, acknowledgements, queries and renewals."],
      ["Review and update", "Refresh responsibilities as the business or applicable rules change."],
    ],
    considerations: [
      ["Keep information current", "Changes in directors, capital, workforce or locations may affect obligations."],
      ["Plan for internal review", "Allow time to collect, validate and approve supporting information."],
      ["Maintain evidence centrally", "Filing records and approvals should be accessible to responsible teams."],
      ["Escalate exceptions promptly", "Missed dates, queries and changes need a clear response owner."],
    ],
    comparison: {
      heading: "With and without ongoing compliance support",
      columns: ["Area", "Without support", "With ongoing support"],
      rows: [
        ["Compliance tracking", "Manual and reactive", "Systematic and proactive"],
        ["Timelines", "Higher risk of delays and defaults", "Filing and renewal dates tracked"],
        ["Regulatory updates", "May miss important changes", "Regular updates and impact analysis"],
        ["Business continuity", "Disruption from unresolved obligations", "More prepared, consistent operations"],
      ],
    },
    faqs: [
      ["What does ongoing compliance support include?", "It can include a scoped compliance calendar, filing coordination, renewals, updates and periodic review."],
      ["Can support cover more than one entity?", "Yes. The scope can be structured around multiple entities, locations and agreed responsibilities."],
      ["How often will compliance be reviewed?", "Frequency depends on the agreed service, filing cycles, risk profile and business changes."],
      ["Does ongoing support transfer all legal responsibility?", "No. The organisation remains responsible for oversight, decisions and providing accurate information."],
    ],
  }),
];

export const getCorporateRegulatoryDetail = (slug: string) =>
  corporateRegulatoryDetails.find((item) => item.slug === slug);
