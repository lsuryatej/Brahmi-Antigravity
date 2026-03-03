"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
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

/**
 * Format-only check: valid Shopify Cart GIDs start with gid://shopify/Cart/
 * No network call — purely structural validation.
 */
function isValidCartId(cartId: string): boolean {
    return cartId.startsWith("gid://shopify/Cart/");
}

/** Returns the Cart GID saved by this app, validated by format. Returns null if absent or invalid. */
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
        // localStorage not available
    }
}

/**
 * Shared Shopify Storefront GraphQL helper.
 * Throws if the HTTP response is not ok, or if the response contains GraphQL errors.
 * Returns the `data` field of the response body.
 */
async function fetchShopifyGraphQL<T = Record<string, unknown>>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    const response = await fetch(SHOPIFY_GQL_URL, {
        method: "POST",
        headers: SHOPIFY_HEADERS,
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(`Shopify GraphQL HTTP error: ${response.status} ${response.statusText}`);
    }

    const body = await response.json();

    if (body.errors?.length) {
        throw new Error(`Shopify GraphQL errors: ${body.errors.map((e: { message: string }) => e.message).join(", ")}`);
    }

    return body.data as T;
}

// Fetch total quantity from Shopify Cart API
async function fetchCartCount(cartId: string): Promise<number> {
    const query = `
        query getCart($id: ID!) {
            cart(id: $id) {
                totalQuantity
            }
        }
    `;

    try {
        const data = await fetchShopifyGraphQL<{ cart: { totalQuantity: number } | null }>(query, { id: cartId });
        return data.cart?.totalQuantity ?? 0;
    } catch (err) {
        console.error("fetchCartCount failed:", err);
        return 0;
    }
}

// Create a new cart with a line item; returns the new cart GID or null on failure
async function createCart(variantId: string, quantity: number): Promise<string | null> {
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
            cartCreate: { cart: { id: string } | null; userErrors: { message: string }[] };
        }>(mutation, { input: { lines: [{ merchandiseId: variantId, quantity }] } });

        const userErrors = data.cartCreate?.userErrors;
        if (userErrors?.length) {
            console.error("Cart creation userErrors:", userErrors);
            return null;
        }

        const cartId = data.cartCreate?.cart?.id;
        if (cartId) {
            saveCartId(cartId);
            return cartId;
        }
        return null;
    } catch (err) {
        console.error("createCart failed:", err);
        return null;
    }
}

// Add a line item to an existing cart; returns true on success
async function addLineToCart(cartId: string, variantId: string, quantity: number): Promise<boolean> {
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
            cartLinesAdd: { cart: { id: string } | null; userErrors: { message: string }[] };
        }>(mutation, { cartId, lines: [{ merchandiseId: variantId, quantity }] });

        const userErrors = data.cartLinesAdd?.userErrors;
        if (userErrors?.length) {
            console.error("Cart add userErrors:", userErrors);
            return false;
        }
        return true;
    } catch (err) {
        console.error("addLineToCart failed:", err);
        return false;
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

    const addToCart = useCallback(async (variantId: string, quantity: number = 1): Promise<boolean> => {
        const existingCartId = findCartId();

        let success = false;
        if (existingCartId) {
            success = await addLineToCart(existingCartId, variantId, quantity);
            // If the stored cartId is stale/expired, recover by creating a fresh cart
            if (!success) {
                const newCartId = await createCart(variantId, quantity);
                success = !!newCartId;
            }
        } else {
            const newCartId = await createCart(variantId, quantity);
            success = !!newCartId;
        }

        if (success) {
            await refreshCart();
        }
        return success;
    }, [refreshCart]);

    // Fetch cart count on initial mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void refreshCart();
    }, [refreshCart]);

    return (
        <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
