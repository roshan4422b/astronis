export type LegalAdvisoryInsight = {
  slug: string;
  title: string;
  focus: string;
  icon: string;
};

export const legalAdvisoryInsights = [
  {
    slug: "commercial-litigation-india-strategy",
    title: "Commercial Litigation in India: Strategy from Pre-Litigation Notice to Enforcement",
    focus: "Commercial disputes",
    icon: "scale",
  },
  {
    slug: "arbitration-india-clause-seat-enforcement",
    title: "Arbitration in India: Drafting the Clause, Choosing the Seat and Enforcing the Award",
    focus: "Arbitration",
    icon: "scale",
  },
  {
    slug: "msme-payment-disputes-msefc",
    title: "MSME Payment Disputes: MSEFC Jurisdiction, Interest and Arbitration Explained",
    focus: "MSMED Act",
    icon: "file",
  },
  {
    slug: "section-138-ni-act-cheque-bounce-defences",
    title: "Section 138 NI Act: Legally Enforceable Debt, Presumptions and Defence in Cheque-Bounce Cases",
    focus: "NI Act",
    icon: "scale",
  },
  {
    slug: "cheque-bounce-proceedings-civil-recovery",
    title: "Cheque-Bounce Proceedings and Civil Recovery: Can Both Remedies Continue Together?",
    focus: "NI + civil",
    icon: "file",
  },
  {
    slug: "guarantor-liability-loan-transactions",
    title: "Guarantor Liability in Loan Transactions: Civil Recovery, Security Enforcement and NI Act Exposure",
    focus: "Banking/guarantees",
    icon: "bank",
  },
  {
    slug: "ibc-vs-recovery-proceedings-corporate-debt",
    title: "IBC vs Recovery Proceedings: Choosing the Correct Remedy for Corporate Debt",
    focus: "IBC/recovery",
    icon: "shield",
  },
  {
    slug: "homebuyers-under-ibc-rights-recovery-risks",
    title: "Homebuyers under IBC: Financial Creditor Rights, Resolution Plans and Recovery Risks",
    focus: "IBC/real estate",
    icon: "building",
  },
  {
    slug: "personal-guarantors-under-ibc",
    title: "Personal Guarantors under IBC: Liability, Insolvency Process and Emerging Jurisprudence",
    focus: "IBC",
    icon: "shield",
  },
  {
    slug: "corporate-insolvency-due-diligence-ibc",
    title: "Corporate Insolvency Due Diligence: Warning Signs Before Filing or Defending an IBC Case",
    focus: "IBC",
    icon: "search",
  },
  {
    slug: "drt-sarfaesi-proceedings-borrower-defences",
    title: "DRT & SARFAESI Proceedings: Enforcement Rights of Banks and Defences Available to Borrowers",
    focus: "Banking litigation",
    icon: "bank",
  },
  {
    slug: "commercial-contracts-clauses-litigation",
    title: "Commercial Contracts in India: Ten Clauses That Most Often Create Litigation",
    focus: "Contract law",
    icon: "file",
  },
  {
    slug: "termination-clauses-commercial-agreements",
    title: "Termination Clauses in Commercial Agreements: Exit Rights, Cure Periods and Damages",
    focus: "Contracts",
    icon: "file",
  },
  {
    slug: "shareholder-disputes-oppression-mismanagement",
    title: "Shareholder Disputes: Oppression, Mismanagement and Remedies before NCLT",
    focus: "Companies Act",
    icon: "people",
  },
  {
    slug: "director-liability-corporate-obligations",
    title: "Director Liability: When Can Directors Be Personally Liable for Corporate Obligations?",
    focus: "Company litigation",
    icon: "building",
  },
  {
    slug: "corporate-fraud-forensic-investigations",
    title: "Corporate Fraud and Forensic Investigations: Legal Response, Evidence and Management Liability",
    focus: "Fraud/forensics",
    icon: "search",
  },
  {
    slug: "pmla-exposure-commercial-transactions",
    title: "PMLA Exposure in Commercial Transactions: Attachment, Proceeds of Crime and Corporate Risk",
    focus: "PMLA",
    icon: "shield",
  },
  {
    slug: "rera-disputes-homebuyers-developers-investors",
    title: "RERA Disputes: Remedies Available to Homebuyers, Developers and Investors",
    focus: "Real estate",
    icon: "building",
  },
  {
    slug: "interim-relief-commercial-disputes",
    title: "Interim Relief in Commercial Disputes: Injunctions, Asset Protection and Emergency Strategy",
    focus: "CPC/arbitration",
    icon: "scale",
  },
  {
    slug: "enforcement-judgments-arbitral-awards-india",
    title: "Enforcement of Judgments and Arbitral Awards in India: From Decree to Recovery",
    focus: "Execution/enforcement",
    icon: "file",
  },
] as const satisfies readonly LegalAdvisoryInsight[];

export function splitLegalAdvisoryHeadline(title: string) {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return { lead: title, continuation: "" };
  return {
    lead: title.slice(0, colonIndex + 1),
    continuation: title.slice(colonIndex + 1).trimStart(),
  };
}