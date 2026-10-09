"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initialRender = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
        root.classList.add("is-navigating");
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Preserve cross-page anchor navigation; destination content owns its offset.
    if (!window.location.hash) window.scrollTo(0, 0);
    root.classList.add("is-navigating");
    const frame = requestAnimationFrame(() => {
      root.classList.remove("is-navigating");
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <div key={pathname} className="page-transition">{children}</div>;
}
