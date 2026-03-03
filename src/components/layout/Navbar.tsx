"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavItem {
    name: string;
    href: string;
    submenu?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    {
        name: "Collections",
        href: "#",
        submenu: [
            { name: "Sutr", href: "/collections/sutr" }
        ]
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { cartCount } = useCart();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Close mobile menu on scroll
            if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobileMenuOpen]);

    // Handle click outside for mobile menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside as EventListener);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside as EventListener);
        };
    }, [isMobileMenuOpen]);

    // Close menu when link is clicked
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };


    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 right-0 z-50 flex items-center justify-end p-6 transition-all duration-500 pointer-events-none",
                    isScrolled ? "w-auto" : "w-full"
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {!isScrolled ? (
                    <div className="hidden md:flex gap-8 items-center pointer-events-auto">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors"
                                >
                                    {item.name}
                                </Link>

                                {/* Dropdown Menu */}
                                {item.submenu && (
                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-48 bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden"
                                            >
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-3 text-sm font-mono hover:bg-accent hover:text-accent-foreground transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}

                        {/* Cart Icon */}
                        <button className="relative group" onClick={() => router.push('/cart')}>
                            <ShoppingBag className="h-5 w-5 hover:text-accent transition-colors" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-mono font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </button>
                    </div>
                ) : (
                    <div
                        ref={desktopMenuRef}
                        className="relative hidden md:block pointer-events-auto"
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
                                        <div key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="block px-4 py-2 text-sm font-mono hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            {item.submenu && (
                                                <div className="ml-4 space-y-1">
                                                    {item.submenu.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="h-px bg-border my-1" />
                                    <button onClick={() => router.push('/cart')} className="flex items-center gap-2 px-4 py-2 text-sm font-mono hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                        <ShoppingBag className="h-4 w-4" />
                                        Cart
                                        {cartCount > 0 && (
                                            <span className="ml-auto bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.nav>

            {/* Mobile Menu Button (Always visible on mobile) */}
            <div className="md:hidden fixed top-4 right-4 z-50 pointer-events-auto" ref={mobileMenuRef}>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="rounded-full bg-background/80 backdrop-blur-md border-border shadow-sm"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </Button>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden p-2 flex flex-col gap-1"
                        >
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-2 text-sm font-mono hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <div className="ml-4 space-y-1">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={handleLinkClick}
                                                    className="block px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="h-px bg-border my-1" />
                            <button
                                onClick={() => { handleLinkClick(); router.push('/cart'); }}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-mono hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                Cart
                                {cartCount > 0 && (
                                    <span className="ml-auto bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
