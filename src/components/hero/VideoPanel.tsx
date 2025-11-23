"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const VideoPanel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const ctx = gsap.context(() => {
            // Pin the video section
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%", // Pin for the height of the viewport
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                scrub: 1,
                onEnter: () => {
                    // Play video when entering the pinned section
                    if (videoRef.current) {
                        const playPromise = videoRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                                console.log("Video autoplay prevented:", error.name);
                            });
                        }
                    }
                },
                onLeave: () => {
                    // Pause when leaving
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                },
                onEnterBack: () => {
                    // Resume when scrolling back
                    if (videoRef.current) {
                        const playPromise = videoRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                                console.log("Video autoplay prevented:", error.name);
                            });
                        }
                    }
                },
                onLeaveBack: () => {
                    // Pause when leaving backwards
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                },
            });

            // Optional: Scrub video playback based on scroll progress
            if (videoRef.current) {
                const video = videoRef.current;

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 1,
                    onUpdate: (self) => {
                        if (video.duration) {
                            // Scrub video to match scroll progress
                            video.currentTime = video.duration * self.progress;
                        }
                    },
                });
            }

            // Fade in animation
            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0.8,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    scale: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center bg-background overflow-hidden"
        >
            <div className="w-[90%] md:w-[80%] aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                />
            </div>
        </section>
    );
};
