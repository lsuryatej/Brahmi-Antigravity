"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#f8f6f0] text-foreground transition-colors duration-300">
            <div className="container mx-auto px-4 pt-4 pb-6 md:pt-8 md:pb-12 md:px-6 lg:px-8">
                <div className="border-t mb-4 md:mb-10" />

                {/* Main grid: 2-col on mobile/iPad, 3-col on desktop */}
                <div className="grid grid-cols-2 gap-4 md:gap-10 lg:grid-cols-3">

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-2 md:mb-4 text-xs md:text-sm font-semibold font-sans uppercase tracking-widest">Quick Links</h3>
                        <nav className="space-y-1 md:space-y-2 text-xs md:text-sm font-mono">
                            <Link href="/" className="block transition-colors hover:text-accent text-muted-foreground">Home</Link>
                            <Link href="/collections/sutr" className="block transition-colors hover:text-accent text-muted-foreground">Collections</Link>
                            <Link href="/about" className="block transition-colors hover:text-accent text-muted-foreground">About</Link>
                            <Link href="/contact" className="block transition-colors hover:text-accent text-muted-foreground">Contact</Link>
                            <Link href="/shipping-returns" className="block transition-colors hover:text-accent text-muted-foreground">Shipping &amp; Returns</Link>
                        </nav>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="mb-2 md:mb-4 text-xs md:text-sm font-semibold font-sans uppercase tracking-widest">Contact Us</h3>
                        <address className="space-y-1 md:space-y-2 text-xs md:text-sm not-italic font-mono text-muted-foreground">
                            <p>Email</p>
                            <a href="mailto:admin@wearbrahmi.com" className="block hover:text-accent transition-colors underline break-all">admin@wearbrahmi.com</a>
                        </address>
                    </div>

                    {/* Connect with Us — full width on mobile, own column on desktop */}
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="mb-2 md:mb-4 text-xs md:text-sm font-semibold font-sans uppercase tracking-widest">Connect</h3>
                        <div className="flex space-x-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground" asChild>
                                            <a href="mailto:admin@wearbrahmi.com" target="_blank" rel="noopener noreferrer">
                                                <Mail className="h-3 w-3 md:h-4 md:w-4" />
                                                <span className="sr-only">Email</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Email us</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground" asChild>
                                            <a href="https://www.instagram.com/wearbrahmi?igsh=ZHdvaDQ5bDBiaWR4" target="_blank" rel="noopener noreferrer">
                                                <Instagram className="h-3 w-3 md:h-4 md:w-4" />
                                                <span className="sr-only">Instagram</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Follow us on Instagram</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground" asChild>
                                            <a href="https://www.linkedin.com/company/wearbrahmi/" target="_blank" rel="noopener noreferrer">
                                                <Linkedin className="h-3 w-3 md:h-4 md:w-4" />
                                                <span className="sr-only">LinkedIn</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Connect with us on LinkedIn</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-4 md:mt-10 flex flex-col items-center justify-between gap-2 md:gap-4 border-t pt-4 md:pt-8 text-center md:flex-row font-mono text-muted-foreground">
                    <p className="text-[10px] md:text-xs">
                        © {currentYear} Brahmi. All rights reserved.
                    </p>
                    <nav className="flex gap-3 md:gap-4 text-[10px] md:text-xs">
                        <Link href="/privacy" className="transition-colors hover:text-accent">Privacy Policy</Link>
                        <Link href="/terms" className="transition-colors hover:text-accent">Terms of Service</Link>
                        <Link href="/cookies" className="transition-colors hover:text-accent">Cookie Settings</Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
