"use client";

import { useState } from "react";
import { Product } from "@/lib/mockData/products";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";

interface ProductInfoProps {
    product: Product;
}

interface InfoPill {
    label: string;
    content: string | React.ReactNode;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [hoveredPill, setHoveredPill] = useState<string | null>(null);

    const infoPills: InfoPill[] = [
        {
            label: "Description",
            content: product.description
        },
        {
            label: "Details",
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
            label: "Product Care",
            content: product.care
        },
        {
            label: "Shipping",
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

            {/* Add to Cart Button */}
            <Button
                size="lg"
                disabled={!selectedSize}
                className="w-full mb-8 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-sans py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
                {selectedSize ? "Add to Cart" : "Select a Size"}
            </Button>

            {/* Info Pills with Hover Overlays */}
            <div className="space-y-4 relative">
                {infoPills.map((pill) => (
                    <div
                        key={pill.label}
                        className="relative"
                        onMouseEnter={() => setHoveredPill(pill.label)}
                        onMouseLeave={() => setHoveredPill(null)}
                    >
                        {/* Pill Button */}
                        <button
                            className="w-full px-5 py-3 rounded-full border-2 border-border bg-background hover:bg-accent/5 hover:border-accent transition-all flex items-center justify-between group"
                        >
                            <span className="font-sans font-semibold">{pill.label}</span>
                            <Info className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                        </button>

                        {/* Hover Overlay Panel */}
                        {hoveredPill === pill.label && (
                            <div className="absolute bottom-full left-0 right-0 mb-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="bg-background/95 backdrop-blur-xl border-2 border-border rounded-2xl p-6 shadow-2xl">
                                    <h4 className="font-sans font-bold text-lg mb-3">{pill.label}</h4>
                                    <div className="font-mono text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {pill.content}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
