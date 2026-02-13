"use client";

import { useEffect, useRef } from "react";
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

    return <div ref={buyButtonContainerRef} className="w-full" />;
};
