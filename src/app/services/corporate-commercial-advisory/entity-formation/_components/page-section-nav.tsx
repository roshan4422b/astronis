"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState, type MouseEvent } from "react";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./entity-formation-page.module.css";

type PageSectionNavItem = {
  id: string;
  label: string;
};

const sectionIcons: Record<string, string> = {
  services: "building",
  benefits: "award",
  structure: "network",
  comparison: "scale",
  process: "checklist",
  documents: "file",
  requirements: "shield",
  fees: "rupee",
  faqs: "help",
  needs: "search",
  "why-needed": "search",
  framework: "shield",
  stakeholders: "people",
  resources: "file",
  consultation: "calendar",
  features: "award",
  insights: "file",
  knowledge: "file",
  experience: "people",
  eligibility: "shield",
  taxation: "percent",
};

export default function PageSectionNav({
  items,
  mobileCollapsible = true,
  branded = true,
}: {
  items: PageSectionNavItem[];
  mobileCollapsible?: boolean;
  branded?: boolean;
}) {
  const router = useRouter();
  const visibleItems = useMemo(
    () => items.filter(({ id, label }) => id !== "overview" && label.trim().toLowerCase() !== "overview"),
    [items],
  );
  const [activeId, setActiveId] = useState<string>(visibleItems[0]?.id ?? "");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigationId = useId();

  useEffect(() => {
    if (!visibleItems.length) return;

    const sectionNodes = visibleItems
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sectionNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sectionNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [visibleItems]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const header = document.querySelector(".site-header");
    const offset = (header?.getBoundingClientRect().height ?? 110) + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveId(id);
    if (mobileCollapsible) setIsMobileNavOpen(false);
  };

  return (
    <aside
      className={styles.pageSectionNavWrap}
      aria-label="Page sections"
    >
      {branded && (
        <>
          <button
            className={styles.pageSectionNavBack}
            type="button"
            onClick={() => {
              if (window.history.length > 1) window.history.back();
              else router.push("/");
            }}
          >
            <Icon className={styles.pageSectionNavBackIcon} name="arrow" />
            <span>Back</span>
          </button>
          <Link className={styles.pageSectionNavBrand} href="/" aria-label="Astronis Global home">
            <Image src="/astronis_logo.jpeg" alt="Astronis Global" width={250} height={94} />
          </Link>
        </>
      )}
      {mobileCollapsible && (
        <button
          className={styles.pageSectionNavMobileToggle}
          type="button"
          aria-expanded={isMobileNavOpen}
          aria-controls={`page-section-navigation-${navigationId}`}
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          <span>Page sections</span>
          <span aria-hidden="true">{visibleItems.find(({ id }) => id === activeId)?.label}</span>
        </button>
      )}
      <nav className={styles.pageSectionNav} id={`page-section-navigation-${navigationId}`}>
        <ol className={styles.pageSectionNavList}>
          {visibleItems.map(({ id, label }) => (
            <li key={id} className={styles.pageSectionNavItem}>
              <a
                href={`#${id}`}
                className={activeId === id ? styles.pageSectionNavLinkActive : styles.pageSectionNavLink}
                onClick={(event) => handleClick(event, id)}
              >
                {branded && sectionIcons[id] && (
                  <Icon className={styles.pageSectionNavIcon} name={sectionIcons[id]} />
                )}
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
