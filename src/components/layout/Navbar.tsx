"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const [isHoverDevice, setIsHoverDevice] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
            : false
    );
    const { cartCount } = useCart();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const handleChange = (event: MediaQueryListEvent) => {
            setIsHoverDevice(event.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);
    const prevCartCount = useRef(cartCount);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopNavRef = useRef<HTMLDivElement>(null);
    const cartAnimationFrameRef = useRef<number | null>(null);
    const cartAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    // Trigger cart animation on add
    useEffect(() => {
        if (cartCount > prevCartCount.current) {
            if (cartAnimationFrameRef.current !== null) {
                cancelAnimationFrame(cartAnimationFrameRef.current);
            }
            if (cartAnimationTimeoutRef.current) {
                clearTimeout(cartAnimationTimeoutRef.current);
            }
            cartAnimationFrameRef.current = window.requestAnimationFrame(() => {
                setIsCartAnimating(true);
                cartAnimationFrameRef.current = null;
            });
            if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(200);
            }
            cartAnimationTimeoutRef.current = setTimeout(() => {
                setIsCartAnimating(false);
            }, 400);
            prevCartCount.current = cartCount;
        }
        prevCartCount.current = cartCount;
    }, [cartCount]);

    useEffect(() => {
        return () => {
            if (cartAnimationFrameRef.current !== null) {
                cancelAnimationFrame(cartAnimationFrameRef.current);
            }
            if (cartAnimationTimeoutRef.current) {
                clearTimeout(cartAnimationTimeoutRef.current);
            }
        };
    }, []);

    // Handle scroll behavior
    useEffect(() => {
        let frameId: number | null = null;

        const syncNavbar = () => {
            frameId = null;
            const nextScrolled = window.scrollY > 100;

            setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
            setIsMobileMenuOpen((prev) => (prev ? false : prev));
            setActiveDropdown((prev) => (prev ? null : prev));
        };

        const handleScroll = () => {
            if (frameId !== null) return;
            frameId = window.requestAnimationFrame(syncNavbar);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle click outside for mobile menu
    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Close desktop dropdown when clicking/tapping outside
    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                activeDropdown &&
                desktopNavRef.current &&
                !desktopNavRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
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
                    "fixed top-0 left-0 right-0 z-50 pointer-events-none w-full border-b border-border/60 bg-background transition-all duration-300",
                    isScrolled && "shadow-[0_10px_30px_rgba(6,6,7,0.03)]"
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
                    {/* Logo Area */}
                    <div className="pointer-events-auto flex items-center h-8 md:h-9">
                        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center h-full">
                            <Image
                                src="/images/logo.svg"
                                alt="Brahmi Logo"
                                width={885}
                                height={389}
                                className="h-5 md:h-7 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    <div ref={desktopNavRef} className="hidden md:flex items-center gap-6 lg:gap-8 pointer-events-auto">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={isHoverDevice ? () => item.submenu && setActiveDropdown(item.name) : undefined}
                                onMouseLeave={isHoverDevice ? () => item.submenu && setActiveDropdown(null) : undefined}
                            >
                                <Link
                                    href={item.href}
                                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-foreground/88 hover:text-accent transition-colors"
                                    onClick={(e) => {
                                        if (!isHoverDevice && item.submenu) {
                                            e.preventDefault();
                                            setActiveDropdown((prev) => prev === item.name ? null : item.name);
                                        } else {
                                            setActiveDropdown(null);
                                        }
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
                                                className="absolute top-full left-0 mt-3 w-48 overflow-hidden rounded-xl border border-border bg-background shadow-xl"
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
                            className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent/10"
                            onClick={() => router.push('/cart')}
                            animate={isCartAnimating ? { rotate: [-15, 15, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <ShoppingBag className="h-4.5 w-4.5 hover:text-accent transition-colors" />
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
                </div>
            </motion.nav>

            {/* Mobile Menu Button (Always visible on mobile) */}
            <div className="md:hidden fixed top-3 right-4 z-50 pointer-events-auto flex items-center gap-2" ref={mobileMenuRef}>
                <motion.button
                    onClick={() => router.push('/cart')}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground shadow-sm transition-colors hover:bg-accent/10"
                    animate={isCartAnimating ? { rotate: [-15, 15, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <ShoppingBag className="h-4.5 w-4.5" />
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
                    className="h-9 w-9 rounded-full border border-border/70 bg-background shadow-sm hover:bg-accent/10"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-4.5 w-4.5" />
                    ) : (
                        <Menu className="h-4.5 w-4.5" />
                    )}
                </Button>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-background shadow-xl p-2 flex flex-col gap-1"
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
