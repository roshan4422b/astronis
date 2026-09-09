import Icon from "../_components/icon";
import Link from "next/link";

export default function QuickConnect() {
  return (
    <section className="contact-quick-connect container" aria-label="Prefer to connect quickly">
      <h2>Prefer to connect quickly?</h2>
      <div className="contact-quick-grid">
        <a href="tel:+919311664455">
          <span className="quick-connect-icon"><Icon name="phone" /></span>
          <span><strong>Call Us</strong><small>01146574455 / 9311664455</small><em>Speak with our experts</em></span>
        </a>
        <a href="https://wa.me/919311664455" target="_blank" rel="noreferrer">
          <span className="quick-connect-icon whatsapp-icon">◔</span>
          <span><strong>WhatsApp</strong><small>9311664455</small><em>Chat with us on WhatsApp</em></span>
        </a>
        <a href="mailto:advisory@astronisglobal.com">
          <span className="quick-connect-icon"><Icon name="mail" /></span>
          <span><strong>Email Us</strong><small>advisory@astronisglobal.com</small><em>Drop us an email</em></span>
        </a>
        <Link href="/contact#enquiry-form">
          <span className="quick-connect-icon"><Icon name="calendar" /></span>
          <span><strong>Schedule a Meeting</strong><small>Book a consultation</small><em>at your convenience</em></span>
        </Link>
      </div>
    </section>
  );
}
