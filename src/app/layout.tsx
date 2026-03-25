import type { Metadata } from "next";
import { Host_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/lib/motion/lenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";

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
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen pt-16 md:pt-20">{children}</main>
            <Footer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
