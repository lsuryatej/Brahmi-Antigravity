"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";

interface CartContextType {
    cartCount: number;
    refreshCart: () => Promise<void>;
    addToCart: (variantId: string, quantity?: number) => Promise<boolean>;
}

const CartContext = createContext<CartContextType>({
    cartCount: 0,
    refreshCart: async () => { },
    addToCart: async () => false,
});

export const useCart = () => useContext(CartContext);

// localStorage key for the cart ID
const CART_STORAGE_KEY = `${SHOPIFY_CONFIG.storefrontAccessToken}.${SHOPIFY_CONFIG.domain}.checkoutId`;

// Find the cart ID from localStorage (checks both old SDK keys and our own key)
function findCartId(): string | null {
    try {
        // First check our own key
        const ownId = localStorage.getItem(CART_STORAGE_KEY);
        if (ownId) return ownId;

        // Fall back to searching for any key containing "checkoutId" (SDK compatibility)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes("checkoutId")) {
                const value = localStorage.getItem(key);
                if (value) return value;
            }
        }
    } catch {
        // localStorage not available
    }
    return null;
}

function saveCartId(cartId: string) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, cartId);
    } catch {
        // localStorage not available
    }
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
        const response = await fetch(
            `https://${SHOPIFY_CONFIG.domain}/api/2024-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
                },
                body: JSON.stringify({
                    query,
                    variables: { id: cartId },
                }),
            }
        );

        const data = await response.json();
        const cart = data?.data?.cart;
        if (!cart) return 0;

        return cart.totalQuantity || 0;
    } catch {
        return 0;
    }
}

// Create a new cart with a line item
async function createCart(variantId: string, quantity: number): Promise<string | null> {
    const mutation = `
        mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
                cart {
                    id
                }
                userErrors {
                    message
                }
            }
        }
    `;

    try {
        const response = await fetch(
            `https://${SHOPIFY_CONFIG.domain}/api/2024-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        input: {
                            lines: [{ merchandiseId: variantId, quantity }],
                        },
                    },
                }),
            }
        );

        const data = await response.json();
        const cartId = data?.data?.cartCreate?.cart?.id;
        if (cartId) {
            saveCartId(cartId);
            return cartId;
        }
        console.error("Cart creation errors:", data?.data?.cartCreate?.userErrors);
        return null;
    } catch (err) {
        console.error("Failed to create cart:", err);
        return null;
    }
}

// Add a line item to an existing cart
async function addLineToCart(cartId: string, variantId: string, quantity: number): Promise<boolean> {
    const mutation = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                }
                userErrors {
                    message
                }
            }
        }
    `;

    try {
        const response = await fetch(
            `https://${SHOPIFY_CONFIG.domain}/api/2024-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        cartId,
                        lines: [{ merchandiseId: variantId, quantity }],
                    },
                }),
            }
        );

        const data = await response.json();
        const errors = data?.data?.cartLinesAdd?.userErrors;
        if (errors?.length > 0) {
            console.error("Cart add errors:", errors);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Failed to add to cart:", err);
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
        refreshCart();
    }, [refreshCart]);

    return (
        <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
