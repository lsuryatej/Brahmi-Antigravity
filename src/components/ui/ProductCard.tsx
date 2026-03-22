"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/mockData/products";
import { useState, useRef } from "react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const videoUrl = product.images.find(url => url.toLowerCase().endsWith('.mp4'));
    const imageUrl = product.images.find(url => !url.toLowerCase().endsWith('.mp4')) || product.images[0];

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Link href={`/collections/sutr/${product.handle}`}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group cursor-pointer flex flex-col"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Product Image / Video */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl bg-muted mb-2 md:mb-4">
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : ''} ${isHovered && videoUrl ? 'opacity-0' : 'opacity-100'}`}
                    />
                    
                    {videoUrl && (
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            muted
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10 text-left">
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-background/80 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1 md:space-y-2 text-left">
                    <h3 className="text-[10px] md:text-xl font-sans font-semibold group-hover:text-accent transition-colors">
                        {product.title}
                    </h3>

                    <div className="flex items-center justify-between pt-1 md:pt-2">
                        <span className="text-[10px] md:text-lg font-bold font-mono">
                            ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-[8px] md:text-sm font-mono text-muted-foreground group-hover:text-accent transition-colors hidden md:inline">
                            View Details →
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
