import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/lib/motion/primitives";

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-transparent to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <h1 className="text-xl md:text-2xl font-bold font-sans mb-6">
                            GET IN TOUCH
                        </h1>
                        <p className="text-xs md:text-sm font-mono text-muted-foreground max-w-2xl mx-auto">
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
                        <div className="text-center mb-12">
                            <h2 className="text-base md:text-xl font-bold font-sans uppercase mb-4">
                                CONTACT INFO
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="font-semibold mb-2 font-sans uppercase">Email</h3>
                                <a href="mailto:admin@wearbrahmi.com" className="text-muted-foreground hover:text-accent font-mono text-sm transition-colors underline">
                                    admin@wearbrahmi.com
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 font-sans uppercase">Instagram</h3>
                                <a href="https://www.instagram.com/wearbrahmi?igsh=ZHdvaDQ5bDBiaWR4" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent font-mono text-sm transition-colors underline">
                                    wearbrahmi
                                </a>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 font-sans uppercase">LinkedIn</h3>
                                <a href="https://www.linkedin.com/company/wearbrahmi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent font-mono text-sm transition-colors underline">
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
