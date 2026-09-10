import { Heading } from "../_components/ui";
import EnquiryForm from "../contact/enquiry-form";
import ContactDetails from "../contact/contact-details";
export default function Contact() {
  return (
    <section className="section pale home-contact-section" id="enquiry">
      <div className="container">
        <Heading
          title="Let’s Start the Conversation"
          text="Share your requirement and our team will connect with you at the earliest."
        />
        <div className="contact-grid">
          <div className="home-contact-side">
            <ContactDetails />
            <div className="home-contact-map">
              <iframe
                title="Astronis Global office location"
                src="https://www.google.com/maps?q=C-10%2F1%2C%20First%20Floor%2C%20Bhagwati%20Garden%20Extension%2C%20Dwarka%20Mor%2C%20New%20Delhi%20%E2%80%93%20110059%2C%20India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
