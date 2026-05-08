"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/mockData/products";
import { useEffect, useRef, useState } from "react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const videoUrl = product.images.find((url) => url.toLowerCase().endsWith(".mp4"));
    const imageUrl =
        product.images.find((url) => !url.toLowerCase().endsWith(".mp4")) || product.images[0];

    useEffect(() => {
        if (!videoUrl || !cardRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setShouldLoadVideo(true);
                    observer.disconnect();
                });
            },
            { rootMargin: "240px 0px" }
        );

        observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, [videoUrl]);

    useEffect(() => {
        const video = videoRef.current;
        if (!videoUrl || !video || !shouldLoadVideo) return;

        if (video.readyState === 0) {
            video.load();
        }
    }, [shouldLoadVideo, videoUrl]);

    useEffect(() => {
        const video = videoRef.current;
        if (!videoUrl || !video || !shouldLoadVideo) return;

        if (isHovered) {
            const playVideo = () => {
                video.play().catch(() => {});
            };

            if (isVideoReady || video.readyState >= 3) {
                playVideo();
            }

            return;
        }

        video.pause();
        video.currentTime = 0;
    }, [isHovered, isVideoReady, shouldLoadVideo, videoUrl]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setShouldLoadVideo(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link href={`/collections/sutr/${product.handle}`}>
            <motion.div
                ref={cardRef}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="group cursor-pointer flex flex-col"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Product Image / Video */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-2 md:mb-4">
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-cover transition-[transform,opacity] duration-500 ${
                            isHovered ? "scale-105" : ""
                        } ${isHovered && videoUrl && isVideoReady ? "opacity-0" : "opacity-100"}`}
                    />

                    {videoUrl && shouldLoadVideo && (
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            muted
                            loop
                            playsInline
                            poster={imageUrl}
                            preload={isHovered ? "auto" : "metadata"}
                            onCanPlay={() => setIsVideoReady(true)}
                            onLoadedData={() => setIsVideoReady(true)}
                            onError={() => setIsVideoReady(false)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                                isHovered && isVideoReady ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-1 md:space-y-2 text-left">
                    <div className="inline-block border-b-[1px] border-black pb-0.5">
                        <h3 className="text-[8px] md:text-[10px] font-sans font-medium transition-colors">
                            {product.title}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[8px] md:text-[10px] text-muted-foreground font-mono">
                            {product.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
