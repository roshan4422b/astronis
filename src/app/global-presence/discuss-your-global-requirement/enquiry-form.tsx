"use client";

import GlobalEnquiryForm from "@/app/_components/global-enquiry-form";

export default function EnquiryForm() {
  return (
    <GlobalEnquiryForm
      context="international"
      defaultCategory="international"
      defaultSelection=""
      title="Discuss Your International Requirement"
      description="Share a few details about your cross-border, international or market-entry requirement. We will connect you with the right Astronis team."
    />
  );
}
