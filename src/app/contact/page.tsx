import Hero from "./hero";
import ContactDetails from "./contact-details";
import EnquiryForm from "./enquiry-form";
import QuickConnect from "./quick-connect";
import ContactValues from "./contact-values";
export const metadata = { title: "Contact Us" };
export default function ContactPage() {
  return (
    <>
      <Hero />
      <section className="contact-main section">
        <div className="container contact-grid">
          <ContactDetails showMap />
          <EnquiryForm />
        </div>
      </section>
      <QuickConnect />
      <ContactValues />
    </>
  );
}
