import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/lib/motion/primitives";

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-transparent to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg md:text-xl font-mono text-muted-foreground max-w-2xl mx-auto">
                            Have a question or want to collaborate? We&apos;d love to hear from you.
                            Fill out the form below and we&apos;ll get back to you shortly.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <ContactForm />
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-12 px-4 md:px-8 mb-24">
                <div className="max-w-4xl mx-auto">
                    <FadeIn delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="font-semibold mb-2 font-sans">Email</h3>
                                <a href="mailto:admin@wearbrahmi.com" className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors underline">
                                    admin@wearbrahmi.com
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 font-sans">Instagram</h3>
                                <a href="https://www.instagram.com/wearbrahmi?igsh=ZHdvaDQ5bDBiaWR4" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors underline">
                                    @wearbrahmi
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 font-sans">LinkedIn</h3>
                                <a href="https://www.linkedin.com/company/wearbrahmi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors underline">
                                    wearbrahmi
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
