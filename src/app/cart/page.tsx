"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOPIFY_CONFIG } from "@/lib/shopify/productMapping";

interface CartLineItem {
    id: string;
    title: string;
    variantTitle: string;
    quantity: number;
    price: string;
    currencyCode: string;
    imageUrl: string;
    variantId: string;
}

interface CartData {
    id: string;
    lineItems: CartLineItem[];
    subtotal: string;
    checkoutUrl: string;
    lineItemCount: number;
}

// Find the checkout ID stored by the Shopify Buy Button SDK in localStorage
function findCheckoutId(): string | null {
    try {
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

// Fetch checkout data directly from Shopify Storefront API via GraphQL
async function fetchCheckout(checkoutId: string): Promise<CartData | null> {
    const query = `
        query getCheckout($id: ID!) {
            node(id: $id) {
                ... on Checkout {
                    id
                    webUrl
                    subtotalPrice {
                        amount
                        currencyCode
                    }
                    lineItems(first: 50) {
                        edges {
                            node {
                                id
                                title
                                quantity
                                variant {
                                    id
                                    title
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    image {
                                        url
                                    }
                                }
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
                    variables: { id: checkoutId },
                }),
            }
        );

        const data = await response.json();
        const checkout = data?.data?.node;

        if (!checkout) return null;

        const lineItems: CartLineItem[] = checkout.lineItems.edges.map(
            (edge: any) => {
                const item = edge.node;
                const variant = item.variant;
                return {
                    id: item.id,
                    title: item.title,
                    variantTitle: variant?.title || "",
                    quantity: item.quantity,
                    price: `₹${parseFloat(variant?.price?.amount || "0").toLocaleString("en-IN")}`,
                    currencyCode: variant?.price?.currencyCode || "INR",
                    imageUrl: variant?.image?.url || "",
                    variantId: variant?.id || "",
                };
            }
        );

        return {
            id: checkout.id,
            lineItems,
            subtotal: `₹${parseFloat(checkout.subtotalPrice.amount).toLocaleString("en-IN")}`,
            checkoutUrl: checkout.webUrl,
            lineItemCount: lineItems.reduce((sum, item) => sum + item.quantity, 0),
        };
    } catch (err) {
        console.error("Failed to fetch checkout:", err);
        return null;
    }
}

export default function CartPage() {
    const [cart, setCart] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadCart = useCallback(async () => {
        const checkoutId = findCheckoutId();
        if (!checkoutId) {
            setCart(null);
            setLoading(false);
            return;
        }

        const cartData = await fetchCheckout(checkoutId);
        setCart(cartData);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    // Update quantity via Storefront API
    const updateQuantity = async (lineItemId: string, currentQty: number, action: "increment" | "decrement") => {
        if (!cart?.id) return;
        const newQty = action === "increment" ? currentQty + 1 : Math.max(0, currentQty - 1);

        const mutation = `
            mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
                checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
                    checkout { id }
                    checkoutUserErrors { message }
                }
            }
        `;

        try {
            await fetch(
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
                            checkoutId: cart.id,
                            lineItems: [{ id: lineItemId, quantity: newQty }],
                        },
                    }),
                }
            );
            // Re-fetch cart data
            await loadCart();
        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    };

    // Remove item via Storefront API
    const removeItem = async (lineItemId: string) => {
        if (!cart?.id) return;

        const mutation = `
            mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
                checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
                    checkout { id }
                    checkoutUserErrors { message }
                }
            }
        `;

        try {
            await fetch(
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
                            checkoutId: cart.id,
                            lineItemIds: [lineItemId],
                        },
                    }),
                }
            );
            await loadCart();
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    // Redirect to Shopify checkout
    const handleCheckout = () => {
        if (cart?.checkoutUrl) {
            window.location.href = cart.checkoutUrl;
        }
    };

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: "url('/images/plain-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-mono text-muted-foreground">Loading your cart...</p>
                </motion.div>
            </div>
        );
    }

    const isEmpty = !cart || cart.lineItems.length === 0;

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundImage: "url('/images/plain-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/collections/sutr"
                        className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                </motion.div>

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <ShoppingBag className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl md:text-5xl font-bold font-sans">Your Cart</h1>
                    </div>
                    {!isEmpty && (
                        <p className="text-sm font-mono text-muted-foreground ml-12">
                            {cart.lineItemCount} {cart.lineItemCount === 1 ? "item" : "items"}
                        </p>
                    )}
                </motion.div>

                {isEmpty ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-sans font-semibold mb-3">
                            Your cart is empty
                        </h2>
                        <p className="text-muted-foreground font-mono text-sm mb-8 max-w-md">
                            Looks like you haven&apos;t added anything yet. Explore our
                            handcrafted collection and find something you love.
                        </p>
                        <Link href="/collections/sutr">
                            <Button
                                size="lg"
                                className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans px-8 py-4 rounded-xl shadow-lg"
                            >
                                Browse Collection
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    /* Cart Content */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Line Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {cart.lineItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex gap-4 md:gap-6 p-4 md:p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm"
                                    >
                                        {/* Product Image */}
                                        <div className="relative w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                            {item.imageUrl ? (
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="h-8 w-8 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div>
                                                <h3 className="text-base md:text-lg font-sans font-semibold truncate">
                                                    {item.title}
                                                </h3>
                                                {item.variantTitle && item.variantTitle !== "Default Title" && (
                                                    <p className="text-xs md:text-sm font-mono text-muted-foreground mt-1">
                                                        Size: {item.variantTitle}
                                                    </p>
                                                )}
                                                <p className="text-base md:text-lg font-bold font-mono mt-2">
                                                    {item.price}
                                                </p>
                                            </div>

                                            {/* Quantity Controls + Remove */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity, "decrement")}
                                                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center font-mono text-sm font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity, "increment")}
                                                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-1"
                        >
                            <div className="sticky top-24 p-6 md:p-8 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm">
                                <h2 className="text-lg font-sans font-semibold mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm font-mono">
                                        <span className="text-muted-foreground">
                                            Subtotal ({cart.lineItemCount}{" "}
                                            {cart.lineItemCount === 1 ? "item" : "items"})
                                        </span>
                                        <span className="font-semibold">{cart.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-mono">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-muted-foreground italic">
                                            Calculated at checkout
                                        </span>
                                    </div>
                                    <div className="h-px bg-border my-2" />
                                    <div className="flex justify-between font-mono">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-lg font-bold">{cart.subtotal}</span>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    onClick={handleCheckout}
                                    className="w-full bg-[#63180c] hover:bg-[#a82914] text-[#f7f2e4] font-sans text-base py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    Proceed to Checkout
                                </Button>

                                <p className="text-[10px] font-mono text-muted-foreground text-center mt-4">
                                    Shipping & taxes calculated at checkout
                                </p>

                                <div className="h-px bg-border my-6" />

                                <Link
                                    href="/collections/sutr"
                                    className="flex items-center justify-center gap-2 text-sm font-mono text-muted-foreground hover:text-accent transition-colors"
                                >
                                    <ArrowLeft className="h-3 w-3" />
                                    Continue Shopping
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
