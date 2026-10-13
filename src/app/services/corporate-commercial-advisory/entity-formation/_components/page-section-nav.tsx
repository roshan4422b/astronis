"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import styles from "./entity-formation-page.module.css";

type PageSectionNavItem = {
  id: string;
  label: string;
};

const noHiddenSections: string[] = [];

export default function PageSectionNav({
  items,
  hiddenWhenVisible = noHiddenSections,
}: {
  items: PageSectionNavItem[];
  hiddenWhenVisible?: string[];
}) {
  const visibleItems = useMemo(
    () => items.filter(({ id, label }) => id !== "overview" && label.trim().toLowerCase() !== "overview"),
    [items],
  );
  const hiddenSectionIds = useMemo(() => hiddenWhenVisible, [hiddenWhenVisible]);
  const [activeId, setActiveId] = useState<string>(visibleItems[0]?.id ?? "");
  const [isHidden, setIsHidden] = useState(false);

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

  useEffect(() => {
    if (!hiddenSectionIds.length) return;

    const sectionNodes = hiddenSectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sectionNodes.length) return;

    const visibleFullWidthSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleFullWidthSections.add(entry.target.id);
          else visibleFullWidthSections.delete(entry.target.id);
        });
        setIsHidden(visibleFullWidthSections.size > 0);
      },
      { threshold: 0 },
    );

    sectionNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      visibleFullWidthSections.clear();
    };
  }, [hiddenSectionIds]);

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
  };

  return (
    <aside
      className={`${styles.pageSectionNavWrap} ${isHidden ? styles.pageSectionNavHidden : ""}`}
      aria-label="Page sections"
      aria-hidden={isHidden}
    >
      <nav className={styles.pageSectionNav}>
        <ol className={styles.pageSectionNavList}>
          {visibleItems.map(({ id, label }) => (
            <li key={id} className={styles.pageSectionNavItem}>
              <a
                href={`#${id}`}
                className={activeId === id ? styles.pageSectionNavLinkActive : styles.pageSectionNavLink}
                onClick={(event) => handleClick(event, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
