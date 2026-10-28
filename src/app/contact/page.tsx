import Hero from "./hero";
import ContactDetails from "./contact-details";
import EnquiryForm from "./enquiry-form";
import QuickConnect from "./quick-connect";
import ContactValues from "./contact-values";
import type { Metadata } from "next";
import { getPublishedPageMetadata } from "@/lib/supabase/server";
import CmsPageRoute from "@/app/_components/cms-page-route";
const fallbackMetadata: Metadata = { title: "Contact Us" };
export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, ...(await getPublishedPageMetadata("/contact")) };
}
export default function ContactPage() {
  return (
    <CmsPageRoute path="/contact" eyebrow="Contact">
      <Hero />
      <section className="contact-main section" id="enquiry-form">
        <div className="container contact-grid">
          <ContactDetails showMap />
          <EnquiryForm />
        </div>
      </section>
      <QuickConnect />
      <ContactValues />
    </CmsPageRoute>
  );
}
