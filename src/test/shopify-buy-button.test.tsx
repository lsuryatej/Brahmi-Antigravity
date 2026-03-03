/**
 * ShopifyBuyButton.tsx — loadingVariants state and error feedback
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { AddToCartButton } from "@/components/collections/ShopifyBuyButton";

// ── stable mock for addToCart — controlled per test ───────────────────────────
const mockAddToCart = vi.fn().mockResolvedValue(true);

vi.mock("@/lib/CartContext", () => ({
    useCart: () => ({
        addToCart: mockAddToCart,
        cartCount: 0,
        refreshCart: vi.fn(),
    }),
}));

vi.mock("@/lib/shopify/productMapping", () => ({
    SHOPIFY_CONFIG: {
        domain: "test.myshopify.com",
        storefrontAccessToken: "test-token",
        apiVersion: "2026-01",
    },
}));

const VARIANT_RESPONSE = JSON.stringify({
    data: {
        product: {
            variants: {
                edges: [{
                    node: {
                        id: "gid://shopify/ProductVariant/1",
                        title: "L",
                        availableForSale: true,
                        selectedOptions: [{ name: "Size", value: "L" }],
                    },
                }],
            },
        },
    },
});

afterEach(() => {
    vi.restoreAllMocks();
    mockAddToCart.mockReset().mockResolvedValue(true);
});

// ─────────────────────────────────────────────────────────────────────────────
// 10a. Button is disabled while variants are loading
// ─────────────────────────────────────────────────────────────────────────────
describe("AddToCartButton — loadingVariants", () => {
    it("is disabled with Loading label while fetchProductVariants is in-flight", async () => {
        let resolveVariants!: (v: Response) => void;
        const variantPromise = new Promise<Response>((res) => { resolveVariants = res; });
        vi.spyOn(globalThis, "fetch").mockReturnValueOnce(variantPromise);

        render(<AddToCartButton shopifyProductId="123" selectedSize="L" />);

        // Immediately after mount the button should be disabled
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        expect(button.textContent).toMatch(/loading/i);

        // Resolve the fetch
        await act(async () => {
            resolveVariants(new Response(VARIANT_RESPONSE, {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }));
        });

        // After variants load, button should be enabled
        await waitFor(() => expect(screen.getByRole("button")).not.toBeDisabled());
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10b. Error overlay shown when addToCart returns false
// ─────────────────────────────────────────────────────────────────────────────
describe("AddToCartButton — error feedback", () => {
    it("shows failed-to-add message when addToCart returns false", async () => {
        // Variants resolve immediately
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
            new Response(VARIANT_RESPONSE, {
                status: 200,
                headers: { "Content-Type": "application/json" },
            })
        );

        // Make addToCart fail for this test
        mockAddToCart.mockResolvedValue(false);

        render(<AddToCartButton shopifyProductId="123" selectedSize="L" />);

        // Wait for variants to load & button to become enabled
        await waitFor(() => expect(screen.getByRole("button")).not.toBeDisabled());

        // Click Add to Cart
        await act(async () => {
            fireEvent.click(screen.getByRole("button"));
        });

        // Error overlay should appear
        await waitFor(() => {
            expect(screen.getByText(/failed to add/i)).toBeDefined();
        });
    });
});
