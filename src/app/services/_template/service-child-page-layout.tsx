import type { ReactNode } from "react";
import PageSectionNav from "../corporate-commercial-advisory/entity-formation/_components/page-section-nav";
import ServiceChildTestimonial from "./service-child-testimonial";
import styles from "./service-child-page-layout.module.css";

type SectionNavItem = {
  id: string;
  label: string;
};

export default function ServiceChildPageLayout({
  children,
  items,
  includeTestimonial = true,
}: {
  children: ReactNode;
  items: SectionNavItem[];
  includeTestimonial?: boolean;
}) {
  const navItems = items.some((item) => item.id === "testimonials")
    ? items
    : [...items, { id: "testimonials", label: "Testimonials" }];

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageContent}>
        {children}
        {includeTestimonial && <ServiceChildTestimonial />}
      </div>
      <PageSectionNav items={navItems} mobileCollapsible branded />
    </div>
  );
}
