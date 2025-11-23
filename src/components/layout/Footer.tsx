"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { AtSign, Instagram, Linkedin, Moon, Send, Sun, Twitter as TwitterX } from "lucide-react"

export function Footer() {
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    return (
        <footer className="relative border-t bg-accent text-accent-foreground transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight font-sans">Stay Connected</h2>
                        <p className="mb-6 text-accent-foreground/80 font-mono text-sm">
                            Join our newsletter for the latest updates and exclusive offers.
                        </p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pr-12 backdrop-blur-sm bg-background/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-background text-foreground transition-transform hover:scale-105 hover:bg-background/90"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </form>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold font-sans">Quick Links</h3>
                        <nav className="space-y-2 text-sm font-mono">
                            <Link href="/" className="block transition-colors hover:text-white/90 text-accent-foreground/80">
                                Home
                            </Link>
                            <Link href="/catalogue" className="block transition-colors hover:text-white/90 text-accent-foreground/80">
                                Catalogue
                            </Link>
                            <Link href="/about" className="block transition-colors hover:text-white/90 text-accent-foreground/80">
                                About
                            </Link>
                            <Link href="/contact" className="block transition-colors hover:text-white/90 text-accent-foreground/80">
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold font-sans">Contact Us</h3>
                        <address className="space-y-2 text-sm not-italic font-mono text-accent-foreground/80">
                            <p>Shreya</p>
                            <p>Ahmedabad, GJ</p>
                            <p>Phone: +91 84497 13927</p>
                            <p>Email: hello@brahmi.com</p>
                        </address>
                    </div>
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold font-sans">Follow Us</h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-accent-foreground/20 bg-transparent hover:bg-accent-foreground/10 hover:text-accent-foreground text-accent-foreground">
                                            <AtSign className="h-4 w-4" />
                                            <span className="sr-only">Threads</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Threads</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-accent-foreground/20 bg-transparent hover:bg-accent-foreground/10 hover:text-accent-foreground text-accent-foreground">
                                            <TwitterX className="h-4 w-4" />
                                            <span className="sr-only">X (Twitter)</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on X</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-accent-foreground/20 bg-transparent hover:bg-accent-foreground/10 hover:text-accent-foreground text-accent-foreground">
                                            <Instagram className="h-4 w-4" />
                                            <span className="sr-only">Instagram</span>
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
                                        <Button variant="outline" size="icon" className="rounded-full border-accent-foreground/20 bg-transparent hover:bg-accent-foreground/10 hover:text-accent-foreground text-accent-foreground">
                                            <Linkedin className="h-4 w-4" />
                                            <span className="sr-only">LinkedIn</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Connect with us on LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4" />
                            <Switch
                                id="dark-mode"
                                checked={isDarkMode}
                                onCheckedChange={setIsDarkMode}
                                className="data-[state=unchecked]:bg-accent-foreground/20"
                            />
                            <Moon className="h-4 w-4" />
                            <Label htmlFor="dark-mode" className="sr-only">
                                Toggle dark mode
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-accent-foreground/20 pt-8 text-center md:flex-row font-mono text-accent-foreground/60">
                    <p className="text-sm">
                        © 2025 Brahmi. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a href="#" className="transition-colors hover:text-accent-foreground">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-accent-foreground">
                            Terms of Service
                        </a>
                        <a href="#" className="transition-colors hover:text-accent-foreground">
                            Cookie Settings
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
