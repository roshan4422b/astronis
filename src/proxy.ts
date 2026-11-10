import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rememberCookie = "astronis-admin-remember";
const persistentSessionAge = 60 * 60 * 24 * 30;

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  request.headers.set("x-cms-path", pathname);
  const response = NextResponse.next({ request });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return response;

  const rememberMe = request.cookies.get(rememberCookie)?.value === "1";
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    ...(rememberMe ? { cookieOptions: { maxAge: persistentSessionAge } } : {}),
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
