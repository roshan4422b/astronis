"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "../_components/icon";
import { Heading, Button } from "../_components/ui";

const featuredIndustries = [
  { title: "Banking & Financial Services", description: "Practical legal and regulatory guidance for financial institutions, lenders and investment businesses.", image: "/Banking & Financial Services1 .png", href: "/industries/financial-services" },
  { title: "Technology & Digital", description: "Commercial, technology and data advice for businesses building and scaling digital products.", image: "/Technology, IT & ITES .png", href: "/industries/it-and-ites" },
  { title: "Healthcare & Life Sciences", description: "Sector-aware support for healthcare providers, pharmaceutical companies and life-science innovators.", image: "/Healthcare & Pharmaceuticals .png", href: "/industries/healthcare-and-pharma" },
  { title: "Manufacturing & Industrial", description: "Clear advice across operations, contracts, projects, compliance and industrial growth.", image: "/Manufacturing & Industrial .png", href: "/industries/manufacturing" },
  { title: "Energy & Infrastructure", description: "End-to-end counsel for energy, infrastructure, projects and public-private development.", image: "/Infrastructure & Projects .png", href: "/industries/infrastructure" },
  { title: "Consumer & Retail", description: "Business-focused support for consumer brands, retail networks and fast-moving markets.", image: "/FMCG FOOD .png", href: "/industries/retail-and-consumer" },
  { title: "Real Estate", description: "Practical support for real estate development, transactions, leasing and project execution.", image: "/Real Estate & Construction .png", href: "/industries/real-estate-and-construction" },
  { title: "Professional Services", description: "Strategic advisory for professional firms, partnerships and service-led businesses.", image: "/Professional & Business Services .png", href: "/industries/professional-and-business-services" },
] as const;

export default function Industries() {
  const [active, setActive] = useState(0);
  const dragStart = useRef<number | null>(null);
  const total = featuredIndustries.length;

  function move(direction: number) {
    setActive((current) => (current + direction + total) % total);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") move(1);
    if (event.key === "ArrowLeft") move(-1);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStart.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
  }

  function handlePointerCancel() {
    dragStart.current = null;
  }

  function relativePosition(index: number) {
    let position = (index - active + total) % total;
    if (position > total / 2) position -= total;
    return position;
  }

  return (
    <section className="section industries-section">
      <div className="industry-heading">
        <div className="container relative">
          <Heading
            title="Industries We Serve"
            text="Sector-focused expertise to solve complex business, regulatory and strategic challenges."
            light
          />
        </div>
      </div>
      <div className="container">
        <div
          className="industry-carousel premium-industry-carousel"
          aria-label="Industries we serve"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <button className="industry-carousel-control previous" type="button" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => move(-1)} aria-label="Show previous industry">
            <Icon name="arrow" />
          </button>
          <div className="industry-carousel-stage">
            {featuredIndustries.map((industry, index) => {
              const position = relativePosition(index);
              const distance = Math.abs(position);
              return (
                <Link
                  href={industry.href}
                  key={industry.title}
                  className={`industry-card depth-${distance} ${position === 0 ? "is-active" : ""}`}
                  aria-hidden={distance > 2}
                  tabIndex={distance > 2 ? -1 : 0}
                  style={{
                    "--card-position": position,
                    "--card-depth": distance,
                    "--card-scale": position === 0 ? 1.08 : distance === 1 ? 0.92 : 0.84,
                    "--card-opacity": position === 0 ? 1 : distance === 1 ? 0.94 : 0.78,
                    zIndex: 10 - distance,
                  } as CSSProperties}
                >
                  <div className="industry-card-image">
                    <Image src={industry.image} alt={industry.title} fill sizes="(max-width: 760px) 88vw, 350px" />
                  </div>
                  <div className="industry-card-content">
                    <h3>{industry.title}</h3>
                    <p>{industry.description}</p>
                    <span className="industry-card-link">Explore Industry</span>
                    <span className="industry-card-arrow" aria-hidden="true"><Icon name="arrow" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
          <button className="industry-carousel-control next" type="button" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => move(1)} aria-label="Show next industry">
            <Icon name="arrow" />
          </button>
        </div>
        <div className="industry-carousel-status" aria-label="Choose an industry">
          {featuredIndustries.map((industry, index) => (
            <button key={industry.title} type="button" className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show ${industry.title}`} aria-current={active === index} />
          ))}
        </div>
        <div className="ribbon">
          <Icon name="globe" />
          <h3>Diverse Industries.<br />Focused Solutions.</h3>
          <p>Sector understanding. Practical advice. Support for sustainable growth and long-term value.</p>
          <Button href="/industries" secondary>View All Industries</Button>
        </div>
      </div>
    </section>
  );
}
