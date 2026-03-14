"use client";

import { FadeIn, StaggerChildren } from "@/lib/motion/primitives";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Globe } from "lucide-react";

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: "Sustainability",
            description: "Committed to eco friendly practices by using natural fabrics, natural dyes and reducing wastage of resources at the root level",
        },
        {
            icon: Users,
            title: "Community",
            description: "Supporting artisans and local clusters of traditional parts of India",
        },
        {
            icon: Sparkles,
            title: "Handmade",
            description: "Supporting and collaborating with artisans who work with handicrafts while promoting traditional Indian techniques of textile development",
        },
        {
            icon: Globe,
            title: "Made in India",
            description: "Proudly designed and made in India",
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
                                For Culture, Of Culture
                            </h1>
                            <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                A journey through heritage and craft.
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans uppercase">
                                ABOUT THE BRAND
                            </h2>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
                                Brahmi takes its name from one of India’s earliest scripts—the origin point of many written traditions—symbolising foundation, structure, and the beginning of expression. That idea shapes our approach as a brand.
                            </p>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
                                We work at the grassroots level of Indian craft, collaborating with artisan communities across the country and engaging deeply with techniques such as hand embroidery, weaving, and block printing. Our focus is on honouring the integrity and skill embedded in these traditions, while reimagining them through contemporary silhouettes that feel relevant and wearable today.
                            </p>
                            <p className="text-lg md:text-xl font-mono text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                Our vision is to preserve and strengthen India’s handicraft legacy by allowing it to grow with time. Our mission is to carry these stories beyond borders—creating thoughtful garments that celebrate craftsmanship and position Indian craft confidently on a global stage.
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

            {/* About the Founders */}
            <section className="py-24 px-4 md:px-8 mb-24 bg-muted/20">
                <div className="max-w-5xl mx-auto">
                    <FadeIn delay={0.4}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans">
                                About the Founders
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
                                <h3 className="text-2xl font-bold mb-4 font-sans">Pavni</h3>
                                <p className="text-muted-foreground font-mono leading-relaxed">
                                    Pavni is a textile design graduate from NIFT with a deep sensitivity towards textiles and the cultures they belong to. Her approach to design is rooted in learning from artisans, understanding their processes, materials, and stories at the source. At Brahmi, she focuses on working collaboratively with craft communities, allowing traditional techniques to guide contemporary expression while keeping the craft and its makers at the forefront.
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
                                <h3 className="text-2xl font-bold mb-4 font-sans">Shreya</h3>
                                <p className="text-muted-foreground font-mono leading-relaxed">
                                    Shreya is a textile design graduate from NIFT with a strong sensitivity towards form, balance, and detail. Her approach is rooted in understanding proportion, construction, and the relationship between material and silhouette. At Brahmi, she focuses on translating traditional craft techniques into refined, contemporary garments; shaping the brand&apos;s design language while ensuring every piece feels intentional and considered.
                                </p>
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
}
