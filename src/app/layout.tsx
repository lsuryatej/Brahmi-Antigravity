import type { Metadata } from "next";
import { Host_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/lib/motion/lenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brahmi",
  description: "For Culture, Of Culture",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Brahmi",
    description: "For Culture, Of Culture",
    url: "https://wearbrahmi.com",
    siteName: "Brahmi",
    images: [
      {
        url: "https://wearbrahmi.com/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "Brahmi — For Culture, Of Culture",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brahmi",
    description: "For Culture, Of Culture",
    images: ["https://wearbrahmi.com/images/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.variable} ${spaceMono.variable} antialiased font-sans`}
      >
        <CartProvider>
          <TooltipProvider delayDuration={200}>
            <SmoothScroll>
              <Navbar />
              <main className="min-h-screen pt-16 md:pt-20">{children}</main>
              <Footer />
            </SmoothScroll>
          </TooltipProvider>
        </CartProvider>
      </body>
    </html>
  );
}
