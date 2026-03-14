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

// Responsive dimensions using viewport-proportional values.
// Instead of fixed pixel breakpoints, we compute dimensions as a fraction
// of the actual viewport width (vw), so the carousel scales naturally on
// any screen — from iPhone SE (375px) to 4K desktops.
//
// The 3D magnification at the front card is: perspective / (perspective - radius).
// We keep perspective ≈ 10× radius so magnification stays ≈ 1.11× (subtle).
function getResponsiveDimensions(width: number) {
    // Base multipliers that change by breakpoint
    let radiusMult: number;
    let cardWMult: number;
    let cardHMult: number;
    let containerHMult: number;
    let perspMult: number;
    let padBottom: number;

    if (width < 480) {
        // Phones — iPhone SE (375) → iPhone Pro Max (440)
        radiusMult = 0.42;   
        cardWMult = 0.20;    
        cardHMult = 0.35;    
        containerHMult = 0.70; 
        perspMult = 4.5;     
        padBottom = 16;
    } else if (width < 768) {
        // Large phones / small tablets / landscape phones
        radiusMult = 0.35;
        cardWMult = 0.25;
        cardHMult = 0.35;
        containerHMult = 0.70;
        perspMult = 3.5;
        padBottom = 16;
    } else if (width < 1024) {
        // iPad mini (744) → iPad Pro 11" (834)
        radiusMult = 0.35;
        cardWMult = 0.17;
        cardHMult = 0.23;
        containerHMult = 0.52;
        perspMult = 2.4;
        padBottom = 24;
    } else if (width < 1440) {
        // iPad Pro 13" (1024) / small laptops
        radiusMult = 0.33;
        cardWMult = 0.155;
        cardHMult = 0.21;
        containerHMult = 0.47;
        perspMult = 2.0;
        padBottom = 32;
    } else {
        // MacBook Pro / large desktops (1440px+)
        radiusMult = 0.35;
        cardWMult = 0.17;
        cardHMult = 0.23;
        containerHMult = 0.50;
        perspMult = 1.6;
        padBottom = 40;
    }

    return {
        // Enforce minimum sizes to ensure mobile usability
        radius: Math.max(150, Math.round(width * radiusMult)),
        cardWidth: Math.max(80, Math.round(width * cardWMult)),
        cardHeight: Math.max(160, Math.round(width * cardHMult)),
        containerHeight: Math.max(300, Math.round(width * containerHMult)),
        perspective: Math.max(1000, Math.round(width * perspMult)),
        paddingBottom: padBottom,
    };
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
        const [isTouching, setIsTouching] = useState(false);
        const [dimensions, setDimensions] = useState(
            getResponsiveDimensions(1440)
        );
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const animationFrameRef = useRef<number | null>(null);
        const sectionRef = useRef<HTMLDivElement>(null);
        const targetRotationRef = useRef(0);
        const currentRotationRef = useRef(0);

        // Touch gesture refs
        const touchStartXRef = useRef(0);
        const touchStartRotationRef = useRef(0);

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
                if (!sectionRef.current || isTouching) return;

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
            return () => {
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                    scrollTimeoutRef.current = null;
                }
                window.removeEventListener("scroll", handleScroll);
            };
        }, [isTouching]);

        // Touch/swipe support for mobile — allows swiping left/right to rotate
        const handleTouchStart = useCallback((e: React.TouchEvent) => {
            if (e.touches.length !== 1) return;
            setIsTouching(true);
            touchStartXRef.current = e.touches[0].clientX;
            touchStartRotationRef.current = currentRotationRef.current;
        }, []);

        const handleTouchMove = useCallback((e: React.TouchEvent) => {
            if (!isTouching || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - touchStartXRef.current;
            // Map horizontal swipe distance to degrees of rotation
            // Negative because swiping left should rotate "forward"
            const sensitivity = 0.4; // degrees per CSS pixel of swipe
            const newRotation = touchStartRotationRef.current - deltaX * sensitivity;
            targetRotationRef.current = newRotation;
            currentRotationRef.current = newRotation;
        }, [isTouching]);

        const handleTouchEnd = useCallback(() => {
            setIsTouching(false);
        }, []);

        // Unified animation loop: lerp toward scroll target OR auto-rotate
        useEffect(() => {
            if (items.length === 0) {
                if (animationFrameRef.current)
                    cancelAnimationFrame(animationFrameRef.current);
                return;
            }

            const lerpFactor = 0.08;

            const animate = () => {
                if (isTouching) {
                    // During touch, rotation is set directly in handleTouchMove
                } else if (isScrolling) {
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
        }, [isScrolling, isTouching, autoRotateSpeed, items.length]);

        const anglePerItem = items.length > 0 ? 360 / items.length : 0;
        const { radius, cardWidth, cardHeight, containerHeight, perspective, paddingBottom } = dimensions;

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
                    paddingBottom: `${paddingBottom}px`,
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
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
                                        <h3 className="text-[7px] sm:text-xs md:text-sm lg:text-lg font-bold font-sans leading-tight">
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

