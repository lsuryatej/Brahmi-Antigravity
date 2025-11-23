"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";
import { DURATION, EASE, REVEAL } from "./tokens";

interface FadeInProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    duration?: number;
}

export const FadeIn = ({
    children,
    delay = 0,
    direction = "up",
    distance = REVEAL.DISTANCE,
    duration = DURATION.MEDIUM,
    className,
    ...props
}: FadeInProps) => {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? distance : direction === "down" ? -distance : 0,
            x: direction === "left" ? distance : direction === "right" ? -distance : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                ease: EASE.STANDARD,
                delay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={variants}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const StaggerChildren = ({
    children,
    stagger = 0.1,
    className,
    ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: stagger,
                    },
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
