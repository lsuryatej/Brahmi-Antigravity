"use client";

import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Globe } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: "Passion",
            description: "Dedicated to preserving traditional craftsmanship",
        },
        {
            icon: Users,
            title: "Community",
            description: "Supporting artisans and local communities",
        },
        {
            icon: Sparkles,
            title: "Quality",
            description: "Every piece tells a story of excellence",
        },
        {
            icon: Globe,
            title: "Sustainability",
            description: "Committed to eco-friendly practices",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-transparent via-transparent to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold font-sans mb-6">
                                Our Story
                            </h1>
                            <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                For Culture, Of Culture — A journey through heritage and craft.
                            </p>
                        </motion.div>
                    </FadeIn>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <FadeIn delay={0.2}>
                        <div className="text-center mb-16">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-7xl md:text-9xl mb-8"
                            >
                                ✨
                            </motion.div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans">
                                Crafting Culture
                            </h2>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                We celebrate the artistry of traditional craftsmanship, bringing
                                timeless pieces to modern spaces. Each creation carries the
                                essence of heritage, carefully crafted by skilled artisans.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Values Grid */}
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                        {values.map((value, index) => (
                            <FadeIn key={value.title} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm group"
                                >
                                    <value.icon className="w-10 h-10 mb-4 text-accent group-hover:scale-110 transition-transform" />
                                    <h3 className="text-2xl font-bold mb-3 font-sans">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted-foreground font-mono leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* Team Section (Placeholder) */}
            <section className="py-24 px-4 md:px-8 mb-24 bg-muted/20">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">
                            Meet the Team
                        </h2>
                        <p className="text-lg font-mono text-muted-foreground mb-12 max-w-2xl mx-auto">
                            A collective of passionate individuals dedicated to preserving and
                            promoting cultural artistry.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-block"
                        >
                            <div className="w-full max-w-md mx-auto p-12 rounded-2xl border-2 border-dashed border-border bg-background/50">
                                <div className="text-5xl mb-4">👥</div>
                                <p className="font-mono text-muted-foreground">
                                    Coming Soon
                                </p>
                            </div>
                        </motion.div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
