import type { Metadata } from "next";
import AdminShell from "./_components/admin-shell";
import { AdminStateProvider } from "./_components/admin-state";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: { default: "Admin Workspace", template: "%s | Astronis Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-cms-path") || "";
  if (pathname !== "/admin/login") {
    const auth = await getAuthorizedAdmin();
    if (!auth.configured || !auth.user) redirect("/admin/login");
  }
  return <AdminStateProvider><AdminShell>{children}</AdminShell></AdminStateProvider>;
}
