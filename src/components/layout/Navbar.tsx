"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 right-0 z-50 flex items-center justify-end p-6 transition-all duration-500",
                    isScrolled ? "w-auto" : "w-full"
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {!isScrolled ? (
                    <div className="hidden md:flex gap-8 items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                ) : (
                    <div
                        className="relative"
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-md border-border shadow-sm"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 w-48 bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden p-2 flex flex-col gap-1"
                                >
                                    {navItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="block px-4 py-2 text-sm font-mono hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.nav>

            {/* Mobile Menu Button (Always visible on mobile when not scrolled, or handled by the same logic) */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                {/* Mobile logic can be refined, for now using the same structure */}
            </div>
        </>
    );
};
