import "server-only";

import { createClient } from "@supabase/supabase-js";

export class SupabaseServiceConfigurationError extends Error {
  constructor(readonly variableName: "NEXT_PUBLIC_SUPABASE_URL") {
    super(`Invalid server configuration: ${variableName}.`);
    this.name = "SupabaseServiceConfigurationError";
  }
}

export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !serviceRoleKey) return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new SupabaseServiceConfigurationError("NEXT_PUBLIC_SUPABASE_URL");
  }
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new SupabaseServiceConfigurationError("NEXT_PUBLIC_SUPABASE_URL");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
