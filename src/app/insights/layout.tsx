import type { ReactNode } from "react";

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return <div className="insights-route-scope">{children}</div>;
}
