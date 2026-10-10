import hierarchy from "./service-hierarchy.json";
import { regulatoryContent } from "./regulatory-content";
import { serviceAnchor, type ServicePractice } from "./service-detail-types";

const metadata = [
  { image: "/corporate-regulatory-hero.png", icon: "building", description: "Manage corporate and statutory obligations throughout the life of your organisation. Connect Companies Act questions, MCA and ROC matters, filings, approvals and beneficial ownership records with a clear approach to corporate compliance and regularisation.", introduction: "Start with the corporate action or compliance concern, establish the factual record and identify the documentation, approvals and follow-up needed to move forward.", badges: ["Companies Act", "MCA / ROC", "Corporate Compliance", "Approvals", "Beneficial Ownership", "Regularisation"], question: "What should we bring to a corporate regulatory discussion?", answer: "Share the entity details, relevant corporate records, proposed action and any authority correspondence. For historical issues, a chronology of events and submissions helps identify the scope of review." },
  { image: "/images/services/regulatory-and-compliance.webp", icon: "shield", description: "Build a structured compliance environment around the way your business operates. Identify obligations, assign responsibilities and connect periodic reviews, compliance calendars, regulatory risk assessment and change management with ongoing support.", introduction: "An effective programme makes obligations visible to the people responsible for them. Set a clear baseline, prioritise gaps and maintain evidence of implementation as the business evolves.", badges: ["Frameworks", "Compliance Reviews", "Calendars", "Risk Assessment", "Regulatory Change", "Ongoing Support"], question: "Can a compliance review cover a defined part of our business?", answer: "Yes. The scope can focus on specified entities, activities, locations or a review period. Agreeing the perimeter and available evidence at the outset helps make the findings useful and proportionate." },
  { image: "/images/services/banking-nbfc-and-financial-services-advisory.webp", icon: "chart", description: "Financial regulation requires specialist understanding. Banking, securities, NBFC, FinTech and payment businesses operate within distinct regulatory frameworks that affect establishment, products, governance and day-to-day operations.", introduction: "Map the financial activity and participant roles before choosing a regulatory pathway. Connect RBI and SEBI questions with approvals, operational compliance and the documentation needed for implementation.", badges: ["RBI", "SEBI", "NBFC", "FinTech", "Payments", "Financial Services"], question: "How do you assess a new financial business model?", answer: "We begin with the proposed activities, customer journey, movement of funds and partner roles. This factual map helps identify regulatory perimeter questions and the specialist inputs needed before launch decisions are made." },
  { image: "/Manufacturing & Industrial .png", icon: "globe", description: "Bring sector-specific approvals, product standards and compliance requirements into your operating plan. Coordinate regulatory questions across food, healthcare, pharmaceuticals, telecom, environmental matters, product regulation, legal metrology and BIS conformity.", introduction: "The right starting point is the actual product, facility or service. Connect technical specifications and intended use with the relevant regulatory pathway, supporting evidence and continuing responsibilities.", badges: ["Food & Consumer", "Healthcare", "Pharmaceuticals", "Telecom / WPC", "Environment", "Legal Metrology", "BIS"], question: "Can one product require several regulatory workstreams?", answer: "Yes. Product standards, labelling, sector permissions and environmental or facility requirements may need separate assessment. A coordinated applicability matrix helps assign ownership and identify technical evidence needed for each workstream." },
];

export const regulatoryServices: ServicePractice = {
  title: hierarchy[1].title,
  slug: "regulatory-services",
  heroImage: "/images/services/regulatory-and-compliance.webp",
  seoTitle: "Regulatory Advisory & Compliance Services | Astronis",
  heroEyebrow: "Regulatory Services",
  heroStatement: "Navigate complex regulations with greater clarity & confidence.",
  description: "Astronis helps organisations understand and manage corporate, financial and sector-specific regulatory obligations, connecting statutory compliance, approvals and reporting with practical support for evolving business requirements.",
  introEyebrow: "Integrated Regulatory Advisory",
  introHeading: "Regulatory Requirements Cut Across Every Stage of Business",
  introduction: "Corporate law, statutory obligations, financial regulation and sector-specific rules intersect across the business lifecycle. Product standards, regulatory approvals and reporting responsibilities need to work together. Our three connected service groups help teams assess obligations, respond to regulatory changes and organise ongoing compliance around their operations.",
  lifecycle: ["Corporate Law", "Compliance", "RBI", "SEBI", "Sector Regulations", "Approvals", "Risk", "Standards"],
  visual: "regulatory",
  darkGroupIndex: 2,
  badges: ["Companies Act", "MCA / ROC", "Corporate Compliance", "RBI", "SEBI", "NBFC", "FinTech", "Legal Metrology", "BIS"],
  groups: hierarchy[1].subServices.map((group, index) => ({
    title: group.title, shortTitle: group.title, slug: group.slug,
    ...metadata[index],
    seoTitle: ["Corporate Regulatory Services | Astronis", "Regulatory Compliance Services | Astronis", "Financial Regulatory Advisory | Astronis", "Sector Regulatory Advisory | Astronis"][index],
    cta: `Explore ${group.title}`,
    children: group.children.map((title, childIndex) => ({ title, slug: serviceAnchor(title), ...regulatoryContent[index][childIndex] })),
    faqs: [{ question: metadata[index].question, answer: metadata[index].answer }, { question: "How is the advisory scope agreed?", answer: "The scope is based on your activities, available records and intended outcome. We identify the workstreams, internal responsibilities and specialist inputs needed before agreeing the engagement. Any authority review or approval follows the applicable process and cannot be guaranteed." }],
  })),
  knowledgeTitle: "Regulatory Knowledge Centre",
  knowledgeCTA: "Explore Regulatory Knowledge Centre",
  knowledgeLinks: [
    {title:"Regulatory Updates",href:"/insights/legal-updates"},
    {title:"Compliance Guides",href:"/resources/business-guides"},
    {title:"Government Notifications",href:"/knowledge-centre"},
    {title:"Sector Updates",href:"/insights"},
    {title:"FAQs",href:"/faqs"},
    {title:"Checklists",href:"/resources/compliance-checklists"},
  ],
  enquiryHeading: "Discuss Your Regulatory Requirement",
  finalHeading: "Navigate Regulatory Complexity With a More Structured Approach",
  finalDescription: "Speak with our team about corporate, financial or sector-specific regulatory requirements.",
  finalSecondaryCTA: "Submit a Regulatory Enquiry",
  relatedSlugs: ["corporate-commercial-advisory", "banking-insolvency-restructuring-advisory", "licensing-registrations"],
};
