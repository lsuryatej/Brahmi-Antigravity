"use client";

import { useState } from "react";
import { Product } from "@/lib/mockData/products";
import { Button } from "@/components/ui/button";
import { ProductDetailsButtons } from "./ProductDetailsModal";
import { Minus, Plus } from "lucide-react";

interface ProductInfoProps {
    product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
    };

    const modalSections = [
        {
            title: "Product Specifications",
            content: (
                <div className="space-y-4 font-mono text-sm">
                    <div>
                        <h4 className="font-bold mb-2">Material</h4>
                        <p className="text-muted-foreground">{product.specifications.material}</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Fit</h4>
                        <p className="text-muted-foreground">{product.specifications.fit}</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Category</h4>
                        <p className="text-muted-foreground capitalize">{product.category}</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Wash & Care",
            content: (
                <div className="space-y-4 font-mono text-sm">
                    <p className="text-muted-foreground">{product.specifications.care}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Do not bleach</li>
                        <li>Iron on low to medium heat</li>
                        <li>Do not tumble dry on high heat</li>
                        <li>Store in a cool, dry place</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Shipping & Returns",
            content: (
                <div className="space-y-4 font-mono text-sm">
                    <div>
                        <h4 className="font-bold mb-2">Shipping</h4>
                        <p className="text-muted-foreground">
                            Free shipping on orders above ₹2,000. Standard delivery takes 5-7 business days.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Returns</h4>
                        <p className="text-muted-foreground">
                            30-day return policy. Items must be unworn, unwashed, and with tags attached.
                            Original packaging required.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Exchange</h4>
                        <p className="text-muted-foreground">
                            Free size exchanges available within 15 days of delivery.
                        </p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-8">
            {/* Title & Price */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">{product.title}</h1>
                <p className="text-3xl font-bold font-mono">₹{product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Description</h3>
                <p className="text-muted-foreground font-mono leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selector */}
            <div>
                <h3 className="text-lg font-semibold mb-3 font-sans">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => variant.inStock && setSelectedSize(variant.size)}
                            disabled={!variant.inStock}
                            className={`
                                px-6 py-3 rounded-lg border-2 font-mono font-semibold transition-all
                                ${selectedSize === variant.size
                                    ? "border-accent bg-accent text-accent-foreground"
                                    : variant.inStock
                                        ? "border-border hover:border-accent"
                                        : "border-border opacity-40 cursor-not-allowed line-through"
                                }
                            `}
                        >
                            {variant.size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity Selector */}
            <div>
                <h3 className="text-lg font-semibold mb-3 font-sans">Quantity</h3>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-mono text-lg font-semibold">{quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <Button
                size="lg"
                disabled={!selectedSize}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-sans"
            >
                {selectedSize ? "Add to Cart" : "Select a Size"}
            </Button>

            {/* Return Policy Quick Info */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm font-mono text-muted-foreground">
                    <span className="font-semibold text-foreground">Free Returns:</span> 30-day return policy.
                    Unworn items with tags attached.
                </p>
            </div>

            {/* Detail Buttons */}
            <div>
                <h3 className="text-lg font-semibold mb-3 font-sans">More Information</h3>
                <ProductDetailsButtons sections={modalSections} />
            </div>
        </div>
    );
};
