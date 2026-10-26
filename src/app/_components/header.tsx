"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  countries,
  industries,
  practices,
  siteMenu,
  slugify,
} from "@/content/site";
import Icon from "./icon";
import ProfessionalsMenu from "./professionals-menu";
import IndustriesMenu from "./industries-menu";
import ServicesMenu from "./services-menu";
import AboutMenu from "./about-menu";
import GlobalPresenceMenu from "./global-presence-menu";
import InsightsMenu from "./insights-menu";
import TechnologyMenu from "./technology-menu";
import { isRouteActive } from "./navigation-state";
import ScheduleMeetingModal from "./schedule-meeting-modal";
import GlobalSearch from "./global-search";

const navigation = [
  {
    label: "About Us",
    href: "/about",
    items: [
      ...siteMenu.about.map((title) => ({
        title,
        href:
          title === "Core Values & Professionals Principles"
            ? "/about/core-values-and-professionals-principles"
            : title === "Mission, Vision & Purpose"
              ? "/about/mission-vision-and-purpose"
            : title === "Leadership & Professionals"
              ? "/about/leadership-and-professionals"
              : "/about/" + slugify(title),
      })),
      { title: "Our Clients", href: "/clients" },
    ],
  },
  {
    label: "Professionals",
    href: "/professionals",
    items: [
      { title: "Our Leadership", href: "/professionals" },
      { title: "Corporate Advisory", href: "/professionals/corporate-advisory" },
      { title: "International Network", href: "/professionals/international-network" },
      { title: "Experts by Industry", href: "/professionals/industry-and-subject-matter-experts" },
      { title: "Collaborate With Us", href: "/professionals/collaborate-with-us" },
      { title: "Careers", href: "/about/careers" },
    ],
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
    label: "Services",
    href: "/services",
    items: practices.map((service) => ({
      title: service.title,
      href: "/services/" + service.canonicalSlug,
    })),
  },
  {
    label: "Technology & Digital",
    href: "/technology-and-digital-solutions",
    items: [
      { title: "Technology, IT & ITES", href: "/industries/it-and-ites" },
      { title: "FinTech & Digital Finance", href: "/industries/fintech-and-digital-finance" },
      { title: "Telecommunications", href: "/industries/telecommunications" },
      { title: "Digital Transformation", href: "/services/business-advisory-consulting" },
      { title: "Data Protection", href: "/services/regulatory-services" },
    ],
  },
  {
    label: "Insights",
    href: "/insights-events",
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
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | null>(null);

  const closeMenus = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setOpen(null);
    setMobile(false);
  };

  const toggleMenu = (label: string) => {
    setOpen((current) => (current === label ? null : label));
  };

  const scheduleOpen = (label: string) => {
    if (window.innerWidth <= 1250) return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(label), 120);
  };

  const scheduleClose = () => {
    if (window.innerWidth <= 1250) return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenus();
      }
    }

    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenus();
      }
    }

    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);

    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    const openScheduler = () => { closeMenus(); setMeetingModalOpen(true); };
    window.addEventListener("astronis:open-scheduler", openScheduler);
    return () => window.removeEventListener("astronis:open-scheduler", openScheduler);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        window.clearTimeout(hoverTimer.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="site-header-stack">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>
            CORPORATE <b>•</b> REGULATORY <b>•</b> LEGAL <b>•</b> BUSINESS
            ADVISORY
          </span>
          <div className="utility-contact">
            <a href="tel:+919311664455" aria-label="Call +91 9311664455">
              <Icon name="phone" />
              +91 9311664455
            </a>
            <a href="mailto:advisory@astronisglobal.com" aria-label="Email advisory@astronisglobal.com">
              <Icon name="mail" />
              advisory@astronisglobal.com
            </a>
          </div>
          <div className="utility-search"><GlobalSearch /></div>
        </div>
      </div>
    <header ref={ref} className="site-header">
      <div className="container nav-shell">
        <Link
          href="/"
          className="brand"
          aria-label="Astronis Global home"
          onClick={closeMenus}
        >
          <video
            src="/header%20logo%20video.mp4"
            className="brand-video"
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setMobile((value) => !value)}
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
          {navigation.map((n) => (
            <Fragment key={n.href}>
              <div
                className={open === n.label ? "nav-item is-open" : "nav-item"}
                onMouseEnter={() => scheduleOpen(n.label)}
                onMouseLeave={scheduleClose}
              >
                <div className="nav-label">
                  <Link
                    className={isRouteActive(path, n.href) ? "nav-link active" : "nav-link"}
                    href={n.href}
                    onClick={closeMenus}
                  >
                    {n.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`Toggle ${n.label} menu`}
                    aria-expanded={open === n.label}
                    aria-haspopup="true"
                    aria-controls={"menu-" + slugify(n.label)}
                    onClick={() => {
                      if (window.innerWidth > 1250) {
                        setOpen(n.label);
                      } else {
                        toggleMenu(n.label);
                      }
                    }}
                  >
                    <Icon name="chevron" className="nav-chevron" />
                  </button>
                </div>
                {n.label === "Technology & Digital" ? (
                  <TechnologyMenu id={"menu-" + slugify(n.label)} onNavigate={closeMenus} />
                ) : n.label === "About Us" ? (
                  <AboutMenu id={"menu-" + slugify(n.label)} onNavigate={closeMenus} />
                ) : n.label === "Professionals" ? (
                  <ProfessionalsMenu id={"menu-" + slugify(n.label)} onNavigate={closeMenus} />
                ) : n.label === "Industries" ? (
                  <IndustriesMenu id={"menu-" + slugify(n.label)} onNavigate={closeMenus} />
                ) : n.label === "Services" ? (
                  <ServicesMenu id={"menu-" + slugify(n.label)} onNavigate={closeMenus} />
                ) : n.label === "Global Presence" ? (
                  <GlobalPresenceMenu id={"menu-" + slugify(n.label)} onNavigate={closeMenus} />
                ) : n.label === "Insights" ? (
                  <InsightsMenu id={"menu-" + slugify(n.label)} />
                ) : (
                  <div className="mega-menu" id={"menu-" + slugify(n.label)}>
                    <div className="mega-intro">
                      <span className="eyebrow">ASTRONIS GLOBAL</span>
                      <h2>{n.label}</h2>
                      <Link href={n.href} onClick={closeMenus}>
                        Explore all <Icon name="arrow" />
                      </Link>
                    </div>
                    <div className="mega-links">
                      {n.items.map((item) => (
                        <Link
                          key={item.href + item.title}
                          href={item.href}
                          onClick={closeMenus}
                          className={isRouteActive(path, item.href) ? "active-submenu-item" : undefined}
                        >
                          <span aria-hidden="true">→</span>
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          ))}
          <button type="button" className="button nav-cta" onClick={() => { closeMenus(); setMeetingModalOpen(true); }}>
            Schedule Meeting <Icon name="arrow" />
          </button>
        </nav>
      </div>
    </header>
      </div>
    <ScheduleMeetingModal open={meetingModalOpen} onClose={() => setMeetingModalOpen(false)} />
    </>
  );
}
