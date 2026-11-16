import { redirect } from "next/navigation";

export default function CookiePolicyRedirectPage() {
  redirect("/legal/cookie-policy");
}
