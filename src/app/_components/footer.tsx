import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "./icon";
import SocialLinks from "./social-links";
const groups = [
  {
    title: "Quick Links",
    links: [
      ["About Us", "/about"],
      ["Services", "/services"],
      ["Industries", "/industries"],
      ["Professionals", "/professionals"],
      ["Knowledge Centre", "/knowledge-centre"],
      ["Insights & Events", "/insights"],
      ["Technology & Digital Solutions", "/services"],
      ["Careers", "/about/careers"],
      ["Contact Us", "/contact"],
    ],
  },
  {
    title: "Our Services",
    links: [
      ["Corporate & Commercial", "/services/corporate-advisory"],
      ["Regulatory Services", "/services/regulatory-and-compliance"],
      ["Litigation & Dispute Resolution", "/services/litigation-and-dispute-resolution"],
      ["Business Advisory", "/services/business-advisory"],
      ["Licensing & Registrations", "/services/licensing-and-registrations"],
      ["IPR & Other Registrations", "/services/intellectual-property"],
      ["FEMA / Foreign Exchange", "/services/foreign-investment"],
      ["Compliance & Risk Advisory", "/services/regulatory-and-compliance"],
      ["Employment & HR Advisory", "/services"],
      ["Tax Advisory & Support", "/services/taxation-and-compliance"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Banking & Financial Services", "/industries"],
      ["Fintech", "/industries"],
      ["Real Estate & Construction", "/industries"],
      ["Manufacturing", "/industries"],
      ["Technology, Media & Telecom", "/industries"],
      ["Healthcare & Pharmaceuticals", "/industries"],
      ["Education", "/industries"],
      ["Startups & Innovation", "/industries"],
      ["Retail & E-Commerce", "/industries"],
      ["NGOs & Not-for-Profit", "/industries"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Knowledge Centre", "/knowledge-centre"],
      ["Articles", "/insights"],
      ["Whitepapers", "/resources"],
      ["Case Studies", "/success-stories"],
      ["Guides & Checklists", "/resources"],
      ["FAQs", "/faqs"],
      ["Newsroom", "/media"],
      ["Events", "/media"],
      ["Videos", "/media"],
      ["Legal Updates", "/insights"],
    ],
  },
];
export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link href="/">
              <Image
                src="/astronis_logo.jpeg"
                alt="Astronis"
                width={235}
                height={88}
              />
            </Link>
            <p>
              Your trusted partner for legal, regulatory and business advisory
              services.
            </p>
            <span className="heading-line" />
            <p>
              Clarity. Confidence.
              <br />
              Lasting business impact.
            </p>
            <SocialLinks compact />
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map(([title, href]) => (
                <Link key={title} href={href}>
                  <span aria-hidden="true">›</span>
                  {title}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <h3>Contact Us</h3>
            <div className="footer-contact-list">
              <Link href="/contact" className="contact-row">
                <Icon name="pin" />
                <span>
                  Astronis Global Pvt Ltd
                  <br />
                  C-10/1, FF, Dwarka Mor, New Delhi-110059.
                </span>
              </Link>
              <a href="tel:+919311664455" className="contact-row">
                <Icon name="phone" />
                <span>+91 9311664455 / 01146574455</span>
              </a>
              <a href="mailto:advisory@astronisglobal.com" className="contact-row">
                <Icon name="mail" />
                <span>advisory@astronisglobal.com</span>
              </a>
              <a href="https://www.astronisglobal.com" className="contact-row" target="_blank" rel="noreferrer">
                <Icon name="globe" />
                <span>www.astronisglobal.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Astronis Global. All rights reserved.
          </span>
          <div>
            {[
              "Privacy Policy",
              "Terms of Use",
              "Disclaimer",
              "Cookie Policy",
              "Accessibility",
              "Sitemap",
            ].map((t) => (
              <Link
                key={t}
                href={
                  t === "Sitemap"
                    ? "/sitemap"
                    : "/legal/" + t.toLowerCase().replaceAll(" ", "-")
                }
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <a
        className="floating-contact call"
        href="tel:+919311664455"
        aria-label="Call Astronis Global"
      >
        <Icon name="phone" />
      </a>
      <a
        className="floating-contact whatsapp"
        href="https://wa.me/918009898104?text=Hello%20Astronis%20Global%2C%20I%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Astronis Global on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="white"
          stroke="none"
          aria-hidden="true"
        >
          <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0 0 24 12c0-3.2-1.2-6.2-3.5-8.5Zm-8.5 18.4c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A10 10 0 1 1 12 21.9Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.4-3.9-3.3-.3-.5.3-.4.8-1.3.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.3 3.6 5.6 5 .8.3 1.5.5 2 .6.8.2 1.6.2 2.2.1.7-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4l-.5-.2Z" />
        </svg>
      </a>
    </>
  );
}
