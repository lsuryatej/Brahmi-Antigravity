"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/mockData/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AddToCartButton, AddToCartByVariantId, fetchProductVariants, ShopifyVariant } from "./ShopifyBuyButton";
import { hasShopifyIntegration, getShopifyProductId } from "@/lib/shopify/productMapping";
import { Accordion } from "@/components/ui/accordion";
import { SizeChartIsland } from "./SizeChartIsland";

interface ProductInfoProps {
    product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const shopifyProductId = getShopifyProductId(product.id);
    const isShopifyProduct = hasShopifyIntegration(product.id);

    // Live variant availability from Shopify — drives size button states
    const [shopifyVariants, setShopifyVariants] = useState<ShopifyVariant[]>([]);
    const [variantsLoading, setVariantsLoading] = useState(isShopifyProduct);

    useEffect(() => {
        if (!isShopifyProduct || !shopifyProductId) return;
        setVariantsLoading(true);
        void fetchProductVariants(shopifyProductId)
            .then((v) => {
                setShopifyVariants(v);
                setVariantsLoading(false);
            })
            .catch(() => setVariantsLoading(false));
    }, [isShopifyProduct, shopifyProductId]);

    /**
     * Returns true if a size is available for sale.
     * Uses live Shopify data when available, falls back to mock data.
     */
    const isSizeAvailable = (size: string): boolean => {
        if (isShopifyProduct && !variantsLoading && shopifyVariants.length > 0) {
            const match = shopifyVariants.find((v) => {
                const sizeOpt = v.selectedOptions.find(
                    (opt) => opt.name.toLowerCase() === "size"
                );
                return sizeOpt
                    ? sizeOpt.value.toLowerCase() === size.toLowerCase()
                    : v.title.toLowerCase() === size.toLowerCase();
            });
            return match?.availableForSale ?? false;
        }
        // Fallback: use mock data inStock flag
        return product.variants.find((v) => v.size === size)?.inStock ?? false;
    };

    /** Get the matched Shopify variant for the currently selected size */
    const getSelectedVariant = (): ShopifyVariant | undefined => {
        if (!selectedSize || shopifyVariants.length === 0) return undefined;
        if (shopifyVariants.length === 1) return shopifyVariants[0];
        return shopifyVariants.find((v) => {
            const sizeOpt = v.selectedOptions.find(
                (opt) => opt.name.toLowerCase() === "size"
            );
            return sizeOpt
                ? sizeOpt.value.toLowerCase() === selectedSize.toLowerCase()
                : v.title.toLowerCase() === selectedSize.toLowerCase();
        });
    };

    const accordionItems = [
        {
            title: "Details",
            content: (
                <div className="space-y-2 md:space-y-3">
                    <div>
                        <p className="font-semibold mb-0.5">Material</p>
                        <p>{product.details.material}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-0.5">Fit</p>
                        <p>{product.details.fit}</p>
                    </div>
                    {product.details.color && (
                        <div>
                            <p className="font-semibold mb-0.5">Color/Dye</p>
                            <p>{product.details.color}</p>
                        </div>
                    )}
                    {product.details.technique && (
                        <div>
                            <p className="font-semibold mb-0.5">Technique</p>
                            <p>{product.details.technique}</p>
                        </div>
                    )}
                    <div>
                        <p className="font-semibold mb-0.5">Category</p>
                        <p className="capitalize">{product.category}</p>
                    </div>
                </div>
            )
        },
        {
            title: "Product Care",
            content: product.care
        },
        {
            title: "Shipping",
            content: (
                <div className="text-muted-foreground">
                    <div className="whitespace-pre-line">
                        {product.shipping
                            .split("\n")
                            .filter((line) => !line.includes("(link of shipping and return page)"))
                            .join("\n")}
                    </div>
                    <Link
                        href="/shipping-returns"
                        className="inline-flex items-center gap-1 font-mono text-[10px] md:text-sm underline underline-offset-2 text-foreground/70 hover:text-foreground transition-colors mt-1"
                    >
                        Shipping &amp; Returns Policy ↗
                    </Link>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Product Title */}
            <h1 className="text-base md:text-xl font-bold font-sans mb-2">
                {product.title}
            </h1>

            {/* Price */}
            <p className="text-sm md:text-base font-bold font-mono mb-4 md:mb-6">
                ₹{product.price.toLocaleString()}
            </p>

            {/* Product Description */}
            <div className="mb-6 md:mb-8">
                <div className="text-[10px] md:text-base leading-relaxed tracking-tighter [word-spacing:-0.21rem] text-justify font-mono text-muted-foreground whitespace-pre-line">
                    {(() => {
                        const parts = product.description.split(/\n\n(?=(?:Note|Notes|NOTE|NOTES))/i);
                        if (parts.length > 1) {
                            return (
                                <>
                                    {parts[0]}
                                    <div className="mt-4 text-[7px] md:text-xs leading-relaxed tracking-tighter [word-spacing:-0.21rem] text-justify font-mono italic opacity-80">
                                        {parts.slice(1).join("\n\n")}
                                    </div>
                                </>
                            );
                        }
                        return product.description;
                    })()}
                </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base md:text-lg font-semibold font-sans">Size</h3>
                    {product.sizeChart ? (
                        <SizeChartIsland sizeChart={product.sizeChart} />
                    ) : (
                        <span className="text-sm font-mono text-muted-foreground/40">
                            Size Chart
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => {
                        const available = isSizeAvailable(variant.size);
                        return (
                            <button
                                key={variant.id}
                                onClick={() => available && setSelectedSize(variant.size)}
                                disabled={!available || variantsLoading}
                                className={`
                                    min-w-[3rem] md:min-w-[4rem] px-3 py-2 md:px-5 md:py-3 rounded-lg border-2 font-mono text-sm md:text-base font-semibold transition-all
                                    ${variantsLoading
                                        ? "border-border opacity-50 animate-pulse cursor-wait"
                                        : selectedSize === variant.size
                                            ? "border-accent bg-accent text-accent-foreground shadow-md"
                                            : available
                                                ? "border-border hover:border-accent hover:bg-accent/5"
                                                : "border-border opacity-30 cursor-not-allowed line-through"
                                    }
                                `}
                            >
                                {variant.size}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Add to Cart / Select a Size Button */}
            {!selectedSize ? (
                <Button
                    size="lg"
                    disabled
                    className="w-full mb-6 md:mb-8 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-sans py-4 md:py-6 rounded-xl shadow-lg transition-all opacity-70 cursor-not-allowed"
                >
                    Select a Size
                </Button>
            ) : isShopifyProduct ? (
                // Use pre-resolved variant ID — no second Shopify fetch needed
                <div className="mb-8">
                    {(() => {
                        const variant = getSelectedVariant();
                        return variant ? (
                            <AddToCartByVariantId
                                variantId={variant.id}
                                availableForSale={variant.availableForSale}
                            />
                        ) : (
                            <AddToCartButton
                                shopifyProductId={shopifyProductId!}
                                selectedSize={selectedSize}
                            />
                        );
                    })()}
                </div>
            ) : (
                <Button
                    size="lg"
                    className="w-full mb-6 md:mb-8 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-sans py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                    Add to Cart
                </Button>
            )}

            {/* Product Information Accordion */}
            <Accordion items={accordionItems} allowMultiple={false} />
        </div>
    );
};
