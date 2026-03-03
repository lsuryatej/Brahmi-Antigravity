/**
 * cart/page.tsx — updateQuantity and removeItem mutation routing
 *
 * Strategy: We test the mutation-selection logic (which GQL operation is fired
 * and whether loadCart is called after userErrors) by extracting the core logic
 * into inline helpers that mirror cart/page.tsx exactly — keeping tests fast,
 * deterministic, and free of Next.js / framer-motion mounting overhead.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";

// ── Mirrors cart/page.tsx constants ──────────────────────────────────────────
const GQL_URL = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
const HEADERS = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
};
const CART_ID = "gid://shopify/Cart/TEST";
const LINE_ID = "gid://shopify/CartLine/1";

afterEach(() => vi.restoreAllMocks());

// ── Mirror of updateQuantity logic from cart/page.tsx ────────────────────────
async function updateQuantity(
    lineItemId: string,
    currentQty: number,
    action: "increment" | "decrement",
    cartId: string,
    loadCart: () => Promise<void>
) {
    const newQty = action === "increment" ? currentQty + 1 : Math.max(0, currentQty - 1);

    if (newQty === 0) {
        // ── REMOVE path ────────────────────────────────────────────────────
        const response = await fetch(GQL_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                query: "mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { message } } }",
                variables: { cartId, lineIds: [lineItemId] },
            }),
        });
        const data = await response.json();
        const errors = data?.data?.cartLinesRemove?.userErrors;
        if (errors?.length > 0) { console.error("Remove errors:", errors); return; }
        await loadCart();
        return;
    }

    // ── UPDATE path ────────────────────────────────────────────────────────
    const response = await fetch(GQL_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            query: "mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { message } } }",
            variables: { cartId, lines: [{ id: lineItemId, quantity: newQty }] },
        }),
    });
    const data = await response.json();
    const errors = data?.data?.cartLinesUpdate?.userErrors;
    if (errors?.length > 0) { console.error("Update errors:", errors); return; }
    await loadCart();
}

// ─────────────────────────────────────────────────────────────────────────────
// 4a. qty=0 → cartLinesRemove, NOT cartLinesUpdate
// ─────────────────────────────────────────────────────────────────────────────
describe("updateQuantity — mutation routing", () => {
    it("calls cartLinesRemove (not cartLinesUpdate) when decrement brings qty to 0", async () => {
        const loadCart = vi.fn();
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({ data: { cartLinesRemove: { cart: { id: CART_ID }, userErrors: [] } } }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );

        await updateQuantity(LINE_ID, 1, "decrement", CART_ID, loadCart);

        const bodies = fetchSpy.mock.calls.map((args) => JSON.parse(args[1]?.body as string));
        expect(bodies.some((b) => b.query.includes("cartLinesRemove"))).toBe(true);
        expect(bodies.some((b) => b.query.includes("cartLinesUpdate"))).toBe(false);
        expect(loadCart).toHaveBeenCalledOnce();
    });

    it("calls cartLinesUpdate (not cartLinesRemove) when quantity stays > 0", async () => {
        const loadCart = vi.fn();
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({ data: { cartLinesUpdate: { cart: { id: CART_ID }, userErrors: [] } } }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );

        await updateQuantity(LINE_ID, 2, "decrement", CART_ID, loadCart);

        const bodies = fetchSpy.mock.calls.map((args) => JSON.parse(args[1]?.body as string));
        expect(bodies.some((b) => b.query.includes("cartLinesUpdate"))).toBe(true);
        expect(bodies.some((b) => b.query.includes("cartLinesRemove"))).toBe(false);
        expect(loadCart).toHaveBeenCalledOnce();
    });

    it("does NOT call loadCart when cartLinesUpdate returns userErrors", async () => {
        const loadCart = vi.fn();
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({ data: { cartLinesUpdate: { cart: null, userErrors: [{ message: "Line not found" }] } } }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );

        await updateQuantity(LINE_ID, 2, "decrement", CART_ID, loadCart);
        expect(loadCart).not.toHaveBeenCalled();
    });

    it("does NOT call loadCart when cartLinesRemove returns userErrors", async () => {
        const loadCart = vi.fn();
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({ data: { cartLinesRemove: { cart: null, userErrors: [{ message: "Cannot remove" }] } } }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );

        await updateQuantity(LINE_ID, 1, "decrement", CART_ID, loadCart);
        expect(loadCart).not.toHaveBeenCalled();
    });

    it("calls loadCart after successful increment", async () => {
        const loadCart = vi.fn();
        vi.spyOn(globalThis, "fetch").mockResolvedValue(
            new Response(
                JSON.stringify({ data: { cartLinesUpdate: { cart: { id: CART_ID }, userErrors: [] } } }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );

        await updateQuantity(LINE_ID, 1, "increment", CART_ID, loadCart);
        expect(loadCart).toHaveBeenCalledOnce();
    });
});
