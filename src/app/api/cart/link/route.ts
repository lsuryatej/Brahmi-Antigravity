/**
 * POST /api/cart/link
 *
 * Links an anonymous cart to the authenticated customer.
 * Called client-side after login or when the cart page mounts for a logged-in user.
 *
 * Security: reads customerAccessToken from the HTTP-only session cookie.
 * The client passes only the cartId (which is a public GID); the token
 * is never sent to or from the client.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { cartBuyerIdentityUpdate } from "@/lib/shopify/queries";

export async function POST(request: NextRequest) {
  const session = await getSession();

  // Not logged in — nothing to link
  if (!session) {
    return NextResponse.json({ linked: false, reason: "not-authenticated" });
  }

  let cartId: string;
  try {
    const body = (await request.json()) as { cartId?: string };
    cartId = body.cartId ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!cartId || !cartId.startsWith("gid://shopify/Cart/")) {
    return NextResponse.json({ error: "Invalid cart ID" }, { status: 400 });
  }

  await cartBuyerIdentityUpdate(cartId, session.customerAccessToken);

  return NextResponse.json({ linked: true });
}
