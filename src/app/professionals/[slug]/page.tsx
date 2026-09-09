import { notFound } from "next/navigation";
import { professionals } from "../leadership";
import { Banner, Button } from "../../_components/ui";
export function generateStaticParams() {
  return [
    ...professionals.map((p) => ({ slug: p.slug })),
    { slug: "partner-with-us" },
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      slug === "partner-with-us"
        ? "Partner With Us"
        : professionals.find((p) => p.slug === slug)?.name,
  };
}
export default async function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = professionals.find((p) => p.slug === slug);
  if (!p && slug !== "partner-with-us") notFound();
  return (
    <>
      <Banner
        title={p?.name || "Partner With Us"}
        text={
          p
            ? "Founder Partner · " + p.expertise
            : "Collaborate with Astronis Global across legal, regulatory and business advisory."
        }
        image="/Professional & Business Services .png"
      />
      <section className="section">
        <div className="container narrow article-copy">
          <h2>
            {p ? "Professional Profile" : "Build a professional partnership"}
          </h2>
          <p>
            {p?.description ||
              "We welcome collaboration with Chartered Accountants, Company Secretaries, Cost and Management Accountants, advocates and consultants who share our commitment to professional excellence and responsible advisory."}
          </p>
          {p && (
            <>
              <h2>Education & Enrolment</h2>
              <p>
                {p.education}
                <br />
                {p.enrolment}
              </p>
            </>
          )}
          <Button href="/contact">Connect with Our Team</Button>
        </div>
      </section>
    </>
  );
}
