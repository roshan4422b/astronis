import type { EntityFormationPageData } from "./entity-formation-pages";

const common = {
  image: "/business-financial-hero.png",
  imageAlt: "Professional advisory team supporting a transaction or governance discussion",
  heroNoteEyebrow: "CORPORATE STRATEGY",
  heroNoteTitle: "Clear decisions. Stronger outcomes.",
  heroNoteDescription: "Align commercial priorities with legal, governance and execution discipline.",
  showTestimonials: false,
  showInsights: false,
  showKnowledge: false,
  showReviewActions: false,
  processNumbers: true,
};

const servicePages: EntityFormationPageData[] = [
  {
    ...common,
    slug: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    shortTitle: "M&A",
    heroStatement: "Strategic combinations. Clear outcomes.",
    description: "We support companies, investors and founders through acquisitions, sales, joint ventures and strategic transactions with a disciplined legal and commercial approach.",
    introduction: "Every deal carries commercial opportunity, legal risk and operational complexity. Our role is to align strategy, diligence and transaction mechanics so the business can capture value without creating avoidable post-close exposure.",
    basicPrice: "₹39,999/-",
    comprehensivePrice: "₹99,999/-",
    categoryTitle: "Mergers, Acquisitions & Transactions",
    categoryHref: "/services/corporate-commercial-advisory/mergers-acquisitions-transactions",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · M&A",
    servicesHeading: "Transaction support from strategy to closing",
    servicesDescription: "Structure the deal around value creation, risk management and a realistic implementation plan.",
    benefitsHeading: "Why M&A requires disciplined advisory",
    requirementsEyebrow: "TRANSACTION MAPPING",
    requirementsHeading: "Essential information to begin",
    basicPackageEyebrow: "ADVISORY ESSENTIALS",
    basicPackageName: "Essential Deal Advisory",
    comprehensivePackageEyebrow: "END-TO-END SUPPORT",
    comprehensivePackageName: "Transaction Execution Support",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Structured advisory to suit the transaction stage",
    pricingDescription: "Professional fees depend on deal complexity, diligence scope and required execution support.",
    documentsDescription: "The exact documentation request depends on the target profile, sector, transaction structure and jurisdictional context.",
    faqDescription: "Common questions about M&A strategy and deal execution.",
    comparisonHeading: "Transaction structures at a glance",
    comparisonDescription: "Use this framework to compare transaction routes, control implications and implementation considerations.",
    comparisonHeaders: ["Share Acquisition", "Asset Acquisition", "Merger", "Joint Venture"],
    comparisonFocusIndex: 0,
    benefits: [
      ["handshake", "Clear deal strategy", "Define the objective, valuation context and intended control structure before a commitment is made."],
      ["chart", "Better risk allocation", "Identify legal, commercial and operational issues before they become post-close liabilities."],
      ["shield", "Commercial protection", "Translate negotiation priorities into rights, protections and governance mechanisms."],
      ["people", "Operational continuity", "Coordinate integration planning and transition milestones around business realities."],
      ["building", "Stronger governance", "Match deal mechanics to ownership, board approval and reporting frameworks."],
      ["globe", "Cross-border readiness", "Assess structuring and regulatory considerations for domestic or international transactions."]
    ],
    services: [
      ["search", "Target screening & deal framing", "Assess strategic fit, transaction rationale and likely value drivers."],
      ["document", "Transaction documentation", "Coordinate the core commercial and legal documents needed for execution."],
      ["shield", "Diligence coordination", "Review legal exposure, key obligations and material business risks."],
      ["people", "Negotiation support", "Help translate business goals into actionable deal positions."],
      ["calendar", "Closing & implementation", "Manage approvals, conditions and transition steps through completion."],
      ["gear", "Post-close integration planning", "Map responsibilities, governance and continuity for the first phase after closing."]
    ],
    structurePoints: [
      ["target", "Strategic rationale", "Every transaction should align with the business's growth, portfolio or strategic priorities."],
      ["chart", "Control and value creation", "Assess how the structure affects ownership, governance and future value realization."],
      ["shield", "Risk and liability review", "Understand the exposure behind the headline deal terms."],
      ["calendar", "Execution discipline", "A clear timeline with approvals and conditions reduces avoidable delays."]
    ],
    comparison: [
      ["Structure", "Buyer acquires equity in target company", "Buyer acquires selected assets and liabilities", "Two entities combine into one operating structure", "Parties establish a shared platform"],
      ["Control", "Full or majority control through shareholding", "Control over specific business units or assets", "Combined governance and post-merger integration", "Defined rights through governance and operating agreements"],
      ["Key diligence focus", "Corporate records, contracts, liabilities, compliance", "Asset ownership, contracts and operational continuity", "Shareholders, approvals and regulatory pathways", "Governance, economics and exit protections"],
      ["Planning focus", "Deal certainty, integration and governance", "Asset transfer and continuity execution", "Regulatory review and post-merger structure", "Commercial alignment and defined rights"]
    ],
    process: [
      ["Mandate and strategic review", "Define transaction objectives, target profile and commercial framework."],
      ["Information and diligence", "Review legal, operational and commercial positions to identify issues and value drivers."],
      ["Structure and negotiations", "Test alternative transaction routes and align risk allocation."],
      ["Documentation and approvals", "Coordinate transaction documents, board approvals and statutory steps."],
      ["Closing and transition", "Manage completion mechanics and post-close implementation planning."]
    ],
    documents: [
      "Company constitutional documents and corporate records",
      "Business overviews, financial statements and operational summaries",
      "Key commercial contracts, shareholder arrangements and licences",
      "Litigation, regulatory and compliance reports",
      "Shareholding chart and governance records",
      "Draft transaction documents, term sheet and deal timetable"
    ],
    requirements: [
      ["search", "Deal scope", "The strategic purpose, target profile and intended transaction route."],
      ["people", "Ownership and governance", "Current shareholders, board structure and material approvals or restrictions."],
      ["file", "Material documents", "Key contracts, regulatory filings, financials and corporate records."],
      ["shield", "Issue areas", "Known legal, tax or operational risks requiring review and negotiation."]
    ],
    faqs: [
      ["When should we involve M&A counsel and advisors?", "Early involvement allows the business to shape transaction perimeter, diligence scope and commercial strategy before documents and process timelines become fixed."],
      ["Can a transaction be structured around specific control objectives?", "Yes. The route can be selected to match the intended control position, investment profile, tax considerations and required approvals."],
      ["What is the focus during the diligence stage?", "The review usually covers legal exposure, business continuity, liabilities, contracts, compliance and any risks that could affect value or closing."]
    ]
  },
  {
    ...common,
    slug: "transaction-structuring",
    title: "Transaction Structuring",
    shortTitle: "Structuring",
    heroStatement: "Structure the deal around value and certainty.",
    description: "We advise on transaction architecture, governance levers, capital allocation and commercial terms to support efficient and defensible deal execution.",
    introduction: "A well-structured transaction is not just a legal exercise. It determines who controls key decisions, where value sits, what protections exist, and how the business can adapt after closing.",
    basicPrice: "₹34,999/-",
    comprehensivePrice: "₹89,999/-",
    categoryTitle: "Mergers, Acquisitions & Transactions",
    categoryHref: "/services/corporate-commercial-advisory/mergers-acquisitions-transactions",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · STRUCTURING",
    servicesHeading: "Deal architecture aligned to business goals",
    servicesDescription: "Match structure to governance, value creation and transaction risk.",
    benefitsHeading: "Why transaction structuring matters",
    requirementsEyebrow: "STRUCTURE REVIEW",
    requirementsHeading: "Information needed for design and analysis",
    basicPackageEyebrow: "ADVISORY ESSENTIALS",
    basicPackageName: "Deal Structure Review",
    comprehensivePackageEyebrow: "END-TO-END SUPPORT",
    comprehensivePackageName: "Transaction Architecture Advisory",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Practical pricing based on transaction complexity",
    pricingDescription: "We structure the advisory scope around business objectives, jurisdictional issues, negotiation points and implementation needs.",
    documentsDescription: "The documentation request depends on whether the deal is a share acquisition, asset transfer, merger, JV or strategic investment.",
    faqDescription: "Questions we often hear about structuring complex transactions.",
    comparisonHeading: "Common structuring routes",
    comparisonDescription: "Compare commercial and governance outcomes across transaction forms.",
    comparisonHeaders: ["Share Purchase", "Asset Purchase", "Merger", "JV / Partnership"],
    comparisonFocusIndex: 0,
    benefits: [
      ["chart", "Better value alignment", "Choose the structure that best reflects ownership, risk and long-term returns."],
      ["shield", "Risk allocation", "Distribute obligations and liabilities in a way that matches commercial realities."],
      ["building", "Governance clarity", "Define rights, approvals and management control up front."],
      ["document", "Operational continuity", "Make sure implementation steps are feasible for the acquired or combined business."],
      ["people", "Negotiation strength", "Build a defensible negotiation position using clearer commercial logic."],
      ["globe", "Regulatory readiness", "Assess approvals, filings and cross-border concerns early in design."]
    ],
    services: [
      ["search", "Commercial analysis", "Understand incentive alignment, valuation and strategic fit."],
      ["document", "Drafting support", "Assist with term sheets, shareholder arrangements and transaction documents."],
      ["shield", "Risk review", "Assess liabilities, obligations and exposure considerations."],
      ["people", "Governance design", "Structure decision-making rights and board arrangements."],
      ["calendar", "Implementation roadmap", "Plan approvals, conditions and closing steps."],
      ["gear", "Post-close governance", "Define the structures and reporting model for the post-deal period."]
    ],
    structurePoints: [
      ["target", "Deal objective", "Clarify whether the intent is control, growth, strategic access, capital efficiency or a mix of these."],
      ["chart", "Value capture", "The structure should support the intended allocation of value and future returns."],
      ["shield", "Protection design", "Define rights, approvals, representations and remedies in a practical way."],
      ["calendar", "Execution realism", "A realistic path through approvals, due diligence and closing increases certainty."]
    ],
    comparison: [
      ["Structure", "Share purchase", "Asset purchase", "Merger", "Joint venture"],
      ["Control", "Shareholder control and governance", "Asset-level control with separate legal entities", "Combined governance model", "Defined rights through agreements"],
      ["Primary concern", "Ownership and liabilities", "Asset transfer and continuity", "Regulatory and integration steps", "Commercial governance and exit rights"],
      ["Best fit", "Strategic acquisitions", "Selected business carve-outs", "Combination of entities", "Collaborative business arrangements"]
    ],
    process: [
      ["Scoping and strategic review", "Define the transaction purpose, potential routes and expected commercial outcomes."],
      ["Structure analysis", "Evaluate control, continuity, tax and execution considerations for each route."],
      ["Term sheet and negotiation", "Translate the business model into commercial positions and transaction terms."],
      ["Documentation and approvals", "Prepare and refine legal documentation with governance and board input."],
      ["Implementation and closing", "Support execution planning and completion management."]
    ],
    documents: [
      "Business plan and transaction objectives",
      "Target or partner documents and existing structures",
      "Ownership and shareholder information",
      "Contract and regulatory summaries",
      "Draft term sheet and key negotiation points",
      "Board or investor approval records"
    ],
    requirements: [
      ["search", "Commercial objective", "The intended business outcome and required control or governance position."],
      ["people", "Current structure", "Existing ownership, management rights and key stakeholder dynamics."],
      ["file", "Available records", "Financials, contracts, corporate records and approvals already in place."],
      ["shield", "Risk areas", "Any issue that could affect value, control or deal certainty."]
    ],
    faqs: [
      ["Can the same business goal be achieved through different transaction structures?", "Yes. A single objective may be reached via a share purchase, asset transfer, merger or JV depending on the commercial, operational and regulatory context."],
      ["How early should structure be considered?", "As early as possible. Structure affects diligence, negotiation leverage, governance design and execution complexity."],
      ["What is the role of governance in structuring?", "Governance is central: it determines who decides, how approvals work and how the business handles future disputes or strategic changes."]
    ]
  },
  {
    ...common,
    slug: "legal-due-diligence",
    title: "Legal Due Diligence",
    shortTitle: "Legal DD",
    heroStatement: "Identify risk before commitment.",
    description: "We support buyers, investors and management teams with legal due diligence to assess liabilities, compliance exposure and transaction-critical issues before execution.",
    introduction: "Legal due diligence is the disciplined review of rights, obligations and legal risk. It brings focus to the issues that could affect value, closure, post-close liabilities or the need for protection in transaction documents.",
    basicPrice: "₹29,999/-",
    comprehensivePrice: "₹79,999/-",
    categoryTitle: "Mergers, Acquisitions & Transactions",
    categoryHref: "/services/corporate-commercial-advisory/mergers-acquisitions-transactions",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · LEGAL DD",
    servicesHeading: "Legal diligence that informs decisions",
    servicesDescription: "Review the legal position and expose the issues that matter most.",
    benefitsHeading: "Why legal due diligence makes a difference",
    requirementsEyebrow: "DUE DILIGENCE REVIEW",
    requirementsHeading: "Documents and facts required",
    basicPackageEyebrow: "CORE ADVISORY",
    basicPackageName: "Due Diligence Review",
    comprehensivePackageEyebrow: "EXTENSIVE REVIEW",
    comprehensivePackageName: "Transaction Risk Review",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Clear pricing aligned to scope and complexity",
    pricingDescription: "The level of review depends on the size, sector, complexity and risk profile of the subject business or asset.",
    documentsDescription: "We typically request corporate, financial, commercial, regulatory and operational records relevant to the transaction and sector.",
    faqDescription: "Common questions about legal due diligence.",
    comparisonHeading: "Review focus areas",
    comparisonDescription: "A practical overview of the legal domains that typically require diligence.",
    comparisonHeaders: ["Corporate", "Commercial", "Regulatory", "Operational"],
    comparisonFocusIndex: 0,
    benefits: [
      ["search", "Risk visibility", "Surface legal and regulatory issues before they become deal-breakers."],
      ["shield", "Protection planning", "Help frame negotiated protections, indemnities and conditions precedent."],
      ["document", "Commercial clarity", "Understand how contracts, rights and obligations interact across the business."],
      ["chart", "Decision support", "Back strategic choices with a fact-based legal review."],
      ["building", "Governance oversight", "Review existing approvals, disputes and compliance records."],
      ["people", "Implementation readiness", "Assess whether the business can transition smoothly after the deal closes."]
    ],
    services: [
      ["file", "Corporate records review", "Check shareholding, governance records and compliance history."],
      ["document", "Contract analysis", "Assess material employment, supplier and customer arrangements."],
      ["shield", "Regulatory and compliance review", "Evaluate licences, filings, penalties and regulatory exposure."],
      ["people", "Litigation and dispute review", "Identify pending or potential claims and their implications."],
      ["calendar", "Transaction support", "Translate diligence findings into risk allocation and negotiation strategy."],
      ["gear", "Closing readiness", "Help ensure legal conditions are understood before signing and closing."]
    ],
    structurePoints: [
      ["target", "Scope and context", "Start with the deal purpose, sector and material areas of risk."],
      ["chart", "Review coverage", "Legal diligence should align with the business model and transaction structure."],
      ["shield", "Critical risk areas", "Focus on liabilities, compliance, litigation and key contracts."],
      ["calendar", "Actionability", "Findings should support negotiation, price adjustment and condition structuring."]
    ],
    comparison: [
      ["Review area", "Corporate records", "Commercial contracts", "Regulatory exposure", "Operational liabilities"],
      ["Typical issues", "Shareholding, filings and approvals", "Key customer and supplier rights", "Licences, permits and compliance", "Employment, property and operational obligations"],
      ["Main concern", "Board and shareholder records", "Performance, termination and liabilities", "Penalties and oversight obligations", "Business continuity and service disruption"],
      ["Client value", "Decision confidence", "Contract risk visibility", "Proactive compliance planning", "Execution certainty"]
    ],
    process: [
      ["Scope and request list", "Define the transaction perimeter and documentation request list."],
      ["Information review", "Review records, contracts and key corporate materials."],
      ["Risk analysis", "Assess issues, priorities and implications for deal execution."],
      ["Negotiation support", "Translate findings into protection and deviation strategies."],
      ["Closing and follow-through", "Support final conditions and post-signing implementation."]
    ],
    documents: [
      "Corporate records and constitutional documents",
      "Shareholding and governance records",
      "Customer, supplier and vendor agreements",
      "Employment and consultant agreements",
      "Licence, permit and regulatory filings",
      "Litigation, claims and compliance summaries"
    ],
    requirements: [
      ["search", "Transaction context", "The target business, sector and commercial rationale for the deal."],
      ["people", "Key stakeholders", "Management, board members, ownership structure and advisors."],
      ["file", "Document set", "Corporate records, contracts, licences and material correspondence."],
      ["shield", "Priority risks", "Any known dispute, compliance concern or material legal issue."]
    ],
    faqs: [
      ["How long does legal due diligence usually take?", "It depends on the size, complexity and accessibility of the record set, but clarity on scope and information flow helps keep the process focused."],
      ["Does due diligence drive negotiation outcomes?", "It often does. It exposes legal risks and helps shape negotiations, price protections and transaction conditions."],
      ["Can diligence identify regulatory issues early?", "Yes. Early review of licenses, permits and compliance history is often key to avoiding surprises after signing." ]
    ]
  },
  {
    ...common,
    slug: "corporate-due-diligence",
    title: "Corporate Due Diligence",
    shortTitle: "Corporate DD",
    heroStatement: "Review the corporate foundation before you commit.",
    description: "We review corporate governance, ownership structures, regulatory history and decision-making frameworks to help buyers and investors assess governance and continuity risk.",
    introduction: "A company may appear operationally sound while holding corporate, governance or shareholding issues that can affect value, control and the certainty of closing. Corporate due diligence focuses on the legal and governance structure behind the business.",
    basicPrice: "₹27,999/-",
    comprehensivePrice: "₹72,999/-",
    categoryTitle: "Mergers, Acquisitions & Transactions",
    categoryHref: "/services/corporate-commercial-advisory/mergers-acquisitions-transactions",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · CORPORATE DD",
    servicesHeading: "Corporate review that supports stronger decisions",
    servicesDescription: "Assess the governance, ownership and compliance framework discretely and clearly.",
    benefitsHeading: "Why corporate due diligence matters",
    requirementsEyebrow: "CORPORATE RISK REVIEW",
    requirementsHeading: "Essential corporate information",
    basicPackageEyebrow: "CORE REVIEW",
    basicPackageName: "Corporate Review",
    comprehensivePackageEyebrow: "DETAILED REVIEW",
    comprehensivePackageName: "Corporate Governance Risk Review",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Flexible support depending on complexity",
    pricingDescription: "The scope depends on complexity of the corporate structure, sector, ownership history and governance arrangements.",
    documentsDescription: "We typically request governance records, shareholding charts, board records, compliance filings and key ownership documentation.",
    faqDescription: "Key queries on corporate due diligence.",
    comparisonHeading: "Common governance review areas",
    comparisonDescription: "Corporates often require review across the following themes before execution.",
    comparisonHeaders: ["Ownership", "Governance", "Compliance", "Continuity"],
    comparisonFocusIndex: 0,
    benefits: [
      ["building", "Governance visibility", "Identify weak points in board, shareholder or decision-making frameworks."],
      ["people", "Ownership clarity", "Understand who controls the business and whether rights are documented properly."],
      ["shield", "Compliance confidence", "Review filings, approvals and records to assess risk and exposure."],
      ["chart", "Transition readiness", "Identify continuity issues that could affect closing or future operations."],
      ["document", "Board discipline", "Assess whether governance practice aligns with legal and commercial expectations."],
      ["globe", "Cross-border assurance", "Review structures and approvals in multi-jurisdictional or investor-driven arrangements."]
    ],
    services: [
      ["file", "Corporate records review", "Review the organisation's key governance and filing history."],
      ["people", "Shareholding analysis", "Assess ownership structure, rights and restrictions."],
      ["building", "Board and committee review", "Review approvals, decision rights and governance processes."],
      ["shield", "Compliance mapping", "Review filings, disclosures and legal obligations."],
      ["calendar", "Risk assessment", "Translate findings into business and transaction risks."],
      ["gear", "Action plan", "Recommend practical corrective steps before completion."]
    ],
    structurePoints: [
      ["target", "Ownership and control", "Map the current ownership structure and decision-making hierarchy."],
      ["chart", "Governance records", "Review board resolutions, approvals and authority documents."],
      ["shield", "Compliance history", "Check whether filings and legal obligations have been met consistently."],
      ["calendar", "Continuity and transition", "Assess whether governance issues could affect deal certainty or operations after closing."]
    ],
    comparison: [
      ["Focus area", "Shareholding and control", "Board and management process", "Statutory compliance", "Corporate continuity"],
      ["Typical issue", "Unclear rights or registered structures", "Unrecorded approvals or governance gaps", "Late filings or missing disclosures", "Operational dependence on a few individuals"],
      ["Impact", "Control or value risk", "Decision-making uncertainty", "Regulatory exposure", "Transition and continuity risk"],
      ["Action", "Clarify structure and rights", "Strengthen governance process", "Close compliance issues", "Plan continuity controls"]
    ],
    process: [
      ["Information collection", "Gather corporate, ownership and governance records."],
      ["Structure review", "Map shareholding, control and approval routes."],
      ["Compliance and governance assessment", "Review filings, resolutions and legal obligations."],
      ["Risk evaluation", "Assess whether governance issues affect the transaction or future operations."],
      ["Recommendations", "Prioritise remedies, protections or corrective action."]
    ],
    documents: [
      "Certificate of incorporation and constitutional documents",
      "Shareholding and cap table records",
      "Board and shareholder resolutions",
      "Director and key manager details",
      "Compliance and filing history",
      "Related-party and governance documentation"
    ],
    requirements: [
      ["search", "Corporate structure", "Current ownership, share classes and governance arrangements."],
      ["people", "Leadership and approvals", "Board composition, management rights and decision makers."],
      ["file", "Corporate records", "Resolutions, filings, shareholder history and documents."],
      ["shield", "Known issues", "Prior disputes, compliance problems or control concerns."]
    ],
    faqs: [
      ["What is the difference between legal and corporate due diligence?", "Legal due diligence focuses on contracts, compliance and exposure across the business, while corporate due diligence looks more directly at governance, ownership and decision-making structures."],
      ["Why does governance matter in a transaction?", "Weak governance can create uncertainty around approvals, share rights, management authority and continuity of control after closing."],
      ["Can we fix governance issues before closing?", "Yes. Identifying them early allows the parties to address them through governance changes, documentation and risk mitigation measures before completion."]
    ]
  },
  {
    ...common,
    slug: "private-equity-transactions",
    title: "Private Equity Transactions",
    shortTitle: "Private Equity",
    heroStatement: "Capital, control and value creation.",
    description: "We support growth-stage and established businesses in private equity transactions, investment review, governance design and exit readiness.",
    introduction: "Private equity transactions are shaped by capital structure, governance rights, value creation plans and eventual exit strategy. The right advisory approach helps balance investor priorities with operational realities and management objectives.",
    basicPrice: "₹44,999/-",
    comprehensivePrice: "₹1,09,999/-",
    categoryTitle: "Mergers, Acquisitions & Transactions",
    categoryHref: "/services/corporate-commercial-advisory/mergers-acquisitions-transactions",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · PRIVATE EQUITY",
    servicesHeading: "Private equity execution built around value",
    servicesDescription: "Support the investment, governance and exit journey with clarity and commercial discipline.",
    benefitsHeading: "Why PE transactions need a stronger advisory lens",
    requirementsEyebrow: "INVESTOR REVIEW",
    requirementsHeading: "Information typically needed",
    basicPackageEyebrow: "CORE SUPPORT",
    basicPackageName: "PE Transaction Briefing",
    comprehensivePackageEyebrow: "FULL SUPPORT",
    comprehensivePackageName: "Investment & Exit Advisory",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Advisory scope tailored to transaction stage",
    pricingDescription: "Private equity mandates vary greatly depending on diligence depth, governance complexity and the investment or exit model.",
    documentsDescription: "The document list depends on investor type, business stage, sector profile and the nature of the proposed investment or exit.",
    faqDescription: "Frequently asked private equity advisory questions.",
    comparisonHeading: "Key PE structuring themes",
    comparisonDescription: "Investors typically weigh commercial, governance and exit considerations across the following dimensions.",
    comparisonHeaders: ["Investment model", "Governance", "Exit strategy", "Value creation"],
    comparisonFocusIndex: 0,
    benefits: [
      ["chart", "Better investment clarity", "Understand how financing, equity rights and governance align with value creation objectives."],
      ["people", "Governance balance", "Structure investor rights while preserving operational flexibility and management accountability."],
      ["building", "Stronger standards", "Build reporting, board oversight and compliance frameworks around investor expectations."],
      ["shield", "Risk control", "Assess liabilities, warranties and risk allocation in a way that supports confidence."],
      ["document", "Exit readiness", "Build the foundations for eventual divestment or recapitalisation."],
      ["globe", "Cross-border support", "Evaluate investor requirements and regulatory conditions in domestic or international settings."]
    ],
    services: [
      ["search", "Investment review", "Assess business quality, growth outlook and transaction merit."],
      ["document", "Transaction documentation", "Prepare and review investment, shareholder and governance arrangements."],
      ["shield", "Risk and diligence support", "Support legal, commercial and operational review during the transaction."],
      ["people", "Governance design", "Configure board rights, voting mechanisms and shareholder protections."],
      ["calendar", "Exit planning", "Map value realization options and future transaction pathways."],
      ["gear", "Post-investment support", "Support governance, reporting and ongoing obligations after closing."]
    ],
    structurePoints: [
      ["target", "Investment objective", "Align the capital structure with strategic, commercial and time-based goals."],
      ["chart", "Governance design", "Clarify control, approval rights and management accountability."],
      ["shield", "Risk and protection", "Match liabilities, warranties and covenants to investor expectations."],
      ["calendar", "Exit strategy", "A clear route to monetisation or follow-on capital raises reduces uncertainty."]
    ],
    comparison: [
      ["Theme", "Investment structure", "Governance rights", "Reporting obligations", "Exit considerations"],
      ["Investor focus", "Capital contribution and return profile", "Board seats, veto rights and protective provisions", "Operational reporting and KPI monitoring", "Strategic sale, IPO or secondary exit"],
      ["Business focus", "Funding needs and dilution impact", "Operational autonomy and accountability", "Board and management information flows", "Growth path and market readiness"],
      ["Outcome", "Appropriate capital and control alignment", "Balanced governance and execution", "Transparency and oversight", "Value maximization at exit"]
    ],
    process: [
      ["Mandate and strategy review", "Clarify investment goals, governance needs and target profile."],
      ["Diligence and valuation", "Assess the business, its legal position and value drivers."],
      ["Negotiation and documentation", "Define investment rights, governance mechanics and protections."],
      ["Approvals and closing", "Coordinate investor, board and other legal steps."],
      ["Post-investment execution", "Support the transition into operating and reporting obligations."]
    ],
    documents: [
      "Business and financial summaries",
      "Shareholder and cap table information",
      "Investment term sheet or deal proposal",
      "Governance and board history",
      "Commercial contracts and key operational rights",
      "Exit and liquidity planning documents"
    ],
    requirements: [
      ["search", "Investment thesis", "The intended capital structure, stage of business and return objectives."],
      ["people", "Stakeholder landscape", "Founders, management, investors and any strategic partners."],
      ["file", "Key records", "Financials, contracts, cap table, governance records and operational summaries."],
      ["shield", "Priority issues", "Any legal, governance or commercial risks affecting value or execution."]
    ],
    faqs: [
      ["What matters most in a PE transaction?", "Commercial fit, governance rights, value creation planning and the ability to align investor and management expectations over time."],
      ["How do governance rights affect the deal?", "They determine board composition, approvals, information rights and overall control, which can have a major impact on strategy and execution."],
      ["What role does exit planning play?", "Exit planning is important early: it clarifies the likely route to monetisation and helps shape governance and capital structure decisions from the start."]
    ]
  },
  {
    ...common,
    slug: "investment-transactions",
    title: "Investment Transactions",
    shortTitle: "Investment",
    heroStatement: "Capital decisions, executed with clarity.",
    description: "We advise on strategic investments, capital raises, minority investments and transaction structuring to support sustainable value creation and risk-aware growth.",
    introduction: "Investment transactions are often about more than capital. They involve governance, protections, follow-on rights, reporting obligations and the practical realities of running a growing business with outside capital.",
    basicPrice: "₹39,999/-",
    comprehensivePrice: "₹94,999/-",
    categoryTitle: "Mergers, Acquisitions & Transactions",
    categoryHref: "/services/corporate-commercial-advisory/mergers-acquisitions-transactions",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · INVESTMENT",
    servicesHeading: "Investment transections designed for growth and governance",
    servicesDescription: "Navigate capital strategy with clear structure, decision rights and accountability.",
    benefitsHeading: "Why investment transactions need disciplined framing",
    requirementsEyebrow: "INVESTMENT REVIEW",
    requirementsHeading: "Information typically reviewed",
    basicPackageEyebrow: "CORE STRUCTURE",
    basicPackageName: "Investment Structure Advisory",
    comprehensivePackageEyebrow: "FULL SUPPORT",
    comprehensivePackageName: "Strategic Investment Advisory",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Structured legal and commercial support",
    pricingDescription: "We tailor the mandate to the transaction stage, disclosure needs and the balance between investor rights and company flexibility.",
    documentsDescription: "Document requirements depend on whether the transaction is a growth capital raise, strategic investment or structured minority investment.",
    faqDescription: "Common issues in investment transactions.",
    comparisonHeading: "Key decision points",
    comparisonDescription: "A useful lens for reviewing the structure around investor and company goals.",
    comparisonHeaders: ["Capital raise", "Minority investment", "Strategic investment", "Structured financing"],
    comparisonFocusIndex: 0,
    benefits: [
      ["chart", "Appropriate capital structure", "Balance funding needs, dilution, governance and exit options."],
      ["people", "Stronger investor alignment", "Agree rights, expectations and decision pathways before commitment."],
      ["shield", "Practical risk allocation", "Protect against disputes or future misalignment around performance and obligations."],
      ["document", "Commercial clarity", "Set out reporting, approvals, rights and remedies in a coherent form."],
      ["building", "Governance discipline", "Align board and shareholder processes with future growth requirements."],
      ["globe", "Scalable framework", "Support international or multi-investor structures when required."]
    ],
    services: [
      ["search", "Investment framing", "Clarify commercial purpose, investor mix and capital needs."],
      ["document", "Documentation", "Prepare the underlying investment, shareholder and governance instruments."],
      ["shield", "Risk review", "Assess legal, regulatory and commercial exposure around the structure."],
      ["people", "Governance support", "Define decision-making rights and reporting frameworks."],
      ["calendar", "Execution support", "Coordinate approvals, documentation and closing mechanics."],
      ["gear", "Post-investment planning", "Support the practical integration of new capital and governance."]
    ],
    structurePoints: [
      ["target", "Investment objective", "Assess the company's need for capital, expertise, network or strategic alignment."],
      ["chart", "Value and control", "Balance dilution, governance rights and future value realization."],
      ["shield", "Protection mechanism", "Use contractual protections that reflect risk and leverage."],
      ["calendar", "Execution discipline", "Set an orderly timeline for approvals, negotiation and completion."]
    ],
    comparison: [
      ["Route", "Capital raise", "Minority investment", "Strategic investment", "Structured financing"],
      ["Core concern", "Funding and dilution", "Governance and control balance", "Strategic and operational alignment", "Capital terms and security"],
      ["Typical rights", "Reporting and approvals", "Board representation or vetoes", "Commercial cooperation rights", "Security and enforcement protections"],
      ["Best fit", "Growth and operating needs", "Outside strategic capital", "Portfolio or strategic value creation", "Specific financing structure"]
    ],
    process: [
      ["Investment evaluation", "Assess business need, investor profile and transaction equity or debt requirements."],
      ["Positioning and structuring", "Define rights, governance and documentation tailored to the transaction."],
      ["Negotiation and documentation", "Refine deal terms and the practical investor-company framework."],
      ["Approvals and closing", "Coordinate board and shareholder steps with legal and commercial execution."],
      ["Post-close implementation", "Support operational integration of the new capital and governance arrangements."]
    ],
    documents: [
      "Business overview and growth plan",
      "Current cap table and shareholder arrangements",
      "Financial statements and funding needs",
      "Corporate governance records",
      "Investment proposal or term sheet",
      "Commercial contracts and material obligations"
    ],
    requirements: [
      ["search", "Capital objective", "The amount, purpose and timing of funding required."],
      ["people", "Stakeholders", "Founders, management, existing investors and prospective investors."],
      ["file", "Business records", "Financial documents, board records and structuring history."],
      ["shield", "Concerns", "Any issues that could affect investor confidence or deal risk."]
    ],
    faqs: [
      ["Should governance rights be discussed early?", "Yes. Governance is often one of the defining elements of an investment transaction and should be structured before final commitment."],
      ["Can investors and founders align on growth without conflict?", "Yes, when rights, reporting and governance are designed to reflect the real commercial relationship and decision-making needs."],
      ["What is the role of legal advice in an investment deal?", "Legal advice helps align rights, obligations and implementation plans with both investor protections and company flexibility."]
    ]
  },
  {
    ...common,
    slug: "shareholder-matters",
    title: "Shareholder Matters",
    shortTitle: "Shareholders",
    heroStatement: "Governance clarity for ownership decisions.",
    description: "We advise on shareholder rights, governance processes, dispute prevention and strategic decision-making for companies with complex ownership arrangements or investor-driven structures.",
    introduction: "Shareholder issues often arise not because of a single event, but because rights, approvals and expectations are not well-aligned. Good planning helps avoid disputes and maintains operational continuity during critical decisions.",
    basicPrice: "₹29,999/-",
    comprehensivePrice: "₹74,999/-",
    categoryTitle: "Corporate Governance",
    categoryHref: "/services/corporate-commercial-advisory/corporate-governance",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · SHAREHOLDERS",
    servicesHeading: "Shareholder governance designed for continuity",
    servicesDescription: "Clarify rights, decision pathways and protections before questions become disputes.",
    benefitsHeading: "Why shareholder structures need active oversight",
    requirementsEyebrow: "SHAREHOLDER REVIEW",
    requirementsHeading: "Information usually reviewed",
    basicPackageEyebrow: "CORE REVIEW",
    basicPackageName: "Shareholder Rights Review",
    comprehensivePackageEyebrow: "FULL SUPPORT",
    comprehensivePackageName: "Shareholder Governance Advisory",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Abreast of complexity and stakeholder needs",
    pricingDescription: "The scope depends on the ownership structure, governance framework and whether the advisory is preventive or dispute-focused.",
    documentsDescription: "We typically review constitutional records, shareholder agreements, board records and ownership documentation.",
    faqDescription: "Questions we commonly receive about shareholder governance.",
    comparisonHeading: "Shareholder governance topics",
    comparisonDescription: "Common issues that deserve proactive attention across ownership structures.",
    comparisonHeaders: ["Rights", "Controls", "Dispute prevention", "Decision route"],
    comparisonFocusIndex: 0,
    benefits: [
      ["people", "Clear rights", "Define ownership rights, approvals and governance expectations in a practical way."],
      ["chart", "Decision discipline", "Create predictable routes for actions that affect control, capital or strategic direction."],
      ["shield", "Dispute prevention", "Reduce the risk of latent conflict by documenting rights early."],
      ["document", "Documentation quality", "Turn informal understandings into a stronger legal and governance record."],
      ["building", "Governance confidence", "Increase trust among owners, board members and management."],
      ["globe", "Cross-structure adaptability", "Support family, founder, investor and international ownership models."]
    ],
    services: [
      ["people", "Shareholder rights review", "Assess rights, restrictions and governance levers in current arrangements."],
      ["document", "Shareholder agreements", "Draft or review rights, vetoes and protections for key decisions."],
      ["building", "Governance and approval framework", "Map board and shareholder decision paths for material actions."],
      ["shield", "Dispute prevention", "Address areas of ambiguity before they become conflict points."],
      ["calendar", "Transaction support", "Align shareholder preparation with M&A or investment processes."],
      ["gear", "Board and investor coordination", "Support structured communication across governance stakeholders."]
    ],
    structurePoints: [
      ["target", "Ownership map", "Understand who controls the company, what shares or rights exist and what rights are triggered."],
      ["chart", "Governance architecture", "Map board approvals, shareholder approvals and reserved matters."],
      ["shield", "Dispute risks", "Identify ambiguous or inconsistent arrangements that can affect commercial stability."],
      ["calendar", "Action plan", "Translate concerns into governance and documentation improvements."]
    ],
    comparison: [
      ["Issue", "Shareholder rights", "Reserved matters", "Dispute pathway", "Decision framework"],
      ["Key concern", "Rights and protections", "Critical approvals and control points", "Loss of trust or deadlock", "Board and shareholder coordination"],
      ["Typical response", "Document rights and mechanisms", "Set approval thresholds and processes", "Use early mediation and governance rules", "Align governance architecture to decisions"],
      ["Priority", "Avoid ambiguity and confusion", "Control major corporate actions", "Reduce friction and conflict", "Improve execution and accountability"]
    ],
    process: [
      ["Initial review", "Map the structure, rights and key stakeholders."],
      ["Assessment of governance gaps", "Identify decisions or rights that are unclear or inconsistent."],
      ["Documentation and alignment", "Update shareholder arrangements, board processes and approvals."],
      ["Risk and dispute planning", "Prepare governance mechanisms to reduce conflict or deadlock."],
      ["Implementation", "Put the agreed framework into operation with clear record-keeping."]
    ],
    documents: [
      "Shareholder agreements and investor rights documents",
      "Certificate of incorporation and constitutional documents",
      "Board and shareholder resolutions",
      "Cap table and ownership records",
      "Voting and reserved matters policies",
      "Governance or deadlock resolution provisions"
    ],
    requirements: [
      ["search", "Ownership structure", "Current shareholding, rights and governance relationships."],
      ["people", "Stakeholders", "Founders, major investors, family members and management."],
      ["file", "Governance records", "Shareholder agreements, board records and approvals."],
      ["shield", "Known concerns", "Any dispute, deadlock risk or unclear process that affects decision-making."]
    ],
    faqs: [
      ["Why do shareholder issues escalate?", "Many disputes arise where rights and approval processes are unclear, informal or inconsistent with business realities."],
      ["How can governance reduce shareholder conflict?", "By defining reserved matters, decision thresholds and escalation pathways at the outset, rather than leaving issues to be resolved reactively."],
      ["Does shareholder advisory help with transactions too?", "Yes. Investor or founder structures often need careful review before a deal, financing round or governance change."]
    ]
  },
  {
    ...common,
    slug: "board-committee-processes",
    title: "Board & Committee Processes",
    shortTitle: "Board Governance",
    heroStatement: "Stronger governance. Better decisions.",
    description: "We support directors, executives and company secretaries with board and committee governance frameworks, process design and oversight mechanisms tuned to business needs.",
    introduction: "Board and committee effectiveness is not only about formalities. It depends on how decisions are prepared, documented, escalated and overseen. Clear processes improve accountability and reduce the risk of governance drift.",
    basicPrice: "₹29,999/-",
    comprehensivePrice: "₹79,999/-",
    categoryTitle: "Corporate Governance",
    categoryHref: "/services/corporate-commercial-advisory/corporate-governance",
    heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · BOARD GOVERNANCE",
    servicesHeading: "Board and committee frameworks built for effective oversight",
    servicesDescription: "Improve governance design, process discipline and decision quality across the boardroom.",
    benefitsHeading: "Why board and committee processes matter",
    requirementsEyebrow: "GOVERNANCE REVIEW",
    requirementsHeading: "Information usually required",
    basicPackageEyebrow: "CORE ADVISORY",
    basicPackageName: "Board Process Review",
    comprehensivePackageEyebrow: "FULL SUPPORT",
    comprehensivePackageName: "Board & Committee Governance Design",
    pricingEyebrow: "OUR PROFESSIONAL FEES (INDICATIVE)",
    pricingHeading: "Pricing aligned to governance complexity",
    pricingDescription: "The advisory scope depends on the governance model, number of committees, compliance obligations and strategic pace of the organisation.",
    documentsDescription: "We typically review board calendars, committee charters, resolutions and governance documentation relevant to oversight and decision-making.",
    faqDescription: "Common governance and board process questions.",
    comparisonHeading: "Board and committee focus areas",
    comparisonDescription: "Governance design often needs review across the following areas.",
    comparisonHeaders: ["Board", "Audit", "Risk", "Nomination & Remuneration"],
    comparisonFocusIndex: 0,
    benefits: [
      ["building", "Better governance rhythm", "Turn board and committee work into a consistent, disciplined process."],
      ["people", "Clear decision ownership", "Give directors, management and committee members a clear understanding of roles and approvals."],
      ["shield", "Risk reduction", "Reduce the chance of approval gaps, overlooked issues or weak escalation practices."],
      ["chart", "More informed oversight", "Support board-level challenge and evidence-based strategic decisions."],
      ["document", "Documentation discipline", "Build a cleaner record of action, deliberation and accountability."],
      ["globe", "Scalable culture", "Apply a governance structure that can grow with the business and investor base."]
    ],
    services: [
      ["building", "Board process design", "Create a clearer and more disciplined board calendar, meetings and approvals framework."],
      ["people", "Committee charters", "Review or design the mandate and role of committees."],
      ["document", "Governance documentation", "Draft agendas, resolutions, minutes and policy frameworks."],
      ["shield", "Oversight review", "Assess whether current board processes meet legal and commercial expectations."],
      ["calendar", "Compliance and reporting support", "Support decision logs, committee reporting and governance records."],
      ["gear", "Governance improvement plan", "Recommend practical steps to improve board effectiveness over time."]
    ],
    structurePoints: [
      ["target", "Board purpose", "Clarify the board's role in strategy, risk, compliance and oversight."],
      ["chart", "Committee design", "Assign responsibilities based on business complexity, risk profile and governance needs."],
      ["shield", "Decision process", "Ensure agenda, papers, approvals and minutes support accountability and evidence."],
      ["calendar", "Continuous improvement", "Review governance systems as the organisation evolves."]
    ],
    comparison: [
      ["Area", "Board", "Audit committee", "Risk committee", "Nomination & remuneration committee"],
      ["Main role", "Set direction and oversee performance", "Review financial reporting and control", "Review enterprise risks and oversight", "Review leadership quality and incentive frameworks"],
      ["Typical output", "Board resolutions and strategic decisions", "Audit findings and control actions", "Risk reports and mitigation updates", "Appointments, evaluation and compensation recommendations"],
      ["Priority", "Decision quality and accountability", "Financial integrity and governance discipline", "Risk oversight and strategic challenge", "Leadership and culture alignment"]
    ],
    process: [
      ["Governance review", "Assess existing board and committee structures and processes."],
      ["Mandate design", "Define committee roles, meeting cadence and approval pathways."],
      ["Documentation", "Prepare charters, agendas, minutes and board materials."],
      ["Implementation", "Roll out the governance framework with training and clear reporting flows."],
      ["Review and refinement", "Adjust the framework based on business maturity and risk profile."]
    ],
    documents: [
      "Board calendar and meeting structure",
      "Committee charters and mandates",
      "Board and committee resolutions",
      "Minutes and action trackers",
      "Governance policies and delegated authority framework",
      "Risk, compliance and strategic review packs"
    ],
    requirements: [
      ["search", "Current governance structure", "Board composition, committee arrangements and reporting lines."],
      ["people", "Stakeholders", "Directors, management, company secretary and key decision-makers."],
      ["file", "Governance record set", "Resolutions, charters, meeting calendars and committee reports."],
      ["shield", "Known issues", "Any weak point in board oversight, delegation or recordkeeping."]
    ],
    faqs: [
      ["What is the difference between board governance and corporate governance?", "Board governance is the practical machinery of board and committee decision-making, while corporate governance is the broader system for accountability, oversight and value creation."],
      ["Why do companies need committee charters?", "They clarify mandate, composition, reporting lines and meeting rhythm so oversight remains structured and consistent."],
      ["Can governance frameworks be improved without overcomplicating management?", "Yes. The best governance process is practical, proportionate and aligned to the organisation's size, strategy and risk profile."]
    ]
  }
];

export const transactionGovernancePages = servicePages;
