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

        </div>
    );
}
