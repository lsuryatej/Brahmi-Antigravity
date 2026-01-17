"use client";

import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { motion } from "framer-motion";
import { Package, Search, Grid3x3 } from "lucide-react";

export default function CataloguePage() {
    const categories = [
        { name: "Ceramics", count: 0, icon: Package },
        { name: "Textiles", count: 0, icon: Grid3x3 },
        { name: "Woodwork", count: 0, icon: Search },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-transparent via-transparent to-transparent">
                <div className="max-w-6xl mx-auto text-center">
                    <FadeIn>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold font-sans mb-6">
                                Our Collection
                            </h1>
                            <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-3xl mx-auto">
                                Curating culture, one piece at a time.
                            </p>
                        </motion.div>
                    </FadeIn>
                </div>
            </section>

            {/* Coming Soon Section */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0.2}>
                        <div className="text-center mb-16">
                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="inline-block"
                            >
                                <div className="text-6xl md:text-8xl mb-6">📦</div>
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
                                Coming Soon
                            </h2>
                            <p className="text-lg font-mono text-muted-foreground max-w-2xl mx-auto">
                                We&apos;re carefully curating our collection. Check back soon to
                                explore our handcrafted treasures.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Category Preview */}
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        {categories.map((category) => (
                            <FadeIn key={category.name}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center group cursor-not-allowed opacity-60"
                                >
                                    <category.icon className="w-12 h-12 mx-auto mb-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <h3 className="text-xl font-semibold mb-2 font-sans">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm font-mono text-muted-foreground">
                                        {category.count} items
                                    </p>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 px-4 md:px-8 mb-24">
                <FadeIn delay={0.4}>
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-4 font-sans">
                            Be the first to know
                        </h3>
                        <p className="text-muted-foreground font-mono mb-6">
                            Subscribe to our newsletter for updates on new arrivals.
                        </p>
                        <div className="flex gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background font-mono text-sm"
                                disabled
                            />
                            <button
                                className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-sans opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Notify Me
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
