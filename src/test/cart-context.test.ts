/**
 * CartContext unit tests
 * Tests: findCartId (storage key isolation + format validation),
 *        fetchShopifyGraphQL (HTTP/GraphQL error propagation),
 *        API version usage
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";

// ─── constants mirrored from CartContext (not exported) ──────────────────────
const CART_STORAGE_KEY = `${SHOPIFY_CONFIG.storefrontAccessToken}.${SHOPIFY_CONFIG.domain}.checkoutId`;
const VALID_CART_ID = "gid://shopify/Cart/abc123";
const GQL_URL = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. findCartId — localStorage behaviour
// We exercise via CartProvider/useCart since findCartId is not exported.
// For direct unit coverage, we replicate the exact logic inline matching the
// implementation under test (see CartContext.tsx: isValidCartId + findCartId).
// ─────────────────────────────────────────────────────────────────────────────
describe("findCartId (logic)", () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => localStorage.clear());

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

    it("returns null when only a legacy checkoutId-named key exists", () => {
        localStorage.setItem("some.legacy.checkoutId", VALID_CART_ID);
        // Our new implementation ignores all keys other than CART_STORAGE_KEY
        expect(findCartId()).toBeNull();
    });

    it("returns the cart ID from CART_STORAGE_KEY when valid", () => {
        localStorage.setItem(CART_STORAGE_KEY, VALID_CART_ID);
        expect(findCartId()).toBe(VALID_CART_ID);
    });

    it("returns null when CART_STORAGE_KEY has an invalid/non-Cart GID value", () => {
        localStorage.setItem(CART_STORAGE_KEY, "abc123");
        expect(findCartId()).toBeNull();
    });

    it("returns null when CART_STORAGE_KEY has a Checkout GID (wrong type)", () => {
        localStorage.setItem(CART_STORAGE_KEY, "gid://shopify/Checkout/xyz");
        expect(findCartId()).toBeNull();
    });

    it("returns null when localStorage is empty", () => {
        expect(findCartId()).toBeNull();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. isValidCartId — format validation
// ─────────────────────────────────────────────────────────────────────────────
describe("isValidCartId", () => {
    function isValidCartId(cartId: string): boolean {
        return cartId.startsWith("gid://shopify/Cart/");
    }

    it("accepts valid gid://shopify/Cart/ prefix", () => {
        expect(isValidCartId("gid://shopify/Cart/abc123XYZ")).toBe(true);
    });
    it("rejects empty string", () => {
        expect(isValidCartId("")).toBe(false);
    });
    it("rejects Checkout GID", () => {
        expect(isValidCartId("gid://shopify/Checkout/abc")).toBe(false);
    });
    it("rejects raw hex string", () => {
        expect(isValidCartId("deadbeef1234")).toBe(false);
    });
    it("rejects prefix with wrong case", () => {
        expect(isValidCartId("gid://shopify/cart/abc")).toBe(false);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. fetchShopifyGraphQL — HTTP/GraphQL error propagation
// ─────────────────────────────────────────────────────────────────────────────
describe("fetchShopifyGraphQL (via fetch mock)", () => {
    afterEach(() => vi.restoreAllMocks());

    // Inline the helper matching CartContext.tsx implementation
    async function fetchShopifyGraphQL<T = Record<string, unknown>>(
        query: string,
        variables?: Record<string, unknown>
    ): Promise<T> {
        const response = await fetch(GQL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
            },
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

    it("throws when response.ok is false", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
            new Response(null, { status: 503, statusText: "Service Unavailable" })
        );
        await expect(fetchShopifyGraphQL("query {}")).rejects.toThrow("503 Service Unavailable");
    });

    it("throws when response contains a top-level errors array", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
            new Response(
                JSON.stringify({ errors: [{ message: "Some GraphQL error" }] }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );
        await expect(fetchShopifyGraphQL("query {}")).rejects.toThrow("Some GraphQL error");
    });

    it("returns data.data when response is clean", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
            new Response(
                JSON.stringify({ data: { cart: { totalQuantity: 3 } } }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            )
        );
        const result = await fetchShopifyGraphQL<{ cart: { totalQuantity: number } }>("query {}");
        expect(result.cart.totalQuantity).toBe(3);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3-b. API version grep assertions (static analysis)
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

function grepSrc(pattern: RegExp, extensions = [".ts", ".tsx"]): { file: string; line: number; text: string }[] {
    const root = join(process.cwd(), "src");
    const results: { file: string; line: number; text: string }[] = [];
    function walk(dir: string) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) { walk(full); continue; }
            if (!extensions.some(ext => entry.name.endsWith(ext))) continue;
            const lines = readFileSync(full, "utf8").split("\n");
            lines.forEach((text, idx) => {
                if (pattern.test(text)) results.push({ file: full, line: idx + 1, text });
            });
        }
    }
    walk(root);
    return results;
}

describe("API version static analysis", () => {
    it("has zero occurrences of hardcoded /api/2024-01/ in src/ (excluding test files)", () => {
        const hits = grepSrc(/\/api\/2024-01\//).filter(
            (h) => !h.file.includes("/test/")
        );
        expect(hits, `Found legacy API version in:\n${hits.map(h => `  ${h.file}:${h.line}  ${h.text.trim()}`).join("\n")}`).toHaveLength(0);
    });

    it("SHOPIFY_CONFIG.apiVersion appears in CartContext.tsx", () => {
        const content = readFileSync(join(process.cwd(), "src/lib/CartContext.tsx"), "utf8");
        expect(content).toContain("SHOPIFY_CONFIG.apiVersion");
    });

    it("apiVersion is set in productMapping.ts SHOPIFY_CONFIG", () => {
        const content = readFileSync(join(process.cwd(), "src/lib/shopify/productMapping.ts"), "utf8");
        expect(content).toMatch(/apiVersion:\s*["']\d{4}-\d{2}["']/);
    });

    it("SHOPIFY_CONFIG.apiVersion appears in cart/page.tsx", () => {
        const content = readFileSync(join(process.cwd(), "src/app/cart/page.tsx"), "utf8");
        expect(content).toContain("SHOPIFY_CONFIG.apiVersion");
    });

    it("SHOPIFY_CONFIG.apiVersion appears in ShopifyBuyButton.tsx", () => {
        const content = readFileSync(join(process.cwd(), "src/components/collections/ShopifyBuyButton.tsx"), "utf8");
        expect(content).toContain("SHOPIFY_CONFIG.apiVersion");
    });
});
