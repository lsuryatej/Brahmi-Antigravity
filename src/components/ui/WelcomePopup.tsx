"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";

const DISCOUNT_CODE = "BRAHMI10";
const STORAGE_KEY = "brahmi_welcome_shown";

export const WelcomePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try {
            const alreadyShown = localStorage.getItem(STORAGE_KEY);
            if (!alreadyShown) {
                const timer = setTimeout(() => setIsVisible(true), 1500);
                return () => clearTimeout(timer);
            }
        } catch {
            // localStorage not available
        }
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        try {
            localStorage.setItem(STORAGE_KEY, "true");
        } catch {
            // localStorage not available
        }
    };

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(DISCOUNT_CODE);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const el = document.createElement("textarea");
            el.value = DISCOUNT_CODE;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
                        onClick={dismiss}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-4 bottom-8 md:inset-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] max-w-sm w-full mx-auto"
                    >
                        <div className="bg-background border border-border rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={dismiss}
                                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            {/* Subtle accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent/60" />

                            {/* Content */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                                        Welcome to Brahmi
                                    </p>
                                    <h2 className="text-lg md:text-xl font-bold font-sans leading-tight">
                                        10% off your first order
                                    </h2>
                                </div>

                                <p className="text-[10px] md:text-xs font-mono text-muted-foreground leading-relaxed tracking-tighter [word-spacing:-0.10rem]">
                                    Use code at checkout. Valid once per customer — our way of saying welcome.
                                </p>

                                {/* Discount Code */}
                                <button
                                    onClick={copyCode}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-muted/60 border border-dashed border-border rounded-xl group hover:border-accent/50 transition-colors"
                                >
                                    <span className="font-mono text-base font-bold tracking-widest">
                                        {DISCOUNT_CODE}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors">
                                        {copied ? (
                                            <>
                                                <Check className="h-3.5 w-3.5 text-green-600" />
                                                <span className="text-green-600">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-3.5 w-3.5" />
                                                Copy
                                            </>
                                        )}
                                    </span>
                                </button>

                                <button
                                    onClick={dismiss}
                                    className="w-full text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors pt-1"
                                >
                                    No thanks
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
