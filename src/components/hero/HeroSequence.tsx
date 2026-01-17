"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/motion/tokens";

export const HeroSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const layer1Ref = useRef<HTMLDivElement>(null);
    const layer2Ref = useRef<HTMLDivElement>(null);
    const layer3Ref = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // IntersectionObserver for video playback control
        const observerOptions: IntersectionObserverInit = {
            threshold: [0, 0.01, 0.1],
            rootMargin: "0px",
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                const visibleRatio = entry.intersectionRatio;

                if (visibleRatio > 0) {
                    // ANY visibility - start playing
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((error) => {
                            console.log("Video autoplay prevented:", error.name);
                        });
                    }
                }

                // Pause if visibility drops below 10%
                if (visibleRatio < 0.1 && !video.paused) {
                    video.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        observer.observe(video);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (prefersReducedMotion || typeof window === "undefined") return;

        let gsapContext: any;

        const initGSAP = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsapContext = gsap.context(() => {
                // Single unified pin for smooth scroll experience
                const mainTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=150%", // Extended from 100% to 150% for smoother, longer experience
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        scrub: 1,
                    },
                });

                // Logo scale and fade out animation
                mainTimeline.fromTo(
                    logoRef.current,
                    { scale: 1, opacity: 1 },
                    { scale: 1.06, opacity: 0, ease: "none" },
                    0
                );

                // Video scrub upward from off-screen
                mainTimeline.fromTo(
                    videoContainerRef.current,
                    {
                        yPercent: 100,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        ease: "none",
                    },
                    0
                );

                // Background parallax layers
                mainTimeline.to(
                    layer1Ref.current,
                    {
                        y: "10%",
                        ease: "none",
                    },
                    0
                );

                mainTimeline.to(
                    layer2Ref.current,
                    {
                        y: "20%",
                        ease: "none",
                    },
                    0
                );

                mainTimeline.to(
                    layer3Ref.current,
                    {
                        y: "30%",
                        ease: "none",
                    },
                    0
                );

                // No second pin - video scrolls away naturally for smooth experience
            }, containerRef);
        };

        initGSAP();

        return () => {
            if (gsapContext) {
                gsapContext.revert();
            }
        };
    }, [prefersReducedMotion]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
            {/* Layer 1: Base Gradient Overlay */}
            <div
                ref={layer1Ref}
                className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none"
            />

            {/* Layer 2: Soft Ambient Glow */}
            <div
                ref={layer2Ref}
                className="absolute z-10 w-[90%] h-[90%] rounded-full bg-secondary/30 blur-3xl pointer-events-none"
            />

            {/* Layer 3: Inner Glow Overlay */}
            <div
                ref={layer3Ref}
                className="absolute z-20 w-[60%] h-[60%] rounded-full bg-primary/10 blur-2xl pointer-events-none"
            />

            {/* Video Container - Slides up from below */}
            <div
                ref={videoContainerRef}
                className="absolute inset-0 z-25 flex items-center justify-center"
            >
                <div
                    ref={videoWrapRef}
                    className="w-[90%] md:w-[80%] aspect-video rounded-2xl overflow-hidden shadow-2xl"
                >
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="auto"
                        loop
                        className="w-full h-full object-cover"
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    />
                </div>
            </div>

            {/* Grain Overlay - Above content but below text/logo */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-40 opacity-[0.08] mix-blend-soft-light"
                style={{
                    backgroundImage:
                        "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E')",
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Content (Logo) - Stays pinned with subtle zoom */}
            <div className="relative z-50 flex flex-col items-center justify-center p-4">
                <motion.div
                    ref={logoRef}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: EASE.ENTRANCE }}
                    className="relative w-full max-w-[128rem] aspect-[3/1]"
                >
                    <img
                        src="/images/logo.svg"
                        alt="Brahmi Logo"
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </motion.div>
            </div>
        </section>
    );
};
