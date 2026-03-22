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

            {/* Top Section */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="relative w-full aspect-[3/4] md:h-[80vh] md:aspect-auto">
                    <Image
                        src="/images/collections/group-photo.AVIF"
                        alt="Brahmi Sutr Collection"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 50vw"
                        priority
                    />
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <Link href="/collections/sutr" className="group flex flex-col items-center">
                        <span className="text-xs md:text-[15px] font-medium tracking-widest border-b-[1px] border-black pb-1 hover:opacity-70 transition-opacity">
                            Shop now
                        </span>
                    </Link>
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

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="flex flex-col items-center justify-center h-full">
                    <Link href="/about#about-founders" className="group flex flex-col items-center text-center">
                        <span className="text-xs md:text-[15px] font-medium tracking-widest border-b-[1px] border-black pb-1 hover:opacity-70 transition-opacity">
                            Our journey
                        </span>
                    </Link>
                </div>
                <div className="relative w-full aspect-[4/3] md:h-[70vh] md:aspect-auto">
                    <video
                        ref={videoRef}
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
