import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "../entity-formation/_components/entity-formation-page";
import { businessReorganisationPages } from "@/data/business-reorganisation-pages";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";

const base = businessReorganisationPages.find((page) => page.slug === "business-reorganisation");
const data: EntityFormationPageData | undefined = base
  ? {
      ...base,
      slug: "demerger-amalgamation",
      title: "Demerger & Amalgamation",
      shortTitle: "Demerger & Amalgamation",
      categoryTitle: "Corporate Governance and Entity Structuring",
      heroEyebrow: "CORPORATE & COMMERCIAL ADVISORY · DEMERGER & AMALGAMATION",
      heroNoteEyebrow: "CORPORATE REORGANISATION",
      heroNoteTitle: "Separate with purpose. Combine with clarity.",
      heroNoteDescription:
        "Coordinate business objectives, stakeholder interests and implementation steps through a considered reorganisation process.",
      heroStatement: "Plan the separation or combination with clarity.",
      description:
        "We support businesses assessing and implementing demergers and amalgamations, coordinating corporate approvals, transaction documentation and implementation planning around the intended business outcome.",
      introduction:
        "A demerger separates defined activities into distinct businesses, while an amalgamation combines entities under an agreed structure. Each route calls for a clear transaction perimeter, an assessment of stakeholder and operational effects, and a coordinated plan for approvals and implementation.",
      servicesHeading: "Demerger and amalgamation support, from assessment to implementation",
      servicesDescription:
        "Align the transaction route, corporate documentation, approvals and transition planning with the intended business structure.",
      benefitsHeading: "Plan the transaction around the intended business outcome",
      comparisonHeading: "Demerger and amalgamation considerations",
      comparisonHeaders: ["Demerger", "Amalgamation"],
      comparisonFocusIndex: null,
      comparison: [
        ["Business outcome", "Separate a business, undertaking or activity into distinct operations.", "Combine entities or businesses under an agreed structure."],
        ["Transaction planning", "Define the separation perimeter, retained dependencies and transition needs.", "Assess the entities, stakeholder interests and proposed combination route."],
        ["Implementation", "Coordinate approvals, transfer documentation and operational separation.", "Coordinate approvals, transaction documents and integration steps."],
      ],
      process: [
        ["Define the objective", "Confirm the commercial rationale and intended outcome of the separation or combination."],
        ["Assess the transaction perimeter", "Identify the entities, activities, assets, liabilities, contracts and stakeholders affected."],
        ["Review the route and dependencies", "Coordinate corporate, tax, regulatory and operational considerations with relevant specialists."],
        ["Plan approvals and documentation", "Map required decisions, filings, transaction documents and implementation responsibilities."],
        ["Coordinate implementation", "Track agreed steps through completion and the resulting business transition."],
      ],
      faqs: [
        ["What is the difference between a demerger and an amalgamation?", "A demerger separates a business or activity into distinct operations. An amalgamation combines entities or businesses under an agreed structure."],
        ["What should be assessed before choosing a route?", "The business objective, transaction perimeter, stakeholder interests, operational dependencies, approvals and applicable tax and regulatory considerations should be assessed with the relevant specialists."],
        ["Can implementation support include approvals and documentation?", "The agreed scope can include coordinating corporate approvals, transaction documentation, filings and implementation planning."],
      ],
      faqDescription: "Common questions about demerger and amalgamation planning.",
      finalHeading: "Plan your business separation or combination with clarity.",
      finalDescription:
        "Discuss the intended transaction and the corporate, regulatory and operational steps that may need coordination.",
    }
  : undefined;

export const metadata: Metadata = {
  title: "Demerger & Amalgamation | Astronis Global",
  description:
    "Demerger and amalgamation advisory covering transaction planning, corporate approvals, documentation and implementation coordination.",
  alternates: { canonical: "/services/corporate-commercial-advisory/demerger-amalgamation" },
};

export default function DemergerAmalgamationPage() {
  if (!data) notFound();
  return <EntityFormationPage data={data} />;
}
