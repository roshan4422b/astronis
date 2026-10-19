import { notFound } from "next/navigation";
import { Banner, Button } from "../../_components/ui";
import PrivacyPolicy from "./privacy-policy";
import TermsOfUse from "./terms-of-use";
import WebsiteDisclaimer from "./website-disclaimer";
import CookiePolicy from "./cookie-policy";
import AccessibilityStatement from "./accessibility-statement";
import ClientTestimonialConsent from "./client-testimonial-consent";
import CareerProfessionalPartnershipConsent from "./career-professional-partnership-consent";
const pages: Record<string, { title: string; text: string }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    text: "For information about how Astronis Global handles personal information, or to make a privacy-related request, please contact advisory@astronisglobal.com.",
  },
  "terms-of-use": {
    title: "Terms of Use",
    text: "For questions about use of this website or engaging Astronis Global, please contact our team. Engagement scope and terms should be agreed directly with the firm.",
  },
  disclaimer: {
    title: "Website Disclaimer",
    text: "The material on this website introduces Astronis Global and its services. Please contact our professionals to discuss your specific circumstances and requirements.",
  },
  "cookie-policy": {
    title: "Cookie Policy",
    text: "This website does not currently use advertising trackers or analytics cookies. For questions about website technology or privacy, contact our team.",
  },
  accessibility: {
    title: "Accessibility Statement",
    text: "",
  },
  "client-testimonial-consent": {
    title: "Client Testimonial Consent & Authorisation Agreement",
    text: "",
  },
  "career-professional-partnership-consent": {
    title: "Career, Professional Association & Partnership Application Consent Agreement",
    text: "",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return { title: pages[(await params).slug]?.title };
}
export default async function Policy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "privacy-policy") return <PrivacyPolicy />;
  if (slug === "terms-of-use") return <TermsOfUse />;
  if (slug === "disclaimer") return <WebsiteDisclaimer />;
  if (slug === "cookie-policy") return <CookiePolicy />;
  if (slug === "accessibility") return <AccessibilityStatement />;
  if (slug === "client-testimonial-consent") return <ClientTestimonialConsent />;
  if (slug === "career-professional-partnership-consent") return <CareerProfessionalPartnershipConsent />;
  const p = pages[slug];
  if (!p) notFound();
  return (
    <>
      <Banner title={p.title} />
      <section className="section">
        <div className="container narrow article-copy">
          <h2>{p.title}</h2>
          <p>{p.text}</p>
          <Button href="mailto:advisory@astronisglobal.com">
            Contact Our Team
          </Button>
        </div>
      </section>
    </>
  );
}
