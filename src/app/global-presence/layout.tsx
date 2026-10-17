import type { ReactNode } from "react";

export default function GlobalPresenceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="global-presence-route-scope">{children}</div>;
}
