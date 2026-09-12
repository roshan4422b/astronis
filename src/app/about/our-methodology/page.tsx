import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";

const navigation = [
  ["Our Story", "/about#our-story"],
  ["Vision & Mission", "/about/vision-and-mission"],
  ["Core Values", "/about/core-values"],
  ["Leadership Team", "/professionals"],
  ["Our Methodology", "/about/our-methodology"],
  ["Global Presence", "/global-presence"],
  ["Careers", "/about/careers"],
  ["Why Choose Us", "/about/why-choose-us"],
];

const philosophyHighlights = [
  {
    title: "Client-Centric",
    text: "Your goals guide our approach.",
    icon: "people",
  },
  {
    title: "Integrated Thinking",
    text: "Legal, regulatory, tax and business perspectives under one roof.",
    icon: "chart",
  },
  {
    title: "Practical & Results-Driven",
    text: "Solutions that work in the real world.",
    icon: "shield",
  },
  {
    title: "Sustainable Value",
    text: "Long-term growth beyond immediate outcomes.",
    icon: "globe",
  },
];

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "We listen, learn and understand your objectives, challenges and opportunities.",
    icon: "search",
  },
  {
    number: "02",
    title: "Analyse",
    text: "We evaluate the legal, regulatory, commercial and operational landscape.",
    icon: "chart",
  },
  {
    number: "03",
    title: "Strategise",
    text: "We develop tailored solutions with clear priorities, risk awareness and practical pathways.",
    icon: "bulb",
  },
  {
    number: "04",
    title: "Execute",
    text: "We work closely with you to implement solutions, manage documentation and coordinate delivery.",
    icon: "building",
  },
  {
    number: "05",
    title: "Support",
    text: "We provide continued guidance, ongoing advisory and long-term value beyond the transaction.",
    icon: "shield",
  },
];

const features = [
  ["Tailored Solutions", "Practical advice aligned with your specific needs."],
  ["Cross-Functional Teams", "Access to diverse expertise across legal, regulatory and business matters."],
  ["Transparent Communication", "Clear, timely and honest communication throughout the engagement."],
  ["Technology-Enabled", "Efficient processes and secure collaboration to support delivery."],
  ["Proactive Advisory", "We identify risks and opportunities before they become challenges."],
  ["Measurable Outcomes", "Focused on long-term value and sustainable business outcomes."],
];

const differentiators = [
  "Unified legal, regulatory and business perspective",
  "Solutions tailored to industry-specific needs",
  "Deep domain expertise and practical experience",
  "Collaborative and inclusive approach",
  "Focus on risk mitigation and compliance",
  "Commitment to long-term partnerships",
];

const stats = [
  ["1000+", "Advisory Assignments"],
  ["30+", "Industries Served"],
  ["Pan India", "Presence"],
  ["Global", "Advisory Support"],
];

export const metadata = {
  title: "Our Methodology",
  description:
    "Discover Astronis Global’s methodology: a practical five-step process built around legal insight, regulatory perspective and business outcomes.",
};

export default function MethodologyPage() {
  return (
    <div>
      <section className="page-banner">
        <div className="container page-banner-inner">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/about">About Us</Link>
            <span>›</span>
            <span aria-current="page">Our Methodology</span>
          </nav>
          <div className="page-banner-content">
            <h1>Our Methodology</h1>
            <p>A Structured Approach. Real-World Impact.</p>
          </div>
        </div>
      </section>

      <nav aria-label="About navigation" className="subnav">
        <div className="container">
          {navigation.map(([title, href]) => (
            <Link
              key={title}
              href={href}
              className={href === "/about/our-methodology" ? "selected" : undefined}
            >
              {title}
            </Link>
          ))}
        </div>
      </nav>

      <section className="section pale">
        <div className="container">
          <div className="methodology-intro">
            <div>
              <span className="eyebrow">OUR PHILOSOPHY</span>
              <h2>Insight. Integration. Impact.</h2>
            </div>
            <p>
              Every matter is unique. Our methodology is designed to understand
              your objectives, analyse the full context, and deliver practical,
              value-based solutions with a long-term perspective.
            </p>
          </div>

          <div className="feature-grid feature-grid-4">
            {philosophyHighlights.map(({ title, text, icon }) => (
              <article key={title} className="feature-card">
                <div className="feature-icon">
                  <Icon name={icon} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-inline">
            <div>
              <span className="eyebrow">OUR APPROACH</span>
              <h2>A Five-Step Process</h2>
            </div>
          </div>

          <div className="process-grid">
            {steps.map(({ number, title, text, icon }) => (
              <article key={title} className="process-card">
                <div className="process-top">
                  <span className="process-step">{number}</span>
                  <div className="process-icon">
                    <Icon name={icon} />
                  </div>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pale">
        <div className="container">
          <div className="section-heading-inline">
            <div>
              <span className="eyebrow">KEY FEATURES</span>
              <h2>What You Can Expect</h2>
            </div>
            <Link href="/contact" className="text-link">
              Partner With Us <Icon name="arrow" />
            </Link>
          </div>

          <div className="feature-grid feature-grid-3">
            {features.map(([title, text]) => (
              <article key={title} className="feature-card compact">
                <div className="feature-icon mini">
                  <Icon name="bulb" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container differentiator-wrap">
          <div className="differentiator-image">
            <Image
              src="/Part-11 .png"
              alt="Astronis team in a modern office"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
          <div className="differentiator-copy">
            <span className="eyebrow">OUR DIFFERENTIATORS</span>
            <h2>How We Do It Differently</h2>
            <ul className="differentiator-list">
              {differentiators.map((item) => (
                <li key={item}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pale">
        <div className="container stats-section">
          <div className="stats-copy">
            <span className="eyebrow">REAL-WORLD IMPACT</span>
            <h2>Turning Strategy Into Success</h2>
            <p>
              Our methodology has helped businesses, institutions and individuals
              achieve meaningful outcomes across diverse sectors.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map(([value, label]) => (
              <div key={label} className="stat-box">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <h2>Let’s Navigate What’s Next — Together.</h2>
            <p>Speak with our team to explore how our methodology can support your goals.</p>
          </div>
          <div className="cta-actions">
            <Link href="/contact" className="button">
              Request a Consultation <Icon name="arrow" />
            </Link>
            <Link href="/contact" className="button outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
