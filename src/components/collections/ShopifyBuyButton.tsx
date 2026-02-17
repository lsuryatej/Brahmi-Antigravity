"use client";

import { useEffect, useRef, useState } from "react";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";

interface ShopifyBuyButtonProps {
    productId: string;
    selectedSize?: string | null;
}

declare global {
    interface Window {
        ShopifyBuy?: {
            buildClient: (config: {
                domain: string;
                storefrontAccessToken: string;
            }) => any;
            UI?: {
                onReady: (client: any) => Promise<any>;
            };
        };
    }
}

export const ShopifyBuyButton = ({ productId, selectedSize }: ShopifyBuyButtonProps) => {
    const buyButtonContainerRef = useRef<HTMLDivElement>(null);
    const shopifyComponentRef = useRef<any>(null);
    const isInitialized = useRef(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const confirmationTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Watch for cart becoming active (item added) via MutationObserver
    useEffect(() => {
        let observer: MutationObserver | null = null;

        const startObserving = () => {
            const cartFrame = document.querySelector('.shopify-buy-frame--cart');
            if (!cartFrame) {
                // Cart frame may not exist yet; retry shortly
                setTimeout(startObserving, 1000);
                return;
            }

            observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target as HTMLElement;
                        if (target.classList.contains('is-active')) {
                            // Cart just opened — item was added
                            if (confirmationTimerRef.current) {
                                clearTimeout(confirmationTimerRef.current);
                            }
                            setShowConfirmation(true);
                            confirmationTimerRef.current = setTimeout(() => {
                                setShowConfirmation(false);
                            }, 2000);
                        }
                    }
                }
            });

            observer.observe(cartFrame, { attributes: true, attributeFilter: ['class'] });
        };

        // Start observing after a short delay to let the SDK initialize
        const initTimer = setTimeout(startObserving, 2000);

        return () => {
            clearTimeout(initTimer);
            if (observer) observer.disconnect();
            if (confirmationTimerRef.current) clearTimeout(confirmationTimerRef.current);
        };
    }, []);

    // Initialize the Shopify Buy Button once
    useEffect(() => {
        if (isInitialized.current) return;

        const loadShopifyScript = () => {
            // Check if script already exists
            if (document.querySelector('script[src*="buy-button-storefront.min.js"]')) {
                if (window.ShopifyBuy?.UI) {
                    initShopifyBuyButton();
                }
                return;
            }

            const script = document.createElement("script");
            script.async = true;
            script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
            script.onload = initShopifyBuyButton;
            document.head.appendChild(script);
        };

        const initShopifyBuyButton = () => {
            if (!window.ShopifyBuy || !window.ShopifyBuy.UI) return;
            if (!buyButtonContainerRef.current) return;
            if (isInitialized.current) return;

            const client = window.ShopifyBuy.buildClient({
                domain: SHOPIFY_CONFIG.domain,
                storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
            });

            window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
                if (!buyButtonContainerRef.current) return;

                const component = ui.createComponent("product", {
                    id: productId,
                    node: buyButtonContainerRef.current,
                    moneyFormat: "Rs.%20%7B%7Bamount%7D%7D",
                    options: {
                        product: {
                            styles: {
                                product: {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0px",
                                        "margin-bottom": "0px",
                                    },
                                },
                                title: {
                                    display: "none",
                                },
                                button: {
                                    "font-family": "Geneva, sans-serif",
                                    "font-size": "16px",
                                    "padding-top": "16px",
                                    "padding-bottom": "16px",
                                    "color": "#f7f2e4",
                                    ":hover": {
                                        "color": "#f7f2e4",
                                        "background-color": "#a82914",
                                    },
                                    "background-color": "#63180c",
                                    ":focus": {
                                        "background-color": "#a82914",
                                    },
                                    "border-radius": "12px",
                                    width: "100%",
                                },
                                quantityInput: {
                                    "font-size": "13px",
                                    "padding-top": "14.5px",
                                    "padding-bottom": "14.5px",
                                },
                                price: {
                                    display: "none",
                                },
                                compareAt: {
                                    display: "none",
                                },
                                // Hide Shopify's own variant/option selector since we use our custom one
                                options: {
                                    display: "none",
                                },
                            },
                            contents: {
                                img: false,
                                imgWithCarousel: false,
                                title: false,
                                price: false,
                                options: false, // Disable Shopify's variant selector
                            },
                            text: {
                                button: "Add to Cart",
                            },
                        },
                        cart: {
                            styles: {
                                button: {
                                    "font-family": "Geneva, sans-serif",
                                    "font-size": "13px",
                                    "padding-top": "14.5px",
                                    "padding-bottom": "14.5px",
                                    "color": "#f7f2e4",
                                    ":hover": {
                                        "color": "#f7f2e4",
                                        "background-color": "#a82914",
                                    },
                                    "background-color": "#63180c",
                                    ":focus": {
                                        "background-color": "#a82914",
                                    },
                                },
                            },
                            text: {
                                total: "Subtotal",
                                button: "Checkout",
                            },
                        },
                        toggle: {
                            styles: {
                                toggle: {
                                    "font-family": "Geneva, sans-serif",
                                    "background-color": "#63180c",
                                    ":hover": {
                                        "background-color": "#a82914",
                                    },
                                    ":focus": {
                                        "background-color": "#a82914",
                                    },
                                },
                                count: {
                                    "font-size": "13px",
                                    "color": "#f7f2e4",
                                    ":hover": {
                                        "color": "#f7f2e4",
                                    },
                                },
                                iconPath: {
                                    fill: "#f7f2e4",
                                },
                            },
                        },
                    },
                });

                shopifyComponentRef.current = component;
                isInitialized.current = true;
            });
        };

        loadShopifyScript();
    }, [productId]);

    // Sync selected size to Shopify SDK's variant selector
    useEffect(() => {
        if (!selectedSize || !shopifyComponentRef.current) return;

        try {
            const component = shopifyComponentRef.current;
            // The SDK stores the product model with variants
            const product = component?.model;
            if (!product?.variants) return;

            // Find the variant that matches the selected size
            const matchingVariant = product.variants.find((v: any) => {
                // Shopify variants have an optionValues array or selectedOptions
                const optionTitle = v.title || "";
                const optionValues = v.optionValues?.map((ov: any) => ov.value || ov.name) || [];

                return (
                    optionTitle.toLowerCase() === selectedSize.toLowerCase() ||
                    optionValues.some((val: string) =>
                        val.toLowerCase() === selectedSize.toLowerCase()
                    )
                );
            });

            if (matchingVariant) {
                // Use the SDK's internal method to select this variant
                component.selectedVariant = matchingVariant;
                component.updateConfig({
                    product: {
                        variantId: matchingVariant.id,
                    },
                });
            }
        } catch {
            // Silently fail if SDK structure doesn't match
        }
    }, [selectedSize]);

    return (
        <div className="relative w-full">
            <div ref={buyButtonContainerRef} className="w-full" />

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
