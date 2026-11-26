export function displayEnquiryLabel(value: string) {
  const label = value.trim();
  if (!label || /^new\s+website\s+enquiry$/i.test(label)) return "Enquiry";
  const [prefix, ...details] = label.split("|");
  if (/^new\s+.+\s+enquiry$/i.test(prefix.trim())) {
    const topic = details.join("|").trim().split(/\s+/)[0];
    return topic ? `Enquiry | ${topic}` : "Enquiry";
  }
  return label.replace(/^new\s+website\s+enquiry(?=\s*(?:\||:|[-–—]))\s*/i, "Enquiry ");
}
