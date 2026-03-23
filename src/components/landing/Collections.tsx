"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { sutrProducts } from "@/lib/mockData/products";
import { ProductCard } from "@/components/ui/ProductCard";
export const Collections = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observerOptions: IntersectionObserverInit = {
            threshold: [0, 0.1],
            rootMargin: "0px",
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                const visibleRatio = entry.intersectionRatio;
                if (visibleRatio > 0) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((error) => {
                            console.log("Video autoplay prevented:", error.name);
                        });
                    }
                }
                if (visibleRatio < 0.1 && !video.paused) {
                    video.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full bg-background py-8 md:py-24 max-w-screen-2xl mx-auto px-4 md:px-8 space-y-12 md:space-y-24">

            {/* Top Section — 2-col grid for both mobile and desktop */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
                <div className="relative w-full aspect-[4/5] md:h-[80vh] md:aspect-auto">
                    <Image
                        src="/images/collections/group-photo.AVIF"
                        alt="Brahmi Sutr Collection"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 50vw"
                        priority
                    />
                    {/* White text overlay on the photo — bottom positioned */}
                    <div className="absolute inset-x-0 bottom-8 flex items-center justify-center">
                        <Link href="/collections/sutr" className="group flex flex-col items-center">
                            <span className="text-[10px] md:text-sm font-medium tracking-widest border-b-[1px] border-white pb-1 text-white hover:opacity-70 transition-opacity drop-shadow-md">
                                Shop now
                            </span>
                        </Link>
                    </div>
                </div>
                {/* Text Column - Visible on both mobile and laptop */}
                <div className="flex flex-col justify-center h-full px-2">
                    <p className="text-[8px] md:text-base leading-relaxed tracking-tighter [word-spacing:-0.21rem] text-justify font-mono text-muted-foreground">
                        Sutr, our first capsule, is a study in beginnings. Meaning “thread,” it reflects the foundation of cloth and the quiet continuity that binds craft, memory, and time.
                        <span className="hidden md:inline">
                            {" "}The collection centres on kantha hand embroidery by artisans in Gujarat. Built from a simple running stitch, kantha carries a natural rhythm, creating fluid, organic patterns across each garment. Inspired by the charkha and its symbolism of cycles and steady labour, the motifs move freely, never rigid. Rendered in earth-led tones, clay, rust, indigo, sand, and muted blues, Sutr remains grounded and tactile, shaped by process and intention, meant to be carried forward, one stitch at a time.
                        </span>
                    </p>
                </div>
            </div>

            {/* Middle Section (4-column Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-12 md:pb-24">
                {sutrProducts
                    .filter(p => ["kanthi-skirt", "nilaaya-dress", "kaldhaara-pants", "charkha-vest"].includes(p.handle))
                    .map((product) => (
                        <div key={product.id} className="w-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
            </div>

            {/* Bottom Section — 2-col grid for both mobile and desktop */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
                <div className="flex flex-col items-center justify-center h-full">
                    <Link href="/about" className="group flex flex-col items-center text-center">
                        <span className="text-[10px] md:text-[15px] font-medium tracking-widest border-b-[1px] border-black pb-1 hover:opacity-70 transition-opacity">
                            Our journey
                        </span>
                    </Link>
                </div>
                <div className="relative w-full aspect-[4/5] md:h-[70vh] md:aspect-auto">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        loop
                        className="w-full h-full object-cover"
                        src="/videos/artisan_video.mp4"
                    />
                </div>
            </div>

        </section>
    );
};
