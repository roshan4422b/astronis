"use client";

import TechnologyEnquiryForm from "@/components/forms/TechnologyEnquiryForm";

export default function Enquiry({
  defaultService = "Technology & Digital Solutions",
}: {
  defaultService?: string;
}) {
  const defaultArea = [
    "Digital Business Solutions",
    "RegTech & Compliance Technology",
    "Legal Technology",
    "Data, AI & Automation",
  ].includes(defaultService)
    ? defaultService
    : "";

  return (
    <TechnologyEnquiryForm
      defaultSolutionArea={defaultArea}
      defaultSolution={defaultArea === "Digital Business Solutions" ? "Digital Transformation" : ""}
    />
  );
}
