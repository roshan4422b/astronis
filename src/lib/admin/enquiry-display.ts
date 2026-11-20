export function displayEnquiryLabel(value: string) {
  const label = value.trim();
  if (!label || /^new\s+website\s+enquiry$/i.test(label)) return "Enquiry";
  return label.replace(/^new\s+website\s+enquiry(?=\s*(?:\||:|[-–—]))\s*/i, "Enquiry ");
}
