"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItemProps {
    title: string;
    content: string | React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem = ({ title, content, isOpen, onToggle }: AccordionItemProps) => {
    return (
        <div className="border-b border-border last:border-b-0">
            {/* Accordion Header */}
            <button
                onClick={onToggle}
                className="w-full px-4 py-3 md:px-5 md:py-4 flex items-center justify-between group hover:bg-accent/5 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="font-sans font-semibold text-xs md:text-sm text-left">{title}</span>
                {isOpen ? (
                    <Minus className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                ) : (
                    <Plus className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                )}
            </button>

            {/* Accordion Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 py-3 md:px-5 md:py-4 font-mono text-[10px] md:text-sm text-muted-foreground whitespace-pre-line">
                    {content}
                </div>
            </div>
        </div>
    );
};

interface AccordionProps {
    items: {
        title: string;
        content: string | React.ReactNode;
    }[];
    allowMultiple?: boolean;
}

export const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const handleToggle = (index: number) => {
        setOpenItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                if (!allowMultiple) {
                    newSet.clear();
                }
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <div className="rounded-xl overflow-hidden bg-background">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openItems.has(index)}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};
