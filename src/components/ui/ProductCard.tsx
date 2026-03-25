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
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-2 md:mb-4">
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : ''} ${isHovered && videoUrl ? 'opacity-0' : 'opacity-100'}`}
                    />
                    
                    {videoUrl && (
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            muted
                            loop
                            playsInline
                            preload="none"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
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
