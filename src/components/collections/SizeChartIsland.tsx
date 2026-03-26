"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

interface SizeChartIslandProps {
    sizeChart: string;
}

export const SizeChartIsland = ({ sizeChart }: SizeChartIslandProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    className="text-sm font-mono text-muted-foreground hover:text-accent transition-colors underline underline-offset-2"
                    onClick={() => setOpen((v) => !v)}
                >
                    Size Chart
                </button>
            </TooltipTrigger>

            <TooltipContent
                side="top"
                align="end"
                sideOffset={8}
                className="p-0 border border-border bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden w-[280px] md:w-[340px]"
            >
                <div className="px-3 py-2 border-b border-border">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        Size Guide
                    </p>
                </div>
                <div className="p-2">
                    <Image
                        src={sizeChart}
                        alt="Size Chart"
                        width={340}
                        height={400}
                        className="w-full h-auto rounded-lg object-contain"
                        unoptimized
                    />
                </div>
            </TooltipContent>
        </Tooltip>
    );
};
