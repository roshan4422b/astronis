import { Heading } from "../_components/ui";
import HomeEnquiryForm from "@/components/forms/HomeEnquiryForm";
import ContactDetails from "../contact/contact-details";
import HomePresenceGlobe from "./presence-globe";
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
          </div>
          <HomeEnquiryForm compact />
          <HomePresenceGlobe />
        </div>
      </div>
    </section>
  );
}
