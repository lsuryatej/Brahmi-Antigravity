"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
        name: "Shop",
        href: "/collections/sutr",
        submenu: [
            { name: "Women", href: "/shop/women" },
            { name: "Men", href: "/shop/men" },
        ]
    },
    {
        name: "Collections",
        href: "/collections/sutr",
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
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const [isHoverDevice, setIsHoverDevice] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        setIsHoverDevice(window.matchMedia("(hover: hover)").matches);
    }, []);
    const prevCartCount = useRef(cartCount);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const desktopNavRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Trigger cart animation on add
    useEffect(() => {
        if (cartCount > prevCartCount.current) {
            setIsCartAnimating(true);
            if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(200);
            }
            const timer = setTimeout(() => {
                setIsCartAnimating(false);
            }, 400);
            prevCartCount.current = cartCount;
            return () => clearTimeout(timer);
        }
        prevCartCount.current = cartCount;
    }, [cartCount]);

    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
            setIsMobileMenuOpen(false);
            setIsMenuOpen(false);
            setActiveDropdown(null);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close desktop scrolled menu when tapping outside
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside as EventListener);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside as EventListener);
        };
    }, [isMenuOpen]);

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

    // Close desktop dropdown when clicking/tapping outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                activeDropdown &&
                desktopNavRef.current &&
                !desktopNavRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside as EventListener);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside as EventListener);
        };
    }, [activeDropdown]);

    // Close menu when link is clicked
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const handleDropdownLinkClick = () => {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
    };


    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex items-start justify-between p-4 md:p-6 transition-all duration-500 pointer-events-none w-full",
                    isScrolled && "bg-background/80 backdrop-blur-md"
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Logo Area */}
                <div className="pointer-events-auto flex items-center h-10">
                    <Link href="/" className="hover:opacity-80 transition-opacity flex items-center h-full">
                        <img 
                            src="/images/logo.svg" 
                            alt="Brahmi Logo" 
                            className="h-6 md:h-8 w-auto object-contain"
                        />
                    </Link>
                </div>

                {!isScrolled ? (
                    <div ref={desktopNavRef} className="hidden md:flex gap-8 items-center justify-end pointer-events-auto">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={isHoverDevice ? () => item.submenu && setActiveDropdown(item.name) : undefined}
                                onMouseLeave={isHoverDevice ? () => item.submenu && setActiveDropdown(null) : undefined}
                            >
                                <Link
                                    href={item.href}
                                    className="text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors"
                                    onClick={() => {
                                        setActiveDropdown(null);
                                    }}
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
                                                        onClick={handleDropdownLinkClick}
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
                        <motion.button 
                            className="relative group flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition-colors" 
                            onClick={() => router.push('/cart')}
                            animate={isCartAnimating ? { rotate: [-15, 15, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <ShoppingBag className="h-5 w-5 hover:text-accent transition-colors" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-mono font-bold rounded-full h-4 w-4 flex items-center justify-center outline outline-2 outline-background"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </motion.button>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-4 pointer-events-auto">
                        <motion.button 
                            onClick={() => router.push('/cart')}
                            className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent/10 h-10 w-10 text-foreground transition-colors"
                            animate={isCartAnimating ? { rotate: [-15, 15, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <ShoppingBag className="h-5 w-5 hover:text-accent transition-colors" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-mono font-bold rounded-full h-4 w-4 flex items-center justify-center outline outline-2 outline-background"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </motion.button>

                        <div
                            ref={desktopMenuRef}
                            className="relative"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => setIsMenuOpen(prev => !prev)}
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                        </div>
                    </div>
                )}
            </motion.nav>

            {/* Mobile Menu Button (Always visible on mobile) */}
            <div className="md:hidden fixed top-4 right-4 z-50 pointer-events-auto flex items-center gap-2" ref={mobileMenuRef}>
                <motion.button 
                    onClick={() => router.push('/cart')}
                    className="relative flex items-center justify-center p-2 rounded-full hover:bg-accent/10 h-10 w-10 text-foreground transition-colors"
                    animate={isCartAnimating ? { rotate: [-15, 15, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <ShoppingBag className="h-5 w-5" />
                    {cartCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-mono font-bold rounded-full h-4 w-4 flex items-center justify-center outline outline-2 outline-background"
                        >
                            {cartCount}
                        </motion.span>
                    )}
                </motion.button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="rounded-full"
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
