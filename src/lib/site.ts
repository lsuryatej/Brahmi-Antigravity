const DEFAULT_LOCAL_SITE_URL = "http://localhost:3000";
const DEFAULT_PRODUCTION_SITE_URL = "https://wearbrahmi.com";

function normalizeUrl(url: string | undefined): string | null {
  if (!url) return null;

  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  const configuredUrl = normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL
  );

  if (configuredUrl) {
    return configuredUrl;
  }

  return process.env.NODE_ENV === "development"
    ? DEFAULT_LOCAL_SITE_URL
    : DEFAULT_PRODUCTION_SITE_URL;
}
