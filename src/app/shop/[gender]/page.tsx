"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { sutrProducts, getProductsByGender } from "@/lib/mockData/products";
import type { Product } from "@/lib/mockData/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const CATEGORY_LABELS: Record<Product["category"], string> = {
    jacket: "Jackets",
    vest: "Vests",
    top: "Tops",
    shirt: "Shirts",
    dress: "Dresses",
    skirt: "Skirts",
    pants: "Pants",
};

function ShopContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const gender = params.gender as string;

    if (gender !== "women" && gender !== "men") {
        notFound();
    }

    const genderProducts = getProductsByGender(gender as Product["gender"]);
    const activeCategory = searchParams.get("category") as Product["category"] | null;

    // Unique categories present for this gender, in a fixed display order
    const categoryOrder: Product["category"][] = ["jacket", "vest", "top", "shirt", "dress", "skirt", "pants"];
    const availableCategories = categoryOrder.filter(cat =>
        genderProducts.some(p => p.category === cat)
    );

    const filteredProducts = activeCategory
        ? genderProducts.filter(p => p.category === activeCategory)
        : genderProducts;

    const setCategory = (cat: Product["category"] | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (cat) {
            params.set("category", cat);
        } else {
            params.delete("category");
        }
        router.push(`/shop/${gender}?${params.toString()}`, { scroll: false });
    };

    const heading = gender === "women" ? "WOMEN" : "MEN";

    return (
        <div className="min-h-screen">
            <section className="relative py-12 md:py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-8 md:mb-16"
                        >
                            <h1 className="text-xl md:text-2xl font-bold font-sans mb-6 md:mb-10 uppercase">
                                {heading}
                            </h1>

                            {/* Filter Pills */}
                            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                                <button
                                    onClick={() => setCategory(null)}
                                    className={`px-4 py-1.5 rounded-full border font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                                        !activeCategory
                                            ? "bg-accent text-accent-foreground border-accent"
                                            : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                                    }`}
                                >
                                    All
                                </button>
                                {availableCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full border font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                                            activeCategory === cat
                                                ? "bg-accent text-accent-foreground border-accent"
                                                : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                                        }`}
                                    >
                                        {CATEGORY_LABELS[cat]}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </FadeIn>

                    {/* Product Grid */}
                    <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <FadeIn key={product.id} delay={index * 0.1}>
                                    <ProductCard product={product} />
                                </FadeIn>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 text-muted-foreground font-mono text-xs">
                                No products found.
                            </div>
                        )}
                    </StaggerChildren>
                </div>
            </section>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense>
            <ShopContent />
        </Suspense>
    );
}
