import { Banner } from "../_components/ui";
import TestimonialGallery from "./testimonial-gallery";
import TestimonialForm from "./testimonial-form";
export const metadata = { title: "Client Testimonials" };
export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string }>;
}) {
  const { format } = await searchParams;
  return (
    <>
      <Banner
        title="Client Testimonials"
        text="Your experience matters. Share your journey with Astronis Global."
        image="/Part-13 .png"
      />
      <TestimonialGallery />
      <TestimonialForm
        initialFormat={format === "video" ? "video" : "written"}
      />
    </>
  );
}
