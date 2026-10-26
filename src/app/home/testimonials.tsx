import { Heading, TextLink } from "../_components/ui";
import Image from "@/app/_components/asset-image";
import { testimonials } from "@/content/testimonials";
import TestimonialInvite from "./testimonial-invite";
import { getPublicTestimonials, getSourceTestimonialSlugs } from "@/lib/supabase/server";
export default async function Testimonials() {
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
  const cmsIds = new Set(cmsTestimonials.map((testimonial) => testimonial.id));
  const displayTestimonials = [
    ...testimonials.filter((testimonial) => !cmsIds.has(testimonial.id) && !sourceSlugs.has(testimonial.id)),
    ...cmsTestimonials,
  ];
  return (
    <section className="section testimonials-section">
      <Image
        src="/Part-12 .png"
        alt=""
        fill
        sizes="100vw"
        className="testimonials-backdrop"
      />
      <div className="container relative">
        <Heading
          title="Client Testimonials"
          text="Hear directly from the businesses, professionals and organisations we have supported."
          light
        />
        <div className="home-testimonial-grid">
          {displayTestimonials.map((testimonial) => (
            <article className="home-testimonial-card" key={testimonial.id}>
              <div className="testimonial-rating" role="img" aria-label={`${testimonial.rating ?? 0} out of 5 stars`}>
                {"★".repeat(testimonial.rating ?? 0)}
                <span>{"★".repeat(5 - (testimonial.rating ?? 0))}</span>
              </div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <strong>{testimonial.name}</strong>
              <small>
                {[testimonial.designation, testimonial.company]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
            </article>
          ))}
        </div>
        <TestimonialInvite />
        <div className="center">
          <TextLink href="/testimonials">View All Testimonials</TextLink>
        </div>
      </div>
    </section>
  );
}
