import { Button, Heading } from "../_components/ui";
import Icon from "../_components/icon";
export default function Consultation() {
  return (
    <section className="section consultation-section">
      <div className="container">
        <Heading
          title="Let’s Build What’s Next. Together."
          text="Connect with our experts to discuss your legal, regulatory or business requirements."
        />
        <div className="ribbon">
          <Icon name="people" />
          <div>
            <h3>Ready to take the next step?</h3>
            <p>Your goals. Our commitment.</p>
          </div>
          <div className="button-row">
            <Button href="/contact">Schedule a Consultation</Button>
            <Button href="tel:+919311664455" secondary>
              Talk to Our Experts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
