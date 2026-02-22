"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";
import { useCart } from "@/lib/CartContext";

interface AddToCartButtonProps {
    shopifyProductId: string;
    selectedSize: string | null;
}

interface ShopifyVariant {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: { name: string; value: string }[];
}

// Fetch product variants from the Shopify Storefront API
async function fetchProductVariants(productId: string): Promise<ShopifyVariant[]> {
    const query = `
        query getProduct($id: ID!) {
            product(id: $id) {
                variants(first: 30) {
                    edges {
                        node {
                            id
                            title
                            availableForSale
                            selectedOptions {
                                name
                                value
                            }
                        }
                    }
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
                    query,
                    variables: { id: `gid://shopify/Product/${productId}` },
                }),
            }
        );

        const data = await response.json();
        return data?.data?.product?.variants?.edges?.map((e: any) => e.node) || [];
    } catch {
        return [];
    }
}

export const AddToCartButton = ({ shopifyProductId, selectedSize }: AddToCartButtonProps) => {
    const [variants, setVariants] = useState<ShopifyVariant[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const confirmationTimerRef = useRef<NodeJS.Timeout | null>(null);
    const { addToCart } = useCart();

    // Fetch variants on mount
    useEffect(() => {
        fetchProductVariants(shopifyProductId).then(setVariants);
    }, [shopifyProductId]);

    // Find the variant that matches the selected size
    const findMatchingVariant = useCallback((): ShopifyVariant | undefined => {
        if (!selectedSize || variants.length === 0) return undefined;

        // If only one variant ("Default Title"), use it
        if (variants.length === 1) return variants[0];

        // Match by selectedOptions (e.g. Size: "M")
        return variants.find((v) => {
            const sizeOption = v.selectedOptions.find(
                (opt) => opt.name.toLowerCase() === "size"
            );
            if (sizeOption) {
                return sizeOption.value.toLowerCase() === selectedSize.toLowerCase();
            }
            // Fall back to matching variant title
            return v.title.toLowerCase() === selectedSize.toLowerCase();
        });
    }, [selectedSize, variants]);

    const handleAddToCart = async () => {
        const variant = findMatchingVariant();
        if (!variant) return;

        setIsLoading(true);
        const success = await addToCart(variant.id, 1);
        setIsLoading(false);

        if (success) {
            // Show "Added ✓" confirmation
            if (confirmationTimerRef.current) {
                clearTimeout(confirmationTimerRef.current);
            }
            setShowConfirmation(true);
            confirmationTimerRef.current = setTimeout(() => {
                setShowConfirmation(false);
            }, 2000);
        }
    };

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (confirmationTimerRef.current) clearTimeout(confirmationTimerRef.current);
        };
    }, []);

    const matchedVariant = findMatchingVariant();
    const isDisabled = !matchedVariant || !matchedVariant.availableForSale || isLoading;

    return (
        <div className="relative w-full">
            <button
                onClick={handleAddToCart}
                disabled={isDisabled}
                className={`
                    w-full py-4 px-6 rounded-xl text-base font-sans font-semibold
                    transition-all duration-200
                    ${isDisabled
                        ? "bg-[#63180c]/50 text-[#f7f2e4]/70 cursor-not-allowed"
                        : "bg-[#63180c] text-[#f7f2e4] hover:bg-[#a82914] shadow-lg hover:shadow-xl active:scale-[0.98]"
                    }
                `}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#f7f2e4] border-t-transparent rounded-full animate-spin" />
                        Adding...
                    </span>
                ) : (
                    "Add to Cart"
                )}
            </button>

            {/* "Added ✓" confirmation overlay */}
            <div
                className={`
                    absolute inset-0 flex items-center justify-center
                    bg-[#2d7d46] rounded-xl
                    transition-all duration-300 ease-out pointer-events-none
                    ${showConfirmation
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }
                `}
                aria-live="polite"
            >
                <span className="text-white text-lg font-sans font-semibold flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    Added to Cart
                </span>
            </div>
        </div>
    );
};
