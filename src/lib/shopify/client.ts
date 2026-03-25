/**
 * Server-side Shopify Storefront API GraphQL client.
 *
 * India-specific resilience:
 * - 10-second timeout (Jio/Airtel 4G can be 200-800ms RTT under load)
 * - Automatic single retry with 500ms back-off before surfacing an error
 * - Never imported in 'use client' files — token stays server-side
 */

const TIMEOUT_MS = 10_000; // 10 s — generous for Indian mobile networks
const RETRY_DELAY_MS = 500;

function getShopifyConfig() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const version = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2026-01";

  if (!domain || !token) {
    throw new Error(
      "[shopify/client] NEXT_PUBLIC_SHOPIFY_DOMAIN and " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN must be set."
    );
  }

  return {
    url: `https://${domain}/api/${version}/graphql.json`,
    token,
  };
}

/**
 * Execute a Shopify Storefront API GraphQL operation.
 * Throws a sanitised error on failure — never leaks raw Shopify messages
 * that contain internal paths or stack traces.
 */
export async function shopifyFetch<T = Record<string, unknown>>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { url, token } = getShopifyConfig();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
        // Next.js fetch caching: don't cache authenticated mutations
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Do not surface HTTP status codes to end-users
        throw new Error(`Shopify returned HTTP ${response.status}`);
      }

      const body = (await response.json()) as {
        data: T;
        errors?: { message: string }[];
      };

      if (body.errors?.length) {
        // Log internally but throw a sanitised message
        console.error("[shopify/client] GraphQL errors:", body.errors);
        throw new Error(body.errors[0].message);
      }

      return body.data;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError =
        err instanceof Error ? err : new Error("Unexpected network error");

      if (attempt === 0) {
        // Retry once after a short delay — helpful on flaky Indian 4G connections
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }

  throw lastError ?? new Error("Shopify API request failed after retry");
}
