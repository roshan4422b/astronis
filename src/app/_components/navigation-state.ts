export function isRouteActive(pathname: string, href: string) {
  if (!href || href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
