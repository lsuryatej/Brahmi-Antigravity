"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GalleryItem {
    title: string;
    image: string;
    href: string;
}

interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    autoRotateSpeed?: number;
}

// Responsive dimensions based on known device widths:
// iPhone SE/Mini: 375px, iPhone Pro: 393px, iPhone Pro Max: 430px
// iPad Mini: 744px, iPad Air: 820px, iPad Pro 11": 834px, iPad Pro 12.9": 1024px
// MacBook Air 13": 1440px, MacBook Pro 14": 1512px, MacBook Pro 16": 1728px
function getResponsiveDimensions(width: number) {
    // The 3D magnification factor is: perspective / (perspective - radius)
    // To minimize distortion on small screens, keep perspective >> radius
    if (width < 480) {
        // Phones (iPhone SE 375px → iPhone Pro Max 430px)
        return {
            radius: 140,
            cardWidth: 90,
            cardHeight: 120,
            containerHeight: 300,
            perspective: 1200, // high ratio → minimal magnification
        };
    } else if (width < 768) {
        // Large phones / small tablets
        return {
            radius: 220,
            cardWidth: 130,
            cardHeight: 175,
            containerHeight: 420,
            perspective: 1400,
        };
    } else if (width < 1024) {
        // iPad / tablets (744px → 834px)
        return {
            radius: 350,
            cardWidth: 175,
            cardHeight: 240,
            containerHeight: 550,
            perspective: 1600,
        };
    } else if (width < 1440) {
        // Small laptops / iPad Pro 12.9"
        return {
            radius: 480,
            cardWidth: 220,
            cardHeight: 300,
            containerHeight: 680,
            perspective: 1800,
        };
    } else {
        // MacBook Pro / large desktops (1440px+)
        return {
            radius: 600,
            cardWidth: 280,
            cardHeight: 380,
            containerHeight: 800,
            perspective: 2000,
        };
    }
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
    (
        {
            items,
            className,
            autoRotateSpeed = 0.03,
            ...props
        },
        ref
    ) => {
        const [rotation, setRotation] = useState(0);
        const [isScrolling, setIsScrolling] = useState(false);
        const [dimensions, setDimensions] = useState(
            getResponsiveDimensions(typeof window !== "undefined" ? window.innerWidth : 1440)
        );
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const animationFrameRef = useRef<number | null>(null);
        const sectionRef = useRef<HTMLDivElement>(null);
        const targetRotationRef = useRef(0);
        const currentRotationRef = useRef(0);

        // Update dimensions on resize
        useEffect(() => {
            const handleResize = () => {
                setDimensions(getResponsiveDimensions(window.innerWidth));
            };
            handleResize(); // set initial
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

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
            const lerpFactor = 0.08;

            const animate = () => {
                if (isScrolling) {
                    const diff = targetRotationRef.current - currentRotationRef.current;
                    currentRotationRef.current += diff * lerpFactor;
                } else {
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
        const { radius, cardWidth, cardHeight, containerHeight, perspective } = dimensions;

        return (
            <div
                ref={(el) => {
                    (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                    if (typeof ref === "function") ref(el);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
                }}
                className={cn(
                    "relative w-full flex items-center justify-center",
                    className
                )}
                style={{
                    perspective: `${perspective}px`,
                    height: `${containerHeight}px`,
                    paddingBottom: "40px",
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
                                    width: `${cardWidth}px`,
                                    height: `${cardHeight}px`,
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: `${-cardWidth / 2}px`,
                                    marginTop: `${-cardHeight / 2}px`,
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
                                    <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                        <h3 className="text-xs sm:text-sm md:text-lg font-bold font-sans">
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

