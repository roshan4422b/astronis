import { Heading, Button, TextLink } from "../_components/ui";
import Icon from "../_components/icon";
import Image from "@/app/_components/asset-image";
import { testimonials } from "@/content/testimonials";
export default function Testimonials() {
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
          {testimonials.map((testimonial) => (
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
        <div className="testimonial-invite">
          <Icon name="people" />
          <h3>Share Your Experience with Astronis Global</h3>
          <p>We value your feedback. Share your experience with our team.</p>
          <div className="button-row">
            <Button href="/testimonials#write">Write a Testimonial</Button>
            <Button href="/testimonials?format=video#write" secondary>
              Record a Video Testimonial
            </Button>
          </div>
        </div>
        <div className="center">
          <TextLink href="/testimonials">View All Testimonials</TextLink>
        </div>
      </div>
    </section>
  );
}
