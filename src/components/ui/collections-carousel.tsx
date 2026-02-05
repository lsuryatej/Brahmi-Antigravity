"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the type for a single collection item
export interface Collection {
    id: number;
    title: string;
    description?: string;
    image: string;
    isNew?: boolean;
}

// Define the props for the main component
interface CollectionsCarouselProps {
    collections: Collection[];
    title?: string;
    subtitle?: string;
    className?: string;
}

export const CollectionsCarousel = React.forwardRef<
    HTMLDivElement,
    CollectionsCarouselProps
>(
    (
        {
            collections,
            title = "Our Collections",
            subtitle,
            className,
            ...props
        },
        ref
    ) => {
        const scrollContainerRef = React.useRef<HTMLDivElement>(null);
        const sectionRef = React.useRef<HTMLDivElement>(null);
        const contentRef = React.useRef<HTMLDivElement>(null);
        const [canScrollLeft, setCanScrollLeft] = React.useState(false);
        const [canScrollRight, setCanScrollRight] = React.useState(true);
        const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

        // Check for reduced motion preference
        React.useEffect(() => {
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            setPrefersReducedMotion(mediaQuery.matches);

            const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
            mediaQuery.addEventListener("change", handleChange);

            return () => mediaQuery.removeEventListener("change", handleChange);
        }, []);

        // Scroll-scrubbed animation
        React.useEffect(() => {
            if (prefersReducedMotion || typeof window === "undefined") return;

            let gsapContext: any;

            const initGSAP = async () => {
                const { gsap } = await import("gsap");
                const { ScrollTrigger } = await import("gsap/ScrollTrigger");
                gsap.registerPlugin(ScrollTrigger);

                gsapContext = gsap.context(() => {
                    // Slide up and fade in animation
                    gsap.fromTo(
                        contentRef.current,
                        {
                            y: 100,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 80%",
                                end: "top 30%",
                                scrub: 1,
                            },
                        }
                    );
                }, sectionRef);
            };

            initGSAP();

            return () => {
                if (gsapContext) {
                    gsapContext.revert();
                }
            };
        }, [prefersReducedMotion]);


        // Function to handle scrolling and update arrow visibility
        const checkScrollability = React.useCallback(() => {
            const container = scrollContainerRef.current;
            if (container) {
                const { scrollLeft, scrollWidth, clientWidth } = container;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
            }
        }, []);

        React.useEffect(() => {
            const container = scrollContainerRef.current;
            if (container) {
                checkScrollability();
                container.addEventListener("scroll", checkScrollability);
            }
            return () => {
                if (container) {
                    container.removeEventListener("scroll", checkScrollability);
                }
            };
        }, [collections, checkScrollability]);

        // Scroll handler for navigation buttons
        const scroll = (direction: "left" | "right") => {
            const container = scrollContainerRef.current;
            if (container) {
                const scrollAmount = container.clientWidth * 0.8;
                container.scrollBy({
                    left: direction === "left" ? -scrollAmount : scrollAmount,
                    behavior: "smooth",
                });
            }
        };

        return (
            <section
                ref={sectionRef}
                className={cn("w-full max-w-7xl mx-auto py-16 md:py-24", className)}
                aria-labelledby="collections-heading"
                {...props}
            >
                <div ref={contentRef}>
                    <div className="flex items-center justify-between px-4 sm:px-6 mb-8">
                        <div>
                            <h2
                                id="collections-heading"
                                className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans"
                            >
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-muted-foreground font-mono text-sm md:text-base mt-2">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            {/* Left Arrow Button */}
                            <button
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                                aria-label="Scroll left"
                                className={cn(
                                    "p-3 rounded-full border-2 border-border bg-background text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground hover:border-accent"
                                )}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            {/* Right Arrow Button */}
                            <button
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                                aria-label="Scroll right"
                                className={cn(
                                    "p-3 rounded-full border-2 border-border bg-background text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground hover:border-accent"
                                )}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-6 px-4 sm:px-6"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {collections.map((collection) => (
                            <div
                                key={collection.id}
                                className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] snap-start"
                            >
                                {/* Collection Card */}
                                <div className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-2xl bg-card border border-border mb-4 transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-accent">
                                        <img
                                            src={collection.image}
                                            alt={collection.title}
                                            className="w-full h-[400px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                            <h3 className="text-2xl font-bold text-white mb-2 font-sans">
                                                {collection.title}
                                            </h3>
                                            {collection.description && (
                                                <p className="text-sm text-white/90 font-mono">
                                                    {collection.description}
                                                </p>
                                            )}
                                        </div>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="flex items-center gap-3 px-2">
                                        <h4 className="font-semibold text-foreground text-base sm:text-lg font-sans">
                                            {collection.title}
                                        </h4>
                                        {collection.isNew && (
                                            <span className="text-xs font-bold bg-accent text-accent-foreground px-3 py-1 rounded-full">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile scroll indicator */}
                    <div className="flex sm:hidden justify-center mt-6 gap-2">
                        {collections.map((_, index) => (
                            <div
                                key={index}
                                className="h-1.5 w-1.5 rounded-full bg-muted"
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }
);

CollectionsCarousel.displayName = "CollectionsCarousel";
