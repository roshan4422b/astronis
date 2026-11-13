import { Banner } from "../_components/ui";
import TestimonialGallery from "./testimonial-gallery";
import TestimonialInvite from "../home/testimonial-invite";
import { getPublicTestimonials, getSourceTestimonialSlugs } from "@/lib/supabase/server";
export const metadata = { title: "Client Testimonials" };
export default async function TestimonialsPage() {
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
    rating: item.rating,
    imageUrl: item.image_url
      ? `/api/testimonials/${encodeURIComponent(item.slug)}/media/image`
      : "",
    videoUrl: item.video_url
      ? `/api/testimonials/${encodeURIComponent(item.slug)}/media/video`
      : "",
    publicationConsent: true,
    status: "approved" as const,
  }));
  return (
    <>
      <Banner
        title="Client Testimonials"
        text="Your experience matters. Share your journey with Astronis Global."
        image="/Part-13 .png"
      ><TestimonialInvite buttonsOnly /></Banner>
      <TestimonialGallery
        cmsTestimonials={cmsTestimonials}
        suppressedSourceIds={[...sourceSlugs]}
      />
    </>
  );
}
