import Hero from "./hero";
import ContactDetails from "./contact-details";
import EnquiryForm from "./enquiry-form";
import Connect from "../home/connect";
export const metadata = { title: "Contact Us" };
export default function ContactPage() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container contact-grid">
          <ContactDetails />
          <EnquiryForm />
        </div>
      </section>
      <Connect />
    </>
  );
}
