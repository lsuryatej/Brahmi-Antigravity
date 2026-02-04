"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const ProductDetailsModal = ({
    isOpen,
    onClose,
    title,
    children,
}: ProductDetailsModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 max-h-[80vh] overflow-y-auto"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold font-sans">{title}</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="rounded-full"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="prose prose-sm md:prose-base max-w-none">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

interface ModalSection {
    title: string;
    content: React.ReactNode;
}

export const ProductDetailsButtons = ({ sections }: { sections: ModalSection[] }) => {
    const [activeModal, setActiveModal] = useState<number | null>(null);

    return (
        <>
            <div className="flex flex-wrap gap-3">
                {sections.map((section, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveModal(index)}
                        className="px-4 py-2 rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-mono"
                    >
                        {section.title}
                    </button>
                ))}
            </div>

            {sections.map((section, index) => (
                <ProductDetailsModal
                    key={index}
                    isOpen={activeModal === index}
                    onClose={() => setActiveModal(null)}
                    title={section.title}
                >
                    {section.content}
                </ProductDetailsModal>
            ))}
        </>
    );
};
