import { agreementSections } from "@/content/client-testimonial-consent";
import { generateLegalPolicyPdf } from "@/lib/legal-policy-pdf";

export const dynamic = "force-dynamic";

const fileName = "Astronis-Global-Client-Testimonial-Consent-and-Authorisation-Agreement.pdf";

export async function GET() {
  const sections = agreementSections.map((section) => ({
    title: section.title,
    paragraphs: section.paragraphs,
    clauses: section.clauses?.map((clause) => clause.heading ?? clause.text ?? ""),
  }));
  const pdf = generateLegalPolicyPdf(sections, {
    title: "CLIENT TESTIMONIAL, REVIEW, IMAGE & LOGO PUBLICATION CONSENTAND AUTHORISATION AGREEMENT",
    metadataLines: [
      "Website: www.astronisglobal.com",
      "Effective Date: [--Date of Publication--]",
    ],
  });

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(pdf.length),
      "Cache-Control": "no-store",
    },
  });
}
