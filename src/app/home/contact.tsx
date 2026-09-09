import { Heading } from "../_components/ui";
import EnquiryForm from "../contact/enquiry-form";
import ContactDetails from "../contact/contact-details";
export default function Contact() {
  return (
    <section className="section pale" id="enquiry">
      <div className="container">
        <Heading
          title="Let’s Start the Conversation"
          text="Share your requirement and our team will connect with you at the earliest."
        />
        <div className="contact-grid">
          <ContactDetails />
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
