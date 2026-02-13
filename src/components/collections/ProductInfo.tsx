"use client";

import { useState } from "react";
import { Product } from "@/lib/mockData/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShopifyBuyButton } from "./ShopifyBuyButton";
import { hasShopifyIntegration, getShopifyProductId } from "@/lib/shopify/productMapping";
import { Accordion } from "@/components/ui/accordion";

interface ProductInfoProps {
    product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const accordionItems = [
        {
            title: "Description",
            content: product.description
        },
        {
            title: "Details",
            content: (
                <div className="space-y-3">
                    <div>
                        <p className="font-semibold mb-1">Material</p>
                        <p className="text-muted-foreground">{product.details.material}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Fit</p>
                        <p className="text-muted-foreground">{product.details.fit}</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Category</p>
                        <p className="text-muted-foreground capitalize">{product.category}</p>
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
            content: product.shipping
        }
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Product Title */}
            <h1 className="text-4xl md:text-5xl font-bold font-sans mb-2">
                {product.title}
            </h1>

            {/* Price */}
            <p className="text-3xl md:text-4xl font-bold font-mono mb-8">
                ₹{product.price.toLocaleString()}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold font-sans">Size</h3>
                    <Link
                        href="/size-chart"
                        className="text-sm font-mono text-muted-foreground hover:text-accent transition-colors underline underline-offset-2"
                    >
                        Size Chart
                    </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => variant.inStock && setSelectedSize(variant.size)}
                            disabled={!variant.inStock}
                            className={`
                                min-w-[4rem] px-5 py-3 rounded-lg border-2 font-mono font-semibold transition-all
                                ${selectedSize === variant.size
                                    ? "border-accent bg-accent text-accent-foreground shadow-md"
                                    : variant.inStock
                                        ? "border-border hover:border-accent hover:bg-accent/5"
                                        : "border-border opacity-30 cursor-not-allowed line-through"
                                }
                            `}
                        >
                            {variant.size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add to Cart / Select a Size Button */}
            {!selectedSize ? (
                // Show disabled "Select a Size" prompt when no size picked
                <Button
                    size="lg"
                    disabled
                    className="w-full mb-8 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-sans py-6 rounded-xl shadow-lg transition-all opacity-70 cursor-not-allowed"
                >
                    Select a Size
                </Button>
            ) : hasShopifyIntegration(product.id) ? (
                // Shopify Buy Button for products with Shopify integration
                <div className="mb-8">
                    <ShopifyBuyButton
                        productId={getShopifyProductId(product.id)!}
                        selectedSize={selectedSize}
                    />
                </div>
            ) : (
                // Default Add to Cart for other products
                <Button
                    size="lg"
                    className="w-full mb-8 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-sans py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                    Add to Cart
                </Button>
            )}

            {/* Product Information Accordion */}
            <Accordion items={accordionItems} allowMultiple={false} />
        </div>
    );
};
