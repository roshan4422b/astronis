export function displayEnquiryLabel(value: string) {
  const label = value.trim();
  if (!label || /^new\s+website\s+enquiry$/i.test(label)) return "Enquiry";
  return label.replace(/^new\s+website\s+enquiry(?=\s*(?:\||:|[-–—]))\s*/i, "Enquiry ");
}

export function getEnquiryPreviewPosition(
  rect: { left: number; top: number; bottom: number },
  panel: { width: number; height: number },
  viewport: { width: number; height: number },
) {
  const left = Math.max(12, Math.min(rect.left, viewport.width - panel.width - 12));
  const below = rect.bottom + 8;
  const top = below + panel.height <= viewport.height - 12
    ? below
    : Math.max(12, rect.top - panel.height - 8);
  return { top, left };
}
