"use client";

export default function ChildEnquiryLink({ title }: { title: string }) {
  return <a href="#enquiry" onClick={() => window.dispatchEvent(new CustomEvent("service-requirement", { detail: title }))}>Discuss this requirement <span aria-hidden="true">→</span></a>;
}
