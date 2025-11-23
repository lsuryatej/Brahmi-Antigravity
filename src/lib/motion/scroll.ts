import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PARALLAX } from "./tokens";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const registerScrollTrigger = () => {
    if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }
};

export const parallaxAll = (selector: string, speed: number = PARALLAX.MEDIUM) => {
    const elements = gsap.utils.toArray<HTMLElement>(selector);
    elements.forEach(() => {
        // Future implementation
    });
};

export const createParallax = (
    target: string | Element,
    speed: number = 0.5,
    trigger?: string | Element
) => {
    return gsap.to(target, {
        y: () => -speed * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
            trigger: trigger || document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
        },
    });
};
