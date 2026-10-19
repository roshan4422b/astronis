import Image from "next/image";
import { Heading } from "../_components/ui";
import HomeEnquiryForm from "@/components/forms/HomeEnquiryForm";
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
          </div>
          <HomeEnquiryForm compact />
          <div className="home-contact-map">
            <Image
              className="home-contact-world-map"
              src="/images/world-map.svg"
              alt="World map with the Astronis office location in India"
              width={1000}
              height={520}
            />
            <details className="home-contact-location">
              <summary aria-label="Show Astronis office location in India">
                <span>India</span>
              </summary>
              <div className="home-contact-location-popup">
                <strong>Astronis Global Office</strong>
                <p>
                  C-10/1, First Floor, Bhagwati Garden Extension,
                  <br />
                  Dwarka Mor, New Delhi – 110059, India
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=C-10%2F1%2C%20First%20Floor%2C%20Bhagwati%20Garden%20Extension%2C%20Dwarka%20Mor%2C%20New%20Delhi%20110059%2C%20India"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
