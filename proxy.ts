import { NextResponse, type NextRequest } from "next/server";
import { publicEnv } from "@/lib/env";
import { localePath, splitLocale } from "@/lib/i18n";

/**
 * Redirects for deleted / renamed / archived listings (CLAUDE.md §3.5, §9).
 * Rows in `public.redirects` are written by DB triggers, which already collapse chains,
 * so every hit is a single 301 hop. Lookups are cached in memory per instance.
 * Rows store locale-free paths; /ar URLs are looked up without the prefix and redirected within /ar.
 */

const TTL_MS = 5 * 60 * 1000;
const MAX_ENTRIES = 2000;
const cache = new Map<string, { to: string | null; expires: number }>();

async function lookup(path: string): Promise<string | null> {
  const now = Date.now();
  const hit = cache.get(path);
  if (hit && hit.expires > now) return hit.to;

  const url = new URL("/rest/v1/redirects", publicEnv.NEXT_PUBLIC_SUPABASE_URL);
  url.searchParams.set("select", "to_path");
  url.searchParams.set("from_path", `eq.${path}`);
  url.searchParams.set("limit", "1");

  try {
    const res = await fetch(url, {
      headers: {
        apikey: publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        authorization: `Bearer ${publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null; // fail open: serve the page, don't cache the error
    const rows = (await res.json()) as { to_path: string }[];
    const to = rows[0]?.to_path ?? null;
    if (cache.size >= MAX_ENTRIES) cache.clear();
    cache.set(path, { to, expires: now + TTL_MS });
    return to;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const { locale, path } = splitLocale(trimmed);
  const to = await lookup(path);
  if (to && to !== path) {
    const target = request.nextUrl.clone();
    target.pathname = localePath(locale, to);
    return NextResponse.redirect(target, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/used-equipment/:path+", "/ar/used-equipment/:path+"],
};
