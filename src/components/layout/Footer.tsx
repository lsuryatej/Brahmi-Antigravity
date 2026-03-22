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
            <div className="container mx-auto px-4 pt-8 pb-12 md:px-6 lg:px-8">
                <div className="border-t mb-12" />
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold font-sans">Quick Links</h3>
                        <nav className="space-y-2 text-sm font-mono">
                            <Link href="/" className="block transition-colors hover:text-accent text-muted-foreground">
                                Home
                            </Link>
                            <Link href="/collections/sutr" className="block transition-colors hover:text-accent text-muted-foreground">
                                Collections
                            </Link>
                            <Link href="/about" className="block transition-colors hover:text-accent text-muted-foreground">
                                About
                            </Link>
                            <Link href="/contact" className="block transition-colors hover:text-accent text-muted-foreground">
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold font-sans">Contact Us</h3>
                        <address className="space-y-2 text-sm not-italic font-mono text-muted-foreground">
                            <p>Email: <a href="mailto:admin@wearbrahmi.com" className="hover:text-accent transition-colors underline">admin@wearbrahmi.com</a></p>
                        </address>
                    </div>
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold font-sans">Connect with Us</h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground" asChild>
                                            <a href="mailto:admin@wearbrahmi.com" target="_blank" rel="noopener noreferrer">
                                                <Mail className="h-4 w-4" />
                                                <span className="sr-only">Email</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email us</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground" asChild>
                                            <a href="https://www.instagram.com/wearbrahmi?igsh=ZHdvaDQ5bDBiaWR4" target="_blank" rel="noopener noreferrer">
                                                <Instagram className="h-4 w-4" />
                                                <span className="sr-only">Instagram</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Instagram</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground" asChild>
                                            <a href="https://www.linkedin.com/company/wearbrahmi/" target="_blank" rel="noopener noreferrer">
                                                <Linkedin className="h-4 w-4" />
                                                <span className="sr-only">LinkedIn</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Connect with us on LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row font-mono text-muted-foreground">
                    <p className="text-sm">
                        © {currentYear} Brahmi. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <Link href="/privacy" className="transition-colors hover:text-accent">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-accent">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="transition-colors hover:text-accent">
                            Cookie Settings
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
