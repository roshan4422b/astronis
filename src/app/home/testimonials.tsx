import { Heading, Button, TextLink } from "../_components/ui";
import Icon from "../_components/icon";
export default function Testimonials() {
  return (
    <section className="section pale">
      <div className="container">
        <Heading
          title="Client Testimonials"
          text="Hear directly from the businesses, professionals and organisations we have supported."
        />
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
