"use client";

/**
 * CartContext — client-side cart state management.
 *
 * The Shopify Storefront Access Token (NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)
 * is intentionally public: Shopify's Storefront API is designed for client-side use.
 * It is scoped to read-only storefront operations (products, cart, checkout).
 * It cannot access customer PII, orders, or admin data.
 *
 * Cart ↔ Customer linking:
 * When a logged-in session is detected, CartProvider calls POST /api/cart/link.
 * That route handler reads the customer access token from the HTTP-only session
 * cookie server-side and calls cartBuyerIdentityUpdate — the token never touches
 * client JavaScript.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (variantId: string, quantity?: number) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

// localStorage key for the cart ID
const CART_STORAGE_KEY = `${SHOPIFY_CONFIG.storefrontAccessToken}.${SHOPIFY_CONFIG.domain}.checkoutId`;

const SHOPIFY_GQL_URL = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

const SHOPIFY_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
};

// 10s timeout for Indian mobile networks
const TIMEOUT_MS = 10_000;

function isValidCartId(cartId: string): boolean {
  return cartId.startsWith("gid://shopify/Cart/");
}

function findCartId(): string | null {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored && isValidCartId(stored)) return stored;
    return null;
  } catch {
    return null;
  }
}

function saveCartId(cartId: string): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, cartId);
  } catch {
    // localStorage not available (SSR, private browsing)
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchShopifyGraphQL<T = Record<string, unknown>>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  let lastError: Error | null = null;

  // 1 retry for Indian network resilience
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetchWithTimeout(SHOPIFY_GQL_URL, {
        method: "POST",
        headers: SHOPIFY_HEADERS,
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`Shopify HTTP ${response.status}`);
      }

      const body = await response.json();

      if (body.errors?.length) {
        throw new Error(body.errors[0].message);
      }

      return body.data as T;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Network error");
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  throw lastError;
}

async function fetchCartCount(cartId: string): Promise<number> {
  const query = `
    query getCart($id: ID!) {
      cart(id: $id) {
        totalQuantity
      }
    }
  `;
  try {
    const data = await fetchShopifyGraphQL<{
      cart: { totalQuantity: number } | null;
    }>(query, { id: cartId });
    return data.cart?.totalQuantity ?? 0;
  } catch {
    return 0;
  }
}

async function createCart(
  variantId: string,
  quantity: number
): Promise<string | null> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id }
        userErrors { message }
      }
    }
  `;
  try {
    const data = await fetchShopifyGraphQL<{
      cartCreate: {
        cart: { id: string } | null;
        userErrors: { message: string }[];
      };
    }>(mutation, {
      input: { lines: [{ merchandiseId: variantId, quantity }] },
    });

    if (data.cartCreate?.userErrors?.length) return null;
    const cartId = data.cartCreate?.cart?.id;
    if (cartId) {
      saveCartId(cartId);
      return cartId;
    }
    return null;
  } catch {
    return null;
  }
}

async function addLineToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<boolean> {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id }
        userErrors { message }
      }
    }
  `;
  try {
    const data = await fetchShopifyGraphQL<{
      cartLinesAdd: {
        cart: { id: string } | null;
        userErrors: { message: string }[];
      };
    }>(mutation, { cartId, lines: [{ merchandiseId: variantId, quantity }] });

    return !data.cartLinesAdd?.userErrors?.length;
  } catch {
    return false;
  }
}

/**
 * Link the current cart to the authenticated customer.
 * Calls the /api/cart/link route handler which reads the session cookie
 * server-side — the customer token never leaves the server.
 */
async function linkCartToCustomer(cartId: string): Promise<void> {
  try {
    await fetch("/api/cart/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId }),
    });
  } catch {
    // Non-fatal — cart continues to work anonymously
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = useCallback(async () => {
    const cartId = findCartId();
    if (!cartId) {
      setCartCount(0);
      return;
    }
    const count = await fetchCartCount(cartId);
    setCartCount(count);
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1): Promise<boolean> => {
      const existingCartId = findCartId();

      let success = false;
      if (existingCartId) {
        success = await addLineToCart(existingCartId, variantId, quantity);
        if (!success) {
          // Stale/expired cart — create fresh
          const newCartId = await createCart(variantId, quantity);
          success = !!newCartId;
          if (newCartId) await linkCartToCustomer(newCartId);
        }
      } else {
        const newCartId = await createCart(variantId, quantity);
        success = !!newCartId;
        if (newCartId) await linkCartToCustomer(newCartId);
      }

      if (success) await refreshCart();
      return success;
    },
    [refreshCart]
  );

  // On mount: load cart count + link existing cart to customer if logged in
  useEffect(() => {
    const init = async () => {
      await refreshCart();
      const cartId = findCartId();
      if (cartId) await linkCartToCustomer(cartId);
    };
    void init();
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
