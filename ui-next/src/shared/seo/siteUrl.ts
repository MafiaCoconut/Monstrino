const DEFAULT_SITE_URL = 'http://localhost:3000';

/**
 * Get the site URL for server-side SEO operations.
 * Prioritizes SITE_URL (server-only) over NEXT_PUBLIC_SITE_URL for backward compatibility.
 * Use this for canonical URLs, sitemaps, and robots.txt.
 */
export function getSiteUrl(): string {
  const raw = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, '');
}

export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl());
}
