"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import { usePathname } from "next/navigation";
import {
  countries,
  industries,
  serviceGroups,
  siteMenu,
  slugify,
} from "@/content/site";
import Icon from "./icon";
const navigation = [
  {
    label: "About Us",
    href: "/about",
    items: [
      ...siteMenu.about.map((title) => ({
        title,
        href: "/about/" + slugify(title),
      })),
      { title: "Our Clients", href: "/clients" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    items: serviceGroups.map((s) => ({
      title: s.title,
      href: "/services/" + s.slug,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    items: industries.map((s) => ({
      title: s.title,
      href: "/industries/" + s.slug,
    })),
  },
  {
    label: "Professionals",
    href: "/professionals",
    items: [
      { title: "Our Leadership", href: "/professionals" },
      { title: "Partner With Us", href: "/professionals/partner-with-us" },
      { title: "Careers", href: "/about/careers" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    items: siteMenu.insights.map((title) => ({
      title,
      href:
        title === "FAQs"
          ? "/faqs"
          : title === "Success Stories" || title === "Case Studies"
            ? "/success-stories"
            : "/insights/" + slugify(title),
    })),
  },
  {
    label: "Global Presence",
    href: "/global-presence",
    items: countries.map((title) => ({
      title,
      href: "/global-presence/" + slugify(title),
    })),
  },
];
export default function Header() {
  const [mobile, setMobile] = useState(false),
    [open, setOpen] = useState<string | null>(null);
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    function outside(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(null);
        setMobile(false);
      }
    }
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  function close() {
    setMobile(false);
    setOpen(null);
  }
  return (
    <header ref={ref} className="site-header">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>
            CORPORATE <b>•</b> REGULATORY <b>•</b> LEGAL <b>•</b> BUSINESS
            ADVISORY
          </span>
          <div>
            <a href="tel:+919311664455">
              <Icon name="phone" />
              +91 9311664455
            </a>
            <a href="mailto:advisory@astronisglobal.com">
              <Icon name="mail" />
              advisory@astronisglobal.com
            </a>
          </div>
        </div>
      </div>
      <div className="container nav-shell">
        <Link
          href="/"
          className="brand"
          aria-label="Astronis Global home"
          onClick={close}
        >
          <Image
            src="/astronis_logo.jpeg"
            alt="Astronis"
            width={300}
            height={113}
            preload
          />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setMobile(!mobile)}
          aria-expanded={mobile}
          aria-controls="main-navigation"
          aria-label={mobile ? "Close menu" : "Open menu"}
        >
          {mobile ? "✕" : "☰"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={mobile ? "navigation is-open" : "navigation"}
        >
          <Link
            href="/"
            className={path === "/" ? "active" : ""}
            onClick={close}
          >
            Home
          </Link>
          {navigation.map((n) => (
            <Fragment key={n.href}>
              <div
                className={open === n.label ? "nav-item is-open" : "nav-item"}
              >
              <div className="nav-label">
                <Link
                  className={path.startsWith(n.href) ? "active" : ""}
                  href={n.href}
                  onClick={close}
                >
                  {n.label}
                </Link>
                <button
                  aria-label={`Toggle ${n.label} menu`}
                  aria-expanded={open === n.label}
                  aria-controls={"menu-" + slugify(n.label)}
                  onClick={() => setOpen(open === n.label ? null : n.label)}
                >
                  <Icon name="chevron" className="nav-chevron" />
                </button>
              </div>
              <div className="mega-menu" id={"menu-" + slugify(n.label)}>
                  <div className="mega-intro">
                    <span className="eyebrow">ASTRONIS GLOBAL</span>
                    <h2>{n.label}</h2>
                    <Link href={n.href} onClick={close}>
                      Explore all <Icon name="arrow" />
                    </Link>
                  </div>
                  <div className="mega-links">
                    {n.items.map((item) => (
                      <Link
                        key={item.href + item.title}
                        href={item.href}
                        onClick={close}
                      >
                        <span aria-hidden="true">→</span>
                        {item.title}
                      </Link>
                    ))}
                  </div>
              </div>
              </div>
            </Fragment>
          ))}
          <Link href="/contact" onClick={close}>
            Contact Us
          </Link>
          <Link className="button nav-cta" href="/contact" onClick={close}>
            Get in Touch <Icon name="arrow" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
