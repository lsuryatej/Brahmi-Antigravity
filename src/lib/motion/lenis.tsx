"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

        // Touch devices already have momentum scrolling. Keep that native so taps
        // and scroll gestures stay responsive instead of feeling hijacked.
        if (prefersReducedMotion || isCoarsePointer) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 0.65,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        const handleLenisScroll = () => {
            ScrollTrigger.update();
        };

        const handleLenisFrame = (time: number) => {
            lenis.raf(time * 1000);
        };

        const handleRefresh = () => {
            lenis.resize();
        };

        lenis.on("scroll", handleLenisScroll);
        ScrollTrigger.addEventListener("refresh", handleRefresh);

        gsap.ticker.add(handleLenisFrame);

        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", handleRefresh);
            lenis.destroy();
            gsap.ticker.remove(handleLenisFrame);
        };
    }, []);

    return <>{ children } </>;
};
