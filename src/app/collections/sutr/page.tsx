"use client";

import { sutrProducts } from "@/lib/mockData/products";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
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
                            <h1 className="text-3xl md:text-7xl font-bold font-sans mb-4 md:mb-8 uppercase">
                                ABOUT THE COLLECTION
                            </h1>
                            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-sm md:text-xl font-mono text-muted-foreground leading-relaxed">
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
                    <StaggerChildren className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-20">
                        {sutrProducts.map((product, index) => (
                            <FadeIn key={product.id} delay={index * 0.1}>
                                <Link href={`/collections/sutr/${product.handle}`}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="group cursor-pointer"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl bg-muted mb-2 md:mb-4">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-background/80 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-1 md:space-y-2">
                                            <h3 className="text-base md:text-xl font-sans font-semibold group-hover:text-accent transition-colors">
                                                {product.title}
                                            </h3>

                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-base md:text-lg font-bold font-mono">
                                                    ₹{product.price.toLocaleString()}
                                                </span>
                                                <span className="text-xs md:text-sm font-mono text-muted-foreground group-hover:text-accent transition-colors hidden md:inline">
                                                    View Details →
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>
        </div>
    );
}
