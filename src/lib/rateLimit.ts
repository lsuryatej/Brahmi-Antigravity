/**
 * In-memory sliding-window rate limiter.
 *
 * Suitable for single-instance deployments (Vercel Serverless functions with
 * warm containers, local dev, single-server VPS).
 * For multi-instance / serverless scale-to-zero, swap the Map for Redis or
 * Upstash. The interface is identical.
 *
 * Usage:
 *   const result = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
 *   if (!result.success) { return 429 with Retry-After }
 */

interface Entry {
  count: number;
  resetAt: number; // Unix ms
}

// Module-level store persists across requests in a warm serverless instance
const store = new Map<string, Entry>();

/** Remove expired entries to avoid unbounded memory growth */
function sweep(): void {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean;
  /** Maximum calls allowed in the window */
  limit: number;
  /** Calls remaining in the current window */
  remaining: number;
  /** Unix timestamp (ms) when the window resets */
  resetAt: number;
  /** Seconds until reset — use in Retry-After header */
  retryAfterSeconds: number;
}

/**
 * Check and increment rate-limit counter for `key`.
 *
 * @param key       - Unique key, e.g. `"login:1.2.3.4"`
 * @param limit     - Max allowed calls per window
 * @param windowMs  - Window duration in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  sweep();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // Fresh window
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
    retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

/**
 * Extract the best-effort client IP from Next.js request headers.
 * Checks x-forwarded-for first (set by Vercel / load balancers),
 * then x-real-ip, then falls back to "unknown".
 *
 * Security note: x-forwarded-for can be spoofed if your infrastructure
 * doesn't strip client-set headers. Vercel's edge sets this reliably.
 */
export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    // xff may contain a comma-separated list; the first IP is the client
    return xff.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "unknown";
}

// Pre-configured rate-limit presets for auth endpoints
export const RATE_LIMITS = {
  /** Login: 5 attempts per 15 minutes per IP */
  LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 },
  /** Signup: 3 attempts per hour per IP */
  SIGNUP: { limit: 3, windowMs: 60 * 60 * 1000 },
  /** Profile/address mutations: 20 per 5 minutes */
  ACCOUNT_MUTATION: { limit: 20, windowMs: 5 * 60 * 1000 },
} as const;
