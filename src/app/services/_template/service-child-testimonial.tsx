import { testimonials } from "@/content/testimonials";
import styles from "./service-child-testimonial.module.css";

export default function ServiceChildTestimonial({
  eyebrow = "TESTIMONIALS",
  heading = "Clear advice. Practical direction.",
  description = "Perspectives shared with permission by clients of our advisory teams.",
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  const approvedTestimonials = testimonials
    .filter((testimonial) => testimonial.status === "approved" && testimonial.publicationConsent && testimonial.quote)
    .slice(0, 3);

  return (
    <section className={styles.testimonial} id="testimonials" aria-labelledby="service-testimonial-heading">
      <div className={`container ${styles.container}`}>
        <div className={styles.heading}>
          <span>{eyebrow}</span>
          <h2 id="service-testimonial-heading">{heading}</h2>
          <p>{description}</p>
        </div>
        <div className={styles.grid}>
          {approvedTestimonials.map((testimonial) => (
            <figure className={styles.card} key={testimonial.id}>
              <span className={styles.quoteMark} aria-hidden="true">“</span>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{[testimonial.designation, testimonial.company].filter(Boolean).join(", ")}</span>
                <span className={styles.stars} aria-label={`${testimonial.rating ?? 0} out of 5 stars`}>
                  {"★".repeat(testimonial.rating ?? 0)}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
