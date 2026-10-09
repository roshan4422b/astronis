"use client";

import { useEffect, useState, type MouseEvent } from "react";
import styles from "./entity-formation-page.module.css";

type PageSectionNavItem = {
  id: string;
  label: string;
};

export default function PageSectionNav({ items }: { items: PageSectionNavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const sectionNodes = items
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
  }, [items]);

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
    <aside className={styles.pageSectionNavWrap} aria-label="Page sections">
      <nav className={styles.pageSectionNav}>
        <ol className={styles.pageSectionNavList}>
          {items.map(({ id, label }) => (
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
