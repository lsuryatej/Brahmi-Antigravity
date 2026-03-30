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
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100vw-48px)] max-w-xs"
                    >
                        <div className="bg-background border border-border rounded-2xl shadow-2xl p-5 relative overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={dismiss}
                                className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                aria-label="Close"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>

                            {/* Subtle accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent/60" />

                            {/* Content */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">
                                        Welcome to Brahmi
                                    </p>
                                    <h2 className="text-base font-bold font-sans leading-tight">
                                        10% off your first order
                                    </h2>
                                </div>

                                <p className="text-[10px] font-mono text-muted-foreground leading-relaxed tracking-tighter [word-spacing:-0.10rem]">
                                    Use code at checkout. Valid once per customer — our way of saying welcome.
                                </p>

                                {/* Discount Code */}
                                <button
                                    onClick={copyCode}
                                    className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/60 border border-dashed border-border rounded-xl group hover:border-accent/50 transition-colors"
                                >
                                    <span className="font-mono text-sm font-bold tracking-widest">
                                        {DISCOUNT_CODE}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground group-hover:text-accent transition-colors">
                                        {copied ? (
                                            <>
                                                <Check className="h-3 w-3 text-green-600" />
                                                <span className="text-green-600">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-3 w-3" />
                                                Copy
                                            </>
                                        )}
                                    </span>
                                </button>

                                <button
                                    onClick={dismiss}
                                    className="w-full text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors pt-0.5"
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
