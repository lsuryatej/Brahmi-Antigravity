import Link from "next/link";
import { FadeIn } from "@/lib/motion/primitives";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <FadeIn>
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    404
                </p>
                <h1 className="text-xl md:text-2xl font-bold font-sans uppercase mb-4">
                    Page Not Found
                </h1>
                <p className="font-mono text-[10px] md:text-sm text-muted-foreground tracking-tighter [word-spacing:-0.21rem] max-w-sm mx-auto text-justify mb-10">
                    The page you are looking for does not exist or may have been moved.
                </p>
                <Link
                    href="/"
                    className="font-mono text-[10px] md:text-sm underline underline-offset-4 text-foreground/70 hover:text-foreground transition-colors"
                >
                    Return Home ↗
                </Link>
            </FadeIn>
        </div>
    );
}
