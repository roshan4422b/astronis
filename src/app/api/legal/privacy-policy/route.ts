import { privacyPolicySections } from "../../../legal/[slug]/privacy-policy-content";
import { generateLegalPolicyPdf } from "../../../../lib/legal-policy-pdf";

export const dynamic = "force-dynamic";

export async function GET() {
  const pdf = generateLegalPolicyPdf(privacyPolicySections);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Astronis-Global-Privacy-Policy.pdf"',
      "Content-Length": String(pdf.length),
      "Cache-Control": "no-store",
    },
  });
}
