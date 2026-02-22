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
    return (
        <footer className="relative bg-[#f8f6f0] text-foreground transition-colors duration-300" style={{ borderTop: '1px solid #63180c' }}>
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
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
                        <h3 className="mb-4 text-lg font-semibold font-sans">Follow Us</h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a href="mailto:admin@wearbrahmi.com" target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground">
                                                <Mail className="h-4 w-4" />
                                                <span className="sr-only">Email</span>
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email us</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a href="https://www.instagram.com/wearbrahmi?igsh=ZHdvaDQ5bDBiaWR4" target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground">
                                                <Instagram className="h-4 w-4" />
                                                <span className="sr-only">Instagram</span>
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Instagram</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a href="https://www.linkedin.com/company/wearbrahmi/" target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-accent/10 hover:text-accent text-foreground">
                                                <Linkedin className="h-4 w-4" />
                                                <span className="sr-only">LinkedIn</span>
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Connect with us on LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row font-mono text-muted-foreground" style={{ borderColor: '#63180c' }}>
                    <p className="text-sm">
                        © 2025 Brahmi. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a href="#" className="transition-colors hover:text-accent">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-accent">
                            Terms of Service
                        </a>
                        <a href="#" className="transition-colors hover:text-accent">
                            Cookie Settings
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
