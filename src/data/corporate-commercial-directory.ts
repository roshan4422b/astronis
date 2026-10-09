export type DirectoryChild = {
  name: string;
  slug: string;
  description: string;
  url: string;
};

export type CorporateServiceCategory = {
  category: string;
  categorySlug: string;
  categoryNumber: string;
  categoryDescription: string;
  icon: string;
  children: DirectoryChild[];
};

const makeUrl = (categorySlug: string, childSlug: string) =>
  `/services/corporate-commercial-advisory/${categorySlug}/${childSlug}`;

export const corporateCommercialDirectory: CorporateServiceCategory[] = [
  {
    category: "Entity Formation",
    categorySlug: "entity-formation",
    categoryNumber: "01",
    categoryDescription:
      "Build the right legal and operational foundation for your business.",
    icon: "building",
    children: [
      {
        name: "Private Limited Company Incorporation",
        slug: "private-limited",
        description:
          "Establish a private limited company with the right ownership, documentation and regulatory foundation.",
        url: makeUrl("entity-formation", "private-limited"),
      },
      {
        name: "One Person Company (OPC)",
        slug: "opc",
        description:
          "Set up a single-owner structure with the right governance, filings and operational clarity.",
        url: makeUrl("entity-formation", "opc"),
      },
      {
        name: "Public Limited Company",
        slug: "public-limited-company",
        description:
          "Create a scalable public entity with the governance, shareholding and compliance framework to support growth.",
        url: makeUrl("entity-formation", "public-limited-company"),
      },
      {
        name: "Section 8 Company",
        slug: "section-8-company",
        description:
          "Establish a not-for-profit structure aligned with charitable, social or mission-driven objectives.",
        url: makeUrl("entity-formation", "section-8-company"),
      },
      {
        name: "LLP Formation",
        slug: "llp-formation",
        description:
          "Shape a flexible LLP structure suited to professional or venture-driven business models.",
        url: makeUrl("entity-formation", "llp-formation"),
      },
      {
        name: "Partnership Firm",
        slug: "partnership-firm",
        description:
          "Design a partnership structure that matches ownership, risk-sharing and commercial realities.",
        url: makeUrl("entity-formation", "partnership-firm"),
      },
      {
        name: "Proprietorship",
        slug: "proprietorship",
        description:
          "Set up a sole-owned business with a practical foundation for compliance and day-to-day operations.",
        url: makeUrl("entity-formation", "proprietorship"),
      },
      {
        name: "Wholly Owned Subsidiary",
        slug: "wholly-owned-subsidiary",
        description:
          "Create a subsidiary structure with the right governance, ownership and control framework for a parent company.",
        url: makeUrl("entity-formation", "wholly-owned-subsidiary"),
      },
      {
        name: "Foreign Company Setup",
        slug: "foreign-company-setup",
        description:
          "Assess the best route to establish a foreign company presence and align operational requirements with local laws.",
        url: makeUrl("entity-formation", "foreign-company-setup"),
      },
      {
        name: "Branch Office",
        slug: "branch-office",
        description:
          "Open a branch office for activities that require a more direct local operating presence.",
        url: makeUrl("entity-formation", "branch-office"),
      },
      {
        name: "Liaison Office",
        slug: "liaison-office",
        description:
          "Establish a liaison office to support market research, coordination and representative activities.",
        url: makeUrl("entity-formation", "liaison-office"),
      },
      {
        name: "Project Office",
        slug: "project-office",
        description:
          "Create a project-specific office to support temporary or defined business operations in India.",
        url: makeUrl("entity-formation", "project-office"),
      },
    ],
  },
  {
    category: "Entity Structuring & Group Reorganisation",
    categorySlug: "entity-structuring-group-reorganisation",
    categoryNumber: "02",
    categoryDescription:
      "Design ownership and group structures around your business objectives.",
    icon: "network",
    children: [
      {
        name: "Business Entity Structuring",
        slug: "entity-structuring",
        description:
          "Design and implement a tax-efficient entity structure aligned with commercial goals, regulatory requirements and growth plans.",
        url: makeUrl("entity-structuring-group-reorganisation", "entity-structuring"),
      },
      {
        name: "Group Structuring",
        slug: "group-structuring",
        description:
          "Align operating entities, shareholdings and governance with a clear group architecture.",
        url: makeUrl("entity-structuring-group-reorganisation", "group-structuring"),
      },
      {
        name: "Holding & Subsidiary Structures",
        slug: "holding-subsidiary-structures",
        description:
          "Review holding-company and subsidiary arrangements to support control, governance and operational clarity.",
        url: makeUrl("entity-structuring-group-reorganisation", "holding-subsidiary-structures"),
      },
      {
        name: "Shareholding Structuring",
        slug: "shareholding-structuring",
        description:
          "Shape equity arrangements around investment priorities, control and long-term decision-making.",
        url: makeUrl("entity-structuring-group-reorganisation", "shareholding-structuring"),
      },
      {
        name: "Capital Structuring",
        slug: "capital-structuring",
        description:
          "Balance debt, equity and investor arrangements against the company’s growth and risk profile.",
        url: makeUrl("entity-structuring-group-reorganisation", "capital-structuring"),
      },
      {
        name: "Business Reorganisation",
        slug: "business-reorganisation",
        description:
          "Reallocate business activities, teams and entities to improve efficiency and strategic focus.",
        url: makeUrl("entity-structuring-group-reorganisation", "business-reorganisation"),
      },
      {
        name: "Corporate Conversion",
        slug: "corporate-conversion",
        description:
          "Convert between entity types to suit a new strategy, investor profile or operating model.",
        url: makeUrl("entity-structuring-group-reorganisation", "corporate-conversion"),
      },
      {
        name: "Succession & Family Business Structuring",
        slug: "succession-family-business-structuring",
        description:
          "Design a structure that supports continuity, ownership transition and long-term family business objectives.",
        url: makeUrl("entity-structuring-group-reorganisation", "succession-family-business-structuring"),
      },
    ],
  },
  {
    category: "Mergers, Acquisitions & Transactions",
    categorySlug: "mergers-acquisitions-transactions",
    categoryNumber: "03",
    categoryDescription:
      "Execute strategic deals with the right documentation, diligence and closing support.",
    icon: "handshake",
    children: [
      {
        name: "Mergers & Acquisitions",
        slug: "mergers-acquisitions",
        description:
          "Navigate buy-and-sell transactions with clear diligence, structuring and commercial alignment.",
        url: "/services/corporate-commercial-advisory/mergers-acquisitions",
      },
      {
        name: "Buy or Sell of Companies",
        slug: "buy-or-sell-of-companies",
        description:
          "Support strategic acquisitions and divestitures with clear diligence, valuation, negotiation and transaction execution.",
        url: "/services/corporate-commercial-advisory/buy-or-sell-of-companies",
      },
      {
        name: "Transaction Structuring",
        slug: "transaction-structuring",
        description:
          "Shape the deal architecture to match tax, commercial and control objectives before execution.",
        url: "/services/corporate-commercial-advisory/transaction-structuring",
      },
      {
        name: "Legal Due Diligence",
        slug: "legal-due-diligence",
        description:
          "Review legal exposure, liabilities and documentation issues to inform deal decisions and negotiation.",
        url: "/services/corporate-commercial-advisory/legal-due-diligence",
      },
      {
        name: "Corporate Due Diligence",
        slug: "corporate-due-diligence",
        description:
          "Assess governance, ownership, compliance and commercial continuity factors in a transaction context.",
        url: "/services/corporate-commercial-advisory/corporate-due-diligence",
      },
      {
        name: "Transaction Documentation",
        slug: "transaction-documentation",
        description:
          "Draft and coordinate transaction documents that reflect the agreed business and legal position.",
        url: makeUrl("mergers-acquisitions-transactions", "transaction-documentation"),
      },
      {
        name: "Private Equity Transactions",
        slug: "private-equity-transactions",
        description:
          "Support investment, growth and exit transactions with investor-focused legal and commercial structuring.",
        url: "/services/corporate-commercial-advisory/private-equity-transactions",
      },
      {
        name: "Investment Transactions",
        slug: "investment-transactions",
        description:
          "Review capital raising, equity investment and strategic investment arrangements around commercial priorities.",
        url: "/services/corporate-commercial-advisory/investment-transactions",
      },
      {
        name: "Closing & Post-Closing Support",
        slug: "closing-post-closing-support",
        description:
          "Coordinate closing actions and post-closing steps to ensure a smooth transition and operational continuity.",
        url: makeUrl("mergers-acquisitions-transactions", "closing-post-closing-support"),
      },
    ],
  },
  {
    category: "Corporate Governance",
    categorySlug: "corporate-governance",
    categoryNumber: "04",
    categoryDescription:
      "Establish governance structures that support accountability and long-term decision-making.",
    icon: "shield",
    children: [
      {
        name: "Board Advisory",
        slug: "board-advisory",
        description:
          "Support directors and leadership teams in navigating board decisions, obligations and strategic oversight.",
        url: makeUrl("corporate-governance", "board-advisory"),
      },
      {
        name: "Governance Framework & Corporate Policies",
        slug: "governance-framework-corporate-policies",
        description:
          "Build a practical governance structure and develop policies that clarify authority, responsibilities, compliance and operational discipline.",
        url: "/services/corporate-commercial-advisory/governance-framework-corporate-policies",
      },
      {
        name: "Shareholder Matters",
        slug: "shareholder-matters",
        description:
          "Address shareholder rights, resolutions, approvals and governance questions in a commercially workable way.",
        url: "/services/corporate-commercial-advisory/shareholder-matters",
      },
      {
        name: "Board & Committee Processes",
        slug: "board-committee-processes",
        description:
          "Strengthen board, committee and decision-making processes through clearer governance mechanics.",
        url: "/services/corporate-commercial-advisory/board-committee-processes",
      },
      {
        name: "Governance Due Diligence & Review",
        slug: "governance-due-diligence-review",
        description:
          "Review governance records, processes and controls, and assess current practices to identify structural or compliance risks early.",
        url: "/services/corporate-commercial-advisory/governance-due-diligence-review",
      },
    ],
  },
  {
    category: "Commercial Contracts",
    categorySlug: "commercial-contracts",
    categoryNumber: "05",
    categoryDescription:
      "Turn commercial intent into workable, balanced and enforceable agreements.",
    icon: "document",
    children: [
      {
        name: "Contract Drafting, Review & Negotiations",
        slug: "contract-drafting-review-negotiations",
        description:
          "Draft, review and negotiate commercially focused agreements that capture the intended rights, obligations and risk allocation.",
        url: "/services/corporate-commercial-advisory/contract-drafting-review-negotiations",
      },
      {
        name: "Shareholders' Agreements",
        slug: "shareholders-agreements",
        description:
          "Draft shareholder arrangements that reflect rights, decision-making, exit and governance priorities.",
        url: "/services/corporate-commercial-advisory/shareholders-agreements",
      },
      {
        name: "Share Subscription Agreements",
        slug: "share-subscription-agreements",
        description:
          "Structure investment documentation that aligns rights, obligations and transaction timing.",
        url: "/services/corporate-commercial-advisory/share-subscription-agreements",
      },
      {
        name: "Joint Venture Agreements",
        slug: "joint-venture-agreements",
        description:
          "Shape venture arrangements around value, governance, risk allocation and operational decision-making.",
        url: "/services/corporate-commercial-advisory/joint-venture-agreements",
      },
      {
        name: "Investment Agreements",
        slug: "investment-agreements",
        description:
          "Prepare investment terms that balance investor expectations with the company’s growth and control needs.",
        url: "/services/corporate-commercial-advisory/investment-agreements",
      },
      {
        name: "Vendor / Supply Agreements",
        slug: "vendor-supply-agreements",
        description:
          "Draft supply and vendor arrangements that define performance, risk and operating accountability.",
        url: "/services/corporate-commercial-advisory/vendor-supply-agreements",
      },
      {
        name: "Distribution Agreements",
        slug: "distribution-agreements",
        description:
          "Set out the rights and obligations that support efficient distribution channels and sales execution.",
        url: "/services/corporate-commercial-advisory/distribution-agreements",
      },
      {
        name: "Franchise Agreements",
        slug: "franchise-agreements",
        description:
          "Support franchise structures with clear operational, commercial and compliance obligations.",
        url: "/services/corporate-commercial-advisory/franchise-agreements",
      },
      {
        name: "NDAs",
        slug: "ndas",
        description:
          "Protect confidential information and commercial interests through practical non-disclosure arrangements.",
        url: "/services/corporate-commercial-advisory/ndas",
      },
      {
        name: "Employment / Consultancy Agreements",
        slug: "employment-consultancy-agreements",
        description:
          "Define roles, obligations and protections for talent, consultants and key commercial relationships.",
        url: "/services/corporate-commercial-advisory/employment-consultancy-agreements",
      },
      {
        name: "Contract Management",
        slug: "contract-management",
        description:
          "Structure a practical contract-management cycle to support ongoing compliance and performance monitoring.",
        url: "/services/corporate-commercial-advisory/contract-management",
      },
    ],
  },
  {
    category: "Corporate Restructuring",
    categorySlug: "corporate-restructuring",
    categoryNumber: "06",
    categoryDescription:
      "Reorganise with clarity, continuity and a practical route for change.",
    icon: "chart",
    children: [
      {
        name: "Merger",
        slug: "merger",
        description:
          "Combine entities in a way that preserves value, aligns obligations and supports a clean transition.",
        url: makeUrl("corporate-restructuring", "merger"),
      },
      {
        name: "Demerger",
        slug: "demerger",
        description:
          "Separate business lines or entities to sharpen focus, improve governance and manage operational complexity.",
        url: makeUrl("corporate-restructuring", "demerger"),
      },
      {
        name: "Amalgamation",
        slug: "amalgamation",
        description:
          "Merge entities into a single structure with a clear legal and commercial implementation plan.",
        url: makeUrl("corporate-restructuring", "amalgamation"),
      },
      {
        name: "Capital Restructuring",
        slug: "capital-restructuring",
        description:
          "Rebalance capital structures to support investment, liquidity and long-term business strategy.",
        url: makeUrl("corporate-restructuring", "capital-restructuring"),
      },
      {
        name: "Business Transfer",
        slug: "business-transfer",
        description:
          "Transfer business units or assets while managing legal, operational and stakeholder continuity.",
        url: makeUrl("corporate-restructuring", "business-transfer"),
      },
      {
        name: "Slump Sale",
        slug: "slump-sale",
        description:
          "Assess and execute a business transfer involving a defined set of assets, liabilities and operations.",
        url: "/services/corporate-commercial-advisory/slump-sale",
      },
      {
        name: "Internal Reorganisation",
        slug: "internal-reorganisation",
        description:
          "Align internal entity structures with operating priorities, ownership and strategic execution needs.",
        url: makeUrl("corporate-restructuring", "internal-reorganisation"),
      },
      {
        name: "Conversion",
        slug: "conversion",
        description:
          "Convert an entity form as part of a broader restructuring or strategic business plan.",
        url: makeUrl("corporate-restructuring", "conversion"),
      },
      {
        name: "Corporate Closure / Exit",
        slug: "corporate-closure-exit",
        description:
          "Plan an orderly exit or closure process with clear legal, regulatory and stakeholder coordination.",
        url: "/services/corporate-commercial-advisory/corporate-exit-plan",
      },
    ],
  },
];
