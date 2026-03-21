"use client";

import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Globe } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: Sparkles,
            title: "Handmade",
            description: "Supporting and collaborating with artisans who work with handicrafts while promoting traditional Indian techniques of textile development",
        },
        {
            icon: Heart,
            title: "Sustainability",
            description: "Committed to eco friendly practices by using natural fabrics, natural dyes and reducing wastage of resources at the root level",
        },
        {
            icon: Users,
            title: "Community",
            description: "supporting artisans and local clusters of traditional parts of India",
        },
        {
            icon: Globe,
            title: "Made in India",
            description: "Proudly designed in-house and mindfully made by artisans in India.",
        },
    ];

    return (
        <div className="min-h-screen">


            {/* Mission Section */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <FadeIn delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans uppercase">
                                ABOUT THE BRAND
                            </h2>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground max-w-3xl mx-auto mb-6">
                                Brahmi takes its name from one of India’s earliest scripts, the origin point of many written traditions, symbolising foundation, structure, and the beginning of expression. That idea shapes our approach as a brand.
                            </p>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground max-w-3xl mx-auto mb-6">
                                We work at the grassroots level of Indian craft, collaborating with artisan communities across the country and engaging deeply with techniques such as hand embroidery, weaving, and block printing. Our focus is on honouring the integrity and skill embedded in these traditions, while reimagining them through contemporary silhouettes that feel relevant and wearable today.
                            </p>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground max-w-3xl mx-auto">
                                Our vision is to preserve and strengthen India’s handicraft legacy by allowing it to grow with time. Our mission is to carry these stories beyond borders, creating thoughtful garments that celebrate craftsmanship and position Indian craft confidently on a global stage.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="text-center mt-20 -mb-12">
                            <h2 className="text-2xl md:text-4xl font-bold font-sans uppercase">
                                THE FOUR POINTS
                            </h2>
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
                                    <p className="text-muted-foreground font-mono">
                                        {value.description}
                                    </p>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* About the Founders */}
            <section className="py-24 px-4 md:px-8 bg-muted/20">
                <div className="max-w-5xl mx-auto">
                    <FadeIn delay={0.4}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans uppercase">
                                ABOUT THE FOUNDERS
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Pavni */}
                        <FadeIn delay={0.5}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
                            >
                                <h3 className="text-2xl font-bold mb-4 font-sans">PAVNI</h3>
                                <p className="text-muted-foreground font-mono">
                                    Pavni, a textile design graduate from NIFT, approaches design with a deep respect for textiles and the cultures they emerge from. She believes in learning directly from artisans, immersing herself in their processes, materials, and stories. At Brahmi, she works closely with craft communities, ensuring that traditional techniques shape contemporary design while keeping the craft and its makers at the heart of every piece.
                                </p>
                            </motion.div>
                        </FadeIn>

                        {/* Shreya */}
                        <FadeIn delay={0.6}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
                            >
                                <h3 className="text-2xl font-bold mb-4 font-sans">SHREYA</h3>
                                <p className="text-muted-foreground font-mono">
                                    Shreya, also a textile design graduate from NIFT, brings a sharp sensitivity to form, proportion, and detail. Her design process is grounded in construction and the dialogue between material and silhouette. At Brahmi, she translates traditional craft practices into refined, contemporary garments, defining the brand’s aesthetic while ensuring each piece feels thoughtful, wearable, and enduring.
                                </p>
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Founders Note */}
            <section className="py-24 px-4 md:px-8 mb-24">
                <div className="max-w-4xl mx-auto">
                    <FadeIn delay={0.7}>
                        <div className="p-12 rounded-3xl border border-accent/20 bg-accent/5 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Sparkles className="w-24 h-24 text-accent" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-sans uppercase tracking-wider text-accent">
                                FOUNDERS NOTE
                            </h2>
                            <div className="space-y-6">
                                <p className="text-xl md:text-2xl font-mono italic">
                                    &ldquo;Hi there! This is Pavni&hellip; and this is Shreya.&rdquo;
                                </p>
                                <p className="text-lg md:text-xl font-mono text-muted-foreground">
                                    We&rsquo;re batchmates from NIFT Shillong, turned co-founders. From late-night college projects to building Brahmi, we&rsquo;ve brought our individual strengths together. One of us works closely with craft and artisans, the other shapes form, detail, and design language. Different interests, one shared vision. Held together by threads, trust and too many fabric swatches.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
