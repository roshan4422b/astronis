"use client";

import styles from "./page.module.css";

export default function IndiaQuickNav({
  items,
  ariaLabel = "India page sections",
}: {
  items: readonly (readonly [string, string])[];
  ariaLabel?: string;
}) {
  function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <nav className={styles.quickNav} aria-label={ariaLabel}>
      <div>
        {items.map(([label, id]) => (
          <a href={`#${id}`} key={id} onClick={(event) => scrollToSection(event, id)}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}