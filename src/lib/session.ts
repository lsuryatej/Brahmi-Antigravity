/**
 * Session management — server-only.
 * Uses AES-256-GCM via the Web Crypto API (works in Node.js 18+ and Edge Runtime).
 * Sessions are stored as encrypted HTTP-only cookies; the customer access token
 * never touches client-side JavaScript.
 *
 * Cookie flags: HttpOnly | Secure | SameSite=Strict
 * Default TTL : 7 days (SESSION_7_DAYS)
 * Sensitive op TTL: 24 hours (SESSION_24_HOURS) — pass explicitly for address/password changes
 */

import { cookies } from "next/headers";
import { cache } from "react";

export const COOKIE_NAME = "brahmi_session";
export const SESSION_7_DAYS = 60 * 60 * 24 * 7; // seconds
export const SESSION_24_HOURS = 60 * 60 * 24; // seconds
// Auto-renew the Shopify token when it has less than this many hours left
const RENEW_THRESHOLD_HOURS = 24;

export interface SessionData {
  /** Shopify Storefront API customer access token */
  customerAccessToken: string;
  /** ISO-8601 expiry date returned by Shopify */
  expiresAt: string;
  /** Shopify customer GID e.g. "gid://shopify/Customer/123" */
  customerId: string;
}

// ─── Crypto helpers ──────────────────────────────────────────────────────────

/**
 * Derives a 256-bit AES-GCM key from SESSION_SECRET using HKDF-SHA-256.
 * Zero-iteration HKDF is effectively free at request time.
 */
async function deriveKey(usage: KeyUsage[]): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "[session] SESSION_SECRET must be set and at least 32 characters long. " +
        "Generate one with: openssl rand -hex 32"
    );
  }
  const encoder = new TextEncoder();
  const raw = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "HKDF",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: encoder.encode("brahmi-auth-v1"),
      info: encoder.encode("session-encryption-key"),
    },
    raw,
    { name: "AES-GCM", length: 256 },
    false,
    usage
  );
}

function base64urlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64urlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// ─── Encrypt / Decrypt ───────────────────────────────────────────────────────

export async function encryptSession(data: SessionData): Promise<string> {
  const key = await deriveKey(["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
  const encoder = new TextEncoder();

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(data))
  );

  // Output: base64url( IV[12] || Ciphertext+GCMTag )
  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.byteLength);
  return base64urlEncode(combined);
}

export async function decryptSession(token: string): Promise<SessionData | null> {
  try {
    const key = await deriveKey(["decrypt"]);
    const combined = base64urlDecode(token);

    if (combined.byteLength < 28) return null; // IV(12) + GCMTag(16) minimum

    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );

    const data = JSON.parse(new TextDecoder().decode(plaintext)) as SessionData;

    // Reject sessions whose Shopify token has already expired
    if (!data.expiresAt || new Date(data.expiresAt) <= new Date()) {
      return null;
    }

    return data;
  } catch {
    // Decryption failure (tampered / wrong key / malformed) — treat as no session
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Read and decrypt the session cookie.
 * Wrapped in React `cache()` so it is computed at most once per request.
 *
 * Returns null if the cookie is absent, tampered, or the Shopify token has expired.
 */
export const getSession = cache(async (): Promise<SessionData | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return null;
  return decryptSession(cookie.value);
});

/**
 * Write an encrypted session cookie.
 *
 * @param data     - Session payload
 * @param maxAge   - Cookie lifetime in seconds (default: 7 days)
 */
export async function setSession(
  data: SessionData,
  maxAge: number = SESSION_7_DAYS
): Promise<void> {
  const cookieStore = await cookies();
  const encrypted = await encryptSession(data);

  cookieStore.set(COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
    path: "/",
  });
}

/**
 * Delete the session cookie server-side.
 * Call this on logout — the client never sees the token.
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Returns true if the Shopify customer access token expires within the next
 * RENEW_THRESHOLD_HOURS hours and should be proactively refreshed.
 */
export function shouldRenewToken(session: SessionData): boolean {
  const expiresAt = new Date(session.expiresAt);
  const threshold = new Date(
    Date.now() + RENEW_THRESHOLD_HOURS * 60 * 60 * 1000
  );
  return expiresAt <= threshold;
}
