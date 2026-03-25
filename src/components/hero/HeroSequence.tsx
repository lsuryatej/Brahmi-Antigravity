"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";

/**
 * useLayoutEffect runs synchronously before the browser paints, so GSAP
 * can position elements before the first frame is drawn — eliminating the
 * flash where the video container briefly appears at its default position.
 * SSR guard: Next.js runs this file on the server too, where useLayoutEffect
 * would warn; useEffect is used as a fallback so the server render is clean.
 */
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const HeroSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const layer1Ref = useRef<HTMLDivElement>(null);
    const layer2Ref = useRef<HTMLDivElement>(null);
    const layer3Ref = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    // Video playback via IntersectionObserver — unchanged
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observerOptions: IntersectionObserverInit = {
            threshold: [0, 0.01, 0.1],
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

    /*
     * GSAP scroll animation.
     *
     * useIsomorphicLayoutEffect fires before the first browser paint, so GSAP
     * applies the initial `yPercent: 100` (off-screen) state to the video
     * container before any pixels are drawn. This eliminates the ~100ms flash
     * where the video was visible at its default position while the old async
     * import resolved.
     *
     * prefers-reduced-motion is checked synchronously via matchMedia so we
     * never need a state variable for it — GSAP either runs or doesn't,
     * decided before the first paint.
     */
    useIsomorphicLayoutEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        gsap.registerPlugin(ScrollTrigger);

        const gsapContext = gsap.context(() => {
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 1,
                },
            });

            mainTimeline.fromTo(
                logoRef.current,
                { scale: 1, opacity: 1 },
                { scale: 1.06, opacity: 0, ease: "none" },
                0
            );

            mainTimeline.fromTo(
                videoContainerRef.current,
                { yPercent: 100, opacity: 1 },
                { yPercent: 0, opacity: 1, ease: "none" },
                0
            );

            mainTimeline.to(layer1Ref.current, { y: "10%", ease: "none" }, 0);
            mainTimeline.to(layer2Ref.current, { y: "20%", ease: "none" }, 0);
            mainTimeline.to(layer3Ref.current, { y: "30%", ease: "none" }, 0);
        }, containerRef);

        return () => gsapContext.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-clip flex items-center justify-center border-0"
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
                className="absolute inset-0 z-[25] flex items-center justify-center"
            >
                <div
                    ref={videoWrapRef}
                    className="w-[70%] sm:w-[55%] md:w-[40%] lg:w-[32%] xl:w-[28%] aspect-[9/16] rounded-2xl overflow-hidden"
                >
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="auto"
                        loop
                        className="w-full h-full object-cover outline-none border-none"
                        src="/videos/hero-video.mp4"
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
            <div className="relative z-[15] flex flex-col items-center justify-center p-4">
                <motion.div
                    ref={logoRef}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: EASE.ENTRANCE }}
                    className="relative w-[80%] md:w-[600px] lg:w-[800px] aspect-[3/1]"
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
