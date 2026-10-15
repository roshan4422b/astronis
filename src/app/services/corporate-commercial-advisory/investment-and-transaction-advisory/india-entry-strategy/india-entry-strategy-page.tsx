import { notFound } from "next/navigation";
import EntityFormationPage from "../../entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { allEntityFormationPages } from "@/data/entity-formation-pages";

const foreignCompanySetup = allEntityFormationPages.find(
  (page) => page.slug === "foreign-company-setup",
);

const data: EntityFormationPageData | undefined = foreignCompanySetup
  ? {
      ...foreignCompanySetup,
      slug: "india-entry-strategy",
      title: "India Entry Strategy",
      shortTitle: "India Entry Strategy",
      heroStatement:
        "Entering India with confidence. Structuring investments. Navigating regulatory complexity.",
      description:
        "Astronis Global provides end-to-end India entry strategy advisory to international businesses, investors and global companies, helping them establish a compliant, efficient and commercially successful presence in India.",
      introduction:
        "We assist international businesses in evaluating market-entry models, foreign investment eligibility, entity structures, licensing, taxation, commercial agreements and ongoing compliance to establish and expand their presence in India with clarity.",
      image: "/images/services/hero.webp",
      imageAlt:
        "International business professionals planning a market entry strategy",
      categoryTitle: "Investment & Transaction Advisory",
      categoryHref:
        "/services/business-advisory-contracts#investment-and-transaction-advisory",
      heroEyebrow:
        "CORPORATE & COMMERCIAL ADVISORY · INVESTMENT & TRANSACTION ADVISORY",
      heroNoteEyebrow: "INDIA MARKET ENTRY",
      heroNoteTitle: "Global perspective. Local execution.",
      heroNoteDescription:
        "Coordinate market assessment, structuring and regulatory work around your India growth plans.",
      introHeading:
        "Building the Right Legal, Regulatory & Commercial Foundation for India",
      benefitCardsStacked: true,
      servicesHeading: "Our India Entry Strategy Services",
      servicesDescription:
        "One coordinated view of market entry, establishment, approvals and the practical work required to operate in India.",
      benefitsHeading: "When is India Entry Advisory Required?",
      benefits: [
        ["building", "Establishing an Indian subsidiary or joint venture", "Assess the structure, ownership and governance needed for a lasting India presence."],
        ["shield", "Evaluating FDI eligibility and sectoral restrictions", "Review the proposed investment against applicable foreign investment rules and sector conditions."],
        ["people", "Appointing distributors, franchisees or partners", "Plan commercial relationships and supporting agreements for local market access."],
        ["globe", "Setting up a branch, liaison or project office", "Compare office structures against intended activities, approvals and operating plans."],
        ["chart", "Acquiring Indian businesses or assets", "Coordinate transaction, diligence and implementation considerations for an India acquisition."],
        ["document", "Entering through licensing or technology transfer", "Consider commercial terms, intellectual property and regulatory requirements."],
        ["percent", "Understanding regulatory and tax requirements", "Identify the compliance, tax registrations and reporting relevant to the proposed activities."],
        ["target", "Planning long-term expansion into India", "Align the initial entry model with future growth, governance and operational needs."],
      ],
      structureHeading: "A Coordinated Framework for India Market Entry",
      structurePoints: [
        ["target", "Market opportunity and entry strategy", "Assess market conditions, business objectives, customer access and the proposed operating model."],
        ["building", "Business structure and establishment", "Compare a subsidiary, joint venture, branch, project or liaison office against planned activities."],
        ["shield", "FDI, FEMA and regulatory context", "Identify applicable investment routes, sector restrictions, approvals and reporting requirements."],
        ["percent", "Licensing, taxation and compliance", "Map registrations, licences, tax considerations and continuing obligations to the proposed operations."],
        ["calendar", "Governance and post-entry growth", "Plan commercial agreements, internal responsibilities and ongoing compliance as the India business develops."],
      ],
      comparisonHeading: "Choosing an India Entry Structure",
      comparisonDescription:
        "A high-level view of common establishment routes. Permitted activities, approvals, ownership and tax treatment depend on the business, sector and current law.",
      comparisonHeaders: [
        "Branch Office",
        "Project Office",
        "Wholly Owned Subsidiary",
        "Joint Venture",
        "Liaison Office",
      ],
      comparisonFocusIndex: null,
      comparison: [
        ["Typical purpose", "Longer-term business presence", "A defined India project", "Independent India operations", "Business collaboration", "Liaison and permitted representative activities"],
        ["Legal form", "Extension of foreign company", "Extension of foreign company", "Separate Indian company", "Separate Indian entity or arrangement", "Extension of foreign company"],
        ["Ownership", "Foreign company", "Foreign company", "Foreign ownership subject to applicable FDI rules", "Shared as agreed and permitted", "Foreign company"],
        ["Activity scope", "Activities permitted under applicable approvals", "Activities connected with the approved project", "Business activities permitted for the company", "Activities under the agreed structure and approvals", "Generally non-commercial liaison activities"],
        ["Regulatory considerations", "RBI and other applicable requirements", "Project and RBI requirements, as applicable", "Companies Act, FDI route and sector rules", "Companies Act, FDI route and sector rules", "RBI and other applicable requirements"],
        ["Tax considerations", "Depends on India activities and applicable tax rules", "Depends on project income and applicable tax rules", "Indian corporate tax rules", "Depends on structure and applicable tax rules", "Depends on permitted activities and applicable rules"],
        ["Often considered for", "Ongoing presence by a foreign company", "Execution of a specific contract or project", "Scalable and independent India operations", "Strategic local partnership", "Market research and liaison activities"],
      ],
      processEyebrow: "OUR INDIA ENTRY PROCESS",
      processHeading: "From Initial Assessment to Post-Entry Advisory",
      processDescription:
        "A structured sequence to move from market opportunity to a practical and compliant operating presence.",
      process: [
        ["Initial Consultation", "Understand business objectives, proposed activities, sector and expected India presence."],
        ["Feasibility Assessment", "Review market-entry considerations, investment eligibility and principal regulatory factors."],
        ["Structure Selection", "Compare suitable establishment and commercial models against the business plan."],
        ["Documentation & Approvals", "Prepare and coordinate the relevant applications, supporting records and approvals."],
        ["Implementation Support", "Coordinate formation or registration, tax identifiers, banking and applicable licences."],
        ["Post-Entry Advisory", "Support ongoing governance, compliance and expansion planning as operations develop."],
      ],
      documentsHeading: "Documents Generally Required",
      documentsDescription:
        "The final checklist depends on the selected structure, investor profile, sector and proposed activities.",
      documents: [
        "Overseas company incorporation documents and constitutional records",
        "Board resolution or authorisation for the proposed India entry",
        "Latest audited financial statements and ownership information",
        "Business plan, proposed India activities and market-entry objectives",
        "KYC documents for directors, authorised representatives and beneficial owners",
        "Proposed India office address, lease documents or NOC, where applicable",
        "Draft investment, joint venture, distribution or other commercial agreements",
        "Sector-specific licences, approvals or supporting documents, where applicable",
      ],
      requirementsEyebrow: "MARKET ENTRY READINESS",
      requirementsHeading: "Information to shape the entry plan",
      requirements: [
        ["target", "Business objectives", "The India opportunity, target customers, expected timeline and intended scale."],
        ["building", "Proposed activities", "Products or services, operating model, locations and planned use of employees or partners."],
        ["people", "Investor and ownership profile", "Parent entity, proposed shareholders, beneficial owners and local stakeholders."],
        ["shield", "Sector and regulatory context", "Industry, potential FDI conditions, licences and any known approval requirements."],
        ["document", "Available company records", "Incorporation, financial, governance and transaction documents relevant to the proposed entry."],
      ],
      basicPrice: "₹49,999/-",
      comprehensivePrice: "₹99,999/-",
      pricingEyebrow: "INDIA ENTRY ADVISORY",
      pricingHeading: "Support shaped around your India plans",
      pricingDescription:
        "The scope is tailored to the proposed structure, regulatory needs, sector and level of implementation support.",
      basicPackageEyebrow: "ENTRY STRATEGY ESSENTIALS",
      basicPackageName: "India Entry Assessment",
      comprehensivePackageEyebrow: "IMPLEMENTATION SUPPORT",
      comprehensivePackageName: "India Market Entry Support",
      basicFeatures: [
        "Initial consultation and objective review",
        "Entry structure assessment",
        "High-level regulatory and FDI considerations",
        "Initial documents and action checklist",
      ],
      comprehensiveFeatures: [
        "All India Entry Assessment services",
        "Structure and implementation planning",
        "Approval and registration coordination",
        "Tax, licensing and compliance mapping",
        "Initial post-entry advisory",
      ],
      priceNote:
        "Fees are indicative and subject to the confirmed scope. Government charges, applicable taxes and third-party costs are additional where relevant.",
      featureHeading: "Key Laws, Regulations & Considerations",
      featureItems: [
        "Companies Act, 2013",
        "FEMA and RBI regulations",
        "Consolidated FDI Policy",
        "Income-tax Act",
        "GST laws",
        "Foreign Trade (Development & Regulation) Act",
        "Competition Act, 2002",
        "Sector-specific regulations",
      ],
      faqDescription:
        "Common questions about entering the Indian market and establishing a compliant business presence.",
      faqs: [
        ["What is an India entry strategy?", "It is a plan for how an overseas business will assess, establish and operate in India. It considers the intended activities, ownership, establishment structure, investment rules, licences, tax and ongoing compliance."],
        ["Which structure is right for entering India?", "The appropriate route depends on the planned activities, investment, sector, duration and operating model. Options may include an Indian subsidiary, joint venture, branch, project or liaison office, subject to applicable requirements."],
        ["Does foreign investment in India require approval?", "The applicable route depends on the sector, investment terms and current rules. Some investments may be permitted under the automatic route, while others can require government approval or additional conditions."],
        ["How long does an India market entry take?", "Timing varies with the selected structure, document readiness, sectoral requirements and authority processing. A realistic timeline can be prepared after the scope and route are assessed."],
        ["Can you support the business after setup?", "Yes. The scope can include applicable registrations, governance, compliance planning, commercial arrangements and follow-on advisory as India operations grow."],
      ],
      customHeading: "Sector-Specific & Ongoing Support",
      customDescription:
        "Add support for sector licences, commercial partner arrangements, transfer pricing considerations, recurring compliance, restructuring or expansion as your India presence evolves.",
      finalHeading: "Ready to Build Your Presence in India?",
      finalDescription:
        "Speak with our team about a considered, compliant and commercially aligned India entry plan.",
      finalAction: "Request an India Entry Consultation",
      relatedPages: [
        ["Foreign Company Setup", "/services/corporate-commercial-advisory/entity-formation/foreign-company-setup"],
        ["Investor Coordination", "/services/corporate-commercial-advisory/investment-and-transaction-advisory/investor-coordination"],
        ["Investment Transactions", "/services/corporate-commercial-advisory/investment-transactions"],
      ],
      showTestimonials: true,
      showInsights: true,
      showKnowledge: true,
      showReviewActions: false,
      showFeatures: true,
      showIntro: true,
    }
  : undefined;

export default function IndiaEntryStrategyPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
