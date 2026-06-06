"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
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
    const logoInnerRef = useRef<HTMLDivElement>(null);

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

        // On touch/coarse-pointer devices (phones, tablets) the GPU cannot
        // efficiently composite multiple large CSS-blurred layers simultaneously.
        // The blur-layer parallax is a purely decorative effect — we skip it on
        // those devices so the core animation (logo fade + video slide-up)
        // doesn't compete with three simultaneously composited blur layers.
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

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
                    scrub: true,
                    fastScrollEnd: true,
                    invalidateOnRefresh: true,
                },
            });

            mainTimeline.fromTo(
                logoInnerRef.current,
                { scale: 1, opacity: 1, filter: "blur(0px)" },
                {
                    scale: 1.02,
                    opacity: 0,
                    filter: "blur(8px)",
                    ease: "none",
                    duration: 0.46,
                },
                0.08
            );

            mainTimeline.to(
                [layer1Ref.current, layer2Ref.current, layer3Ref.current],
                {
                    opacity: 0,
                    ease: "none",
                    duration: 0.46,
                },
                0.08
            );

            mainTimeline.fromTo(
                videoContainerRef.current,
                { yPercent: 100, opacity: 1 },
                {
                    yPercent: 0,
                    opacity: 1,
                    ease: "none",
                    duration: 0.65,
                },
                0
            );

            // Parallax on decorative blur layers — skip on touch devices.
            // Each layer is a large CSS blur filter; animating all three
            // simultaneously on a mobile GPU causes heavy compositing overhead.
            if (!isCoarsePointer) {
                mainTimeline.to(layer1Ref.current, { y: "8%", ease: "none" }, 0);
                mainTimeline.to(layer2Ref.current, { y: "14%", ease: "none" }, 0);
                mainTimeline.to(layer3Ref.current, { y: "18%", ease: "none" }, 0);
            }
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
                className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl md:h-[34rem] md:w-[34rem]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(235,224,203,0.78) 0%, rgba(244,234,216,0.42) 38%, rgba(248,246,240,0) 74%)",
                }}
            />

            {/* Layer 2: Warm accent glow behind the logo */}
            <div
                ref={layer2Ref}
                className="pointer-events-none absolute left-1/2 top-[42%] z-10 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[90px] md:h-[20rem] md:w-[20rem]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(215,188,151,0.44) 0%, rgba(248,246,240,0) 72%)",
                }}
            />

            {/* Layer 3: subtle inner glow */}
            <div
                ref={layer3Ref}
                className="pointer-events-none absolute left-1/2 top-[42%] z-20 h-[9rem] w-[9rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[56px] md:h-[12rem] md:w-[12rem]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(99,24,12,0.18) 0%, rgba(248,246,240,0) 76%)",
                }}
            />

            {/* Video Container - Slides up from below */}
            <div
                ref={videoContainerRef}
                className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center transform-gpu will-change-transform"
            >
                <div
                    ref={videoWrapRef}
                    className="w-[70%] sm:w-[55%] md:w-[40%] lg:w-[32%] xl:w-[28%] aspect-[9/16] rounded-2xl overflow-hidden transform-gpu"
                >
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="metadata"
                        loop
                        className="w-full h-full object-cover outline-none border-none"
                        src="/videos/hero-video.mp4"
                    />
                </div>
            </div>

            {/* Content (Logo) - Stays pinned with subtle zoom */}
            <div className="relative z-[15] flex flex-col items-center justify-center p-4 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: EASE.ENTRANCE }}
                    className="relative w-[80%] sm:w-[65%] md:w-[60%] lg:w-[55%] max-w-[960px] will-change-transform"
                >
                    <div
                        ref={logoInnerRef}
                        className="w-full"
                        style={{ willChange: "transform, opacity, filter", filter: "blur(0px)" }}
                    >
                        <Image
                            src="/images/logo.svg"
                            alt="Brahmi Logo"
                            width={885}
                            height={389}
                            className="w-full h-auto mix-blend-multiply"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
