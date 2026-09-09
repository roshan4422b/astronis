import Link from "next/link";
import Image from "@/app/_components/asset-image";
import { practices } from "@/content/site";
import Icon from "./icon";
const groups = [
  {
    title: "About Us",
    links: [
      ["Our Story", "/about/our-story"],
      ["Our People", "/professionals"],
      ["Our Values", "/about/core-values"],
      ["Careers", "/about/careers"],
    ],
  },
  {
    title: "Services",
    links: practices.map((s) => [s.title, "/services/" + s.slug]),
  },
  {
    title: "Explore",
    links: [
      ["All Industries", "/industries"],
      ["Insights & Resources", "/insights"],
      ["Knowledge Centre", "/knowledge-centre"],
      ["Success Stories", "/success-stories"],
      ["Testimonials", "/testimonials"],
      ["FAQs", "/faqs"],
      ["Media & Events", "/media"],
    ],
  },
  {
    title: "Global Presence",
    links: [
      ["Our Global Network", "/global-presence"],
      ["Country / Jurisdiction", "/global-presence#countries"],
      ["Local Insight", "/global-presence/local-insight"],
      ["Partner With Us", "/professionals/partner-with-us"],
      ["Resources", "/resources"],
      ["Client Portal", "/client-portal"],
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
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map(([title, href]) => (
                <Link key={title} href={href}>
                  {title}
                  <span>›</span>
                </Link>
              ))}
            </div>
          ))}
          <div>
            <h3>Contact Us</h3>
            <a href="tel:+919311664455">+91 9311664455</a>
            <a href="tel:01146574455">01146574455</a>
            <a href="mailto:advisory@astronisglobal.com">
              advisory@astronisglobal.com
            </a>
            <p>
              C-10/1, First Floor, Bhagwati Garden Extension, Dwarka Mor, New
              Delhi – 110059, India
            </p>
            <Link href="/contact">Get in Touch →</Link>
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
        href="https://wa.me/919311664455"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Astronis Global on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="27"
          height="27"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-4.4A8.5 8.5 0 1 1 20 11.5Z" />
          <path d="m8 7 2 3-1 1 3 3 1-1 3 2c-2 4-11-5-8-8Z" />
        </svg>
      </a>
    </>
  );
}
