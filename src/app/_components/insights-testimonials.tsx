type TestimonialItem = {
  quote: string;
  company: string;
  designation?: string;
  rating?: number;
};

export default function InsightsTestimonials({
  items,
}: {
  items: readonly TestimonialItem[];
}) {
  return (
    <div className="home-testimonial-grid">
      {items.map((item) => {
        const rating = item.rating ?? 5;

        return (
          <article
            className="home-testimonial-card"
            key={`${item.company}-${item.quote}`}
          >
            <div
              className="testimonial-rating"
              role="img"
              aria-label={`${rating} out of 5 stars`}
            >
              {"★".repeat(rating)}
              <span>{"★".repeat(5 - rating)}</span>
            </div>
            <blockquote>“{item.quote}”</blockquote>
            <strong>{item.company}</strong>
            {item.designation && <small>{item.designation}</small>}
          </article>
        );
      })}
    </div>
  );
}
