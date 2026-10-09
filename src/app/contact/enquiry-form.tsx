"use client";

import { usePathname } from "next/navigation";
import HomeEnquiryForm from "@/components/forms/HomeEnquiryForm";
import IndustryEnquiryForm from "@/components/forms/IndustryEnquiryForm";
import ServiceEnquiryForm from "@/components/forms/ServiceEnquiryForm";
import TechnologyEnquiryForm from "@/components/forms/TechnologyEnquiryForm";

export default function EnquiryForm({
  defaultIndustry,
  defaultService,
  defaultSolutionArea,
  defaultSolution,
}: {
  defaultIndustry?: string;
  defaultService?: string;
  defaultSolutionArea?: string;
  defaultSolution?: string;
}) {
  const pathname = usePathname() || "";

  if (pathname.startsWith("/industries")) {
    return <IndustryEnquiryForm defaultIndustry={defaultIndustry} />;
  }

  if (pathname.startsWith("/services")) {
    return <ServiceEnquiryForm defaultService={defaultService} />;
  }

  if (pathname.startsWith("/technology-and-digital-solutions")) {
    return <TechnologyEnquiryForm defaultSolutionArea={defaultSolutionArea} defaultSolution={defaultSolution} />;
  }

  return <HomeEnquiryForm />;
}
