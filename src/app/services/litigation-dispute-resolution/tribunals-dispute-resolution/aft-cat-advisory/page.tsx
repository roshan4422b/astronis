import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EntityFormationPage from "@/app/services/corporate-commercial-advisory/entity-formation/_components/entity-formation-page";
import type { EntityFormationPageData } from "@/data/entity-formation-pages";
import { getConsumerRegulatoryDetail } from "@/data/consumer-regulatory-details";

const detail = getConsumerRegulatoryDetail("aft-cat-advisory");

export const metadata: Metadata = {
  title: "AFT & CAT Advisory | Litigation & Dispute Resolution | Astronis",
  description: detail?.description,
  alternates: {
    canonical: "/services/litigation-dispute-resolution/tribunals-dispute-resolution/aft-cat-advisory",
  },
};

function getPageData(): EntityFormationPageData | undefined {
  if (!detail) return undefined;

  return {
    slug: "aft-cat-advisory",
    title: detail.title,
    shortTitle: detail.title,
    heroStatement: detail.subtitle,
    description: detail.description,
    introduction: detail.overview.paragraphs.join(" "),
    image: detail.image,
    imageAlt: detail.imageAlt,
    serviceTitle: "Litigation & Dispute Resolution",
    serviceHref: "/services/litigation-dispute-resolution",
    categoryTitle: "Tribunals - Dispute Resolution",
    categoryHref: "/services/litigation-dispute-resolution#tribunals-dispute-resolution",
    basicPrice: "On request",
    comprehensivePrice: "On request",
    benefits: detail.highlights.map(({ icon, title, text }) => [icon, title, text]),
    benefitsHeading: detail.overview.heading,
    services: detail.services.map(({ title, text }, index) => [
      detail.highlights[index % detail.highlights.length].icon,
      title,
      text,
    ]),
    servicesHeading: "AFT & CAT advisory services",
    servicesDescription: detail.description,
    structurePoints: detail.framework.map(({ title, text }, index) => [
      detail.highlights[index % detail.highlights.length].icon,
      title,
      text,
    ]),
    structureEyebrow: "TRIBUNAL FRAMEWORK",
    structureHeading: "Applicable framework and procedure",
    comparison: [],
    comparisonPanels: [{
      heading: detail.comparison.heading,
      rowHeader: detail.comparison.columns[0],
      headers: detail.comparison.columns.slice(1),
      rows: detail.comparison.rows,
    }],
    comparisonHeading: detail.comparison.heading,
    comparisonDescription: detail.frameworkNote,
    process: detail.process.map(({ title, text }) => [title, text]),
    processEyebrow: "MATTER COORDINATION",
    processHeading: "Coordinate the matter record and next steps",
    processDescription: detail.overview.paragraphs[0],
    documents: [
      "Service, employment, medical or administrative records as relevant.",
      "Orders, prior representations and proof of communications help establish the chronology.",
    ],
    documentsHeading: "Records to organise",
    requirements: detail.considerations.map(({ title, text }, index) => [
      detail.highlights[index % detail.highlights.length].icon,
      title,
      text,
    ]),
    requirementsHeading: "Key considerations",
    faqs: detail.faqs.map(({ question, answer }) => [question, answer]),
    finalHeading: "Discuss your AFT & CAT advisory requirements",
    finalDescription: detail.frameworkNote,
    finalAction: "Schedule a Consultation",
    customHeading: "Case-specific legal review",
    customDescription: detail.frameworkNote,
    showTestimonials: false,
    showInsights: false,
    showKnowledge: false,
    showReviewActions: false,
    showFeatures: false,
    relatedPages: [
      ["Central Administrative Tribunal", "/services/litigation-dispute-resolution/tribunals-dispute-resolution/central-administrative-tribunal"],
    ],
  };
}

export default function AftAndCatAdvisoryPage() {
  const data = getPageData();
  if (!data) notFound();

  return <EntityFormationPage data={data} />;
}
