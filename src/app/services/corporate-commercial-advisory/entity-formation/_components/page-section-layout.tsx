import type { ReactNode } from "react";
import PageSectionNav from "./page-section-nav";
import styles from "./entity-formation-page.module.css";

type PageSectionNavItem = {
  id: string;
  label: string;
};

type PageSectionLayoutProps =
  | { variant: "full-width"; children: ReactNode }
  | { variant: "with-sidebar"; children: ReactNode; navItems: PageSectionNavItem[] };

export default function PageSectionLayout(props: PageSectionLayoutProps) {
  const { variant, children } = props;
  const className = variant === "with-sidebar"
    ? `${styles.sectionLayout} ${styles.sectionLayoutWithSidebar}`
    : `${styles.sectionLayout} ${styles.sectionLayoutFullWidth}`;

  return (
    <div className={className}>
      <div className={styles.sectionLayoutContent}>{children}</div>
      {variant === "with-sidebar" && (
        <div className={styles.sectionLayoutSidebar}>
          <PageSectionNav items={props.navItems} />
        </div>
      )}
    </div>
  );
}
