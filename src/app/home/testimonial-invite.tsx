"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../_components/icon";
import TestimonialForm from "../testimonials/testimonial-form";
import styles from "./testimonial-invite.module.css";

export default function TestimonialInvite() {
  const [format, setFormat] = useState<"written" | "video" | null>(null);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!format) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFormat(null);
      if (event.key !== "Tab" || !modal.current) return;
      const items = Array.from(modal.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]'));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modal.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [format]);

  return <>
    <div className="testimonial-invite">
      <Icon name="people" />
      <h3>Share Your Experience with Astronis Global</h3>
      <p>We value your feedback. Share your experience with our team.</p>
      <div className="button-row">
        <button type="button" className="button" onClick={() => setFormat("written")}>Write a Testimonial <Icon name="arrow" /></button>
        <button type="button" className="button secondary" onClick={() => setFormat("video")}>Record a Video Testimonial <Icon name="arrow" /></button>
      </div>
    </div>
    {format && <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setFormat(null); }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="testimonial-modal-title" tabIndex={-1} ref={modal}>
        <button type="button" className={styles.close} aria-label="Close testimonial form" onClick={() => setFormat(null)}>×</button>
        <div className={styles.form}>
          <h2 id="testimonial-modal-title">{format === "video" ? "Record a Video Testimonial" : "Write a Testimonial"}</h2>
          <TestimonialForm key={format} initialFormat={format} />
        </div>
      </section>
    </div>}
  </>;
}
