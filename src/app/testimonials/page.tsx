import { Banner } from "../_components/ui";
import TestimonialGallery from "./testimonial-gallery";
import TestimonialForm from "./testimonial-form";
import { getPublicTestimonials, getSourceTestimonialSlugs } from "@/lib/supabase/server";
export const metadata = { title: "Client Testimonials" };
export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string }>;
}) {
  const { format } = await searchParams;
  const [published, sourceSlugs] = await Promise.all([
    getPublicTestimonials(),
    getSourceTestimonialSlugs(),
  ]);
  const cmsTestimonials = published.map((item) => ({
    id: item.slug,
    name: item.name,
    company: item.company,
    designation: item.designation,
    service: item.service,
    quote: item.testimonial_text,
    rating: 5,
    publicationConsent: true,
    status: "approved" as const,
  }));
  return (
    <>
      <Banner
        title="Client Testimonials"
        text="Your experience matters. Share your journey with Astronis Global."
        image="/Part-13 .png"
      />
      <TestimonialGallery
        cmsTestimonials={cmsTestimonials}
        suppressedSourceIds={[...sourceSlugs]}
      />
      <TestimonialForm
        initialFormat={format === "video" ? "video" : "written"}
      />
    </>
  );
}
