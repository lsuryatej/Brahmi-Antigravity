"use client";

import { sutrProducts } from "@/lib/mockData/products";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { ProductCard } from "@/components/ui/ProductCard";
import { motion } from "framer-motion";

export default function SutrCollectionPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Description */}
            <section className="relative py-12 md:py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-8 md:mb-16"
                        >
                            <h1 className="text-xl md:text-2xl font-bold font-sans mb-4 md:mb-8 uppercase">
                                ABOUT THE COLLECTION
                            </h1>
                            <div className="max-w-4xl mx-auto space-y-4 md:space-y-5 text-[10px] sm:text-xs md:text-base tracking-tighter [word-spacing:-0.21rem] text-justify leading-relaxed font-mono text-muted-foreground">
                                <p>
                                    Sutr, our first capsule, is a study in beginnings. Meaning &ldquo;thread,&rdquo; it reflects the foundation of cloth and the quiet continuity that binds craft, memory, and time.
                                </p>
                                <p>
                                    The collection centres on kantha hand embroidery by artisans in Gujarat. Built from a simple running stitch, kantha carries a natural rhythm, creating fluid, organic patterns across each garment. Inspired by the charkha and its symbolism of cycles and steady labour, the motifs move freely, never rigid.
                                </p>
                                <p>
                                    Rendered in earth-led tones, clay, rust, indigo, sand, and muted blues, Sutr remains grounded and tactile. It is a collection shaped by process and intention, meant to be carried forward, one stitch at a time.
                                </p>
                            </div>
                        </motion.div>
                    </FadeIn>

                    {/* Product Grid */}
                    <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-20">
                        {sutrProducts.map((product, index) => (
                            <FadeIn key={product.id} delay={index * 0.1}>
                                <ProductCard product={product} />
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>
        </div>
    );
}
