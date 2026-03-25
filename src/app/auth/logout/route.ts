/**
 * POST /auth/logout
 *
 * Logout handler — server-side only.
 *
 * Steps:
 * 1. Read the customer access token from the encrypted session cookie
 * 2. Call customerAccessTokenDelete on Shopify (server → Shopify, never client)
 * 3. Clear the session cookie with maxAge=0 (immediate expiry)
 * 4. Redirect to /login
 *
 * Why POST and not GET?
 * GET requests can be triggered by <img src="/auth/logout"> or prefetch links.
 * POST requires an intentional form submit or fetch call, preventing
 * accidental/CSRF logout. SameSite=Strict on the cookie adds another layer.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession, clearSession, COOKIE_NAME } from "@/lib/session";
import { customerAccessTokenDelete } from "@/lib/shopify/customer";

export async function POST(request: NextRequest) {
  // Only accept same-origin requests (SameSite=Strict cookie + manual CORS check)
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const session = await getSession();

  if (session?.customerAccessToken) {
    // Invalidate the token on Shopify's side — this prevents reuse even if
    // someone managed to extract the cookie value
    await customerAccessTokenDelete(session.customerAccessToken);
  }

  // Clear the session cookie server-side
  await clearSession();

  // Redirect to login
  const response = NextResponse.redirect(new URL("/login", request.url));

  // Belt-and-suspenders: set cookie to expired in the redirect response too
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
}

// Reject GET requests to prevent accidental logout via link/prefetch
export async function GET() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
