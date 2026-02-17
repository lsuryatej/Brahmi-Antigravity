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
                            <h1 className="text-3xl md:text-7xl font-bold font-sans mb-4 md:mb-8">
                                Sutr
                            </h1>
                            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 text-sm md:text-xl font-mono text-muted-foreground leading-relaxed">
                                <p>
                                    Sutr, our first capsule collection, is a quiet beginning, one that honours the thread as both material and metaphor. Sutr means thread: the most essential element of cloth, and the invisible force that binds memory, craft, and continuity. Much like Brahmi, our brand name inspired by one of India&apos;s oldest scripts, Sutr speaks of origins, of marks, lines, and stories that move forward while staying rooted.
                                </p>
                                <p>
                                    At the heart of the collection lies kantha hand embroidery, meticulously embroidered by artisans in Gujarat. Kantha is a storytelling stitch, formed by a single running stitch that moves rhythmically forward, guided entirely by the hand and eye. The needle travels in gentle, continuous motions, creating ripples on fabric that feel almost alive. Our motifs draw from the charkha, a recurring symbol in traditional kantha, representing life&apos;s cycles, quiet labour, and unwavering consistency.
                                </p>
                                <p>
                                    The motifs flow freely across the garments, echoing kantha&apos;s organic movement, never rigid, always evolving. The colour palette mirrors this philosophy: earth-led tones of clay, rust, indigo, sand, muted blues, and sun-warmed neutrals, inspired by soil, sky, and timeworn landscapes. Just as kantha motifs are born from nature and everyday life, the colours of Sutr remain grounded, tactile, and honest.
                                </p>
                                <p>
                                    Sutr is not just worn, it is carried forward, one stitch at a time.
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
