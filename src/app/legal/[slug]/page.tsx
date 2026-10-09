import { notFound } from "next/navigation";
import { Banner, Button } from "../../_components/ui";
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
    title: "Disclaimer",
    text: "The material on this website introduces Astronis Global and its services. Please contact our professionals to discuss your specific circumstances and requirements.",
  },
  "cookie-policy": {
    title: "Cookie Policy",
    text: "This website does not currently use advertising trackers or analytics cookies. For questions about website technology or privacy, contact our team.",
  },
  accessibility: {
    title: "Accessibility",
    text: "This website supports keyboard navigation, responsive layouts, labelled form controls and reduced-motion preferences. If you experience difficulty accessing any content, contact our team for assistance.",
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
  const p = pages[(await params).slug];
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
