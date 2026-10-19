import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { transactionGovernancePages } from "@/data/transaction-governance-pages";

const investmentTransactions = transactionGovernancePages.find(
  (page) => page.slug === "investment-transactions",
);

const data: EntityFormationPageData | undefined = investmentTransactions
  ? {
      ...investmentTransactions,
      slug: "investment-structuring",
      title: "Investment Structuring",
      shortTitle: "Investment Structuring",
      image: "/images/services/hero.webp",
      imageAlt:
        "Business leaders reviewing investment and capital structure options",
      heroStatement:
        "Designing capital structures. Protecting stakeholder interests. Enabling sustainable investments.",
      description:
        "Astronis Global provides integrated investment structuring advisory to help businesses, investors and founders design legally appropriate, commercially effective and regulatory-compliant investment arrangements for long-term growth.",
      introduction:
        "We assist startups, MSMEs, private companies and investors in evaluating and structuring investment transactions, including equity, debt, convertible instruments, joint ventures and strategic investments, with a focus on compliance, governance, risk management and long-term value creation.",
      categoryTitle: "Investment & Transaction Advisory",
      categoryHref:
        "/services/business-advisory-contracts#investment-and-transaction-advisory",
      heroEyebrow:
        "CORPORATE & COMMERCIAL ADVISORY · INVESTMENT & TRANSACTION ADVISORY",
      heroNoteEyebrow: "INVESTMENT STRUCTURING",
      heroNoteTitle: "Capital clarity. Aligned interests.",
      heroNoteDescription:
        "Connect funding choices with ownership, investor protections, governance and future plans.",
      introHeading:
        "Creating an Appropriate Legal & Commercial Framework for Capital Investment",
      introPanelEyebrow: "STRUCTURE WITH PURPOSE",
      introPanelHeading: "Practical structures. Sustainable growth.",
      introPanelDescription:
        "Align capital, control and investor rights with the company's commercial objectives and future funding needs.",
      servicesHeading: "Our Investment Structuring Services",
      servicesDescription:
        "Plan investment instruments, ownership, governance and execution in the context of the business and its stakeholders.",
      benefitCardsStacked: true,
      benefitsHeading: "When Is Investment Structuring Required?",
      benefits: [
        ["chart", "Raising equity or debt capital", "Assess funding routes against business needs, investor expectations and capital plans."],
        ["shield", "Issuing preference or convertible securities", "Consider instrument terms, conversion mechanics, rights and applicable requirements."],
        ["people", "Negotiating investor rights and governance", "Align decision-making, information and protective rights with the intended relationship."],
        ["network", "Planning a joint venture or strategic investment", "Set out ownership, contributions, governance and commercial collaboration."],
        ["globe", "Evaluating foreign investment into India", "Consider the relevant foreign investment route, sector conditions and reporting obligations."],
        ["building", "Considering an acquisition or asset purchase", "Shape the investment and transaction framework around assets, ownership and execution."],
        ["document", "Addressing dilution and ownership concerns", "Model ownership outcomes and consider how future funding may affect stakeholders."],
        ["target", "Structuring for future funding or exit", "Keep growth, follow-on capital and possible exit routes in view when designing the arrangement."],
      ],
      services: [
        ["chart", "Investment Instrument Advisory", "Assess equity, debt, preference shares, convertible instruments and other suitable funding routes."],
        ["people", "Ownership & Capitalisation Planning", "Review shareholding, dilution, capital allocation and potential funding scenarios."],
        ["shield", "Founder & Investor Rights Structuring", "Coordinate investor protections, founder rights, information rights and reserved matters."],
        ["building", "Corporate Transaction Structuring", "Consider the legal and commercial structure for investments, acquisitions and strategic transactions."],
        ["globe", "Cross-Border Investment Advisory", "Review cross-border investment structures and applicable foreign exchange considerations."],
        ["document", "Investment Documentation", "Coordinate term sheets, investment agreements, shareholder arrangements and supporting documents."],
        ["calendar", "Regulatory & Closing Support", "Track approvals, filings, conditions and closing steps relevant to the agreed structure."],
        ["target", "Exit & Restructuring Planning", "Consider future funding, restructuring, liquidity and exit pathways as part of the structuring discussion."],
      ],
      structureHeading: "Key Investment Structuring Areas",
      structurePoints: [
        ["chart", "Equity, debt and hybrid instruments", "Compare funding instruments and terms with capital requirements, investor expectations and business flexibility."],
        ["people", "Shareholding, valuation and dilution", "Understand ownership outcomes, valuation assumptions and the effects of current and future funding."],
        ["shield", "Investor rights and governance", "Set an appropriate framework for approvals, information, board participation and protective provisions."],
        ["globe", "FDI, FEMA and cross-border structures", "Assess applicable investment routes, eligibility conditions, approvals and reporting considerations."],
        ["document", "Regulatory approvals and compliance", "Identify relevant company, securities, foreign investment and sector-specific requirements."],
        ["calendar", "Transaction documentation and closing", "Coordinate the documents, approvals, conditions and implementation steps for the proposed transaction."],
        ["target", "Exit strategy and future funding", "Consider follow-on investment, liquidity, restructuring and exit objectives while planning the structure."],
      ],
      comparisonHeading: "Comparing Common Investment Structures",
      comparisonDescription:
        "A high-level guide to common capital routes. Suitability, rights, tax treatment and regulatory requirements depend on the transaction and applicable law.",
      comparisonHeaders: [
        "Equity",
        "Debt",
        "Convertible",
        "Joint Venture",
        "Strategic Investment",
      ],
      comparison: [
        ["Capital provider position", "Shareholder with ownership rights", "Creditor under agreed repayment terms", "Debt or investment that may convert into equity", "Co-owner in a shared business or venture", "Investor with financial and/or commercial interests"],
        ["Core structuring focus", "Valuation, share class, ownership and governance", "Amount, interest, tenure, security and covenants", "Conversion trigger, price, timing and investor rights", "Contributions, control, governance and commercial scope", "Investment rights and strategic collaboration terms"],
        ["Ownership effect", "Immediate shareholding and dilution", "No immediate equity dilution unless separately agreed", "Potential dilution at conversion", "Shared ownership as structured", "Depends on instrument and transaction design"],
        ["Key considerations", "Shareholder rights and future capital needs", "Repayment capacity and security arrangements", "Conversion mechanics and future valuation", "Decision-making, deadlock and exit arrangements", "Commercial alignment, conflicts and information rights"],
        ["Potential fit", "Long-term growth capital", "Defined financing requirements", "Early-stage or bridging investment needs", "Collaborative business opportunities", "Capital combined with strategic support"],
      ],
      comparisonFocusIndex: null,
      processEyebrow: "OUR INVESTMENT STRUCTURING PROCESS",
      processHeading: "A Clear Path from Assessment to Post-Investment Support",
      processDescription:
        "A coordinated process to connect the investment objective with commercial terms, documentation and implementation.",
      process: [
        ["Initial Consultation", "Understand the capital objective, business context, participants and intended timeline."],
        ["Transaction Assessment", "Review funding needs, investor profile, ownership and relevant commercial considerations."],
        ["Structure Design", "Compare instruments, ownership outcomes, rights and governance arrangements."],
        ["Documentation & Negotiation", "Coordinate transaction documents and support the review of commercial and legal terms."],
        ["Regulatory & Closing Support", "Track applicable approvals, conditions, filings and completion actions."],
        ["Post-Investment Advisory", "Support governance, reporting, future funding and agreed post-close actions."],
      ],
      processNumbers: true,
      documentsHeading: "Documents Generally Required",
      documentsDescription:
        "The information required depends on the instrument, company structure, investor profile and transaction stage.",
      documents: [
        "Corporate records, constitutional documents and financial statements",
        "Current shareholding, capitalisation table and ownership history",
        "Business plan, funding objectives and financial projections",
        "Investor proposal, term sheet or draft investment documents",
        "Board and shareholder approvals relevant to the transaction",
        "Material contracts, licences and existing financing arrangements",
        "Investor and beneficial ownership information, where applicable",
        "Regulatory filings, approvals and compliance records relevant to the investment",
      ],
      requirementsEyebrow: "INVESTMENT READINESS",
      requirementsHeading: "Information to define the structure",
      requirements: [
        ["target", "Capital objective", "The amount, purpose, form and expected timing of the proposed investment."],
        ["people", "Stakeholder profile", "Founders, management, current shareholders, prospective investors and strategic partners."],
        ["chart", "Ownership and valuation", "Current cap table, ownership expectations, valuation assumptions and dilution considerations."],
        ["file", "Business and transaction records", "Financials, corporate documents, commercial agreements and any existing investment terms."],
        ["shield", "Regulatory context", "Sector, cross-border elements, applicable approvals and known compliance considerations."],
      ],
      pricingEyebrow: "INVESTMENT STRUCTURING SUPPORT",
      pricingHeading: "Scope aligned to the investment",
      pricingDescription:
        "The level of support is tailored to the proposed instrument, transaction complexity, investor group and regulatory requirements.",
      basicPackageEyebrow: "STRUCTURE REVIEW",
      basicPackageName: "Investment Structure Assessment",
      basicFeatures: [
        "Initial capital and transaction assessment",
        "Review of proposed investment instruments",
        "Ownership, dilution and governance considerations",
        "Initial structure options and action points",
      ],
      comprehensivePackageEyebrow: "TRANSACTION SUPPORT",
      comprehensivePackageName: "Investment Structuring Support",
      comprehensiveFeatures: [
        "All Investment Structure Assessment services",
        "Detailed structure and rights framework",
        "Investment and shareholder documentation coordination",
        "Regulatory and closing workstream support",
        "Post-investment governance planning",
      ],
      priceNote: null,
      featureHeading: "Key Laws, Regulations & Considerations",
      featureItems: [
        "Companies Act, 2013",
        "FEMA, FDI & FPI Policy",
        "SEBI Regulations",
        "Income-tax Act, 1961",
        "GST laws",
        "Competition Act, 2002",
        "Insolvency and Bankruptcy Code, 2016",
        "Sector-specific regulations",
      ],
      resources: [
        ["GUIDE", "Investment Structuring Fundamentals", "document"],
        ["CHECKLIST", "Equity, Debt & Convertible Instruments", "file"],
        ["FRAMEWORK", "Shareholding & Dilution Planning", "chart"],
        ["TOOLKIT", "Investor Rights & Governance", "shield"],
      ],
      faqDescription:
        "Answers to common questions about investment instruments, ownership, investor rights and transaction execution.",
      faqs: [
        ["What is investment structuring?", "Investment structuring is the process of designing the capital instrument, ownership, rights, governance and transaction terms for an investment in the context of the business and its stakeholders."],
        ["What are the main investment instruments?", "Common routes include equity, debt, preference shares, convertible instruments, joint ventures and strategic investments. The appropriate option depends on the commercial objectives and applicable requirements."],
        ["How does dilution affect founders?", "Dilution changes a founder's ownership percentage when new shares or convertible instruments are issued. The actual effect depends on valuation, instrument terms, option pools and future funding."],
        ["Are convertible instruments permitted?", "Convertible instruments may be available subject to the issuer, investor, instrument terms and applicable company, securities and foreign investment rules. The proposed transaction should be reviewed before commitments are made."],
        ["What approvals may be required?", "Approvals depend on the company documents, instrument, investor profile, sector and transaction. Board, shareholder, regulatory or other approvals may apply."],
        ["Can an investment structure plan for future funding or exit?", "Yes. Follow-on funding, ownership changes, governance, liquidity and exit scenarios can be considered during initial structuring, while recognising that future outcomes cannot be guaranteed."],
        ["Does structuring advice guarantee investment or returns?", "No. Structuring support does not guarantee that an investor will invest, that a transaction will complete or that any return will be achieved."],
      ],
      customHeading: "Cross-Border & Complex Investment Structures",
      customDescription:
        "Discuss tailored support for foreign investment, multiple investor groups, hybrid instruments, joint ventures, restructuring and future funding scenarios.",
      finalHeading: "Structure Your Next Investment with Clarity",
      finalDescription:
        "Discuss your capital objectives, investor expectations and the transaction framework that supports your business plans.",
      finalAction: "Request an Investment Structuring Consultation",
      relatedPages: [
        ["Investor Coordination", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investor-coordination"],
        ["Commercial Due Diligence", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/commercial-due-diligence"],
        ["India Entry Strategy", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/india-entry-strategy"],
      ],
      showTestimonials: true,
      showInsights: true,
      showKnowledge: true,
      showReviewActions: false,
      showFeatures: true,
      benefitCards: true,
    }
  : undefined;

export default function InvestmentStructuringPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
