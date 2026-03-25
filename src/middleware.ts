/**
 * Next.js Edge Middleware — session-based route protection.
 *
 * Protected routes: /account, /account/orders, /account/addresses (and sub-paths)
 * Verification: AES-256-GCM decryption via Web Crypto API (Edge-compatible)
 * On failure: redirect to /login?redirect=<original-path>&reason=session-expired
 *
 * The decryption logic mirrors src/lib/session.ts but is inlined here because
 * middleware runs in the Edge Runtime and cannot import Node.js-only modules.
 */

import { type NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "brahmi_session";

// ─── Edge-compatible crypto (mirrors session.ts) ──────────────────────────────

async function deriveKey(secret: string, usage: KeyUsage[]): Promise<CryptoKey> {
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

interface SessionPayload {
  expiresAt?: string;
  customerAccessToken?: string;
}

async function verifySessionCookie(token: string): Promise<boolean> {
  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) return false;

    const key = await deriveKey(secret, ["decrypt"]);
    const combined = base64urlDecode(token);

    // Minimum: IV(12) + GCMTag(16) = 28 bytes
    if (combined.byteLength < 28) return false;

    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );

    const payload = JSON.parse(
      new TextDecoder().decode(plaintext)
    ) as SessionPayload;

    // Reject if Shopify token has expired
    if (!payload.expiresAt) return false;
    if (new Date(payload.expiresAt) <= new Date()) return false;
    if (!payload.customerAccessToken) return false;

    return true;
  } catch {
    // Tampered cookie / wrong key / malformed base64 — reject silently
    return false;
  }
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get(COOKIE_NAME);

  // No cookie → immediate redirect
  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isValid = await verifySessionCookie(sessionCookie.value);

  if (!isValid) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    loginUrl.searchParams.set("reason", "session-expired");

    const response = NextResponse.redirect(loginUrl);
    // Proactively clear the invalid / expired cookie
    response.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all /account sub-routes.
   * Exclude static assets and Next.js internals via negative lookahead.
   */
  matcher: ["/account", "/account/:path*"],
};
