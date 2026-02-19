"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GalleryItem {
    title: string;
    image: string;
    href: string;
}

interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    radius?: number;
    autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
    (
        {
            items,
            className,
            radius = 600,
            autoRotateSpeed = 0.03,
            ...props
        },
        ref
    ) => {
        const [rotation, setRotation] = useState(0);
        const [isScrolling, setIsScrolling] = useState(false);
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const animationFrameRef = useRef<number | null>(null);
        const sectionRef = useRef<HTMLDivElement>(null);
        const targetRotationRef = useRef(0);
        const currentRotationRef = useRef(0);

        // Scroll-driven rotation — sets a target, not the actual value
        useEffect(() => {
            const handleScroll = () => {
                if (!sectionRef.current) return;

                setIsScrolling(true);
                if (scrollTimeoutRef.current)
                    clearTimeout(scrollTimeoutRef.current);

                const rect = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                const totalTravel = rect.height + windowHeight;
                const traveled = windowHeight - rect.top;
                const progress = Math.max(0, Math.min(1, traveled / totalTravel));

                // 1.5 full rotations — controlled pace through all products
                targetRotationRef.current = progress * 540;

                scrollTimeoutRef.current = setTimeout(
                    () => setIsScrolling(false),
                    150
                );
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        // Unified animation loop: lerp toward scroll target OR auto-rotate
        useEffect(() => {
            const lerpFactor = 0.08; // smoothing factor (lower = smoother/slower)

            const animate = () => {
                if (isScrolling) {
                    // Lerp current rotation toward scroll target
                    const diff = targetRotationRef.current - currentRotationRef.current;
                    currentRotationRef.current += diff * lerpFactor;
                } else {
                    // Auto-rotate when idle
                    currentRotationRef.current += autoRotateSpeed;
                    targetRotationRef.current = currentRotationRef.current;
                }
                setRotation(currentRotationRef.current);
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animationFrameRef.current = requestAnimationFrame(animate);
            return () => {
                if (animationFrameRef.current)
                    cancelAnimationFrame(animationFrameRef.current);
            };
        }, [isScrolling, autoRotateSpeed]);

        const anglePerItem = 360 / items.length;

        return (
            <div
                ref={(el) => {
                    // Merge forwarded ref and internal ref
                    (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                    if (typeof ref === "function") ref(el);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
                }}
                className={cn(
                    "relative w-full flex items-center justify-center",
                    className
                )}
                style={{
                    perspective: "2000px",
                    height: "min(90vh, 800px)",
                    paddingBottom: "60px",
                }}
                {...props}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `rotateY(${rotation}deg)`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;
                        const relativeAngle =
                            ((itemAngle + (rotation % 360)) % 360 + 360) % 360;
                        const normalizedAngle = Math.abs(
                            relativeAngle > 180
                                ? 360 - relativeAngle
                                : relativeAngle
                        );
                        // Cosine-based opacity: full opacity in front (~0-60°),
                        // sharp drop-off for side/back cards (>90°)
                        const cosVal = Math.cos(
                            (normalizedAngle / 180) * Math.PI
                        );
                        const opacity = Math.max(
                            0.15,
                            (cosVal + 1) / 2
                        );

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="absolute block"
                                style={{
                                    width: "clamp(180px, 22vw, 280px)",
                                    height: "clamp(240px, 30vw, 380px)",
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "clamp(-90px, -11vw, -140px)",
                                    marginTop: "clamp(-120px, -15vw, -190px)",
                                    opacity: opacity,
                                    transition: "opacity 0.3s linear",
                                }}
                            >
                                <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden group border border-border bg-card/70 backdrop-blur-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                        <h3 className="text-sm md:text-lg font-bold font-sans">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
);

CircularGallery.displayName = "CircularGallery";
export { CircularGallery };
