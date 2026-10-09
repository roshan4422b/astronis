import Icon from "../_components/icon";
import Link from "next/link";

export default function QuickConnect() {
  return (
    <section className="contact-quick-connect" aria-label="Prefer to connect quickly">
      <h2>Prefer to connect quickly?</h2>
      <div className="contact-quick-grid">
        <a href="tel:+919311664455">
          <span className="quick-connect-icon"><Icon name="phone" /></span>
          <span><strong>Call Us</strong><small>01146574455 / 9311664455</small><em>Speak with our experts</em></span>
        </a>
        <a href="https://wa.me/918009898104?text=Hello%20Astronis%20Global%2C%20I%20would%20like%20to%20know%20more." target="_blank" rel="noreferrer">
          <span className="quick-connect-icon whatsapp-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0 0 24 12c0-3.2-1.2-6.2-3.5-8.5Zm-8.5 18.4c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 1 1 12 21.9Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.4-3.9-3.3-.3-.5.3-.4.8-1.3.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.3 3.6 5.6 5 .8.3 1.5.5 2 .6.8.2 1.6.2 2.2.1.7-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4l-.5-.2Z" />
            </svg>
          </span>
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
