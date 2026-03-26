"use client";

import { useState } from "react";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

const sections = [
    {
        heading: "RETURN POLICY",
        lines: [
            "Eligible if item is damaged or incorrect",
            "Request within 3–4 days of delivery",
            "Full refund issued after inspection",
        ],
    },
    {
        heading: "EXCHANGE POLICY",
        lines: [
            "Within 5–7 days of delivery",
            "Size doesn't fit or unsatisfied with product",
            "Choose another product or same item (subject to availability)",
            "No refund for exchanges — replacement only",
        ],
    },
    {
        heading: "SHIPPING CHARGES",
        lines: [
            "Calculated and shown at checkout",
            "Free shipping on orders above ₹10,000",
        ],
    },
    {
        heading: "CANCELLATION",
        lines: [
            "Cancel within 24 hours for a full refund",
            "Cannot cancel once production has begun",
        ],
    },
];

export const PolicyIsland = () => {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
                <button
                    className="inline-flex items-center gap-1 font-mono text-[10px] md:text-sm underline underline-offset-2 text-foreground/70 hover:text-foreground transition-colors cursor-pointer mt-1"
                    onClick={() => setOpen((v) => !v)}
                    type="button"
                >
                    Shipping &amp; Returns Policy ↗
                </button>
            </TooltipTrigger>

            <TooltipContent
                side="top"
                align="start"
                sideOffset={8}
                className="w-72 md:w-80 p-0 border border-border bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="px-4 py-3 border-b border-border">
                    <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">
                        Brahmi — Shipping, Returns &amp; Exchanges
                    </p>
                </div>

                <div className="px-4 py-3 space-y-3">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <p className="font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-foreground mb-1">
                                {section.heading}
                            </p>
                            <ul className="space-y-0.5">
                                {section.lines.map((line, i) => (
                                    <li
                                        key={i}
                                        className="font-mono text-[9px] md:text-[10px] text-muted-foreground flex gap-1.5"
                                    >
                                        <span className="mt-px shrink-0 opacity-40">•</span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="px-4 py-2 border-t border-border bg-accent/5">
                    <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground/60">
                        All products are Made-to-Order · Est. 15–20 business days
                    </p>
                </div>
            </TooltipContent>
        </Tooltip>
    );
};
