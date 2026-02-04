"use client";

import { mockProducts } from "@/lib/mockData/products";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { motion } from "framer-motion";

export default function SutrCollectionPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Description */}
            <section className="relative py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold font-sans mb-8">
                                Sutr Collection
                            </h1>
                            <div className="max-w-4xl mx-auto space-y-4 text-lg md:text-xl font-mono text-muted-foreground leading-relaxed">
                                <p>
                                    The Sutr collection embodies the timeless art of handwoven textiles,
                                    where every thread tells a story of tradition and craftsmanship. Our
                                    carefully curated selection features garments created by skilled artisans
                                    who have inherited techniques passed down through generations.
                                </p>
                                <p>
                                    From naturally dyed fabrics to intricate weaving patterns, each piece
                                    celebrates the rich heritage of Indian textiles while embracing contemporary
                                    design. We believe in slow fashion—clothing that honors both the maker and
                                    the wearer, crafted with mindfulness and an unwavering commitment to quality.
                                    Discover garments that transcend trends and become cherished wardrobe staples.
                                </p>
                            </div>
                        </motion.div>
                    </FadeIn>

                    {/* Product Grid */}
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                        {mockProducts.map((product, index) => (
                            <FadeIn key={product.id} delay={index * 0.1}>
                                <Link href={`/catalogue/sutr/${product.handle}`}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="group cursor-pointer"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted mb-4">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-mono uppercase tracking-wider">
                                                    {product.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-sans font-semibold group-hover:text-accent transition-colors">
                                                {product.title}
                                            </h3>
                                            <p className="text-sm font-mono text-muted-foreground line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-lg font-bold font-mono">
                                                    ₹{product.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm font-mono text-muted-foreground group-hover:text-accent transition-colors">
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
